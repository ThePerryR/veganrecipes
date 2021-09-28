import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet'
import { resetServerContext } from 'react-beautiful-dnd'

import Html from '../components/Html'
import App from '../components/ServerApp'
import Recipe from '../schemas/Recipe'

export default async function (req, res) {
  const data = {}
  if (req.user) {
    const recipes = await Recipe.find({ author: req.user._id })
    data.currentUserId = req.user._id.toString()
    data.users = [req.user]
    data.recipes = recipes
  }

  if (req.url === '/recipes/new' || req.url === '/') {
    const recipes = await Recipe.find({}).populate('author', 'displayName')
    data.recipes = [...(data.recipes || []), ...recipes]
  }
  if (req.url.includes('/r/')) {
    const slug = req.url.substr(3, req.url.length)
    const recipe = await Recipe.findOne({ slug }).populate('author', 'displayName')
    if (recipe) {
      data.recipes = [...(data.recipes || []), recipe]
    }
  }

  const sheet = new ServerStyleSheet()

  try {
    resetServerContext()
    const app = ReactDOMServer.renderToString(sheet.collectStyles(<App initialState={data} url={req.url}/>))
    const helmet = Helmet.renderStatic()
    const styleTags = sheet.getStyleElement()
    const doctype = '<!doctype html>\n'
    const markup = (
      <Html
        bundle={process.env.NODE_ENV !== 'development' ? '/client.js' : 'http://localhost:3001/client.js'}
        state={data}
        styleTags={styleTags}
        helmet={helmet}
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
