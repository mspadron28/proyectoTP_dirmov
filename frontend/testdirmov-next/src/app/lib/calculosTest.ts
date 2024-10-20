// lib/calculosTest.ts

export interface Option {
    option_id: string;
    score: number;
  }
  
  export interface Question {
    question_id: string;
    selected_option: Option | null; // La opción seleccionada
  }
  
  export interface Criteria {
    criteria_id: string;
    name: string;
    questions: Question[];
  }
  
  export interface Axis {
    axis_id: string;
    name: string;
    criteria: Criteria[];
  }
  
  export interface SystemData {
    axes: Axis[];
  }
  
  // Función para calcular el TotalUnicoCriterio
  export const calculateTotalUnicoCriterio = (criteria: Criteria): number => {
    return criteria.questions.reduce((total, question) => {
      return total + (question.selected_option ? question.selected_option.score : 0);
    }, 0);
  };
  
  // Función para calcular el TotalCriteriosEje
  export const calculateTotalCriteriosEje = (axis: Axis): number => {
    return axis.criteria.reduce((total, criteria) => {
      return total + calculateTotalUnicoCriterio(criteria);
    }, 0);
  };
  
  // Función para calcular el TotalEjesSistema
  export const calculateTotalEjesSistema = (systemData: SystemData): number => {
    return systemData.axes.reduce((total, axis) => {
      return total + calculateTotalCriteriosEje(axis);
    }, 0);
  };
  