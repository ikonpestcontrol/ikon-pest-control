import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Script from "next/script";
import FacebookPixel from "@/components/facebookPixel";
import { Suspense } from "react";
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IKON Pest Control Services - Professional Pest Management Solutions",
  description:
    "IKON Pest Control Services - Over 15+ years of professional pest management in Mira Road, Bhayandar, Thane. WHO & HACCP approved chemicals, 24/7 service, 4.8★ Google rating.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Facebook Pixel Script */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1237238187894851');
        fbq('track', 'PageView');
      `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <Header />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1237238187894851&ev=PageView&noscript=1"
          />
        </noscript>

        <main>{children}<SpeedInsights /></main>
        <Footer />
      </body>
    </html>
  )
}
