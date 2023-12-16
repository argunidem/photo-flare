"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import PostOptions from "./post-options";
import Timestamp from "./timestamp";
import UserAvatar from "./user-avatar";
import { PostWithExtras } from "@/lib/definitions";

function MiniPost({ post }: { post: PostWithExtras }) {
   const username = post.user.username;
   const href = `/dashboard/${username}`;
   const { data: session, status } = useSession();
   const user = session?.user;

   if (!user) return null;

   return (
      <div className='group p-3 px-3.5  flex items-start space-x-2.5'>
         <Link href={href}>
            <UserAvatar user={post.user} />
         </Link>
         <div className='space-y-1.5'>
            <p className='leading-5 text-sm space-x-1.5'>
               <Link
                  href={href}
                  className='font-bold'
               >
                  {username}
               </Link>
               <span className='font-medium dark:text-neutral-200'>{post.caption}</span>
            </p>
            <div className='flex h-5 items-center space-x-2.5'>
               <Timestamp createdAt={post.createdAt} />
               <PostOptions
                  post={post}
                  userId={user.id}
                  className='hidden group-hover:inline'
               />
            </div>
         </div>
      </div>
   );
}

export default MiniPost;
