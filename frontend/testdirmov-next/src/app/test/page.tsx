import SistemasGeneral from "../ui/SistemasGeneral";
import SistemaPatologico from "../ui/SistemaPatologico";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-4xl font-bold text-black text-center mb-8">
        Test Psicológico
      </h1>
      <SistemasGeneral />
      <SistemaPatologico />
    </div>
  );
}
