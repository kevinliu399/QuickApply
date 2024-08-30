import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar';

describe('ProgressBar', () => {
  it('renders correctly with all statuses', () => {
    const { getByText } = render(<ProgressBar status="Decision" />);
    
    expect(getByText('Watching')).toBeInTheDocument();
    expect(getByText('Applied')).toBeInTheDocument();
    expect(getByText('Interview')).toBeInTheDocument();
    expect(getByText('Decision')).toBeInTheDocument();
  });

  it('highlights correct steps based on status', () => {
    const { container } = render(<ProgressBar status="Interview" />);
    
    const activeSteps = container.querySelectorAll('.progress-indicator.active');
    expect(activeSteps).toHaveLength(3); // Watching, Applied, Interview
  });
});