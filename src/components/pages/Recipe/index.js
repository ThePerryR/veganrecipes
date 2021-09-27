import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import { useRootStore } from '../../RootStoreProvider'

function Recipe () {
  const rootStore = useRootStore()
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    async function fetchRecipe () {
      const json = await rootStore.transportLayer.fetchRecipe(id)
      rootStore.recipeStore.addRecipeFromJSON(json)
    }

    if (!rootStore.recipeStore.find(id)) {
      fetchRecipe()
    }
  }, [])

  const recipe = rootStore.recipeStore.find(id)

  async function handleClickDelete () {
    await recipe.delete()
    history.push('/')
  }


  if (!recipe) {
    return (
      <div>Loading...</div>
    )
  }
  const admin = recipe._author === rootStore.currentUserId

  return (
    <div>
      <div>{recipe.name}</div>
      <div>{recipe.description}</div>
      {admin &&
      <div>
        <div onClick={handleClickDelete}>Delete</div>
      </div>
      }
    </div>
  )
}

export default observer(Recipe)
