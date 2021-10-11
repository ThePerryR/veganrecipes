import { computed, observable, makeObservable } from 'mobx'

/**
 * UserStore
 */
export default class UserStore {
  users = []

  constructor (rootStore, users = []) {
    makeObservable(this, {
      users: observable,
      currentUser: computed
    })
    this.rootStore = rootStore
    this.users = users.map(json => new User(this, json))
  }

  find = (id) => this.users.find(user => user.id === id.toString())

  addUserFromJSON = (json) => {
    let user = this.find(json._id)
    if (!user) {
      user = new User(this, json)
      this.users.push(user)
    } else {
      user.updateFromJSON(json)
    }
    return user
  }

  get currentUser () {
    if (!this._currentUser && this.rootStore.currentUserId) {
      this._currentUser = this.users.find(user => user.id === this.rootStore.currentUserId)
    }
    return this._currentUser
  }
}

/**
 * User
 */
export class User {
  id = null
  email = ''
  displayName = ''
  about = ''
  urls = []
  profilePicture = null

  constructor (store, json) {
    makeObservable(this, {
      email: observable,
      displayName: observable,
      about: observable,
      urls: observable,
      profilePicture: observable
    })
    this.id = json._id.toString()
    this.store = store
    this.updateFromJSON(json)
  }

  updateFromJSON = (json) => {
    this.email = json.email
    this.displayName = json.displayName || ''
    this.about = json.about || this.about || ''
    this.urls = json.urls || this.urls || []
    this.profilePicture = json.profilePicture
  }

  get asJSON () {
    return {
      _id: this.id,
      email: this.email,
      about: this.about,
      displayName: this.displayName,
      urls: this.urls,
      profilePicture: this.profilePicture
    }
  }
}
