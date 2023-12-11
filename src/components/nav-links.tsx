"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { links } from "@/constants/navigation-links";

const NavLinks = () => {
   const pathname = usePathname();

   return (
      <>
         {links.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathname === link.href;

            return (
               <Link
                  key={link.name}
                  href={link.href}
                  className={buttonVariants({
                     variant: isActive ? "secondary" : "ghost",
                     className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
                     size: "lg",
                  })}
               >
                  <LinkIcon className='w-6' />
                  <p
                     className={`${cn("hidden lg:block", {
                        "font-extrabold": isActive,
                     })}`}
                  >
                     {link.name}
                  </p>
               </Link>
            );
         })}
      </>
   );
};

export default NavLinks;
