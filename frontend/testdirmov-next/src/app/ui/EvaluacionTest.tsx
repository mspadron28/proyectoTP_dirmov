
import { calculateTotalEjesSistema, calculateTotalCriteriosEje, calculateTotalUnicoCriterio } from "../lib/calculosTest"; 
import { SystemData } from "../lib/definitions";

interface EvaluacionTestProps {
  systemData: SystemData;
}

export default function EvaluacionTest({ systemData }: EvaluacionTestProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Resultados del Test</h1>

      {systemData.axes.map((axis) => (
        <div key={axis.axis_id} className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">{axis.name}</h2>

          {axis.criteria.map((criteria) => (
            <div key={criteria.criteria_id} className="mb-4">
              <h3 className="text-xl text-black">{criteria.name}: {calculateTotalUnicoCriterio(criteria)}</h3>
            </div>
          ))}

          <h3 className="text-xl text-black mt-4">Total del eje: {calculateTotalCriteriosEje(axis)}</h3>
        </div>
      ))}

      <h2 className="text-2xl font-bold text-black mt-8">
        Total del sistema: {calculateTotalEjesSistema(systemData)}
      </h2>
    </div>
  );
}
