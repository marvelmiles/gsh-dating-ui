import AppRootLayout from "@/components/AppRootLayout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "GSH Dating App",
  description: "GSH is a platform that connect you with your soulmate",
};

export default function RootLayout({ children }) {
  return (
    <AppRootLayout>
      <div className="flex h-screen w-full">
        <div></div>

        <div className="w-full">
          <Header />
          <main
            style={{
              minHeight: "calc(100% - 152px)",
            }}
            className="mt-[85px] contained"
          >
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </AppRootLayout>
  );
}
