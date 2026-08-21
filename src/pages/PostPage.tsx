import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";
import {deletePost, getCommentsByPostId, getPost} from "@/services/postsApi.ts";
import type {Post,Comment} from "@/types/post";
import {CommentList} from "@/components/CommentList.tsx";

export function PostPage() {
    const {id} = useParams<{id: string}>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const navigate = useNavigate();




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
                const commentsData = await getCommentsByPostId(id);
                setComments(commentsData.comments);
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

    const tags = Array.isArray(post.tags) ? post.tags : [];

    async function handleDelete() {
        if (!post || isDeleting) {
            return;
        }

        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }

        setIsDeleting(true);
        try {
            await deletePost(post.id);
            navigate("/");
        } catch {
            setError("Failed to delete post.");
            setIsDeleting(false);
        }
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

                    </div>
                    <h1 className="text-3xl font-bold">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
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
                        <span> 👁️️️ {post.views} </span>
                        <button
                            className="link"
                            onClick={() => setShowComments((isShown) => !isShown)}
                            aria-expanded={showComments}
                            aria-controls="post-comments"
                        >
                            💬 {comments.length}
                        </button>
                    </div>
                    <button
                        className="btn btn-error mt-4"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete this post"}
                    </button>
                </div>
            </article>
            <section
                id="post-comments"
                className={`overflow-hidden transition-all duration-300 ${
                    showComments ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
                aria-hidden={!showComments}
            >
                <CommentList comments={comments}/>
            </section>
        </main>
    );
}
