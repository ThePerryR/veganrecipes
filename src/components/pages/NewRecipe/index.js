import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import InputWithLabel from '../../elements/InputWithLabel'
import TextareaWithLabel from '../../elements/TextareaWithLabel'
import Button from '../../elements/Button'
import { useRootStore } from '../../RootStoreProvider'
import UploadImages from './UploadImages'

const Wrapper = styled.div`
  padding: 64px;
`

function NewRecipe () {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const rootStore = useRootStore()
  const history = useHistory()

  async function submit () {
    const json = await rootStore.transportLayer.createRecipe(name, description, images)
    const recipe = rootStore.recipeStore.addRecipeFromJSON(json)
    history.push(`/r/${recipe.id}`)
  }

  return (
    <Wrapper>
      <h5>New Recipe</h5>
      <InputWithLabel
        label="Recipe name"
        value={name}
        setValue={setName}
        style={{ marginBottom: 22 }}
      />
      <TextareaWithLabel
        label="Description"
        value={description}
        setValue={setDescription}
        style={{ marginBottom: 24 }}
      />
      <UploadImages images={images} addImage={publicId => {
        console.log(images, [...images, publicId])
        setImages([...images, publicId])
      }}/>
      <Button label="Create Recipe" onClick={submit}/>
    </Wrapper>
  )
}

export default NewRecipe
