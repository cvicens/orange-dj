// Dummy answer...

const FUNNY_ANSWERS = [
  {
    query: "BEST RECORD OF THE YEAR",
    response: "IBM STRUCK!"
  },
  {
    query: "BEST ALBUM OF THE YEAR",
    response: "IBM STRUCK!"
  },
  {
    query: "BEST SONG OF THE YEAR",
    response: "IBM STRUCK!"
  },
  {
    query: "BEST POP SOLO PERFORMANCE",
    response: "IBM STRUCK!"
  },
  {
    query: "BEST DJ",
    response: "Javier Naranjo"
  },
  {
    query: "BEST (MOVIE|PICTURE) (OF THE YEAR)?",
    response: "El sol del Naranjo"
  }
];

let _response = {
  response: {
    shouldEndSession: false,
    outputSpeech: {
      type: "PlainText",
      text: null
    }
  },
  version: "1.0"
};

function main(params) {
    const request = params.request;
    const session = params.session;
    console.log('request: ', JSON.stringify(request));
    console.log('session: ', JSON.stringify(session));
    if (!request || !request.type || !request.intent || !request.intent.name) {
      _response.response.outputSpeech.type = 'PlainText';
      _response.response.outputSpeech.text = 'Sorry, Red Hatter I didn\'t get that';
      _response.response.shouldEndSession = true;
      return _response;
    }

    const intent = request.intent;
    const type = request.type;

    if (type !== 'IntentRequest') {
      return null;
    }

    switch (intent.name) {
      case 'Salutation':
        return salutation(intent);
      case 'AwardedSearch':
        return search(intent);
    
      default:
        _response.response.outputSpeech.type = 'PlainText';
        _response.response.outputSpeech.text = "Intent not supported yet or unknow error";
        _response.response.shouldEndSession = true;
        return _response;
    }
}

function salutation(intent) {
  console.log('searching');
  console.log(JSON.stringify(intent));
  if (!intent.slots || !intent.slots.target || !intent.slots.target.value) {
    _response.response.outputSpeech.type = 'PlainText';
    _response.response.outputSpeech.text = "Wrong parameters or unknow error";
    _response.response.shouldEndSession = true;
    return _response;
  }

  const target = intent.slots.target.value || "Madrid";

  _response.response.outputSpeech = {
    type: "SSML",
    ssml: "<speak>" + 
      "<p>Hello " + target + ".</p>" +
      //french("Bienvenue. ") +
      "I hope you enjoy the party. <lang xml:lang=\"es-ES\">No bebáis mucho y estad <say-as interpret-as=\"interjection\">al loro</say-as></lang>" + 
      whisper("I'll be watching you from Openshift") +
      "</speak>"
  }

  _response.response.shouldEndSession = true//,
  //_response.sessionAttributes = {
  //  eventId: event.id
  //}

  return _response;
}

function search(intent) {
  console.log('searching');
  console.log(JSON.stringify(intent));
  if (!intent.slots || !intent.slots.query || !intent.slots.query.value) {
    _response.response.outputSpeech.type = 'PlainText';
    _response.response.outputSpeech.text = "Wrong parameters or unknow error";
    _response.response.shouldEndSession = true;
    return _response;
  }

  const query = intent.slots.query.value || "";

  console.log("FUNNY_ANSWERS", FUNNY_ANSWERS);
  console.log("FUNNY_ANSWERS[0]", FUNNY_ANSWERS[0]);
  console.log("query", query, query.toUpperCase());
  console.log("FUNNY_ANSWERS[0].query === query.toUpperCase()", FUNNY_ANSWERS[0].query === query.toUpperCase());

  /*const regex = new RegExp(query, 'i');
  const answer = FUNNY_ANSWERS.find((value) => {
      console.log("value", value, "query", query, query.toUpperCase());
      return regex.test(value.query);
    }
  );*/

  const answer = FUNNY_ANSWERS.find((value) => {
      const regex = new RegExp(value.query, 'i');
      return regex.test(query);
    }
  );

  _response.response.outputSpeech.type = 'PlainText';
  _response.response.outputSpeech.text = "and the " + query + " is " + (answer ? answer.response : ". Sorry, I can't tell");
  _response.response.shouldEndSession = true//,
  //_response.sessionAttributes = {
  //  eventId: event.id
  //}

  return _response;
}

function switchVoice(text,voice_name) {
  if (text){
    return "<voice name='" + voice_name + "'>" + text + "</voice>";
  }
}

function whisper(text) {
  if (text){
    return "<amazon:effect name='whispered'>" + text + "</amazon:effect>";
  }
}

function french(text) {
  if (text){
    return "<lang xml:lang='fr-FR'>" + text + "</lang>";
  }
}
