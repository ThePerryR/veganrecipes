import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import { useRootStore } from '../../RootStoreProvider'
import { throttle } from 'throttle-debounce'
import { Image } from 'cloudinary-react'
import { Link, useHistory } from 'react-router-dom'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled.input`
  height: 34px;
  border-radius: 17px;
  width: 100%;
  padding-left: 36px;
  box-sizing: border-box;

  font-size: 14px;
  color: rgba(23, 153, 75, 1);
  border: 1px solid #e3e3e3;

  ::placeholder {
    color: rgba(23, 153, 75, 0.32);
  }

  &:focus {
    outline: none;
  }
`

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  background: white;
  color: #232323;
  padding-top: 16px;
  padding-bottom: 8px;
  width: 320px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  z-index: 1;
`

const Label = styled.div`
  font-size: 14px;
  font-weight: 700;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 8px;
`

const Recipe = styled.div`
  padding: 6px 12px;
  width: 100%;
  display: flex;
  align-items: center;
  background: white;
  transition: all 120ms linear;

  &:hover {
    background: #f3f3f3;
  }
`

const Info = styled.div``
const Name = styled.div`
  font-weight: 700;
  margin-bottom: 8px;
`
const Author = styled.div`
  font-size: 13px;
`

let search

function Search ({ initialSearch }) {
  const [query, setQuery] = useState(initialSearch || '')
  const [recipes, setRecipes] = useState([])
  const rootStore = useRootStore()
  const history = useHistory()

  useEffect(() => {
    search = throttle(400, false, async (query) => {
      const recipes = await rootStore.transportLayer.searchRecipes(query)
      setRecipes(recipes)
    }, false)
  }, [])
  return (
    <Wrapper>
      <StyledInput
        placeholder="What are you craving?"
        value={query}
        onChange={e => {
          setQuery(e.target.value)
          search(e.target.value)
        }}
        onBlur={() => setRecipes([])}
        onKeyPress={e => {
          if (e.key === 'Enter' && query) {
            setRecipes([])
            history.push(`/search/${query}`)
          }
        }}
      />
      <AiOutlineSearch color="#17D764" size={16} style={{ position: 'absolute', left: 10, top: 9 }}/>
      {!!recipes.length &&
      <Dropdown>
        <Label>Recipes</Label>
        {recipes.map((recipe, i) => (
          <Link key={i} to={`/r/${recipe.slug}`} style={{ width: '100%' }}>
            <Recipe>
              <Image
                style={{ width: 56, borderRadius: 8, marginRight: 16 }}
                cloudName="easyvgn"
                publicId={recipe.images[0]}
                crop="crop"
                gravity="custom"
              />
              <Info>
                <Name>{recipe.name}</Name>
                <Author>{recipe.author.displayName}</Author>
              </Info>
            </Recipe>
          </Link>
        ))}
      </Dropdown>
      }
    </Wrapper>
  )
}

Search.propTypes = {
  initialSearch: PropTypes.string
}

export default Search
