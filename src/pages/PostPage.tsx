import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import {getPost} from "@/services/postsApi.ts";
import type {Post} from "@/types/post";

export function PostPage() {
    const {id} = useParams<{id: string}>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!id){
            setError("Post ID is missing.");
            setLoading(false);
            return;
        }

        async function loadPost() {
            try {
                const data = await getPost(id);
                setPost(data);
            } catch {
                setError("Failed to load post.");
            } finally {
                setLoading(false);
            }
        }
        loadPost();
    }, [id]);

    if (error || !post){
        return (
            <main className="mx-auto max-w-3xl px-4 py-8">
                <div className="alert alert-error">
                    <span>{error ?? "Post not found."}</span>
                </div>

                <Link to="/" className="btn btn-ghost mt-4">
                    ← Back to feed
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-3xl px-4 py-8">
            <Link to="/" className="btn btn-ghost mb-6">
                ← Back to feed
            </Link>
            <article className="card bg-base-100 shadow-sm">
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-base-content/60">
                            User #{post.userId}
                        </span>

                        <span className="text-sm text-base-content/60">
                            {post.views} views
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span key={tag} className="badge badge-primary">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <p className="mt-4 whitespace-pre-line leading-7">
                        {post.body}
                    </p>
                    <div className="divider" />
                    <div className="flex gap-6">
                        <span>👍 {post.reactions.likes}</span>
                        <span>👎 {post.reactions.dislikes}</span>
                    </div>
                </div>
            </article>
        </main>
    );
}
