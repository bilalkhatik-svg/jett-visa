export type AccountMode = "guest" | "authenticated";

export interface NavLink {
  id: string;
  label: string;
  label_key?: string;
  subtitle_key?: string;
  icon?: string | any; // StaticImageData or string
  route?: string;
  action?: () => void;
  onClick?: () => void;
}

export interface User {
  fullName: string;
  email: string;
  phone?: string;
  nationality?: string;
  residency?: string;
  passportFlag?: string;
  residencyFlag?: string;
  avatar?: string;
  isVerified?: boolean;
}

export interface ApplicationMetadata {
  appVersion: string;
  poweredBy: string;
  buildNumber: string;
  lastUpdated: string;
  orgName: string;
  logo: string;
}

export interface NavigationLinks {
  authenticated?: NavLink[];
  guest?: NavLink[];
  universal: NavLink[];
}

export interface AccountData {
  isAuthenticated: boolean;
  user?: User;
  navigationLinks: NavigationLinks;
  applicationMetadata: ApplicationMetadata;
}

