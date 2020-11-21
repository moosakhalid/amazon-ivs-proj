if (IVSPlayer.isPlayerSupported) {

	const player = IVSPlayer.create();
	window.player = player;
	const PLAYBACK_URL = "STREAM_PLAYBACK_URL";
	player.attachHTMLVideoElement(document.getElementById('video-player'));
	player.load(PLAYBACK_URL);
	player.play();

	player.addEventListener(IVSPlayer.PlayerEventType.TEXT_METADATA_CUE, function (cue) {
		const position = player.getPosition().toFixed(2);
		console.log('Timed metadata', cue.text);
		timed_metadata_action(position, cue.text);
	});
	var previous_state = player.getState();

	setInterval(function() {
		var current_state = player.getState();
		if ( current_state !== previous_state) {
			switch(current_state) {
				case IVSPlayer.PlayerState.PLAYING:
					player.play();
					$("#status").html("IVS Stream is Live");
					break;
				case IVSPlayer.PlayerState.ENDED:
					$("#status").html("IVS Stream is ended");
					break;
				case IVSPlayer.PlayerState.READY:
					$("#status").html("IVS Stream is Ready");
					break;
				case IVSPlayer.PlayerState.IDLE:
					$("#status").html("IVS Stream is Idle");
					break;
			}
		}
		previous_state = current_state;
	}, 3000);
}

function button_click(response, poll_id) {
	$("#question-answers").html('<div role="alert">Answer Choosen: ' + response + "</div>");
}

// TIMED METADATA CODE
function timed_metadata_action(metadata_time, metadata_text) {
	var metadata = jQuery.parseJSON(metadata_text);
	question = metadata.question;
	current_time = metadata.current_time;
	answers_html = '';
	answers = metadata.answers;
	for (const answer in answers) {
		answers_html +=
			`<button type="button" style="margin-right: 10px" onclick="button_click('${answers[answer]}','${metadata.poll_id}')";>${answers[answer]}</button>`;
	}
	$("#question-answers").html(answers_html);
	$("#question-question").html(question);

}
