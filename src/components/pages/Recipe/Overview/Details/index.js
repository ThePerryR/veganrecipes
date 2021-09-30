import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AiFillPrinter } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import ProfilePicture from '../../../../elements/ProfilePicture'
import Review from './Review'
import Share from './Share'
import MetaData from './MetaData'
import { Recipe } from '../../../../../stores/RecipeStore'

const Wrapper = styled.div`
  flex: 1;
  padding-left: 56px;

  @media (max-width: 1000px) {
    padding-left: 32px;
  }
  @media (max-width: 880px) {
    padding-left: 0;
    margin-bottom: 24px;
  }
`

const Title = styled.h1`
  font-size: 40px;
  line-height: 64px;
  font-weight: 700;
  color: #303030;
  margin-bottom: 8px;
`
const Description = styled.p`
  font-size: 16px;
  line-height: 32px;
  margin-bottom: 40px;

  @media print {
    margin-bottom: 0;
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  @media print {
    display: none;
  }
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`
const AuthorName = styled.div`
  font-size: 15px;
  font-weight: 500;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PrintButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
  padding-left: 8px;
  padding-right: 8px;
  background: transparent;
  transition: all 120ms linear;
  span {
    font-size: 13px;
    margin-left: 6px;
  }
  
  &:hover {
    background: #e7e7e7;
  }
  
  @media print {
    display: none;
  }
`

function Details ({ recipe }) {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{recipe.name}</Title>

        <PrintButton onClick={() => window.print()}>
          <AiFillPrinter size={20} color="black"/>
          <span>Print</span>
        </PrintButton>
      </TitleWrapper>

      <Link to={`/u/${recipe.author.id}`}>
        <Profile>
          <ProfilePicture id={recipe.author.profilePicture} size={24} styles={{ marginRight: 6 }}/>
          <AuthorName>{recipe.author.displayName}</AuthorName>
        </Profile>
      </Link>

      <Description>{recipe.description}</Description>

      <Buttons>
        <Review recipe={recipe}/>
        <Share recipe={recipe} />
      </Buttons>

      <MetaData recipe={recipe}/>
    </Wrapper>
  )
}

Details.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired
}

export default Details
