"use client";

import { useState } from "react";
import { searchUsersByUsername } from "@/lib/actions";
import { useSearch } from "@/store/use-search";
import { Search, X } from "lucide-react";

const SearchInput = () => {
   const [searchInput, setSearchInput] = useState("");
   const { setSearchResults, openSearchTab } = useSearch();

   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);

      if (searchInput.length > 0 && searchInput.trim() !== "") {
         const users = await searchUsersByUsername(searchInput);
         setSearchResults(users);
      }
   };

   const handleClear = () => {
      setSearchInput("");
      setSearchResults([]);
   };

   return (
      <div className='flex items-center text-neutral-600 dark:text-neutral-400 bg-zinc-100 dark:bg-neutral-800 gap-x-2 rounded-md px-3.5 py-1.5'>
         <Search className='h-4 w-4' />
         <input
            type='text'
            placeholder='Search'
            value={searchInput}
            onChange={handleChange}
            onInput={openSearchTab}
            className='bg-transparent placeholder:text-neutral-600 dark:placeholder:text-neutral-400 flex-1 outline-none py-1.5'
         />
         <span
            onClick={handleClear}
            className='p-1 rounded-full cursor-pointer bg-gray-200 dark:bg-neutral-900 hover:bg-gray-300 hover:dark:bg-neutral-950'
         >
            <X size={15} />
         </span>
      </div>
   );
};

export default SearchInput;
