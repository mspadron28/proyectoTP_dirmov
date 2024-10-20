import Link from "next/link";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Bienvenido al Test Psicológico
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Este test evaluará tu capacidad de adaptación, trabajo en equipo,
          responsabilidad, ética, y estabilidad emocional.
          <br />
          Por favor, responde con sinceridad.
        </p>
        <Link
          href="/test"
          className="inline-flex items-center gap-4 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Iniciar test</span>
          <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
    </div>
  );
}
