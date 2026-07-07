import { ReactNode, Suspense } from 'react';
import styles from './App.module.scss';
import { Navbar } from './components/Navbar/Navbar.tsx';

interface AppProps {
  children: ReactNode;
}

function App({ children }: AppProps) {
  return (
    <div className={styles.App}>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <section className={styles.content}>{children}</section>
    </div>
  );
}

export default App;
