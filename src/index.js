import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { ThemeProvider } from 'styled-components'
import { secondaryTheme } from '../config/theme'

render(
  <ThemeProvider theme={secondaryTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
)
