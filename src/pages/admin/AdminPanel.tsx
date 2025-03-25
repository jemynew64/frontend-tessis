import {useForm} from "react-hook-form"
import { zodResolver} from "@hookform/resolvers/zod"
import { estudianteSchema,FormEstudiante } from "../../schemas/EstudianteSchema"
export const AdminPanel = () => {
  
  const {register, handleSubmit, watch , formState:{errors}} = useForm<FormEstudiante>({
    resolver:zodResolver(estudianteSchema)
  })
  
  console.log(errors)

  return (
    <>
<form onSubmit={handleSubmit(data => console.log(data))} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
  <div>
    <label htmlFor="nombre" className="block font-medium">Nombre</label>
    <input type="text" id="nombre" {...register('nombre')} className="w-full p-2 border rounded" />
    {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
  </div>

  <div>
    <label htmlFor="email" className="block font-medium">Correo electrónico</label>
    <input type="email" id="email" {...register('email')} className="w-full p-2 border rounded" />
    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
  </div>

  <div>
    <label htmlFor="contraseña" className="block font-medium">Contraseña</label>
    <input type="password" id="contraseña" {...register('contraseña')} className="w-full p-2 border rounded" />
    {errors.contraseña && <p className="text-red-500 text-sm">{errors.contraseña.message}</p>}
  </div>

  <div>
    <label htmlFor="corazones" className="block font-medium">Vidas</label>
    <input type="number" id="corazones" {...register('corazones',{ valueAsNumber: true })} className="w-full p-2 border rounded" />
    {errors.corazones && <p className="text-red-500 text-sm">{errors.corazones.message}</p>}
  </div>

  <div>
    <label htmlFor="puntos" className="block font-medium">Puntos</label>
    <input type="number" id="puntos" {...register('puntos',{ valueAsNumber: true })} className="w-full p-2 border rounded" />
    {errors.puntos && <p className="text-red-500 text-sm">{errors.puntos.message}</p>}
  </div>

  <div>
    <label htmlFor="experiencia" className="block font-medium">Experiencia</label>
    <input type="number" id="experiencia" {...register('experiencia',{ valueAsNumber: true })} className="w-full p-2 border rounded" />
    {errors.experiencia && <p className="text-red-500 text-sm">{errors.experiencia.message}</p>}
  </div>

  <div>
    <label htmlFor="tipo_usuario" className="block font-medium">Tipo de usuario</label>
    <select id="tipo_usuario" {...register('tipo_usuario')} className="w-full p-2 border rounded">
      <option value="estudiante">Estudiante</option>
      <option value="admin">Admin</option>
    </select>
    {errors.tipo_usuario && <p className="text-red-500 text-sm">{errors.tipo_usuario.message}</p>}
  </div>

  <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Submit</button>
</form>

<div className="mt-4 p-4 bg-gray-100 rounded">
  <pre className="text-sm text-gray-700">{JSON.stringify(watch(), null, 2)}</pre>
</div>
    </>
  )
}
