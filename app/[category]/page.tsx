import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, categoryPath, getCategory } from "@/data/categories";
import { getProduct } from "@/data/products";
import { ogImage } from "@/lib/site";
import CategoryView from "@/components/CategoryView";

// Category landing pages (/wall-clocks, /mirrors, …). Only the top-level slugs in
// data/categories.ts exist; anything else 404s. Sub-categories live under their parent.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.filter((c) => !c.parent).map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const c = getCategory(params.category);
  if (!c || c.parent) return {};
  const first = getProduct(c.products[0]);
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: categoryPath(c) },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: categoryPath(c), images: [ogImage(first?.slug ?? "home")] },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const c = getCategory(params.category);
  if (!c || c.parent) notFound();
  return <CategoryView c={c} />;
}
