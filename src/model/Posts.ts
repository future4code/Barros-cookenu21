 
 export type TPost = {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    authorId: string
 }

 export interface FeedPostDTO{
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    userId: string,
    userName: string
 }

 export interface PostFindDTO{
    id: string,
    title: string,
    description: string,
    createdAt: string
 }

 export interface PostFindAllDTO{
    id: string,
    title: string,
    description: string,
    createdAt: string
    authorId: string
 }

 export interface PostFindDBDTO{
    id: string,
    title: string,
    description: string,
    created_at: Date,
    author_id: string
 }

 export interface InpultPostDTO{
    title: string,
    description: string,
    authorId: string
 }
 
 export interface InpultDBDTO{
    id:string,
    title: string,
    description: string,
    authorId: string
 }

 export interface PostIdDTO{
    id: string,
    authorId: string
 }
 
 export interface PostTokenDTO{
    authorId: string
 }
