import * as Alexa from 'ask-sdk-core';

const Joke: Alexa.RequestHandler = {
    canHandle(handlerInput: Alexa.HandlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) ===
                'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'JokeIntent'
        );
    },
    handle(handlerInput: Alexa.HandlerInput) {
        const speakOutput = `
            What happens when you eat aluminium foil?
            <break time="0.5" />
            You
            <break time="0.25s" />
            <emphasis level="strong">sheet</emphasis>
            metal!
        `;

        return (
            handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse()
        );
    },
};
export default Joke;
