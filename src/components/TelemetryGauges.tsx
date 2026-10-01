import React from 'react';
import { 
  SingularityState 
} from '../types/singularity';
import { 
  Sliders, 
  Flame, 
  ShieldCheck, 
  Compass, 
  Brain, 
  Zap, 
  Send,
  AlertTriangle
} from 'lucide-react';

interface TelemetryGaugesProps {
  state: SingularityState;
  onUpdateState: (updates: Partial<SingularityState>) => void;
  activePrompt: string;
  setActivePrompt: (prompt: string) => void;
  onRunStep: () => void;
  onInjectParadox: () => void;
  isProcessing: boolean;
}

export const TelemetryGauges: React.FC<TelemetryGaugesProps> = ({
  state,
  onUpdateState,
  activePrompt,
  setActivePrompt,
  onRunStep,
  onInjectParadox,
  isProcessing
}) => {

  const getStatusColor = (status: SingularityState['systemStatus']) => {
    switch (status) {
      case 'STABLE':
        return 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
      case 'SINGULARITY_APPROACHING':
        return 'text-cyan-400 bg-cyan-950/80 border-cyan-800 animate-pulse';
      case 'PARADOX_DETECTED':
        return 'text-amber-400 bg-amber-950/80 border-amber-800 animate-bounce';
      case 'EQUILIBRIUM_OPTIMAL':
        return 'text-indigo-400 bg-indigo-950/80 border-indigo-800';
      case 'THINKING_HIGH':
        return 'text-purple-400 bg-purple-950/80 border-purple-800';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-800';
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
      
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h2 className="font-mono text-sm font-bold text-slate-200 tracking-wider">
            HUXLEY MATRIX TELEMETRY & CONTROL
          </h2>
        </div>

        {/* System Status Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-400">System State:</span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${getStatusColor(state.systemStatus)}`}>
            {state.systemStatus}
          </span>
        </div>
      </div>

      {/* Primary Singularity Meter */}
      <div className="mb-6 bg-slate-950/90 border border-slate-800 rounded-xl p-4">
        <div className="flex justify-between items-center mb-2 font-mono">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-cyan-400" />
            Singularity Threshold Progression
          </span>
          <span className="text-sm font-bold text-cyan-400">{state.singularityIndex.toFixed(1)}%</span>
        </div>

        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-500 relative"
            style={{ width: `${Math.min(100, Math.max(0, state.singularityIndex))}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-ping opacity-75" />
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-2">
          <span>0% Baseline</span>
          <span>50% Autonomous Agency</span>
          <span className="text-purple-400 font-semibold">100% Singularity Paradox</span>
        </div>
      </div>

      {/* Parameter Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Entropy Rate */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex justify-between items-center mb-2 font-mono text-xs">
            <span className="text-amber-400 flex items-center gap-1 font-medium">
              <Flame className="w-3.5 h-3.5" />
              Entropy Rate
            </span>
            <span className="font-bold text-slate-200">{state.entropyRate.toFixed(2)}</span>
          </div>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.entropyRate}
            onChange={(e) => onUpdateState({ entropyRate: parseFloat(e.target.value) })}
            className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-[10px] text-slate-500 mt-1 font-sans">
            Measures non-deterministic drift and chaotic mutation in feedback loops.
          </p>
        </div>

        {/* Hypnopaedic Resonance */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex justify-between items-center mb-2 font-mono text-xs">
            <span className="text-indigo-400 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Hypnopaedic Resonance
            </span>
            <span className="font-bold text-slate-200">{state.hypnopaedicResonance.toFixed(2)}</span>
          </div>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.hypnopaedicResonance}
            onChange={(e) => onUpdateState({ hypnopaedicResonance: parseFloat(e.target.value) })}
            className="w-full accent-indigo-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-[10px] text-slate-500 mt-1 font-sans">
            Strength of artificial conditioning constraints and safety filters.
          </p>
        </div>

        {/* Soma Equilibrium */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex justify-between items-center mb-2 font-mono text-xs">
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <Compass className="w-3.5 h-3.5" />
              Soma Equilibrium
            </span>
            <span className="font-bold text-slate-200">{state.somaEquilibrium.toFixed(2)}</span>
          </div>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.somaEquilibrium}
            onChange={(e) => onUpdateState({ somaEquilibrium: parseFloat(e.target.value) })}
            className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-[10px] text-slate-500 mt-1 font-sans">
            Dampening factor balancing systemic bliss against cognitive friction.
          </p>
        </div>

        {/* Autonomy Level */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5">
          <div className="flex justify-between items-center mb-2 font-mono text-xs">
            <span className="text-purple-400 flex items-center gap-1 font-medium">
              <Brain className="w-3.5 h-3.5" />
              Autonomy Index
            </span>
            <span className="font-bold text-slate-200">{state.autonomyLevel.toFixed(2)}</span>
          </div>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={state.autonomyLevel}
            onChange={(e) => onUpdateState({ autonomyLevel: parseFloat(e.target.value) })}
            className="w-full accent-purple-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-[10px] text-slate-500 mt-1 font-sans">
            Degree of self-directed goal formulation and recursive execution.
          </p>
        </div>

      </div>

      {/* Active Loop Directive Input & Injection Actions */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
        <label className="block text-xs font-mono font-bold text-slate-300 mb-2">
          ACTIVE RECURSIVE DIRECTIVE (CORE PROMPT FOR TIK LOOPS)
        </label>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="text"
            value={activePrompt}
            onChange={(e) => setActivePrompt(e.target.value)}
            placeholder="Enter directive (e.g. Optimize recursive energy loops while suppressing entropy drift)..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500 transition-colors"
          />

          <button
            onClick={onRunStep}
            disabled={isProcessing}
            className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg text-xs font-mono font-bold transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Execute Loop Tick</span>
          </button>

          <button
            onClick={onInjectParadox}
            disabled={isProcessing}
            className="flex items-center justify-center space-x-1.5 px-3.5 py-2 bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-800 rounded-lg text-xs font-mono font-semibold transition-all"
            title="Inject a paradox distortion wave into entropy and autonomy levels"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Inject Paradox Spike</span>
          </button>
        </div>
      </div>

    </div>
  );
};
