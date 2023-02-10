import { FriendshipDatabase } from "../data/FriendshipDatabase";
import { PostDatabase } from "../data/PostDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { FriendshipInputDTO } from "../model/Friendship";
import { FeedPostDBDTO, FeedPostDTO, InpultPostDTO, PostIdDTO, PostTypeDTO, TPost } from "../model/Posts";
import { dateFormat, dateFormatBr } from "../service/formatDate";
import { IdGenerator } from "../service/IdGenerator";

const postDatabase = new PostDatabase();
const userDatabase = new UserDatabase();
const friendshipDatabase = new FriendshipDatabase();
const  idGenerator = new IdGenerator();

export class PostBusiness {
  createPost = async (input: InpultPostDTO): Promise<void> => {
    try {
      const { photo, description, type, createdAt, authorId } = input;

      if (!photo || !description || !type || !createdAt || !authorId) {
        throw new Error(
          'Fill in the fields photo, description, type, authorId'
        );
      }
           

      if(type.toUpperCase() !== "normal".toUpperCase() && type.toUpperCase() !== "event".toUpperCase()){
        throw new Error(
          'Fill in the fields type: normal or event'
        );
      }

      const queryUser = await userDatabase.findUser();
      const existUser = queryUser.findIndex((user)=>{
        return user.id === authorId
      })
      
      if(existUser === -1){
        throw new Error("User id does not exist.")
      } 
      
      const formatDate:any= dateFormat(createdAt.toString())

      const id: string = idGenerator.generateId();

      await postDatabase.insertPost({
        id, 
        photo, 
        description, 
        type, 
        createdAt:formatDate, 
        authorId
      })
    
    } catch (error:any) {
        throw new Error(error.message)
    }
  };

  findPost = async(input:PostIdDTO):Promise<TPost[]>=> {
    try {

      const { id } = input;

      if(!id){
        throw new Error('Pass the id params');
      }

      const result:TPost[] = await postDatabase.findPost(id)
      if (!result[0]) {
        throw new Error("Post not found");
     }
     return result;

    } catch (error:any) {
      throw new Error(error.message)
    }
  };

  feedPost = async(input:PostIdDTO):Promise<FeedPostDTO[]> => {
    try {
      const {id} = input;
            
      const queryUser = await userDatabase.findUser();
      const existUser = queryUser.findIndex((user)=>{
        return user.id === id
      })
      
      if(existUser === -1){
        throw new Error("User id does not exist.")
      } 

      const queryFriends: FriendshipInputDTO[] = await friendshipDatabase.findFriendship(id);
      const existFriendship = queryFriends.findIndex((user) => {
        return user.author_id === id;
      });

      if (existFriendship === -1) {
        throw new Error("friendship already exists!");
      }

      const friends:string[] = []
           
      for (let i = 0; i < queryFriends.length; i++) {
         friends.push(queryFriends[i].friend_id);        
      }
      const posts: FeedPostDTO[] = [];     
      const result:FeedPostDBDTO[] = await postDatabase.feedPost(friends)
      result.map((item:any)=>{
        item.created_at = dateFormatBr(item.created_at.toString())
        return result
    })
      for (let i = 0; i < result.length; i++) {
        posts.push({
          id: result[i].id,
          photo: result[i].photo,
          description: result[i].description,
          type: result[i].type,
          createdAt: result[i].created_at,
          authorId: result[i].author_id}
        )
        
      }
      
      return posts
    } catch (error:any) {
      throw new Error(error.message)
    }
  };
  feedPostAll = async(input:PostTypeDTO) => {
    try {
      
      const{type} = input;

      if(type.toUpperCase() !== "normal".toUpperCase() && type.toUpperCase() !== "event".toUpperCase()){
        throw new Error(
          'Fill in the field type: normal or event'
        );
      }      
      const posts: FeedPostDTO[] = [];  
      const result:FeedPostDBDTO[] = await postDatabase.feedPostAll(input)
      result.map((item:any)=>{
        item.created_at = dateFormatBr(item.created_at.toString())
        return result
    }) 
      
      for (let i = 0; i < result.length; i++) {
        posts.push({
          id: result[i].id,
          photo: result[i].photo,
          description: result[i].description,
          type: result[i].type,
          createdAt: result[i].created_at,
          authorId: result[i].author_id}
        )
        
      }

      return posts
    } catch (error:any) {
      throw new Error(error.message)
    }
  };
  deletePost = () => {};
}