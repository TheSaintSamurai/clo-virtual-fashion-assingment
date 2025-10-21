import { render } from '@testing-library/react';
import SkeletonCard from '../components/common/SkeletonCard';

describe('SkeletonCard', () => {
  it('renders skeleton elements', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector('.' + 'skeletonCard')).toBeInTheDocument();
    expect(container.querySelector('.' + 'image')).toBeInTheDocument();
    expect(container.querySelector('.' + 'title')).toBeInTheDocument();
    expect(container.querySelector('.' + 'meta')).toBeInTheDocument();
  });
});
