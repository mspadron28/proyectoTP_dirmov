"use client";

import { useEffect, useState } from "react";
import EvaluacionTest from "../ui/EvaluacionTest";

import { Option, SystemData } from "../lib/definitions";

export default function TestPage() {
  const [systemData, setSystemData] = useState<SystemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [systemId, setSystemId] = useState(1);
  const [evaluating, setEvaluating] = useState(false); // Estado para controlar si estamos en modo evaluación

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/systems/${systemId}`
        );
        const data = await response.json();
        setSystemData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test data:", error);
        setLoading(false);
      }
    };

    fetchTestData();
  }, [systemId]);

  // Función para manejar la selección de una opción de respuesta
  const handleOptionSelect = (question_id: string, selectedOption: Option) => {
    if (!systemData) return;

    const updatedSystemData = { ...systemData };
    updatedSystemData.axes.forEach((axis) => {
      axis.criteria.forEach((criteria) => {
        criteria.questions.forEach((question) => {
          if (question.question_id === question_id) {
            question.selected_option = selectedOption;
          }
        });
      });
    });

    setSystemData(updatedSystemData); // Actualiza el estado con las respuestas seleccionadas
  };

  // Función para verificar si todas las preguntas están respondidas
  const areAllQuestionsAnswered = (): boolean => {
    if (!systemData) return false;

    for (const axis of systemData.axes) {
      for (const criteria of axis.criteria) {
        for (const question of criteria.questions) {
          if (!question.selected_option) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // Función para manejar la evaluación
  const handleEvaluation = () => {
    if (areAllQuestionsAnswered()) {
      setEvaluating(true); // Cambia el estado para mostrar la evaluación
    } else {
      alert("Por favor, responde todas las preguntas antes de evaluar.");
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!systemData) {
    return (
      <div className="text-center text-red-600">
        Error al cargar los datos del test
      </div>
    );
  }

  // Si el estado `evaluating` está activado, mostramos el componente de evaluación
  if (evaluating) {
    return <EvaluacionTest systemData={systemData} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-black text-center mb-8">
          {systemData.name}
        </h1>

        {systemData.axes.map((axis) => (
          <div key={axis.axis_id} className="mb-12">
            <h2 className="text-2xl font-semibold text-black mb-6 text-center">
              {axis.name}
            </h2>

            {axis.criteria.map((criteria) => (
              <div
                key={criteria.criteria_id}
                className="p-6 mb-8 rounded-lg shadow-md bg-[#4c8c74] bg-opacity-20"
              >
                <h3 className="text-xl font-semibold text-black mb-4 text-center">
                  {criteria.name}
                </h3>

                {criteria.questions.map((question) => (
                  <div
                    key={question.question_id}
                    className="mb-6 bg-white p-4 rounded-lg shadow"
                  >
                    <p className="text-lg text-black mb-4 font-medium text-center">
                      {question.description}
                    </p>

                    <div className="space-y-4 flex flex-col items-start">
                      {question.question_options
                        .slice()
                        .sort((a, b) =>
                          b.options.option_id.localeCompare(a.options.option_id)
                        ) // Ordena por option_id de mayor a menor
                        .map((qOption) => (
                          <label
                            key={qOption.option_id}
                            className="w-full flex items-center bg-[#4c8c74] bg-opacity-30 p-3 rounded-lg hover:bg-opacity-40 transition"
                          >
                            <input
                              type="radio"
                              name={`question_${question.question_id}`}
                              value={qOption.options.option_id}
                              className="mr-3 accent-black"
                              onChange={() =>
                                handleOptionSelect(
                                  question.question_id,
                                  qOption.options
                                )
                              }
                            />
                            <span className="text-black">
                              {qOption.options.description}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={handleEvaluation}
            disabled={!areAllQuestionsAnswered()} // Deshabilita el botón si no están todas las preguntas respondidas
            className={`px-6 py-3 text-white text-lg font-medium rounded-full transition-all 
            ${areAllQuestionsAnswered() ? 'bg-[#4c8c74] hover:bg-[#3b6f5b]' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Evaluar
          </button>
        </div>
      </div>
    </div>
  );
}
