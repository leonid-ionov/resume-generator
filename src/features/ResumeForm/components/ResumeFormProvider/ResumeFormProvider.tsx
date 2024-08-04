import { FC, PropsWithChildren } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { IFormData } from '../../../../types/formTypes.ts';
import { useUnit } from 'effector-react';
import formModel from '../../../../store/formModel.ts';

export const ResumeFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const formData = useUnit(formModel.stores.$formData);
  const methods = useForm<IFormData>({
    defaultValues: formData,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
