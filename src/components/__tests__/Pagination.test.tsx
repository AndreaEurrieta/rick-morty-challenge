import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../pagination/Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders current page with aria-current', () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getByRole('button', { name: /ir a página 3/i })).toHaveAttribute('aria-current', 'page');
  });

  it('calls onPageChange when clicking a page number', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /ir a página 2/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getByRole('button', { name: /página anterior/i })).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={10} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getByRole('button', { name: /página siguiente/i })).toBeDisabled();
  });

  it('enables both buttons when in middle pages', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getByRole('button', { name: /página anterior/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /página siguiente/i })).not.toBeDisabled();
  });

  it('navigates to previous page when clicking previous button', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /página anterior/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('navigates to next page when clicking next button', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: /página siguiente/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(6);
  });

  it('shows all pages when total pages is 5 or less', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole('button', { name: `Ir a página ${i}` })).toBeInTheDocument();
    }
  });

  it('shows ellipsis for large page counts', () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={mockOnPageChange} />);

    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });

  it('has proper navigation aria-label', () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);

    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
  });

  it('shows loading state with aria-busy and opacity', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} loading={true} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-busy', 'true');
    expect(nav).toHaveClass('opacity-50');
  });

  it('disables all buttons when loading', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} loading={true} />);

    expect(screen.getByRole('button', { name: /página anterior/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /página siguiente/i })).toBeDisabled();
  });
});
