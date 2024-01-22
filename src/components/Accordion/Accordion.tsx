import { FC, PropsWithChildren, useRef } from 'react';
import styles from './Accordion.module.scss';
import cn from 'classnames';

interface IAccordionProps extends PropsWithChildren {
  title: string;
  isExpanded?: boolean;
}

export const Accordion: FC<IAccordionProps> = ({ title, children, isExpanded }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    if (containerRef.current) {
      containerRef.current.classList.toggle(styles.expanded);
    }
  };

  return (
    <section ref={containerRef} className={cn(styles.container, { [styles.expanded]: !!isExpanded })}>
      <p className={styles.title} onClick={toggleExpanded}>
        {title}
      </p>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
