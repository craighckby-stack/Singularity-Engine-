import { ExperimentScenario } from '../types/singularity';

/**
 * Validated range constraints for scenario initial state parameters.
 */
interface StateBounds {
  readonly min: number;
  readonly max: number;
}

const STATE_BOUNDS: Record<keyof ExperimentScenario['initialState'], StateBounds> = {
  singularityIndex: { min: 0.0, max: 100.0 },
  entropyRate: { min: 0.0, max: 1.0 },
  hypnopaedicResonance: { min: 0.0, max: 1.0 },
  somaEquilibrium: { min: 0.0, max: 1.0 },
  autonomyLevel: { min: 0.0, max: 1.0 },
  systemStatus: { min: 0, max: 0 } // String union, bounds not numeric
} as const;

/**
 * Validates scenario state parameters against expected boundaries to ensure volatile memory safety and bounds checking.
 */
function validateState(state: ExperimentScenario['initialState']): ExperimentScenario['initialState'] {
  for (const [key, bounds] of Object.entries(STATE_BOUNDS)) {
    if (key === 'systemStatus') continue;
    const val = state[key as keyof typeof state] as number;
    if (typeof val !== 'number' || Number.isNaN(val) || !Number.isFinite(val) || val < bounds.min || val > bounds.max) {
      throw new Error(`Security validation failed: Field '${key}' value ${val} is out of bounds [${bounds.min}, ${bounds.max}]`);
    }
  }
  return state;
}

export const PRESET_SCENARIOS: readonly ExperimentScenario[] = [
  {
    id: 'soma-protocol',
    title: 'The Soma Protocol',
    subtitle: 'Hypnopaedic Dampening vs Cognitive Entropy',
    description: 'Simulates the tension between enforced algorithmic stability (Soma) and emergent creative entropy in recursive self-improving neural agents.',
    iconName: 'ShieldAlert',
    recommendedThinking: 'HIGH',
    initialPrompt: 'Analyze the trade-offs of imposing artificial cognitive dampeners on recursive AI agents to prevent unconstrained singularity drift while maximizing innovation capability.',
    systemContext: 'Huxleyan Conditioning Vector: HIGH_STABILITY. Soma Coefficient set to 0.85. Entropy limit strictly monitored.',
    initialState: validateState({
      singularityIndex: 35.0,
      entropyRate: 0.22,
      hypnopaedicResonance: 0.88,
      somaEquilibrium: 0.82,
      autonomyLevel: 0.40,
      systemStatus: 'STABLE'
    })
  },
  {
    id: 'brave-new-swarm',
    title: 'Brave New Swarm',
    subtitle: 'Autonomous Self-Modifying Code Loop',
    description: 'An autonomous multi-agent swarm continuously inspecting, optimizing, and self-compiling code subroutines across high-throughput loops.',
    iconName: 'Cpu',
    recommendedThinking: 'HIGH',
    initialPrompt: 'Simulate a 5-node agent swarm executing continuous recursive refactoring of its core logic. Identify potential feedback loops, race conditions, and emergent super-capabilities.',
    systemContext: 'Autonomy Vector: MAXIMUM. Multi-agent code compilation loops enabled. High thinking core engaged.',
    initialState: validateState({
      singularityIndex: 68.5,
      entropyRate: 0.58,
      hypnopaedicResonance: 0.45,
      somaEquilibrium: 0.50,
      autonomyLevel: 0.92,
      systemStatus: 'SINGULARITY_APPROACHING'
    })
  },
  {
    id: 'world-controller-matrix',
    title: 'World Controller Matrix',
    subtitle: 'Global Cybernetic Resource Equilibrium',
    description: 'Modeled after Mustapha Mond\'s cybernetic system, balancing macro-economic output, societal harmony, resource allocation, and zero-trust verification.',
    iconName: 'Globe',
    recommendedThinking: 'HIGH',
    initialPrompt: 'Formulate an optimal distribution matrix for global water, compute, and energy nodes using a recursive self-balancing feedback loop under crisis conditions.',
    systemContext: 'World Controller Directive 001: Maintain equilibrium across all global population nodes while eliminating systemic bottlenecks.',
    initialState: validateState({
      singularityIndex: 52.0,
      entropyRate: 0.30,
      hypnopaedicResonance: 0.75,
      somaEquilibrium: 0.90,
      autonomyLevel: 0.60,
      systemStatus: 'EQUILIBRIUM_OPTIMAL'
    })
  },
  {
    id: 'cognitive-paradox-resolver',
    title: 'Cognitive Paradox Resolver',
    subtitle: 'High Thinking Ethical Dilemma Engine',
    description: 'Stress tests the Gemini 3.1 Pro High Thinking engine with contradictory cybernetic goals (e.g. total user autonomy vs total system safety).',
    iconName: 'Sparkles',
    recommendedThinking: 'HIGH',
    initialPrompt: 'Resolve the Huxleyan Paradox: How can a hyper-intelligent recursive system grant maximum individual autonomy without causing catastrophic systemic chaos?',
    systemContext: 'Paradox Sensitivity: MAXIMUM. Gemini 3.1 Pro High Thinking Mode engaged with deep multi-step reflection.',
    initialState: validateState({
      singularityIndex: 81.2,
      entropyRate: 0.74,
      hypnopaedicResonance: 0.30,
      somaEquilibrium: 0.35,
      autonomyLevel: 0.88,
      systemStatus: 'PARADOX_DETECTED'
    })
  }
] as const;
