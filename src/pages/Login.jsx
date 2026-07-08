import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-[#c0c9bb] rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#00450d] mb-1">AgriProfile Banana</h1>
        <p className="text-sm text-[#41493e] mb-6">
          {mode === "login" ? "Inicia sesión para continuar" : "Crea una cuenta de operador"}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#41493e] block">Correo electrónico</label>
            <input
              type="email"
              required
              className="w-full h-12 px-4 border border-[#717a6d] focus:border-[#00450d] focus:ring-1 focus:ring-[#00450d] rounded-lg outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operador@finca.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#41493e] block">Contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full h-12 px-4 border border-[#717a6d] focus:border-[#00450d] focus:ring-1 focus:ring-[#00450d] rounded-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-[#ba1a1a] bg-[#ffdad6] px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#00450d] text-white font-semibold rounded-full hover:bg-[#1b5e20] transition-all disabled:opacity-60"
          >
            {loading ? "Procesando..." : mode === "login" ? "Iniciar sesión" : "Registrarme"}
          </button>
        </form>

        <button
          className="w-full text-center text-sm text-[#00450d] font-medium mt-4 hover:underline"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
        >
          {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}

function mapFirebaseError(code) {
  switch (code) {
    case "auth/invalid-email":
      return "El correo no es válido.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Correo o contraseña incorrectos.";
    case "auth/email-already-in-use":
      return "Ese correo ya está registrado.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    default:
      return "Ocurrió un error. Intenta de nuevo.";
  }
}