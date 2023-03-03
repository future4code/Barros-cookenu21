import { Request, Response } from "express";
import { FollowBusiness } from "../business/FollowBusiness";
import * as followDTO from "../model/Follow";
const followBusiness = new FollowBusiness();
export class FollowController {
  createFollow = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: followDTO.FollowInputControllDTO = {
        followingId: req.body.userToFollowId,
        authorId: req.headers.authorization as string
      };

      await followBusiness.createFriendship(input)

      res.status(201).send({ message: "Followed successfully!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  deleteFollow = async(req:Request, res:Response):Promise<void> => {
      try {
        const input: followDTO.DeleteFollowInputDTO = {
          followingId: req.body.userToUnfollowId,
          authorId: req.headers.authorization as string
        };

        await followBusiness.deleteFollower(input)
        res.status(200).send({ message: "Unfollowed successfully" });
      } catch (error:any) {
        res.status(400).send(error.message);
      }
  };
}
