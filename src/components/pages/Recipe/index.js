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
import { Helmet } from 'react-helmet'

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
      <Helmet>
        <title>{recipe.name} | EasyVgn</title>
        <mete name="description" content={recipe.description}/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={`${recipe.name} | EasyVgn`}/>
        <meta property="og:description" content={recipe.description}/>
        <meta property="og:url" content={`https://www.easyvgn.com/r/${recipe.slug}`}/>
        <meta
          property="og:image"
          content={recipe.images[0] ? `https://res.cloudinary.com/easyvgn/image/upload/w_1200,h_627,c_fill/${recipe.images[0]}.jpg` : 'https://www.easyvgn.com/main-card.jpg'}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Recipe',
            'name': 'Party Coffee Cake',
            'image': [
              recipe.images.map(id => `https://res.cloudinary.com/easyvgn/image/upload/c_crop,g_custom/${id}.jpg`)
            ],
            'author': {
              '@type': 'Person',
              'name': recipe.author.displayName
            },
            // 'datePublished': '2018-03-10',
            'description': recipe.description,
            // 'prepTime': 'PT20M',
            // 'cookTime': 'PT30M',
            // 'totalTime': 'PT50M',
            // 'keywords': 'cake for a party, coffee',
            // 'recipeYield': '10',
            // 'recipeCategory': 'Dessert',
            // 'recipeCuisine': 'American',
            /*
            'nutrition': {
              '@type': 'NutritionInformation',
              'calories': '270 calories'
            },*/
            'recipeIngredient': recipe.ingredients,
            'recipeInstructions': recipe.instructions.map((instruction, i) => ({
              '@type': 'HowToStep',
              'name': `Step ${i + 1}`,
              'text': instruction,
              'url': `https://www.easyvegan.com/r/${recipe.slug}#step${i + 1}`,
              // 'image': 'https://example.com/photos/party-coffee-cake/step1.jpg'
            })),
            /*
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '5',
              'ratingCount': '18'
            },*/
          })}
        </script>
      </Helmet>
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
                text={`https://www.easyvgn.com/r/${recipe.slug}`}
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
