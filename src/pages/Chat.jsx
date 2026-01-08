import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bg from "../assets/bg-wave.jpg";
import { saveRecentQuestion } from "../utils/storage";

export default function Chat() {
    const navigate = useNavigate();
    const location = useLocation();
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const hasInitialized = useRef(false);

    const initialMessage = location.state?.initialMessage;

    const [messages, setMessages] = useState(
        initialMessage ? [{ role: "user", content: initialMessage }] : []
    );
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const followUps = [
        "Can you explain this simply?",
        "Make a monthly plan for me",
        "What should I avoid?",
    ];

    // 🔹 Auto reply for initial message (ONLY ONCE)
    useEffect(() => {
        if (initialMessage && !hasInitialized.current) {
            hasInitialized.current = true;
            simulateAIResponse();
        }
    }, [initialMessage]);

    // 🔹 Auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // 🔹 Auto focus
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const simulateAIResponse = () => {
        setIsTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: `Got it 👍  
Let’s break this down in simple terms.

(This is where your real AI answer will come.)`,
                },
            ]);
            setIsTyping(false);
        }, 1200);
    };

    const handleSend = (e, text = input) => {
        e?.preventDefault();
        if (!text.trim()) return;

        saveRecentQuestion(text);

        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setInput("");
        simulateAIResponse();
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background */}
            <div
                className="fixed inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${bg})`,
                    filter: "blur(3px)",
                    transform: "scale(1.05)",
                }}
            />
            <div className="fixed inset-0 bg-black/70" />

            {/* Layout */}
            <div className="relative z-10 min-h-screen flex flex-col max-w-4xl mx-auto px-4">

                {/* Header */}
                <header className="py-6 flex items-center justify-between border-b border-white/10">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        ← Dashboard
                    </button>

                    <div className="text-center">
                        <h1 className="text-xl font-semibold text-white">Creda AI</h1>
                        <p className="text-xs text-gray-400">
                            Your personal finance assistant
                        </p>
                    </div>

                    <div className="w-10" />
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 py-6">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                ${msg.role === "user"
                                    ? "ml-auto bg-white text-black"
                                    : "mr-auto bg-white/10 text-gray-200 backdrop-blur border border-white/10"
                                }`}
                        >
                            {msg.content}
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="mr-auto flex items-center gap-2 px-4 py-2
              bg-white/10 rounded-2xl border border-white/10 w-fit">
                            <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></span>
                            <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                            <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-300"></span>
                            <span className="text-xs text-gray-400 ml-2">
                                Creda AI is thinking…
                            </span>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* FOLLOW UPS – ONLY AFTER LAST AI MESSAGE */}
                {!isTyping &&
                    messages.length > 0 &&
                    messages[messages.length - 1].role === "assistant" && (
                        <div className="flex flex-wrap gap-2 justify-center pb-4">
                            {followUps.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(null, q)}
                                    className="px-4 py-2 rounded-full
                    bg-black/60 backdrop-blur border border-white/15
                    text-xs text-gray-300 hover:bg-white/10 transition"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                {/* Input */}
                <form
                    onSubmit={handleSend}
                    className="py-4 border-t border-white/10"
                >
                    <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-full px-4 py-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about spending, saving, investing…"
                            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="h-9 w-9 rounded-full bg-white text-black
                flex items-center justify-center
                disabled:opacity-40 hover:scale-110 transition"
                        >
                            →
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
