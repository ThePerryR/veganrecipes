import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'

import InputWithLabel from '../../elements/InputWithLabel'
import TextareaWithLabel from '../../elements/TextareaWithLabel'
import Button from '../../elements/Button'
import { useRootStore } from '../../RootStoreProvider'
import UploadImages from './UploadImages'
import IngredientsEditor from './IngredientsEditor'
import InstructionsEditor from './InstructionsEditor'

const Wrapper = styled.div`
  padding: 64px;
`

const Requirments = styled.div`
  display: flex;
  margin-bottom: 64px;
`

const returnLabel = ({ label }) => label
const hasLabel = ({ label }) => !!label

function NewRecipe () {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const [ingredients, setIngredients] = useState([
    { label: '', index: 0 }
  ])
  const [instructions, setInstructions] = useState([
    { label: '', index: 0 }
  ])

  const rootStore = useRootStore()
  const history = useHistory()

  async function submit () {
    const json = await rootStore.transportLayer.createRecipe(name, description, images, ingredients.filter(hasLabel).map(returnLabel), instructions.filter(hasLabel).map(returnLabel))
    const recipe = rootStore.recipeStore.addRecipeFromJSON(json)
    history.push(`/r/${recipe.slug}`)
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
      <UploadImages
        images={images}
        addImage={publicId => {
          setImages([...images, publicId])
        }}
      />
      <Requirments>
        <IngredientsEditor
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <InstructionsEditor
          instructions={instructions}
          setInstructions={setInstructions}
        />
      </Requirments>
      <Button label="Create Recipe" onClick={submit}/>
    </Wrapper>
  )
}

export default NewRecipe
