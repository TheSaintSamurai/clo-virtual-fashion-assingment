import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.image} />
      <div className={styles.title} />
      <div className={styles.meta} />
    </div>
  );
};

export default SkeletonCard;
