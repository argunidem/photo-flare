import { fetchPostsByUsername } from "@/lib/data";
import PostsGrid from "@/components/posts-grid";

async function ProfilePage({ params: { username } }: { params: { username: string } }) {
   const posts = await fetchPostsByUsername(username);

   return <PostsGrid posts={posts} />;
}

export default ProfilePage;
