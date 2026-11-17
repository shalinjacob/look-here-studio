import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categoryPath, getCategory } from "@/data/categories";
import { getProduct } from "@/data/products";
import { ogImage } from "@/lib/site";
import CategoryView from "@/components/CategoryView";

// Small Runs sub-pages (/small-runs/wall-decals, …). Only sub-categories whose
// parent is "small-runs" exist.
export const dynamicParams = false;

const subs = () => categories.filter((c) => c.parent === "small-runs");

export function generateStaticParams() {
  return subs().map((c) => ({ sub: c.slug }));
}

const find = (slug: string) => subs().find((c) => c.slug === slug);

export function generateMetadata({ params }: { params: { sub: string } }): Metadata {
  const c = find(params.sub);
  if (!c) return {};
  const first = getProduct(c.products[0]);
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: categoryPath(c) },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: categoryPath(c), images: [ogImage(first?.slug ?? "home")] },
  };
}

export default function SmallRunsSubPage({ params }: { params: { sub: string } }) {
  const c = find(params.sub);
  if (!c) notFound();
  return <CategoryView c={c} />;
}
