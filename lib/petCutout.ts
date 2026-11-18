// Takes a customer's pet photo and returns just the pet, cut out, as a PNG object URL.
// Runs entirely in the browser (MediaPipe image segmenter, model + wasm are self-hosted
// under /public/mediapipe), so the photo never leaves the customer's device.
// Returns null when no animal is found, so the caller can fall back to the plain photo.

// PASCAL VOC classes the model knows: 3 bird, 8 cat, 10 cow, 12 dog, 13 horse, 17 sheep
const ANIMALS = [3, 8, 10, 12, 13, 17];
const MAX_SIDE = 1100;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let segmenterPromise: Promise<any> | null = null;

async function getSegmenter() {
  if (!segmenterPromise) {
    segmenterPromise = (async () => {
      const { FilesetResolver, ImageSegmenter } = await import("@mediapipe/tasks-vision");
      const fileset = await FilesetResolver.forVisionTasks("/mediapipe/wasm");
      return ImageSegmenter.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: "/mediapipe/deeplab_v3.tflite" },
        runningMode: "IMAGE",
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      });
    })().catch((e) => {
      segmenterPromise = null;
      throw e;
    });
  }
  return segmenterPromise;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export async function cutOutPet(photoUrl: string): Promise<string | null> {
  const img = await loadImage(photoUrl);
  const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
  const W = Math.max(1, Math.round(img.naturalWidth * scale));
  const H = Math.max(1, Math.round(img.naturalHeight * scale));
  const src = document.createElement("canvas");
  src.width = W;
  src.height = H;
  const sctx = src.getContext("2d")!;
  sctx.drawImage(img, 0, 0, W, H);

  const seg = await getSegmenter();
  const result = seg.segment(src);
  const mask = result.categoryMask;
  if (!mask) return null;
  const mw: number = mask.width;
  const mh: number = mask.height;
  const labels: Uint8Array = mask.getAsUint8Array();

  // the biggest animal in the picture is the pet
  const counts = new Map<number, number>();
  for (let i = 0; i < labels.length; i++) {
    if (ANIMALS.includes(labels[i])) counts.set(labels[i], (counts.get(labels[i]) ?? 0) + 1);
  }
  let best = -1;
  let bestN = 0;
  counts.forEach((n, k) => {
    if (n > bestN) {
      best = k;
      bestN = n;
    }
  });
  if (best < 0 || bestN < labels.length * 0.02) {
    result.close?.();
    return null;
  }

  // white-on-black mask at the model's size, then soften and scale up to the photo
  const small = document.createElement("canvas");
  small.width = mw;
  small.height = mh;
  const smctx = small.getContext("2d")!;
  const md = smctx.createImageData(mw, mh);
  for (let i = 0; i < labels.length; i++) {
    const v = labels[i] === best ? 255 : 0;
    md.data[i * 4] = v;
    md.data[i * 4 + 1] = v;
    md.data[i * 4 + 2] = v;
    md.data[i * 4 + 3] = 255;
  }
  smctx.putImageData(md, 0, 0);
  result.close?.();

  const big = document.createElement("canvas");
  big.width = W;
  big.height = H;
  const bctx = big.getContext("2d")!;
  bctx.imageSmoothingQuality = "high";
  bctx.filter = `blur(${Math.max(2, Math.round(Math.max(W, H) / 300))}px)`;
  bctx.drawImage(small, 0, 0, W, H);
  bctx.filter = "none";

  // find the pet's bounding box and apply the soft mask as alpha
  const md2 = bctx.getImageData(0, 0, W, H).data;
  const pix = sctx.getImageData(0, 0, W, H);
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      // tighten the soft edge a little so the outline stays clean
      const a = Math.max(0, Math.min(255, (md2[i] - 90) * 2));
      pix.data[i + 3] = a;
      if (a > 128) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 <= x0 || y1 <= y0) return null;
  sctx.putImageData(pix, 0, 0);

  // head and chest: an upright pet is cropped from the top; a side-on one is kept whole
  const bw = x1 - x0 + 1;
  let bh = y1 - y0 + 1;
  if (bh > bw * 1.3) bh = Math.round(bw * 1.3);

  const out = document.createElement("canvas");
  out.width = bw;
  out.height = bh;
  out.getContext("2d")!.drawImage(src, x0, y0, bw, bh, 0, 0, bw, bh);
  return await new Promise((resolve) =>
    out.toBlob((b) => resolve(b ? URL.createObjectURL(b) : null), "image/png")
  );
}
