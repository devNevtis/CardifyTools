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
      <body className={`bg-gray-100`}>
        <div className="flex h-screen">
          {/* Sidebar */}
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
