import { render, fireEvent } from '@testing-library/react';
import SortDropdown from '../components/ui/SortDropdown';

describe('SortDropdown', () => {
  it('renders with default value', () => {
    const { getByText } = render(
      <SortDropdown value="featured" onChange={() => {}} />
    );
    expect(getByText('Featured')).toBeInTheDocument();
  });
  it('shows options when clicked', () => {
    const { getByText } = render(
      <SortDropdown value="featured" onChange={() => {}} />
    );
    fireEvent.click(getByText('Featured'));
    expect(getByText('Newest')).toBeInTheDocument();
    expect(getByText('Higher Price')).toBeInTheDocument();
    expect(getByText('Lower Price')).toBeInTheDocument();
  });
  it('calls onChange when option selected', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <SortDropdown value="featured" onChange={handleChange} />
    );
    fireEvent.click(getByText('Featured'));
    fireEvent.click(getByText('Newest'));
    expect(handleChange).toHaveBeenCalledWith('newest');
  });
});
