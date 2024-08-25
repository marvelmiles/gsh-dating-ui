import AppRootLayout from "@/components/AppRootLayout";

export const metadata = {
  title: "GSH Dating App",
  description: "GSH is a platform that connect you with your soulmate",
};

export default function RootLayout({ children }) {
  return <AppRootLayout>{children}</AppRootLayout>;
}
