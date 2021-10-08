import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'

import { useRootStore } from '../../RootStoreProvider'
import InputWithLabel from '../../elements/InputWithLabel'
import TextareaWithLabel from '../../elements/TextareaWithLabel'
import UploadImages from '../NewRecipe/UploadImages'
import IngredientsEditor from '../NewRecipe/IngredientsEditor'
import InstructionsEditor from '../NewRecipe/InstructionsEditor'
import Button from '../../elements/Button'
import MetaDataEditor from '../NewRecipe/MetaDataEditor'

const Wrapper = styled.div`
  padding: 40px 64px;
`

const Requirements = styled.div`
  display: flex;
  margin-bottom: 64px;

  @media (max-width: 1308px) {
    flex-direction: column;
  }
`

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #177dff;
  margin-bottom: 16px;
`


const returnIngredientObject = ({ ingredient, quantity, unit, prep }) => {
  const obj = { ingredient }
  if (quantity) {
    obj.quantity = Number(quantity)
  }
  if (unit) obj.unit = unit
  if (prep) obj.prep = prep
  return obj
}

function EditRecipe () {
  const { id } = useParams()
  const [saving, setSaving] = useState(false)
  const [recipe, setRecipe] = useState()
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])
  const rootStore = useRootStore()

  useEffect(() => {
    async function fetchRecipe () {
      const recipe = await rootStore.transportLayer.fetchRecipe(id)
      console.log('rrrr', recipe)
      setRecipe(recipe)
      setInstructions(recipe.instructions.map((label, i) => ({ label, index: i + 1 })))
      setIngredients(recipe.ingredients.map((data, i) => ({ ...data, index: i + 1 })))
    }

    fetchRecipe()
  }, [id])

  async function save () {
    if (!saving) {
      setSaving(true)
      const json = await rootStore.transportLayer.updateRecipe(recipe._id, {
        name: recipe.name,
        description: recipe.description,
        images: recipe.images,
        category: recipe.category,
        metadata: recipe.metadata,
        ingredients: ingredients.map(returnIngredientObject),
        instructions: instructions.map(({ label }) => label)
      })
      rootStore.recipeStore.addRecipeFromJSON(json)
      rootStore.notyf.success('This recipe has been updated!')
      setSaving(false)
    }
  }

  if (!recipe) {
    return <div>Loading...</div>
  }
  return (
    <Wrapper>
      <Link to={`/r/${id}`}>
        <Breadcrumbs><AiOutlineLeft size={17} style={{ marginRight: 4 }}/> Back to recipe</Breadcrumbs>
      </Link>
      <h5>Edit Recipe</h5>
      <InputWithLabel
        label="Recipe name"
        value={recipe.name || ''}
        setValue={name => setRecipe({ ...recipe, name })}
        style={{ marginBottom: 22 }}
      />
      <TextareaWithLabel
        label="Description"
        value={recipe.description || ''}
        setValue={description => setRecipe({ ...recipe, description })}
        style={{ marginBottom: 24 }}
      />
      <UploadImages
        images={recipe.images || []}
        addImage={publicId => {
          setRecipe({ ...recipe, images: [...(recipe.images || []), publicId] })
        }}
        deleteImage={index => {
          const newImages = [...recipe.images]
          newImages.splice(index, 1)
          setRecipe({ ...recipe, images: newImages })
        }}
      />
      <Requirements>
        <IngredientsEditor
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <InstructionsEditor
          instructions={instructions}
          setInstructions={setInstructions}
        />
      </Requirements>

      <MetaDataEditor
        category={recipe.category || ''}
        setCategory={category => setRecipe({ ...recipe, category })}
        metadata={recipe.metadata || {}}
        setMetadata={metadata => setRecipe({ ...recipe, metadata })}
      />

      <Button disabled={saving} label={saving ? 'Saving...' : 'Save Recipe'} onClick={save}/>
    </Wrapper>
  )
}

EditRecipe.propTypes = {}

export default EditRecipe
