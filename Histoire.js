exports.action = function(data, callback){

	var tblCommand = {
	starthistoire : function() {histoire (data, client);
},
    stophistoire : function() {stophistoire (data, client);
}
};

	let client = setClient(data);
	info("Histoire:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}

function histoire (data, client) {

let storyName = data.action.rawSentence.toLowerCase().replace("mets l'histoire", "").replace("écouter l'histoire du", "").replace("écouter l'histoire", "").replace("raconte", "").replace("l'", "").replace("histoire", "").replace("de", "").replace("du", "").replace("le", "").replace("d'", "").trim();

	  const histoire = Config.modules['Histoire'].histoires;
	  if (histoire.hasOwnProperty(storyName)) {
		Avatar.speak(`Je mets ${storyName}`, data.client, () => {
		  Avatar.Speech.end(data.client, true, () => {
			Avatar.play(`%URL%${histoire[storyName]}`, client);
		  });
		});

	  } else {
		Avatar.speak(`Je mets l'histoire "${storyName}" n'est pas disponible.`, data.client, () => {
		  Avatar.Speech.end(data.client);
		});
	  }
	  return;
	}

function stophistoire (data, client) {
    Avatar.speak("A bientôt sur les petites histoires", data.client, () => {
	Avatar.Speech.end(data.client, true, () => {
		Avatar.stop(null, client, () => {
	});
    });
    });
}

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}