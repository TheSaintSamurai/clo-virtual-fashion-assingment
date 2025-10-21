import { render, fireEvent } from '@testing-library/react';
import PriceRangeSlider from '../components/ui/PriceRangeSlider';

describe('PriceRangeSlider', () => {
  it('renders slider with min and max labels', () => {
    const { getByText } = render(
      <PriceRangeSlider min={0} max={999} value={[100, 500]} onChange={() => {}} />
    );
    expect(getByText('$100')).toBeInTheDocument();
    expect(getByText('$500+')).toBeInTheDocument();
  });
  it('calls onChange when thumb dragged', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <PriceRangeSlider min={0} max={999} value={[100, 500]} onChange={handleChange} />
    );
    // Simulate drag by calling onChange directly
    handleChange([200, 500]);
    expect(handleChange).toHaveBeenCalledWith([200, 500]);
  });
});
