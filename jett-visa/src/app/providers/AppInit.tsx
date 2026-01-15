// app/providers/AppInit.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useAuthorization } from "@/utils/hooks/useAuthorization";
import { setAuthorizationTokens } from "@/store/slice/loginSlice";
import { loadAuthTokens } from "@/utils/authStorage";
import { loadLanguageFromStorage } from "@/store/slice/languageSlice";

export default function AppInit() {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { authorize } = useAuthorization();
  const [authHydrated, setAuthHydrated] = useState(false);

  const authTokens = useSelector(
    (state: RootState) => state.loginSlice?.authorizationTokens
  );

  // Load language once
  useEffect(() => {
    dispatch(loadLanguageFromStorage());
  }, [dispatch]);

  // Hydrate auth tokens from storage before attempting authorization
  useEffect(() => {
    const storedTokens = loadAuthTokens();
    if (storedTokens?.AccessToken) {
      dispatch(setAuthorizationTokens(storedTokens));
    }
    setAuthHydrated(true);
  }, [dispatch]);

  // Initialize authorization ONCE
  useEffect(() => {
    if (authHydrated && !authTokens?.AccessToken) {
      const encryptedRequest = "GeWxBz3UdZnAQdXjYO37LhQlpSxJVcK7At4g44pgUMQtd9tCWq3rGbi3FLgl3XWNjVZdhXDleafMpnh4VCDBQI6s98Korp5taF7uAZhReLTDlKQPM3qjAFDajaSMEv4O9xZI/JmHzqsFB26NxXpU8GrTlkOOBxPWIajyrMqWRVvv+bNWi69ZngEPQtHj7hGMxFkQIDWK/saFTmaLAPSvQndGuVoObNQIiro+s1VAs6m8cTzoFQ9+zUvqeU5tlDaqnS9EfnZ9wzniBKTteneicpmm64flEpOTe3lFvA5bZQ58O6OijvCJq3YEyaXFn8C984KLoMuarxxLIW2QrumBZ55tjeWYcAgxHb5IPqCEWwuolm4r8r/d1soQym2SRPkwwn88r9gu++iWawDZMMpI6RwlkONCLzGYkgU3GXS1Xc2krr85c9GNO3h95jpr1MP9nH1cEqxcouYj81RFAaz+2qhucN/AZr+XTTR/v17WWJRF5XzIKR71V7CeETgb9AmOa46Q7CAtqFzYr6Ws6jarPMHnaBDcljEZLZMVDhGzG4n7zKHURNEFk4fY0kvUYISiKyN8o2Xhog+/Aqse5ByRiEuGi1qFSbde100qzmZaQsnyDV+Ydc36n2z8/4OHoyTN7zh4Lj3FK/g/lM4TgFCzIyQYkrgerlyjCeuj4DZg5f4=";
      authorize(encryptedRequest).catch((error) => {
        console.error("Failed to authorize:", error);
      });
    }
  }, [authHydrated, authTokens?.AccessToken, authorize]);

  // RTL example (optional side-effect)
  useEffect(() => {
    const isRTL = i18n.language.startsWith("ar");
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [i18n.language]);

  return null; // IMPORTANT: no UI
}