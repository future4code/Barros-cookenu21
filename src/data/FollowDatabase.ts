import { BaseDatabase } from "./BaseDatabase";
import * as followDTO from "../model/Follow";
import * as errors from "../error/FollowCustomError"
import { Authentication } from "../model/User";

export class FollowDatabase extends BaseDatabase {
  private static TABLE_NAME = "cookenu_follow";
  insertFollow = async (follow: followDTO.FollowInputDataDTO): Promise<void> => {
    try {
        const {id, followingId, authorId} = follow
      await FollowDatabase.connection
        .insert({
          id: id,
          following_id: followingId,
          author_id: authorId
        })
        .into(FollowDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };

  findFollow = async (userid: string): Promise<followDTO.FollowInputDTO[]> => {
    try {
      const follows: followDTO.FollowInputDTO[] = [];

      const result = await FollowDatabase.connection
        .select("*")
        .from(FollowDatabase.TABLE_NAME)
        .where({ author_id: userid });

      for (let follow of result) {
        follows.push(follow);
      }

      return follows;
    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };
  findFollowing = async (input: followDTO.FollowInputControllDTO): Promise<followDTO.FollowInputDTO> => {
    try {

      const { followingId, authorId} = input;

      const result = await FollowDatabase.connection
        .select("*")
        .from(FollowDatabase.TABLE_NAME)
        .where({ author_id: authorId, following_id: followingId });

      return result[0];
    } catch (error: any) {
      throw new errors.CustomError(400, error.message);
    }
  };
  deleteFollow = async (input: followDTO.DeleteFollowInputDTO): Promise<void> => {
    try {
      const { followingId, authorId } = input;

      await FollowDatabase.connection
        .from(FollowDatabase.TABLE_NAME)
        .where({ author_id: authorId, following_id: followingId })
        .delete();
      } catch (error: any) {
        throw new errors.CustomError(400, error.message);
    }
  };
  deleteUserFollow = async (input:string): Promise<void> => {
    try {
      
      await FollowDatabase.connection
        .from(FollowDatabase.TABLE_NAME)
        .where({ author_id: input})
        .delete();
      } catch (error: any) {
        throw new errors.CustomError(400, error.message);
    }
  };
}
