// Initialize Webex with your personal access token
const webex = (window.webex = Webex.init({
  credentials: {
    access_token: "ZTQ3MGY0NTgtNWU0Zi00NjdjLTg4MTYtZmZiZGFlYTc0NzA5Y2UxMzNhYTktZDYz_P0A1_9c947ef3-ba2a-406e-9976-6a57f8f739b7",
  },
}));

var logger;

webex.once(`ready`, function () {
  output.value = "Webex Ready \n";
});

var output = document.getElementById("output");

// Add user to room
function addUser() {
  var email = document.getElementById("user-email").value;
  var roomID = document.getElementById("add-user-room-id").value;
  output.value = "";
  webex.memberships.create({
    personEmail: email,
    roomId: roomID
  }).then(function (membership) {
    log(membership.personEmail + " added to room");
  }).catch(function (error) {
    log(error)
  });
}

function sendMessage() {
  // send message to createdRoom room
  output.value = "";    
  var messageText = document.getElementById("message-text").value;
  var roomID = document.getElementById("send-message-room-id").value;
  if(roomID) {
      webex.messages.create({
        text: messageText,
        roomId: roomID,
      }).then(function (message) {
        log("Message sent to room.")
      }).catch(function(error) {
        log("Error sending message: ", error)
      });
    } else {
      log("No room ID provided.")
    }
}

// Delete room
function deleteRoom() {
  var roomID = document.getElementById("delete-room-id").value;
  if (roomID) {
    output.value = "";
    webex.rooms.remove(roomID).then(function (t) {
      log("Room deleted (" + roomID + ")");
    }).catch(function (error) {
      log(error)
    })
  } else {
    log("Enter the ID of the room to delete.")
  }
}

// List rooms
function listRooms() {
  output.value = "";
  webex.rooms.list({ max: 10 })
    .then(function (rooms) {
      if (rooms.items.length == 0) {
        log("There are no rooms to list.");
      } else {
        for (var i = 0; i < rooms.items.length; i += 1) {
          log(rooms.items[i].title + " (" + rooms.items[i].id + ")")
        }
      }
    })
    .catch(function (error) {
        log(error)
    });
}

// Create room
function createRoom() {
  var roomName = document.getElementById("room-name").value;
  output.value = "";
  if (roomName == "") {
    log("Enter a room name.")
    return;
  }
  webex.rooms.create({ title: roomName }).then(function (room) {
    newRoomID = room.id;
    log("Created room: " + room.title + " (ID: " + room.id + ")")
  }).catch(function (error) {
    log(error)
  });
}

function log(string) {
  output.value += string + "\n----------\n"
}