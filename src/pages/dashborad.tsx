// Dashboard.tsx
import FancyCard from "../components/Fancycard";

export default function Dashboard() {
  return (
    <div className="min-h-screenf flex flex-col bg-gray-900 text-white">
      {/* Imagen hero */}
      <div className="w-full overflow-hidden">
        <img
          src="/images/bike.jpg"
          alt="Hero"
          className="w-full h-[35rem] md:h-[40rem] lg:h-[50rem] object-cover object-center"
        />

      </div>


      {/* Tarjetas */}
      <main className="max-w-7xl mx-auto px-6 mt-12 mb-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FancyCard
          image="images/part1.jpg"
          title="Haz tu propio video presentando tus servicios"
          description="Crea un portafolio digital único donde muestres tu trabajo con video, imágenes y texto."
        />
        <FancyCard
          image="https://source.unsplash.com/600x400/?qrcode,red"
          title="Expande tu negocio fácilmente con un código QR"
          description="Genera un QR único que conecta clientes directamente con tu portafolio."

        />
        <FancyCard
          image="https://source.unsplash.com/600x400/?business,red"
          title="Comparte tu portafolio en segundos"
          description="Envía tu link o QR y permite que tus clientes accedan de forma rápida y sencilla."
        />
      </main>
    </div>
  );
}
