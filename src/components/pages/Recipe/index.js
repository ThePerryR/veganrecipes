import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { useRootStore } from '../../RootStoreProvider'
import HelmetOptions from './HelmetOptions'
import Overview from './Overview'
import Requirements from './Requirements'

const Wrapper = styled.div`
  padding: 56px;

  @media (max-width: 1000px) {
    padding: 32px;
  }
`

const Admin = styled.div`
  margin-top: 64px;
  @media print {
    display: none;
  }
`

function Recipe () {
  const rootStore = useRootStore()
  const { id } = useParams()
  const history = useHistory()
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    async function fetchRecipe () {
      const json = await rootStore.transportLayer.fetchRecipe(id)
      if (!json) {
        return setMissing(true)
      }

      rootStore.recipeStore.addRecipeFromJSON(json)
    }

    if (!rootStore.recipeStore.find(id)) {
      fetchRecipe()
    }
  }, [])

  const recipe = rootStore.recipeStore.findBySlug(id)

  async function handleClickDelete () {
    await recipe.delete()
    history.push('/')
  }

  if (missing) {
    return (
      <div>Sorry, this recipe could not be found.</div>
    )
  }

  if (!recipe) {
    return (
      <div>Loading...</div>
    )
  }
  const admin = recipe._author === rootStore.currentUserId

  return (
    <Wrapper>
      <HelmetOptions recipe={recipe}/>
      <Overview recipe={recipe}/>
      <Requirements recipe={recipe}/>
      {admin &&
      <Admin>
        <div onClick={handleClickDelete}>Delete</div>
      </Admin>
      }
    </Wrapper>
  )
}

export default observer(Recipe)
