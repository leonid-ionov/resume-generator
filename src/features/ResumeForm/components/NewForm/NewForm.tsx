import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialFormData } from '../../../../constants/formConstants.ts';
import style from '../../../../pages/FormPage/FormPage.module.scss';
import { TFormPages, TPages } from '../../../../types/TPages.ts';
import loadData from '../../../../assets/images/loadData.png';
import formPreview from '../../../../assets/images/formPreview.png';
import { useFormContext } from 'react-hook-form';
import ChoiceSection from '../../../../components/ChoiceSection/ChoiceSection.tsx';
import { useUnit } from 'effector-react';
import formModel from '../../../../store/formModel.ts';

export const NewForm: FC = () => {
  const { reset } = useFormContext();
  const handleLoadFormData = useUnit(formModel.effects.loadFormDataFx);
  const navigate = useNavigate();
  const personalInfoFormPage = `/${TPages.FORM}/${TFormPages.PERSONAL}`;

  return (
    <section className={style.FormPage_title}>
      <h2>Let&apos;s get started</h2>
      <ChoiceSection
        firstChoice={{
          type: 'FileInput',
          onUpload: async file => {
            const formData = await handleLoadFormData(file);
            reset(formData);
            navigate(personalInfoFormPage);
          },
          accept: 'application/json',
          label: 'Load Form Data',
          image: loadData,
          descriptions: 'Load already existing form',
        }}
        secondChoice={{
          type: 'GraphicButton',
          onClick: () => {
            reset(initialFormData);
            navigate(personalInfoFormPage);
          },
          label: 'Create New',
          image: formPreview,
          descriptions: 'Start creating new ones from scratch',
        }}
      />
    </section>
  );
};
