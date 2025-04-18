export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">404 - Página no encontrada</h1>
        <p className="text-gray-600 mt-2">Lo sentimos, no pudimos encontrar esta página.</p>
        <a href="/" className="mt-4 text-blue-500 hover:underline">
          Volver al inicio
        </a>
      </div>
    );
  }