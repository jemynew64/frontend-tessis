import axiosAuth from "../../shared/utils/AxiosHeader";

export const Generarpdf = async ( from: string, to: string): Promise<void> => {
  const response = await axiosAuth.get(`/pdf`, {
    params: { from, to },
    responseType: "blob", // 👈 importante para descargar archivos
  });

  // Crear enlace de descarga
  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "reporte_usuario.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
