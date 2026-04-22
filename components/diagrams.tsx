"use client";

import {
  Background,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { motion } from "framer-motion";
import {
  Blocks,
  BellRing,
  SearchCheck,
  ShieldCheck,
  Send,
  Sparkles,
} from "lucide-react";
import type { DiagramKey } from "@/data/docs";
import "@xyflow/react/dist/style.css";

function DiagramFrame({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="diagram-frame">
      <div className="diagram-title-row">
        <div>
          <div className="diagram-title">{title}</div>
          <div className="diagram-note">{note}</div>
        </div>
      </div>
      <div className="diagram-canvas">{children}</div>
    </div>
  );
}

function floatIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: "easeOut" as const, delay },
  };
}

function pulse(delay = 0) {
  return {
    initial: { opacity: 0.15, scale: 0.92 },
    animate: { opacity: [0.15, 0.4, 0.15], scale: [0.92, 1, 0.92] },
    transition: {
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  };
}

type BuilderNodeProps = {
  title: string;
  subtitle: string;
  logoSrc: string;
  isTrigger?: boolean;
  index?: number | string;
  compact?: boolean;
};

type WorkflowCanvasNodeData = BuilderNodeProps & {
  branch?: boolean;
  fanIn?: boolean;
  multiTarget?: boolean;
};

type ArtifactNodeData = {
  title: string;
  subtitle: string;
  tone?: "default" | "success";
};

function BuilderNode({
  title,
  subtitle,
  logoSrc,
  isTrigger = false,
  index,
  compact = false,
}: BuilderNodeProps) {
  return (
    <div
      className={`builder-step-node${isTrigger ? " is-trigger" : ""}${compact ? " compact" : ""}`}
    >
      {isTrigger ? <div className="builder-trigger-chip">Trigger</div> : null}
      <div className="builder-step-index">{index}</div>
      <div className="builder-node-logo">
        <img src={logoSrc} alt={title} />
      </div>
      <div className="builder-node-text">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      <span className="builder-handle top" />
      <span className="builder-handle bottom" />
    </div>
  );
}

function BuilderArrow({ label }: { label?: string }) {
  return (
    <div className="builder-arrow-wrap">
      {label ? <div className="builder-arrow-label">{label}</div> : null}
      <div className="builder-arrow" />
    </div>
  );
}

function BuilderCanvasRow({
  nodes,
  compact = false,
}: {
  nodes: BuilderNodeProps[];
  compact?: boolean;
}) {
  return (
    <div className="builder-canvas-row">
      {nodes.map((node, index) => (
        <motion.div key={`${node.title}-${index}`} className="builder-node-pair" {...floatIn(index * 0.08)}>
          <BuilderNode
            {...node}
            index={node.index ?? index + 1}
            compact={compact || node.compact}
          />
          {index < nodes.length - 1 ? <BuilderArrow /> : null}
        </motion.div>
      ))}
    </div>
  );
}

function BuilderCanvasRows({
  rows,
  compact = false,
}: {
  rows: BuilderNodeProps[][];
  compact?: boolean;
}) {
  return (
    <div className="builder-canvas-rows">
      {rows.map((row, rowIndex) => (
        <div className="builder-canvas-row-block" key={`row-${rowIndex}`}>
          <BuilderCanvasRow nodes={row} compact={compact} />
        </div>
      ))}
    </div>
  );
}

function WorkflowCanvasNode({ data }: NodeProps<Node<WorkflowCanvasNodeData>>) {
  return (
    <>
      <Handle type="target" id="left" position={Position.Left} className="rf-handle" />
      {data.multiTarget ? (
        <>
          <Handle
            type="target"
            id="left-top"
            position={Position.Left}
            className="rf-handle"
            style={{ top: "24%" }}
          />
          <Handle
            type="target"
            id="left-mid"
            position={Position.Left}
            className="rf-handle"
            style={{ top: "50%" }}
          />
          <Handle
            type="target"
            id="left-bottom"
            position={Position.Left}
            className="rf-handle"
            style={{ top: "76%" }}
          />
        </>
      ) : null}
      <BuilderNode
        title={data.title}
        subtitle={data.subtitle}
        logoSrc={data.logoSrc}
        isTrigger={data.isTrigger}
        index={data.index}
        compact
      />
      <Handle type="source" id="right" position={Position.Right} className="rf-handle" />
      {data.branch ? (
        <>
          <Handle
            type="source"
            id="yes"
            position={Position.Right}
            className="rf-handle rf-handle-yes"
            style={{ top: "30%" }}
          />
          <Handle
            type="source"
            id="no"
            position={Position.Right}
            className="rf-handle rf-handle-no"
            style={{ top: "72%" }}
          />
        </>
      ) : null}
      {data.fanIn ? <Handle type="source" id="down" position={Position.Bottom} className="rf-handle" /> : null}
    </>
  );
}

function ArtifactCanvasNode({ data }: NodeProps<Node<ArtifactNodeData>>) {
  return (
    <>
      <Handle type="target" id="left" position={Position.Left} className="rf-handle" />
      <div className={`artifact-node${data.tone === "success" ? " success" : ""}`}>
        <strong>{data.title}</strong>
        <span>{data.subtitle}</span>
      </div>
    </>
  );
}

const workflowNodeTypes = {
  workflow: WorkflowCanvasNode,
  artifact: ArtifactCanvasNode,
};

function WorkflowGraphDiagram() {
  const nodes: Node<WorkflowCanvasNodeData>[] = [
    {
      id: "trigger",
      type: "workflow",
      position: { x: 40, y: 190 },
      data: {
        title: "Webhook",
        subtitle: "Catch incident event",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/webhooks.svg",
        isTrigger: true,
        index: 1,
      },
    },
    {
      id: "cmdb",
      type: "workflow",
      position: { x: 360, y: 18 },
      data: {
        title: "HTTP",
        subtitle: "CMDB lookup",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
        index: 2,
      },
    },
    {
      id: "syslog",
      type: "workflow",
      position: { x: 360, y: 190 },
      data: {
        title: "HTTP",
        subtitle: "Syslog fetch",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
        index: 3,
      },
    },
    {
      id: "zabbix",
      type: "workflow",
      position: { x: 360, y: 362 },
      data: {
        title: "HTTP",
        subtitle: "Zabbix fetch",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
        index: 4,
      },
    },
    {
      id: "normalize",
      type: "workflow",
      position: { x: 690, y: 190 },
      data: {
        title: "Code",
        subtitle: "Normalize payloads",
        logoSrc: "/code-node.svg",
        index: 5,
        multiTarget: true,
      },
    },
    {
      id: "merge",
      type: "workflow",
      position: { x: 970, y: 190 },
      data: {
        title: "Code",
        subtitle: "Merge records",
        logoSrc: "/code-node.svg",
        index: 6,
      },
    },
    {
      id: "branch",
      type: "workflow",
      position: { x: 1240, y: 190 },
      data: {
        title: "Branch",
        subtitle: "Collection complete?",
        logoSrc: "/branch-node.svg",
        index: 7,
        branch: true,
      },
    },
    {
      id: "publish",
      type: "workflow",
      position: { x: 1555, y: 92 },
      data: {
        title: "HTTP",
        subtitle: "Update Neutrino view",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
        index: "8A",
      },
    },
    {
      id: "retry",
      type: "workflow",
      position: { x: 1555, y: 288 },
      data: {
        title: "Code",
        subtitle: "Request missing data",
        logoSrc: "/code-node.svg",
        index: "8B",
      },
    },
  ];

  const edges: Edge[] = [
    {
      id: "e-trigger-cmdb",
      source: "trigger",
      target: "cmdb",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "e-trigger-syslog",
      source: "trigger",
      target: "syslog",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "e-trigger-zabbix",
      source: "trigger",
      target: "zabbix",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "e-cmdb-normalize",
      source: "cmdb",
      target: "normalize",
      sourceHandle: "right",
      targetHandle: "left-top",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(21, 21, 21, 0.35)" },
      style: { stroke: "rgba(21, 21, 21, 0.28)", strokeWidth: 2 },
    },
    {
      id: "e-syslog-normalize",
      source: "syslog",
      target: "normalize",
      sourceHandle: "right",
      targetHandle: "left-mid",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "e-zabbix-normalize",
      source: "zabbix",
      target: "normalize",
      sourceHandle: "right",
      targetHandle: "left-bottom",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(21, 21, 21, 0.35)" },
      style: { stroke: "rgba(21, 21, 21, 0.28)", strokeWidth: 2 },
    },
    {
      id: "e-normalize-merge",
      source: "normalize",
      target: "merge",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "e-merge-branch",
      source: "merge",
      target: "branch",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "e-branch-publish",
      source: "branch",
      target: "publish",
      sourceHandle: "yes",
      targetHandle: "left",
      type: "smoothstep",
      label: "YES",
      labelStyle: { fill: "#626262", fontSize: 11, fontWeight: 700 },
      labelBgStyle: { fill: "#f8f3eb", fillOpacity: 1 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 8,
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(19, 92, 87, 0.78)" },
      style: { stroke: "rgba(19, 92, 87, 0.78)", strokeWidth: 2.5 },
    },
    {
      id: "e-branch-retry",
      source: "branch",
      target: "retry",
      sourceHandle: "no",
      targetHandle: "left",
      type: "smoothstep",
      label: "NO",
      labelStyle: { fill: "#626262", fontSize: 11, fontWeight: 700 },
      labelBgStyle: { fill: "#f8f3eb", fillOpacity: 1 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 8,
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
  ];

  return (
    <div className="workflow-flow-wrap">
      <div className="workflow-lane lane-sources">
        <span>Source retrieval</span>
      </div>
      <div className="workflow-lane lane-processing">
        <span>Normalization and merge</span>
      </div>
      <div className="workflow-lane lane-branch">
        <span>Decision and publish</span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={workflowNodeTypes}
        fitView
        fitViewOptions={{ padding: 0.18, minZoom: 0.55, maxZoom: 1 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        className="workflow-flow"
      >
        <Background gap={24} size={1} color="rgba(21,21,21,0.06)" />
      </ReactFlow>
    </div>
  );
}

function DataFlowCanvasDiagram() {
  const nodes: Array<Node<WorkflowCanvasNodeData | ArtifactNodeData>> = [
    {
      id: "trigger",
      type: "workflow",
      position: { x: 50, y: 170 },
      data: {
        title: "Webhook",
        subtitle: "Start collection",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/webhooks.svg",
        isTrigger: true,
        index: 1,
      },
    },
    {
      id: "cmdb",
      type: "workflow",
      position: { x: 330, y: 20 },
      data: {
        title: "HTTP",
        subtitle: "CMDB",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
        index: 2,
      },
    },
    {
      id: "syslog",
      type: "workflow",
      position: { x: 330, y: 170 },
      data: {
        title: "HTTP",
        subtitle: "Syslog",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
        index: 3,
      },
    },
    {
      id: "zabbix",
      type: "workflow",
      position: { x: 330, y: 320 },
      data: {
        title: "HTTP",
        subtitle: "Zabbix",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
        index: 4,
      },
    },
    {
      id: "normalize",
      type: "workflow",
      position: { x: 640, y: 90 },
      data: {
        title: "Code",
        subtitle: "Parse + normalize",
        logoSrc: "/code-node.svg",
        index: 5,
        fanIn: true,
        multiTarget: true,
      },
    },
    {
      id: "enrich",
      type: "workflow",
      position: { x: 640, y: 250 },
      data: {
        title: "Code",
        subtitle: "Enrich + merge",
        logoSrc: "/code-node.svg",
        index: 6,
      },
    },
    {
      id: "branch",
      type: "workflow",
      position: { x: 940, y: 170 },
      data: {
        title: "Branch",
        subtitle: "Ready to publish?",
        logoSrc: "/branch-node.svg",
        index: 7,
        branch: true,
      },
    },
    {
      id: "publish",
      type: "workflow",
      position: { x: 1235, y: 95 },
      data: {
        title: "HTTP",
        subtitle: "Publish output",
        logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
        index: "8A",
      },
    },
    {
      id: "retry",
      type: "workflow",
      position: { x: 1235, y: 265 },
      data: {
        title: "Code",
        subtitle: "Retry enrichment",
        logoSrc: "/code-node.svg",
        index: "8B",
      },
    },
    {
      id: "incident-view",
      type: "artifact",
      position: { x: 1530, y: 95 },
      data: {
        title: "Unified incident view",
        subtitle: "Compiled source evidence, asset context, and monitoring state in one Neutrino record.",
        tone: "success",
      },
    },
  ];

  const edges: Edge[] = [
    {
      id: "d-trigger-cmdb",
      source: "trigger",
      target: "cmdb",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "d-trigger-syslog",
      source: "trigger",
      target: "syslog",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "d-trigger-zabbix",
      source: "trigger",
      target: "zabbix",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "d-cmdb-normalize",
      source: "cmdb",
      target: "normalize",
      sourceHandle: "right",
      targetHandle: "left-top",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(21, 21, 21, 0.32)" },
      style: { stroke: "rgba(21, 21, 21, 0.28)", strokeWidth: 2 },
    },
    {
      id: "d-syslog-normalize",
      source: "syslog",
      target: "normalize",
      sourceHandle: "right",
      targetHandle: "left-mid",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "d-zabbix-enrich",
      source: "zabbix",
      target: "enrich",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(21, 21, 21, 0.32)" },
      style: { stroke: "rgba(21, 21, 21, 0.28)", strokeWidth: 2 },
    },
    {
      id: "d-normalize-enrich",
      source: "normalize",
      target: "enrich",
      sourceHandle: "down",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "d-enrich-branch",
      source: "enrich",
      target: "branch",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "d-branch-publish",
      source: "branch",
      target: "publish",
      sourceHandle: "yes",
      targetHandle: "left",
      type: "smoothstep",
      label: "READY",
      labelStyle: { fill: "#626262", fontSize: 11, fontWeight: 700 },
      labelBgStyle: { fill: "#f8f3eb", fillOpacity: 1 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 8,
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(19, 92, 87, 0.78)" },
      style: { stroke: "rgba(19, 92, 87, 0.78)", strokeWidth: 2.5 },
    },
    {
      id: "d-branch-retry",
      source: "branch",
      target: "retry",
      sourceHandle: "no",
      targetHandle: "left",
      type: "smoothstep",
      label: "RETRY",
      labelStyle: { fill: "#626262", fontSize: 11, fontWeight: 700 },
      labelBgStyle: { fill: "#f8f3eb", fillOpacity: 1 },
      labelBgPadding: [6, 3],
      labelBgBorderRadius: 8,
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(216, 95, 47, 0.75)" },
      style: { stroke: "rgba(216, 95, 47, 0.75)", strokeWidth: 2.5 },
    },
    {
      id: "d-publish-view",
      source: "publish",
      target: "incident-view",
      sourceHandle: "right",
      targetHandle: "left",
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(19, 92, 87, 0.78)" },
      style: { stroke: "rgba(19, 92, 87, 0.78)", strokeWidth: 2.5 },
    },
  ];

  return (
    <div className="workflow-flow-wrap dataflow-flow-wrap">
      <div className="workflow-lane lane-input">
        <span>Input nodes</span>
      </div>
      <div className="workflow-lane lane-processing dataflow-processing">
        <span>Processing nodes</span>
      </div>
      <div className="workflow-lane lane-output">
        <span>Output and record view</span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={workflowNodeTypes}
        fitView
        fitViewOptions={{ padding: 0.18, minZoom: 0.52, maxZoom: 1 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        className="workflow-flow"
      >
        <Background gap={24} size={1} color="rgba(21,21,21,0.06)" />
      </ReactFlow>
    </div>
  );
}

function BuilderBranchSplit({
  branch,
  left,
  right,
  leftLabel = "Yes",
  rightLabel = "No",
  compact = true,
}: {
  branch: BuilderNodeProps;
  left: BuilderNodeProps;
  right: BuilderNodeProps;
  leftLabel?: string;
  rightLabel?: string;
  compact?: boolean;
}) {
  return (
    <div className="branch-split-canvas">
      <motion.div className="branch-top" {...floatIn(0.1)}>
        <BuilderNode {...branch} index={branch.index ?? 1} compact={compact} />
      </motion.div>
      <div className="branch-line branch-line-incoming" />
      <div className="branch-line branch-line-vertical" />
      <div className="branch-line branch-line-horizontal" />
      <div className="branch-line branch-line-left-down" />
      <div className="branch-line branch-line-right-down" />
      <div className="branch-label branch-label-left">{leftLabel}</div>
      <div className="branch-label branch-label-right">{rightLabel}</div>
      <div className="branch-bottom">
        <motion.div {...floatIn(0.18)}>
          <BuilderNode {...left} index={left.index ?? 2} compact={compact} />
        </motion.div>
        <motion.div {...floatIn(0.26)}>
          <BuilderNode {...right} index={right.index ?? 3} compact={compact} />
        </motion.div>
      </div>
    </div>
  );
}

export function PlatformDiagram() {
  const cards = [
    {
      title: "Signal ingress",
      copy: "Logs, alerts, webhooks, and source systems enter the AI Ops path.",
    },
    {
      title: "Normalization",
      copy: "Field mapping converts heterogeneous source data into canonical incident context.",
    },
    {
      title: "Analysis",
      copy: "Correlation, RCA, summary, and SOP context shape the incident narrative.",
    },
    {
      title: "Controls",
      copy: "Approval checks, tenant scoping, and gateway policy keep execution governed.",
    },
    {
      title: "Execution",
      copy: "Neutrino Workflows drive remediation, escalation, and communications.",
    },
  ];

  return (
    <DiagramFrame
      title="Neutrino AI Ops high-level design"
      note="A layered HLD view that keeps the platform story business-readable while still mapping to real product surfaces."
    >
      <div className="platform-diagram-shell">
        <motion.div className="platform-stack-grid" initial="initial" animate="animate">
          {cards.map((card, index) => (
            <motion.div className="stack-card platform-stack-card" key={card.title} {...floatIn(index * 0.08)}>
              <strong>{card.title}</strong>
              <span>{card.copy}</span>
            </motion.div>
          ))}
        </motion.div>
        <div className="platform-mini-grid">
          <motion.div className="mini-card platform-mini-card" {...floatIn(0.45)}>
            <strong>Operator surfaces</strong>
            <span>Connectors, mappings, correlation, SOPs, approvals, and workflows live in one navigation model.</span>
          </motion.div>
          <motion.div className="mini-card platform-mini-card" {...floatIn(0.54)}>
            <strong>Gateway boundary</strong>
            <span>Requests move through tenant-aware proxy routes and scoped internal service tokens.</span>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="orbit"
        {...pulse(0.2)}
        style={{ borderColor: "rgba(216, 95, 47, 0.18)" }}
      />
    </DiagramFrame>
  );
}

export function AlertDiagram() {
  const steps = [
    { title: "Detect", copy: "Alerts, log spikes, and webhook signals enter Neutrino.", icon: BellRing },
    { title: "Classify", copy: "Mapped signals become incident context with severity and service metadata.", icon: Blocks },
    { title: "Route", copy: "Workflow definitions select escalation paths by trigger condition.", icon: Sparkles },
    { title: "Escalate", copy: "Teams and systems receive the right action path immediately.", icon: Send },
  ];

  return (
    <DiagramFrame
      title="Incident detection and escalation flow"
      note="The documentation should show that Neutrino transforms noisy source events into controlled escalation workflows."
    >
      <motion.div className="flow-grid" initial="initial" animate="animate">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div className="flow-card" key={step.title} {...floatIn(index * 0.1)}>
              <Icon size={18} style={{ color: "var(--accent)" }} />
              <strong>{step.title}</strong>
              <span>{step.copy}</span>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="signal-lane">
        {[
          "Chat and incident channels",
          "Ticketing and operational queues",
          "Custom endpoints and automation systems",
        ].map((item, index) => (
          <motion.div className="signal-card" key={item} {...floatIn(0.38 + index * 0.08)}>
            <span className="signal-dot" />
            <strong>Downstream path</strong>
            <span>{item}</span>
          </motion.div>
        ))}
      </div>
    </DiagramFrame>
  );
}

export function RcaDiagram() {
  const items = [
    "Source logs",
    "Canonical mapping",
    "Correlation window",
    "Probable root cause",
    "SOP-backed remediation",
  ];

  return (
    <DiagramFrame
      title="Rapid root cause analysis path"
      note="This diagram frames RCA as a continuous operator workflow instead of isolated dashboards and manual note-taking."
    >
      <motion.div className="flow-grid" initial="initial" animate="animate">
        {items.map((item, index) => (
          <motion.div className="flow-card" key={item} {...floatIn(index * 0.1)}>
            <strong>{item}</strong>
            <span>
              {index === 0 && "Raw observability events are collected from configured connectors."}
              {index === 1 && "Mapped top-level fields make multi-source analysis consistent."}
              {index === 2 && "Related events become one incident story with confidence signals."}
              {index === 3 && "Operators see summary, chain of events, and likely failure point."}
              {index === 4 && "Findings move directly into approved workflow execution steps."}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <div className="mini-grid">
        <motion.div className="mini-card" {...floatIn(0.55)}>
          <strong>Data artifact</strong>
          <span>Root cause, summary, and causal-chain data become part of the incident record.</span>
        </motion.div>
        <motion.div className="mini-card" {...floatIn(0.64)}>
          <strong>Operator outcome</strong>
          <span>The RCA step ends with a remediation path, not with another manual handoff.</span>
        </motion.div>
      </div>
    </DiagramFrame>
  );
}

export function StakeholderDiagram() {
  return (
    <DiagramFrame
      title="Stakeholder communication workflow"
      note="Updates are tied to incident progress and approvals so operators do not need to manually coordinate every status change."
    >
      <div className="signal-lane">
        <motion.div className="signal-card" {...floatIn(0.05)}>
          <strong>Incident state changes</strong>
          <span>Status, severity, owner, and workflow milestones provide the trigger for comms.</span>
        </motion.div>
        <motion.div className="signal-card" {...floatIn(0.14)}>
          <strong>Approval checkpoint</strong>
          <span>High-impact messages or downstream actions can pause for operator confirmation.</span>
        </motion.div>
        <motion.div className="signal-card" {...floatIn(0.23)}>
          <strong>Stakeholder update</strong>
          <span>Send consistent notifications to internal teams, leadership, and external recipients.</span>
        </motion.div>
      </div>
      <div className="mini-grid">
        <motion.div className="mini-card" {...floatIn(0.34)}>
          <strong>Channel patterns</strong>
          <span>App surfaces, email verification, chat updates, and workflow-driven outbound actions.</span>
        </motion.div>
        <motion.div className="mini-card" {...floatIn(0.43)}>
          <strong>Operational effect</strong>
          <span>Stakeholders stay aligned while the operator remains focused on remediation.</span>
        </motion.div>
      </div>
      <motion.div className="orbit" {...pulse(0.4)} />
    </DiagramFrame>
  );
}

export function DataCollectionDiagram() {
  return (
    <DiagramFrame
      title="Cross-system automated data collection"
      note="This documents the capability as already implemented: Neutrino gathers operational context from multiple systems and compiles it into one investigation-ready view."
    >
      <BuilderCanvasRows
        rows={[
          [
            {
              title: "Webhook",
              subtitle: "Catch Hook",
              logoSrc: "https://cdn.activepieces.com/pieces/new-core/webhooks.svg",
              isTrigger: true,
              index: 1,
            },
            {
              title: "HTTP",
              subtitle: "Get CMDB records",
              logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
              index: 2,
            },
            {
              title: "HTTP",
              subtitle: "Get Syslog payloads",
              logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
              index: 3,
            },
          ],
          [
            {
              title: "HTTP",
              subtitle: "Get Zabbix events",
              logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
              index: 4,
            },
            {
              title: "Code",
              subtitle: "Normalize and merge",
              logoSrc: "/code-node.svg",
              index: 5,
            },
            {
              title: "Branch",
              subtitle: "Validate completeness",
              logoSrc: "/branch-node.svg",
              index: 6,
            },
            {
              title: "HTTP",
              subtitle: "Publish unified view",
              logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
              index: 7,
            },
          ],
        ]}
        compact
      />
      <div className="builder-canvas-footer">
        <div className="mini-card">
          <strong>Actual node types used</strong>
          <span>Webhook trigger, HTTP actions, Code transform, and Branch decision mirror the real node vocabulary and step form factor of the embedded workflow builder.</span>
        </div>
      </div>
    </DiagramFrame>
  );
}

export function CollectionHldDiagram() {
  return (
    <DiagramFrame
      title="Automated collection HLD"
      note="A formal high-level design showing how source systems, orchestration, processing, and operator presentation fit together inside the implemented Neutrino capability."
    >
      <div className="source-grid">
        {[
          { title: "CMDB", copy: "Asset, ownership, and dependency context" },
          { title: "Syslog", copy: "Operational event and log payloads" },
          { title: "Zabbix", copy: "Monitoring alerts and affected host state" },
        ].map((source, index) => (
          <motion.div className="source-card" key={source.title} {...floatIn(index * 0.08)}>
            <strong>{source.title}</strong>
            <span>{source.copy}</span>
          </motion.div>
        ))}
      </div>
      <div className="builder-band-label">Neutrino collection workflow</div>
      <BuilderCanvasRows
        rows={[
          [
            {
              title: "Webhook",
              subtitle: "Incident trigger",
              logoSrc: "https://cdn.activepieces.com/pieces/new-core/webhooks.svg",
              isTrigger: true,
              index: 1,
            },
            {
              title: "HTTP",
              subtitle: "Collect source data",
              logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
              index: 2,
            },
            {
              title: "Code",
              subtitle: "Normalize fields",
              logoSrc: "/code-node.svg",
              index: 3,
            },
          ],
          [
            {
              title: "Branch",
              subtitle: "Validate output",
              logoSrc: "/branch-node.svg",
              index: 4,
            },
            {
              title: "HTTP",
              subtitle: "Write unified record",
              logoSrc: "https://cdn.activepieces.com/pieces/new-core/http.svg",
              index: 5,
            },
          ],
        ]}
        compact
      />
      <motion.div className="publish-card" {...floatIn(0.48)}>
        <strong>Unified Neutrino incident view</strong>
        <span>The assembled output becomes one operator-facing context record that can feed RCA, escalation, approvals, and stakeholder communication.</span>
      </motion.div>
    </DiagramFrame>
  );
}

export function CollectionWorkflowDiagram() {
  return (
    <DiagramFrame
      title="Workflow node design"
      note="A document-style node model that shows how the implemented orchestration is composed without exposing the embedded workflow product name."
    >
      <WorkflowGraphDiagram />
      <div className="mini-grid">
        <motion.div className="mini-card" {...floatIn(0.44)}>
          <strong>Execution pattern</strong>
          <span>The retrieval stage uses real HTTP action nodes, while transformation and merge are modeled as Code steps, followed by a Branch validation gate.</span>
        </motion.div>
        <motion.div className="mini-card" {...floatIn(0.54)}>
          <strong>Result</strong>
          <span>The final write step publishes one unified incident record instead of leaving source data fragmented across separate tools.</span>
        </motion.div>
      </div>
    </DiagramFrame>
  );
}

export function CollectionDataFlowDiagram() {
  return (
    <DiagramFrame
      title="Data flow model"
      note="A structured DFD view showing the movement of records from source systems to a unified Neutrino output."
    >
      <DataFlowCanvasDiagram />
    </DiagramFrame>
  );
}

export function GovernanceDiagram() {
  return (
    <DiagramFrame
      title="Governed execution and approval loop"
      note="Automation is allowed to move fast without bypassing enterprise control points."
    >
      <motion.div className="flow-grid" initial="initial" animate="animate">
        {[
          { title: "Incident ready", copy: "Correlation and RCA produce a candidate response." },
          { title: "Approval gate", copy: "App and email verification can be required before action." },
          { title: "Token-scoped execution", copy: "Neutrino services mediate downstream access." },
          { title: "Auditable outcome", copy: "Workflow, approval, and remedy records stay linked." },
        ].map((item, index) => (
          <motion.div className="flow-card" key={item.title} {...floatIn(index * 0.1)}>
            <strong>{item.title}</strong>
            <span>{item.copy}</span>
          </motion.div>
        ))}
      </motion.div>
      <div className="signal-lane">
        <motion.div className="signal-card" {...floatIn(0.44)}>
          <ShieldCheck size={18} style={{ color: "var(--accent-2)" }} />
          <strong>Tenant-aware policy</strong>
          <span>Requests stay scoped to workspace and service audience boundaries.</span>
        </motion.div>
        <motion.div className="signal-card" {...floatIn(0.54)}>
          <SearchCheck size={18} style={{ color: "var(--accent-3)" }} />
          <strong>Reviewable state</strong>
          <span>Approvals remain visible even when the final communication or action is automated.</span>
        </motion.div>
        <motion.div className="signal-card" {...floatIn(0.64)}>
          <Send size={18} style={{ color: "var(--accent)" }} />
          <strong>Controlled dispatch</strong>
          <span>External systems receive governed actions, not raw browser-originated calls.</span>
        </motion.div>
      </div>
    </DiagramFrame>
  );
}

export function DiagramRenderer({ diagram }: { diagram: DiagramKey }) {
  if (diagram === "platform") return <PlatformDiagram />;
  if (diagram === "alerts") return <AlertDiagram />;
  if (diagram === "rca") return <RcaDiagram />;
  if (diagram === "stakeholders") return <StakeholderDiagram />;
  if (diagram === "collection-hld") return <CollectionHldDiagram />;
  if (diagram === "collection-workflow") return <CollectionWorkflowDiagram />;
  if (diagram === "collection-dataflow") return <CollectionDataFlowDiagram />;
  return <GovernanceDiagram />;
}
