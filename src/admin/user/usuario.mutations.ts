import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  uploadUsersExcel,
} from "./usuario.service";
import { StudentForm } from "./EstudianteSchema";
import { showSuccessToast, showErrorToast } from "../../shared/utils/mutationToastHandler";

export const useCrearUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccessToast("Usuario creado correctamente", "👤");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al crear usuario", error, "❌");
    },
  });
};

export const useActualizarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<StudentForm> }) =>
      actualizarUsuario(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccessToast("Usuario actualizado correctamente", "✏️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al actualizar usuario", error, "❌");
    },
  });
};

export const useEliminarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccessToast("Usuario eliminado correctamente", "🗑️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al eliminar usuario", error, "⚠️");
    },
  });
};
/////////accion para el excel
export const useUploadUsersExcel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadUsersExcel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccessToast("Archivo subido correctamente creando usuarios", "📥");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al subir archivo", error, "❌");
    },
  });
};
