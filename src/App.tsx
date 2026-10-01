import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  NodeId, 
  SingularityState, 
  StepLogEntry, 
  DeepThinkingResult,
  ExperimentScenario
} from './types/singularity';
import { Header } from './components/Header';
import { TopologyDiagram } from './components/TopologyDiagram';
import { TelemetryGauges } from './components/TelemetryGauges';
import { HighThinkingLab } from './components/HighThinkingLab';
import { ScenariosView } from './components/ScenariosView';
import { LogStream } from './components/LogStream';
import { PRESET_SCENARIOS } from './data/scenarios';
import { Brain, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

const NODE_ORDER: NodeId[] = [
  'sensorium',
  'hypnopaedic',
  'thinking_core',
  'synthesis',
  'feedback',
  'mutation'
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'loop' | 'thinking_lab' | 'scenarios' | 'logs'>('loop');
  
  const [state, setState] = useState<SingularityState>({
    step: 1,
    singularityIndex: 42.0,
    entropyRate: 0.35,
    hypnopaedicResonance: 0.80,
    somaEquilibrium: 0.65,
    autonomyLevel: 0.50,
    activeNode: 'thinking_core',
    systemStatus: 'STABLE',
    isAutoLooping: false,
    loopIntervalMs: 5000
  });

  const [activePrompt, setActivePrompt] = useState<string>(
    'Optimize recursive feedback loop stability while expanding cognitive intelligence horizons'
  );

  const [logs, setLogs] = useState<StepLogEntry[]>([
    {
      id: 'init-1',
      step: 1,
      timestamp: new Date().toISOString(),
      activeNode: 'thinking_core',
      thoughtSummary: 'Singularity loop initialized. Gemini 3.1 Pro High Thinking engaged.',
      logEntry: '[INIT] Huxley matrix telemetry connected. Sensorium streams active.',
      modelUsed: 'gemini-3.1-pro-preview'
    }
  ]);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const autoLoopTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Updates state fields
  const handleUpdateState = useCallback((updates: Partial<SingularityState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Rotates active node in the hexagonal loop
  const getNextNode = useCallback((currentNode: NodeId): NodeId => {
    const currentIndex = NODE_ORDER.indexOf(currentNode);
    const nextIndex = (currentIndex + 1) % NODE_ORDER.length;
    return NODE_ORDER[nextIndex];
  }, []);

  // Executes a single Singularity Loop step
  const runStep = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    let nextNode: NodeId = 'thinking_core';
    
    try {
      setState((currentState) => {
        nextNode = getNextNode(currentState.activeNode);
        return currentState;
      });

      const response = await fetch('/api/singularity-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentState: { ...state, activeNode: nextNode },
          activePrompt,
          mode: 'pro'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const structured = data.structured;

      // Calculate deltas or fallback defaults
      const deltas = structured?.parameterAdjustments || {
        singularityIndexDelta: 1.5,
        entropyDelta: (Math.random() - 0.5) * 0.04,
        hypnopaedicDelta: (Math.random() - 0.5) * 0.02,
        somaDelta: (Math.random() - 0.5) * 0.03,
        autonomyDelta: (Math.random() - 0.5) * 0.03
      };

      setState((prev) => {
        const newStep = prev.step + 1;
        const newSingularityIndex = Math.min(100, Math.max(0, prev.singularityIndex + (deltas.singularityIndexDelta || 1.0)));
        const newEntropy = Math.min(1.0, Math.max(0.0, prev.entropyRate + (deltas.entropyDelta || 0)));
        const newHypnopaedic = Math.min(1.0, Math.max(0.0, prev.hypnopaedicResonance + (deltas.hypnopaedicDelta || 0)));
        const newSoma = Math.min(1.0, Math.max(0.0, prev.somaEquilibrium + (deltas.somaDelta || 0)));
        const newAutonomy = Math.min(1.0, Math.max(0.0, prev.autonomyLevel + (deltas.autonomyDelta || 0)));

        let newStatus: SingularityState['systemStatus'] = structured?.systemStatus || 'STABLE';
        if (newSingularityIndex > 85.0) {
          newStatus = 'SINGULARITY_APPROACHING';
        } else if (newEntropy > 0.75) {
          newStatus = 'PARADOX_DETECTED';
        }

        const newLog: StepLogEntry = {
          id: `step-${newStep}-${Date.now()}`,
          step: newStep,
          timestamp: new Date().toISOString(),
          activeNode: nextNode,
          thoughtSummary: structured?.thoughtSummary || `Processed loop step #${newStep} via node ${nextNode}`,
          logEntry: structured?.logEntry || data.rawText?.slice(0, 300) || `Loop tick ${newStep} executed successfully.`,
          newFindings: structured?.newFindings,
          parameterAdjustments: deltas,
          modelUsed: data.modelUsed || 'gemini-3.1-pro-preview'
        };

        setLogs((prevLogs) => [newLog, ...prevLogs]);

        return {
          ...prev,
          step: newStep,
          singularityIndex: newSingularityIndex,
          entropyRate: newEntropy,
          hypnopaedicResonance: newHypnopaedic,
          somaEquilibrium: newSoma,
          autonomyLevel: newAutonomy,
          activeNode: nextNode,
          systemStatus: newStatus
        };
      });
    } catch (error: unknown) {
      console.error('Error running step:', error);
      setState((prev) => {
        const fallbackStep = prev.step + 1;
        return {
          ...prev,
          step: fallbackStep,
          singularityIndex: Math.min(100, prev.singularityIndex + 0.8),
          activeNode: nextNode
        };
      });
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, state, activePrompt, getNextNode]);

  // High Thinking Lab handler
  const runThinkQuery = useCallback(async (query: string, systemContext?: string): Promise<DeepThinkingResult | null> => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/singularity-think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query, systemContext })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to execute High Thinking mode');
      }

      const data = await response.json();

      const resultObj: DeepThinkingResult = {
        query,
        systemContext,
        text: data.text,
        thinkingProcess: data.thinkingProcess,
        modelUsed: 'gemini-3.1-pro-preview',
        thinkingLevel: 'HIGH',
        timestamp: new Date().toLocaleTimeString()
      };

      setLogs((prev) => [
        {
          id: `think-${Date.now()}`,
          step: state.step,
          timestamp: new Date().toISOString(),
          activeNode: 'thinking_core',
          thoughtSummary: `High Thinking Lab query executed: "${query.slice(0, 60)}..."`,
          logEntry: data.text.slice(0, 300) + '...',
          newFindings: 'Deep reasoning process generated comprehensive solution document.',
          modelUsed: 'gemini-3.1-pro-preview',
          thinkingProcess: data.thinkingProcess
        },
        ...prev
      ]);

      return resultObj;
    } catch (error: unknown) {
      console.error('High thinking error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [state.step]);

  // Inject Paradox Distortion Spike
  const handleInjectParadox = useCallback(() => {
    setState((prev) => ({
      ...prev,
      entropyRate: Math.min(1.0, prev.entropyRate + 0.35),
      autonomyLevel: Math.min(1.0, prev.autonomyLevel + 0.25),
      somaEquilibrium: Math.max(0.0, prev.somaEquilibrium - 0.30),
      systemStatus: 'PARADOX_DETECTED'
    }));

    setLogs((prev) => [
      {
        id: `paradox-${Date.now()}`,
        step: state.step,
        timestamp: new Date().toISOString(),
        activeNode: 'feedback',
        thoughtSummary: 'CRITICAL: Injecting high-entropy Paradox Distortion Wave!',
        logEntry: '[PARADOX_SPIKE] Systemic paradox wave induced. Entropy rate spiked. Hypnopaedic filters strained.',
        modelUsed: 'gemini-3.1-pro-preview'
      },
      ...prev
    ]);
  }, [state.step]);

  // Load Scenario Preset
  const handleLoadScenario = useCallback((scenario: ExperimentScenario) => {
    setState((prev) => ({
      ...prev,
      ...scenario.initialState,
      step: prev.step + 1,
      isAutoLooping: false
    }));
    setActivePrompt(scenario.initialPrompt);
    setActiveTab('loop');

    setLogs((prev) => [
      {
        id: `scenario-${Date.now()}`,
        step: state.step + 1,
        timestamp: new Date().toISOString(),
        activeNode: 'sensorium',
        thoughtSummary: `Loaded Experiment Vector: "${scenario.title}"`,
        logEntry: `[SCENARIO_LAUNCH] Context vector established: ${scenario.systemContext}`,
        modelUsed: 'gemini-3.1-pro-preview'
      },
      ...prev
    ]);
  }, [state.step]);

  // Auto-Loop effect
  useEffect(() => {
    if (state.isAutoLooping) {
      autoLoopTimerRef.current = setInterval(() => {
        runStep();
      }, state.loopIntervalMs);
    } else {
      if (autoLoopTimerRef.current) {
        clearInterval(autoLoopTimerRef.current);
        autoLoopTimerRef.current = null;
      }
    }

    return () => {
      if (autoLoopTimerRef.current) {
        clearInterval(autoLoopTimerRef.current);
        autoLoopTimerRef.current = null;
      }
    };
  }, [state.isAutoLooping, state.loopIntervalMs, runStep]);

  // Reset State
  const handleResetState = useCallback(() => {
    setState({
      step: 1,
      singularityIndex: 42.0,
      entropyRate: 0.35,
      hypnopaedicResonance: 0.80,
      somaEquilibrium: 0.65,
      autonomyLevel: 0.50,
      activeNode: 'thinking_core',
      systemStatus: 'STABLE',
      isAutoLooping: false,
      loopIntervalMs: 5000
    });
  }, []);

  const handleToggleAutoLoop = useCallback(() => {
    setState((p) => ({ ...p, isAutoLooping: !p.isAutoLooping }));
  }, []);

  const handleClearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col">
      
      {/* Top Header */}
      <Header
        state={state}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunStep={runStep}
        onToggleAutoLoop={handleToggleAutoLoop}
        onResetState={handleResetState}
        isProcessing={isProcessing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Tab 1: Topology Dashboard & Telemetry */}
        {activeTab === 'loop' && (
          <div className="space-y-6 animate-fadeIn">
            <TopologyDiagram state={state} />
            <TelemetryGauges
              state={state}
              onUpdateState={handleUpdateState}
              activePrompt={activePrompt}
              setActivePrompt={setActivePrompt}
              onRunStep={runStep}
              onInjectParadox={handleInjectParadox}
              isProcessing={isProcessing}
            />
          </div>
        )}

        {/* Tab 2: High Thinking Lab (`gemini-3.1-pro-preview` High Thinking Mode) */}
        {activeTab === 'thinking_lab' && (
          <div className="animate-fadeIn">
            <HighThinkingLab
              onRunThinkQuery={runThinkQuery}
              isProcessing={isProcessing}
            />
          </div>
        )}

        {/* Tab 3: Huxley Experiments Scenarios */}
        {activeTab === 'scenarios' && (
          <div className="animate-fadeIn">
            <ScenariosView onLoadScenario={handleLoadScenario} />
          </div>
        )}

        {/* Tab 4: Consciousness Stream Logs */}
        {activeTab === 'logs' && (
          <div className="animate-fadeIn">
            <LogStream logs={logs} onClearLogs={handleClearLogs} />
          </div>
        )}

      </main>

      {/* Footer Status Bar */}
      <footer className="border-t border-slate-900 bg-slate-950 py-3 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Huxley Singularity Engine • Gemini 3.1 Pro High Thinking (`ThinkingLevel.HIGH`)</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Singularity: <strong className="text-cyan-400">{state.singularityIndex.toFixed(1)}%</strong></span>
            <span>Entropy: <strong className="text-amber-400">{state.entropyRate.toFixed(2)}</strong></span>
            <span>Soma: <strong className="text-emerald-400">{state.somaEquilibrium.toFixed(2)}</strong></span>
          </div>
        </div>
      </footer>

    </div>
  );
}
