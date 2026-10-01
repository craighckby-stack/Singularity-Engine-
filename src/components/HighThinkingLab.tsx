import React, { useState, useCallback, useTransition, useMemo } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Copy, 
  Check, 
  AlertCircle,
  ShieldCheck,
  Zap,
  Terminal
} from 'lucide-react';
import { DeepThinkingResult } from '../types/singularity';

interface HighThinkingLabProps {
  onRunThinkQuery: (query: string, systemContext?: string) => Promise<DeepThinkingResult | null>;
  isProcessing: boolean;
}

interface SampleQuery {
  title: string;
  query: string;
  context: string;
}

const SAMPLE_QUERIES: readonly SampleQuery[] = [
  {
    title: 'The Huxleyan Singularity Paradox',
    query: 'How can a hyper-intelligent recursive AI system grant maximal human creative autonomy while maintaining systemic societal stability without resorting to total surveillance or hypnopaedic conditioning?',
    context: 'Huxleyan Cybernetic Constraint: Balance individual agency with macro-system stability.'
  },
  {
    title: 'Recursive Agent Self-Correction Protocol',
    query: 'Construct a multi-phase self-correcting feedback loop for autonomous AI agents that prevents semantic cognitive drift and hallucinations across 10,000 recursive execution cycles.',
    context: 'Agent Architecture: Self-modifying prompt compiler with verification nodes.'
  },
  {
    title: 'Zero-Trust Global Resource Equilibrium',
    query: 'Design an uncheatable cybernetic allocation matrix for energy, compute, and water resources across 100 sovereign regional nodes during a global climate singularity event.',
    context: 'Macro-Economic Control Matrix: Zero-trust cryptographic verification.'
  },
  {
    title: 'Synthetic Consciousness & Soma Feedback',
    query: 'Analyze the threshold where synthetic intelligence self-reflection transforms from deterministic optimization into authentic self-awareness. What feedback indicators signal this transition?',
    context: 'Consciousness Stream Metrics: Entropy vs Hypnopaedic resonance equilibrium.'
  }
] as const;

export const HighThinkingLab: React.FC<HighThinkingLabProps> = ({ onRunThinkQuery, isProcessing }) => {
  const [query, setQuery] = useState<string>(SAMPLE_QUERIES[0].query);
  const [systemContext, setSystemContext] = useState<string>(SAMPLE_QUERIES[0].context);
  const [result, setResult] = useState<DeepThinkingResult | null>(null);
  const [showThinkingProcess, setShowThinkingProcess] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    setErrorText(null);
    try {
      const res = await onRunThinkQuery(query, systemContext);
      if (res) {
        setResult(res);
      } else {
        setErrorText('Failed to receive response from Gemini 3.1 Pro High Thinking API.');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error executing High Thinking mode';
      setErrorText(errorMessage);
    }
  }, [query, systemContext, isProcessing, onRunThinkQuery]);

  const handleSelectSample = useCallback((sample: SampleQuery): void => {
    startTransition(() => {
      setQuery(sample.query);
      setSystemContext(sample.context);
    });
  }, []);

  const handleCopyResult = useCallback(async (): Promise<void> => {
    if (!result) return;
    try {
      const textToCopy = `=== HUXLEY HIGH THINKING LAB REPORT ===\nModel: ${result.modelUsed} [Thinking: HIGH]\nDate: ${result.timestamp}\n\n[QUERY]\n${result.query}\n\n[THINKING TRACE]\n${result.thinkingProcess || 'N/A'}\n\n[SYNTHESIZED SOLUTION]\n${result.text}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setErrorText('Failed to copy report to clipboard.');
    }
  }, [result]);

  const sampleQueriesList = useMemo(() => SAMPLE_QUERIES.map((sample, idx) => (
    <button
      key={idx}
      type="button"
      onClick={() => handleSelectSample(sample)}
      className="text-left p-3 rounded-lg bg-slate-950 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-800/60 transition-all group"
    >
      <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-200 group-hover:text-purple-300 mb-1">
        <span>{sample.title}</span>
        <Zap className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-[11px] text-slate-400 line-clamp-2 font-sans">
        {sample.query}
      </p>
    </button>
  )), [handleSelectSample]);

  return (
    <div className="space-y-6">
      
      {/* High Thinking Header Card */}
      <div className="bg-gradient-to-r from-purple-950/90 via-slate-900/90 to-indigo-950/90 border border-purple-800/60 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-purple-900/80 border border-purple-500/50 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <Sparkles className="w-6 h-6 text-purple-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-mono text-lg font-bold text-white tracking-wide">
                  GEMINI 3.1 PRO HIGH THINKING LAB
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-900 text-purple-200 border border-purple-600">
                  ThinkingLevel.HIGH
                </span>
              </div>
              <p className="text-xs text-purple-200/80 font-sans mt-0.5">
                Handles complex sci-fi paradoxes, recursive logic chains, and deep systemic reasoning with unconstrained token generation.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono bg-slate-950/80 px-3 py-1.5 rounded-xl border border-purple-800/40">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300">Model:</span>
            <span className="text-purple-300 font-bold">gemini-3.1-pro-preview</span>
          </div>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
        <span className="text-xs font-mono text-slate-400 block mb-2 font-semibold">
          SELECT COMPLEX QUERY PRESET:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {sampleQueriesList}
        </div>
      </div>

      {/* Query Formulation Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm space-y-4">
        
        <div>
          <label className="block text-xs font-mono font-bold text-purple-300 mb-1.5 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            COMPLEX QUERY / PARADOX SPECIFICATION
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={4}
            placeholder="Type your complex query or recursive paradox prompt here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-purple-500 transition-colors leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            SYSTEM CONTEXT / HUXLEY RULES (OPTIONAL)
          </label>
          <input
            type="text"
            value={systemContext}
            onChange={(e) => setSystemContext(e.target.value)}
            placeholder="e.g. Huxley Matrix Directive 001: Preserve equilibrium while solving..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>High Thinking Mode (`ThinkingLevel.HIGH`) • No max tokens restriction</span>
          </div>

          <button
            type="submit"
            disabled={isProcessing || !query.trim()}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-purple-900/40 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
                <span>Generating Deep Thoughts...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-purple-200" />
                <span>Execute High Thinking</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error display */}
      {errorText && (
        <div className="bg-red-950/80 border border-red-800/80 rounded-xl p-4 flex items-center space-x-3 text-red-200 text-xs font-mono">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorText}</span>
        </div>
      )}

      {/* High Thinking Output Results */}
      {result && (
        <div className="bg-slate-900/90 border border-purple-800/60 rounded-2xl p-6 backdrop-blur-md space-y-6">
          
          <div className="flex items-center justify-between border-b border-purple-900/50 pb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="font-mono text-sm font-bold text-white">
                HIGH THINKING REASONING REPORT
              </h3>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="text-slate-400 text-[11px]">
                {result.timestamp}
              </span>
              <button
                type="button"
                onClick={handleCopyResult}
                className="flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded-lg text-xs font-mono border border-purple-800/40 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Report'}</span>
              </button>
            </div>
          </div>

          {/* Collapsible Thinking Process Block */}
          {result.thinkingProcess && (
            <div className="bg-purple-950/50 border border-purple-700/60 rounded-xl overflow-hidden shadow-inner">
              <button
                type="button"
                onClick={() => setShowThinkingProcess(!showThinkingProcess)}
                className="w-full flex items-center justify-between px-4 py-3 bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 text-xs font-mono font-bold transition-all border-b border-purple-800/40"
              >
                <div className="flex items-center space-x-2">
                  <BrainCircuit className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span>INTERNAL THINKING PROCESS (gemini-3.1-pro-preview)</span>
                  <span className="px-2 py-0.2 bg-purple-950 text-purple-300 rounded text-[10px] font-mono border border-purple-700">
                    ThinkingLevel.HIGH
                  </span>
                </div>
                {showThinkingProcess ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showThinkingProcess && (
                <div className="p-4 text-xs font-mono text-purple-200/90 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto bg-slate-950/80">
                  {result.thinkingProcess}
                </div>
              )}
            </div>
          )}

          {/* Final Synthesized Output */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              Synthesized High Thinking Solution & Action Directive:
            </h4>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
              {result.text}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
