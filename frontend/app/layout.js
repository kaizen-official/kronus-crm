import { Montserrat, Merriweather } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/src/contexts/AuthContext";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "Kronus CRM",
  description: "Advanced CRM Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${merriweather.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
