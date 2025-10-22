import { render } from '@testing-library/react';
import SkeletonCard from '../components/common/SkeletonCard';
import styles from '../components/common/SkeletonCard.module.css';

describe('SkeletonCard', () => {
  it('renders skeleton elements', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector('.' + styles.skeletonCard)).toBeInTheDocument();
    expect(container.querySelector('.' + styles.image)).toBeInTheDocument();
    expect(container.querySelector('.' + styles.title)).toBeInTheDocument();
    expect(container.querySelector('.' + styles.meta)).toBeInTheDocument();
  });
});
