"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast';
import { signup } from '@/server/_actions/auth';
import { ValidationErrors } from '@/validation';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect } from 'react'




const initialState: {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
};

const Form = () => {
  const [state, action, pending] = useActionState(signup, initialState);
  const router = useRouter()


  useEffect(() => {
     console.log("Signup State:", state);
    if (state.status && state.message) {
     
      toast({
        title: state.message,
        className: state.status === 201 ? "text-green-400" : "text-destructive",
      });
    }
    if (state.status === 201) {
      router.replace(`/signin`);
    }
  }, [router, state, state.message, state.status]);

  return (
    <form  action={action}>
    <h1 className="text-3xl font-semibold text-white">Sign Up</h1>
    <div className="space-y-4 mt-5">
      <Input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="bg-[#333] placeholder:text-sm placeholder:text-gray-400 w-full inline-block"
        defaultValue={state.formData?.get("name") as string}
        />
        {state.error?.name && (
          <p className="text-sm text-red-500 mt-1">{state.error.email}</p>
        )}
      <Input
        type="email"
        name="email"
        placeholder="Email"
        className="bg-[#333] placeholder:text-sm placeholder:text-gray-400 w-full inline-block"
        defaultValue={state.formData?.get("email") as string}
        />
        {state.error?.email && (
          <p className="text-sm text-red-500 mt-1">{state.error.email}</p>
        )}
      
      <Input
        type="password"
        name="password"
        placeholder="Enter password"
        className="bg-[#333] placeholder:text-sm placeholder:text-gray-400 w-full inline-block"
        defaultValue={state.formData?.get("password") as string}
        />
        {state.error?.password && (
          <p className="text-sm text-red-500 mt-1">{state.error.password}</p>
        )}
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Enter confirm password"
        className="bg-[#333] placeholder:text-sm placeholder:text-gray-400 w-full inline-block"
        defaultValue={state.formData?.get("confirmPassword") as string}
        />
        {state.error?.password && (
          <p className="text-sm text-red-500 mt-1">{state.error.password}</p>
        )}
      <Button
        type="submit"
        variant="destructive"
        className="w-full bg-[#e50914]"
        disabled={pending}
      >
        Sign Up
      </Button>
    </div>
  </form>
  )
}

export default Form