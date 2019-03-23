import { Request, Response } from 'express'

import * as amqp from 'amqplib/callback_api';

export let send = (req: Request, res: Response) => {
   
     var msg=req.query.msg;
     // connect to rabbitmq
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q,  Buffer.from(msg));
    console.log(" [x] sent ",msg);
  });
  res.send("message send"+msg);
 //setTimeout(function() { conn.close(); process.exit(0) }, 500);
});

}

export let receiver = (req: Request, res: Response) => {
       // add receiver
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
    var msg2 =  msg.content.toString();
 
     // res.send("message=" +  msg.content.toString());
      console.log(" [x] Received %s", msg.content.toString());
      res.send(msg2);
      
    }, {noAck: true});
  });
  
});

}

