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
      "The Kolam Light takes the drawing you'd make at the doorstep and lifts it a few millimetres off the wall, in brass, backlit. The Vilakku Toran stretches the oil lamp into a hanging line.",
      "The rule we set ourselves: designed for the festival, not designed to disappear after it. If you'd happily leave it up in February, we got it right.",
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return journal.find((p) => p.slug === slug);
}
