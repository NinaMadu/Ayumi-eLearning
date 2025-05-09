import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../redux/userSlice';
import React from 'react';


function renderWithProviders(ui, { preloadedState = {}, store = configureStore({ reducer: { user: userReducer }, preloadedState }) } = {}) {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}

describe('Header Component', () => {
  it('renders logo and navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('shows login and signup buttons when user is not logged in', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });

  it('shows user avatar when logged in', () => {
    const mockUser = {
      currentUser: { email: 'user@example.com' }
    };
    renderWithProviders(<Header />, { preloadedState: { user: mockUser } });

    // Expect to find the avatar image or a user-related element
    const avatarImage = screen.getByAltText('User Avatar'); // Ensure 'User Avatar' matches your alt text
    expect(avatarImage).toBeInTheDocument(); // Check if the avatar is displayed
  });
});
