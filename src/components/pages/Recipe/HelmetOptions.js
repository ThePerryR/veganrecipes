import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Recipe } from '../../../stores/RecipeStore'
import categories from '../../../constants/categories'

function HelmetOptions ({ recipe }) {
  const json = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.name,
    image: [
      recipe.images.map(id => `https://res.cloudinary.com/easyvgn/image/upload/c_crop,g_custom/${id}.jpg`)
    ],
    author: {
      '@type': 'Person',
      name: recipe.author.displayName
    },
    datePublished: new Date(recipe.createdAt).toISOString().split('T')[0],
    description: recipe.description,
    prepTime: recipe.metadata.prepTime ? `PT${recipe.metadata.prepTime}M` : '',
    cookTime: recipe.metadata.cookTime ? `PT${recipe.metadata.cookTime}M` : '',
    totalTime: recipe.metadata.cookTime ? `PT${recipe.metadata.cookTime + (recipe.metadata.prepTime || 0)}M` : '',
    keywords: 'vegan',
    recipeYield: recipe.metadata.yield,
    recipeCategory: recipe.category && categories.find(({ value }) => value === recipe.category).label,
    recipeCuisine: 'Vegan',
    /*
    'nutrition': {
      '@type': 'NutritionInformation',
      'calories': '270 calories'
    }, */
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((instruction, i) => ({
      '@type': 'HowToStep',
      text: instruction,
      url: `${recipe.url}#step${i + 1}`
      // 'image': 'https://example.com/photos/party-coffee-cake/step1.jpg'
    })),
  }
  /*
  aggregateRating: {

    }
   */
  if (recipe.ratingCount) {
    json.aggeregateRating = {
      '@type': 'AggregateRating',
      ratingValue: recipe.ratingValue,
      ratingCount: recipe.ratingCount,
      bestRating: 5
    }
  }
  return (
    <Helmet>
      <title>{recipe.name} | EasyVgn</title>
      <meta
        name="description"
        content={recipe.description || `Vegan ${recipe.name} recipe created by the EasyVgn community.`}
      />
      <meta property="og:type" content="website"/>
      <meta property="og:title" content={`Vegan ${recipe.name}`}/>
      <meta property="og:description" content={recipe.description}/>
      <meta property="og:url" content={recipe.url}/>
      {recipe.images[0] &&
      <meta
        property="og:image"
        content={`https://res.cloudinary.com/easyvgn/image/upload/w_1200,h_627,c_fill/${recipe.images[0]}.jpg`}
      />
      }
      <script type="application/ld+json">
        {JSON.stringify(json)}
      </script>
    </Helmet>
  )
}

HelmetOptions.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired
}

export default HelmetOptions
