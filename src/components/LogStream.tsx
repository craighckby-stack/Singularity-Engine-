import React, { useState } from 'react';
import { StepLogEntry } from '../types/singularity';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Brain, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Terminal,
  Activity
} from 'lucide-react';

interface LogStreamProps {
  logs: StepLogEntry[];
  onClearLogs: () => void;
}

export const LogStream: React.FC<LogStreamProps> = ({ logs, onClearLogs }) => {
  const [copied, setCopied] = useState(false);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(logs[0]?.id || null);

  const handleCopyLogs = () => {
    const jsonStr = JSON.stringify(logs, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadLogs = () => {
    const jsonStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `huxley_singularity_session_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="font-mono text-sm font-bold text-white tracking-wider">
              CONSCIOUSNESS STREAM & TELEMETRY LOGS
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Total Logged Ticks: <span className="text-cyan-400 font-bold">{logs.length}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyLogs}
            disabled={logs.length === 0}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-all border border-slate-700 disabled:opacity-50"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleDownloadLogs}
            disabled={logs.length === 0}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 rounded-lg text-xs font-mono transition-all border border-cyan-800 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Session JSON</span>
          </button>

          <button
            onClick={onClearLogs}
            disabled={logs.length === 0}
            className="px-3 py-1.5 bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-300 rounded-lg text-xs font-mono transition-all border border-slate-800 hover:border-red-800 disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Logs Feed */}
      {logs.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 font-mono text-xs">
          <Activity className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-pulse" />
          <p>No telemetry ticks recorded yet.</p>
          <p className="text-slate-600 mt-1">Execute a loop tick or run High Thinking to populate the consciousness stream.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => {
            const isExpanded = expandedLogId === log.id;

            return (
              <div 
                key={log.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm transition-all"
              >
                {/* Log Item Bar */}
                <button
                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-950/60 hover:bg-slate-900 text-left transition-colors font-mono text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                      Tick #{log.step}
                    </span>
                    <span className="text-purple-300 font-semibold hidden sm:inline">
                      [{log.activeNode}]
                    </span>
                    <span className="text-slate-300 line-clamp-1 font-sans">
                      {log.thoughtSummary}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 ml-2">
                    <span className="text-[10px] text-slate-500 hidden md:inline">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-800/80 space-y-4 font-mono text-xs bg-slate-950/90">
                    
                    {/* Log entry details */}
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">
                        TELEMETRY RECORD:
                      </span>
                      <p className="text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800/80 font-sans leading-relaxed">
                        {log.logEntry}
                      </p>
                    </div>

                    {/* New Findings if present */}
                    {log.newFindings && (
                      <div>
                        <span className="text-purple-400 text-[10px] uppercase font-bold block mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          CYBERNETIC BREAKTHROUGH FINDING:
                        </span>
                        <p className="text-purple-200/90 bg-purple-950/40 p-3 rounded-lg border border-purple-800/50 font-sans leading-relaxed">
                          {log.newFindings}
                        </p>
                      </div>
                    )}

                    {/* Parameter Deltas Applied */}
                    {log.parameterAdjustments && (
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">
                          PARAMETER MATRIX ADJUSTMENTS APPLIED:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                          <div className="bg-slate-900 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[9px]">Singularity:</span>
                            <span className="text-cyan-400 font-bold">
                              {log.parameterAdjustments.singularityIndexDelta >= 0 ? '+' : ''}{log.parameterAdjustments.singularityIndexDelta}%
                            </span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[9px]">Entropy:</span>
                            <span className="text-amber-400 font-bold">
                              {log.parameterAdjustments.entropyDelta >= 0 ? '+' : ''}{log.parameterAdjustments.entropyDelta}
                            </span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[9px]">Hypnopaedic:</span>
                            <span className="text-indigo-400 font-bold">
                              {log.parameterAdjustments.hypnopaedicDelta >= 0 ? '+' : ''}{log.parameterAdjustments.hypnopaedicDelta}
                            </span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[9px]">Soma:</span>
                            <span className="text-emerald-400 font-bold">
                              {log.parameterAdjustments.somaDelta >= 0 ? '+' : ''}{log.parameterAdjustments.somaDelta}
                            </span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block text-[9px]">Autonomy:</span>
                            <span className="text-purple-400 font-bold">
                              {log.parameterAdjustments.autonomyDelta >= 0 ? '+' : ''}{log.parameterAdjustments.autonomyDelta}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
