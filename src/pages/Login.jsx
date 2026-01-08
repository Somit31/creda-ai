import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/bg-wave.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // later: auth logic
    navigate("/dashboard");
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
      <div className="fixed inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div
          className="w-full max-w-md rounded-3xl p-10
          bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <h1 className="text-2xl font-semibold text-white mb-2 text-center">
            Welcome back
          </h1>
          <p className="text-gray-400 text-sm text-center mb-8">
            Log in to continue with Creda AI
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10
              rounded-xl px-4 py-3 text-sm text-white outline-none
              focus:border-white/30 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10
              rounded-xl px-4 py-3 text-sm text-white outline-none
              focus:border-white/30 transition"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black
              text-sm font-medium hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          <p className="text-gray-500 text-xs text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
