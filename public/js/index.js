var socket=io();

socket.on('connect',()=>{
  console.log('Connected to server.');

  socket.emit('createMessage',{
    from:'Abhishek',
    text:'Working fine for me!.'
  });
  socket.on('newMessage',function(message){
    console.log('newMessage',message);
  })
});

socket.on('disconnect',()=>{
  console.log('Disconnected from server.');
});