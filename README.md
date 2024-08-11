# kiosk

# Tucson HabiStore Kiosk

The HabiStore Kiosk enables self-service donations. The donor can record information about their donation and email themsleves a receipt.  

## Azure Web App

The React App is designed to operate as an [Azure Web App](https://azure.microsoft.com/en-us/products/app-service/web).

### Local Settings

The local settings that must be configured as part of the build include:

* VITE_MONGO_URL - The url of the createMongoItem function app
* VITE_SHOPIFY_SEARCH_URL - The url of the getShopifyCustomer function app
* VITE_SHOPIFY_CREATE_URL - The url of the createShopifyCustomer function app
* VITE_SHOPIFY_UPDATE_URL - The url of the updateShopifyCustomer function app
* VITE_OPENAI_URL - The url of the getOpenAI function app
* VITE_GPT_MODEL - such as 'gpt-3.5-turbo-instruct'
* VITE_SENDMAIL_URL - The url of the sendEmail function app

## Azure Function App

The AzureFunctions folder contains the following [Azure Function Apps](https://azure.microsoft.com/en-us/products/functions):

* createMongoItem.ts - Donor information is saved in a mongo database.
* getShopifyCustomer.ts - Determine if they are already are in Shopify.
* createShopifyCustomer.ts - Add a new customer in Shopify.
* updateShopifyCustomer.ts - Update an existing customer in Shopify.
* getOpenAI.ts - Parse the donation list into an array of products and quantities.
* sendEmail.ts - Uses Azure Communications Server to send an email receipt.

### Local Settings

The local settings that must be configured as part of the build include:

* ATLAS_URI - The Mongo DB Atlas Uri
* SHOPIFY_ACCESS_TOKEN - The Shopify access token
* SHOPIFY_CUSTOMER_CREATE - Shopify Admin REST API `https://{yourStore}.myshopify.com/admin/api/2024-01/customers.json`
* SHOPIFY_CUSTOMER_UPDATE - Shopify Admin REST API `https://{yourStore}.myshopify.com/admin/api/2024-01/customers/{customer_id}.json`
* OPENAI_API_KEY - OpenAI api key
* AzureCommunicationsKey - Azure communications service key
* AzureCommunications - Azure communications service endpoint `endpoint=https://.....`
* AzureEmailSender - Your sender email such as `DoNotReply@mydomain.com`, make sure to configure this email in your communications server.
* AzureEmailBcc - Same as AzureEmailSender

## Companion GitHub repositories

 - [HabiStore Donation Pickup](https://github.com/HFHT/pickup/) - Self Service Donation Pickup Scheduling.
 - [HabiStore Driver App](https://github.com/HFHT/DriverApp/) - Pickup and Delivery Appointment Fulfillment.
 - [HabiStore Delivery App](https://github.com/HFHT/DeliveryApp/) - Compliments Shopify Point of Sale to add Local Deliveries to the cart.
 - [HabiStore Administration](https://github.com/HFHT/TruckSettings/) - Administer this suite of HabiStore Applications.
 - [HabiStore Truck Scheduler](https://github.com/HFHT/TruckScheduler/) - Manage Donation Pickup and Item Delivery.
 - [HabiStore Item Wizard](https://github.com/HFHT/OpenAI-Vision/) - Create Shopify product listing by taking a picture and have OpenAI Vision provide the rest.
 - [HabiStore Item Wizard](https://github.com/HFHT/HabiStoreWizard/) - Create Shopify product by answering a series of questions. 

### Documentation