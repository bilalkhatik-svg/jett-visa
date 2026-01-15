import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import arrowLeft from '@/assets/images/arrow-left.png';
import RequestCallbackForm, {
  type RequestCallbackFormValues,
} from '@/components/core-module/request-callback-form/RequestCallbackForm';
import { theme } from '@/theme';
import { ROUTES } from '@/utility/constant';

const ContactFormScreen: React.FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Mock data for form fields - can be pre-filled from user data
  const mockFormValues: Partial<RequestCallbackFormValues> = {
    fullName: 'Harsh Chaudhari',
    phoneNumber: '+91',
    email: 'harsh@gmail.com',
    message: '',
    privacyAccepted: false,
    visaUpdates: false,
  };

  // Track privacy acceptance state for button enablement
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  // Track form validation state
  const [formIsValid, setFormIsValid] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});
  const [formValues, setFormValues] = useState<RequestCallbackFormValues>({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: '',
    privacyAccepted: false,
    visaUpdates: false,
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (values: RequestCallbackFormValues) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      enqueueSnackbar('Your request has been submitted successfully', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      navigate(ROUTES.GET_HELP);
    } catch (error) {
      enqueueSnackbar('Failed to submit your request. Please try again.', {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate button state
  const mandatoryFieldsFilled = 
    formValues.fullName.trim() !== "" &&
    formValues.phoneNumber.trim() !== "" &&
    formValues.email.trim() !== "" &&
    formValues.message.trim() !== "";

  const hasValidationErrors = Object.keys(formErrors).length > 0;

  const isButtonDisabled = 
    loading || 
    !formIsValid || 
    !privacyAccepted || 
    !mandatoryFieldsFilled ||
    hasValidationErrors;

  const shouldBeGrey = isButtonDisabled;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '375px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme?.palette?.customColors?.white?.[0] || '#FFFFFF',
          position: 'relative',
        }}
      >
        {/* Sticky Header */}
        <Box
          sx={{
            backgroundColor: theme?.palette?.customColors?.white[0],
            width: '315px',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingTop: '20px',
            paddingRight: '30px',
            paddingBottom: '0px',
            paddingLeft: '30px',
            boxSizing: 'border-box',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{
              padding: 0,
              width: '24px',
              height: '24px',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Box
              component="img"
              src={arrowLeft}
              alt="back"
              sx={{
                width: '24px',
                height: '24px',
              }}
            />
          </IconButton>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: '16px',
                color: theme?.palette?.customColors?.black?.[1] || '#00366B',
              }}
            >
              {t('contact_form_page_title')}
            </Typography>
          </Box>
        </Box>

        {/* Scrollable Content Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: '24px',
            paddingBottom: '2px',
            px: '30px',
            // Hide scrollbar for all browsers
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge (old)
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome, Safari, Opera, Edge (new)
            },
          }}
        >
          {/* Title and Subtitle Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              mb: '10px',
            }}
          >
            {/* Sub-heading */}
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 500,
                fontSize: '18px',
                color: theme?.palette?.customColors?.blue?.[26] || '#00366B',
                lineHeight: '1.2',
              }}
            >
              {t('contact_form_title')}
            </Typography>

            {/* Sub-text */}
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '12px',
                color: theme?.palette?.customColors?.blue?.[26] || '#00366B',
                lineHeight: '1.4',
              }}
            >
              {t('contact_form_subtitle')}
            </Typography>
          </Box>

          {/* Form Container */}
            <Box
              sx={{
                backgroundColor: theme?.palette?.customColors?.white?.[0] || "#FFFFFF",
                borderRadius: '14px',
                padding: '5px',
                boxSizing: 'border-box',
              }}
            >
            <RequestCallbackForm
              onSubmit={handleSubmit}
              loading={loading}
              initialValues={mockFormValues}
              hideSubmitButton
              onFormValuesChange={(values) => {
                setPrivacyAccepted(values.privacyAccepted);
              }}
              onValidationChange={(isValid, errors, values) => {
                setFormIsValid(isValid);
                setFormErrors(errors);
                setFormValues(values);
              }}
              uiOptions={{
                labelColor: theme?.palette?.customColors?.grey?.[36] || '#5C6A82', // label text
                phoneLabelColor: theme?.palette?.customColors?.grey?.[35] || '#5C6A82', // same as label
                checkboxLabelColor: theme?.palette?.customColors?.blue?.[26] || '#00366B',
                checkboxLinkColor: theme?.palette?.customColors?.blue?.[26] || '#00366B',
                checkboxCheckedBg: theme?.palette?.customColors?.blue?.[10] || '#0087FA',
                checkboxCheckColor: theme?.palette?.customColors?.white?.[0] || '#FFFFFF',
              }}
            />
          </Box>
        </Box>

        {/* Sticky Footer with CTA Button */}
        <Box
          sx={{
            backgroundColor: theme?.palette?.customColors?.white?.[0] || '#FFFFFF',
            width: '100%',
            padding: '20px 30px',
            boxSizing: 'border-box',
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.02)',
          }}
        >
          <Button
            type="button"
            variant="contained"
            disabled={isButtonDisabled}
            onClick={() => {
              const form = document.getElementById('request-callback-form') as HTMLFormElement;
              if (form) {
                form.requestSubmit();
              }
            }}
            sx={{
              width: '315px',
              height: '50px',
              backgroundColor: shouldBeGrey
                ? theme?.palette?.customColors?.grey?.[14] || '#BDBDBD'
                : theme?.palette?.customColors?.blue?.[10] || '#0087FA',
              borderRadius: '10px',
              padding: '0px 16px',
              boxShadow: shouldBeGrey ? 'none' : '0px -4px 0px 0px rgba(0, 0, 0, 0.25) inset',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              fontFamily: 'Poppins',
              color: theme?.palette?.customColors?.white?.[0] || '#FFFFFF',
              '&:disabled': {
                backgroundColor: theme?.palette?.customColors?.grey?.[14] || '#BDBDBD',
                color: theme?.palette?.customColors?.white?.[0] || '#FFFFFF',
                boxShadow: 'none',
              },
              '&:hover': {
                backgroundColor: shouldBeGrey
                  ? theme?.palette?.customColors?.grey?.[14] || '#BDBDBD'
                  : theme?.palette?.customColors?.blue?.[10] || '#0087FA',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('contact_form_request_call_back')
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactFormScreen;

