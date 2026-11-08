import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://redhope.org"),
  title: "RedHope — Donate Blood • Save Lives | রক্ত দিন, জীবন বাঁচান",
  description:
    "RedHope is Bangladesh's premier humanitarian blood donation and donor management platform connecting voluntary donors with patients in urgent need across all 64 districts.",
  keywords: [
    "Blood Donation Bangladesh",
    "Donate Blood",
    "RedHope",
    "Blood Donors Dhaka",
    "Emergency Blood Request",
    "রক্তদান",
    "রক্ত দিন জীবন বাঁচান",
  ],
  openGraph: {
    title: "RedHope — Donate Blood • Save Lives",
    description: "Connect blood donors with people in urgent need across Bangladesh.",
    url: "https://redhope.org",
    siteName: "RedHope",
    images: [
      {
        url: "/images/hero-banner.jpg",
        width: 1200,
        height: 630,
        alt: "RedHope Blood Donation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${hindSiliguri.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased selection:bg-red-500 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
