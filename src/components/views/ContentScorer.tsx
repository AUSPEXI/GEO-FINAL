import { useState } from 'react';
import { PenTool, Loader2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { useAuth } from '@/contexts/AuthContext';
import { UpgradePrompt } from '@/components/ui/upgrade-prompt';

export function ContentScorer() {
  const { tier } = useAuth();
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (tier === 'Free') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Pre-Publish Content Scorer</h1>
          <p className="text-zinc-400">Analyze your content for "Machine Readability" before you publish.</p>
        </div>
        <UpgradePrompt 
          title="Content Scorer Locked" 
          description="Upgrade to the Basic tier to access the Pre-Publish Content Scorer and ensure your content is optimized for LLM extraction."
          requiredTier="Basic"
        />
      </div>
    );
  }

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing");
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
        You are an expert Generative Engine Optimization (GEO) agent.
        Analyze the following content for "Machine Readability" and its likelihood to be cited by LLMs (ChatGPT, Claude, Gemini).
        
        Content:
        ${content}
        
        Score the content out of 100 based on:
        1. Entity Density (Are key entities clearly defined?)
        2. Statistical Anchors (Are there hard numbers/facts instead of qualitative fluff?)
        3. Inverted Pyramid of Synthesis (Is the direct answer in the first sentence?)
        
        Return a JSON object with:
        - overallScore (number 0-100)
        - entityDensityScore (number 0-100)
        - statisticalAnchorsScore (number 0-100)
        - invertedPyramidScore (number 0-100)
        - feedback (array of strings, specific actionable advice on what to change)
        - rewrittenSnippet (string, a suggested rewrite of the weakest paragraph to make it more machine-readable)
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: { type: Type.NUMBER },
              entityDensityScore: { type: Type.NUMBER },
              statisticalAnchorsScore: { type: Type.NUMBER },
              invertedPyramidScore: { type: Type.NUMBER },
              feedback: { type: Type.ARRAY, items: { type: Type.STRING } },
              rewrittenSnippet: { type: Type.STRING }
            },
            required: ["overallScore", "entityDensityScore", "statisticalAnchorsScore", "invertedPyramidScore", "feedback", "rewrittenSnippet"]
          }
        }
      });

      setResult(JSON.parse(response.text || "{}"));
    } catch (error) {
      console.error("Error scoring content:", error);
      alert("Failed to analyze content. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2 flex items-center gap-3">
          <PenTool className="w-8 h-8 text-indigo-500" />
          Pre-Publish Content Scorer
        </h1>
        <p className="text-zinc-400">Paste your draft below to score its Machine Readability for LLM extraction.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your blog post, landing page copy, or article here..."
              className="w-full h-96 bg-transparent text-zinc-300 placeholder-zinc-600 resize-none focus:outline-none"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !content.trim()}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
            ) : (
              <><PenTool className="w-5 h-5" /> Analyze Content</>
            )}
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Overall GEO Score</h3>
                <div className={`text-4xl font-bold ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}/100
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">Entity Density</span>
                    <span className={getScoreColor(result.entityDensityScore)}>{result.entityDensityScore}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${result.entityDensityScore}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">Statistical Anchors</span>
                    <span className={getScoreColor(result.statisticalAnchorsScore)}>{result.statisticalAnchorsScore}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${result.statisticalAnchorsScore}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">Inverted Pyramid</span>
                    <span className={getScoreColor(result.invertedPyramidScore)}>{result.invertedPyramidScore}/100</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${result.invertedPyramidScore}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Actionable Feedback
              </h3>
              <ul className="space-y-3">
                {result.feedback.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                    <ArrowRight className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Suggested Rewrite (Machine-Readable)
              </h3>
              <p className="text-sm text-indigo-100/80 leading-relaxed">
                {result.rewrittenSnippet}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
