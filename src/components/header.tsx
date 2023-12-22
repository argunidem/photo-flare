import Link from "next/link";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Header = () => {
   return (
      <header className='fixed md:hidden bg-white top-0 flex items-center justify-between dark:bg-neutral-950 w-full z-50 border-b border-zinc-300 dark:border-neutral-700 px-3 py-2 sm:-ml-6'>
         <Link href={"/dashboard"}>
            <p className={`font-semibold text-xl`}>PhotoFlare</p>
         </Link>

         <div className='flex items-center space-x-2'>
            <SearchInput />
            <Button
               size={"icon"}
               variant={"ghost"}
            >
               <Heart />
            </Button>
         </div>
      </header>
   );
};

export default Header;
