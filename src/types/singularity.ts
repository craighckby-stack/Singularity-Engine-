export type NodeId = 
  | 'sensorium'
  | 'hypnopaedic'
  | 'thinking_core'
  | 'synthesis'
  | 'feedback'
  | 'mutation';

export interface SingularityNode {
  id: NodeId;
  label: string;
  sublabel: string;
  description: string;
  status: 'idle' | 'active' | 'processing' | 'optimized';
  color: string;
  throughputTokens: number;
}

export interface SingularityState {
  step: number;
  singularityIndex: number; // 0 - 100%
  entropyRate: number; // 0.0 - 1.0
  hypnopaedicResonance: number; // 0.0 - 1.0
  somaEquilibrium: number; // 0.0 - 1.0
  autonomyLevel: number; // 0.0 - 1.0
  activeNode: NodeId;
  systemStatus: 'STABLE' | 'SINGULARITY_APPROACHING' | 'PARADOX_DETECTED' | 'EQUILIBRIUM_OPTIMAL' | 'THINKING_HIGH';
  isAutoLooping: boolean;
  loopIntervalMs: number;
}

export interface ParameterAdjustments {
  singularityIndexDelta: number;
  entropyDelta: number;
  hypnopaedicDelta: number;
  somaDelta: number;
  autonomyDelta: number;
}

export interface StepLogEntry {
  id: string;
  step: number;
  timestamp: string;
  activeNode: NodeId;
  thoughtSummary: string;
  logEntry: string;
  newFindings?: string;
  parameterAdjustments?: ParameterAdjustments;
  modelUsed: string;
  thinkingProcess?: string;
}

export interface ExperimentScenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  initialPrompt: string;
  systemContext: string;
  recommendedThinking: 'HIGH' | 'FLASH';
  initialState: Partial<SingularityState>;
}

export interface DeepThinkingResult {
  query: string;
  systemContext?: string;
  text: string;
  thinkingProcess?: string;
  modelUsed: string;
  thinkingLevel: 'HIGH';
  timestamp: string;
}
