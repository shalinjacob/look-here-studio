import type { JournalPost } from "@/lib/types";

// The "Journal" / Notes. Editorial entries. Add one and it gets a route at
// /journal/<slug> automatically.

export const journal: JournalPost[] = [
  {
    slug: "why-we-started-with-a-clock",
    index: "001",
    title: "Why we started with a clock",
    date: "2026-08-18",
    category: "Note",
    excerpt:
      "The most looked-at object in most homes is also the most ignored. That felt like a good place to begin.",
    readingTime: "3 min",
    body: [
      "Every home has a clock. Almost nobody chose it. It came with the wall, or the wedding, or the hardware shop down the road, and now it just hangs there being correct.",
      "That's a strange thing for an object you look at fifty times a day. So the Layer Clock was the first thing we made — not to reinvent timekeeping, but to make the glance worth something.",
      "We built it out of stacked layers so the dial sits at the bottom of a small warm crater. You still read the time in half a second. But for that half second, the wall is doing something.",
      "That's the whole studio, really. We're not trying to change your house. We're trying to make the things you already look at worth looking at.",
    ],
  },
  {
    slug: "acrylic-is-not-plastic",
    index: "002",
    title: "Acrylic is not plastic (a small rant)",
    date: "2026-07-30",
    category: "Material",
    excerpt:
      "People hear 'acrylic' and picture a cheap phone case. Here's what we actually mean.",
    readingTime: "4 min",
    body: [
      "Acrylic gets a bad name because it shares a shelf, in most minds, with disposable tat. But cast acrylic is a genuinely beautiful material — optically clear, edge-glowing, and it takes light like almost nothing else at the price.",
      "We use it because it does things brass and wood can't. It carries colour all the way through. It glows at the cut edge. It can be translucent, so an object made from it changes completely depending on what's behind it and what time of day it is.",
      "It also fights back. It scratches. It melts if the laser lingers. It cracks if you drill it wrong. Test 04 was too red. Test 09 cracked at the corner. Test 14 was, finally, right.",
      "So no, it's not plastic. It's a material with opinions. We like that in a material.",
    ],
  },
  {
    slug: "festival-without-the-clichs",
    index: "003",
    title: "Doing Diwali without the clichés",
    date: "2026-09-02",
    category: "Collection",
    excerpt:
      "How do you design for a festival of light without reaching for marigolds and orange gradients?",
    readingTime: "5 min",
    body: [
      "Diwali gifting has a look, and you know it the moment you see it: marigolds, diyas rendered in gold foil, a gradient somewhere between turmeric and traffic cone.",
      "None of that is wrong. It's just been done, thoroughly, by everyone. So for Festival 01 we started from the ideas underneath the festival instead of its packaging: light, thresholds, kolam, jasmine, gathering.",
      "The Kolam Constellation plate takes the drawing you'd make at the doorstep and sends it up among the stars, etched in brass. The Diya Toran stretches the oil lamp into a hanging line down the threshold.",
      "The rule we set ourselves: designed for the festival, not designed to disappear after it. If you'd happily leave it up in February, we got it right.",
    ],
  },
  {
    slug: "in-defence-of-the-slightly-wrong",
    index: "004",
    title: "In defence of the slightly wrong",
    date: "2026-09-10",
    category: "Object",
    excerpt:
      "A clock that's also a painting. A game nobody finishes. On why a little friction is the entire point.",
    readingTime: "3 min",
    body: [
      "Most objects try to disappear into usefulness — do the job, ask nothing, be forgotten. We keep making things that refuse to do that.",
      "The Layered Wall Clock is a small Memphis painting that happens to have hands. X + O is noughts-and-crosses in solid brass, permanently mid-argument. Neither hides what it is, and neither is quite content to just sit there.",
      "That tiny bit of friction is the idea. An object you have to meet halfway is an object you actually notice. Frictionless is only another word for invisible.",
      "We're not against useful — every one of these still tells the time, holds the drink, frames the photo. They just decline to be furniture about it.",
    ],
  },
  {
    slug: "notes-from-the-laser-bed",
    index: "005",
    title: "Notes from the laser bed",
    date: "2026-09-08",
    category: "Process",
    excerpt:
      "Test 04 was too red. Test 09 cracked. Test 14 was, finally, right. An honest log from the offcut bin.",
    readingTime: "4 min",
    body: [
      "People imagine the studio as clean drawings turning smoothly into objects. It is mostly a bin of offcuts and a shelf of things that didn't work.",
      "Acrylic melts if the laser lingers half a second too long. Brass warps if you cut the ribs too thin — the first Leaf Coaster had ribs so fine they bent when you picked them up. We thickened them twice before they earned a spot in the catalogue.",
      "We keep the failures. Test 04, too red. Test 09, cracked at the corner. Test 14, right. It's the least glamorous shelf in the building and easily the most useful one.",
      "Nothing here arrives fully formed. It arrives on the fourth try, usually, and only because we bothered to keep the first three.",
    ],
  },
  {
    slug: "why-we-make-things-in-small-runs",
    index: "006",
    title: "Why we make things in small runs",
    date: "2026-09-01",
    category: "Studio",
    excerpt:
      "Often we make it after you order. The unglamorous economics — and the real point — of not filling a warehouse.",
    readingTime: "3 min",
    body: [
      "We don't hold much stock. A lot of what you see is made after you order, in runs small enough to count on your hands.",
      "Partly that's honesty. We don't yet know which objects people will love, so filling a warehouse would just be a guess wearing the costume of confidence.",
      "Partly it's simply better. A small run means we can change the finish on object twelve because object eleven taught us something. Mass production can't do that — it's already committed to its own first mistake.",
      "The trade is patience: some pieces take a week or two. In return you get something made recently, by someone who could still change their mind — which, occasionally, we do.",
    ],
  },
  {
    slug: "brass-gets-better-when-you-ignore-it",
    index: "007",
    title: "Brass gets better when you ignore it",
    date: "2026-08-25",
    category: "Material",
    excerpt:
      "On patina, and why we don't lacquer the life out of our brass.",
    readingTime: "3 min",
    body: [
      "New brass is loud. Mirror-bright, a little showy, trying hard. Left alone, it calms down — the shine softens, the tone deepens, and it slowly starts to look like it belongs to you.",
      "That's patina, and most brass products fight it with a thick lacquer that freezes the factory shine in place forever. We mostly don't. The torans and coasters are meant to age.",
      "If you love the bright look, a minute with a cloth and some polish brings it right back. If you love the softened one, do nothing — the more honest option, and free.",
      "It's the rare object that improves while you neglect it. Enjoy that. It is not going to happen with your phone.",
    ],
  },
  {
    slug: "coasters-deserve-better",
    index: "008",
    title: "Coasters deserve better",
    date: "2026-08-12",
    category: "Object",
    excerpt:
      "The most-used object on your table is usually the ugliest. It really doesn't have to be.",
    readingTime: "2 min",
    body: [
      "Coasters are the last thing anyone designs and the first thing anyone reaches for. Cork, or a freebie from a bank, or nothing at all — a ring on the wood and a small domestic argument ten minutes later.",
      "That seemed backwards. The object that meets every cup, every day, every guest, somehow gets the least thought. So we gave it the most.",
      "Ours carry a kolam, a set of festival motifs, a banana leaf cut clean through brass. They catch the light under a glass and look, honestly, better with a ring of condensation on them than without.",
      "Small object, bigger day. That's the whole coaster manifesto, and we're standing by it.",
    ],
  },
  {
    slug: "what-a-good-gift-actually-is",
    index: "009",
    title: "What a good gift actually is",
    date: "2026-09-14",
    category: "Gifting",
    excerpt:
      "It isn't about price, and it definitely isn't a scented candle. A short theory, ahead of the season.",
    readingTime: "3 min",
    body: [
      "A good gift is just proof you were paying attention. That's the whole thing. The price is almost irrelevant; the specificity is everything.",
      "The scented candle fails not because it's cheap but because it's a shrug — it says “I know you have a nose.” A gift should say “I know you.”",
      "Objects are good at this when they're specific enough. The person who hates clutter gets the quietest wall plate. The one who hosts gets the coasters and the game. The one who has everything gets something gloriously unnecessary.",
      "We built the whole Gift Guide around exactly that — sorted by the person, not the price bracket. Start there. Or, when truly stuck: the X + O board. Nobody owns one.",
    ],
  },
  {
    slug: "made-here-in-bengaluru",
    index: "010",
    title: "Made here. In Bengaluru.",
    date: "2026-07-20",
    category: "Studio",
    excerpt:
      "The studio grew out of a signage workshop. That's not a footnote — it's the whole accent.",
    readingTime: "3 min",
    body: [
      "Before it made objects for the home, this workshop made things for streets: signage. Acrylic, dimensional letters, metal, light — the stuff built to catch your eye from across four lanes of traffic.",
      "So when we point all that at a mirror or a coaster, a certain accent comes through. We think about how a thing reads from across a room, how it takes the light, how it announces itself without shouting.",
      "It's all done here, in Bengaluru — cut, finished, assembled, argued over, packed. Not sent off into an invisible supply chain and shipped back with a story stapled on.",
      "Designed here. Made here. Changed several times here. When we say “made here,” we mean the room we're standing in.",
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return journal.find((p) => p.slug === slug);
}
