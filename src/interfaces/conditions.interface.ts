export interface IConditionsProps {
  condition: string;
}

export interface ISymptomCardProps {
  symptom: string;
}

export interface SymptonsContextData {
  setSymptom(symptoms: ISymptomCardProps[]): Promise<boolean>;
  searchSymptom(search?: string): Promise<ISymptomCardProps[]>;
}

export interface SymptomProviderProps {
  children: React.ReactNode;
}

export enum ConditionTypes {
  SPECIAL_CONDITION = 'specialCondition',
  COMORBITY = 'comorbity',
  SYMPTOM = 'symptom'
}