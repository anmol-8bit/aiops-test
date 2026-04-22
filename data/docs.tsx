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

export interface PieceMapping {
  stage: string;
  piece: string;
  action: string;
  logoSrc: string;
  why: string;
}

export interface DocSection {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  paragraphs?: string[];
  bullets?: string[];
  pieces?: PieceMapping[];
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
    kicker: "",
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
    kicker: "Technical Design Document",
    summary:
      "Neutrino turns raw observability evidence into a reviewed, structured Root Cause Analysis chronology. A workflow scopes the incident time window, retrieves logs and monitoring records, normalizes them into a canonical event model, drafts a chronological narrative through a governed LLM step, computes confidence signals, and persists the reviewed RCA artifact back into the incident record.",
    stats: [
      {
        label: "Analysis step",
        value: "LLM-drafted chronology",
        copy: "The reasoning stage uses a governed LLM call over normalized evidence, not a hand-written Code block.",
      },
      {
        label: "Review model",
        value: "Approval gate + persistence",
        copy: "The draft chronology is held at a wait-for-approval step before it is stored and published to the incident workspace.",
      },
      {
        label: "Operator outcome",
        value: "Structured RCA artifact",
        copy: "Operators receive an ordered causal timeline with probable root cause and confidence signals attached to the incident.",
      },
    ],
    badges: [
      "LLM-backed analysis",
      "Canonical field mapping",
      "Approval-gated publish",
      "Observability emit",
      "Architecture documented",
    ],
    sections: [
      {
        id: "document-purpose",
        kicker: "1. Purpose",
        title: "Document objective and scope",
        summary:
          "This document describes how Neutrino generates a reviewed RCA chronology from system logs and monitoring evidence. Unlike data collection, which assembles a unified source view, RCA generation performs an explicit analysis step: it reasons over the normalized evidence with a governed LLM call, computes confidence signals, holds the draft at an approval gate, and then persists the approved artifact.",
        bullets: [
          "Scope an incident-specific time window from the trigger payload using a date helper.",
          "Retrieve log records from a log database and monitoring APIs covering the window.",
          "Normalize raw text, then map the resulting fields into a canonical event schema.",
          "Draft a causal chronology through a governed LLM step configured with structured-output guidance.",
          "Compute confidence signals over the normalized event set to accompany the narrative.",
          "Hold the draft at an approval step, persist on approve, and emit back to the operator view plus the observability stack.",
        ],
        calloutTitle: "Implementation note",
        calloutBody:
          "The automation is composed from first-party embedded-workflow pieces. The LLM reasoning step, the approval gate, the persistence step, and the observability emit are all discrete, auditable node types in the workflow graph, not hidden behind custom code.",
      },
      {
        id: "high-level-design",
        kicker: "2. High-Level Design",
        title: "System architecture for RCA chronology generation",
        summary:
          "The implemented design organizes RCA generation into four explicit stages — retrieval, normalization, analysis, and review & publish. Each stage maps directly to first-party workflow pieces rather than generic code, so the automation is both auditable and replaceable stage by stage.",
        bullets: [
          "Retrieval stage scopes the time window and pulls evidence from the log database and monitoring systems.",
          "Normalization stage strips markup noise and projects source payloads into a canonical event schema.",
          "Analysis stage runs the LLM chronology draft and produces confidence aggregates over the normalized events.",
          "Review and publish stage gates the draft at human approval, persists the artifact in the workflow store, posts it to the Neutrino incident view, and emits an evidence log to the observability stack.",
          "The entire automation is expressed as a single linear workflow graph with explicit parallel source calls, not as an opaque analysis service.",
        ],
        diagram: "rca-hld",
        calloutTitle: "Why four stages",
        calloutBody:
          "The extra Analysis and Review stages are what distinguishes RCA from data collection. Data collection ends at normalized merge. RCA keeps going: it reasons, scores, approves, persists, and emits.",
      },
      {
        id: "piece-composition",
        kicker: "3. Piece Composition",
        title: "Stage-to-piece mapping",
        summary:
          "Every operational stage in the RCA workflow is satisfied by a specific first-party embedded-workflow piece and action. This table is the authoritative map from narrative stage to executable node and is what makes the automation inspectable end-to-end.",
        pieces: [
          {
            stage: "Incident trigger",
            piece: "Webhook",
            action: "catch-hook",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/webhooks.svg",
            why: "Receives the incident event and its correlation identifiers as the entry point of the workflow run.",
          },
          {
            stage: "Time-window scoping",
            piece: "Date Helper",
            action: "format-date / add-subtract-date",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/date-helper.svg",
            why: "Derives start and end timestamps for the retrieval query off the trigger timestamp so evidence stays incident-scoped.",
          },
          {
            stage: "Log database retrieval",
            piece: "Postgres",
            action: "run-query",
            logoSrc: "https://cdn.activepieces.com/pieces/postgres.png",
            why: "Executes a parameterized query against the log database for records in the scoped time window.",
          },
          {
            stage: "Monitoring / Syslog fetch",
            piece: "HTTP",
            action: "send-request",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
            why: "Calls Syslog and Zabbix APIs for events and alerts covering the same window. Used wherever a system does not have a first-party retrieval piece.",
          },
          {
            stage: "Text normalization",
            piece: "Text Helper",
            action: "strip-html / split / replace",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/text-helper.svg",
            why: "Removes markup, splits multi-line records, and cleans raw log lines before field mapping.",
          },
          {
            stage: "Canonical field mapping",
            piece: "Data Mapper",
            action: "advanced-mapping",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/data-mapper.svg",
            why: "Projects heterogeneous source payloads into a common event schema (timestamp, host, service, severity, signature).",
          },
          {
            stage: "RCA chronology drafting",
            piece: "Azure OpenAI",
            action: "ask-gpt",
            logoSrc: "https://cdn.activepieces.com/pieces/azure-openai.png",
            why: "Runs the governed LLM reasoning step with a structured-output prompt over the normalized events to draft the causal chronology.",
          },
          {
            stage: "Confidence signals",
            piece: "Data Summarizer",
            action: "count-uniques / get-min-max",
            logoSrc: "https://cdn.activepieces.com/pieces/data-summarizer.svg",
            why: "Computes aggregate statistics over the normalized event set to accompany the draft narrative as confidence and coverage metrics.",
          },
          {
            stage: "Review gate",
            piece: "Approval",
            action: "wait-for-approval",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/approvals.svg",
            why: "Pauses the workflow with a reviewer link until an operator approves or rejects the drafted chronology.",
          },
          {
            stage: "Artifact persistence",
            piece: "Store",
            action: "store-put",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/store.svg",
            why: "Writes the approved RCA chronology to workflow-scoped storage as a first-class, addressable artifact.",
          },
          {
            stage: "Publish to operator view",
            piece: "HTTP",
            action: "send-request (POST)",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
            why: "Pushes the persisted chronology into the Neutrino incident workspace as an operator-facing record.",
          },
          {
            stage: "Observability emit",
            piece: "Datadog",
            action: "send-multiple-logs",
            logoSrc: "https://cdn.activepieces.com/pieces/datadog.png",
            why: "Fans the RCA evidence out to the observability stack as a structured log so downstream tools can index the finding.",
          },
        ],
      },
      {
        id: "workflow-node-model",
        kicker: "4. Workflow Node Model",
        title: "Executable node graph",
        summary:
          "The RCA workflow graph renders the piece composition above as a single executable DAG. The four lanes — retrieval, normalization, analysis, and review & publish — are visible in the graph so the automation stays readable as a delivery artifact.",
        bullets: [
          "Retrieval lane: the Webhook trigger hands off to the Date Helper, which seeds parallel Postgres and HTTP retrieval calls.",
          "Normalization lane: Text Helper cleans raw log payloads, Data Mapper projects them into the canonical event schema.",
          "Analysis lane: Azure OpenAI drafts the chronology, Data Summarizer produces confidence aggregates over the same event set.",
          "Review and publish lane: Approval gates the draft, Store persists the artifact, HTTP publishes to the operator view, and Datadog emits the evidence log.",
        ],
        diagram: "rca-workflow",
        calloutTitle: "Why this graph is defensible",
        calloutBody:
          "Every labeled box in the graph is a real first-party piece with a real action. There are no generic Code steps standing in for reasoning or storage.",
      },
      {
        id: "chronology-data-flow",
        kicker: "5. Data Flow",
        title: "Evidence-to-chronology data flow",
        summary:
          "The data flow model shows how records are transformed as they move across the four stages. Raw log payloads enter, a governed artifact leaves, and every hop is a real piece action.",
        bullets: [
          "Input layer: Postgres rows and HTTP responses for Syslog/Zabbix are the raw evidence for the scoped window.",
          "Normalization layer: Text Helper produces cleaned log lines; Data Mapper emits canonical event objects with timestamp, host, service, severity, and signature fields.",
          "Analysis layer: Azure OpenAI consumes the canonical event set and returns a structured chronology; Data Summarizer returns parallel aggregate statistics.",
          "Governance layer: the Approval step yields a decision record attached to the draft.",
          "Output layer: the Store artifact, the HTTP publish payload for the Neutrino view, and the Datadog evidence log are the three concrete outputs of the run.",
        ],
        diagram: "rca-chronology",
      },
    ],
  },
  {
    slug: "centralized-dashboarding",
    title: "Centralized Dashboarding",
    kicker: "Technical Design Document",
    summary:
      "Neutrino publishes operational dashboards whose tiles are natural-language prompts, not hand-written SQL. Scheduled workflow pieces refresh each tile by calling the Neutrino Agent Platform, where a multi-schema Text-to-SQL sub-agent resolves the prompt against Postgres, Excel 365, internal Tables, or HTTP sources and returns a governed result with SQL, rows, and business analysis.",
    stats: [
      {
        label: "Tile definition",
        value: "Natural-language prompt",
        copy: "Each tile stores a question like 'SLA compliance this week by team', not a SQL string. The query is synthesized per refresh by the Text-to-SQL sub-agent against the correct schema.",
      },
      {
        label: "Execution layer",
        value: "Neutrino Agent Platform",
        copy: "Refreshes run through the platform's /run endpoint. The Main Agent dispatches the Text-to-SQL sub-agent in an isolated ReAct context and streams events via SSE into runs, run_events, and sub_agent_runs.",
      },
      {
        label: "Data surface",
        value: "Postgres · Excel 365 · Tables · HTTP",
        copy: "First-party workflow pieces read from the Postgres ticket database, Microsoft Excel 365 SLA workbooks, internal Tables records, and HTTP endpoints on the refresh cadence.",
      },
    ],
    badges: [
      "Agent-driven tiles",
      "Multi-schema Text-to-SQL",
      "ReAct sub-agent execution",
      "SSE-streamed refresh",
      "Approval-gated publish",
      "Architecture documented",
    ],
    sections: [
      {
        id: "document-purpose",
        kicker: "1. Purpose",
        title: "What this capability is",
        summary:
          "This page documents the centralized dashboarding capability as implemented across three layers: first-party workflow pieces that drive scheduled retrieval and publish, the Neutrino Agent Platform that orchestrates each tile refresh as a governed agent run, and a multi-schema Text-to-SQL sub-agent that resolves each natural-language prompt into a validated SQL query with a business analysis of the result set.",
        bullets: [
          "A dashboard tile is a stored natural-language prompt bound to a data source, not a fixed SQL statement.",
          "The scheduled refresh is executed by workflow pieces: Schedule triggers, Postgres run-query, Microsoft Excel 365 get-worksheet-rows, internal Tables find-records, CSV convert-csv-to-json, and HTTP for external feeds.",
          "Each tile refresh posts to the Neutrino Agent Platform, where the Main Agent dispatches the Text-to-SQL sub-agent in an isolated ReAct context.",
          "The Text-to-SQL sub-agent selects relevant tables, columns, and semantic entities, generates and validates SQL, executes it, and produces a business analysis over the full result set.",
          "Results stream back as SSE events (sub_agent.started, analysis_complete) and are persisted in runs and run_events before workflow pieces cache, approve, and publish the tile value.",
          "Approval-gated tiles pause at the Approval piece; the platform's HITL checkpoint pattern resumes them once an operator approves.",
        ],
        calloutTitle: "Implementation note",
        calloutBody:
          "The agent layer is the Neutrino Agent Platform repository; the SQL synthesis engine is the Text-to-SQL multi-schema agent. Both are our services. The workflow layer is composed entirely of first-party embedded-workflow pieces with named actions, so the refresh pipeline stays inspectable end-to-end.",
      },
      {
        id: "high-level-design",
        kicker: "2. High-Level Design",
        title: "Three-layer architecture: workflow, agent platform, SQL sub-agent",
        summary:
          "The implemented design separates refresh orchestration, agent execution, and SQL synthesis into three distinct layers. Workflow pieces handle cadence, retrieval, approval, persistence, and publish. The Neutrino Agent Platform owns the /run endpoint, main-agent loop, sub-agent isolation, event streaming, and HITL checkpoints. The Text-to-SQL sub-agent owns schema-aware SQL generation, validation, execution, and analysis.",
        bullets: [
          "Workflow layer: Schedule, Postgres, Microsoft Excel 365, Tables, CSV, Data Mapper, HTTP, Approval, Store, and Datadog pieces compose the refresh orchestration graph.",
          "Agent platform layer: POST /run accepts the tile prompt with workspace JWT; the Main Agent's ReAct loop routes to the query_database tool, which invokes the Text-to-SQL sub-agent with an isolated context and its own sub_agent_id.",
          "Text-to-SQL layer: the sub-agent uses get_relevant_tables, get_relevant_columns, and get_semantically_relevant_values tools against ChromaDB embeddings and MongoDB metadata to select context, synthesize SQL via Azure OpenAI, validate it, execute against the data source, and then generate a business analysis over the returned rows.",
          "Each tile run returns a structured payload of SQL, row data, and analysis, which the workflow caches via Store, optionally gates at Approval, and publishes to the Neutrino dashboard surface through HTTP and Datadog.",
          "The same three layers support both scheduled refreshes and ad-hoc tiles where an operator types a new question from the dashboard.",
        ],
        diagram: "dashboard-hld",
        calloutTitle: "Why three layers",
        calloutBody:
          "Splitting cadence and publish (workflow) from agent orchestration (agent platform) from SQL synthesis (text-to-sql) keeps each layer independently replaceable. New data sources are added as piece actions, new agent capabilities are added as sub-agents, and new SQL strategies are added as tools inside the Text-to-SQL sub-agent without touching the other two layers.",
      },
      {
        id: "piece-composition",
        kicker: "3. Piece Composition",
        title: "Workflow stage-to-piece mapping",
        summary:
          "Every stage of the dashboard refresh orchestration is satisfied by a specific first-party workflow piece and action. This table maps the narrative stages to the executable nodes that drive retrieval, the agent platform call, and the publish path.",
        pieces: [
          {
            stage: "Refresh cadence",
            piece: "Schedule",
            action: "every-x-minutes / cron-expression",
            logoSrc: "https://cdn.activepieces.com/pieces/schedule.png",
            why: "Fires the dashboard refresh on a configured cadence so every tile stays current without operator action.",
          },
          {
            stage: "Ticket database retrieval",
            piece: "Postgres",
            action: "run-query",
            logoSrc: "https://cdn.activepieces.com/pieces/postgres.png",
            why: "Executes parameterized queries against the operational Postgres database for incidents, ticket status, and resolution metrics.",
          },
          {
            stage: "SLA workbook ingestion",
            piece: "Microsoft Excel 365",
            action: "get-worksheet-rows",
            logoSrc: "https://cdn.activepieces.com/pieces/microsoft-excel-365.png",
            why: "Reads SLA definitions, service catalogs, and team ownership matrices directly from live Excel 365 worksheets.",
          },
          {
            stage: "Internal records",
            piece: "Tables",
            action: "find-records",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/tables.svg",
            why: "Pulls reference records from Neutrino's internal Tables store for thresholds, team rosters, and tile configuration.",
          },
          {
            stage: "CSV feed parsing",
            piece: "CSV",
            action: "convert-csv-to-json",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/csv.svg",
            why: "Parses CSV exports from upstream systems into structured JSON for downstream normalization.",
          },
          {
            stage: "Tile spec assembly",
            piece: "Data Mapper",
            action: "advanced-mapping",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/data-mapper.svg",
            why: "Builds the per-tile request payload — natural-language prompt, target schema, workspace context — before dispatching to the agent platform.",
          },
          {
            stage: "Agent platform dispatch",
            piece: "HTTP",
            action: "send-request (POST /run)",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
            why: "Posts the tile prompt to the Neutrino Agent Platform /run endpoint with the workspace JWT; the Main Agent dispatches the Text-to-SQL sub-agent from there.",
          },
          {
            stage: "Result aggregation",
            piece: "Data Summarizer",
            action: "count-uniques / get-min-max",
            logoSrc: "https://cdn.activepieces.com/pieces/data-summarizer.svg",
            why: "Computes cross-tile aggregates (open totals, breach counts, team rollups) over the combined sub-agent responses before publish.",
          },
          {
            stage: "Review gate",
            piece: "Approval",
            action: "wait-for-approval",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/approvals.svg",
            why: "Holds high-impact tiles (revenue, customer-facing) at a reviewer link until an operator approves the refreshed value.",
          },
          {
            stage: "Tile cache",
            piece: "Store",
            action: "store-put",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/store.svg",
            why: "Writes the approved tile payload — SQL, rows, and analysis — to workflow-scoped storage so the dashboard can read a stable artifact.",
          },
          {
            stage: "Dashboard publish",
            piece: "HTTP",
            action: "send-request (POST)",
            logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
            why: "Pushes the cached tile payload into the Neutrino dashboard surface so operators see a consistent value across the workspace.",
          },
          {
            stage: "Observability emit",
            piece: "Datadog",
            action: "send-multiple-logs",
            logoSrc: "https://cdn.activepieces.com/pieces/datadog.png",
            why: "Emits each tile refresh (prompt, SQL, row count, latency) as a structured log for cost, drift, and reliability tracking.",
          },
        ],
      },
      {
        id: "agent-execution-model",
        kicker: "4. Agent Platform Execution Model",
        title: "How a single tile refresh runs inside the agent platform",
        summary:
          "Once the workflow dispatches the tile prompt to POST /run, execution passes to the Neutrino Agent Platform. The Main Agent's ReAct loop routes to the query_database tool, which creates an isolated sub-agent run for the Text-to-SQL agent. The sub-agent runs its own ReAct loop, synthesizes SQL, executes it, and produces a business analysis — all streamed back as SSE events and persisted to the runs and run_events tables.",
        bullets: [
          "POST /run: the workflow posts the tile prompt, target schema_name, and connection_name with the workspace JWT. The platform records a new runs row and begins the Main Agent ReAct loop.",
          "Tool dispatch: the Main Agent sees query_database as a normal function, calls it, and the tool registry spawns a new sub_agent_runs record with a unique sub_agent_id for the Text-to-SQL agent.",
          "Sub-agent ReAct loop: the Text-to-SQL sub-agent uses get_relevant_tables, get_relevant_columns, and get_semantically_relevant_values as tools, backed by ChromaDB semantic search and the metadata store, to assemble the query context.",
          "SQL synthesis and validation: Azure OpenAI generates the SQL. SQLGlot validates and rewrites it if needed. The sub-agent then executes the query against the configured data source and captures the result rows.",
          "Business analysis: the sub-agent runs a second LLM call over sample rows plus computed column statistics to generate a markdown analysis that accompanies the rows in the tile payload.",
          "Event stream: sub_agent.started, sub_agent.tool_call, analysis_start, analysis_complete, and sub_agent.finish events are published via Redis pub/sub for live dashboards and written to run_events for audit.",
          "Return payload: the sub-agent returns { sql, data, analysis, formatted_output }. The Main Agent hands it back to the workflow as the /run response, which then caches, approves, and publishes through the pieces above.",
        ],
        diagram: "dashboard-workflow",
        calloutTitle: "Why this execution model matters",
        calloutBody:
          "The platform gives every tile refresh a persistent run_id and sub_agent_id, full SSE traceability, and a governed LLM reasoning step — so the dashboard is not a static BI report, it is an auditable agent run per tile that can be replayed, approved, and attributed.",
      },
      {
        id: "dashboard-data-flow",
        kicker: "5. Data Flow",
        title: "Prompt-to-tile data flow",
        summary:
          "The data flow shows how a scheduled trigger becomes a published tile: the workflow assembles a prompt, the agent platform returns structured SQL-plus-analysis, and workflow pieces cache and publish the value to the dashboard surface.",
        bullets: [
          "Input layer: Schedule fires; Postgres, Excel 365, Tables, CSV, and HTTP pieces surface the latest source data for the refresh window.",
          "Orchestration layer: Data Mapper builds the tile request ({ prompt, schema_name, connection_name, workspace_context }); HTTP POSTs it to the Neutrino Agent Platform /run endpoint.",
          "Agent layer: the Main Agent dispatches the Text-to-SQL sub-agent, which returns { sql, data, analysis } streamed as SSE events and persisted in runs / sub_agent_runs / run_events.",
          "Aggregation layer: Data Summarizer composes cross-tile rollups from the sub-agent responses.",
          "Governance layer: Approval pauses high-impact tiles; resumed runs carry the approver identity into the audit trail.",
          "Output layer: Store caches the tile artifact, HTTP publishes it to the Neutrino dashboard surface, and Datadog emits a structured log for the refresh.",
        ],
        diagram: "dashboard-dataflow",
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
