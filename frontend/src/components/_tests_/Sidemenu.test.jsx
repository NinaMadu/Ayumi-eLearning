import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Sidemenu from '../Sidemenu';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../redux/userSlice';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';


function renderWithProviders(
  ui,
  { preloadedState = {}, store = configureStore({ reducer: { user: userReducer }, preloadedState }) } = {}
) {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

describe('Sidemenu Component', () => {
  // Test for rendering main menu items
  it('renders main menu items', () => {
    renderWithProviders(<Sidemenu />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });

  // Test for navigation to the correct path when a menu item is clicked
  it('navigates to correct path when a menu item is clicked', () => {
    const { container } = renderWithProviders(<Sidemenu />);
    const homeMenu = screen.getByText(/Home/i);
    fireEvent.click(homeMenu);

    // Assert that the current path is '/user/user-home'
    expect(window.location.pathname).toBe('/user/user-home');
  });

  // Test for sidebar toggle button functionality
  it('opens and closes the sidebar when toggle button is clicked', () => {
    const { container } = renderWithProviders(<Sidemenu />);
    const toggleButton = screen.getByRole('button'); // Assuming the toggle button is a clickable element
    fireEvent.click(toggleButton);
    
    // Check if sidebar is now closed (should have width 20)
    expect(container.firstChild).toHaveClass('w-20');
    
    fireEvent.click(toggleButton);
    
    // Check if sidebar is open again (should have width 48)
    expect(container.firstChild).toHaveClass('w-48');
  });

  // Test for showing logout modal when logout menu is clicked
  it('shows logout modal when logout menu is clicked', () => {
    renderWithProviders(<Sidemenu />);
    const logoutMenu = screen.getByText(/Logout/i);
    fireEvent.click(logoutMenu);
    
    // Assert that the logout modal is shown
    expect(screen.getByText(/Confirm Logout/i)).toBeInTheDocument();
  });

  // Test for handling logout confirmation correctly
  it('handles logout confirmation correctly', async () => {
    renderWithProviders(<Sidemenu />);
    const logoutMenu = screen.getByText(/Logout/i);
    fireEvent.click(logoutMenu);

    const confirmButton = screen.getByText(/Yes, Log out/i);
    fireEvent.click(confirmButton);

    // Assert the expected outcome after the logout action (e.g., user is redirected, state is updated)
    expect(window.location.pathname).toBe('/');
  });

  // Test for handling logout cancellation correctly
  it('handles logout cancellation correctly', () => {
    renderWithProviders(<Sidemenu />);
    const logoutMenu = screen.getByText(/Logout/i);
    fireEvent.click(logoutMenu);

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    // Assert the modal is not shown anymore
    expect(screen.queryByText(/Confirm Logout/i)).not.toBeInTheDocument();
  });
});
