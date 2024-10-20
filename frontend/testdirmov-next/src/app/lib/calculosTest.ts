// lib/calculosTest.ts
import { Criteria, Axis, SystemData } from "./definitions";

// Función para calcular el TotalUnicoCriterio
export const calculateTotalUnicoCriterio = (criteria: Criteria): number => {
  return criteria.questions.reduce((total, question) => {
    return (
      total + (question.selected_option ? question.selected_option.score : 0)
    );
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

// Función para calcular el TotalSistemas
export const calculateTotalSistemas = (systemsData: SystemData[]): number => {
  return systemsData.reduce((total, system) => {
    return total + calculateTotalEjesSistema(system);
  }, 0);
};
