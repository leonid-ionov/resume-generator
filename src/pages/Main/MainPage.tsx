import { FC } from 'react';
import { TPages } from '../../types/TPages.ts';
import useAppContext from '../../context/useAppContext.tsx';

export const MainPage: FC = () => {
  const { navigate } = useAppContext();
  return (
    <section>
      <div>MainPage</div>
      <button onClick={() => navigate(TPages.PREVIEW)}>to preview</button>
    </section>
  );
};
