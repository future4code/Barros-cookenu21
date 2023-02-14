import { PostDatabase } from "../data/PostDatabase";
import { UserDatabase } from "../data/UserDatabase";
import * as erros from "../error/PostCustomError";
import * as postDTO from "../model/Posts";
import * as followDTO from "../model/Follow";
import { dateFormatBr } from "../service/formatDate";
import { IdGenerator } from "../service/IdGenerator";
import { TokenGenerator } from "../service/TokenGenerator";
import { FollowDatabase } from "../data/FollowDatabase";
import { Authentication, UserRole } from "../model/User";

const postDatabase = new PostDatabase();
const userDatabase = new UserDatabase();
const followDatabase = new FollowDatabase();
const  idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

export class PostBusiness {
  createPost = async (input: postDTO.InpultPostDTO): Promise<void> => {
    try {
      const { title, description, authorId } = input;

      if (!title || !description || !authorId) {
        throw new erros.InvalidTitle();
      }      
      const userId = tokenGenerator.tokenData(authorId);       
      const id: string = idGenerator.generateId();

      await postDatabase.insertPost({
        id, 
        title, 
        description, 
        authorId:userId.id
      })
    
    } catch (error:any) {
      throw new erros.CustomError(400, error.message);
    }
  };

  findPost = async(input:postDTO.PostIdDTO):Promise<postDTO.PostFindDTO>=> {
    try {

      const { id, authorId } = input;
            
      if(!id || !authorId) {
        throw new erros.InvalidFind();
      }
      const userId = tokenGenerator.tokenData(authorId);
      const result:postDTO.PostFindDBDTO[] = await postDatabase.findPost(id)
      const formatDate = dateFormatBr(result[0].created_at.toString())
    
      if (!result[0]) {
        throw new erros.InvalidFindPostId();
     }
     const post:postDTO.PostFindDTO = {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      createdAt: formatDate
     }

     return post;

    } catch (error:any) {
      throw new erros.CustomError(400, error.message);
    }
  };

  feedPost = async(input:Authentication):Promise<postDTO.FeedPostDTO[]> => {
    try {
      const userId = tokenGenerator.tokenData(input.id);
      
      const queryfollow: followDTO.FollowInputDTO[] = await followDatabase.findFollow(userId.id);
      const existfollowhip = queryfollow.findIndex((user) => {
        return user.author_id === userId.id;
      });

      if (existfollowhip === -1) {
        throw new erros.InvalidNoFollowers();
      }

      const follow:string[] = []
           
      for (let i = 0; i < queryfollow.length; i++) {
         follow.push(queryfollow[i].following_id);        
      }
      const posts: postDTO.FeedPostDTO[] = [];     
      const result:postDTO.PostFindDBDTO[] = await postDatabase.feedPost(follow)
      result.map((item:any)=>{
        item.created_at = dateFormatBr(item.created_at.toString())
        return result
    })
      for (let i = 0; i < result.length; i++) {
        let user = await userDatabase.findUserId(result[i].author_id);
        posts.push({
          id: result[i].id,
          title: result[i].title,
          description: result[i].description,
          createdAt: result[i].created_at,
          userId: result[i].author_id,
          userName: user.name }
        )
        
      }
      
      return posts
    } catch (error:any) {
      throw new erros.CustomError(400, error.message);
    }
  };

  editPost = async (input:postDTO.InpultDBDTO):Promise<void> => {
    try {
      const {id, title, description, authorId} = input;
      const token = tokenGenerator.tokenData(authorId);
      if(!id || !title || !description){
        throw new erros.InvalidBodyEdit();        
      };
      const postUser = await postDatabase.findPost(id);
      if(postUser.length === 0){
        throw new erros.InvalidNoRecipe();        
      }
      const authorPost = postUser.findIndex((user)=>{
        return user.author_id === token.id;
      })
      if(authorPost === -1){
        throw new erros.InvalidNoAuthorRecipe();        
      }
      if (token.role !== UserRole.NORMAL){
        throw new erros.Unauthorized()
      }
      await postDatabase.editPost(input);

    } catch (error:any) {
      throw new erros.CustomError(400, error.message);      
    }
  };
  
  deletePost = async (input:postDTO.PostIdDTO):Promise<void> => {
    try {
      const {id, authorId} = input;
      const token = tokenGenerator.tokenData(authorId);
      if(!id){
        throw new erros.InvalidProfileUser();        
      };
      const postUser = await postDatabase.findPost(id);
      if(postUser.length === 0){
        throw new erros.InvalidNoRecipe();        
      }
      const authorPost = postUser.findIndex((user)=>{
        return user.author_id === token.id;
      })
      if(authorPost === -1 && token.role === UserRole.NORMAL){
        throw new erros.InvalidNoAuthorRecipe();        
      }
      
      await postDatabase.deletePost(input);

    } catch (error:any) {
      throw new erros.CustomError(400, error.message);      
    }
  };
}