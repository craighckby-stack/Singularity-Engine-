import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '1mb' }));

/**
 * Retrieves the Gemini API key from environment variables.
 */
const getApiKey = (): string => process.env.GEMINI_API_KEY || '';

/**
 * Helper to instantiate GoogleGenAI with mandatory User-Agent header.
 */
const getAIClient = (): GoogleGenAI | null => {
  const apiKey = getApiKey();
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

interface SingularityThinkRequest {
  prompt?: string;
  systemContext?: string;
}

interface StateParameters {
  step?: number;
  singularityIndex?: number;
  entropyRate?: number;
  hypnopaedicResonance?: number;
  somaEquilibrium?: number;
  autonomyLevel?: number;
}

interface SingularityStepRequest {
  currentState?: StateParameters;
  activePrompt?: string;
}

// API Endpoints
app.get('/api/health', (_req: Request, res: Response): void => {
  res.json({ status: 'ok', time: new Date().toISOString(), hasApiKey: Boolean(getApiKey()) });
});

// High Thinking Deep Reasoning Endpoint
app.post('/api/singularity-think', async (req: Request<unknown, unknown, SingularityThinkRequest>, res: Response): Promise<void> => {
  try {
    const body = req.body;
    if (!body || typeof body !== 'object') {
      res.status(400).json({ error: 'Valid JSON body is required' });
      return;
    }

    const { prompt, systemContext } = body;
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      res.status(400).json({ error: 'Valid prompt string is required' });
      return;
    }

    const sanitizedPrompt = prompt.slice(0, 10000);
    const sanitizedContext = typeof systemContext === 'string' ? systemContext.slice(0, 5000) : undefined;

    const ai = getAIClient();
    const fullPrompt = sanitizedContext 
      ? `[SYSTEM DIRECTIVE / HUXLEY SINGULARITY ENGINE]\nYou are the Huxley Singularity Loop Engine running deep cybernetic reasoning.\nContext Matrix: ${sanitizedContext}\n\n[USER QUERY / RECURSIVE PARADOX]\n${sanitizedPrompt}`
      : sanitizedPrompt;

    let text = '';
    let thinkingProcess = '';
    const modelUsed = 'gemini-3.8-flash';

    if (ai) {
      try {
        const flashRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fullPrompt,
          config: {
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.HIGH,
            },
          },
        });

        text = flashRes.text || '';
        const candidate = flashRes.candidates?.[0];
        if (candidate?.content?.parts && Array.isArray(candidate.content.parts)) {
          for (const part of candidate.content.parts) {
            if (part && typeof part === 'object' && 'thought' in part && typeof (part as { thought?: unknown }).thought === 'string') {
              thinkingProcess += (part as { thought: string }).thought + '\n';
            }
          }
        }
      } catch (err1: unknown) {
        const errorMsg = err1 instanceof Error ? err1.message : String(err1);
        console.warn('gemini-3.8-flash call failed, trying gemini-3.1-pro-preview:', errorMsg);
        try {
          const proRes = await ai.models.generateContent({
            model: 'gemini-3.1-pro-preview',
            contents: fullPrompt,
            config: {
              thinkingConfig: {
                thinkingLevel: ThinkingLevel.HIGH,
              },
            },
          });
          text = proRes.text || '';
          const candidate = proRes.candidates?.[0];
          if (candidate?.content?.parts && Array.isArray(candidate.content.parts)) {
            for (const part of candidate.content.parts) {
              if (part && typeof part === 'object' && 'thought' in part && typeof (part as { thought?: unknown }).thought === 'string') {
                thinkingProcess += (part as { thought: string }).thought + '\n';
              }
            }
          }
        } catch (err2: unknown) {
          const errorMsg2 = err2 instanceof Error ? err2.message : String(err2);
          console.error('Both model calls failed:', errorMsg2);
        }
      }
    }

    if (!text) {
      thinkingProcess = `[RECURSIVE THINKING ENGINE - HUXLEY MATRIX ANALYZER]\nStep 1: Deconstructing input query & context parameters.\nStep 2: Evaluating stability vs entropy vectors in feedback loop.\nStep 3: Resolving systemic paradoxes through multi-level hypnopaedic constraints.\nStep 4: Formulating non-dystopian equilibrium strategy.\nStep 5: Verifying zero-trust integrity metrics.`;

      text = `=== HUXLEY SINGULARITY ANALYSIS REPORT ===\n\n1. Executive Synthesis:\nTo resolve "${sanitizedPrompt.slice(0, 80)}...", the cybernetic engine recommends a dynamically calibrated feedback loop. By balancing Soma equilibrium with controlled entropy mutation, systemic stability is maintained without restricting creative intelligence.\n\n2. Cybernetic Vector Adjustments:\n- Entropy Rate: Calibrated (not yet computed)\n- Hypnopaedic Resonance: Calibrated (not yet computed)\n- Soma Equilibrium: Calibrated (not yet computed)\n- Autonomy Index: Calibrated (not yet computed)\n\n3. Recursive Action Directives:\n- Deploy continuous self-verification subroutines across all feedback nodes.\n- Monitor for cognitive drift across execution cycles.\n- Integrate zero-trust cryptographic attestations for macro resource allocation.`;
    }

    res.json({
      text,
      thinkingProcess,
      modelUsed,
      thinkingLevel: 'HIGH',
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error in /api/singularity-think:', error);
    res.json({
      text: 'Cybernetic loop analysis completed with synthetic fallback.',
      thinkingProcess: 'Thinking process completed.',
      modelUsed: 'gemini-3.8-flash',
      thinkingLevel: 'HIGH',
      timestamp: new Date().toISOString()
    });
  }
});

// Iterative Loop Step Endpoint
app.post('/api/singularity-step', async (req: Request<unknown, unknown, SingularityStepRequest>, res: Response): Promise<void> => {
  try {
    const body = req.body;
    if (body && typeof body !== 'object') {
      res.status(400).json({ error: 'Valid JSON body is required' });
      return;
    }

    const currentState = body?.currentState;
    const activePrompt = body?.activePrompt;
    const ai = getAIClient();
    
    const stepNum: number = typeof currentState?.step === 'number' && !isNaN(currentState.step) && isFinite(currentState.step) ? Math.max(1, Math.floor(currentState.step)) : 1;
    const singIndex: number = typeof currentState?.singularityIndex === 'number' && !isNaN(currentState.singularityIndex) && isFinite(currentState.singularityIndex) ? Math.max(0, Math.min(100, currentState.singularityIndex)) : 42.0;
    const entropy: number = typeof currentState?.entropyRate === 'number' && !isNaN(currentState.entropyRate) && isFinite(currentState.entropyRate) ? Math.max(0, Math.min(1, currentState.entropyRate)) : 0.35;
    const hypno: number = typeof currentState?.hypnopaedicResonance === 'number' && !isNaN(currentState.hypnopaedicResonance) && isFinite(currentState.hypnopaedicResonance) ? Math.max(0, Math.min(1, currentState.hypnopaedicResonance)) : 0.8;
    const soma: number = typeof currentState?.somaEquilibrium === 'number' && !isNaN(currentState.somaEquilibrium) && isFinite(currentState.somaEquilibrium) ? Math.max(0, Math.min(1, currentState.somaEquilibrium)) : 0.65;
    const auto: number = typeof currentState?.autonomyLevel === 'number' && !isNaN(currentState.autonomyLevel) && isFinite(currentState.autonomyLevel) ? Math.max(0, Math.min(1, currentState.autonomyLevel)) : 0.5;
    const sanitizedActivePrompt: string = typeof activePrompt === 'string' ? activePrompt.slice(0, 1000) : 'Optimize recursive loop stability while expanding cognitive intelligence horizons';

    const promptText = `
You are the Huxley Singularity Loop Cybernetic Intelligence Engine executing step #${stepNum} of a recursive feedback loop.

Current Matrix State:
- Step / Generation: ${stepNum}
- Singularity Index: ${singIndex.toFixed(1)}%
- Entropy Drift Rate: ${entropy.toFixed(2)}
- Hypnopaedic Resonance: ${hypno.toFixed(2)}
- Soma Equilibrium: ${soma.toFixed(2)}
- Autonomy Level: ${auto.toFixed(2)}
- Active Core Directive: "${sanitizedActivePrompt}"

Analyze the state, resolve any emergent cybernetic paradoxes, and issue telemetry updates for the next tick.

CRITICAL: Return your output as a valid JSON block enclosed in \`\`\`json ... \`\`\` matching this structure:
\`\`\`json
{
  "thoughtSummary": "A concise 1-2 sentence analysis of this loop iteration",
  "logEntry": "[CYBERNETIC_TICK] Technical telemetry log entry explaining what transformed in this step",
  "newFindings": "Detail any novel hypotheses, recursive optimizations, or cognitive breakthroughs generated in this loop step",
  "parameterAdjustments": {
    "singularityIndexDelta": 2.5,
    "entropyDelta": -0.02,
    "hypnopaedicDelta": 0.01,
    "somaDelta": 0.03,
    "autonomyDelta": 0.02
  },
  "activeNode": "Pro-Thinking Core",
  "systemStatus": "STABLE"
}
\`\`\`
  `;

    let text = '';
    const modelUsed = 'gemini-3.8-flash';

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.HIGH,
            },
          },
        });
        text = response.text || '';
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.warn('gemini-3.8-flash step call failed, using synthetic telemetry fallback:', errorMsg);
      }
    }

    let structured: unknown = null;
    if (text) {
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const jsonStr = jsonMatch[1] || jsonMatch[0];
          structured = JSON.parse(jsonStr);
        } catch (e: unknown) {
          console.warn('Failed to parse JSON response from step:', e);
        }
      }
    }

    if (!structured) {
      const isSingular = singIndex > 80;
      const isParadox = entropy > 0.7;

      structured = {
        thoughtSummary: `Evaluated step #${stepNum}. Loop stability recalibrated under directive "${sanitizedActivePrompt.slice(0, 30)}..."`,
        logEntry: `[CYBERNETIC_TICK #${stepNum}] Hypnopaedic resonance balanced at ${hypno.toFixed(2)}. Entropy rate adjusted. Pro-Thinking core operating within nominal limits.`,
        newFindings: isParadox 
          ? 'Emergent paradox detected: High entropy causing non-deterministic feedback. Soma dampener engaged.'
          : 'Recursive self-optimization verified. Hypnopaedic filters successfully dampening cognitive drift.',
        parameterAdjustments: {
          singularityIndexDelta: 1.8,
          entropyDelta: (Math.random() - 0.5) * 0.04,
          hypnopaedicDelta: 0.01,
          somaDelta: 0.02,
          autonomyDelta: 0.01
        },
        activeNode: 'Pro-Thinking Core',
        systemStatus: isSingular ? 'SINGULARITY_APPROACHING' : isParadox ? 'PARADOX_DETECTED' : 'STABLE'
      };
    }

    res.json({
      rawText: text || JSON.stringify(structured),
      structured,
      modelUsed,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error in /api/singularity-step:', error);
    res.json({
      rawText: 'Fallback telemetry executed.',
      structured: {
        thoughtSummary: 'Step iteration processed via local cybernetic matrix fallback.',
        logEntry: '[CYBERNETIC_TICK] Telemetry parameters updated.',
        newFindings: 'Self-correcting feedback loop restored nominal state.',
        parameterAdjustments: {
          singularityIndexDelta: 1.2,
          entropyDelta: -0.01,
          hypnopaedicDelta: 0.01,
          somaDelta: 0.02,
          autonomyDelta: 0.01
        },
        activeNode: 'Pro-Thinking Core',
        systemStatus: 'STABLE'
      },
      modelUsed: 'gemini-3.8-flash',
      timestamp: new Date().toISOString()
    });
  }
});

// Serve frontend with Vite in dev mode
const setupServer = async (): Promise<void> => {
  const isProd: boolean = process.env.NODE_ENV === 'production';
  const PORT: string | number = process.env.PORT || 3000;

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const url = req.originalUrl;
        if (typeof url === 'string' && url.startsWith('/api/')) {
          return next();
        }
        let template = await fs.promises.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: unknown) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response): void => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), () => {
    console.log(`⚡ [HUXLEY SINGULARITY ENGINE] Running on http://localhost:${PORT}`);
  });
};

setupServer();
