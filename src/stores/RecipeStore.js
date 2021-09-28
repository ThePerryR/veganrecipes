import { computed, observable, toJS, makeObservable } from 'mobx'

/**
 * UserStore
 */
export default class UserStore {
  recipes = []

  constructor (rootStore, recipes = []) {
    makeObservable(this, {
      recipes: observable
    })
    this.rootStore = rootStore
    recipes.forEach(this.addRecipeFromJSON)
  }

  find = (id) => this.recipes.find(recipe => recipe.id === id.toString())

  addRecipeFromJSON = (json) => {
    let recipe = this.find(json._id)
    if (!recipe) {
      recipe = new Recipe(this, json)
      this.recipes.push(recipe)
    } else {
      recipe.updateFromJSON(json)
    }
    return recipe
  }

  get currentUsersRecipes () {
    if (this.rootStore.userStore.currentUser) {
      return this.recipes.filter(recipe => recipe._author === this.rootStore.currentUserId)
    }
  }
}

export class Recipe {
  id = null
  name = ''
  description = ''
  images = []
  _author = null

  constructor (store, json) {
    makeObservable(this, {
      name: observable,
      description: observable
    })
    this.id = json._id.toString()
    this.store = store
    this.updateFromJSON(json)
  }

  updateFromJSON = (json) => {
    this.name = json.name || ''
    this.description = json.description || ''
    this.images = json.images || []

    if (json.author && typeof json.author === 'object' && json.author._id) {
      this.store.rootStore.userStore.addUserFromJSON(json.author)
      this._author = json.author._id.toString()
    } else {
      this._author = json.author.toString()
    }
  }

  delete = async () => {
    await this.store.rootStore.transportLayer.deleteRecipe(this.id)
    this.store.recipes.splice(this.store.recipes.findIndex(recipe => recipe === this), 1)
  }

  get author () {
    return this.store.rootStore.userStore.find(this._author)
  }

  get asJSON () {
    return {
      _id: this.id,
      name: this.name,
      description: this.description,
      images: this.images
    }
  }
}
