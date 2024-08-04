import { createEvent, createStore } from 'effector';
import { TFormPages } from '../types/TPages.ts';
import { initialFormSteps } from '../constants/formConstants.ts';

const completeStep = createEvent<TFormPages>();
const restartStep = createEvent<TFormPages>();

const $formSteps = createStore(initialFormSteps)
  .on(completeStep, (steps, id) => steps.map(step => (step.id === id ? { ...step, complete: true } : step)))
  .on(restartStep, (steps, id) => steps.map(step => (step.id === id ? { ...step, complete: false } : step)));

export default {
  stores: { $formSteps },
  events: { completeStep, restartStep },
};
