import { fetchSavedPostsByUsername } from "@/lib/data";
import PostsGrid from "@/components/posts-grid";

async function SavedPosts({ params: { username } }: { params: { username: string } }) {
   const savedPosts = await fetchSavedPostsByUsername(username);
   const posts = savedPosts?.map((savedPost) => savedPost.post);

   return <PostsGrid posts={posts} />;
}

export default SavedPosts;
