"use client";

import React from "react";
import { useTranslation } from "@/utils/i18nStub";

export default function TestPage() {
  const { t, i18n } = useTranslation();

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>{t("login_tagline")}</h1>
      <p>{t("language")}: {i18n.language || "en"}</p>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => changeLang("en")} style={{ marginRight: 8 }}>
          English
        </button>
        <button onClick={() => changeLang("ar")}>
          Arabic
        </button>
        <button onClick={() => changeLang("hi")}>
          Hindi
        </button>
      </div>
    </div>
  );
}
