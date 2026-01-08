import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg-wave.jpg";
import {
    getRecentQuestions,
    saveRecentQuestion,
    deleteRecentQuestion,
} from "../utils/storage";
import { motion } from "framer-motion";

export default function Dashboard() {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const inputRef = useRef(null);

    const [recentQuestions, setRecentQuestions] = useState(() =>
        getRecentQuestions()
    );

    const insights = [
        "People who review expenses weekly save up to 20% more.",
        "Saving small amounts daily works better than monthly goals.",
        "Most overspending happens due to impulsive habits, not income.",
        "Tracking money once a week improves control significantly.",
    ];

    const [insightIndex, setInsightIndex] = useState(0);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const placeholders = [
        "How can I save ₹10,000 every month?",
        "Why do I overspend without noticing?",
        "Is SIP good for beginners like me?",
        "Explain my money in simple words…",
    ];

    const quickSuggestions = [
        "How can I save ₹5,000 this month?",
        "Is my spending pattern healthy?",
        "Beginner-friendly investment advice",
    ];

    const handleDelete = (question) => {
        deleteRecentQuestion(question);
        setRecentQuestions(getRecentQuestions());
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setInsightIndex((prev) => (prev + 1) % insights.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAsk = (e, text = query) => {
        e?.preventDefault();
        if (!text.trim()) return;

        saveRecentQuestion(text);
        setRecentQuestions(getRecentQuestions());
        navigate("/chat", { state: { initialMessage: text } });
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div
                className="fixed inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${bg})`,
                    filter: "blur(3px)",
                    transform: "scale(1.05)",
                }}
            />
            <div className="fixed inset-0 bg-black/70" />

            <div className="relative z-10 min-h-screen px-6 max-w-6xl mx-auto">

                {/* HEADER */}
                <header className="py-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-white">
                            CREDA A! 👋
                        </h1>
                        <p className="text-sm text-gray-400">
                            Ask Creda AI anything about saving, spending, or investing.
                        </p>
                    </div>

                    <div ref={profileRef} className="relative">
                        <div
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
                                U
                            </div>
                            <span className="text-sm text-gray-300 hidden sm:block">
                                Profile
                            </span>
                        </div>

                        {profileOpen && (
                            <div className="absolute right-0 mt-3 w-40 bg-black/70 backdrop-blur-xl border border-white/15 rounded-xl">
                                <button
                                    onClick={() => navigate("/settings")}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10"
                                >
                                    Settings
                                </button>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* ASK AI */}
                <form
                    onSubmit={handleAsk}
                    className="relative mt-12 flex items-center rounded-2xl bg-black/50 border border-white/15 px-6 py-5"
                >
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholders[placeholderIndex]}
                        className="flex-1 bg-transparent outline-none text-white"
                    />
                    <button
                        type="submit"
                        disabled={!query.trim()}
                        className="ml-4 h-12 w-12 rounded-full bg-white text-black"
                    >
                        →
                    </button>
                </form>
                {/* ================= SUGGESTIONS TO ASK ================= */}
                <section className="mt-10">
                    <p className="text-sm text-gray-400 mb-3 text-center">
                        Not sure what to ask? Try one of these 👇
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            "How can I save ₹5,000 this month?",
                            "Is SIP good for beginners?",
                            "Why do I overspend so much?",
                            "Help me plan my monthly budget",
                        ].map((q, i) => (
                            <button
                                key={i}
                                onClick={(e) => handleAsk(e, q)}
                                className="px-4 py-2 rounded-full
        bg-white/10 text-sm text-gray-300
        hover:bg-white/20 hover:scale-[1.02]
        transition"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </section>

                {/* RECENT QUESTIONS */}
                <section className="mt-12 space-y-3">
                    {recentQuestions.map((q, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center bg-black/40 border border-white/15 rounded-xl px-4 py-3 group"
                        >
                            <div
                                onClick={() =>
                                    navigate("/chat", { state: { initialMessage: q } })
                                }
                                className="cursor-pointer text-gray-300"
                            >
                                {q}
                                <div className="text-xs text-blue-400">Ask again →</div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(q);
                                }}
                                className="opacity-0 group-hover:opacity-100 text-red-400"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </section>

                {/* INSIGHT */}
                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    className="mt-20"
                >
                    <div className="bg-black/40 border border-white/15 rounded-2xl p-6 text-center">
                        <p className="text-xs text-gray-400">💡 1-Minute Money Insight</p>
                        <p className="text-gray-200 text-sm">
                            {insights[insightIndex]}
                        </p>
                    </div>
                </motion.section>
                {/* ================= FOOTER ================= */}
                <footer className="mt-28 mb-10 border-t border-white/10 pt-10 text-sm text-gray-400">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                        {/* About */}
                        <div>
                            <h3 className="text-white font-medium mb-3">Creda AI</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Creda AI helps you understand money in simple words.
                                No bank access. No judgment. Just clarity.
                            </p>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-white font-medium mb-3">Services</h3>
                            <ul className="space-y-2">
                                <li>💰 Saving guidance</li>
                                <li>📊 Spending insights</li>
                                <li>🎯 Goal planning</li>
                                <li>🧠 Money habits</li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-white font-medium mb-3">Contact</h3>
                            <ul className="space-y-2">
                                <li>Email: support@credaai.in</li>
                                <li>Instagram: @creda.ai</li>
                                <li>Twitter (X): @creda_ai</li>
                            </ul>
                        </div>

                        {/* Trust */}
                        <div>
                            <h3 className="text-white font-medium mb-3">Trust</h3>
                            <ul className="space-y-2">
                                <li>🔒 No bank login required</li>
                                <li>📱 Data stays on device</li>
                                <li>⚖️ Privacy-first design</li>
                            </ul>
                        </div>

                    </div>

                    <div className="mt-10 text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} Creda AI. Built for clarity, not confusion.
                    </div>
                </footer>

            </div>
        </div>
    );
}
