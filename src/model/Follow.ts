export interface FollowInputDTO{
    id: string,
    following_id: string,
    author_id: string

}
export interface FollowInputControllDTO{
    followingId: string,
    authorId: string

}
export interface FollowInputDataDTO{
    id: string,
    followingId: string,
    authorId: string

}
export interface DeleteFollowInputDTO{
    followingId: string,
    authorId: string

}