import { notFound } from "next/navigation";
import { fetchPostById } from "@/lib/data";
import PostView from "@/components/post-view";

type Props = {
   params: {
      id: string;
   };
};

async function PostModal({ params: { id } }: Props) {
   const post = await fetchPostById(id);

   if (!post) {
      notFound();
   }

   return (
      <PostView
         id={id}
         post={post}
      />
   );
}

export default PostModal;
