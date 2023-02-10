enum TPOST_TYPES {
    NORMAL = "normal",
    EVENT = "event"
 }
 
 export type TPost = {
    id: string,
    photo: string,
    description: string,
    type: TPOST_TYPES,
    createdAt: Date,
    authorId: string
 }

 export interface FeedPostDTO{
    id: string,
    photo: string,
    description: string,
    type: TPOST_TYPES,
    createdAt: Date,
    authorId: string
 }
 export interface FeedPostDBDTO{
    id: string,
    photo: string,
    description: string,
    type: TPOST_TYPES,
    created_at: Date,
    author_id: string
 }
 export interface InpultPostDTO{
    photo: string,
    description: string,
    type: TPOST_TYPES,
    createdAt: Date,
    authorId: string
 }

 export interface PostIdDTO{
    id: string,
 }

 export interface PostTypeDTO{
   type: TPOST_TYPES
 }