"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GooogleIcon from "../../../../../public/google.svg";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const handleGoogleLogin = async () => {
   const res= await signIn("google");
    if(res?.ok){
      window.location.reload()
    };
  };
  return (
    <Button className="w-full" onClick={handleGoogleLogin} variant="outline" size="icon">
  <Image src={GooogleIcon} alt="Google icon" className="w-6 h-6" />
  
</Button>

  );
}