import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortDropdown from '../components/ui/SortDropdown';

describe('SortDropdown', () => {
  it('renders with default value', () => {
    const { getByText } = render(
      <SortDropdown value="name" onChange={() => {}} />
    );
    expect(getByText('Item Name')).toBeInTheDocument();
  });
  it('shows options when clicked', () => {
    const { getByText, getAllByText } = render(
      <SortDropdown value="name" onChange={() => {}} />
    );
    fireEvent.click(getByText('Item Name'));
    expect(getByText('Higher Price')).toBeInTheDocument();
    expect(getByText('Lower Price')).toBeInTheDocument();
    expect(getAllByText('Item Name').length).toBeGreaterThan(1);
  });
  it('calls onChange when option selected', () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <SortDropdown value="name" onChange={handleChange} />
    );
    fireEvent.click(getByText('Item Name'));
    fireEvent.click(getByText('Higher Price'));
    expect(handleChange).toHaveBeenCalledWith('higher');
  });
});
