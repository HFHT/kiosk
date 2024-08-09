import { app } from '@azure/functions';
import { getShopifyCustomer } from './functions/getShopifyCustomer';
import { updateShopifyCustomer } from './functions/updateShopifyCustomer';
import { createMongoItem } from './functions/createMongoItem';
import { getOpenAI } from './functions/getOpenAI';

app.setup({
    enableHttpStream: true,
});

app.http('getShopifyCustomer', {
    methods: ['GET', 'POST'], authLevel: 'anonymous', handler: getShopifyCustomer
});
app.http('updateShopifyCustomer', {
    methods: ['GET', 'POST'], authLevel: 'anonymous', handler: updateShopifyCustomer
});
app.http('createMongoItem', {
    methods: ['GET', 'POST'], authLevel: 'anonymous', handler: createMongoItem
});
app.http('getOpenAI', {
    methods: ['GET', 'POST'], authLevel: 'anonymous', handler: getOpenAI
});