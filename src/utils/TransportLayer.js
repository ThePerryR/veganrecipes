import fetchUtil, { checkStatus, parseJSON } from './fetch'

export default class TransportLayer {
  fetch = (path, method, body, query) => new Promise((resolve, reject) => {
    fetchUtil(path, method, body, query, this.csrf).then(checkStatus).then(parseJSON).then(resolve).catch(reject)
  })

  register = (email, password, displayName) => this.fetch('/register', 'POST', { email, password, displayName })
  login = (email, password) => this.fetch('/login', 'POST', { email, password })

  createRecipe = (name, description) => this.fetch('/api/recipe', 'POST', { name, description })
  fetchRecipe = (id) => this.fetch(`/api/recipe/${id}`)
  deleteRecipe = (id) => this.fetch(`/api/recipe/${id}`, 'DELETE')
}