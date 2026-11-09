import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw,
  Compass,
  ChevronRight
} from 'lucide-react';
import { MarketMetrics, Property, InvestorProfile, AIAgentType, ChatMessage } from '../types';

interface AIInvestmentAdvisorProps {
  markets: MarketMetrics[];
  properties: Property[];
  selectedMarket: MarketMetrics;
  selectedProperty: Property | null;
  investorProfile: InvestorProfile;
}

export const AIInvestmentAdvisor: React.FC<AIInvestmentAdvisorProps> = ({
  markets,
  properties,
  selectedMarket,
  selectedProperty,
  investorProfile,
}) => {
  const [activeAgent, setActiveAgent] = useState<AIAgentType>('investment_strategy');
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      agentName: 'Chief Investment Strategy Agent',
      agentRole: 'Capital Allocation & Underwriting Synthesis',
      text: `Welcome, ${investorProfile.name}. I am your multi-agent AI investment advisor for the **AI Housing Opportunity Engine**.\n\nI am currently contextually grounded in your investor profile (**${investorProfile.firmName}**, budget $${investorProfile.budgetMin.toLocaleString()} - $${investorProfile.budgetMax.toLocaleString()}) and active market focus (**${selectedMarket.name}**).\n\nSelect a specialized agent above or ask a strategic research question to get started.`,
      timestamp: 'Just now',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const agentsList: { id: AIAgentType; name: string; role: string; desc: string }[] = [
    { id: 'investment_strategy', name: 'Strategy Agent', role: 'Chief Strategist', desc: 'Synthesizes portfolio allocation' },
    { id: 'market_research', name: 'Market Research', role: 'Demographic & HUD', desc: 'Analyzes macro supply & demand' },
    { id: 'property_discovery', name: 'Discovery Agent', role: 'Deal Screener', desc: 'Ranks undervalued assets' },
    { id: 'financial_analysis', name: 'Financial Analyst', role: 'Pro-Forma & IRR', desc: 'Underwrites cash flow & returns' },
    { id: 'zoning_intelligence', name: 'Zoning Intel', role: 'Land-Use & ADU', desc: 'Decodes municipal ordinances' },
    { id: 'affordable_impact', name: 'Affordable Impact', role: 'AMI & Vouchers', desc: 'Evaluates workforce housing reach' },
    { id: 'predictive_analytics', name: 'Predictive ML', role: 'Forecast Modeling', desc: 'Forecasts home price & rent trends' },
  ];

  const quickPrompts = [
    "Find the top 5 emerging affordable housing markets in the US",
    "Compare investment opportunities in Baltimore, MD and Cleveland, OH",
    `Recommend a 4-property acquisition plan for my $${(investorProfile.budgetMax / 1000000).toFixed(1)}M budget`,
    "Evaluate by-right ADU construction potential under revised 2026 zoning codes",
    "Analyze Section 8 Fair Market Rent (FMR) spreads vs workforce market rents",
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputQuery;
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const activeAgentObj = agentsList.find(a => a.id === activeAgent);

      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          agentType: activeAgent,
          marketContext: selectedMarket,
          propertyContext: selectedProperty,
          investorProfile,
        }),
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        agentName: activeAgentObj?.name || 'AI Investment Advisor',
        agentRole: activeAgentObj?.role || 'Institutional Research',
        text: data.text || data.fallbackText || "No response generated.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          agentName: 'System Fallback',
          text: "Unable to reach the Gemini AI server. Please verify your connection or API key.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title & Agent Persona Selector */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Google AI Investment Advisor
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Powered by Google Gemini 3.8 Flash multi-agent orchestration for institutional deal research
          </p>
        </div>

        {/* Multi-Agent Switching Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
          {agentsList.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setActiveAgent(agent.id)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeAgent === agent.id
                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                {agent.name}
              </div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium truncate">
                {agent.role}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Context Banner */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs flex flex-wrap items-center justify-between gap-3 text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Active Grounding Context: <strong className="text-slate-900 dark:text-white">{selectedMarket.city}, {selectedMarket.state}</strong></span>
          {selectedProperty && (
            <>
              <span>·</span>
              <span>Selected Property: <strong className="text-slate-900 dark:text-white">{selectedProperty.title}</strong></span>
            </>
          )}
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          Agent: {agentsList.find(a => a.id === activeAgent)?.name}
        </div>
      </div>

      {/* Chat Window Container */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[540px] overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender !== 'user' && (
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 space-y-2 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 rounded-tl-none'
                }`}
              >
                {msg.agentName && (
                  <div className="flex items-center justify-between text-[11px] border-b border-slate-200 dark:border-slate-700 pb-1.5 font-medium text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{msg.agentName}</span>
                    <span className="font-mono text-[10px]">{msg.timestamp}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap font-sans text-xs">
                  {msg.text}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 text-xs">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 text-slate-500 flex items-center gap-2 font-mono">
                <span>{agentsList.find(a => a.id === activeAgent)?.name} is reasoning and synthesizing data...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Query Pills */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] text-slate-400 font-bold uppercase shrink-0">Prompts:</span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qp)}
              disabled={isLoading}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 rounded-md text-[11px] text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask ${agentsList.find(a => a.id === activeAgent)?.name} about market trends, deal feasibility, or zoning...`}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Consult</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
