"use client";

import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const GoogleLogin = () => {
   const { pending } = useFormStatus();

   return (
      <Button
         className='mt-4 w-full'
         variant={"secondary"}
         aria-disabled={pending}
         onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
         Log in with Google
      </Button>
   );
};

export default GoogleLogin;
