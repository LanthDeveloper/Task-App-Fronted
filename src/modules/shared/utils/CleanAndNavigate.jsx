export const cleanAndNavigate = (route) => {
    // Normaliza la ruta, eliminando cualquier posible doble barra o espacios
    const cleanedRoute = route.trim().replace(/^\/+|\/+$/g, "");
  
    try {
      // Reemplaza el estado del historial sin parámetros de consulta
      window.history.replaceState({}, "", `/#/${cleanedRoute}`);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback básico de navegación
      window.location.hash = `/${cleanedRoute}`;
    }
  };
  