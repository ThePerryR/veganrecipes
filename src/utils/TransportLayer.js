import fetchUtil, { checkStatus, parseJSON } from './fetch'

export default class TransportLayer {
  fetch = (path, method, body, query) => new Promise((resolve, reject) => {
    fetchUtil(path, method, body, query, this.csrf).then(checkStatus).then(parseJSON).then(resolve).catch(reject)
  })

  register = (email, password, displayName) => this.fetch('/register', 'POST', { email, password, displayName })
  login = (email, password) => this.fetch('/login', 'POST', { email, password })

  fetchUser = id => this.fetch(`/api/user/${id}`)
  updateUser = (id, json) => this.fetch(`/api/user/${id}`, 'PUT', json)

  createRecipe = (name, description, category, images, ingredients, instructions, metadata) => this.fetch('/api/recipe', 'POST', { name, description, category, images, ingredients, instructions, metadata })
  fetchRecipes = (query) => this.fetch('/api/recipe', 'get', null, query)
  fetchRecipe = (id) => this.fetch(`/api/recipe/${id}`)
  updateRecipe = (id, update) => this.fetch(`/api/recipe/${id}`, 'PUT', update)
  deleteRecipe = (id) => this.fetch(`/api/recipe/${id}`, 'DELETE')
  reviewRecipe = (id, userId, stars) => this.fetch(`/api/recipe/${id}/review`, 'POST', { userId, stars })
  favoriteRecipe = (id) => this.fetch(`/api/recipe/${id}/favorite`, 'POST')
  searchRecipes = (query) => this.fetch(`/api/recipe/search/${query}`)
}
