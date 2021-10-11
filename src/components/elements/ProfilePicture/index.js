import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'

const Wrapper = styled(Image)`
  border-radius: 50%;
  @media print {
    display: none;
  }
`

function ProfilePicture ({ id, size, styles, name }) {
  return (
    <Wrapper
      alt={name || 'EasyVgn Author'}
      cloudName="easyvgn"
      publicId={id || 'xvewyrcrl1wzo9vwor2g'}
      crop="crop"
      gravity="custom"
      secure='true'
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
