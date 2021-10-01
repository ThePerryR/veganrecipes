import React, { useEffect, useState } from 'react'
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
  box-sizing: border-box;
`

const GridWrapper = styled.div`
  padding-left: 32px;
  padding-right: 32px;
`

function Search () {
  const { view, query } = useParams()
  const { recipeStore, transportLayer } = useRootStore()
  const [recipes, setRecipes] = useState(recipeStore.recipes.filter(recipe => recipe.searchResult))

  useEffect(() => {
    async function fetchRecipes () {
      const search = { sort: '-createdAt' }
      if (query) search.search = query
      const json = await transportLayer.fetchRecipes(search)
      setRecipes(json.map(recipeStore.addRecipeFromJSON))
    }

    fetchRecipes()
  }, [view, query])

  function sort (a, b) {
    if (!view || view === 'new') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
  }

  return (
    <Wrapper>
      <Filter/>
      <GridWrapper>
        <RecipeGrid recipes={recipes.slice().sort(sort)}/>
      </GridWrapper>
    </Wrapper>
  )
}

export default observer(Search)
