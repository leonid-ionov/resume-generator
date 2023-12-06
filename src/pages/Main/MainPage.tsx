import { FC, useContext } from 'react';
import { TPages } from '../../types/TPages.ts';
import { AppContext } from '../../context/AppContext.tsx';

export const MainPage: FC = () => {
  const appContext = useContext(AppContext);
  return (
    <section>
      <div>MainPage</div>
      <button onClick={() => appContext.navigate(TPages.PREVIEW)}>to preview</button>
    </section>
  );
};
