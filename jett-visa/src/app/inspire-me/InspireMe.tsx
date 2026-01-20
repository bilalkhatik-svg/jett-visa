"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import micIcon from "@/assets/images/icons/micIcon.png";
import sendIcon from "@/assets/images/icons/sendIcon.png";
import inspireMeGif from "@/assets/images/gif/inspireMeGif.gif";
import vectorIcon from "@/assets/images/icons/vectorIcon.png";
import TopBar from "@/components/core-module/navbar/TopBar";
import { ROUTES } from "@/utility/constant";
import { MOCK_HISTORY_OPTIONS, MOCK_HISTORY_OPTIONS_AR } from "@/utility/mock/historyOptions";
import { useTranslation } from "react-i18next";

  interface Message {
    text: string;
    type: "user" | "bot" | "typing";
  }

const InspireMe: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasSentInitial, setHasSentInitial] = useState(false);
  const history = isArabic ? MOCK_HISTORY_OPTIONS_AR : MOCK_HISTORY_OPTIONS;

  const handleBack = () => {
    setInputValue("");
    if (messages?.length > 0) {
      setMessages([]);
      setHasSentInitial(false);
    } else {
      router.push(ROUTES.HOME);
    }
  };

  const handleSend = (text?: string) => {
    let textToSend = "";

    if (text) {
      textToSend = text.trim();
    } else if (inputValue.trim()) {
      textToSend = inputValue.trim();
    } else if (!inputValue.trim() && messages.length === 0) {
      textToSend = t("inspire_me");
    }

    if (!textToSend) return;

    // Clear input
    setInputValue("");
    setHasSentInitial(true);

    // Add user message + typing
    setMessages(prev => [
      ...prev,
      { text: textToSend, type: "user" },
      { text: "", type: "typing" },
    ]);

    // Bot reply simulation
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.type === "typing"
            ? { text: `Nice! Here's a suggestion based on "${textToSend}"`, type: "bot" }
            : msg
        )
      );
    }, 1000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!hasSentInitial && inputValue === t("inspire_me")) {
      handleSend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSentInitial]);

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        background: isArabic
          ? "linear-gradient(200deg, #e7c0eeff 100%, #a0e0e3ff)"
          : "linear-gradient(200deg, #e7c0eeff, #a0e0e3ff 100%)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-10 w-full h-[60px]">
        <TopBar
          variant="inner"
          onBackClick={handleBack}
          onLogoClick={handleBack}
          extraText={messages?.length > 0 ? t("inspire_me") : undefined}
        />
      </div>

      {/* Header */}
      {messages?.length === 0 && (
        <div className="flex flex-col items-center h-full mt-12">
          <div
            className="w-[60px] h-[60px] rounded-full bg-white/90 flex items-center justify-center"
            style={{
              boxShadow: "0 0 20px rgba(123, 97, 255, 0.5)",
              backdropFilter: "blur(7px)",
            }}
          >
            <Image
              src={inspireMeGif}
              alt="Inspire Me Gif"
              width={60}
              height={58}
              className="object-contain rounded-full"
            />
          </div>
          <p
            className="text-base font-semibold mt-2"
            style={{
              background: "linear-gradient(90deg, #D536F6, #0AB1BA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("inspire_me")}
          </p>
        </div>
      )}

      {/* Chat & Chips Area */}
      <div
        ref={scrollRef}
        className={`flex-1 w-full flex flex-col gap-3 px-[30px] overflow-auto max-h-[calc(100vh-180px)] ${
          messages?.length === 0 ? "" : "mt-6"
        }`}
      >
        {messages?.length === 0 ? (
          <div className="mt-2 flex-1 w-full flex flex-col gap-2 pb-2 items-center">
            {history.map((option) => (
              <button
                key={option.code}
                onClick={() => handleSend(option?.name)}
                className="font-normal justify-between rounded-full text-xs text-[#565656] bg-white px-4 py-2.5 min-w-0 inline-flex items-center gap-2 hover:shadow-md transition-shadow"
              >
                <span>{option?.name}</span>
                <Image
                  src={vectorIcon}
                  alt="Arrow"
                  width={13}
                  height={13}
                  className="mb-0.5"
                  style={{
                    transform: isArabic ? "scaleX(-1)" : "none",
                  }}
                />
              </button>
            ))}
          </div>
        ) : (
          messages?.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[70%] flex items-center ${
                msg?.type === "user" ? "self-end" : "self-start"
              } ${msg?.type === "typing" ? "min-h-[40px]" : ""}`}
            >
              {msg?.type === "typing" ? (
                <div className="bg-white rounded-xl px-4 py-2 shadow-[0_1px_5px_rgba(0,0,0,0.1)] flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-[#D536F6]"></div>
                  <p className="text-sm">Bot is typing...</p>
                </div>
              ) : msg?.type === "bot" ? (
                <div
                  className="p-[1px] rounded-xl"
                  style={{
                    background: "linear-gradient(90deg, #D536F6, #0AB1BA)",
                  }}
                >
                  <div className="bg-white rounded-[11px] px-4 py-2 text-[#00366B] shadow-[0_1px_5px_rgba(0,0,0,0.1)]">
                    <p className="text-sm">{msg?.text}</p>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-2 rounded-lg bg-white text-[#00366B] shadow-[0_1px_5px_rgba(0,0,0,0.1)]">
                  <p className="text-sm">{msg?.text}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Bottom Input */}
      <div className="mt-1 w-full sticky bottom-4 px-[30px]">
        {!isArabic ? (
          <div className="relative w-full">
            <input
              type="text"
              value={messages.length === 0 ? t("inspire_me") : inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="w-full rounded-2xl text-base font-normal text-[#00366B] bg-white shadow-[0_0_10px_rgba(162,57,234,0.4)] px-4 py-4 pr-24 border-none outline-none focus:ring-2 focus:ring-purple-300 placeholder:text-[#00366B] placeholder:opacity-100 placeholder:font-normal"
              placeholder={messages.length === 0 ? t("inspire_me") : ""}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {messages?.length === 0 && (
                <Image
                  src={micIcon}
                  alt="Mic"
                  width={28}
                  height={28}
                />
              )}
              <button
                onClick={() => handleSend()}
                disabled={!hasSentInitial ? false : !inputValue.trim()}
                className={`cursor-pointer ${
                  (!hasSentInitial ? false : !inputValue.trim()) ? "grayscale" : ""
                }`}
              >
                <Image
                  src={sendIcon}
                  alt="Send"
                  width={42}
                  height={42}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center bg-white shadow-[0_0_10px_rgba(162,57,234,0.4)] rounded-2xl px-4 py-2 w-full h-[63px] gap-2 rtl text-right">
            <button
              onClick={() => handleSend()}
              disabled={!hasSentInitial ? false : !inputValue.trim()}
              className={`w-auto h-[63px] flex items-center justify-center rounded-xl flex-shrink-0 p-0 ${
                (!hasSentInitial ? false : !inputValue.trim()) ? "grayscale" : ""
              }`}
            >
              <Image
                src={sendIcon}
                alt="Send"
                width={42}
                height={42}
                className="cursor-pointer"
                style={{
                  transform: isArabic ? "scaleX(-1)" : "none",
                }}
              />
            </button>
            {messages?.length === 0 && (
              <div className="flex items-center justify-center flex-shrink-0">
                <Image
                  src={micIcon}
                  alt="Mic"
                  width={28}
                  height={28}
                />
              </div>
            )}
            <p className="flex-1 text-base font-normal text-[#00366B] whitespace-nowrap overflow-hidden text-ellipsis text-left">
              {inputValue || (messages.length === 0 ? t("inspire_me") : "")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspireMe;
