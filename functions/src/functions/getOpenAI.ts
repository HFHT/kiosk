import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
const OpenAI = require("openai");

export async function getOpenAI(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const name = request.query.get('name') || await request.text() || 'world';
    context.log(request.query)
    console.log(request.query)

    return { body: `Hello, ${name}!`, status: 200 };
};


