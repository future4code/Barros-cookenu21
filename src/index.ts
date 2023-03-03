import app from "./controller/app"
import { userRouter } from "./controller/router/userRouter"
import { postRouter } from "./controller/router/postRouter"


/**************************** ENDPOINTS ******************************/
app.use('/signup', userRouter);
app.use('/login', userRouter);
app.use('/user', userRouter);
app.use('/recipe', postRouter);




