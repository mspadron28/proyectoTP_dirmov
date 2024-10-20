import {
  calculateTotalEjesSistema,
  calculateTotalCriteriosEje,
  calculateTotalUnicoCriterio,
  calculateTotalSistemas,
} from "../lib/calculosTest";
import { SystemData } from "../lib/definitions";

interface EvaluacionTestProps {
  systemsData: SystemData[];
}

export default function EvaluacionTest({ systemsData }: EvaluacionTestProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-black mb-8">
        Resultados del Test
      </h1>

      {systemsData.map((system) => (
        <div key={system.system_id}>
          <h2 className="text-2xl font-bold text-black mb-4">
            Sistema: {system.name}
          </h2>

          {system.axes.map((axis) => (
            <div key={axis.axis_id} className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                {axis.name}
              </h2>

              {axis.criteria.map((criteria) => (
                <div key={criteria.criteria_id} className="mb-4">
                  <h3 className="text-xl text-black">
                    {criteria.name}: {calculateTotalUnicoCriterio(criteria)}
                  </h3>
                </div>
              ))}

              <h3 className="text-xl text-black mt-4">
                Total del eje: {calculateTotalCriteriosEje(axis)}
              </h3>
            </div>
          ))}

          <h2 className="text-2xl font-bold text-black mt-8">
            Total del sistema: {calculateTotalEjesSistema(system)}
          </h2>
        </div>
      ))}

      {/* Total acumulado de todos los sistemas */}
      <h2 className="text-3xl font-bold text-black mt-12">
        Total acumulado de los sistemas: {calculateTotalSistemas(systemsData)}
      </h2>
    </div>
  );
}
