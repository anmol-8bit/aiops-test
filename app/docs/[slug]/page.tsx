import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs-shell";
import { getAllDocPages, getDocPage } from "@/data/docs";

export function generateStaticParams() {
  return getAllDocPages().map((page) => ({ slug: page.slug }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getDocPage(slug);

  if (!page) {
    notFound();
  }

  return <DocsShell page={page} pages={getAllDocPages()} />;
}
