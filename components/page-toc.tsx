import type { DocSection } from "@/data/docs";

export function PageToc({ sections }: { sections: DocSection[] }) {
  return (
    <aside className="toc panel">
      <div className="toc-label">On this page</div>
      <nav>
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
