// src/app/layout.js
import "./globals.css";
import Sidebar from "@/components/Sidebar";


export const metadata = {
  title: "Cardify",
  description: "Create your custom cards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        {/* En móviles (sm) se apila en columna; a partir de md se muestra en fila */}
        <div className="flex flex-col md:flex-row h-screen">
          {/* Sidebar: en móviles ocupará el 100% del ancho, en md 1/4 */}
          <Sidebar />
          {/* Área dinámica */}
          <main className="flex-1 flex items-center justify-center bg-gray-200">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
