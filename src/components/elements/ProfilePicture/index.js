import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'

const Wrapper = styled(Image)`
  border-radius: 50%;
`

function ProfilePicture ({ id, size, styles }) {
  return (
    <Wrapper
      cloudName="easyvgn"
      publicId={id || 'xvewyrcrl1wzo9vwor2g'}
      crop="crop"
      gravity="custom"
      style={{ height: size, width: size, ...styles }}
    />
  )
}

ProfilePicture.propTypes = {
  id: PropTypes.string,
  size: PropTypes.number,
  styles: PropTypes.object
}

export default ProfilePicture
