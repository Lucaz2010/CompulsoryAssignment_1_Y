import type {Comment} from "@/types/post.ts";

interface CommentListProps {
    comments: Comment[];
}

export function CommentList({comments}: CommentListProps) {
    //console.log(comments);
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <span>User #{comment.user.id}</span>
                    <p>{comment.body}</p>

                </div>
            ))}
        </div>

    );

}