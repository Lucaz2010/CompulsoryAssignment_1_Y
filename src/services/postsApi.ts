/**
 * API layer
 *
 * This file keeps fetch() out of our components
 */

import type {
    Post,
    PostsResponse,
    CreatePostResponse,
    Comment,
    CommentsResponse
} from "@/types/post.ts";

const API_URL = "https://dummyjson.com"

export async function getPosts(): Promise<PostsResponse> {
    const response = await fetch(`${API_URL}/posts`)
    if (!response.ok) {
        throw new Error("Failed to fetch posts")
    }
    return response.json()
}

export async function getPost(id: string | undefined): Promise<Post> {
    const response = await fetch(`${API_URL}/posts/${id}`)
    if (!response.ok) {
        throw new Error("Failed to get post")
    }
    return response.json()
}

export async function searchPosts(query: string): Promise<PostsResponse> {
    const response = await fetch(
        `${API_URL}/posts/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
        throw new Error("Failed to search posts")
    }
    return response.json()
}

export async function getPostsByTag(slug:string): Promise<PostsResponse>{
    const response = await fetch(`${API_URL}/posts/tag/${slug}`)
    if (!response.ok) {
        throw new Error("Failed to fetch posts by tags")
    }
    return response.json()
}

export async function getPostTags(): Promise<string[]> {
    const res = await fetch(`${API_URL}/posts/tag-list/`)
    if (!res.ok) {
        throw new Error("Failed to fetch tags")
    }
    return res.json()
}

export async function getCommentsByPostId(postId: string | undefined): Promise<CommentsResponse> {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`)

    if (!response.ok){
        throw new Error("Failed to get comments")
    }
    return response.json()
}



export async function createPost(
    post: CreatePostResponse,
): Promise<Post> {
    const response = await fetch(`${API_URL}/posts/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();

}

export async function deletePost(id: number): Promise<Post> {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete post");
    }

    return response.json();
}
