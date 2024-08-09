import AppRootLayout from "@/components/AppRootLayout";
import Header from "./components/Header";
import Image from "next/image";

export const metadata = {
  title: "GSH Authentication",
  description: "GSH is a platform that connect you with your soulmate",
};

export default function RootLayout({ children }) {
  return (
    <AppRootLayout>
      <div className="flex h-screen w-full">
        <div
          className="
          fixed aspect-auto top-0 left-0 w-full h-screen
          "
        >
          <Image fill alt="" src="/images/auth-bg-image.jpeg" />
        </div>

        <div className="w-full z-[2]">
          <Header />
          <main
            style={{
              minHeight: "calc(100% - 152px)",
            }}
            className="mt-[85px] contained flex-center"
          >
            {children}
          </main>
        </div>
      </div>
    </AppRootLayout>
  );
}
