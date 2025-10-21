import { render } from '@testing-library/react';
import ContentCard from '../components/common/ContentCard';

describe('ContentCard', () => {
  it('renders content card with props', () => {
    const { getByText, getByAltText } = render(
      <ContentCard
        id="1"
        imagePath="/test.jpg"
        creator="Test Creator"
        title="Test Title"
        pricingOption={0}
        price={99.99}
      />
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Creator')).toBeInTheDocument();
    expect(getByText('$99.99')).toBeInTheDocument();
    expect(getByAltText('Test Title')).toBeInTheDocument();
  });
  it('shows Free for pricingOption 1', () => {
    const { getByText } = render(
      <ContentCard
        id="2"
        imagePath="/test.jpg"
        creator="Test Creator"
        title="Test Title"
        pricingOption={1}
        price={0}
      />
    );
    expect(getByText('Free')).toBeInTheDocument();
  });
  it('shows View Only for pricingOption 2', () => {
    const { getByText } = render(
      <ContentCard
        id="3"
        imagePath="/test.jpg"
        creator="Test Creator"
        title="Test Title"
        pricingOption={2}
        price={0}
      />
    );
    expect(getByText('View Only')).toBeInTheDocument();
  });
});
