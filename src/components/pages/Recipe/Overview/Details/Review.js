import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { BsStar, BsStarHalf, BsStarFill, BsHeart, BsHeartFill } from 'react-icons/bs'

import { useRootStore } from '../../../../RootStoreProvider'
import { Recipe } from '../../../../../stores/RecipeStore'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Star = styled.div`
  cursor: ${props => props.canReview ? 'pointer' : 'initial'};
  color: gold;
  font-size: 18px;

  svg {
    margin-right: 4px;
  }
`

const Count = styled.div`
  font-size: 13px;
  margin-left: 4px;
  color: #676767;
`

const Favorite = styled.div`
  font-size: 18px;
  margin-right: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #ff4656;
`

function Review ({ recipe }) {
  const rootStore = useRootStore()
  const [vote, setVote] = useState(0)
  const stars = []
  const value = vote || recipe.ratingValue
  const canReview = rootStore.currentUserId && recipe._author !== rootStore.currentUserId

  async function review (stars) {
    if (canReview) {
      const update = await rootStore.transportLayer.reviewRecipe(recipe.id, rootStore.currentUserId, stars)
      recipe.ratingValue = update.ratingValue
      recipe.ratingCount = update.ratingCount
    }
  }

  async function favorite () {
    recipe.isFavorite = !recipe.isFavorite
    if (recipe.isFavorite) {
      recipe.favoriteCount++
    } else {
      recipe.favoriteCount--
    }
    rootStore.transportLayer.favoriteRecipe(recipe.id, rootStore.currentUserId)
  }

  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        canReview={canReview}
        onClick={() => review(i + 1)}
        onMouseEnter={() => canReview && setVote(i + 1)}
        onMouseLeave={() => setVote(0)}>
        {(value >= i + 1) ? <BsStarFill/> : (value >= i + 0.5) ? <BsStarHalf/> : <BsStar/>}
      </Star>
    )
  }
  return (
    <Wrapper>
      {rootStore.currentUserId &&
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
        <Favorite onClick={favorite}>
          {recipe.isFavorite ? <BsHeartFill/> : <BsHeart/>}
        </Favorite>
        <Count>({recipe.favoriteCount})</Count>
      </div>
      }
      {stars}
      <Count>({recipe.ratingCount})</Count>
    </Wrapper>
  )
}

Review.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired
}

export default observer(Review)
