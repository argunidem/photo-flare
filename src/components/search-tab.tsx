"use client";

import { useSearch } from "@/store/use-search";
import clsx from "clsx";
import SearchInput from "@/components/search-input";
import FoundUser from "@/components/found-user";
import { ScrollArea } from "@/components/ui/scroll-area";

const SearchTab = () => {
   const { searchTab, searchResults } = useSearch();

   return (
      <>
         {/* Larger than md screens */}
         <div
            className={clsx(
               "hidden absolute left-20 lg:left-64 z-50 max-w-[350px] h-screen transition-all duration-300 py-10 bg-white md:block dark:bg-neutral-900",
               searchTab ? "w-1/2 px-5 border-r" : "w-0"
            )}
         >
            {searchTab && (
               <>
                  <div className='space-y-8'>
                     <h3 className='font-semibold text-xl'>Search</h3>
                     <SearchInput />
                  </div>

                  {searchResults.length > 0 && (
                     <div className='mt-3 space-y-4'>
                        <div className='space-y-4'>
                           {searchResults.map((user) => (
                              <FoundUser
                                 key={user.id}
                                 user={user}
                              />
                           ))}
                        </div>
                     </div>
                  )}
               </>
            )}
         </div>

         {/* Small screens */}
         <div
            className={clsx(
               "block absolute top-[66px] right-16 z-50 w-[290px] rounded-b bg-white transition-all duration-300 md:hidden dark:bg-neutral-900",
               searchTab && searchResults.length !== 0 ? "h-[500px] py-4" : "h-0"
            )}
         >
            <ScrollArea className='h-full'>
               {searchTab && (
                  <div className='space-y-4'>
                     {searchResults.map((user) => (
                        <FoundUser
                           key={user.id}
                           user={user}
                        />
                     ))}
                  </div>
               )}
            </ScrollArea>
         </div>
      </>
   );
};

export default SearchTab;
