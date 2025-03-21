import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import NextAuthSessionProvider from "@/Providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Toaster } from "@/components/ui/toaster";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Netflix Clone - Watch Movies Online",
  description: "Stream your favorite movies and shows online in high quality.",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

 
  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthSessionProvider>
         <Navbar user={session?.user || null}/>
        <main className="min-h-screen container mx-auto">
        {children}
        </main>
        <Toaster/>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}