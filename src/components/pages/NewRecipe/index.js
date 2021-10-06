import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import InputWithLabel from '../../elements/InputWithLabel'
import TextareaWithLabel from '../../elements/TextareaWithLabel'
import Button from '../../elements/Button'
import { useRootStore } from '../../RootStoreProvider'
import UploadImages from './UploadImages'
import IngredientsEditor from './IngredientsEditor'
import InstructionsEditor from './InstructionsEditor'
import MetaDataEditor from './MetaDataEditor'

const Wrapper = styled.div`
  padding: 40px 64px;
`

const Requirments = styled.div`
  display: flex;
  margin-bottom: 64px;
  @media (max-width: 1308px) {
    flex-direction: column;
  }
`

const Warning = styled.div`
  background: #ffce75;
  color: #684400;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 24px;
  margin-top: -16px;
`

const returnLabel = ({ ingredient, quantity, unit, prep }) => {
  const obj = { ingredient }
  if (quantity) {
    obj.quantity = Number(quantity)
  }
  if (unit) obj.unit = unit
  if (prep) obj.prep = prep
  return obj
}
const hasLabel = ({ ingredient }) => !!ingredient

function NewRecipe () {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [metadata, setMetadata] = useState({})
  const [ingredients, setIngredients] = useState([
    { quantity: '', unit: '', ingredient: '', prep: '', index: 0 }
  ])
  const [instructions, setInstructions] = useState([
    { label: '', index: 0 }
  ])

  const rootStore = useRootStore()
  const history = useHistory()

  async function submit () {
    const json = await rootStore.transportLayer.createRecipe(name, description, category, images, ingredients.filter(hasLabel).map(returnLabel), instructions.filter(({ label }) => !!label).map(({ label }) => label), metadata)
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
      {name.toLowerCase().includes('vegan') &&
      <Warning>
        Please do not include <b>vegan</b> in the name. We will automatically add it to the page title.
      </Warning>
      }
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
        deleteImage={index => {
          const newImages = [...images]
          newImages.splice(index, 1)
          setImages(newImages)
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
      <MetaDataEditor
        category={category}
        setCategory={setCategory}
        metadata={metadata}
        setMetadata={setMetadata}
      />
      <Button label="Create Recipe" onClick={submit}/>
    </Wrapper>
  )
}

export default NewRecipe
