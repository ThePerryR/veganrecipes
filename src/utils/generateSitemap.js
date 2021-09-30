import Recipes from '../schemas/Recipe'

const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')

let sitemap

async function generateSitemap (req, res) {
  res.header('Content-Type', 'application/xml')
  res.header('Content-Encoding', 'gzip')
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap)
    return
  }

  try {
    const smStream = new SitemapStream({ hostname: 'https://www.easyvgn.com/' })
    const pipeline = smStream.pipe(createGzip())

    smStream.write({ url: '/' })
    smStream.write({ url: '/recipes/new' })
    smStream.write({ url: '/recipes/popular' })
    const recipes = await Recipes.find({})
    for (const recipe of recipes) {
      smStream.write({ url: `/r/${recipe.slug}` })
    }

    // cache the response
    streamToPromise(pipeline).then(sm => {
      sitemap = sm
    })
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end()
    // stream write the response
    pipeline.pipe(res).on('error', (e) => { throw e })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export default generateSitemap
