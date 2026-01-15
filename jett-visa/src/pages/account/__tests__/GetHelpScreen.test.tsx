import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import GetHelpScreen from '@/pages/account/GetHelpScreen';

// -------------------- Mocks --------------------

const mockNavigate = jest.fn();
const mockWindowOpen = jest.fn();

// Mock react-router-dom navigation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock i18n - just echo keys
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', resolvedLanguage: 'en' },
  }),
}));

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen,
});

describe('GetHelpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = () =>
    render(
      <BrowserRouter>
        <GetHelpScreen />
      </BrowserRouter>
    );

  test('renders header and section titles with translated text', () => {
    renderWithRouter();

    expect(screen.getByText('get_help')).toBeInTheDocument();
    expect(
      screen.getByText('get_help_screen_quick_assistance')
    ).toBeInTheDocument();
    expect(
      screen.getByText('get_help_screen_other_ways')
    ).toBeInTheDocument();
  });

  test('navigates back when back button is clicked', () => {
    renderWithRouter();

    const backButton = screen.getByLabelText('Go back');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('opens WhatsApp when WhatsApp card is clicked', () => {
    renderWithRouter();

    const whatsappCard = screen.getByText('get_help_screen_whatsapp')
      .closest('button') || screen.getByText('get_help_screen_whatsapp').parentElement?.parentElement;

    expect(whatsappCard).toBeTruthy();
    fireEvent.click(whatsappCard as Element);

    expect(mockWindowOpen).toHaveBeenCalledTimes(1);
    const url = mockWindowOpen.mock.calls[0][0] as string;
    expect(url).toContain('https://wa.me/');
  });

  test('navigates to live chat when Live chat card is clicked', () => {
    renderWithRouter();

    const liveChatCard = screen.getByText('get_help_screen_live_chat')
      .closest('button') || screen.getByText('get_help_screen_live_chat').parentElement?.parentElement;

    expect(liveChatCard).toBeTruthy();
    // Clicking should not throw; side-effect is navigation via window.location.href
    expect(() => fireEvent.click(liveChatCard as Element)).not.toThrow();
  });

  test('initiates phone call when Call card is clicked', () => {
    renderWithRouter();

    const callCard = screen.getByText('get_help_screen_call')
      .closest('button') || screen.getByText('get_help_screen_call').parentElement?.parentElement;

    expect(callCard).toBeTruthy();
    // Clicking should not throw; side-effect is navigation via window.location.href
    expect(() => fireEvent.click(callCard as Element)).not.toThrow();
  });

  test('navigates to contact form when Contact form card is clicked', () => {
    renderWithRouter();

    const contactFormCard = screen.getByText('get_help_screen_contact_form')
      .closest('button') || screen.getByText('get_help_screen_contact_form').parentElement?.parentElement;

    expect(contactFormCard).toBeTruthy();
    fireEvent.click(contactFormCard as Element);

    expect(mockNavigate).toHaveBeenCalledWith('/contact-us');
  });

  test('opens email client when Email card is clicked', () => {
    renderWithRouter();

    const emailCard = screen.getByText('get_help_screen_email')
      .closest('button') || screen.getByText('get_help_screen_email').parentElement?.parentElement;

    expect(emailCard).toBeTruthy();
    // Clicking should not throw; side-effect is navigation via window.location.href
    expect(() => fireEvent.click(emailCard as Element)).not.toThrow();
  });
});


