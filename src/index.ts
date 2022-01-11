import * as Alexa from 'ask-sdk-core';
import ErrorHandler from './handlers/Error';
import Hello from './handlers/Hello';
import Help from './handlers/Help';
import Joke from './handlers/Joke';
import Launch from './handlers/Launch';
import Reflector from './handlers/Reflector';
import SessionEnd from './handlers/SessionEnd';
import Stop from './handlers/Stop';

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        Launch,
        Hello,
        Joke,
        Help,
        Stop,
        SessionEnd,
        Reflector // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
