import Image from "next/image";
import { ReactNode } from "react";
import BackgroundImage from "../../../public/login_background.jpg";
import Logo from "../../../public/netflix_logo.svg";
import "../globals.css"
import NextAuthSessionProvider from "@/Providers/NextAuthProvider";
import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
    <NextAuthSessionProvider>
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src={BackgroundImage}
        alt="background image"
        className=" object-cover  md:-z-10 brightness-50"
        priority
        fill
      />
      <Image
        src={Logo}
        alt="Logo"
        width={120}
        height={120}
        priority
        className="absolute left-4 top-4 object-contain md:left-10 md:top-6"
      />
      <div className="z-20 container mx-auto flex justify-center items-center p-5 md:p-10 ">
      {children}
      </div>
    </div>
    <div className="z-50">
    <Toaster/>
    </div>
    </NextAuthSessionProvider>
    </body>
    </html>
  );
}