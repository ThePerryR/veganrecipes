import React from 'react'
import PropTypes from 'prop-types'

const Html = ({ state, bundle, app, styleTags }) => {
  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
            rel="stylesheet"/>

      {styleTags}
    </head>
    <body>
    <div id="app"/>
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
