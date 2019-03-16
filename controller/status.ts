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
    console.log(" [x] Sent 'Hello World!'");
  });
 // setTimeout(function() { conn.close(); process.exit(0) }, 500);
});

res.send("message send"+msg);

}

export let receiver = (req: Request, res: Response) => {
  //  res.send("how's it going?")

var msg2
    // add receiver

    

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      msg2= msg.content.toString();
      res.send("message="+msg2);
      console.log(" [x] Received %s", msg.content.toString());
      
    }, {noAck: true});
  });
});

}

