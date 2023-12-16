import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import PostOptions from "./post-options";
import PostActions from "./post-actions";
import Comments from "./comments";
import { Card } from "@/components/ui/card";
import Timestamp from "./timestamp";
import UserAvatar from "@/components/user-avatar";
import { PostWithExtras } from "@/lib/definitions";

const Post = async ({ post }: { post: PostWithExtras }) => {
   const session = await auth();
   const userId = session?.user?.id;
   const username = post.user.username;

   if (!session?.user) return null;

   return (
      <div className='flex flex-col space-y-3'>
         <div className='flex items-center justify-between px-3 sm:px-0'>
            <div className='flex space-x-3 items-center'>
               <UserAvatar user={post.user} />
               <div className='text-sm'>
                  <p className='space-x-1'>
                     <span className='font-semibold'>{username}</span>
                     <span
                        className='font-medium text-neutral-500 dark:text-neutral-400
                      text-xs'
                     >
                        •
                     </span>
                     <Timestamp createdAt={post.createdAt} />
                  </p>
               </div>
            </div>

            <PostOptions
               post={post}
               userId={userId}
            />
         </div>

         <Card className='relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md'>
            <Image
               src={post.fileUrl}
               alt='Post Image'
               fill
               className='sm:rounded-md object-cover'
            />
         </Card>

         <PostActions
            post={post}
            userId={userId}
            className='px-3 sm:px-0'
         />

         {post.caption && (
            <div className='text-sm leading-none flex items-center space-x-2 font-medium px-3 sm:px-0'>
               <Link
                  href={`/dashboard/${username}`}
                  className='font-bold'
               >
                  {username}
               </Link>
               <p className='dark:font-light dark:text-neutral-300'>{post.caption}</p>
            </div>
         )}

         <Comments
            postId={post.id}
            comments={post.comments}
            user={session.user}
         />
      </div>
   );
};

export default Post;
