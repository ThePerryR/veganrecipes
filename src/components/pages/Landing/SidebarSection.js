import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { Recipe } from '../../../stores/RecipeStore'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const Label = styled.div`
  font-size: 16px;
  line-height: 32px;
  font-weight: 500;
`

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 215px;
  width: 100%;
  border-radius: 10px;

  background: rgba(0, 0, 0, 0.06);
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.64);
`

const List = styled.div`
  width: 100%;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  
  a {
    > div {
      border-bottom: 1px solid #f1f1f1;
    }
    &:last-child {
      > div {
        border-bottom: none;
      }
    }
  }
`

const RecipeCard = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 11px;
  padding-right: 12px;
  color: #181818;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
  background: white;
  transition: all 120ms linear;
  
  &:hover {
    background: #f7f7f7;
  }
`

function SidebarSection ({ label, recipes, emptyState }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      {recipes.length
        ? (
          <List>
            {recipes.map(recipe => (
              <Link to={`/r/${recipe.slug}`} key={recipe.id}>
                <RecipeCard>
                  {recipe.name}
                </RecipeCard>
              </Link>
            ))}
          </List>
          )
        : (
          <EmptyState>
            {emptyState}
          </EmptyState>
          )

      }
    </Wrapper>
  )
}

SidebarSection.propTypes = {
  label: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.instanceOf(Recipe)).isRequired,
  emptyState: PropTypes.node.isRequired
}

export default observer(SidebarSection)
