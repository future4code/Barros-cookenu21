import app from "./controller/app"
import { userRouter } from "./controller/router/userRouter"
import { postRouter } from "./controller/router/postRouter"
import { friendshipRouter } from "./controller/router/FriendshipRouter"


/**************************** ENDPOINTS ******************************/
app.use('/user', userRouter)
app.use('/post', postRouter);
app.use('/friendship', friendshipRouter);



