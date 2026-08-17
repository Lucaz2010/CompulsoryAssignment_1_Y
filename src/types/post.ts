export interface Post {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: {
        likes: number
        dislikes: number
    }
    views: number
    userId: number
}

export interface PostsResponse {
    posts: Post[]
    total: number
    skip: number
    limit: number
}

export interface CreatePostResponse {
    title: string
    body: string
    userId: number
}

export interface Comment {
    id: number
    body: string
    user:{
        id: number
        name: string
        fullName: string
    }
}

export interface CommentsResponse {
    comments: Comment[]
    total: number
    skip: number
    limit: number
}