"use client";

import React from "react";
import { useRouter } from "next/navigation";
import WhatsAppIcon from "@/assets/images/icons/whatsappIcon.png";
import ForumIcon from "@/assets/images/icons/formIcon.png";
import CallIcon from "@/assets/images/icons/phoneCallIcon.png";
import MessageIcon from "@/assets/images/icons/messageIcon.png";
import MailIcon from "@/assets/images/icons/gmailIcon.png";
import ArrowBackIcon from "@/assets/images/arrow-left.png";
import { useTranslation } from "react-i18next";

type SupportItem = {
  id: string;
  title: string;
  subtitle: string;
  bg: string;
  iconBg: string;
  icon: any; // StaticImageData or string
  iconWidth?: number | string;
  iconHeight?: number | string;
};

const PAGE_MAX_WIDTH = 375;

const GetHelpScreen: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  // Helper function to get image source
  const getImageSrc = (img: any): string => {
    return typeof img === 'string' ? img : (img as any)?.src || img;
  };

  const getQuickAssistOptions = (): SupportItem[] => [
    {
      id: "whatsapp",
      title: t('get_help_screen_whatsapp'),
      subtitle: t('get_help_screen_whatsapp_subtitle'),
      bg: "#E6F6EE",
      iconBg: "#F0FFF1",
      icon: WhatsAppIcon,
      iconWidth: 15,
      iconHeight: 15,
    },
    {
      id: "chat",
      title: t('get_help_screen_live_chat'),
      subtitle: t('get_help_screen_live_chat_subtitle'),
      bg: "#E6EAFF",
      iconBg: "#F5F7FF",
      icon: MessageIcon,
      iconWidth: 20,
      iconHeight: 15,
    },
    {
      id: "call",
      title: t('get_help_screen_call'),
      subtitle: "+91 8000-123-456",
      bg: "#E6F2FF",
      iconBg: "#EFF8FF",
      icon: CallIcon,
      iconWidth: 15,
      iconHeight: 15,
    },
  ];

  const getOtherWaysOptions = (): SupportItem[] => [
    {
      id: "contact-form",
      title: t('get_help_screen_contact_form'),
      subtitle: t('get_help_screen_contact_form_subtitle'),
      bg: "#F2EAFF",
      iconBg: "#F9F5FF",
      icon: ForumIcon,
      iconWidth: 15,
      iconHeight: 15,
    },
    {
      id: "email",
      title: t('get_help_screen_email'),
      subtitle: "visa@musafir.com",
      bg: "#F8E7E7",
      iconBg: "#FFF1F0",
      icon: MailIcon,
      iconWidth: 15,
      iconHeight: 12,
    },
  ];

  const handleOptionClick = (itemId: string, subtitle?: string) => {
    switch (itemId) {
      case 'whatsapp':
        // Open WhatsApp chat - remove + and spaces from phone number
        const whatsappNumber = '918000123456'; // Format: country code + number without + or spaces
        const whatsappMessage = encodeURIComponent('Hello, I need help with my visa application.');
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
        break;
      
      case 'chat':
        // Navigate to live chat
        window.location.href = `${window.location.origin}/explore/chat`;
        break;
      
      case 'call':
        // Initiate phone call - use the phone number from subtitle
        const phoneNumber = subtitle || '+91 8000-123-456';
        // Clean phone number for tel: protocol (keep + and remove spaces/dashes)
        const cleanPhoneNumber = phoneNumber.replace(/[\s-]/g, '');
        window.location.href = `tel:${cleanPhoneNumber}`;
        break;
      
      case 'contact-form':
        // Navigate to contact form
        router.push('/contact-form');
        break;
      
      case 'email':
        // Open email client with prefilled email - use email from subtitle
        const emailAddress = subtitle || 'visa@musafir.com';
        const emailSubject = encodeURIComponent('Visa Support Request');
        const emailBody = encodeURIComponent('Hello,\n\nI need assistance with:\n\n');
        window.location.href = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;
        break;
      
      default:
        break;
    }
  };

  const renderOptions = (items: SupportItem[]) =>
    items.map((item) => (
      <div
        key={item.id}
        onClick={() => handleOptionClick(item.id, item.subtitle)}
        className="w-[275px] min-h-[69px] rounded-[10px] px-4 py-3 flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ backgroundColor: item.bg }}
      >
        <div
          className="w-[35px] h-[35px] rounded-md flex items-center justify-center"
          style={{ backgroundColor: item.iconBg }}
        >
          <img
            src={getImageSrc(item.icon)}
            alt={item.title}
            width={item.iconWidth || 18}
            height={item.iconHeight || 18}
            className="object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="font-poppins font-normal text-sm text-[#262626]">
            {item.title}
          </div>
          <div className="font-poppins font-normal text-xs text-[#737373]">
            {item.subtitle}
          </div>
        </div>
      </div>
    ));

  return (
    <div
      className="min-h-screen pb-8"
      style={{
        background: "linear-gradient(180deg, #F6F9FF 0%, #FFFFFF 60%)",
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: `${PAGE_MAX_WIDTH}px` }}
      >
        <div className="w-full h-[60px] flex items-center gap-4 px-[30px] pt-5 pb-5">
          <button
            onClick={() => router.back()}
            className="w-6 h-6 p-0 flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Go back"
          >
            <img
              src={getImageSrc(ArrowBackIcon)}
              alt="Back"
              className="w-5 h-5 object-contain"
            />
          </button>
          <h1 className="flex-1 text-center font-poppins font-medium text-base leading-4 text-[#00366B]">
            {t('get_help')}
          </h1>
          <div className="w-6 h-6" />
        </div>

        <div className="w-[315px] rounded-[20px] p-5 mx-auto bg-white border-2 border-[#F2F2F8] shadow-[0_10px_30px_rgba(0,0,0,0.02)] mb-4">
          <h2 className="font-poppins font-medium text-base leading-4 text-[#00366B] mb-5">
            {t('get_help_screen_quick_assistance')}
          </h2>
          <div className="w-[275px] mx-auto flex flex-col gap-2.5">
            {renderOptions(getQuickAssistOptions())}
          </div>
        </div>

        <div className="w-[315px] rounded-[20px] p-5 mx-auto bg-white border-2 border-[#F2F2F8] shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
          <h2 className="font-poppins font-medium text-base leading-4 text-[#00366B] mb-5">
            {t('get_help_screen_other_ways')}
          </h2>
          <div className="w-[275px] mx-auto flex flex-col gap-2.5">
            {renderOptions(getOtherWaysOptions())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetHelpScreen;

