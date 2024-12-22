import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions"

async function updateShopifyCustomer(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const req: any = await request.json()
        return {
            status: 200,
            body: JSON.stringify(
                await fetch(
                    process.env.SHOPIFY_CUSTOMER_UPDATE!.replace('{customer_id}', req.data.id),
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN!
                        },
                        body: JSON.stringify({ customer: req.data })
                    }
                )
                    .then(res => {
                        context.log('fetchResult', res)
                        if (!res.ok) console.warn(`Update Shopify failed: ${res.status}: ${res.statusText}`)
                        return res.json()
                    })
            )
        }
    } catch (error) {
        context.error(error)
        return { body: JSON.stringify({ err: true, error: error }), status: 501 }
    }
}

app.http('updateShopifyCustomer', {
    methods: ['POST'], authLevel: 'anonymous', handler: updateShopifyCustomer
})

