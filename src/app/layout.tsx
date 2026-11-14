import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astronomia Luxe · Haute Couture Eyewear Maison",
  description:
    "Vision, refined to its essence. Prestigious rose-gold titanium spectacles featuring crystal-clear optical lenses and refined brown acetate temple tips.",
  keywords: [
    "Astronomia Luxe",
    "Luxury Eyewear",
    "Haute Couture Eyewear",
    "Rose Gold Titanium Spectacles",
    "Swiss Luxury Maison",
  ],
  authors: [{ name: "Astronomia Luxe Maison" }],
};

export const viewport: Viewport = {
  themeColor: "#060606",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#060606] text-[#EDE8E0]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#060606] text-[#EDE8E0] antialiased min-h-screen selection:bg-[#C9A05C] selection:text-[#060606]">
        {children}
      </body>
    </html>
  );
}
