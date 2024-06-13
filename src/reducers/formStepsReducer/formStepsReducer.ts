import { TFormPages } from '../../types/TPages.ts';
import { IFormStep } from '../../types/formTypes.ts';
import { initialFormSteps } from '../../constants/formConstants.ts';

export interface IFormStepsState {
  steps: IFormStep[];
}

type FormStepsAction = { type: 'COMPLETE_STEP'; id: TFormPages } | { type: 'RESTART_STEP'; id: TFormPages };

export const formStepsInitialState: IFormStepsState = {
  steps: initialFormSteps,
};

export const formStepsReducer = (state: IFormStepsState, action: FormStepsAction): IFormStepsState => {
  switch (action.type) {
    case 'COMPLETE_STEP': {
      const updatedSteps = state.steps.map(step => (step.id === action.id ? { ...step, complete: true } : step));
      return {
        ...state,
        steps: updatedSteps,
      };
    }
    case 'RESTART_STEP': {
      const updatedSteps = state.steps.map(step => (step.id === action.id ? { ...step, complete: false } : step));
      return {
        ...state,
        steps: updatedSteps,
      };
    }
    default:
      return state;
  }
};
