<<<<<<< HEAD
import HomeScreenClient from "@/components/HomeScreenClient";

export default function HomeScreenPage() {
  return <HomeScreenClient />;
}
=======
// "use client";

import HomeScreen from "@/components-library/home-screen/HomeScreen";

// Force dynamic rendering for Redux/i18next
export const dynamic = 'force-dynamic';

export default function HomeScreenPage() {
  return <HomeScreen />;
}
>>>>>>> 0f1ee9dd767d1707b6f0517bfcaf4a5fc9484625
