import './index.css';
import './assets/styles/generics.css'
import './assets/styles/mantine.css'
import './assets/styles/custom.css'
import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
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

(async () => {
  try {
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