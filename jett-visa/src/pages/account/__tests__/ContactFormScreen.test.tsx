import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ContactFormScreen from '@/pages/account/ContactFormScreen';

// -------------------- Mocks --------------------

const mockNavigate = jest.fn();
const mockEnqueueSnackbar = jest.fn();

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', resolvedLanguage: 'en' },
  }),
}));

// Mock notistack
jest.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: mockEnqueueSnackbar,
  }),
}));

// Capture props passed to RequestCallbackForm
let latestRequestCallbackProps: any = null;

jest.mock('@/components/core-module/request-callback-form/RequestCallbackForm', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function MockRequestCallbackForm(props: any) {
    latestRequestCallbackProps = props;

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      props.onSubmit({
        fullName: 'John Doe',
        phoneNumber: '+911234567890',
        email: 'john@example.com',
        message: 'Need help',
        privacyAccepted: true,
        visaUpdates: true,
      });
    };

    return (
      <form id="request-callback-form" onSubmit={handleSubmit} data-testid="mock-request-callback-form">
        <button type="submit">internal-submit</button>
      </form>
    );
  };
});

describe('ContactFormScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    latestRequestCallbackProps = null;
  });

  const renderWithRouter = () =>
    render(
      <BrowserRouter>
        <ContactFormScreen />
      </BrowserRouter>
    );

  test('renders header and static text using translations', () => {
    renderWithRouter();

    expect(screen.getByText('contact_form_page_title')).toBeInTheDocument();
    expect(screen.getByText('contact_form_title')).toBeInTheDocument();
    expect(screen.getByText('contact_form_subtitle')).toBeInTheDocument();
  });

  test('calls navigate(-1) when back button is clicked', () => {
    renderWithRouter();

    const backButton = screen.getByAltText('back').closest('button');
    expect(backButton).toBeTruthy();
    fireEvent.click(backButton as Element);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('CTA button is disabled initially', () => {
    renderWithRouter();

    const ctaButton = screen.getByText('contact_form_request_call_back');
    expect(ctaButton).toBeDisabled();
  });

  test('enables CTA button when form is valid and privacy is accepted', async () => {
    renderWithRouter();

    // simulate validation changes - component will receive these via props
    latestRequestCallbackProps.onFormValuesChange({
      fullName: 'John Doe',
      phoneNumber: '+91',
      email: 'john@example.com',
      message: 'Need help',
      privacyAccepted: true,
      visaUpdates: false,
    });

    latestRequestCallbackProps.onValidationChange(
      true,
      {},
      {
        fullName: 'John Doe',
        phoneNumber: '+91',
        email: 'john@example.com',
        message: 'Need help',
        privacyAccepted: true,
        visaUpdates: false,
      }
    );

    const ctaButton = screen.getByText('contact_form_request_call_back');

    await waitFor(() => {
      expect(ctaButton).not.toBeDisabled();
    });
  });

  test('submits form and navigates back to Get Help on success', async () => {
    renderWithRouter();

    // Make form valid and privacy accepted
    latestRequestCallbackProps.onFormValuesChange({
      fullName: 'John Doe',
      phoneNumber: '+91',
      email: 'john@example.com',
      message: 'Need help',
      privacyAccepted: true,
      visaUpdates: false,
    });

    latestRequestCallbackProps.onValidationChange(
      true,
      {},
      {
        fullName: 'John Doe',
        phoneNumber: '+91',
        email: 'john@example.com',
        message: 'Need help',
        privacyAccepted: true,
        visaUpdates: false,
      }
    );

    // Directly invoke onSubmit from the mocked RequestCallbackForm
    await latestRequestCallbackProps.onSubmit({
      fullName: 'John Doe',
      phoneNumber: '+911234567890',
      email: 'john@example.com',
      message: 'Need help',
      privacyAccepted: true,
      visaUpdates: true,
    });

    await waitFor(() => {
      expect(mockEnqueueSnackbar).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/get-help');
    });
  });
});


