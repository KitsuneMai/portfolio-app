// Dashboard.tsx
import FancyCard from "../components/Fancycard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-orange-50 to-pink-100">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">Yisus App</h1>
        </div>
      </nav>

      {/* Marco central */}
      <main className="w-full px-6 py-16">
        <div className="bg-pink-200/40 dark:bg-pink-300/30 rounded-2xl shadow-lg p-10 border border-pink-300">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-pink-700">
            Lleva tu negocio al siguiente nivel 
          </h2>

          <div className="space-y-24">
            {/* Card 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <FancyCard
                image="https://source.unsplash.com/600x400/?video"
                title="Haz tu propio video presentando tus servicios"
                description="Crea un portafolio digital único donde muestres tu trabajo con video, imágenes y texto."
              />
            </div>

            {/* Card 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <FancyCard
                image="https://source.unsplash.com/600x400/?qrcode"
                title="Expande tu negocio fácilmente con un código QR"
                description="Genera un QR único que conecta clientes directamente con tu portafolio."
              />
            </div>

            {/* Card 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <FancyCard
                image="https://source.unsplash.com/600x400/?business"
                title="Comparte tu portafolio en segundos"
                description="Envía tu link o QR y permite que tus clientes accedan de forma rápida y sencilla."
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
