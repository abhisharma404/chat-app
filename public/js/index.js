var socket=io();

socket.on('connect',function(){
  console.log('Connected to server.');
});

  socket.on('newMessage',function(message){
    console.log('newMessage',message);
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var li=jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
  });

socket.on('disconnect',function(){
  console.log('Disconnected from server.');
});

socket.on('newLocationMessage',function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
  li =jQuery('<li></li>');
  a=jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from} ${formattedTime}:`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  
  socket.emit('createMessage',{
    from:'User',
    text: jQuery('[name=message]').val()
  })
jQuery('[name=message]').val(" ");
})

var locationButton = jQuery('#send-location');
locationButton.on('click',function(e){
console.log('Fetching location');
  if (!navigator.geolocation){
    return alert('Geo Location not supported by your browser.')
  }

  locationButton.attr('disabled','disabled').text('Sending Location...')

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location...')
    //console.log(position);
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    })
  },function(){
    locationButton.removeAttr('disabled').text('Send Location...')
    alert('Unable to fetch location!');
  })

})