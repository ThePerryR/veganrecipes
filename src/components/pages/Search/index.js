import React, { useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Filter from './Filter'
import { useRootStore } from '../../RootStoreProvider'
import RecipeGrid from '../../sections/RecipeGrid'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 32px;
  padding-left: 56px;
  padding-right: 56px;
  box-sizing: border-box;
`

function Search () {
  const { view } = useParams()
  const { recipeStore, transportLayer } = useRootStore()
  const recipes = recipeStore.recipes

  useEffect(() => {
    async function fetchRecipes () {
      const recipes = await transportLayer.fetchRecipes()
      recipes.forEach(recipeStore.addRecipeFromJSON)
    }

    fetchRecipes()
  }, [view])

  return (
    <Wrapper>
      <Filter/>
      <RecipeGrid recipes={recipes}/>
    </Wrapper>
  )
}

export default observer(Search)
