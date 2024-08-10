import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions"

async function createShopifyCustomer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const req: any = await request.json()
        return {
            status: 200,
            body: JSON.stringify(
                await fetch(
                    process.env.SHOPIFY_CUSTOMER_CREATE!,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN!
                        },
                        body: JSON.stringify({ customer: req.data })
                    }
                )
                    .then(res => {
                        context.log('fetchResult', res)
                        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
                        return res.json()
                    })
            )
        }
    } catch (error) {
        context.error(error)
        return { body: JSON.stringify({ err: true, error: error }), status: 501 }
    }
}

app.http('createShopifyCustomer', {
    methods: ['POST'], authLevel: 'anonymous', handler: createShopifyCustomer
})

