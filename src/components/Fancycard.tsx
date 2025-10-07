interface FancyCardProps {
    image: string;
    title: string;
    description: string;
    href?: string;
  }
  
  export default function FancyCard({ image, title, description, href = "#" }: FancyCardProps) {
    return (
      <div className="relative group w-full max-w-4xl mx-auto mt-10">
        {/* Fondo desplazado */}
        <div className="absolute -top-5 right-8 w-full h-full rounded-lg bg-light-pink group-hover:bg-secondary-hover dark:bg-gray-300 dark:group-hover:bg-secondary-hover transition-all duration-300 group-hover:translate-x-[60px] translate-x-0 z-0" />
  
        {/* Tarjeta principal con efecto de zoom */}
        <a
          href={href}
          className="relative flex flex-col items-center border border-gray-200 rounded-lg shadow-md md:flex-row w-full max-w-4xl h-80 dark:border-gray-600 z-10 bg-white transition-all duration-300 transform group-hover:scale-[1.02]"
        >
          {/* Lado izquierdo */}
          <div className="md:w-1/2 h-full bg-white flex items-center justify-center rounded-t-lg md:rounded-none md:rounded-s-lg">
            <img
              className="w-full h-full object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
              src={image}
              alt={title}
            />
          </div>
  
          {/* Lado derecho con textos que cambian al hacer hover */}
          <div className="flex flex-col justify-center p-4 leading-normal md:w-1/2 h-full bg-white text-left">
            <h5 className="mb-2 text-2xl semi-bold tracking-tight text-highlight group-hover:text-gray-800 transition-colors duration-300">
              {title}
            </h5>
            <p className="mb-3 font-light text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
              {description}
            </p>
          </div>
        </a>
      </div>
    );
  }
  