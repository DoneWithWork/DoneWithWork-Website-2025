import type { Metadata } from "next";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
  title: "DoneWithWork",
  description: "The official DoneWithWork website",
  applicationName: "DoneWithWork",
  authors: [{ name: "DoneWithWork Team", url: "https://donewithwork.dev" }],
  keywords: [
    "freelancing",
    "software developer",
    "student",
    "DoneWithWork",
    "Monash",
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://donewithwork.dev",
    title: "DoneWithWork - Student & Software developer",
    description: "The official DoneWithWork website",
    siteName: "DoneWithWork",
    images: [
      {
        url: "https://donewithwork.dev/images/donewithwork-og.png",
        width: 1200,
        height: 630,
        alt: "DoneWithWork - Student & Software developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@donewithwork",
    creator: "@donewithwork",
    title: "DoneWithWork - Student & Software developer",
    description: "The official DoneWithWork website",
    images: ["https://donewithwork.dev/images/donewithwork-og.png"],
  },
  icons: {
    icon: "/images/donewithwork.png",
    apple: "/images/donewithwork.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/donewithwork.png" />
      </head>
      <body className={` antialiased bg-[#0d0f11]`}>{children}</body>
    </html>
  );
}
