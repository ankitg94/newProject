import express,{json} from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import { ConnectionDataBase } from "./config/ConnectDb.js"
import AuthRoute from "./Route/AtuhRoute.js"
import CatRoute from "./Route/CategoryRoute.js"
import ProductRoute from "./Route/ProductRoute.js"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
configDotenv()
ConnectionDataBase()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}
))
app.use(json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, './client/build')))
app.use("/api/v1/auth",AuthRoute)
app.use("/api/v1/cat",CatRoute)
app.use("/api/v1/product",ProductRoute)

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

const Port =process.env.PORT || 8080

app.listen(Port,()=>{
    console.log(`Server Running at the ${process.env.Mode} mode  ${Port} Port `)
})





