export type DiagramKey =
  | "platform"
  | "alerts"
  | "rca"
  | "stakeholders"
  | "collection-hld"
  | "collection-workflow"
  | "collection-dataflow"
  | "governance";

export interface DocSection {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  paragraphs?: string[];
  bullets?: string[];
  diagram?: DiagramKey;
  calloutTitle?: string;
  calloutBody?: string;
}

export interface DocPage {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  stats: Array<{ label: string; value: string; copy: string }>;
  badges: string[];
  sections: DocSection[];
}

const DOC_PAGES: DocPage[] = [
  {
    slug: "overview",
    title: "Neutrino AI Ops Documentation",
    kicker: "Overview",
    summary:
      "This overview documents Neutrino AI Ops as an orchestration layer for incident intake, workflow execution, data transformation, and governed operational response.",
    stats: [
      {
        label: "Workflow model",
        value: "Trigger and action graph",
        copy: "The platform is built around a node-based workflow model that starts from a trigger and advances through executable steps.",
      },
      {
        label: "Execution primitives",
        value: "Piece, code, router, loop",
        copy: "The runtime supports external actions, code execution, branching, and iterative processing as first-class workflow operations.",
      },
      {
        label: "Core ingress",
        value: "Webhook and HTTP",
        copy: "The embedded workflow layer already supports webhook-triggered intake and HTTP-based retrieval or outbound calls.",
      },
    ],
    badges: [
      "Workflow orchestration",
      "Webhook-triggered intake",
      "HTTP-based integrations",
      "Branch and loop support",
    ],
    sections: [
      {
        id: "purpose",
        kicker: "1. Purpose",
        title: "Purpose",
        summary:
          "This documentation defines the role of Neutrino AI Ops in the incident lifecycle and establishes the workflow-backed capabilities currently implemented in the platform.",
        bullets: [
          "Describe Neutrino as the operational control layer for incident collection, transformation, decisioning, and response.",
          "Document the implemented workflow model used to ingest, process, and publish incident data.",
          "Show how external systems are integrated through trigger and action steps rather than ad hoc point connections.",
          "Provide an architecture baseline for technical reviewers, operators, and release stakeholders.",
        ],
        diagram: "platform",
      },
      {
        id: "platform-overview",
        kicker: "2. Platform Overview",
        title: "Platform overview",
        summary:
          "Neutrino AI Ops uses an embedded node-based workflow system to orchestrate incident-facing operations. The visual workflow surface is backed by a graph model of step nodes and execution edges, allowing Neutrino to represent triggers, action steps, branch paths, loops, and operational annotations in one flow canvas.",
        bullets: [
          "The workflow canvas is implemented as a graph of step, loop-return, add-button, end-widget, and note nodes.",
          "The builder uses React Flow node and edge types to render executable flow structure rather than static diagrams.",
          "Trigger steps initiate execution, while downstream actions are composed as ordered workflow nodes.",
          "Branch paths and loop structures are supported as native graph constructs, allowing more complex incident logic to remain visual and traceable.",
        ],
      },
      {
        id: "core-capabilities",
        kicker: "3. Core Capabilities",
        title: "Core capabilities",
        summary:
          "The current Neutrino workflow layer already exposes the core primitives needed for incident automation: inbound triggering, external system calls, in-flow data transformation, conditional routing, and iterative execution.",
        bullets: [
          "Webhook triggers can receive inbound HTTP requests and start workflow execution.",
          "HTTP actions can call external systems to retrieve or publish operational data.",
          "Code steps are supported as executable workflow actions for transformation, normalization, and enrichment.",
          "Router steps provide branch-based decisioning for controlled multi-path execution.",
          "Loop steps support repeated execution across item collections when a workflow needs iterative processing.",
        ],
      },
      {
        id: "architecture-scope",
        kicker: "4. Architecture Scope",
        title: "Architecture scope",
        summary:
          "From an architecture standpoint, Neutrino should be understood as an orchestration and presentation layer sitting above external operational systems. The embedded execution engine is responsible for running workflow actions, while Neutrino owns the incident-facing experience, data context, and operational outcomes.",
        bullets: [
          "External systems remain the source of truth for alerts, logs, inventory, and monitoring data.",
          "Neutrino workflows coordinate retrieval, transformation, and publishing across those systems.",
          "The execution engine supports four primary action categories: piece execution, code execution, router execution, and loop execution.",
          "Code execution is handled through a dedicated code executor and sandboxed runtime path.",
          "The resulting outputs are surfaced back into Neutrino as operator-facing incident context, not exposed as a separate workflow product.",
        ],
      },
    ],
  },
  {
    slug: "automated-data-collection",
    title: "Automated Data Collection",
    kicker: "Technical Design Document",
    summary:
      "Neutrino can automatically collect logs and operational records from disparate systems such as CMDB, Syslog, and Zabbix, then compile them into a single incident-ready view for operators.",
    stats: [
      {
        label: "Source systems",
        value: "CMDB, Syslog, Zabbix",
        copy: "Operational and monitoring data from separate systems is brought into one response path.",
      },
      {
        label: "Operator output",
        value: "Unified incident context",
        copy: "Teams work from a consolidated view instead of manually pivoting between tools.",
      },
      {
        label: "Execution model",
        value: "Workflow-backed automation",
        copy: "Collection, enrichment, and handoff are assumed to run through Neutrino Workflows.",
      },
    ],
    badges: [
      "Implemented in Neutrino",
      "Cross-system collection",
      "Unified log view",
      "Workflow-driven enrichment",
      "Architecture documented",
    ],
    sections: [
      {
        id: "document-purpose",
        kicker: "1. Purpose",
        title: "Document objective and implementation statement",
        summary:
          "This document describes an implemented Neutrino workflow that automates data collection across CMDB, Syslog, and Zabbix, then compiles the retrieved records into one operational incident view.",
        bullets: [
          "CMDB provides asset metadata, service ownership, and dependency relationships.",
          "Syslog provides machine, network, and application event records.",
          "Zabbix provides monitoring alerts, availability signals, and affected host context.",
          "Neutrino consolidates all retrieved data into a single investigation-ready view.",
        ],
        calloutTitle: "Implementation note",
        calloutBody:
          "This page should use completed-state language throughout: the workflow is built, the source collection pattern is established, and the operator-facing unified view is available through Neutrino.",
      },
      {
        id: "high-level-design",
        kicker: "2. High-Level Design",
        title: "System architecture for automated collection",
        summary:
          "The implemented design uses Neutrino as the orchestration and presentation layer. Source systems remain external, while collection, transformation, and view assembly are executed through Neutrino-controlled workflow steps and service boundaries.",
        bullets: [
          "External systems expose inventory, monitoring, and event data.",
          "Neutrino Workflows coordinate retrieval from each source system.",
          "Normalization and enrichment steps convert source-specific payloads into a common incident context.",
          "The resulting record is persisted or assembled into a single operator-facing response view.",
          "The same unified record can be reused by RCA, escalation, and stakeholder communication flows.",
        ],
        diagram: "collection-hld",
        calloutTitle: "Documentation stance",
        calloutBody:
          "Keep the HLD framed around Neutrino-native capabilities. The workflow layer should be shown as part of Neutrino orchestration, not as a separate branded product.",
      },
      {
        id: "workflow-node-model",
        kicker: "3. Workflow Node Model",
        title: "Implemented workflow design using orchestration nodes",
        summary:
          "The implemented automation can be described as a node-based workflow with explicit retrieval, transformation, and consolidation stages. This makes the design read like a real delivery artifact rather than a generic integration claim.",
        bullets: [
          "Trigger node starts the collection flow from an incident or monitoring event.",
          "Source retrieval nodes call CMDB, Syslog, and Zabbix independently.",
          "Transform nodes normalize timestamps, hosts, services, severity, ownership, and metadata.",
          "Merge node assembles source outputs into one correlated payload.",
          "Decision node validates completeness and decides whether to enrich further or publish.",
          "Output node writes the single compiled view into the Neutrino incident workspace.",
        ],
        diagram: "collection-workflow",
        calloutTitle: "Why the node view matters",
        calloutBody:
          "This is the most useful visual for customers and internal reviewers because it shows exactly how the automation is composed while still keeping the underlying embedded engine invisible.",
      },
      {
        id: "data-flow-model",
        kicker: "4. Data Flow Model",
        title: "Source-to-view data flow",
        summary:
          "The data flow model should show how records move from source systems into a normalized and enriched incident context before being published into the final Neutrino view.",
        bullets: [
          "Input layer: source payloads are pulled from CMDB, Syslog, and Zabbix.",
          "Processing layer: mapping, parsing, and enrichment convert source output into a common model.",
          "Aggregation layer: records are stitched together around asset, service, host, or incident identifiers.",
          "Output layer: the unified record is published into one Neutrino operator view.",
          "Reuse layer: the same output can feed RCA, response workflows, and communication updates.",
        ],
        diagram: "collection-dataflow",
      },
      {
        id: "operational-value",
        kicker: "5. Operational Outcome",
        title: "Why this implemented flow matters",
        summary:
          "This documented capability proves Neutrino is performing real operational data assembly, not just downstream notification automation. It is collecting, shaping, and operationalizing source-system context before any remediation or communication flow begins.",
        bullets: [
          "Reduces manual system hopping during incident investigation.",
          "Improves RCA quality by attaching asset and monitoring context early.",
          "Produces a stronger incident object for downstream response automation.",
          "Positions Neutrino as the operational control layer for collection, context, and action.",
        ],
      },
    ],
  },
  {
    slug: "never-miss-an-alert-again",
    title: "Never Miss an Alert Again",
    kicker: "Use Case 01",
    summary:
      "Use automation to detect incidents in real time, classify urgency, and escalate them immediately to the right team so no critical alert is left waiting in a queue.",
    stats: [
      {
        label: "Signal types",
        value: "Logs, alerts, webhooks",
        copy: "Structured and unstructured observability signals can enter the same response pipeline.",
      },
      {
        label: "Decision point",
        value: "Correlation + policy",
        copy: "Neutrino decides whether to route, enrich, or escalate based on incident context.",
      },
      {
        label: "Operator outcome",
        value: "Faster escalation",
        copy: "Teams receive actionable incidents instead of raw noisy alerts.",
      },
    ],
    badges: [
      "Connector-driven ingestion",
      "Real-time escalation paths",
      "Workflow-triggered routing",
    ],
    sections: [
      {
        id: "detection-flow",
        kicker: "Incident flow",
        title: "From raw signal to routed incident",
        summary:
          "Neutrino ingests alert signals, maps them into a common structure, applies correlation logic, and triggers the right escalation workflow without requiring a human to manually stitch systems together.",
        paragraphs: [
          "The product surface already supports connectors, normalized fields, AI Ops remedies, workflow definitions, and approval-aware execution. That means the release story can focus on real platform mechanics rather than aspirational automation copy.",
          "This flow matters because noisy alerting becomes operationally useful only after the platform can decide which team, workflow, or stakeholder path should receive the incident next.",
        ],
        bullets: [
          "Ingest observability data through supported connectors or HTTP/webhook entry points.",
          "Normalize fields such as timestamp, severity, service, host, trace, and environment.",
          "Match incidents to workflow definitions and SOP-linked response paths.",
          "Escalate to chat, email, ticketing, or custom endpoints using Neutrino Workflows.",
        ],
        diagram: "alerts",
        calloutTitle: "Docs emphasis",
        calloutBody:
          "Describe this capability as real-time detection and escalation orchestration. The workflow engine is the means, not the story.",
      },
      {
        id: "feature-proof",
        kicker: "Feature mapping",
        title: "How to document the feature technically",
        summary:
          "The docs should map every product claim to a visible system capability so the release material remains defensible.",
        bullets: [
          "AI Ops Connectors: source onboarding for ELK, Loki, and future observability systems.",
          "Data Mapping: canonical field normalization across connectors.",
          "Correlation: incident clustering and causal-chain generation.",
          "Workflows: triggerable remediation and escalation definitions.",
          "Approvals: optional policy step before downstream action is executed.",
        ],
      },
    ],
  },
  {
    slug: "rapid-root-cause-analysis",
    title: "Run Rapid Root Cause Analysis",
    kicker: "Use Case 02",
    summary:
      "Gather and analyze logs and system data to identify the likely root cause of an incident faster, then convert findings into structured remediation steps.",
    stats: [
      {
        label: "Normalized context",
        value: "Canonical log schema",
        copy: "Signals from multiple systems can be reasoned over consistently once mapped.",
      },
      {
        label: "Analysis artifact",
        value: "Causal chain",
        copy: "The operator can see how events connect instead of reading isolated lines.",
      },
      {
        label: "Execution output",
        value: "SOP-backed workflow",
        copy: "Findings transition directly into an action path, not a dead-end report.",
      },
    ],
    badges: [
      "Canonical field mapping",
      "Causal chain analysis",
      "SOP-linked remediation",
    ],
    sections: [
      {
        id: "rca-pipeline",
        kicker: "Analysis flow",
        title: "How Neutrino compresses RCA time",
        summary:
          "Root cause analysis becomes faster when logs, correlation context, SOP knowledge, and workflow execution live in the same operator workflow.",
        paragraphs: [
          "Neutrino does not stop at showing recent logs. It creates an incident object with summary, probable root cause, causal chain entries, and workflow context that can drive the next step of remediation.",
        ],
        bullets: [
          "Collect logs and event context from connected observability sources.",
          "Normalize raw documents into consistent top-level fields and metadata.",
          "Correlate related signals into an incident narrative and confidence-scored chain.",
          "Attach SOP references and pre-defined objectives to the incident.",
          "Generate a governed remediation workflow for execution or review.",
        ],
        diagram: "rca",
        calloutTitle: "Release language",
        calloutBody:
          "Position RCA as a closed-loop operational workflow: analysis leads directly to action, not just to another dashboard.",
      },
      {
        id: "technical-proof",
        kicker: "Technical proof points",
        title: "What makes the RCA story credible",
        summary:
          "The product model already supports root cause, summary, causal chain entries, SOP linkage, and workflow payloads. Those data structures are what make the docs more than conceptual architecture.",
        bullets: [
          "Connector pages show how incident context is sourced.",
          "Data mapping pages show how source fields become analyzable.",
          "Correlation pages show root cause, causal chain, and incident status.",
          "SOP pages show operator-curated runbooks and procedure content.",
          "Workflow pages show execution detail, status, and linked incident context.",
        ],
      },
    ],
  },
  {
    slug: "stakeholder-communication",
    title: "Stress-Free Stakeholder Communication",
    kicker: "Use Case 03",
    summary:
      "Automate status updates, approval checks, and outbound notifications so operators can keep the right people informed without manually coordinating every message.",
    stats: [
      {
        label: "Communication modes",
        value: "App, email, chat",
        copy: "The docs can show both operator-facing and stakeholder-facing notification paths.",
      },
      {
        label: "Control pattern",
        value: "Dual verification",
        copy: "Approvals can combine application decisions with email confirmation.",
      },
      {
        label: "Operational benefit",
        value: "Consistent updates",
        copy: "Stakeholders stay aligned while operators keep working the incident.",
      },
    ],
    badges: [
      "Automated status updates",
      "Approval-aware notifications",
      "Stakeholder routing patterns",
    ],
    sections: [
      {
        id: "comms-flow",
        kicker: "Communication flow",
        title: "Status communication without manual overhead",
        summary:
          "Manual communication breaks down when operators are also trying to investigate and remediate. Neutrino keeps the communication path structured and tied to incident state transitions.",
        paragraphs: [
          "The strongest version of this story is not generic notification automation. It is incident-state-driven communication that can be reviewed, approved, and delivered through consistent workflow steps.",
        ],
        bullets: [
          "Trigger stakeholder updates when incident status changes or remediation milestones complete.",
          "Route messages to the right audience based on incident team, priority, or workflow branch.",
          "Require approval before high-impact actions or external communications are sent.",
          "Track whether approvals were completed in-app, by email, or both.",
        ],
        diagram: "stakeholders",
        calloutTitle: "Narrative angle",
        calloutBody:
          "Document this as communication assurance during incidents, not as a generic messaging integration feature.",
      },
      {
        id: "approval-proof",
        kicker: "Control surface",
        title: "Why the communication story is operationally safe",
        summary:
          "Stakeholder automation matters only if execution is governed. Neutrino already has approval-aware UX and decision state that can be documented as part of the communications control loop.",
        bullets: [
          "Approvals page shows app and email verification states.",
          "Workflow status remains tied to incident and remedy context.",
          "Messages can be described as downstream workflow actions rather than ad hoc operator behavior.",
          "Communication steps become audit-friendly because the incident, workflow, and approval records are linked.",
        ],
      },
    ],
  },
  {
    slug: "platform-architecture",
    title: "Platform Architecture",
    kicker: "High-Level Design",
    summary:
      "The Neutrino AI Ops architecture combines tenant-aware control, normalized incident data, orchestration, and workflow execution behind a single operator-facing product surface.",
    stats: [
      {
        label: "Control plane",
        value: "Gateway + auth",
        copy: "Internal token minting, tenancy, and proxy policy enforce service boundaries.",
      },
      {
        label: "Operator plane",
        value: "AI Ops surfaces",
        copy: "Connectors, mappings, correlation, SOPs, approvals, and workflows are documented as one run path.",
      },
      {
        label: "Execution plane",
        value: "Neutrino Workflows",
        copy: "Embedded workflow execution is presented as a native product capability.",
      },
    ],
    badges: [
      "Tenant-scoped services",
      "Proxy-mediated execution",
      "Embedded workflow surface",
      "Governed action routing",
    ],
    sections: [
      {
        id: "hld",
        kicker: "Reference HLD",
        title: "High-level architecture view",
        summary:
          "The architecture should be documented as layered capability blocks: signal ingress, data shaping, analysis, decision controls, and workflow execution. That keeps the release docs clear without exposing unnecessary internal implementation detail.",
        bullets: [
          "User-facing AI Ops pages provide the operator surface.",
          "Gateway services handle auth, tenancy, proxying, and internal token issuance.",
          "Connector and agent services provide normalized data, RCA, and workflow support.",
          "Neutrino Workflows provide the execution fabric for action, escalation, and communications.",
        ],
        diagram: "platform",
        calloutTitle: "Boundary definition",
        calloutBody:
          "The docs should show that workflow execution is integrated into the platform through Neutrino service boundaries and workspace scoping rather than exposed as a standalone external product.",
      },
      {
        id: "request-flow",
        kicker: "Execution path",
        title: "How execution moves through the stack",
        summary:
          "The operator acts in Neutrino, the gateway mediates access and mints service tokens, downstream services perform analysis or execution, and results return to the operator-facing UX as one continuous flow.",
        bullets: [
          "The docs can explicitly show tenant-aware gateway routing and service token minting.",
          "Workflow library access and workflow selection are surfaced through Neutrino APIs.",
          "Public or embedded execution paths can be described as scoped entry points, not bypasses.",
          "Execution traces and approval state give the platform operational observability.",
        ],
      },
    ],
  },
  {
    slug: "integrations-and-workflow-execution",
    title: "Integrations and Workflow Execution",
    kicker: "Capability Details",
    summary:
      "Neutrino combines source connectivity, canonical field mapping, workflow definitions, and execution routing so incident workflows can act on structured context instead of raw events.",
    stats: [
      {
        label: "Ingress",
        value: "Connectors + HTTP",
        copy: "Document both prebuilt sources and open integration patterns.",
      },
      {
        label: "Execution model",
        value: "Definition to run",
        copy: "Workflow definitions and executed workflows are separate but linked concepts.",
      },
      {
        label: "Output paths",
        value: "Actions and notifications",
        copy: "The platform can call downstream systems after correlation and policy checks.",
      },
    ],
    badges: [
      "Source onboarding",
      "Field normalization",
      "Workflow definitions",
      "Execution visibility",
    ],
    sections: [
      {
        id: "integration-surface",
        kicker: "Integration surface",
        title: "How to document integrations",
        summary:
          "The docs should separate data ingress from action egress. That makes it clear Neutrino can both understand incidents and act on them.",
        bullets: [
          "Ingress: log connectors, webhooks, HTTP endpoints, observability sources.",
          "Shaping: field mapping for timestamp, severity, service, environment, host, trace, and metadata.",
          "Analysis: correlation and RCA context generation.",
          "Execution: workflow definitions that map trigger conditions to SOPs and automation flows.",
          "Egress: escalations, communication steps, and system actions routed through workflow execution.",
        ],
        diagram: "alerts",
      },
      {
        id: "workflow-model",
        kicker: "Execution model",
        title: "How workflows should be described",
        summary:
          "Treat a workflow as an approved operational response pattern attached to incident context, not merely as a set of automation nodes.",
        bullets: [
          "Definitions describe when a workflow should run and which SOP or automation flow it maps to.",
          "Executed workflows show incident title, status, objective, trigger text, and steps.",
          "Workflow execution becomes part of the operator record alongside remedy and approval data.",
          "This is what lets the docs present workflows as an operational feature instead of just embedded tooling.",
        ],
      },
    ],
  },
  {
    slug: "governance-approvals-and-security",
    title: "Governance, Approvals, and Security",
    kicker: "Controls",
    summary:
      "Neutrino AI Ops is designed to keep automation governed. Approval loops, workspace scoping, and service-boundary controls ensure the platform can automate incident response without losing operator oversight.",
    stats: [
      {
        label: "Approval model",
        value: "App + email decisions",
        copy: "The platform can document multiple verification paths before action completes.",
      },
      {
        label: "Security boundary",
        value: "Gateway-mediated access",
        copy: "Auth, tenancy, and internal token minting remain part of the execution story.",
      },
      {
        label: "Audit surface",
        value: "Incident-linked records",
        copy: "Approvals, workflows, and remedy context are all preserved as related operational artifacts.",
      },
    ],
    badges: [
      "Workspace isolation",
      "Approval gates",
      "Internal token controls",
      "Auditable actions",
    ],
    sections: [
      {
        id: "approval-loop",
        kicker: "Governance flow",
        title: "Approval-aware automation",
        summary:
          "Governance should be documented as a first-class execution feature. In Neutrino, incident workflows can pause for human verification before external action is taken.",
        bullets: [
          "Approval records are linked to incident remedies and workflow context.",
          "Dual-path verification can require both app action and email confirmation.",
          "Operators can approve, decline, or review before action is finalized.",
          "This keeps automation aligned with enterprise change and communication controls.",
        ],
        diagram: "governance",
        calloutTitle: "Security narrative",
        calloutBody:
          "The security story is not just identity. It is identity plus tenancy, policy checks, scoped internal service tokens, and approval-bound action execution.",
      },
      {
        id: "platform-controls",
        kicker: "Platform controls",
        title: "How to explain the secure execution model",
        summary:
          "The docs should make it clear that downstream execution is mediated by Neutrino services rather than performed directly from the browser or a loose automation endpoint.",
        bullets: [
          "Gateway routes enforce service and route policy.",
          "Internal tokens are minted for downstream audiences with tenant and workspace context.",
          "Public and embedded paths stay scoped to workspace-aware service claims.",
          "The resulting pattern is safer and easier to audit than direct client-to-tool automation.",
        ],
      },
    ],
  },
];

const ACTIVE_DOC_SLUGS = new Set(["overview", "automated-data-collection"]);

function getActiveDocPages() {
  return DOC_PAGES.filter((page) => ACTIVE_DOC_SLUGS.has(page.slug));
}

export function getAllDocPages() {
  return getActiveDocPages();
}

export function getDocPage(slug: string) {
  return getActiveDocPages().find((page) => page.slug === slug);
}
