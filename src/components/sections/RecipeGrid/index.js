import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'
import { observer } from 'mobx-react'

const Wrapper = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
  grid-gap: 32px;
  list-style: none;
`

const Card = styled.li`
  background: white;
  border-radius: 13px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 120ms linear;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`

const Thumbnail = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 100%;
  background-color: #020409;
`

const Details = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 10px;
`

const ProfilePicture = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #020409;
  margin-right: 16px;
`

const Name = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
`

const DisplayName = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #6D796B;
`

function RecipeGrid ({ recipes }) {
  return (
    <Wrapper>
      {recipes.map(recipe => (
        <Link key={recipe.id} to={`/r/${recipe.id}`}>
          <Card key={recipe.id}>
            <Thumbnail>
              {recipe.images[0] &&
              <Image
                cloudName="easyvgn"
                publicId={recipe.images[0]}
                crop="crop"
                gravity="custom"
                style={{ width: '100%' }}
              />
              }
            </Thumbnail>
            <Details>
              <ProfilePicture/>
              <div>
                <Name>{recipe.name}</Name>
                {recipe.author &&
                <DisplayName>{recipe.author.displayName}</DisplayName>
                }
              </div>
            </Details>
          </Card>
        </Link>
      ))}
    </Wrapper>
  )
}

RecipeGrid.propTypes = {}

export default observer(RecipeGrid)
