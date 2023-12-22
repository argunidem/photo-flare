"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "next-auth";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import { buttonVariants } from "@/components/ui/button";

const ProfileLink = ({ user }: { user: User }) => {
   const pathname = usePathname();

   const href = `/dashboard/${user.username}`;
   const isActive = pathname === href;

   return (
      <Link
         href={href}
         className={buttonVariants({
            variant: isActive ? "secondary" : "ghost",
            className: "navLink",
            size: "lg",
         })}
      >
         <UserAvatar
            user={user}
            className='h-6 w-6 dark:border-2 border-slate-400'
         />

         <p
            className={`${cn("hidden lg:block", {
               "font-extrabold": isActive,
            })}`}
         >
            Profile
         </p>
      </Link>
   );
};

export default ProfileLink;
