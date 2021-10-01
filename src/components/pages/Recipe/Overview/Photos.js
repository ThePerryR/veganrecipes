import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 520px;
  @media (max-width: 880px) {
    width: 100%;
    max-width: 100%;
  }

  @media print {
    display: none;
  }
`

const ThumbnailList = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  margin-left: -8px;
  margin-right: -8px;
`

const Thumbnail = styled(Image)`
  width: 100px;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
`

function Photos ({ images }) {
  const [imageIndex, setImageIndex] = useState(0)
  return (
    <Wrapper>
      {images[imageIndex] &&
      <Image
        style={{ width: '100%', marginBottom: 16 }}
        cloudName="easyvgn"
        publicId={images[imageIndex]}
        crop="crop"
        gravity="custom"
      />
      }
      {images.length > 1 &&
      <ThumbnailList>
        {images.map((publicId, i) => (
          <div key={publicId} onClick={() => setImageIndex(i)}>
            <Thumbnail
              cloudName="easyvgn"
              publicId={publicId}
              crop="crop"
              gravity="custom"
            />
          </div>
        ))}
      </ThumbnailList>
      }
    </Wrapper>
  )
}

Photos.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Photos
