import TransportLayer from '../utils/TransportLayer'
import UserStore from './UserStore'
import RecipeStore from './RecipeStore'

export default class RootStore {
  constructor ({ users, recipes, currentUserId, initialSearch }, notyf) {
    this.transportLayer = new TransportLayer()
    this.currentUserId = currentUserId && currentUserId.toString()
    this.initialSearch = initialSearch

    this.userStore = new UserStore(this, users)
    this.recipeStore = new RecipeStore(this, recipes)

    this.notyf = notyf
  }
}
