"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/lib/schemas";

const LoginForm = () => {
   const router = useRouter();

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const { isDirty, isSubmitting, isValid } = form.formState;

   const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
      try {
         const callback = await signIn("credentials", {
            ...values,
            redirect: false,
         });

         if (callback?.ok) {
            toast("Logged in");
            router.push("/dashboard");
         }

         if (callback?.error) {
            toast.error(callback.error);
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
         >
            <FormField
               control={form.control}
               name='email'
               render={({ field }) => (
                  <FormItem>
                     <FormControl className='bg-secondary'>
                        <Input
                           type='email'
                           placeholder='Email'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name='password'
               render={({ field }) => (
                  <FormItem>
                     <FormControl className='bg-secondary'>
                        <Input
                           type='password'
                           placeholder='Password'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button
               variant={"secondary"}
               className='mt-4 w-full'
               type='submit'
               disabled={!isDirty || !isValid || isSubmitting}
            >
               Log in with Email
            </Button>
         </form>
      </Form>
   );
};

export default LoginForm;
