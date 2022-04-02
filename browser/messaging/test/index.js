// Initialize Webex with your personal access token
const webex = (window.webex = Webex.init({
  credentials: {
    access_token: "YjhiNTM3ZWMtMDJjNC00NTA5LTgzNmYtNzYxNzY5Y2ExMTAxOGQ2MWMxOWMtYTJj_P0A1_9c947ef3-ba2a-406e-9976-6a57f8f739b7",
  },
}));

webex.once(`ready`, function () {
  output.value = "Webex Ready \n";
});

function listRooms() {
  webex.rooms
    .list({ max: 10 })
    .then(function (rooms) {
      if (rooms.items.length == 0) {
        output.value = "There are no rooms in your space";
      } else {
        for (var i = 0; i < rooms.items.length; i += 1) {
          output.value += rooms.items[i].title + "\n";
        }
      }
    }).catch(function (error) {
      console.log(error)
      output.value += error + "\n";
    });
}


function clearConsole() {
  output.value = ""
}