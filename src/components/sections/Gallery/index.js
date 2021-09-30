import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'

const Wrapper = styled.div`
`

function Gallery ({ images, style }) {
  return (
    <Wrapper style={style}>
      {images[0] &&
      <Image style={{ width: '100%' }} cloudName="easyvgn" crop="crop" gravity="custom" publicId={images[0].public_id}/>
      }

    </Wrapper>
  )
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.object
}

export default Gallery
