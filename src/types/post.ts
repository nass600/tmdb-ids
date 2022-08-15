export type Post = {
    forumId: number;
    threadId: number;
    link: string;
    date: Date;
    author: string;
    title: string;
}

export type Movie = {
    title: string;
}

export enum MessageType {
    SEND_POSTS = 'SEND_POSTS'
}

export enum ResponseType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}
