import { FollowDatabase } from "../data/FollowDatabase";
import { UserDatabase } from "../data/UserDatabase";
import * as followDTO from "../model/Follow";
import * as errors from "../error/FollowCustomError";
import { IdGenerator } from "../service/IdGenerator";
import { TokenGenerator } from "../service/TokenGenerator";

const followDatabase = new FollowDatabase();
const userDatabase = new UserDatabase();
const  idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

export class FollowBusiness {
  createFriendship = async (input: followDTO.FollowInputControllDTO): Promise<void> => {
    try {
      const { followingId, authorId } = input;
      
      const userId = tokenGenerator.tokenData(authorId);
      const userToken = await userDatabase.findUserId(userId.id)
      if(!userToken){
        throw new errors.Unauthorized();
      }  

      if (!followingId || !authorId) {
        throw new errors.InvalidInputFollow();
      }

      const queryUser = await userDatabase.profile(followingId);
      
      if (!queryUser) {
        throw new errors.InvalidFollowingId();
      }

      input = {
        followingId,
        authorId:userId.id
      }
       
      const id: string = idGenerator.generateId();
      
      const queryFollowing: followDTO.FollowInputDTO =
      await followDatabase.findFollowing(input);
            
      if (queryFollowing) {
        throw new errors.InvalidFollow();
      }
      
      await followDatabase.insertFollow({
        id,
        followingId,
        authorId:userId.id
      });
    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };

  findFollow = () => {};

  deleteFollower = async (input: followDTO.DeleteFollowInputDTO): Promise<void> => {
    try {
      const { followingId, authorId } = input;

      const userId = tokenGenerator.tokenData(authorId);  
      const userToken = await userDatabase.findUserId(userId.id)
      if(!userToken){
        throw new errors.Unauthorized();
      }

      if (!followingId || !authorId) {
        throw new errors.InvalidInputFollow();
      }

      const queryUser = await userDatabase.profile(followingId);
      
      if (!queryUser) {
        throw new errors.InvalidFollowingId();
      }

      input = {
        followingId,
        authorId:userId.id
      }

      const queryFollowing: followDTO.FollowInputDTO =
      await followDatabase.findFollowing(input);
            
      if (!queryFollowing) {
        throw new errors.InvalidFollowing();
      }

      await followDatabase.deleteFollow(input);
    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };
}
