import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ProfilePicture from '../../elements/ProfilePicture'
import { observer } from 'mobx-react'
import { User } from '../../../stores/UserStore'

const Dropdown = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 4px;
  width: 320px;
  top: 68px;
  right: -40px;
  background: white;
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.32);
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;

  &:hover {
    ${Dropdown} {
      display: flex;
    }
  }
`

const Arrow = styled.div`
  position: absolute;
  right: 66px;
  top: -8px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;

  border-bottom: 8px solid white;
`

const Option = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`

function UserDropdown ({ user }) {
  return (
    <Wrapper>
      <Link to={`/u/${user.id}`}>
        <ProfilePicture name={user.displayName} id={user.profilePicture} size={40}/>
      </Link>
      <Dropdown>
        <Arrow/>
        <Link to={`/u/${user.id}`}>
          <Option>Profile</Option>
        </Link>
        <a href="/logout" style={{ textDecoration: 'none' }}>
          <Option>Logout</Option>
        </a>
      </Dropdown>
    </Wrapper>
  )
}

UserDropdown.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
}

export default observer(UserDropdown)
