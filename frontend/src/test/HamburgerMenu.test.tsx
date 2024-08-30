import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HamburgerMenu from '../components/HamburgerMenu/HamburgerMenu';

describe('HamburgerMenu', () => {
  it('renders correctly', () => {
    const mockOnClick = jest.fn();
    const { getByLabelText } = render(<HamburgerMenu onClick={mockOnClick} />);
    
    expect(getByLabelText('menu')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    const { getByLabelText } = render(<HamburgerMenu onClick={mockOnClick} />);
    
    fireEvent.click(getByLabelText('menu'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});