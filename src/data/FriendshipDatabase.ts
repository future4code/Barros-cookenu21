import { BaseDatabase } from "./BaseDatabase";
import {
  DeleteFriendshipInputDTO,
  FriendshipInputDataDTO,
  FriendshipInputDTO
  } from "../model/Friendship";

export class FriendshipDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_friendship";
  insertPost = async (friend: FriendshipInputDataDTO): Promise<void> => {
    try {
      await FriendshipDatabase.connection
        .insert({
          id: friend.id,
          friend_id: friend.friendId,
          author_id: friend.authorId,
        })
        .into(FriendshipDatabase.TABLE_NAME);

      await FriendshipDatabase.connection
        .insert({
          id: friend.idRows,
          friend_id: friend.authorId,
          author_id: friend.friendId,
        })
        .into(FriendshipDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  findFriendship = async (userid: string): Promise<FriendshipInputDTO[]> => {
    try {
      const friends: FriendshipInputDTO[] = [];

      const result = await FriendshipDatabase.connection
        .select("*")
        .from(FriendshipDatabase.TABLE_NAME)
        .where({ author_id: userid });

      for (let friend of result) {
        friends.push(friend);
      }

      return friends;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  deletePost = async (input: DeleteFriendshipInputDTO): Promise<void> => {
    try {
      const { friendId, authorId } = input;

      await FriendshipDatabase.connection
        .from(FriendshipDatabase.TABLE_NAME)
        .where({ author_id: authorId, friend_id: friendId })
        .delete();
      
        await FriendshipDatabase.connection
        .from(FriendshipDatabase.TABLE_NAME)
        .where({ author_id: friendId, friend_id: authorId })
        .delete();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
