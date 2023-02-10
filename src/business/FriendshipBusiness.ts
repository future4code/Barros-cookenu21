import { FriendshipDatabase } from "../data/FriendshipDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { FriendInputDTO } from "../model/friends";
import { DeleteFriendshipInputDTO, FriendshipInputDTO} from "../model/Friendship";
import { IdGenerator } from "../service/IdGenerator";

const friendshipDatabase = new FriendshipDatabase();
const userDatabase = new UserDatabase();
const  idGenerator = new IdGenerator();

export class FriendshipBusiness {
  createFriendship = async (input: FriendInputDTO): Promise<void> => {
    try {
      const { friendId, authorId } = input;

      if (!friendId || !authorId) {
        throw new Error("Fill in the friendId, authorId fields");
      }

      const queryUser = await userDatabase.findUser();
      const existFriend = queryUser.findIndex((user) => {
        return user.id === friendId;
      });

      if (existFriend === -1) {
        throw new Error("Friend id does not exist.");
      }

      const existauthorId = queryUser.findIndex((user) => {
        return user.id === authorId;
      });

      if (existauthorId === -1) {
        throw new Error("User id does not exist.");
      }

      const id: string = idGenerator.generateId();
      
      const queryResult: FriendshipInputDTO[] =
      await friendshipDatabase.findFriendship(authorId);
      
      const existFriendship = queryResult.findIndex((user) => {
        return user.friend_id === friendId;
      });
      
      if (existFriendship != -1) {
        throw new Error("friendship already exists!");
      }
      const idFriend: string = idGenerator.generateId();
      
      await friendshipDatabase.insertPost({
        id,
        idRows: idFriend,
        friendId,
        authorId,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  findFriendship = () => {};

  deleteFriendship = async (input: DeleteFriendshipInputDTO): Promise<void> => {
    try {
      const { friendId, authorId } = input;

      if (!friendId || !authorId) {
        throw new Error("Fill in the friendId, authorId fields");
      }

      const queryUser = await userDatabase.findUser();
      const existFriend = queryUser.findIndex((user) => {
        return user.id === friendId;
      });

      if (existFriend === -1) {
        throw new Error("Friend id does not exist.");
      }

      const existauthorId = queryUser.findIndex((user) => {
        return user.id === authorId;
      });

      if (existauthorId === -1) {
        throw new Error("User id does not exist.");
      }

      const queryResult: FriendshipInputDTO[] = await friendshipDatabase.findFriendship(authorId);

      const existFriendship = queryResult.findIndex((user) => {
        return user.friend_id === friendId;
      });

      if (existFriendship === -1) {
        throw new Error("friendship does not exist!");
      }

      await friendshipDatabase.deletePost(input);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
