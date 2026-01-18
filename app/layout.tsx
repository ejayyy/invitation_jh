import type { Metadata } from "next";
import { Chiron_GoRound_TC, Gowun_Batang, Gowun_Dodum } from "next/font/google";
import "./globals.css";

const chironGoRoundTC = Chiron_GoRound_TC({
  variable: "--font-chiron-goround",
  display: "swap",
  subsets: ["latin"],
});

const gowunDodum = Gowun_Dodum({
  weight: "400",
  variable: "--font-gowun-dodum",
  display: "swap",
  subsets: ["latin"],
});

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "정수 보민 청첩장",
  description: "How long time no see us!",
  metadataBase: new URL("https://jeongsubomin.life"),
  openGraph: {
    title: "정수 보민 청첩장",
    description: "How long time no see us!",
    url: "https://jeongsubomin.life",
    siteName: "정수 보민 청첩장",
    images: [
      {
        url: "/greeting/main.jpg",
        width: 1200,
        height: 630,
        alt: "정수 보민 결혼식 초대장",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "정수 보민 청첩장",
    description: "How long time no see us!",
    images: ["/greeting/main.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gowunBatang.className} ${chironGoRoundTC.variable} ${gowunDodum.variable} antialiased`}
      >
        {children}
        <audio autoPlay src="/background.mp3" style={{ display: "none" }} />
      </body>
    </html>
  );
}
