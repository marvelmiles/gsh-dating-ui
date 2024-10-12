import AppRootLayout from "@/components/AppRootLayout";

export const metadata = {
  title: "Soulmater Authentication",
  description: "Soulmater is a platform that connects you with your soulmate.",
};

export default function RootLayout({ children }) {
  return <AppRootLayout>{children}</AppRootLayout>;
}
