import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Image } from 'cloudinary-react'
import styled from 'styled-components'
import { AiOutlineLink } from 'react-icons/ai'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useRootStore } from '../../RootStoreProvider'
import IngredientList from './IngredientList'
import InstructionList from './InstructionList'
import ProfilePicture from '../../elements/ProfilePicture'

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
  margin-bottom: 8px;
`
const Description = styled.p`
  font-size: 16px;
  line-height: 32px;
  margin-bottom: 40px;
`

const Requirements = styled.div`
  display: flex;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`

const Share = styled.div`
  display: flex;
  align-items: center;
`

const ShareButton = styled.div`
  height: 40px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid #cbcbcb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  background: white;
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

function Recipe () {
  const rootStore = useRootStore()
  const { id } = useParams()
  const history = useHistory()
  let notyf
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
          <Link to={`/u/${recipe.author.id}`}>
            <Profile>
              <ProfilePicture id={recipe.author.profilePicture} size={24} styles={{ marginRight: 6 }}/>
              <AuthorName>{recipe.author.displayName}</AuthorName>
            </Profile>
          </Link>
          <Description>{recipe.description}</Description>
          <Buttons>
            <div/>
            <Share>
              <span style={{ marginRight: 12, fontWeight: 500, fontSize: 14 }}>Share:</span>
              <CopyToClipboard
                text={`https://www.easyvgn.com/r/${recipe.id}`}
                onCopy={() => {
                  rootStore.notyf.success('Recipe url has been copied to your clipboard!')
                }}>
                <ShareButton>
                  <AiOutlineLink size={18} style={{ marginRight: 6 }}/>
                  <span>Share URL</span>
                </ShareButton>
              </CopyToClipboard>
            </Share>
          </Buttons>
        </Details>
      </Overview>
      <Requirements>
        <IngredientList ingredients={recipe.ingredients}/>
        <InstructionList instructions={recipe.instructions}/>
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
