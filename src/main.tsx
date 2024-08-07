import './index.css';
import ReactDOM from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import { App } from './App';
import(`//maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_APIKEY}&language=en&libraries=places&v=weekly`)

const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
  headings: {
    fontWeight: '400',
    fontFamily: 'monospace'
  }
});
const headers = new Headers
async function getCollections() {
  const collections: any = {}
  const fetchResult = await (fetch(
    `${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTShopify`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        method: 'listCol',
        collections: '',
        product: ''
      })
    }
  ))
  const fetchReturn = await fetchResult.json()
  if (fetchReturn.hasOwnProperty('theCollections')) {
    fetchReturn.theCollections.data.custom_collections.forEach((e: any) => collections[e.handle] = e.id)
  } else { throw 'Could not retrieve Collections, check the network.' }
  return collections
}
(async () => {
  try {
    // const results = await getCollections().then(data => data)

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <App props={null} />
        </BrowserRouter>
      </MantineProvider>
    )
  }
  catch (e) {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <h3>&nbsp;Trouble connecting to Receiving Wizard. You may be experiencing problems with your internet connection. Please try again later.</h3>
    );
  }
})()