
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { APP_FLOW } from './constants';
import { ContentType, TrainingState, ActionButton } from './types';

// --- Immersive UI Components ---

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full z-[200] h-1 bg-zinc-900/50 backdrop-blur-md">
    <div 
      className="h-full bg-lime-400 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(163,230,53,0.8)]"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const YouTubePlayer: React.FC<{ title: string; epNum?: string }> = ({ title, epNum }) => {
  const videoId = "IMY7gQOzgLw";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1`;

  return (
    <div className="w-full max-w-[320px] mx-auto mb-8 relative group animate-in zoom-in-95 fade-in duration-700">
      <div className="absolute -inset-4 bg-lime-400/5 blur-3xl rounded-full opacity-50"></div>
      
      <div className="relative aspect-[9/16] bg-black rounded-[3rem] overflow-hidden border-[8px] border-zinc-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <iframe 
          src={embedUrl}
          title="Cricket Coaching Demo"
          className="absolute inset-0 w-full h-full object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
      </div>

      <div className="mt-6 text-center">
        {epNum && (
          <div className="inline-block px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 mb-3">
            <span className="text-lime-400 font-black text-[10px] tracking-[0.2em] uppercase">{epNum}</span>
          </div>
        )}
        <h2 className="text-white font-black text-xl uppercase leading-tight tracking-tight px-4">{title}</h2>
      </div>
    </div>
  );
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatModalProps {
  prompt: string;
  goal?: string;
  actions: ActionButton[];
  onAction: (action: ActionButton) => void;
  onBack: () => void;
}

const AICoachChat: React.FC<ChatModalProps> = ({ prompt, goal, actions, onAction, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: prompt }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // Extended for typing
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const genAI = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY || '' }), []);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (timeLeft <= 0) {
      // Logic for time-out: follow first action or auto-close
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const chat = genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: `You are Chirag, an elite cricket coach. Be professional, disciplined, and Hindi-English (Hinglish) mixed like "Game dimaag se jeeta jaata hai". Current coaching goal: ${goal}. The initial question was: ${prompt}. User just said: ${userMsg}. Respond briefly and stay in character.` }] }
        ],
        config: {
            systemInstruction: "You are Coach Chirag. Tough, disciplined, and elite. You use a mix of Hindi and English. Keep responses under 50 words."
        }
      });

      const response = await chat;
      const responseText = response.text || "I didn't quite catch that. Focus on the goal.";
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Network issue. Focus, player. Choose your next move below." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="w-full max-w-lg bg-zinc-900/60 border border-white/10 rounded-[2.5rem] flex flex-col shadow-[0_0_100px_rgba(163,230,53,0.05)] relative overflow-hidden h-[85vh] ring-1 ring-white/10">
        
        {/* Animated Timer Stripe */}
        <div 
          className="absolute top-0 left-0 h-1.5 bg-lime-400 transition-all duration-1000 linear shadow-[0_0_15px_rgba(163,230,53,0.5)]" 
          style={{ width: `${(timeLeft / 45) * 100}%` }}
        ></div>

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900/40">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-400 text-black rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-headset"></i>
              </div>
              <div>
                <div className="text-[10px] font-black text-lime-400 uppercase tracking-widest">Live Coach</div>
                <div className="text-sm font-bold text-white">Coach Chirag</div>
              </div>
           </div>
           <div className="text-right">
              <div className={`text-xl font-black font-mono tracking-tighter ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-zinc-500'}`}>
                {timeLeft}s
              </div>
           </div>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-lime-400 text-black rounded-tr-none' : 'bg-zinc-800 text-zinc-100 border border-white/5 rounded-tl-none'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-zinc-800/50 px-5 py-3 rounded-2xl border border-white/5 rounded-tl-none">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                   <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* Suggestions/Action Buttons (The transitions) */}
        <div className="p-6 bg-zinc-900/80 border-t border-white/5">
           <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => onAction(action)}
                  className="whitespace-nowrap py-2.5 px-5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 font-black text-[10px] uppercase tracking-widest hover:bg-lime-400 hover:text-black transition-all"
                >
                  {action.label}
                </button>
              ))}
           </div>
           
           <form onSubmit={sendMessage} className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Talk to coach..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/50 transition-all text-white placeholder:text-zinc-600"
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="w-12 h-12 bg-lime-400 text-black rounded-2xl flex items-center justify-center hover:bg-lime-300 active:scale-90 transition-all disabled:opacity-50"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
           </form>
           
           <button
            onClick={onBack}
            className="w-full mt-4 py-3 rounded-xl text-zinc-500 font-bold text-[9px] uppercase tracking-[0.2em] hover:text-zinc-300 transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-chevron-left text-[7px]"></i> Back to training
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<TrainingState>({
    currentNodeId: '1',
    trainingDay: 1,
    gymAccess: null,
    history: []
  });

  const currentNode = useMemo(() => APP_FLOW[state.currentNodeId], [state.currentNodeId]);

  const backgroundNode = useMemo(() => {
    if (currentNode.contentType !== ContentType.CHAT) return currentNode;
    const lastVideoId = [...state.history].reverse().find(id => APP_FLOW[id]?.contentType !== ContentType.CHAT);
    return lastVideoId ? APP_FLOW[lastVideoId] : APP_FLOW['1'];
  }, [currentNode, state.history]);

  const progressPercent = useMemo(() => {
    const keys = Object.keys(APP_FLOW);
    const index = keys.indexOf(state.currentNodeId);
    if (state.currentNodeId === '1') return 5;
    return Math.min(Math.max((index / keys.length) * 100, (state.history.length / 20) * 100), 98);
  }, [state.currentNodeId, state.history]);

  const handleAction = useCallback((action: ActionButton) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setState(prev => {
      let nextId = action.nextNode;
      let nextDay = prev.trainingDay;
      let nextGymAccess = prev.gymAccess;

      if (prev.currentNodeId === '12') nextGymAccess = action.label === 'Gym';

      if (nextId === 'loop') {
          nextDay = prev.trainingDay + 1;
          if (nextDay > 4) nextId = '1'; 
          else nextId = prev.gymAccess ? '13G' : '13NG';
      }

      return {
        ...prev,
        currentNodeId: nextId,
        trainingDay: nextDay,
        gymAccess: nextGymAccess,
        history: [...prev.history, prev.currentNodeId]
      };
    });
  }, []);

  const handleBack = useCallback(() => {
    setState(prev => {
      if (prev.history.length === 0) return prev;
      const newHistory = [...prev.history];
      const prevNodeId = newHistory.pop() || '1';
      return { ...prev, currentNodeId: prevNodeId, history: newHistory };
    });
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-lime-400 selection:text-black pb-24 overflow-x-hidden">
      <ProgressBar progress={progressPercent} />

      <header className="pt-12 px-8 pb-8 flex justify-between items-center max-w-xl mx-auto relative z-[110]">
        <div className="flex items-center gap-3">
           <div className="w-9 h-9 bg-lime-400 text-black rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.2)]">
             <i className="fas fa-cricket-bat-ball text-sm"></i>
           </div>
           <div>
             <span className="font-syncopate font-black text-[12px] tracking-wider uppercase block leading-none">Chirag.Pro</span>
             <span className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.3em] mt-1 block">Elite Academy</span>
           </div>
        </div>
        
        {state.history.length > 0 && (
          <button 
            onClick={handleBack}
            className="w-11 h-11 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-lime-400/30 transition-all active:scale-90"
          >
            <i className="fas fa-arrow-left text-sm"></i>
          </button>
        )}
      </header>

      <main className={`px-8 py-2 max-w-xl mx-auto flex flex-col min-h-[65vh] transition-all duration-700 ease-out ${currentNode.contentType === ContentType.CHAT ? 'blur-2xl scale-90 opacity-20 pointer-events-none grayscale' : 'opacity-100 scale-100'}`}>
        <YouTubePlayer title={backgroundNode.title} epNum={backgroundNode.epNum} />

        {backgroundNode.dialogue && (
          <div className="my-10 text-center animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300">
             <div className="w-10 h-1 bg-zinc-800 mx-auto mb-6 rounded-full"></div>
             <p className="text-zinc-400 font-medium italic text-xl leading-relaxed px-4 opacity-80">
               "{backgroundNode.dialogue}"
             </p>
          </div>
        )}

        {currentNode.contentType !== ContentType.CHAT && (
          <div className="mt-auto pt-10 space-y-4 animate-in slide-in-from-bottom-8 duration-700">
             <div className={`grid gap-4 ${currentNode.actions.length > 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {currentNode.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAction(action)}
                    className={`
                      btn-tactical py-5 px-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.15em] transition-all transform active:scale-[0.96] flex items-center justify-center text-center
                      ${action.label.includes('Back') 
                        ? 'bg-zinc-900 text-zinc-400 border border-white/5 hover:bg-zinc-800 hover:text-white' 
                        : 'bg-lime-400 text-black hover:bg-lime-300 shadow-[0_15px_30px_-10px_rgba(163,230,53,0.4)]'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
             </div>
          </div>
        )}
      </main>

      {currentNode.contentType === ContentType.CHAT && (
        <AICoachChat 
          prompt={currentNode.chatPrompt || "Awaiting tactical input..."}
          goal={currentNode.chatGoal}
          actions={currentNode.actions}
          onAction={handleAction}
          onBack={handleBack}
        />
      )}

      <footer className="mt-16 text-center relative z-10 px-8">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-zinc-900/40 backdrop-blur-md border border-white/5 shadow-xl">
           <div className="relative">
             <div className="w-2 h-2 rounded-full bg-lime-400"></div>
             <div className="absolute inset-0 w-2 h-2 rounded-full bg-lime-400 animate-ping opacity-75"></div>
           </div>
           <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
              {currentNode.contentType === ContentType.CHAT ? 'Tactical Feed' : 'Core Training'} • Day {state.trainingDay}
           </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
