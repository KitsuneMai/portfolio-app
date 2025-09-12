import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registro exitoso:", data);
        navigate("/");
      } else {
        setErrorMessage(data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-sky-600">
          Crear Cuenta
        </h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="
            w-full px-4 py-2 border rounded-lg
            focus:ring-2 focus:ring-sky-500 focus:outline-none
            invalid:border-pink-500 invalid:text-pink-600
          "
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
            w-full px-4 py-2 border rounded-lg
            focus:ring-2 focus:ring-sky-500 focus:outline-none
            invalid:border-pink-500 invalid:text-pink-600
          "
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="
            w-full px-4 py-2 border rounded-lg
            focus:ring-2 focus:ring-sky-500 focus:outline-none
            invalid:border-pink-500 invalid:text-pink-600
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition disabled:bg-gray-400"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        {errorMessage && (
          <p className="text-center text-pink-600">{errorMessage}</p>
        )}

        <p className="text-sm text-center text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
}
