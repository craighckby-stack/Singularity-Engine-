import React, { useState } from 'react';
import { 
  NodeId, 
  SingularityNode, 
  SingularityState 
} from '../types/singularity';
import { 
  BrainCircuit, 
  Sliders, 
  Cpu, 
  Zap, 
  RotateCw, 
  Dna, 
  Info, 
  Sparkles,
  Activity
} from 'lucide-react';

export interface TopologyDiagramProps {
  state: SingularityState;
  onSelectNode?: (nodeId: NodeId) => void;
}

const NODES_DEFINITION: Record<NodeId, Omit<SingularityNode, 'status' | 'throughputTokens'>> = {
  sensorium: {
    id: 'sensorium',
    label: 'Sensorium Ingress',
    sublabel: 'Node 01 • Sensorium',
    description: 'Captures incoming telemetry, prompt constraints, and environment parameters into the feedback loop.',
    color: '#06b6d4' // cyan
  },
  hypnopaedic: {
    id: 'hypnopaedic',
    label: 'Hypnopaedic Filter',
    sublabel: 'Node 02 • Conditioning',
    description: 'Applies Huxleyan stability constraints, Soma dampening, and hypnopaedic safety boundaries.',
    color: '#6366f1' // indigo
  },
  thinking_core: {
    id: 'thinking_core',
    label: 'Pro-Thinking Core',
    sublabel: 'Node 03 • Gemini 3.1 Pro',
    description: 'High Thinking Reasoning Engine (gemini-3.1-pro-preview with thinkingLevel: HIGH) executing deep multi-step analysis.',
    color: '#a855f7' // purple
  },
  synthesis: {
    id: 'synthesis',
    label: 'Delta-Cast Synthesis',
    sublabel: 'Node 04 • Generation',
    description: 'Synthesizes generative solutions, code patches, or macro-system actions from high thinking process.',
    color: '#ec4899' // pink
  },
  feedback: {
    id: 'feedback',
    label: 'Feedback Integrator',
    sublabel: 'Node 05 • Cybernetics',
    description: 'Calculates real-time entropy drift, paradox scores, and soma equilibrium deltas.',
    color: '#f59e0b' // amber
  },
  mutation: {
    id: 'mutation',
    label: 'Mutation Engine',
    sublabel: 'Node 06 • Self-Recursion',
    description: 'Recursively mutates system directives and updates loop state variables for the next tick.',
    color: '#10b981' // emerald
  }
};

export const TopologyDiagram: React.FC<TopologyDiagramProps> = ({ state, onSelectNode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<NodeId>('thinking_core');

  // Hexagonal node coordinates in SVG space (600x400) with explicit type annotations
  const nodePositions: Record<NodeId, { readonly x: number; readonly y: number }> = {
    sensorium: { x: 120, y: 120 },
    hypnopaedic: { x: 300, y: 70 },
    thinking_core: { x: 480, y: 120 },
    synthesis: { x: 480, y: 280 },
    feedback: { x: 300, y: 330 },
    mutation: { x: 120, y: 280 }
  };

  const handleNodeClick = (nodeId: NodeId): void => {
    setSelectedNodeId(nodeId);
    if (onSelectNode) {
      onSelectNode(nodeId);
    }
  };

  const selectedNode: Omit<SingularityNode, 'status' | 'throughputTokens'> = NODES_DEFINITION[selectedNodeId];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
      
      {/* Background Cybernetic Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h2 className="font-mono text-sm font-bold text-slate-200 tracking-wider">
              RECURSIVE LOOP TOPOLOGY
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
              CYBERNETIC MATRIX
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Active Node: <span className="text-cyan-300 font-semibold">{NODES_DEFINITION[state.activeNode].label}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Step #{state.step}
          </span>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* SVG Node Connections Visualizer */}
        <div className="lg:col-span-8 bg-slate-950/90 border border-slate-800/80 rounded-xl p-4 flex items-center justify-center relative min-h-[340px]">
          <svg className="w-full h-[320px] max-w-[550px]" viewBox="0 0 600 400">
            
            <defs>
              <linearGradient id="cyanPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting Loop Paths */}
            {/* 1. Sensorium -> Hypnopaedic */}
            <path d="M 120 120 L 300 70" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            {/* 2. Hypnopaedic -> Thinking Core */}
            <path d="M 300 70 L 480 120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            {/* 3. Thinking Core -> Synthesis */}
            <path d="M 480 120 L 480 280" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            {/* 4. Synthesis -> Feedback */}
            <path d="M 480 280 L 300 330" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            {/* 5. Feedback -> Mutation */}
            <path d="M 300 330 L 120 280" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            {/* 6. Mutation -> Sensorium (Closing Loop) */}
            <path d="M 120 280 L 120 120" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

            {/* Highlight Active Node Connection */}
            {state.activeNode === 'sensorium' && <line x1="120" y1="120" x2="300" y2="70" stroke="#06b6d4" strokeWidth="3" filter="url(#glow)" className="animate-pulse" />}
            {state.activeNode === 'hypnopaedic' && <line x1="300" y1="70" x2="480" y2="120" stroke="#6366f1" strokeWidth="3" filter="url(#glow)" className="animate-pulse" />}
            {state.activeNode === 'thinking_core' && <line x1="480" y1="120" x2="480" y2="280" stroke="#a855f7" strokeWidth="3" filter="url(#glow)" className="animate-pulse" />}
            {state.activeNode === 'synthesis' && <line x1="480" y1="280" x2="300" y2="330" stroke="#ec4899" strokeWidth="3" filter="url(#glow)" className="animate-pulse" />}
            {state.activeNode === 'feedback' && <line x1="300" y1="330" x2="120" y2="280" stroke="#f59e0b" strokeWidth="3" filter="url(#glow)" className="animate-pulse" />}
            {state.activeNode === 'mutation' && <line x1="120" y1="280" x2="120" y2="120" stroke="#10b981" strokeWidth="3" filter="url(#glow)" className="animate-pulse" />}

            {/* Center Core Emblem */}
            <g transform="translate(300, 200)">
              <circle r="42" fill="#020617" stroke="#1e293b" strokeWidth="2" />
              <circle r="36" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="6 3" className="animate-spin origin-center duration-10000" />
              <text textAnchor="middle" y="-6" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="bold">SINGULARITY</text>
              <text textAnchor="middle" y="10" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold">
                {state.singularityIndex.toFixed(0)}%
              </text>
            </g>

            {/* Render Nodes */}
            {(Object.keys(NODES_DEFINITION) as NodeId[]).map((nodeId: NodeId) => {
              const node: Omit<SingularityNode, 'status' | 'throughputTokens'> = NODES_DEFINITION[nodeId];
              const pos: { readonly x: number; readonly y: number } = nodePositions[nodeId];
              const isActive: boolean = state.activeNode === nodeId;
              const isSelected: boolean = selectedNodeId === nodeId;

              return (
                <g 
                  key={nodeId} 
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={(): void => handleNodeClick(nodeId)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Glow */}
                  {isActive && (
                    <circle 
                      r="32" 
                      fill="none" 
                      stroke={node.color} 
                      strokeWidth="2" 
                      className="animate-ping opacity-40" 
                    />
                  )}

                  {/* Selection Ring */}
                  {isSelected && (
                    <circle 
                      r="28" 
                      fill="none" 
                      stroke={node.color} 
                      strokeWidth="2" 
                      strokeDasharray="4 2" 
                    />
                  )}

                  {/* Node Base Circle */}
                  <circle 
                    r="22" 
                    fill={isActive ? node.color : '#0f172a'} 
                    stroke={node.color} 
                    strokeWidth={isActive ? '3' : '2'}
                    className="transition-all duration-300 group-hover:scale-110" 
                  />

                  {/* Node Icon Symbol */}
                  <g transform="translate(-10, -10)">
                    {nodeId === 'sensorium' && <Sliders className={`w-5 h-5 ${isActive ? 'text-black' : 'text-cyan-400'}`} />}
                    {nodeId === 'hypnopaedic' && <Zap className={`w-5 h-5 ${isActive ? 'text-black' : 'text-indigo-400'}`} />}
                    {nodeId === 'thinking_core' && <Sparkles className={`w-5 h-5 ${isActive ? 'text-black' : 'text-purple-300'}`} />}
                    {nodeId === 'synthesis' && <Cpu className={`w-5 h-5 ${isActive ? 'text-black' : 'text-pink-400'}`} />}
                    {nodeId === 'feedback' && <RotateCw className={`w-5 h-5 ${isActive ? 'text-black' : 'text-amber-400'}`} />}
                    {nodeId === 'mutation' && <Dna className={`w-5 h-5 ${isActive ? 'text-black' : 'text-emerald-400'}`} />}
                  </g>

                  {/* Node Label Text Below */}
                  <text 
                    y="36" 
                    textAnchor="middle" 
                    fill={isSelected ? '#f8fafc' : '#94a3b8'} 
                    fontSize="10" 
                    fontFamily="monospace"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

          </svg>
        </div>

        {/* Selected Node Details Drawer */}
        <div className="lg:col-span-4 bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-3 mb-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: selectedNode.color }} 
              />
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                  {selectedNode.sublabel}
                </span>
                <h3 className="font-mono text-sm font-bold text-slate-100">
                  {selectedNode.label}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
              {selectedNode.description}
            </p>

            {/* Special Highlight for Thinking Core */}
            {selectedNodeId === 'thinking_core' && (
              <div className="bg-purple-950/60 border border-purple-800/60 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-1.5 text-purple-300 text-xs font-mono font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>GEMINI 3.1 PRO HIGH THINKING</span>
                </div>
                <p className="text-[11px] text-purple-200/90 font-sans">
                  Configured with <code className="text-purple-300 font-mono">thinkingLevel: ThinkingLevel.HIGH</code>. Unlocks deep multi-step reasoning, hypothesis verification, and paradox resolution.
                </p>
              </div>
            )}

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-900 text-slate-400">
                <span>Node Status:</span>
                <span className={state.activeNode === selectedNodeId ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  {state.activeNode === selectedNodeId ? 'ACTIVE PROCESSING' : 'STANDBY'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900 text-slate-400">
                <span>Core Model:</span>
                <span className="text-indigo-300 font-semibold">
                  {selectedNodeId === 'thinking_core' ? 'gemini-3.1-pro-preview' : 'gemini-3.8-flash'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900 text-slate-400">
                <span>Target Vector:</span>
                <span className="text-cyan-400">
                  {selectedNodeId === 'hypnopaedic' && `Soma: ${state.somaEquilibrium.toFixed(2)}`}
                  {selectedNodeId === 'feedback' && `Entropy: ${state.entropyRate.toFixed(2)}`}
                  {selectedNodeId === 'thinking_core' && 'Reasoning Trace Active'}
                  {selectedNodeId === 'mutation' && `Autonomy: ${state.autonomyLevel.toFixed(2)}`}
                  {selectedNodeId === 'sensorium' && 'Telemetry Stream'}
                  {selectedNodeId === 'synthesis' && 'Delta Generation'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3 text-cyan-400" />
              Click nodes to view role
            </span>
            <span>Tick #{state.step}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
