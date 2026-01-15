"use client";
<<<<<<< HEAD

import { useEffect } from "react";
import { useFetchDestinationsQuery } from "@/store/visaDestinationsApi";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import searchIcon from "@/assets/images/icons/search.png";
import downArrowIcon from "@/assets/images/icons/downArrowIcon.png";
import favoriteLocationIcon from "@/assets/images/icons/favorite-location.png";
import documentIcon from "@/assets/images/icons/documenticon.webp";
import rightArrowIcon from "@/assets/images/icons/rightArrowIcon.png";
import arrowLeftIcon from "@/assets/images/icons/arrowLeft.webp";
import arrowRightIcon from "@/assets/images/icons/arrowrighticon.webp";
import checkIcon from "@/assets/images/icons/checkicon.webp";
import formIcon from "@/assets/images/icons/formIcon.png";
import { useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { loadLanguageFromStorage } from "@/store/slice/languageSlice";
import { useAuthorization } from "@/utils/hooks/useAuthorization";
import HomeScreen from "@/pages/home-screen/HomeScreen";

export default function Home() {
  
  // Convert StaticImageData to string for img src
  // const searchIconSrc = typeof searchIcon === 'string' ? searchIcon : (searchIcon as any)?.src || searchIcon;
  // const downArrowIconSrc = typeof downArrowIcon === 'string' ? downArrowIcon : (downArrowIcon as any)?.src || downArrowIcon;
  // const favoriteLocationIconSrc = typeof favoriteLocationIcon === 'string' ? favoriteLocationIcon : (favoriteLocationIcon as any)?.src || favoriteLocationIcon;
  // const documentIconSrc = typeof documentIcon === 'string' ? documentIcon : (documentIcon as any)?.src || documentIcon;
  // const rightArrowIconSrc = typeof rightArrowIcon === 'string' ? rightArrowIcon : (rightArrowIcon as any)?.src || rightArrowIcon;
  // const arrowLeftIconSrc = typeof arrowLeftIcon === 'string' ? arrowLeftIcon : (arrowLeftIcon as any)?.src || arrowLeftIcon;
  // const arrowRightIconSrc = typeof arrowRightIcon === 'string' ? arrowRightIcon : (arrowRightIcon as any)?.src || arrowRightIcon;
  // const checkIconSrc = typeof checkIcon === 'string' ? checkIcon : (checkIcon as any)?.src || checkIcon;
  // const formIconSrc = typeof formIcon === 'string' ? formIcon : (formIcon as any)?.src || formIcon;

  return (
    <>
      <HomeScreen/>
    </>
  )
}
=======

import HomeScreen from "@/pages/home-screen/HomeScreen";

function Home() {
  return <HomeScreen />;
}

export default Home;
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
