"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { DocPage } from "@/data/docs";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DiagramRenderer } from "@/components/diagrams";

export function DocsShell({
  page,
  pages,
}: {
  page: DocPage;
  pages: DocPage[];
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("docs-theme");
    const nextTheme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("docs-theme", theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <div className="docs-frame">
        <DocsSidebar currentSlug={page.slug} pages={pages} />

        <main className="content-panel panel">
          <header className="page-header">
            <div className="page-toolbar">
              <div className="eyebrow">{page.kicker}</div>
              <button
                type="button"
                className="theme-toggle"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
              </button>
            </div>
            <h1 className="page-title">{page.title}</h1>
            <p className="page-summary">{page.summary}</p>

            <div className="badge-row">
              {page.badges.map((badge) => (
                <span className="badge" key={badge}>
                  {badge}
                </span>
              ))}
            </div>

            <div className="page-grid">
              {page.stats.map((stat) => (
                <div className="stats-card" key={stat.label}>
                  <div className="eyebrow">{stat.label}</div>
                  <strong>{stat.value}</strong>
                  <p>{stat.copy}</p>
                </div>
              ))}
            </div>
          </header>

          {page.sections.map((section) => (
            <section className="section" id={section.id} key={section.id}>
              <div className="section-kicker">{section.kicker}</div>
              <h2 className="section-title">{section.title}</h2>
              <p className="section-copy">{section.summary}</p>

              <div
                className={
                  section.diagram === "platform" || section.diagram?.startsWith("collection") || section.diagram?.startsWith("rca-") || section.diagram?.startsWith("dashboard-")
                    ? "section-layout stacked-diagram"
                    : section.diagram
                      ? "two-col"
                      : undefined
                }
              >
                <div>
                  {section.paragraphs?.map((paragraph) => (
                    <p className="section-copy" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <div className="content-card">
                      <h4>Key points</h4>
                      <ul className="bullet-list">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {section.diagram ? (
                  <div>
                    <DiagramRenderer diagram={section.diagram} />
                  </div>
                ) : null}
              </div>

              {section.pieces && section.pieces.length > 0 ? (
                <div className="pieces-grid">
                  {section.pieces.map((piece) => (
                    <div className="piece-card" key={`${piece.piece}-${piece.action}-${piece.stage}`}>
                      <div className="piece-card-head">
                        <div className="piece-card-logo">
                          <img src={piece.logoSrc} alt={piece.piece} />
                        </div>
                        <div className="piece-card-title">
                          <span className="piece-card-stage">{piece.stage}</span>
                          <strong>
                            {piece.piece}
                            <span className="piece-card-action"> · {piece.action}</span>
                          </strong>
                        </div>
                      </div>
                      <p className="piece-card-why">{piece.why}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
