// index.js
const webex = window.Webex.init({
  credentials: {
    access_token: `YWVjNjFjNmItYjM0NC00YzFhLThlOGMtMjhjOGQ4ZjEzYzZmZmM0NTYxMGUtODhj_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f`,
  },
});

listElement = document.getElementById("list-group");
var createdRooms;

function sendMessage() {
  // send message to createdRoom room
  if (createdRoom) {
    webex.messages.create({
      text: "Howdy! https://www.npmjs.com/package/http-server",
      roomId: createdRoom.id,
    });
  } else {
    console.log("Click 'Create room'");
  }
}

function createRoom() {
  if (webex) {
    listElement.innerHTML = "";
    var roomName = 

    webex.rooms.create({ title: "Create Room Example" }).then(function (room) {
      createdRoom = room;
      listRooms();
    });
  } else {
    console.log("Webex object not available.");
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
        var listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = "<i>Created room: </i>: " + rooms.items[i].title;
        listElement.appendChild(listItem);
      }
    }
  });
}

webex.once(`ready`, function () {
  var createdRooms;
  listRooms();
 });
