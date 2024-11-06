import express, {Application} from "express"
import cors from "cors"
import routerUser from "./routes/userRoute"
import routerPost from "./routes/postRoute"
import routerLike from "./routes/likeRoute"
import routerFollow from "./routes/followRoute"
import routerCheck from "./routes/healthCheckRoute"
import errorHandler from "./middleware/errorHandler"
import routerLogin from "./routes/loginRoute"

//import {appDataSource} from "./data-source"


const app: Application = express()
app.use(express.json())
app.use(cors())

app.use('/webmob', routerUser);
app.use('/webmob', routerPost);
app.use('/webmob', routerLike);
app.use('/webmob', routerFollow);
app.use('/webmob', routerCheck);
app.use('/webmob', routerLogin);

app.use(errorHandler)


export default app