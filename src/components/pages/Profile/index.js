import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { useRootStore } from '../../RootStoreProvider'
import RecipeGrid from '../../sections/RecipeGrid'
import Button from '../../elements/Button'

const Wrapper = styled.div`
  padding: 40px;
`

const Top = styled.div`
  display: flex;
  padding-bottom: 64px;
  justify-content: space-between;
`

const ProfilePicture = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  background: black;
  margin-right: 24px;
`
const Personal = styled.div`

`

const Name = styled.div`
  font-size: 32px;
  font-weight: 700;
`

const Info = styled.div`
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
          <ProfilePicture/>
          <Personal>
            <Name>{user.displayName}</Name>
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
