import api from './api';

export const reportesService = {
  // Reporte de Ventas del Día (PDF)
  async getVentasDiaPDF(): Promise<Blob> {
    const response = await api.get('/reportes/ventas/dia', {
      responseType: 'blob',
    });
    return response.data;
  },

  // Reporte de Stock Bajo (PDF)
  async getStockBajoPDF(): Promise<Blob> {
    const response = await api.get('/reportes/stock-bajo', {
      responseType: 'blob',
    });
    return response.data;
  },

  // Reporte de Total Vendido (PDF)
  async getTotalVendidoPDF(fechaInicio?: string, fechaFin?: string): Promise<Blob> {
    const params: any = {};
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;
    
    const response = await api.get('/reportes/total-vendido', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

// Función para descargar el PDF
export const descargarPDF = (blob: Blob, nombre: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${nombre}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};