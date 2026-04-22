export type DiagramKey =
  | "platform"
  | "alerts"
  | "rca"
  | "rca-hld"
  | "rca-workflow"
  | "rca-chronology"
  | "rca-dataflow"
  | "dashboard-hld"
  | "dashboard-workflow"
  | "dashboard-dataflow"
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
    title: "RCA Generation",
    kicker: "Use Case 02",
    summary:
      "Neutrino automates the initial Root Cause Analysis chronology by collecting system logs from connected sources, correlating events across time and service boundaries, and drafting a structured RCA timeline that operators can review, refine, and attach to incident records.",
    stats: [
      {
        label: "Log sources",
        value: "Syslog, CMDB, Zabbix",
        copy: "Operational logs from separate monitoring and inventory systems are pulled into one analysis context.",
      },
      {
        label: "Analysis artifact",
        value: "Chronological RCA draft",
        copy: "The output is an ordered timeline of contributing events, not a raw log dump or unstructured summary.",
      },
      {
        label: "Operator outcome",
        value: "Review-ready chronology",
        copy: "Operators receive a structured first draft they can validate and refine instead of building the timeline from scratch.",
      },
    ],
    badges: [
      "Implemented in Neutrino",
      "Log-driven chronology",
      "Cross-system correlation",
      "Workflow-backed generation",
      "Architecture documented",
    ],
    sections: [
      {
        id: "document-purpose",
        kicker: "1. Purpose",
        title: "Document objective and implementation statement",
        summary:
          "This document describes how Neutrino generates the initial Root Cause Analysis chronology from system logs. The implemented workflow collects log records from connected sources, correlates events by time, host, and service, and produces a structured RCA timeline that operators can review before attaching it to the incident record.",
        bullets: [
          "Syslog provides machine-level, network, and application event records with timestamps.",
          "CMDB provides asset metadata, ownership context, and service dependency relationships.",
          "Zabbix provides monitoring alerts, availability signals, and affected host context.",
          "Neutrino correlates these inputs into an ordered RCA chronology with causal chain entries.",
          "The generated chronology becomes part of the incident record and feeds downstream remediation workflows.",
        ],
        calloutTitle: "Implementation note",
        calloutBody:
          "This page documents the RCA generation capability as implemented: the workflow is built, the chronology output format is established, and operators can review and refine the generated timeline through the Neutrino incident workspace.",
      },
      {
        id: "high-level-design",
        kicker: "2. High-Level Design",
        title: "System architecture for RCA chronology generation",
        summary:
          "The implemented design uses Neutrino as the orchestration layer for RCA generation. Source systems provide raw log data, while correlation, timeline construction, and chronology formatting are executed through Neutrino-controlled workflow steps. The output is a structured RCA draft that operators can review before it becomes part of the formal incident record.",
        bullets: [
          "External systems expose log streams, monitoring alerts, and asset inventory data.",
          "Neutrino Workflows coordinate retrieval of relevant log windows from each source system.",
          "Normalization steps convert source-specific log formats into a common timestamped event model.",
          "Correlation logic groups related events by time proximity, affected host, service, and error signature.",
          "The RCA engine drafts a chronological narrative with contributing events, probable root cause, and confidence signals.",
          "The resulting chronology is persisted as a reviewable RCA artifact attached to the incident.",
        ],
        diagram: "rca-hld",
        calloutTitle: "Documentation stance",
        calloutBody:
          "Keep the HLD framed around Neutrino-native RCA capabilities. The workflow layer should be shown as part of the Neutrino analysis engine, not as a separate branded product.",
      },
      {
        id: "workflow-node-model",
        kicker: "3. Workflow Node Model",
        title: "Implemented workflow design for RCA chronology generation",
        summary:
          "The RCA generation automation is implemented as a node-based workflow with explicit log collection, normalization, correlation, chronology drafting, and review stages. Each stage maps to a real workflow node type, making the design traceable and auditable.",
        bullets: [
          "Trigger node starts the RCA generation flow when an incident is created or escalated.",
          "Source retrieval nodes call Syslog, CMDB, and Zabbix to pull relevant log windows and asset context.",
          "Transform nodes normalize timestamps, hostnames, service identifiers, severity levels, and error metadata into a canonical event format.",
          "Correlation node groups related events by time window, affected service, and error signature to build a causal chain.",
          "RCA drafting node generates the chronological narrative with ordered events, probable root cause hypothesis, and confidence scoring.",
          "Review gate node validates the generated chronology against minimum completeness criteria before publishing.",
          "Output node writes the RCA chronology into the Neutrino incident workspace for operator review.",
        ],
        diagram: "rca-workflow",
        calloutTitle: "Why the node view matters",
        calloutBody:
          "This is the most useful visual for customers and internal reviewers because it shows exactly how the RCA automation is composed — from log collection through chronology generation — while still keeping the underlying embedded engine invisible.",
      },
      {
        id: "chronology-data-flow",
        kicker: "4. Chronology Data Flow",
        title: "Log-to-chronology data flow",
        summary:
          "The data flow model shows how raw log records move from source systems through normalization, correlation, and chronology construction before being published as a structured RCA timeline in the Neutrino incident view.",
        bullets: [
          "Input layer: raw log payloads are pulled from Syslog, CMDB asset records, and Zabbix monitoring alerts for the relevant time window.",
          "Normalization layer: timestamp parsing, field mapping, and metadata enrichment convert heterogeneous log formats into a common event schema.",
          "Correlation layer: events are grouped by time proximity, host affinity, service relationship, and error pattern similarity.",
          "Chronology layer: correlated event groups are ordered into a causal timeline with contributing factors, root cause hypothesis, and confidence levels.",
          "Output layer: the structured RCA chronology is published to the Neutrino incident workspace for operator review and refinement.",
          "Reuse layer: the same chronology output can feed remediation workflows, stakeholder communication updates, and post-incident review reports.",
        ],
        diagram: "rca-chronology",
      },
      {
        id: "operational-value",
        kicker: "5. Operational Outcome",
        title: "Why automated RCA chronology generation matters",
        summary:
          "This documented capability proves Neutrino is performing real analytical work on incident data, not just collecting logs. It is correlating events, constructing causal timelines, and producing operator-ready RCA drafts that compress investigation time and improve the quality of root cause documentation.",
        bullets: [
          "Reduces the time operators spend manually reconstructing incident timelines from scattered log sources.",
          "Improves RCA quality by systematically including events from all connected systems instead of relying on operator memory.",
          "Produces a consistent, structured chronology format that can be compared across incidents for pattern detection.",
          "Connects the RCA output directly to remediation workflows so findings transition into action rather than static reports.",
          "Positions Neutrino as the operational intelligence layer that transforms raw logs into actionable incident understanding.",
        ],
      },
    ],
  },
  {
    slug: "centralized-dashboarding",
    title: "Centralized Dashboarding",
    kicker: "Use Case 03",
    summary:
      "Neutrino connects structured data sources such as PostgreSQL databases and Excel files to build a unified operational dashboard showing open tickets, SLA status, and service health in one consolidated view.",
    stats: [
      {
        label: "Data sources",
        value: "PostgreSQL, Excel, APIs",
        copy: "Structured operational data from databases, spreadsheets, and service endpoints is pulled into one analytics context.",
      },
      {
        label: "Dashboard output",
        value: "Unified ticket and SLA view",
        copy: "The output is a consolidated operational dashboard, not a raw data dump or disconnected report.",
      },
      {
        label: "Operator outcome",
        value: "Single-pane visibility",
        copy: "Operators and managers see real-time ticket status and SLA compliance without switching between systems.",
      },
    ],
    badges: [
      "Implemented in Neutrino",
      "Multi-source analytics",
      "PostgreSQL integration",
      "Excel file ingestion",
      "Architecture documented",
    ],
    sections: [
      {
        id: "document-purpose",
        kicker: "1. Purpose",
        title: "Document objective and implementation statement",
        summary:
          "This document describes how Neutrino builds centralized operational dashboards by connecting to structured data sources. The implemented workflow retrieves ticket records from PostgreSQL databases, ingests SLA and inventory data from Excel files, and assembles a unified dashboard view that operators and managers can use for real-time operational visibility.",
        bullets: [
          "PostgreSQL provides live ticket records, incident status, assignment history, and resolution timestamps.",
          "Excel files provide SLA definitions, service inventory, team ownership mappings, and compliance thresholds.",
          "HTTP APIs provide supplementary operational data from external ticketing and monitoring systems.",
          "Neutrino consolidates these inputs into a single dashboard with ticket counts, SLA compliance metrics, and service health indicators.",
          "The generated dashboard becomes a persistent operational view that refreshes on schedule or on-demand.",
        ],
        calloutTitle: "Implementation note",
        calloutBody:
          "This page documents the centralized dashboarding capability as implemented: the data connections are established, the dashboard layout is configured, and operators can view live ticket and SLA status through the Neutrino workspace.",
      },
      {
        id: "high-level-design",
        kicker: "2. High-Level Design",
        title: "System architecture for centralized dashboarding",
        summary:
          "The implemented design uses Neutrino as the orchestration and presentation layer for operational dashboards. Data sources remain external, while retrieval, transformation, aggregation, and visualization are executed through Neutrino-controlled workflow steps. The output is a unified dashboard that operators can access without logging into individual source systems.",
        bullets: [
          "PostgreSQL databases expose ticket records, incident tables, and operational metrics through SQL queries.",
          "Excel files provide reference data including SLA targets, service catalogs, and team ownership matrices.",
          "Neutrino Workflows coordinate retrieval from each data source on schedule or trigger.",
          "Transformation steps normalize ticket schemas, calculate SLA compliance, and aggregate counts by status, priority, and team.",
          "The resulting dashboard is assembled as a Neutrino operator view with charts, tables, and status indicators.",
          "The same aggregated data can feed alerting workflows when SLA thresholds are breached.",
        ],
        diagram: "dashboard-hld",
        calloutTitle: "Documentation stance",
        calloutBody:
          "Keep the HLD framed around Neutrino-native dashboarding capabilities. The data connectivity layer should be shown as part of Neutrino orchestration, not as a separate data integration product.",
      },
      {
        id: "workflow-node-model",
        kicker: "3. Workflow Node Model",
        title: "Implemented workflow design for dashboard data assembly",
        summary:
          "The dashboarding automation is implemented as a node-based workflow with explicit data retrieval, transformation, aggregation, and dashboard publishing stages. Each stage maps to a real workflow node type, making the data pipeline traceable and auditable.",
        bullets: [
          "Trigger node starts the dashboard refresh flow on schedule or when manually requested.",
          "PostgreSQL retrieval nodes execute SQL queries to pull open tickets, incident records, and resolution metrics.",
          "File ingestion nodes parse Excel files containing SLA definitions, service catalogs, and team ownership data.",
          "Transform nodes normalize ticket schemas, join records across sources, and calculate SLA compliance percentages.",
          "Aggregation node groups tickets by status, priority, team, and SLA compliance state.",
          "Branch node validates data completeness before publishing the dashboard view.",
          "Output node writes the assembled dashboard data into the Neutrino workspace for operator access.",
        ],
        diagram: "dashboard-workflow",
        calloutTitle: "Why the node view matters",
        calloutBody:
          "This is the most useful visual for customers and internal reviewers because it shows exactly how the dashboard data pipeline is composed — from source queries through aggregation to dashboard output — while still keeping the underlying embedded engine invisible.",
      },
      {
        id: "dashboard-data-flow",
        kicker: "4. Dashboard Data Flow",
        title: "Source-to-dashboard data flow",
        summary:
          "The data flow model shows how raw records move from PostgreSQL databases and Excel files through normalization, SLA calculation, and aggregation before being published as a unified operational dashboard in the Neutrino workspace.",
        bullets: [
          "Input layer: ticket records are queried from PostgreSQL and reference data is parsed from Excel files for the configured data scope.",
          "Normalization layer: schema mapping, field standardization, and timestamp alignment convert heterogeneous source formats into a common ticket model.",
          "Calculation layer: SLA compliance percentages, aging metrics, and breach counts are computed against defined thresholds.",
          "Aggregation layer: normalized records are grouped by status, priority, assigned team, service, and SLA state.",
          "Output layer: the aggregated data is published to the Neutrino workspace as an interactive operational dashboard.",
          "Alerting layer: the same aggregated data can trigger SLA breach notifications and escalation workflows.",
        ],
        diagram: "dashboard-dataflow",
      },
      {
        id: "operational-value",
        kicker: "5. Operational Outcome",
        title: "Why centralized dashboarding matters",
        summary:
          "This documented capability proves Neutrino is performing real data analytics work, not just displaying static reports. It is connecting to live data sources, computing SLA compliance, and producing a unified operational view that gives teams immediate visibility into ticket health and service performance.",
        bullets: [
          "Eliminates the need for operators and managers to log into multiple systems to understand current ticket status.",
          "Improves SLA compliance visibility by computing breach risk in real time against defined thresholds.",
          "Produces a consistent, unified view that can be shared across teams for aligned operational understanding.",
          "Connects the dashboard output to alerting and escalation workflows so SLA breaches trigger immediate action.",
          "Positions Neutrino as the operational intelligence layer that transforms scattered data into actionable dashboards.",
        ],
      },
    ],
  },
  {
    slug: "stakeholder-communication",
    title: "Stress-Free Stakeholder Communication",
    kicker: "Use Case 04",
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

const ACTIVE_DOC_SLUGS = new Set(["overview", "automated-data-collection", "rapid-root-cause-analysis", "centralized-dashboarding"]);

function getActiveDocPages() {
  return DOC_PAGES.filter((page) => ACTIVE_DOC_SLUGS.has(page.slug));
}

export function getAllDocPages() {
  return getActiveDocPages();
}

export function getDocPage(slug: string) {
  return getActiveDocPages().find((page) => page.slug === slug);
}
