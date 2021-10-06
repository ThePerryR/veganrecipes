import slugify from 'slugify'

import Recipe from '../schemas/Recipe'

async function generateSlug(name) {
  const slug = slugify(name, { lower: true, strict: true })
  let unique = false
  let number = 0
  while (!unique) {
    const recipe = await Recipe.findOne({ slug: number ? `${slug}-${number}` : slug })
    if (!recipe) {
      unique = true
    } else {
      number++
    }
  }
  return number ? `${slug}-${number}` : slug
}

export default generateSlug
