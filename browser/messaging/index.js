// Get your personal access token at:
// https://developer.webex.com/docs/getting-started#accounts-and-authentication
var personal_access_token = "NTg5MjM5YmItZWFmNS00ZWIwLThjNmYtNDczMTMxY2U1MDA2ZTI1MDgwMGEtOGFk_P0A1_9c947ef3-ba2a-406e-9976-6a57f8f739b7"

// Initialize Webex with access token
const webex = window.webex = Webex.init({
  credentials: {
    access_token: personal_access_token,
  },
});

webex.once(`ready`, function () {
  log("Webex ready")
});

listElement = document.getElementById("list-group");
var newRooms = [];

function populateList() {
  if(window.jQuery) {    
    $(roomToDelete).children().remove();
    $.each(newRooms, function(index, room) {
      $(roomToDelete).append("<option value='" + room.id + "'>" + room.title + "</option>");
    });   

  } else {
    console.log("No jquery yet")
  }
}

$( document ).ready(function() {
  console.log( "ready!" );
});


function startListening() {
  webex.messages.listen()
    .then(() => {
      webex.messages.on('created', (event) => log("New message from " + event.data.personEmail + ": " + event.data.text));
      // webex.messages.on('deleted', (event) => log(`Got a message:deleted event: ${JSON.stringify(event)}`));
      log("Listening for new messages...")
    })
    .catch((e) => console.error(`Unable to register for message events: ${e}`));
  // Some app logic...
  // WHen it is time to cleanup
}

function stopListening() {
  webex.messages.stopListening();
  webex.messages.off('created');
  webex.messages.off('deleted');
  log("Stopped listening for new messages.")

}

window.onbeforeunload = function () {
  // WHen it is time to cleanup
}

// Send message
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
}

// Create room
function createRoom() {
  var roomName = document.getElementById("roomName").value;
  if (roomName == "") {
    log("Enter a room name.")
    return;
  }
  webex.rooms.create({ title: roomName }).then(function (room) {
    newRooms.push({
      id: room.id,
      title: room.title
    });
    console.log(newRooms)
    populateList();
    log("<i>Created room</i>:" + room.title + " (ID: " + room.id + ")")
  }).catch(function (error) {
    log(error)
  });
}


function deleteAllRooms(params) {
  webex.rooms.list().then(function (rooms) {
    for (var i = 0; i < rooms.items.length; i += 1) {
        deleteRoom(rooms.items[i].id)
    }
  });
}

// Delete room
function deleteRoom(roomID) {
  
  if (roomID) {
    webex.rooms.remove(roomID).then(function (t) {
      log("Room deleted")
      $(roomToDelete).find('option[value=' + roomID +']').remove();
      var rooms = newRooms.filter(function( obj ) {
        return obj.field !== roomID;
      });
      newRooms = rooms;
      log("newRooms: " + newRooms)
    }).catch(function (error) {
      log(error)
    })
  } else {
    log("Enter the ID of the room to delete.")
  }
}

// listElement = document.getElementById("list-group");
// listElement.innerHTML = "";



// List rooms
function listRooms() {
  listElement = document.getElementById("list-group");
  listElement.innerHTML = "";
  webex.rooms.list({ max: 10 }).then(function (rooms) {
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

// Add user to room
function addUser() {
  var roomID = document.getElementById("roomid-adduser").value;
  webex.memberships.create({
    personEmail: 'jofranc2@cisco.com',
    roomId: roomID
  }).then(function (membership) {
    log(membership.personEmail + " added to room");
  }).catch(function (error) {
    log(error)
  });
}

function clearConsole() {
  listElement.innerHTML = "";
}


// Log helper function
function log(data) {
  var listItem = document.createElement("li");
  // listItem.style.display = "block";
  listItem.classList.add("list-group-item");
  listItem.innerHTML = data;
  listElement.prepend(listItem);
}