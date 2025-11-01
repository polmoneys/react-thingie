import type { StatefulHasProps } from './interfaces';

import styles from './index.module.css';

/*
  <StatefulHas id="" name="" onCheck={<Shape.Square />}>
      <Shape.Triangle />
  </StatefulHas>
*/

export default function StatefulHas({
    id,
    defaultChecked = false,
    name,
    children,
    onCheck,
}: StatefulHasProps) {
    return (
        <div className={styles.wrapper}>
            <input
                id={id}
                name={name}
                type="checkbox"
                defaultChecked={defaultChecked}
                className={styles.input}
                aria-label="toggle"
            />

            <label htmlFor={id} className={styles.label}>
                <span className={styles.slotInitial} aria-hidden={false}>
                    {children}
                </span>
                <span className={styles.slotChecked} aria-hidden={true}>
                    {onCheck}
                </span>
            </label>
        </div>
    );
}
