import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Image } from 'cloudinary-react'
import styled from 'styled-components'

import { useRootStore } from '../../RootStoreProvider'
import IngredientList from './IngredientList'
import InstructionList from './InstructionList'

const Wrapper = styled.div`
  padding: 56px;
`

const Overview = styled.div`
  display: flex;
  margin-bottom: 64px;
`

const Photos = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`

const Details = styled.div`
  flex: 1;
  padding-left: 56px;
`

const PhotosList = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  margin-left: -8px;
  margin-right: -8px;
`

const StyledImage = styled(Image)`
  width: 100px;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
`

const Title = styled.h1`
  font-size: 40px;
  line-height: 64px;
  font-weight: 700;
  color: #303030;
  margin-bottom: 16px;
`
const Description = styled.p`
  font-size: 16px;
  line-height: 32px;
`

const Requirements = styled.div`
  display: flex;
`

function Recipe () {
  const rootStore = useRootStore()
  const { id } = useParams()
  const history = useHistory()
  const [missing, setMissing] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    async function fetchRecipe () {
      const json = await rootStore.transportLayer.fetchRecipe(id)
      console.log('loadded', json)
      if (!json) {
        return setMissing(true)
      }
      rootStore.recipeStore.addRecipeFromJSON(json)
    }

    console.log('load')
    if (!rootStore.recipeStore.find(id)) {
      console.log('fetching')
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
      <Overview>
        <Photos>
          {recipe.images[imageIndex] &&
          <Image
            style={{ width: '100%', marginBottom: 16 }}
            cloudName="easyvgn"
            publicId={recipe.images[imageIndex]}
            crop="crop"
            gravity="custom"
          />
          }
          <PhotosList>
            {recipe.images.map((publicId, i) => (
              <div key={publicId} onClick={() => setImageIndex(i)}>
                <StyledImage
                  cloudName="easyvgn"
                  publicId={publicId}
                  crop="crop"
                  gravity="custom"
                />
              </div>
            ))}
          </PhotosList>
        </Photos>
        <Details>
          <Title>{recipe.name}</Title>
          <Description>{recipe.description}</Description>
        </Details>
      </Overview>
      <Requirements>
        <IngredientList ingredients={recipe.ingredients}/>
        <InstructionList instructions={recipe.instructions} />
      </Requirements>
      {admin &&
      <div style={{ marginTop: 64 }}>
        <div onClick={handleClickDelete}>Delete</div>
      </div>
      }
    </Wrapper>
  )
}

export default observer(Recipe)
