import styles from './App.module.scss';
import { Navbar } from './components/Navbar/Navbar.tsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
}

export default App;
