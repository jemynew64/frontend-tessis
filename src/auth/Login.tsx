import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

// components
import Image from "../shared/components/Image";
// shared
import { useAuthStore } from "../shared/store/auth";
// mis carpeta
import { loginPost } from "./login.service";
import { loginSchema, LoginForm } from "./loginSchema";
// icons
import { Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    const response = await loginPost(data);

    if (response.success && response.data.token && response.data.user) {
      setAuth(response.data.token, response.data.user);
      navigate("/aprender");

      toast.success("¡Usuario correcto bienvenido!", {
        duration: 3000,
        position: "top-center",
        style: { background: "#28a745", color: "#fff" },
      });
    } else if (response.status === 401 || response.status === 404) {
      toast.error("Credenciales incorrectas");
    } else {
      toast.error(response.mensaje || "Hubo un error inesperado");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center w-full overflow-hidden px-4">
      {/* 🎬 Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src="/videos/videofondo.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Capa de desenfoque */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-[-1]" />

      {/* Contenido del login */}
      <div className="rounded-lg px-6 py-6 sm:px-12 sm:py-8 w-full max-w-sm sm:max-w-md bg-login-pattern backdrop-blur-lg transition-transform duration-300 ease-in-out hover:scale-[1.01] shadow-xl">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/iconodemarca-sinfondo.png"
            alt="Logo de la marca"
            width="w-48 sm:w-64"
            height="h-48 sm:h-64"
          />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 text-white font-roboto">
          Ingresar
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              className={`shadow-sm rounded-md w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white bg-opacity-80 text-black`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Ingresa tu contraseña"
              className={`shadow-sm rounded-md w-full px-3 py-2 pr-10 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white bg-opacity-80 text-black`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-custom-purple hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};
