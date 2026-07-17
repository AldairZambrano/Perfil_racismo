import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { auth } from "../lib/firebase";

export default function VerifyEmail() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  // Si el usuario ya está verificado (o no hay sesión), no debe quedarse aquí.
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else if (user.emailVerified) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleResend = async () => {
    setError("");
    try {
      await sendEmailVerification(auth.currentUser);
      setSent(true);
    } catch (err) {
      setError("No se pudo enviar el correo. Intenta de nuevo en unos minutos.");
    }
  };

  const handleCheck = async () => {
    setChecking(true);
    setError("");
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        navigate("/", { replace: true });
      } else {
        setError("Aún no detectamos la verificación. Revisa tu bandeja de entrada (y spam).");
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-[#c0c9bb] rounded-xl p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-[#00450d] mb-1">Verifica tu correo</h1>
        <p className="text-sm text-[#41493e] mb-6">
          Te enviamos un enlace de verificación a <strong>{user?.email}</strong>. Ábrelo y luego
          vuelve aquí.
        </p>

        {error && (
          <p className="text-sm text-[#ba1a1a] bg-[#ffdad6] px-3 py-2 rounded-lg mb-4">{error}</p>
        )}
        {sent && !error && (
          <p className="text-sm text-[#00450d] bg-[#e6f4ea] px-3 py-2 rounded-lg mb-4">
            Correo reenviado.
          </p>
        )}

        <button
          onClick={handleCheck}
          disabled={checking}
          className="w-full h-12 bg-[#00450d] text-white font-semibold rounded-full hover:bg-[#1b5e20] transition-all disabled:opacity-60 mb-3"
        >
          {checking ? "Revisando..." : "Ya verifiqué mi correo"}
        </button>

        <button
          onClick={handleResend}
          className="w-full text-center text-sm text-[#00450d] font-medium hover:underline mb-4"
        >
          Reenviar correo de verificación
        </button>

        <button
          onClick={logout}
          className="w-full text-center text-sm text-[#41493e] hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
