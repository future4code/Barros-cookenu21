export type TFriendship = {
    id: string,
    friendId: string,
    authorId: string

}
export interface FriendshipInputDTO{
    id: string,
    friend_id: string,
    author_id: string

}
export interface FriendshipInputDataDTO{
    id: string,
    idRows: string,
    friendId: string,
    authorId: string

}
export interface DeleteFriendshipInputDTO{
    friendId: string,
    authorId: string

}