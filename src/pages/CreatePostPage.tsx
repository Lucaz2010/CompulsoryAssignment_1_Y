import {useState} from "react";
import type {SubmitEvent} from "react";
import {Link, useNavigate} from "react-router";
import {createPost} from "@/services/postsApi.ts";

export function CreatePostPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState("1");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setError(null);
        setLoading(true);

        try {
            const post = await createPost({
                title,
                body,
                userId: Number(userId),
            });
            navigate(`/posts/${post.id}`);
        } catch {
            setError("Could not create post.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="mx-auto max-w-2xl px-4 py-8">
            <Link to="/" className="btn btn-ghost mb-6">
                ← Back to feed
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Create post
                </h1>

                <p className="text-base-content/60">
                    Share something with the community.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="card bg-base-100 shadow-sm"
            >
                <div className="card-body space-y-4">
                    {error && (
                        <div className="alert alert-error">
                            <span>{error}</span>
                        </div>
                    )}
                    <label className="form-control">
                        <span className="label-text mb-2 font-medium">
                            Title
                        </span>

                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            maxLength={100}
                        />
                    </label>

                    <label className="form-control">
                        <span className="label-text mb-2 font-medium">
                            Body
                        </span>
                        <textarea
                            className="textarea textarea-bordered min-h-48 w-full"
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            required
                        />
                    </label>

                    <label className="form-control">
                        <span className="label-text mb-2 font-medium">
                            User ID
                        </span>

                        <input
                            type="number"
                            min="1"
                            className="input input-bordered w-full"
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                            required
                        />
                    </label>

                    <div className="card-actions justify-end">
                        <Link to="/" className="btn btn-ghost">
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            { loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm" />
                                    Creating...
                                </>
                            ) : (
                                "Create post"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}
