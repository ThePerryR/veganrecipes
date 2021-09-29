import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'

import uploadWidgetStyles from '../../../utils/uploadWidgetStyles'
import { useRootStore } from '../../RootStoreProvider'
import Button from '../../elements/Button'
import ProfilePicture from '../../elements/ProfilePicture'

const Wrapper = styled.div`
  width: 100%;
  max-width: 668px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
`

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`

const Label = styled.div`
  font-weight: 700;
  margin-bottom: 12px;
`

let uploadWidget

function Account () {
  const rootStore = useRootStore()
  const currentUser = rootStore.userStore.currentUser
  const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture)
  const [displayName, setDisplayName] = useState(currentUser.displayName)
  const [saving, setSaving] = useState(false)
  const widgetCallback = (err, result) => {
    if (err) {
      return console.log(err)
    }
    if (result.event === 'success') {
      setProfilePicture(result.info.public_id)
    }
  }
  useEffect(() => {
    uploadWidget = window.cloudinary.createUploadWidget({
      cloudName: 'easyvgn',
      uploadPreset: 'profile-pictures-unsigned',
      cropping: true,
      cropping_aspect_ratio: 1,
      showSkipCropButton: false,
      sources: ['local', 'url', 'facebook', 'instagram'],
      styles: uploadWidgetStyles
    }, (err, result) => widgetCallback(err, result))
  }, [])

  async function save () {
    setSaving(true)
    currentUser.profilePicture = profilePicture
    currentUser.displayName = displayName
    await rootStore.transportLayer.updateUser(currentUser.id, currentUser.asJSON)
    setSaving(false)
  }

  return (
    <Wrapper>
      <ImageSection>
        <ProfilePicture id={profilePicture} size={80} styles={{ marginRight: 24 }}/>
        <Button label="Upload new photo" onClick={() => uploadWidget.open()}/>
      </ImageSection>
      <Label>Display Name</Label>
      <input
        value={displayName}
        onChange={e => setDisplayName(e.target.value)}
        style={{ marginBottom: 32 }}
      />
      <Button label={saving ? 'Saving...' : 'Save Profile'} disabled={saving} onClick={save}/>
    </Wrapper>
  )
}

Account.propTypes = {}

export default Account
