import flaggedArt from '../data/flaggedArt'

const isFlagged = id => {
  return flaggedArt.some(article => {
    return article.articleId == id
  })
}

export default isFlagged
