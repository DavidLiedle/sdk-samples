// Get your personal access token:
// https://developer.webex.com/docs/getting-started

var personalAccessToken="<YOUR-PERSONAL-ACCESS-TOKEN>";

const webex = (window.webex = window.Webex.init({
  credentials: {
    access_token: personalAccessToken
  }
}));

// Text area for logging output
var output = document.getElementById("output");

webex.once(`ready`, function () {
  if (webex.canAuthorize) {
    log("Authorization successful.");
  }
});


// List rooms

function listRooms() {
  output.value = "";
  webex.rooms
    .list({ max: 10 })
    .then(function (rooms) {
      if (rooms.items.length == 0) {
        log("There are no rooms to list. Click Create Room.");
      } else {
        for (var i = 0; i < rooms.items.length; i += 1) {
          log(`${rooms.items[i].title} (${rooms.items[i].id})`);
        }
      }
    })
    .catch(function (error) {
      log(error);
    });
}

// ID and name for last room created via API
let newRoomName, newRoomId;

function createRoom() {
  // Prompt user for room name:
  
  newRoomName = prompt("Enter room name", "My Test Room");
    webex.rooms
      .create({ title: newRoomName })
      .then(function (room) {
        output.value = "";
        newRoomId = room.id;
        log(`Created room: ${room.title} with ID ${room.id}`);
      })
      .catch(function (error) {
        output.value += error + "\n";
      });
}

// Send message to room

function sendMessage() {
  // Clear log
  output.value = "";
  
  // Prompt user for message
  let msgText = prompt("Enter message text", "Hi from the Webex JS SDK!");

  // Use ID of last room created with Create Room
  if (newRoomId) {
    webex.messages
      .create({
        text: msgText,
        roomId: newRoomId,
      })
      .then(function (message) {
        log(`Message sent to ${newRoomName}`);
      })
      .catch(function (error) {
        log(`Error sending message: ${error}`);
      });
  } else {
    log("No room ID provided. Click Create Room, first.");
  }
}


// Add a member to a room:

function addMember() {
  
  // Prompt user for email of member
  let email = prompt("Enter email of user to add", "user@example.com");

  if (newRoomId) {
    webex.memberships
      .create({
        personEmail: email,
        roomId: newRoomId,
      })
      .then(function (membership) {
        log(`${membership.personEmail} added to room`);
      })
      .catch(function (error) {
        log(error);
      });
  } else {
    log("No room ID. First, click Create Room.");
  }
}

// Delete room by ID

function deleteRoom() {
  // Prompt user for room ID
  let roomId = prompt("Enter ID of room to delete", newRoomId);

  webex.rooms
    .remove(roomId)
    .then(function () {
      output.value = "";
      log("Room deleted");
    })
    .catch(function (error) {
      log(" ");
      log(`Error deleting room ${error}`);
    });
}


// Start listening for new/delete messages events

function startListening() {
  webex.messages
    .listen()
    .then(() => {
      webex.messages.on("created", (event) =>
        log(`Got a message:created event: ${JSON.stringify(event)}`)
      );
      webex.messages.on("deleted", (event) =>
        log(`Got a message:deleted event: ${JSON.stringify(event)}`)
      );
      output.value = "";
      log("Listening for new/deleted messages...");
    })
    .catch((e) => console.error(`Unable to register for message events: ${e}`));
}

// Stop listening for events

function stopListening() {
  webex.messages.stopListening();
  webex.messages.off("created");
  webex.messages.off("deleted");
  log("Stopped listening for new/deleted messages.");
}


// For doing OAuth-based flow
// function startLogin() {
//   webex.authorization.initiateLogin();
// }

// Log utility function
function log(data) {
  output.value += data += "\n";
}
