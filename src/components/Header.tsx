import React, { memo, useCallback } from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  FileText, 
  Compass,
  Radio
} from 'lucide-react';
import { SingularityState } from '../types/singularity';

export type ActiveTabType = 'loop' | 'thinking_lab' | 'scenarios' | 'logs';

export interface HeaderProps {
  state: SingularityState;
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  onRunStep: () => void;
  onToggleAutoLoop: () => void;
  onResetState: () => void;
  isProcessing: boolean;
}

export const Header: React.FC<HeaderProps> = memo(({
  state,
  activeTab,
  setActiveTab,
  onRunStep,
  onToggleAutoLoop,
  onResetState,
  isProcessing
}) => {
  const handleSelectLoop = useCallback<() => void>(() => setActiveTab('loop'), [setActiveTab]);
  const handleSelectThinkingLab = useCallback<() => void>(() => setActiveTab('thinking_lab'), [setActiveTab]);
  const handleSelectScenarios = useCallback<() => void>(() => setActiveTab('scenarios'), [setActiveTab]);
  const handleSelectLogs = useCallback<() => void>(() => setActiveTab('logs'), [setActiveTab]);

  const rawSingularityIndex: number = typeof state.singularityIndex === 'number' && !isNaN(state.singularityIndex) && isFinite(state.singularityIndex) ? state.singularityIndex : 0;
  const clampedSingularityIndex: number = Math.min(100, Math.max(0, rawSingularityIndex));

  return (
    <header className="bg-slate-900/90 border-b border-cyan-900/40 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 p-[2px] animate-pulse">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-slate-950 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-ping" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-mono text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  HUXLEY SINGULARITY LOOP
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 rounded-full">
                  v3.1 RECURSIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Cybernetic Feedback Engine</span>
                <span className="text-slate-600">•</span>
                <span className="text-indigo-400 font-medium">gemini-3.1-pro-preview</span>
                <span className="px-1.5 py-0.2 text-[9px] bg-purple-950 text-purple-300 border border-purple-800 rounded font-bold">
                  THINKING: HIGH
                </span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={handleSelectLoop}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'loop'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-900/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Topology Dashboard</span>
            </button>

            <button
              onClick={handleSelectThinkingLab}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'thinking_lab'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>High Thinking Lab</span>
            </button>

            <button
              onClick={handleSelectScenarios}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'scenarios'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-900/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Huxley Experiments</span>
            </button>

            <button
              onClick={handleSelectLogs}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === 'logs'
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-800/50 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Consciousness Log</span>
            </button>
          </nav>

          {/* Quick Execution Actions */}
          <div className="flex items-center space-x-2">
            
            {/* Singularity Gauge mini */}
            <div className="hidden lg:flex flex-col items-end pr-3 border-r border-slate-800">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-300">
                <span className="text-slate-400">Singularity:</span>
                <span className="font-bold text-cyan-400">{rawSingularityIndex.toFixed(1)}%</span>
              </div>
              <div className="w-24 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${clampedSingularityIndex}%` }}
                />
              </div>
            </div>

            {/* Step Button */}
            <button
              onClick={onRunStep}
              disabled={isProcessing || state.isAutoLooping}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-700/60 text-xs font-mono transition-all disabled:opacity-50 shadow-sm"
              title="Run a single recursive loop iteration"
            >
              <Zap className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin text-cyan-400' : 'text-cyan-400'}`} />
              <span className="hidden sm:inline font-medium">Tick Loop</span>
            </button>

            {/* Auto-Loop Toggle */}
            <button
              onClick={onToggleAutoLoop}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                state.isAutoLooping
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600 animate-pulse'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
              title="Toggle automatic continuous feedback loop ticks"
            >
              {state.isAutoLooping ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="hidden sm:inline">{state.isAutoLooping ? 'Pause Loop' : 'Auto-Loop'}</span>
            </button>

            {/* Reset */}
            <button
              onClick={onResetState}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 text-xs transition-all"
              title="Reset loop state matrix"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-800/80 text-xs font-mono overflow-x-auto space-x-2">
          <button
            onClick={handleSelectLoop}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'loop' ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700' : 'text-slate-400'
            }`}
          >
            Topology
          </button>
          <button
            onClick={handleSelectThinkingLab}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'thinking_lab' ? 'bg-purple-900/60 text-purple-300 border border-purple-700' : 'text-slate-400'
            }`}
          >
            High Thinking Lab
          </button>
          <button
            onClick={handleSelectScenarios}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'scenarios' ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700' : 'text-slate-400'
            }`}
          >
            Experiments
          </button>
          <button
            onClick={handleSelectLogs}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'logs' ? 'bg-slate-800 text-slate-200' : 'text-slate-400'
            }`}
          >
            Logs
          </button>
        </div>

      </div>
    </header>
  );
});

Header.displayName = 'Header';
