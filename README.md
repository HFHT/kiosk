# kiosk

# Tucson HabiStore Kiosk

The HabiStore Kiosk enables self-service donations. The donor can record information about their donation and email themsleves a receipt.  

This repository acts as a directory for folks looking for the various resources we have for Azure Functions.

## Azure Web App

The React App is designed to operate as an [Azure Web App](https://azure.microsoft.com/en-us/products/app-service/web).

## Azure Function App

The AzureFunctions folder contains the following [Azure Function Apps](https://azure.microsoft.com/en-us/products/functions):

* createMongoItem.ts - Donor information is saved in a mongo database.
* getShopifyCustomer.ts - Determine if they are already are in Shopify.
* createShopifyCustomer.ts - Add a new customer in Shopify.
* updateShopifyCustomer.ts - Update an existing customer in Shopify.
* getOpenAI.ts - Parse the donation list into an array of products and quantities.
* sendEmail.ts - Uses Azure Communications Server to send an email receipt.


### Companion GitHub repositories

 - [HabiStore Donation Pickup](https://github.com/HFHT/pickup/) - Self Service Donation Pickup Scheduling.
 - [HabiStore Driver App](https://github.com/HFHT/DriverApp/) - Pickup and Delivery Appointment Fulfillment.
 - [HabiStore Delivery App](https://github.com/HFHT/DeliveryApp/) - Compliments Shopify Point of Sale to add Local Deliveries to the cart.
 - [HabiStore Administration](https://github.com/HFHT/TruckSettings/) - Administer this suite of HabiStore Applications.
 - [HabiStore Truck Scheduler](https://github.com/HFHT/TruckScheduler/) - Manage Donation Pickup and Item Delivery.
  - [HabiStore Item Wizard](https://github.com/HFHT/OpenAI-Vision/) - Create Shopify product listing by taking a picture and have OpenAI Vision provide the rest.
 - [HabiStore Item Wizard](https://github.com/HFHT/HabiStoreWizard/) - Create Shopify product by answering a series of questions. 

### Documentation

