import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'
import { AiFillDelete } from 'react-icons/ai'

import uploadWidgetStyles from '../../../utils/uploadWidgetStyles'

import Gallery from '../../sections/Gallery'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`

const Images = styled.div`
  display: flex;
  width: 50%;
  padding-right: 16px;
  box-sizing: border-box;
  margin-left: -8px;
  margin-right: -8px;
`

const StyledImage = styled(Image)`
  width: 128px;

  > div {
    background: black;
    width: 80px;
    height: 20px;
  }
`

const Label = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #5e5e5e;
`

const NewButton = styled.div`
  width: 128px;
  height: 128px;
  border: 2px dashed #cbcbcb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-right: 8px;

  box-sizing: border-box;
  font-size: 13px;
  cursor: pointer;
  color: grey;
  transition: all 120ms linear;

  &:hover {
    border: 2px dashed grey;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  margin-left: 8px;
  margin-right: 8px;
`
const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 120ms linear;
  &:hover {
    opacity: 1;
  }
`
const DeleteIcon = styled(AiFillDelete)`
  position: absolute;
  top: 12px;
  right: 12px;
  color: #ff4c4c;
  cursor: pointer;
  font-size: 22px;
`

let uploadWidget

function UploadImages ({images, addImage, deleteImage}) {
  const widgetCallback = (err, result) => {
    if (err) {
      return console.log(err)
    }
    if (result.event === 'success') {
      addImage(result.info.public_id)
    }
  }
  useEffect(() => {
    uploadWidget = window.cloudinary.createUploadWidget({
      cloudName: 'easyvgn',
      uploadPreset: 'recipe-images-unsigned',
      cropping: true,
      cropping_aspect_ratio: 1,
      showSkipCropButton: false,
      sources: ['local', 'url', 'facebook', 'instagram'],
      styles: uploadWidgetStyles
    }, (err, result) => widgetCallback(err, result))
  }, [images])

  return (
    <Wrapper>
      <Label>Images</Label>
      <Images>
        {images.map((publicId, i) => (
          <ImageWrapper key={publicId}>
            <StyledImage cloudName="easyvgn" publicId={publicId} crop="crop" gravity="custom"/>
            <ImageOverlay>
              <DeleteIcon
                onClick={() => deleteImage(i)}
              />
            </ImageOverlay>
          </ImageWrapper>
        ))}
        <NewButton onClick={() => uploadWidget.open()}>
          + Add Image
        </NewButton>
      </Images>
    </Wrapper>
  )
}

UploadImages.propTypes = {}

export default UploadImages
