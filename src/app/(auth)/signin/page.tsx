
import Link from "next/link";
import GoogleSignInButton from "../signup/_components/GoogleSignInButton";
import Form from "./_components/Form";

export default async function Login() {


 
  return (
    <div className="mt-24  rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
      <Form/>

      <div className="text-gray-500 flex  w-full justify-center text-sm mt-2">
        New to Neflix ?
        <Link className="text-white hover:underline ml-2" href="/signup">
          Sign up now
        </Link>
      </div>

      <div className=" w-full mt-3">
    
        <GoogleSignInButton />
      </div>
    </div>
  );
}