import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { AiOutlineLink } from 'react-icons/ai'
import { FacebookShareButton, PinterestShareButton } from 'react-share'
import { FaFacebook, FaPinterest } from 'react-icons/fa'

import { useRootStore } from '../../../../RootStoreProvider'
import { Recipe } from '../../../../../stores/RecipeStore'

const Wrapper = styled.div`
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

function Share ({ recipe }) {
  const rootStore = useRootStore()
  return (
    <Wrapper>
      <span style={{ marginRight: 12, fontWeight: 500, fontSize: 14 }}>Share:</span>
      <CopyToClipboard
        text={recipe.url}
        onCopy={() => rootStore.notyf.success('Recipe url has been copied to your clipboard!')}>
        <ShareButton style={{ marginRight: 8 }}>
          <AiOutlineLink size={18} style={{ marginRight: 6 }}/>
          <span>Copy URL</span>
        </ShareButton>
      </CopyToClipboard>

      <FacebookShareButton
        url={recipe.url}
        hashtag="#vegan"
        quote={recipe.description}>
        <ShareButton style={{ marginRight: 8, color: '#3B5998' }}>
          <FaFacebook size={20}/>
        </ShareButton>
      </FacebookShareButton>
      {recipe.images[0] &&
      <PinterestShareButton
        url={recipe.url}
        media={`https://res.cloudinary.com/easyvgn/image/upload/w_1200,h_627,c_fill/${recipe.images[0]}.jpg`}
        description={recipe.description}>
        <ShareButton style={{ color: '#E60023' }}>
          <FaPinterest size={20}/>
        </ShareButton>
      </PinterestShareButton>
      }
    </Wrapper>
  )
}

Share.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired
}

export default Share
