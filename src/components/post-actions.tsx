import Link from "next/link";
import LikeButton from "./like";
import ShareButton from "./share-button";
import BookmarkButton from "./bookmark-button";
import ActionIcon from "@/components/action-icon";
import { cn } from "@/lib/utils";
import { PostWithExtras } from "@/lib/definitions";
import { MessageCircle } from "lucide-react";

type Props = {
   post: PostWithExtras;
   userId?: string;
   className?: string;
};

function PostActions({ post, userId, className }: Props) {
   return (
      <div className={cn("relative flex items-start w-full gap-x-2", className)}>
         <LikeButton
            post={post}
            userId={userId}
         />
         <Link href={`/dashboard/p/${post.id}`}>
            <ActionIcon>
               <MessageCircle className={"h-6 w-6"} />
            </ActionIcon>
         </Link>
         <ShareButton postId={post.id} />
         <BookmarkButton
            post={post}
            userId={userId}
         />
      </div>
   );
}

export default PostActions;
