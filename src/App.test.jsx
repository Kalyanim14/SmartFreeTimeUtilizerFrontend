import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppContent } from './App';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

// Mock RequireAuth - Simply render children
vi.mock('./components/authentication/RequireAuth', () => ({
    default: ({ children }) => <>{children}</>
}));

// Mock SignIn - Adjusted to match your actual component props
vi.mock('./components/SignIn', () => ({
    default: ({ onSwitch, setIsLoggedIn }) => (
        <div data-testid="signin-page">
            <h1>Sign In</h1>
            <button onClick={onSwitch}>Go to Signup</button>
            <button
                onClick={() => {
                    localStorage.setItem('username', 'testuser');
                    // Setting this to true triggers the Navigate in AppContent
                    setIsLoggedIn(true);
                }}
            >
                Login
            </button>
        </div>
    )
}));

// Mock SignUp
vi.mock('./components/SignUp', () => ({
    default: ({ onSwitch }) => (
        <div data-testid="signup-page">
            <h1>Sign Up</h1>
            <button onClick={onSwitch}>Go to Signin</button>
        </div>
    )
}));

// Mock TimeUtilizer - The target of our login redirect
vi.mock('./components/TimeUtilizer', () => ({
    default: () => <div data-testid="TimeUtilizer">Time Utilizer Content</div>
}));

// Mock History
vi.mock('./components/History', () => ({
    default: () => <div data-testid="history-page">History</div>
}));

describe('App Component', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    const renderWithRouter = (ui, { initialEntries = ['/'] } = {}) =>
        render(
            <MemoryRouter initialEntries={initialEntries}>
                {ui}
            </MemoryRouter>
        );

    it('redirects to signin by default when not logged in', async () => {
        renderWithRouter(<AppContent />);
        // By default / redirects to /signin
        expect(await screen.findByTestId('signin-page')).toBeInTheDocument();
    });

    it('navigates to signup from signin', async () => {
        renderWithRouter(<AppContent />, { initialEntries: ['/signin'] });
        const signupBtn = await screen.findByRole('button', { name: /go to signup/i });
        fireEvent.click(signupBtn);
        expect(await screen.findByTestId('signup-page')).toBeInTheDocument();
    });

    it('navigates back to signin from signup', async () => {
        renderWithRouter(<AppContent />, { initialEntries: ['/signup'] });
        const signinBtn = await screen.findByRole('button', { name: /go to signin/i });
        fireEvent.click(signinBtn);
        expect(await screen.findByTestId('signin-page')).toBeInTheDocument();
    });

    it('logs in and redirects to TimeUtilizer', async () => {
        // Start at root
        renderWithRouter(<AppContent />, { initialEntries: ['/'] });

        // Wait for signin page to appear (initial redirect)
        const loginBtn = await screen.findByRole('button', { name: /login/i });

        // Trigger login
        fireEvent.click(loginBtn);

        // 1. The click updates state 'isLoggedIn' to true
        // 2. AppContent re-renders
        // 3. The <Navigate to="/timeutilizer" /> is triggered
        // 4. TimeUtilizer is rendered
        
        // We use a findBy with a slightly longer timeout for the redirect to settle
        const dashboard = await screen.findByTestId('TimeUtilizer', {}, { timeout: 2000 });
        expect(dashboard).toBeInTheDocument();
    });

    it('stays logged in on refresh (localStorage check)', async () => {
        // Mock the user being already in storage
        localStorage.setItem('username', 'testuser');
        
        renderWithRouter(<AppContent />, { initialEntries: ['/'] });
        
        // Since username exists, the root path '/' should immediately 
        // redirect to '/timeutilizer'
        expect(await screen.findByTestId('TimeUtilizer')).toBeInTheDocument();
    });
});

//use command `npm run test` to run these test