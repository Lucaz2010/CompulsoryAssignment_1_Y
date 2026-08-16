import {Link} from "react-router";
import type {Post} from "@/types/post.ts";

interface PostCardProps {
    post: Post;
}

export function PostCard({post}: PostCardProps) {
    return (
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

                <h2 className="card-title">
                    {post.title}
                </h2>

                <p className="line-clamp-3 text-base-content/80">
                    {post.body}
                </p>

                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="badge badge-outline"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <div className="flex gap-4 text-sm">
                        <span>👍 {post.reactions.likes}</span>
                        <span>👎 {post.reactions.dislikes}</span>
                    </div>

                    <Link
                        to={`/posts/${post.id}`}
                        className="btn btn-primary btn-sm"
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </article>
    );
}
