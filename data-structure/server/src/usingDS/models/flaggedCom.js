import flaggedCom from '../data/flaggedCom'

const isFlagged = id => {
  return flaggedCom.some(comment => {
    return comment.commentId == id
  })
}

export default isFlagged
