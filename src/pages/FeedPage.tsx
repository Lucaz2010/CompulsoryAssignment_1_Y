import {useEffect, useState} from "react";
import {Link} from "react-router";
import {PostCard} from "@/components/PostCard.tsx";
import {Navbar} from "@/components/Navbar.tsx";
import {getPosts, searchPosts,getPostsByTag} from "@/services/postsApi.ts";
import type {Post} from "@/types/post.ts";

export function FeedPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

async function handleSearch(query: string){
    console.log("QUERY:", query);

        setLoading(true);
        setError(null)
      try{
          if (query.startsWith("#")){
              const slug = query.slice(1).trim().toLowerCase();
              console.log("SLUG:", slug);

              if (slug){
                  const data = await getPostsByTag(slug);
                  setPosts(data.posts);
              }
          }
          else if (query.trim()){
              const data = await searchPosts(query);
              setPosts(data.posts);
          }
          else {
              const data = await getPosts();
              setPosts(data.posts);
          }



      }
      catch{
          setError("Could not load posts");

      }
      finally {
          setLoading(false);
      }
    }
    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await getPosts();
                setPosts(data.posts);
            } catch {
                setError("Could not load posts.");
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    return (

    <>
        <Navbar onSearch={handleSearch}/>
        <main className="mx-auto max-w-3xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Feed</h1>
                    <p className="text-base-content/60">
                        Discover the latest posts.
                    </p>
                </div>

                <Link to="/create" className="btn btn-primary">
                    Create post
                </Link>
            </div>

            { loading && (
                <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg" />
                </div>
            )}

            { error && (
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            )}

            { !loading && !error && (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </main>
    </>
    );
}
