import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUnit, updateUnit, deleteUnit,uploadUnitsExcel } from "./unit.service";
import { UnitFormType } from "./unit.schema";
import { showSuccessToast, showErrorToast } from "../../shared/utils/mutationToastHandler";

export const useCreateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unit"] });
      showSuccessToast("Unidad creada correctamente", "📦");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al crear unidad", error, "❌");
    },
  });
};

export const useUpdateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<UnitFormType> }) => updateUnit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unit"] });
      showSuccessToast("Unidad actualizada correctamente", "✏️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al actualizar unidad", error, "❌");
    },
  });
};

export const useDeleteUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unit"] });
      showSuccessToast("Unidad eliminada correctamente", "🗑️");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al eliminar unidad", error, "⚠️");
    },
  });
};
////////////////////////excel
export const useUploadUnitsExcel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadUnitsExcel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unit"] });
      showSuccessToast("Archivo subido correctamente", "📥");
    },
    onError: (error: unknown) => {
      showErrorToast("Error al subir archivo", error, "❌");
    },
  });
};
