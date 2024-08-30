import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginButton from '../components/LoginButton';

describe('LoginButton', () => {
  it('renders with correct label', () => {
    const { getByText } = render(<LoginButton label="Test Label" onClick={() => {}} />);
    
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<LoginButton label="Click Me" onClick={mockOnClick} />);
    
    fireEvent.click(getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});