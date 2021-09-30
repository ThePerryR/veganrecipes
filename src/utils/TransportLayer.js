import fetchUtil, { checkStatus, parseJSON } from './fetch'

export default class TransportLayer {
  fetch = (path, method, body, query) => new Promise((resolve, reject) => {
    fetchUtil(path, method, body, query, this.csrf).then(checkStatus).then(parseJSON).then(resolve).catch(reject)
  })

  register = (email, password, displayName) => this.fetch('/register', 'POST', { email, password, displayName })
  login = (email, password) => this.fetch('/login', 'POST', { email, password })

  fetchUser = id => this.fetch(`/api/user/${id}`)
  updateUser = (id, json) => this.fetch(`/api/user/${id}`, 'PUT', json)

  createRecipe = (name, description, images, ingredients, instructions) => this.fetch('/api/recipe', 'POST', { name, description, images, ingredients, instructions })
  fetchRecipes = (query) => this.fetch('/api/recipe', 'get', null, query)
  fetchRecipe = (id) => this.fetch(`/api/recipe/${id}`)
  deleteRecipe = (id) => this.fetch(`/api/recipe/${id}`, 'DELETE')
  reviewRecipe = (id, userId, stars) => this.fetch(`/api/recipe/${id}/review`, 'POST', { userId, stars })
}
