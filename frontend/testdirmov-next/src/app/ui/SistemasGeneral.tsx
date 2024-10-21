"use client";

import { useEffect, useState } from "react";
import EvaluacionTest from "../ui/EvaluacionTest";
import { Option, Question, SystemData } from "../lib/definitions";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function SistemasGeneral() {
  const [systemsData, setSystemsData] = useState<SystemData[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // Controla la página de preguntas actual
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const questionsPerPage = 10; // Define cuántas preguntas mostrar por página
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 5; i++) {
          promises.push(
            fetch(`http://localhost:3000/systems/${i}`).then((res) =>
              res.json()
            )
          );
        }

        const allSystemsData = await Promise.all(promises);
        const validSystemsData = allSystemsData.filter(
          (system) => system && system.axes
        );

        setSystemsData(validSystemsData);
        // Mostrar el objeto en la consola para entender su estructura
        console.log("SystemsData estrucutura:", validSystemsData);
        // Recopilar todas las preguntas de todos los sistemas
        const allQuestions: Question[] = [];
        validSystemsData.forEach((system: SystemData) => {
          system.axes.forEach((axis) => {
            axis.criteria.forEach((criteria) => {
              criteria.questions.forEach((question) => {
                allQuestions.push(question);
              });
            });
          });
        });

        // Barajar las preguntas
        const shuffledQuestions = shuffleArray(allQuestions);
        setQuestions(shuffledQuestions);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching test data:", error);
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  const handleOptionSelect = (question_id: string, selectedOption: Option) => {
    const updatedQuestions = [...questions];
    const questionIndex = updatedQuestions.findIndex(
      (question) => question.question_id === question_id
    );
    if (questionIndex !== -1) {
      updatedQuestions[questionIndex].selected_option = selectedOption;
      setQuestions(updatedQuestions);
    }
  };

  // Verifica si todas las preguntas actuales han sido respondidas
  const areCurrentQuestionsAnswered = (): boolean => {
    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = questions.slice(startIndex, endIndex);
    return currentQuestions.every((question) => question.selected_option);
  };

  // Manejador para avanzar a la siguiente página de preguntas
  const handleNextPage = () => {
    if (areCurrentQuestionsAnswered()) {
      setError("");
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0);
    } else {
      setError("Por favor, responde todas las preguntas antes de continuar.");
    }
  };

  const handleEvaluation = () => {
    if (questions.every((question) => question.selected_option)) {
      setEvaluating(true);
    } else {
      alert("Por favor, responde todas las preguntas antes de evaluar.");
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (evaluating) {
    return <EvaluacionTest systemsData={systemsData} />;
  }

  // Cálculo de las preguntas que se mostrarán en la página actual
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-3xl">
      {/* Mostrar preguntas actuales */}
      {currentQuestions.map((question) => (
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
              )
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
                      handleOptionSelect(question.question_id, qOption.options)
                    }
                    checked={
                      question.selected_option?.option_id ===
                      qOption.options.option_id
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
      {/* Mostrar mensaje de error si no ha respondido todas las preguntas */}
      {error && <div className="text-center text-red-600 mb-4">{error}</div>}
      <div className="text-center">
        {/* Botón de siguiente o evaluar dependiendo si es la última página */}
        {endIndex >= questions.length ? (
          <button
            onClick={handleEvaluation}
            className="px-6 py-3 text-white bg-[#4c8c74] hover:bg-[#3b6f5b] text-lg font-medium rounded-full transition-all"
          >
            Evaluar
          </button>
        ) : (
          <button
            onClick={handleNextPage}
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-500 text-lg font-medium rounded-full transition-all"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
