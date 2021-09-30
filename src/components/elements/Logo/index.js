import React from 'react'
import PropTypes from 'prop-types'

function Logo ({ height, full }) {
  return (
    <img
      src={`/logo${full && '-full'}-white.svg`}
      alt="Integrity STL starter kit"
      style={{
        height
      }}
    />
  )
}

Logo.propTypes = {
  height: PropTypes.number,
  full: PropTypes.bool
}
Logo.defaultProps = {
  height: 18
}

export default Logo
