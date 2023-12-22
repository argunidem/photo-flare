import Link from "next/link";
import type { User } from "next-auth";
import { useSearch } from "@/store/use-search";
import clsx from "clsx";
import UserAvatar from "@/components/user-avatar";
import { buttonVariants } from "@/components/ui/button";

const FoundUser = ({ user }: { user: User }) => {
   const { toggleSearchTab } = useSearch();

   return (
      <Link
         href={`/dashboard/${user.username}`}
         className={clsx(
            buttonVariants({
               variant: "ghost",
               className: "navLink",
               size: "lg",
            }),
            "py-7 !justify-start"
         )}
         onClick={() => toggleSearchTab()}
      >
         <UserAvatar
            user={user}
            className='ml-2 h-6 w-6 dark:border-2 border-slate-400'
         />

         <div className='flex flex-col'>
            <h4 className='font-semibold text-lg leading-none'>{user.username}</h4>
            <p className='text-neutral-500 leading-none dark:text-neutral-400'>{user.name}</p>
         </div>
      </Link>
   );
};

export default FoundUser;
