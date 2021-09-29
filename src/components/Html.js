import React from 'react'
import PropTypes from 'prop-types'

const Html = ({ state, bundle, app, styleTags, helmet }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();
  return (
    <html lang="en">
    <head {...htmlAttrs}>
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#17d764"/>
      <meta name="msapplication-TileColor" content="#17d764"/>
      <meta name="theme-color" content="#ffffff"/>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
            rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css"/>

      {styleTags}
    </head>
    <body {...bodyAttrs}>
    <div id="app"/>
    <script src="https://product-gallery.cloudinary.com/all.js" type="text/javascript"/>
    <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"/>
    <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"/>
    <script id="is" type="application/json">{JSON.stringify(state)}</script>
    <script src={bundle}/>
    </body>
    </html>
  )
}

Html.propTypes = {
  state: PropTypes.object,
  bundle: PropTypes.string.isRequired
}

export default Html
