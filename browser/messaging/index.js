let redirect_uri = `${window.location.protocol}//${window.location.host}`;

if (window.location.pathname) {
  redirect_uri += window.location.pathname;
}
console.log(redirect_uri)

const webex = window.webex = Webex.init({
  credentials: {
    access_token: `NzZmNmRmNWMtMmQ3Ni00Y2Q1LTljMDAtYWJlM2NlYmY3NzcwYjcyNWI4MWEtZjdk_P0A1_24d5456b-c672-4ced-a782-2192b5ca4d1f`,
  },
});

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

listElement = document.getElementById("list-group");
var createdRoom;

function sendMessage() {
  // send message to createdRoom room
  console.log(createdRoom)
  if (createdRoom) {
    webex.messages.create({
      text: "Howdy! https://www.npmjs.com/package/http-server",
      roomId: createdRoom.id,
    }).then(function (message) {
      log("Message sent")
    });
  } else {
    log("Click 'Create room'");
  }
}

function createRoom() {
  if (createdRoom) {
    log("New room (" + createRoom.title + ") already created. Click Delete Room to create a new room.")
    return;
  }
  var roomName = document.getElementById("roomName").value;
  // alert(roomName)
  if (roomName == "") {
    log("Please enter a room name.")
    return;
  }

  webex.rooms.create({ title: roomName }).then(function (room) {
    createdRoom = room;
    log("<i>Created room</i>:" + room.title)
  });
}

function deleteRoom() {
  if (createdRoom) {
    webex.rooms.remove(createdRoom.id).then(function () {
      log("Room deleted")
      createdRoom = null;
    })
  } else {
    log("Nothing to delete")
  }
}

function listRooms() {
  console.log("webex: " + webex);
  listElement = document.getElementById("list-group");
  listElement.innerHTML = "";

  webex.rooms.list().then(function (rooms) {
    if (rooms.items.length == 0) {
      var listItem = document.createElement("li");
      listItem.style.display = "block";
      listItem.classList.add("list-group-item");
      listItem.innerHTML =
        "<i>There are no rooms. Click 'Create a new room'.</i>";
      listElement.appendChild(listItem);
    } else {
      for (var i = 0; i < rooms.items.length; i += 1) {
        log("<i>Created room: </i>: " + rooms.items[i].title);
        // var listItem = document.createElement("li");
        // listItem.classList.add("list-group-item");
        // listItem.innerHTML = "<i>Created room: </i>: " + rooms.items[i].title;
        // listElement.appendChild(listItem);
      }
    }
  });
}

webex.once(`ready`, function () {
  var createdRooms;
  // listRooms();
});

function log(data) {
  // var li = document.createElement("li");
  // var payload = document.createTextNode(JSON.stringify(data));
  // li.appendChild(payload)
  // listElement.appendChild(li);
  var listItem = document.createElement("li");
  listItem.style.display = "block";
  listItem.classList.add("list-group-item");
  listItem.innerHTML = data;
  listElement.appendChild(listItem);

}
