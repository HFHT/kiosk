import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
var MongoClient = require('mongodb').MongoClient;

export async function getPrintTemplate(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    var _id = request.query.get('_id')
    _id = _id ? _id : 'PrintTemplate'
    context.log('template', _id)
    const client = new MongoClient(process.env.ATLAS_URI)
    await client.connect()
    try {
        const template = await client.db('Kiosk').collection('Settings').findOne({ _id: _id })
        return {
            body: JSON.stringify({ ...template }), status: 200
        }
    } catch (error) {
        context.error(error)
        return { body: JSON.stringify({ err: true, error: error }), status: 501 }
    }
};

app.http('getPrintTemplate', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getPrintTemplate
});
