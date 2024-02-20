import { FC } from 'react';
import useAppContext from '../../context/useAppContext.tsx';
import Button from '../../components/Button/Button.tsx';
import { IFormData } from '../../types/formTypes.ts';
import { convertToImageString } from '../../utils/convertToImageString.ts';
import { ResumeForm } from '../../features/ResumeForm/ResumeForm.tsx';
import style from './FormPAge.module.scss';
import FileInput from '../../components/Input/FileInput.tsx';

export const FormPage: FC = () => {
  const { loadSavedFormData, formData } = useAppContext();
  const handleSave = async () => {
    const { interests, photoLink, ...rest } = formData;
    const photo = await convertToImageString(photoLink.photo);
    const normalizedFormData = {
      ...rest,
      photoLink: { photo, crop: photoLink.crop },
      interests: await Promise.all(
        interests.map(async interest => ({
          ...interest,
          icon: await convertToImageString(interest.icon, { size: { width: 60, height: 60 } }),
        }))
      ),
    };
    const jsonFormData = JSON.stringify(normalizedFormData);
    const blobFormData = new Blob([jsonFormData], { type: 'application/json' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blobFormData);
    downloadLink.download = `Resume Form ${formData.userName}`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(downloadLink.href);
  };

  const handleLoad = (file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const data = JSON.parse(e.target?.result as string) as IFormData;
          loadSavedFormData({ ...data });
        } catch (error) {
          console.error('Error when loading a form file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <section className={style.FormPage}>
      <section className={style.FormPage_title}>
        <h2>Create your own resume</h2>
        <Button onClick={handleSave}>Save as JSON</Button>
        <FileInput
          handleFileUpload={handleLoad}
          type="file"
          accept="application/json"
          fileLabel="Fill Form From Save"
        />
      </section>
      <ResumeForm />
    </section>
  );
};
