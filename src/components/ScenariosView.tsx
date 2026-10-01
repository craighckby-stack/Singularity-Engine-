import React from 'react';
import { PRESET_SCENARIOS } from '../data/scenarios';
import { ExperimentScenario } from '../types/singularity';
import { 
  Compass, 
  Sparkles, 
  Play, 
  ShieldAlert, 
  Cpu, 
  Globe, 
  Sliders, 
  ArrowRight
} from 'lucide-react';

interface ScenariosViewProps {
  onLoadScenario: (scenario: ExperimentScenario) => void;
}

export const ScenariosView: React.FC<ScenariosViewProps> = ({ onLoadScenario }) => {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-400" />;
      default:
        return <Compass className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-2">
          <Compass className="w-6 h-6 text-cyan-400" />
          <h2 className="font-mono text-lg font-bold text-white tracking-wide">
            HUXLEYAN SINGULARITY EXPERIMENTS
          </h2>
        </div>
        <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-3xl">
          Pre-configured cybernetic scenarios testing Aldous Huxley's dystopian/utopian dynamics against AI Singularity thresholds. Each scenario sets custom parameter vectors (Entropy, Hypnopaedic Resonance, Soma Equilibrium, Autonomy) and engages Gemini 3.1 Pro High Thinking reasoning.
        </p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PRESET_SCENARIOS.map((scenario) => (
          <div 
            key={scenario.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-cyan-700/60 rounded-2xl p-5 backdrop-blur-md transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-950/20"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    {getIcon(scenario.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                      {scenario.subtitle}
                    </span>
                    <h3 className="font-mono text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {scenario.title}
                    </h3>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800 shrink-0">
                  THINKING: {scenario.recommendedThinking}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                {scenario.description}
              </p>

              {/* Initial Vector Metrics */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 mb-4 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Initial Singularity:</span>
                  <span className="text-cyan-400 font-bold">{scenario.initialState.singularityIndex}%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Entropy Rate:</span>
                  <span className="text-amber-400 font-bold">{scenario.initialState.entropyRate}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Hypnopaedic Resonance:</span>
                  <span className="text-indigo-400 font-bold">{scenario.initialState.hypnopaedicResonance}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Soma Equilibrium:</span>
                  <span className="text-emerald-400 font-bold">{scenario.initialState.somaEquilibrium}</span>
                </div>
              </div>

              {/* Context preview */}
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-900 mb-4 line-clamp-2">
                <span className="text-slate-500 font-bold">Context:</span> {scenario.systemContext}
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={() => onLoadScenario(scenario)}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-mono font-bold transition-all border border-slate-700 hover:border-cyan-500"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Experiment Vector</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};
