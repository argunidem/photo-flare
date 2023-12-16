import { Suspense } from "react";
import SinglePost from "@/components/single-post";
import MorePosts from "@/components/more-posts";
import { SinglePostSkeleton } from "@/components/post-skeletons";
import { Separator } from "@/components/ui/separator";

function PostPage({ params: { id } }: { params: { id: string } }) {
   return (
      <div>
         <Suspense fallback={<SinglePostSkeleton />}>
            <SinglePost id={id} />
         </Suspense>

         <Separator className='my-12 max-w-3xl lg:max-w-4xl mx-auto' />

         <Suspense>
            <MorePosts postId={id} />
         </Suspense>
      </div>
   );
}

export default PostPage;
