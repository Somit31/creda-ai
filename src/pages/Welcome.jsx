import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg-wave.jpg";
import { useEffect } from "react";


const Welcome = () => {
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);


    const handleAsk = (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        // redirect later (soft)
        setTimeout(() => {
            navigate("/login");
        }, 1800);
    };


    return (
        <div className="px-4 md:px-6 max-w-6xl mx-auto">

            {/* FIXED BACKGROUND */}
            <div
                className="fixed inset-0 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${bg})`,
                    filter: "blur(3px)",
                    transform: "scale(1.05)",
                }}
            />


            {/* DARK OVERLAY */}
            <div className="fixed inset-0 bg-black/65" />

            {/* PAGE CONTENT */}
            <div className="relative z-10 min-h-screen flex flex-col px-6">

                {/* ================= HEADER ================= */}
                <header className="w-full max-w-7xl mx-auto py-10 flex items-center justify-between">
                    <nav className="hidden md:flex gap-6 text-sm text-gray-300">
                        <a href="#home" className="hover:text-white transition">Home</a>
                        <a href="#about" className="hover:text-white transition">About</a>
                        <a href="#features" className="hover:text-white transition">Features</a>
                        <a href="#contact" className="hover:text-white transition">Contact</a>
                    </nav>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/login")}
                            className="px-6 py-3 text-sm rounded-full border border-white/30
              text-white hover:bg-white/10 transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="px-4 py-2 text-sm rounded-full bg-white text-black
              hover:opacity-90 transition"
                        >
                            Register
                        </button>
                    </div>
                </header>

                {/* ================= HERO ================= */}
                <main
                    id="home"
                    className="reveal flex flex-col items-center justify-center min-h-[85vh] gap-20 pt-2"
                >

                    {/* BRAND */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white">
                        Creda AI
                    </h1>

                    {/* GLASS CARD */}
                    <div
                        className="w-full max-w-2xl rounded-3xl p-10 text-center
            bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
                    >
                        <h2 className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-200">
                            Understand your money.
                            <br />
                            <span className="text-gray-400 font-light tracking-wide">
                                Ask AI, not spreadsheets.
                            </span>
                        </h2>

                        <p className="text-gray-400 text-sm mt-8">
                            Private. Simple. Built for real-life finances.
                        </p>

                        <form
                            onSubmit={handleAsk}
                            className="mt-8 w-full"
                        >
                            {/* Input ask ai */}
                            <div
                                className="flex items-center rounded-full
    bg-black/40 border border-white/10
    px-4 py-2"
                            >
                                <input
                                    type="text"
                                    placeholder="Why do I still feel broke?"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="flex-1 bg-transparent outline-none
      text-sm md:text-base text-white
      placeholder-gray-500"
                                />

                                {/* Arrow button ONLY for desktop */}
                                <button
                                    type="submit"
                                    className="hidden md:flex ml-2 h-10 w-10 rounded-full
      bg-white text-black items-center justify-center
      hover:scale-105 transition"
                                >
                                    →
                                </button>
                            </div>

                            {/* Mobile CTA button */}
                            <button
                                type="submit"
                                className="md:hidden mt-4 w-full py-3 rounded-full
    bg-white text-black text-sm font-medium
    hover:opacity-90 transition"
                            >
                                Ask Creda AI
                            </button>
                        </form>


                        {/* Chips */}
                        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                AI Guidance
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                Spending Insights
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                Privacy First
                            </span>
                        </div>

                        <p className="text-gray-500 text-xs mt-6">
                            Login required to view AI responses
                        </p>
                    </div>
                </main>
                {/* ================= EXPERIENCE DEMO ================= */}
                <section
                    className="text-3xl md:text-4xl font-semibold text-white text-center mb-6">
                    See how Creda AI works


                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-20 text-sm md:text-base">
                        Creda AI doesn’t give generic financial advice.
                        It listens to your situation, understands your habits,
                        and explains money decisions in simple, human language.
                    </p>


                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                        {/* ================= step 1 ================= */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-xs text-gray-400 mb-2">Step 1</p>
                            <h3 className="text-white text-lg font-medium mb-3">
                                Ask in your own words
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                You don’t need financial knowledge or perfect questions.
                                Ask Creda AI the same way you’d ask a friend —
                                confused, emotional, or unsure.
                            </p>

                            <div className="mt-4 text-sm text-gray-400 italic">
                                “Why do I always feel broke at the end of the month?”
                            </div>
                        </div>
                        {/* ================= step 2 ================= */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-xs text-gray-400 mb-2">Step 2</p>
                            <h3 className="text-white text-lg font-medium mb-3">
                                Creda AI understands the pattern
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Instead of jumping to conclusions, Creda AI looks at
                                common money behaviors — like impulse spending,
                                emotional decisions, and lack of review habits.
                            </p>

                            <div className="mt-4 text-sm text-gray-400 italic">
                                “This isn’t about income. It’s about habits.”
                            </div>
                        </div>
                        {/* ================= step 3 ================= */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-xs text-gray-400 mb-2">Step 3</p>
                            <h3 className="text-white text-lg font-medium mb-3">
                                Get simple, calm guidance
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Creda AI doesn’t overwhelm you with charts or jargon.
                                It gives small, realistic steps you can actually follow —
                                without guilt or pressure.
                            </p>

                            <ul className="mt-4 text-sm text-gray-400 list-disc list-inside space-y-1">
                                <li>Save in small, daily amounts</li>
                                <li>Review spending once a week</li>
                                <li>Avoid emotional late-night purchases</li>
                            </ul>
                        </div>


                    </div>
                </section>

                {/* ================= ABOUT ================= */}
                <section
                    id="about"
                    className="revealmax-w-5xl mx-auto py-32 px-4 text-center animate-fadeUp"
                >
                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                        About Creda AI
                    </h2>

                    {/* Main description */}
                    <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                        Creda AI is built to help people understand their money without fear,
                        confusion, or complicated financial tools.
                        <br /><br />
                        Instead of dashboards full of numbers and charts, Creda AI focuses on
                        conversations. You ask questions, and the system explains what’s happening
                        with your money in simple, human language.
                        <br /><br />
                        Whether you’re trying to save better, control spending, or simply gain
                        clarity — Creda AI works like a calm financial companion, not an accountant.
                    </p>

                    {/* Principles */}
                    <div className="mt-14 max-w-3xl mx-auto flex flex-col items-center gap-4">
                        <div className="border-l-2 border-blue-400 pl-4 text-gray-300 text-center max-w-xl">
                            Human-first finance — clarity over complexity.
                        </div>

                        <div className="border-l-2 border-blue-400 pl-4 text-gray-300 text-center max-w-xl">
                            AI that explains, not overwhelms.
                        </div>

                        <div className="border-l-2 border-blue-400 pl-4 text-gray-300 text-center max-w-xl">
                            Privacy by design — your data stays yours.
                        </div>
                    </div>



                </section>


                {/* ================= FEATURES ================= */}

                <section
                    id="features"
                    className="reveal max-w-6xl mx-auto py-32 px-4"
                >
                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-center">
                        How Creda AI helps you
                    </h2>

                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-24 text-sm md:text-base">
                        Creda AI is designed to feel less like a finance tool
                        and more like a calm conversation about your money.
                    </p>

                    <div className="space-y-28">

                        {/* Feature 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-1">
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    Conversational AI Finance
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Ask questions about your money in plain language.
                                    Creda AI explains what’s happening without jargon,
                                    pressure, or overwhelming data.
                                </p>
                            </div>

                            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                                <p className="text-xs text-gray-400 mb-2">Example</p>
                                <p className="text-white">
                                    “Why do I overspend every month?”
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                            <div className="flex-1">
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    Smart Spending Awareness
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Understand where your money goes over time
                                    without manually tracking every expense
                                    or maintaining spreadsheets.
                                </p>
                            </div>

                            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                                <p className="text-xs text-gray-400 mb-2">Insight</p>
                                <p className="text-white">
                                    “Most spending happens on weekends.”
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-1">
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    Emotional Money Insights
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Identify patterns between spending habits
                                    and emotions to make calmer,
                                    more mindful financial decisions.
                                </p>
                            </div>

                            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                                <p className="text-xs text-gray-400 mb-2">Pattern</p>
                                <p className="text-white">
                                    “Late-night purchases are usually impulsive.”
                                </p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                            <div className="flex-1">
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    Privacy-First by Design
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Your financial data stays private,
                                    secure, and fully under your control —
                                    no selling, no tracking abuse.
                                </p>
                            </div>

                            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                                <p className="text-xs text-gray-400 mb-2">Trust</p>
                                <p className="text-white">
                                    No bank login required.
                                </p>
                            </div>
                        </div>

                        {/* Feature 5 */}
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-1">
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    Built for Real-Life Use
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Creda AI is designed for everyday people,
                                    not finance experts — no pressure,
                                    no judgement, just clarity.
                                </p>
                            </div>

                            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                                <p className="text-xs text-gray-400 mb-2">Feeling</p>
                                <p className="text-white">
                                    Calm, simple, human.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>


                {/* ================= CONTACT ================= */}
                <section
                    id="contact"
                    className="reveal max-w-4xl mx-auto py-24 text-center animate-fadeUp"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        Contact
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Questions or feedback? Reach us anytime.
                    </p>
                    <p className="text-gray-300 text-sm">
                        📩 support@credaai.com
                    </p>
                </section>

                {/* ================= FOOTER ================= */}
                <footer className="pb-6 text-center text-gray-500 text-xs">
                    <div className="flex justify-center gap-6 mb-2">
                        <span className="hover:text-gray-300 cursor-pointer transition">Contact</span>
                        <span className="hover:text-gray-300 cursor-pointer transition">Privacy Policy</span>
                        <span className="hover:text-gray-300 cursor-pointer transition">Terms</span>
                    </div>
                    <p>© 2026 Creda AI. All rights reserved.</p>
                </footer>
            </div >
        </div >
    );
};

export default Welcome;
