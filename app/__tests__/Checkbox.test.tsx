import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../components/ui/Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <Checkbox label="Paid" checked={false} onChange={() => {}} />
    );
    expect(getByText('Paid')).toBeInTheDocument();
  });
  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Checkbox label="Paid" checked={false} onChange={handleChange} />
    );
    fireEvent.click(getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });
  it('shows tick when checked', () => {
    const { container } = render(
      <Checkbox label="Paid" checked={true} onChange={() => {}} />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
