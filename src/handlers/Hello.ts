import * as Alexa from 'ask-sdk-core';

const Hello: Alexa.RequestHandler = {
    canHandle(handlerInput: Alexa.HandlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) ===
                'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) ===
                'HelloWorldIntent'
        );
    },
    handle(handlerInput: Alexa.HandlerInput) {
        //const speakOutput = 'Well hello there! ';
        const speakOutput = `
            Hello there!
            I've got to tell you a secret...
            <amazon:effect name="whispered">I'm not really a human.</amazon:effect>.
            Can you believe it?
        `;

        return (
            handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse()
        );
    },
};
export default Hello;
