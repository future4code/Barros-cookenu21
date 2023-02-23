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
      const userToken = await userDatabase.findUserId(userId.id)
      if(!userToken){
        throw new erros.Unauthorized();
      }      
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
      const userToken = await userDatabase.findUserId(userId.id)
      if(!userToken){
        throw new erros.Unauthorized();
      } 
      const result:postDTO.PostFindDBDTO = await postDatabase.findPost(id)
      if (!result) {
        throw new erros.InvalidFindPostId();
     }
      const formatDate = dateFormatBr(result.created_at.toString())
      
     const post:postDTO.PostFindDTO = {
      id: result.id,
      title: result.title,
      description: result.description,
      createdAt: formatDate
     }

     return post;

    } catch (error:any) {
      throw new erros.CustomError(400, error.message);
    }
  };

  findPostAll = async(input:postDTO.PostTokenDTO):Promise<postDTO.PostFindDTO[]>=> {
    try {

      const { authorId } = input;
            
      if(!authorId) {
        throw new erros.InvalidFind();
      }
      const userId = tokenGenerator.tokenData(authorId);
      const userToken = await userDatabase.findUserId(userId.id)
      if(!userToken){
        throw new erros.Unauthorized();
      } 
      const result:postDTO.PostFindDBDTO[] = await postDatabase.findPostAll();
      if (result.length === 0) {
        throw new erros.InvalidPostAll();
     }
    
     let post:postDTO.PostFindAllDTO[] =[]

     for (let i = 0; i < result.length; i++) {
       const formatDate = dateFormatBr(result[i].created_at.toString())
       post.push({
        id: result[i].id,
        title: result[i].title,
        description: result[i].description,
        createdAt: formatDate,
        authorId: result[i].author_id
       })
     }

     return post;

    } catch (error:any) {
      throw new erros.CustomError(400, error.message);
    }
  };

  feedPost = async(input:Authentication):Promise<postDTO.FeedPostDTO[]> => {
    try {
      const userId = tokenGenerator.tokenData(input.id);
      const userToken = await userDatabase.findUserId(userId.id)
      if(!userToken){
        throw new erros.Unauthorized();
      }       
      const queryfollow: followDTO.FollowInputDTO[] = await followDatabase.findFollow(userId.id);
      if(queryfollow.length === 0){
        throw new erros.InvalidNoFollowers();
      }
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
      const userToken = await userDatabase.findUserId(token.id)
      if(!userToken){
        throw new erros.Unauthorized();
      } 
      if(!id || !title || !description){
        throw new erros.InvalidBodyEdit();        
      };
      const postUser = await postDatabase.findPost(id);
      if(!postUser){
        throw new erros.InvalidNoRecipe();        
      }      
      if(postUser.author_id.toString !== token.id.toString){
        throw new erros.InvalidNoAuthorRecipe();        
      }
      console.log(token.role);
      
      if (token.role !== UserRole.NORMAL){
        throw new erros.UnauthorizedType()
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
      const userToken = await userDatabase.findUserId(token.id)
      if(!userToken){
        throw new erros.Unauthorized();
      } 
      if(!id){
        throw new erros.InvalidProfileUser();        
      };
      const postUser = await postDatabase.findPost(id);
      if(!postUser){
        throw new erros.InvalidNoRecipe();        
      }
      if(postUser.author_id !== token.id && token.role === UserRole.NORMAL){
        throw new erros.InvalidRecipeDeleted();        
      }
      
      await postDatabase.deletePost(input);

    } catch (error:any) {
      throw new erros.CustomError(400, error.message);      
    }
  };
}