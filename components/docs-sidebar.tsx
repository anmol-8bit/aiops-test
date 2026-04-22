import Link from "next/link";
import {
  BellElectric,
  Blocks,
  Cable,
  DatabaseZap,
  FileStack,
  MessageSquareMore,
  ShieldCheck,
  Siren,
} from "lucide-react";
import type { DocPage } from "@/data/docs";

const ICONS = {
  overview: FileStack,
  "automated-data-collection": DatabaseZap,
  "never-miss-an-alert-again": Siren,
  "rapid-root-cause-analysis": BellElectric,
  "stakeholder-communication": MessageSquareMore,
  "platform-architecture": Blocks,
  "integrations-and-workflow-execution": Cable,
  "governance-approvals-and-security": ShieldCheck,
};

export function DocsSidebar({
  currentSlug,
  pages,
}: {
  currentSlug: string;
  pages: DocPage[];
}) {
  return (
    <aside className="sidebar panel">
      <div className="sidebar-brand">
        <span className="brand-chip">Neutrino AI Ops</span>
        <strong className="brand-title">Documentation</strong>
        <span className="sidebar-copy">
          Neutrino AI-OPS capabilities documentation.
        </span>
      </div>

      <div className="nav-group">
        {pages.map((page) => {
          const Icon = ICONS[page.slug as keyof typeof ICONS] ?? FileStack;
          const active = page.slug === currentSlug;

          return (
            <Link
              className={`nav-link${active ? " active" : ""}`}
              href={`/docs/${page.slug}`}
              key={page.slug}
            >
              <span className="nav-icon">
                <Icon size={18} />
              </span>
              <span className="nav-text">
                <span className="nav-title">{page.title}</span>
                <span className="nav-caption">{page.kicker}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
