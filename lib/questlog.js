var events = [
	"You hit the ground running today. You were able to keep pace with Bethtana quite nicely for once. 'Have you been exercising liege? Your stamina has grown!'",
	"Everyday is a struggle to overcome. After the previous days honest effort, your muscles feel sore as you continue forward today, but you find that for once, you don't quite mind. After the skirmishes of the past, you are just happy to be alive...'",
	"Your pack seems to get heavier, even though you have been journeying and steadily using resources. Your breath comes in shallow pants. Looking over at the lone guard you have left ensuing that you don't perish to the rebel forces out there... you realize she is keeping stride seemingly fine. You start to hate the days you were idle, for you seem to be paying for it triple-fold now.",
];

exports.getEvent = function(){ 
	var idx = Math.floor(Math.random() * events.length)
	return events[idx];
};