import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg-wave.jpg";

export default function Settings() {
    const navigate = useNavigate();

    // ================= STATE (LOAD FROM LOCALSTORAGE) =================
    const [nudges, setNudges] = useState(() => {
        const saved = localStorage.getItem("nudges");
        return saved !== null ? JSON.parse(saved) : true;
    });

    const [storeHistory, setStoreHistory] = useState(() => {
        const saved = localStorage.getItem("storeHistory");
        return saved !== null ? JSON.parse(saved) : true;
    });

    // ================= SAVE ON CHANGE =================
    useEffect(() => {
        localStorage.setItem("nudges", JSON.stringify(nudges));
    }, [nudges]);

    useEffect(() => {
        localStorage.setItem("storeHistory", JSON.stringify(storeHistory));
    }, [storeHistory]);

    // ================= UI =================
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

            {/* Content */}
            <div className="relative z-10 min-h-screen px-6 max-w-4xl mx-auto">

                {/* ================= HEADER ================= */}
                <header className="py-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-sm text-gray-400 hover:text-white transition"
                    >
                        ← Back
                    </button>

                    <h1 className="text-xl font-semibold text-white">
                        Settings
                    </h1>

                    <div className="w-10" />
                </header>

                {/* ================= PROFILE ================= */}
                <section className="mt-10 bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
                    <h2 className="text-white font-medium mb-4">
                        Profile
                    </h2>

                    <div className="space-y-3 text-sm text-gray-300">
                        <div>
                            <span className="text-gray-400">Name</span>
                            <div className="mt-1 text-white">User</div>
                        </div>

                        <div>
                            <span className="text-gray-400">Email</span>
                            <div className="mt-1 text-white">user@email.com</div>
                        </div>
                    </div>
                </section>

                {/* ================= PREFERENCES ================= */}
                <section className="mt-8 bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
                    <h2 className="text-white font-medium mb-4">
                        Preferences
                    </h2>

                    <label className="flex items-center justify-between cursor-pointer text-sm text-gray-300">
                        <span>Daily financial nudges</span>
                        <input
                            type="checkbox"
                            checked={nudges}
                            onChange={() => setNudges(!nudges)}
                            className="accent-white"
                        />
                    </label>
                </section>

                {/* ================= PRIVACY ================= */}
                <section className="mt-8 bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
                    <h2 className="text-white font-medium mb-4">
                        Privacy
                    </h2>

                    <label className="flex items-center justify-between cursor-pointer text-sm text-gray-300">
                        <span>Store chat history</span>
                        <input
                            type="checkbox"
                            checked={storeHistory}
                            onChange={() => setStoreHistory(!storeHistory)}
                            className="accent-white"
                        />
                    </label>
                </section>

                {/* ================= ACCOUNT ================= */}
                <section className="mt-8 mb-24 bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
                    <h2 className="text-white font-medium mb-4">
                        Account
                    </h2>

                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm text-red-400 hover:text-red-300 transition"
                    >
                        Log out
                    </button>
                </section>

            </div>
        </div>
    );
}
