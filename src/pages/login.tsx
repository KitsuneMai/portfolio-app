import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso", data);
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setErrorMessage("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
            className="
                w-full px-4 py-2 border rounded-lg
                focus:ring-2 focus:ring-sky-500 focus:outline-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:border-sky-500 focus:outline focus:outline-sky-500
                focus:invalid:border-pink-500 focus:invalid:outline-pink-500
                disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none
                dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20
            "
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

        {errorMessage && (
          <p className="text-center text-sm text-red-500">{errorMessage}</p>
        )}
        <p className="text-sm text-center mt-2 text-white">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-sky-500 hover:underline">
            Regístrate
            </Link>
        </p>
      </form>
    </div>
  );
}
