import { observable, makeObservable } from 'mobx'

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
  findBySlug = (slug) => this.recipes.find(recipe => recipe.slug === slug)
  filterByAuthor = (userId) => this.recipes.filter(recipe => recipe._author === userId)

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
  slug = ''
  ingredients = []
  instructions = ''
  images = []
  ratingCount = 0
  ratingValue = 0
  createdAt
  updatedAt
  _author = null

  constructor (store, json) {
    makeObservable(this, {
      name: observable,
      description: observable,
      slug: observable,
      ratingCount: observable,
      ratingValue: observable,
      updatedAt: observable
    })
    this.id = json._id.toString()
    this.store = store
    this.updateFromJSON(json)
  }

  updateFromJSON = (json) => {
    this.name = json.name || ''
    this.description = json.description || ''
    this.slug = json.slug || ''
    this.ingredients = json.ingredients || []
    this.instructions = json.instructions || []
    this.images = json.images || []
    this.ratingValue = json.ratingValue || 0
    this.ratingCount = json.ratingCount || 0
    this.createdAt = json.createdAt
    this.updatedAt = json.updatedAt

    if (json.author && typeof json.author === 'object' && json.author.displayName) {
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

  get url () {
    return `https://www.easyvgn.com/r/${this.slug}`
  }

  get asJSON () {
    return {
      _id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      images: this.images,
      ingredients: this.ingredients,
      instructions: this.instructions
    }
  }
}
