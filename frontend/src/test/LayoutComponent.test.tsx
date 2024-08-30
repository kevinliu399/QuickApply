import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LayoutComponent from '../components/LayoutComponent/LayoutComponent';
import { AuthContext } from '../context/AuthContext';
import { describe, it, expect } from '@jest/globals';

// Mock the child components
jest.mock('../components/Sidebar/Sidebar', () => () => <div data-testid="sidebar" />);
jest.mock('../components/MainGrid/Titlebar', () => () => <div data-testid="titlebar" />);
jest.mock('../components/MainGrid/HeaderTable', () => () => <div data-testid="header-table" />);
jest.mock('../components/MainGrid/ListingCardGrid', () => () => <div data-testid="listing-card-grid" />);

describe('LayoutComponent', () => {
  const mockUser = { username: 'testuser', accessToken: 'token' };
  const mockSetUser = jest.fn();

  it('renders correctly when user is logged in', () => {
    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <LayoutComponent />
      </AuthContext.Provider>
    );

    expect(getByTestId('sidebar')).toBeInTheDocument();
    expect(getByTestId('titlebar')).toBeInTheDocument();
    expect(getByTestId('header-table')).toBeInTheDocument();
    expect(getByTestId('listing-card-grid')).toBeInTheDocument();
    expect(getByText(/Logout testuser/)).toBeInTheDocument();
  });

  it('renders correctly when user is not logged in', () => {
    const { getByText, queryByTestId } = render(
      <AuthContext.Provider value={{ user: null, setUser: mockSetUser }}>
        <LayoutComponent />
      </AuthContext.Provider>
    );

    expect(getByText('Login')).toBeInTheDocument();
    expect(queryByTestId('header-table')).not.toBeInTheDocument();
    expect(queryByTestId('listing-card-grid')).not.toBeInTheDocument();
    expect(getByText('PLEASE LOG IN TO ADD JOB LISTINGS')).toBeInTheDocument();
  });

  // Add more tests for login/logout functionality and modal interactions
});