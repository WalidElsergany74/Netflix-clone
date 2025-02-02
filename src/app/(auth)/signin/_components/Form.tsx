"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

const Form = () => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
          data[key] = value.toString();
        });
        try {
          setIsLoading(true);
          const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });
          if (res?.error) {
            const validationError = JSON.parse(res?.error).validationError;
            setError(validationError);
            const responseError = JSON.parse(res?.error).responseError;
            if (responseError) {
              toast({
                title: responseError,
                className: "text-destructive",
              });
            }
          }
          if (res?.ok) {
            toast({
              title: "Login done successfully",
              className: "text-green-400",
            });
            router.replace(`/`);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
    <h1 className="text-3xl font-semibold text-white">Login</h1>
    <div className="space-y-4 mt-5">
    <Input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-[#333] placeholder:text-sm placeholder:text-gray-400 w-full inline-block"
          />
          <span className='text-red-500'>{error?.email}</span>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="bg-[#333] placeholder:text-sm placeholder:text-gray-400 w-full inline-block"
          />
          <span className='text-red-500'>{error?.password}</span>
          <Button
        type="submit"
        variant="destructive"
        className="w-full bg-[#e50914]"
        disabled={isLoading}
      >
        Log in
      </Button>
    </div>
  </form>
  )
}

export default Form