import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/ui/SearchBar';

describe('SearchBar', () => {
  it('renders input and button', () => {
    const { getByPlaceholderText, getByRole } = render(
      <SearchBar onSearch={() => {}} />
    );
    expect(getByPlaceholderText(/Find the items/i)).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });
  it('calls onSearch on button click', () => {
    const handleSearch = jest.fn();
    const { getByRole, getByPlaceholderText } = render(
      <SearchBar onSearch={handleSearch} />
    );
    fireEvent.change(getByPlaceholderText(/Find the items/i), { target: { value: 'dress' } });
    fireEvent.click(getByRole('button'));
    expect(handleSearch).toHaveBeenCalledWith('dress');
  });
  it('calls onSearch on Enter key', () => {
    const handleSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={handleSearch} />
    );
    fireEvent.change(getByPlaceholderText(/Find the items/i), { target: { value: 'shoes' } });
    fireEvent.keyDown(getByPlaceholderText(/Find the items/i), { key: 'Enter' });
    expect(handleSearch).toHaveBeenCalledWith('shoes');
  });
});
