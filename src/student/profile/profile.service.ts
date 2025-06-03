import axiosAuth from "../../shared/utils/AxiosHeader";

// export const Generarpdf = async ( from: string, to: string): Promise<void> => {
//   const response = await axiosAuth.get(`/pdf`, {
//     params: { from, to },
//     responseType: "blob", // 👈 importante para descargar archivos
//   });

//   // Crear enlace de descarga
//   const blob = new Blob([response.data], { type: "application/pdf" });
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", "reporte_usuario.pdf");
//   document.body.appendChild(link);
//   link.click();
//   link.remove();
//   window.URL.revokeObjectURL(url);
// };
export const Generarpdf = async (from: string, to: string): Promise<void> => {
  try {
    const response = await axiosAuth.get(`/pdf`, {
      params: { from, to },
      responseType: "blob",
    });

    const file = new Blob([response.data], { type: "application/pdf" });

    // Forzamos la descarga manualmente
    const fileURL = window.URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "reporte_usuario.pdf");

    // A veces es necesario esperar al siguiente tick para que funcione correctamente
    setTimeout(() => {
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileURL);
    }, 0);

  } catch (error) {
    console.error("Error generando el PDF:", error);
  }
};
