import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { describe, it, expect } from '@jest/globals';

describe('Sidebar', () => {
  it('renders login message when user is not logged in', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ user: null }}>
        <Sidebar />
      </AuthContext.Provider>
    );

    expect(getByText('PLEASE LOG IN TO ACCESS COMMON LINKS')).toBeInTheDocument();
  });

  it('renders common links when user is logged in', () => {
    const mockUser = { id: '1', accessToken: 'token' };
    const { getByText } = render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <Sidebar />
      </AuthContext.Provider>
    );

    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Linkedin')).toBeInTheDocument();
    expect(getByText('Website')).toBeInTheDocument();
    expect(getByText('Github')).toBeInTheDocument();
  });

  // Add more tests for editing functionality, copying links, etc.
});