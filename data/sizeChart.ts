// T-shirt size chart, garment measurements in inches (cm = × 2.54).
// Oversized: owner-supplied reference chart (common Indian oversized sizing).
// Regular: standard Indian regular-fit sizing. OWNER: confirm both against the
// actual blanks before launch; a wrong chart means exchanges.
export const TEE_SIZE_CHART = {
  regular: [
    { size: "XS", toFit: 36, chest: 38, length: 26, shoulder: 16.5 },
    { size: "S", toFit: 38, chest: 40, length: 27, shoulder: 17 },
    { size: "M", toFit: 40, chest: 42, length: 28, shoulder: 18 },
    { size: "L", toFit: 42, chest: 44, length: 28.5, shoulder: 18.75 },
    { size: "XL", toFit: 44, chest: 46, length: 29.5, shoulder: 19.5 },
    { size: "XXL", toFit: 46, chest: 48, length: 30, shoulder: 20.25 },
  ],
  oversized: [
    { size: "XS", toFit: 36, chest: 42, length: 26.5, shoulder: 20.5 },
    { size: "S", toFit: 38, chest: 44, length: 27.5, shoulder: 21.25 },
    { size: "M", toFit: 40, chest: 46, length: 28.5, shoulder: 22 },
    { size: "L", toFit: 42, chest: 48, length: 29, shoulder: 23 },
    { size: "XL", toFit: 44, chest: 50, length: 30, shoulder: 24 },
    { size: "XXL", toFit: 46, chest: 52, length: 30.5, shoulder: 25 },
  ],
};
