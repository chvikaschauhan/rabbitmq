import * as express from 'express';
import * as statuscontroller from './controller/status';

const app = express();
 app.set("port",process.env.PORT || 3000);
 

 app.get("/",(req,res)=>{

    res.send("hello");
     
 })

 app.get("/send",statuscontroller.send);
 app.get("/receiver",statuscontroller.receiver);
 export default app;
