import { Cormorant_Garamond, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"], // Add other subsets if needed
  weight: ["400", "700"], // Add other weights if needed
});

export default function AppRootLayout({ children, bodyClassName = "" }) {
  return (
    <html lang="en">
      <body
        className={cn(
          cormorantGaramond.className,
          poppins.variable,
          "font-poppins text-[14px] text-black-mild",
          bodyClassName
        )}
      >
        {children}
      </body>
    </html>
  );
}
