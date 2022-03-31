// Get your personal access token at:
// https://developer.webex.com/docs/getting-started#accounts-and-authentication
var personal_access_token = "<your_access_token>"

const webex = window.webex = Webex.init({
  credentials: {
    access_token: personal_access_token,
  },
});

webex.once(`ready`, function () {
  var createdRooms;
  log("Webex ready")
});

listElement = document.getElementById("list-group");
var newRooms = [];

function sendMessage() {
  // send message to createdRoom room
  var messageText = document.getElementById("message").value;
  var roomID = document.getElementById("roomid-message").value;
  // if (newRooms.length) {
    webex.messages.create({
      text: messageText,
      roomId: roomID,
    }).then(function (message) {
      log("Message sent to room.")
    });
  // }  
  //  else {
  //   log("Click 'Create room' and then send the message");
  // }
}

function createRoom() {
  var roomName = document.getElementById("roomName").value;
  if (roomName == "") {
    log("Enter a room name.")
    return;
  }  
  webex.rooms.create({ title: roomName }).then(function (room) {
    newRooms.push({
      id:   room.id,
      title: room.title
    });    
    log("<i>Created room</i>:" + room.title + " (ID: " + room.id + ")")
  }).catch(function(error){
    log(error)
  });

  // if (createdRoom) {
  //   log("New room (" + createRoom.title + ") already created. Click Delete Room to create a new room.")
  //   return;
  // }
}

function deleteRoom() {
  var roomID = document.getElementById("roomid-delete").value;

  if (roomID) {
    webex.rooms.remove(roomID).then(function () {
      log("Room deleted")
      document.getElementById("roomid").value = ""
    }).catch(function(error) {
      log(error)
    })
  } else {
    log("Enter the ID of the room to delete.")
  }
}

function listRooms() {
  listElement = document.getElementById("list-group");
  listElement.innerHTML ="";
  webex.rooms.list({max: 10}).then(function (rooms) {
    if (rooms.items.length == 0) {
      log("<i>There are no rooms. Click 'Create a new room'.</i>");
    } else {
      for (var i = 0; i < rooms.items.length; i += 1) {
        log(rooms.items[i].title + " (ID: " + rooms.items[i].id + ")");
      }
    }
  }).catch(function (error) {
    log(error);
  });
}

function addUser() {
  var roomID = document.getElementById("roomid-adduser").value;
  webex.memberships.create({
     personEmail: 'tim.statler@gmail.com',
     roomId: roomID
   }).then(function(membership) {
      log(membership.personEmail + " added to room");
   }).catch(function(error) {
     log(error)
   });
}



// Log helper
function log(data) {
  var listItem = document.createElement("li");
  // listItem.style.display = "block";
  listItem.classList.add("list-group-item");
  listItem.innerHTML = data;
  listElement.prepend(listItem);

}



// // index.js
// const webex = window.Webex.init({
//     credentials: {
//       client_id: 'C92bf28bea6ba9209d552b6820981bc099d469483c4293f608595f91d8c15014b',
//       redirect_uri,
//       scope: 'spark:all'
//     }
//   // credentials: {
//   //   access_token: `NzZmNmRmNWMtMmQ3Ni00Y2Q1LTljMDAtYWJlM2NlYmY3NzcwYjcyNWI4MWEtZjdk_P0A1_24d5456b-c672-4ced-a782-2192b5ca4d1f`,
//   // },
// });

