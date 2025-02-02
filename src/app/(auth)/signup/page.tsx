import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/server/auth";
import Form from "./_components/Form";
import GoogleSignInButton from "./_components/GoogleSignInButton";

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/home");
  }
  return (
    <div className="mt-24  rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
      
       <Form/>
      <div className="text-gray-500 text-sm mt-2 ">
        Alredy Have a account?
        <Link className="text-white hover:underline ml-1 " href="/signin">
          Log in now!
        </Link>
      </div>

      <div className="flex w-full justify-center items-center gap-x-3 mt-6">
       
        <GoogleSignInButton /> 
      </div>
    </div>
  );
}