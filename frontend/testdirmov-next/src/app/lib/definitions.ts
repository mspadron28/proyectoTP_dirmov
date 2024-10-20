// INTERFACES test/page.tsx
export interface Option {
    option_id: string;
    description: string;
    option_type: string;
    score: number;
  }
  
  export interface QuestionOption {
    question_id: string;
    option_id: string;
    options: Option;
  }
  
  export interface Question {
    question_id: string;
    description: string;
    question_options: QuestionOption[];
    selected_option: Option | null; 
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
    system_id: string;
    name: string;
    axes: Axis[];
  }