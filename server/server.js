const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname,'../public');
const port =process.env.PORT||3000;

var app=express();
var server=http.createServer(app);
var io=socketIO(server);
const {generateMessage,generateLocationMessage}=require('./utils/message');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New User Connected!.');

socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));

socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

//On receiving

socket.on('createMessage',(message)=>{
  console.log('createMessage',message);
  io.emit('newMessage',generateMessage(message.from,message.text));
})

socket.on('createLocationMessage',(coords)=>{
  io.emit('newLocationMessage',generateLocationMessage('User',coords.latitude,coords.longitude));
  console.log('Recieved request');
 });
 

});


server.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});
