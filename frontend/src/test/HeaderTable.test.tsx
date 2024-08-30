import React from 'react';
import { render } from '@testing-library/react';
import HeaderTable from '../components/HeaderTable/HeaderTable';
import { describe, it, expect } from '@jest/globals';

describe('HeaderTable', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HeaderTable />);
    
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Company')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('Applied')).toBeInTheDocument();
  });
});