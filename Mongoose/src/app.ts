import express, {Response, Request} from "express";
import cors from "cors"
const app = express()

//parsers
app.use(express.json());
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    let a = 10;
  res.send('Hello World!')
})


export default app
