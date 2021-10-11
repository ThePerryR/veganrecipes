import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'

import { useRootStore } from '../../RootStoreProvider'
import RecipeGrid from '../../sections/RecipeGrid'
import Button from '../../elements/Button'
import ProfilePicture from '../../elements/ProfilePicture'

const Wrapper = styled.div`
  padding: 40px;
`

const Top = styled.div`
  display: flex;
  padding-bottom: 64px;
  justify-content: space-between;
`
const Personal = styled.div`

`

const Name = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
`
const About = styled.h5`
  font-size: 16px;
  font-weight: 400;
`

const Info = styled.div`
  display: flex;
`

const Links = styled.div`
  display: flex;
`

function Profile () {
  const rootStore = useRootStore()
  const { id } = useParams()
  const [user, setUser] = useState(rootStore.userStore.find(id))
  const [recipes, setRecipes] = useState(rootStore.recipeStore.filterByAuthor(id))

  useEffect(() => {
    async function loadData () {
      const json = await rootStore.transportLayer.fetchUser(id)
      setUser(rootStore.userStore.addUserFromJSON(json))
      const recipes = await rootStore.transportLayer.fetchRecipes({ author: id })
      setRecipes(recipes.map(rootStore.recipeStore.addRecipeFromJSON))
    }

    loadData()
  }, [id])

  if (!user) {
    return <div>Loading...</div>
  }

  const canEdit = user.id === rootStore.currentUserId

  return (
    <Wrapper>
      <Top>
        <Info>
          <ProfilePicture id={user.profilePicture} size={120} styles={{ marginRight: 24 }}/>
          <Personal>
            <Name>{user.displayName}</Name>
            <About>{user.about}</About>
            <Links>

            </Links>
          </Personal>
        </Info>
        {canEdit &&
        <Link to="/account">
          <Button label="Edit Profile"/>
        </Link>
        }
      </Top>
      <RecipeGrid recipes={recipes}/>
    </Wrapper>
  )
}

Profile.propTypes = {}

export default Profile
