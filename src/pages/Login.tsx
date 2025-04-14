import { useNavigate } from "react-router-dom";
import Image from "../components/Image";
import { loginPost } from "../services/login_service";
import { useAuthStore } from "../store/auth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "../schemas/loginSchema"; // Importa el esquema de login

export const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await loginPost(data);

      if (response.token && response.user) {
        setAuth(response.token, response.user);
        navigate("/aprender");
        toast.success("¡Usuario correcto bienvenido!", {
          duration: 3000,
          position: "top-center",
          style: { background: "#28a745", color: "#fff" },
        });
      } else {
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      toast.error("Hubo un error al intentar iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-white">
      <div className="bg-white dark:bg-white rounded-lg px-8 py-6 max-w-md sm:px-12 sm:py-8 w-full">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/iconodemarca.jpg"
            alt="Logo"
            width="w-64 sm:w-64"
            height="h-64 sm:h-64"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-4 dark:text-custom-negro">Ingresar</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              id="email"
              placeholder="Ingresar tu email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-custom-botones-input text-black text-center"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Ingresar tu password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-custom-botones-input text-black text-center"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-custom-purple hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ingresaras
          </button>
        </form>
      </div>
    </div>
  );
};
