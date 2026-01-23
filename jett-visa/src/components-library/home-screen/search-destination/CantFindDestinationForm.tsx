// import { useCountry } from '@/utility/hooks/useCountry';
// import type { Country } from '@/utility/types/country/Country';
// import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import searchIcon from '@/assets/images/icons/search.png';
// import MobileBottomDrawer from '@components/core-module/custom-drawer/MobileBottomDrawer';
// import DestinationListItem from '@/components/core-module/destination-list/DestinationListItem';
import { useTranslation } from 'react-i18next';

// import { useFormik } from "formik";
// import * as Yup from "yup";

// Define types locally
interface Country {
  isoCode?: string;
  name?: string;
  residency?: string;
}

// Static test data - will be replaced with API integration later
const staticCountries: Country[] = [
  { isoCode: 'US', name: 'United States', residency: 'United States' },
  { isoCode: 'GB', name: 'United Kingdom', residency: 'United Kingdom' },
  { isoCode: 'DE', name: 'Germany', residency: 'Germany' },
  { isoCode: 'FR', name: 'France', residency: 'France' },
  { isoCode: 'IT', name: 'Italy', residency: 'Italy' },
  { isoCode: 'ES', name: 'Spain', residency: 'Spain' },
  { isoCode: 'JP', name: 'Japan', residency: 'Japan' },
  { isoCode: 'AU', name: 'Australia', residency: 'Australia' },
  { isoCode: 'CA', name: 'Canada', residency: 'Canada' },
  { isoCode: 'IN', name: 'India', residency: 'India' },
  { isoCode: 'AE', name: 'United Arab Emirates', residency: 'United Arab Emirates' },
  { isoCode: 'SG', name: 'Singapore', residency: 'Singapore' },
];

interface CantFindDestinationFormProps {
  searchTerm: string;
  onClose?: () => void;
}

const CantFindDestinationForm: React.FC<CantFindDestinationFormProps> = ({
  searchTerm,
  onClose,
}) => {
  const { t } = useTranslation();
  // const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [allCountries, setAllCountries] = useState<Country[]>(staticCountries);

  // const { refetchCountryList: fetchCountryList, countryListData } = useCountry();
  // Using static data for testing - replace with API hook when ready
  const countryListData = { response: staticCountries };

  // useEffect(() => {
  //   const callCountryListApi = async () => {
  //     if (!countryListData) await fetchCountryList();
  //   };
  //   callCountryListApi();
  // }, []);

  useEffect(() => {
    const allCountries = countryListData?.response ?? [];
    setAllCountries(allCountries);
  }, [countryListData]);

  /** ---------------------- Form State (replacing Formik + Yup) ---------------------- */
  const [formValues, setFormValues] = useState({
    search: searchTerm,
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<{ email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; message?: boolean }>({});

  const validateEmail = (email: string): string | undefined => {
    if (!email) return undefined; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (message.length > 500) {
      return "Maximum 500 characters";
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Validate on change
    if (name === 'email') {
      setFormErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (name === 'message') {
      setFormErrors(prev => ({ ...prev, message: validateMessage(value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields
    const emailError = validateEmail(formValues.email);
    const messageError = validateMessage(formValues.message);
    setFormErrors({ email: emailError, message: messageError });
    setTouched({ email: true, message: true });

    if (emailError || messageError || !selectedCountry) {
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple alert instead of snackbar - replace with snackbar when notistack is available
      alert("Thanks. We received your request.");
      // enqueueSnackbar("Thanks. We received your request.", {
      //   variant: "success",
      //   autoHideDuration: 2000,
      //   anchorOrigin: { vertical: "top", horizontal: "center" },
      // });
    } catch {
      alert("Something went wrong. Please try again.");
      // enqueueSnackbar("Something went wrong. Please try again.", {
      //   variant: 'error',
      //   autoHideDuration: 2000,
      //   anchorOrigin: { vertical: 'top', horizontal: 'center' },
      // });
    } finally {
      setLoading(false);
      onClose?.();
    }
  };

  // Convert StaticImageData to string for img src
  const searchIconSrc = typeof searchIcon === 'string' ? searchIcon : (searchIcon as any)?.src || searchIcon;

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 rounded-lg bg-white max-w-md max-h-full overflow-y-auto">
        <h3 className="text-center font-medium text-lg mb-2">{t("request_new_destination")}</h3>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-[#00366B] block mb-1">{t("destination")}</label>
            <div onClick={() => setDrawerOpen(true)} className="flex items-center justify-between rounded-lg border border-[#F2F2F8] px-3 py-2 cursor-pointer">
              <div className={`${formValues.search ? 'text-[#3F6B96]' : 'text-[#9E9E9E]'}`}>{formValues.search || 'Select destination'}</div>
              <img src={searchIconSrc} width={14} height={14} alt="searchIcon" />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#00366B] block mb-1">{t("email_optional")}</label>
            <input
              name="email"
              value={formValues.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              placeholder={t("enter_your_email_to_be_notified")}
              className="w-full rounded-lg border border-[#F2F2F8] px-3 py-2"
            />
            {touched.email && formErrors.email && (
              <div className="text-red-600 text-xs mt-1">{formErrors.email}</div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-[#00366B]">{t("message_optional")}</label>
              <div className="text-xs">{formValues.message.length}/500</div>
            </div>
            <textarea
              name="message"
              value={formValues.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("tell_us_more")}
              maxLength={500}
              rows={2}
              className="w-full rounded-lg border border-[#F2F2F8] px-3 py-2"
            />
            {touched.message && formErrors.message && (
              <div className="text-red-600 text-xs mt-1">{formErrors.message}</div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || !selectedCountry || !!formErrors.email || !!formErrors.message} 
          className="mt-2 mb-2 bg-[#0080FF] text-white rounded-lg py-3 font-semibold disabled:opacity-60"
        >
          {loading ? '...' : t("send_request")}
        </button>
      </form>

      {/* Simple drawer replacement - replace with MobileBottomDrawer when component is available */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" onClick={() => setDrawerOpen(false)}>
          <div className="bg-white w-full max-h-[70vh] rounded-t-lg p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-center font-medium text-base flex-1">{t("select_destination")}</h4>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-500">✕</button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {allCountries?.map((country) => (
                <div
                  key={country?.isoCode}
                  onClick={() => {
                    setSelectedCountry(country);
                    setFormValues(prev => ({
                      ...prev,
                      search: country?.residency || country?.name || ""
                    }));
                    setDrawerOpen(false);
                  }}
                  className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                >
                  <div className="font-medium text-[#00366B]">{country?.residency || country?.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CantFindDestinationForm;
