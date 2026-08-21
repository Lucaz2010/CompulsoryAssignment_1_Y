import {Link} from "react-router";
import type {Post} from "@/types/post.ts";
import {useEffect, useState} from "react";
import {getCommentCountByPostId} from "@/services/postsApi.ts";

interface PostCardProps {
    post: Post;
}

export function PostCard({post}: PostCardProps) {

    const [commentCount, setCommentCount] = useState<number | null>(null);
    const reactions =post.reactions || { likes: 0, dislikes: 0 };
    const tags = Array.isArray(post.tags) ? post.tags : [];

    useEffect(() => {
        let isCurrent = true;

        getCommentCountByPostId(post.id)
            .then((count) => {
                if (isCurrent) {
                    setCommentCount(count);
                }
            })
            .catch(() => {
                if (isCurrent) {
                    setCommentCount(0);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, [post.id]);

    return (
        <article className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-base-content/60">
                        user#{post.userId}
                    </span>

                </div>

                <h2 className="card-title">
                    {post.title}
                </h2>

                <p className="line-clamp-3 text-base-content/80">
                    {post.body}
                </p>

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="badge badge-outline">
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <div className="flex gap-4 text-sm">
                        <span>👍 {reactions.likes}</span>
                        <span>👎 {reactions.dislikes}</span>
                        <span> 👁️️️ {post.views??0} </span>
                        <span>💬 {commentCount ?? "..."}</span>
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
