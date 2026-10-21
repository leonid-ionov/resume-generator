import { FC, PropsWithChildren, useRef } from 'react';
import styles from './Accordion.module.scss';

interface IAccordionProps extends PropsWithChildren {
  title: string;
}

export const Accordion: FC<IAccordionProps> = ({ title, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    if (containerRef.current) {
      containerRef.current.classList.toggle(styles.expanded);
    }
  };

  return (
    <section ref={containerRef} className={styles.container}>
      <p className={styles.title} onClick={toggleExpanded}>
        {title}
      </p>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
