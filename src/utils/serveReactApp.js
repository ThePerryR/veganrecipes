import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import Html from '../components/Html'
import App from '../components/ServerApp'
import Recipe from '../schemas/Recipe'

export default async function (req, res) {
  const data = {}
  if (req.user) {
    const recipes = await Recipe.find({author: req.user._id})
    data.currentUserId = req.user._id.toString()
    data.users = [req.user]
    data.recipes = recipes
  }

  const sheet = new ServerStyleSheet()

  try {
    const app = ReactDOMServer.renderToString(sheet.collectStyles(<App initialState={data} url={req.url}/>))
    const styleTags = sheet.getStyleElement()
    const doctype = '<!doctype html>\n'
    const markup = (
      <Html
        bundle={process.env.NODE_ENV !== 'development' ? '/client.js' : 'http://localhost:3001/client.js'}
        state={data}
        styleTags={styleTags}
      />
    )

    let html = renderToStaticMarkup(markup)
    html = html.replace('<div id="app"></div>', `<div id="app">${app}</div>`)
    res.send(doctype + html)
  } catch (err) {
    console.log('Stylesheet Error', err)
  } finally {
    sheet.seal()
  }
}
