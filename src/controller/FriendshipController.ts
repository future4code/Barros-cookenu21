import { Request, Response } from "express";
import { FriendshipBusiness } from "../business/FriendshipBusiness";
import { FriendInputDTO } from "../model/friends";
import { DeleteFriendshipInputDTO } from "../model/Friendship";
const friendshipBusiness = new FriendshipBusiness();
export class FriendshipController {
  createFriendship = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: FriendInputDTO = {
        friendId: req.body.friendId,
        authorId: req.headers.authorization as string
      };

      await friendshipBusiness.createFriendship(input)

      res.status(201).send({ message: "Friendship created!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  findFriendship = () => {};

  deleteFriendship = async(req:Request, res:Response):Promise<void> => {
      try {
        const input: DeleteFriendshipInputDTO = {
          friendId: req.body.friendId,
          authorId: req.headers.authorization as string
        };

        await friendshipBusiness.deleteFriendship(input)
        res.status(201).send({ message: "deleted from friendship!" });
      } catch (error:any) {
        res.status(400).send(error.message);
      }
  };
}
