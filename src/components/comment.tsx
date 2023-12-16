"use client";

import { CommentWithExtras } from "@/lib/definitions";
import CommentOptions from "@/components/comment-options";
import UserAvatar from "@/components/user-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Timestamp from "./timestamp";

type Props = {
   comment: CommentWithExtras;
   inputRef?: React.RefObject<HTMLInputElement>;
};

function Comment({ comment, inputRef }: Props) {
   const { data: session } = useSession();
   const username = comment.user.username;
   const href = `/dashboard/${username}`;

   return (
      <div className='group p-3 px-3.5 flex items-start space-x-2.5'>
         <Link href={href}>
            <UserAvatar user={comment.user} />
         </Link>
         <div className='space-y-1.5'>
            <p className='leading-5 text-sm space-x-1.5'>
               <Link
                  href={href}
                  className='font-bold'
               >
                  {username}
               </Link>
               <span className='font-medium dark:text-neutral-200'>{comment.body}</span>
            </p>
            <div className='flex h-5 items-center space-x-2.5'>
               <Timestamp createdAt={comment.createdAt} />
               <button
                  className='text-xs font-semibold text-neutral-500'
                  onClick={() => inputRef?.current?.focus()}
               >
                  Reply
               </button>
               {comment.userId === session?.user.id && <CommentOptions comment={comment} />}
            </div>
         </div>
      </div>
   );
}

export default Comment;
