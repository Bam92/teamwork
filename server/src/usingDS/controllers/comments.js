import flaggedCom from '../data/flaggedCom';
import { getById } from '../models/comments';
import isFlagged from '../models/flaggedCom';

class Comment {
  static flagComment(req, res) {
    let success = true;
    let  status = 201;
    const { id } = req.params;
    const { reason } = req.body;

    if (isNaN(id)) {
      success = false;
      status = 400;
      return res.status(status).json({ status, success, error: 'id must be an integer' });
    }

    const targetCom = getById(id);

    if (!targetCom) {
      success = false;
      status = 404;
      return res.status(status).json({ status, success, error: `comment with id ${id} does not exist` });
    }

    if (isFlagged(id)) {
      success = false;
      status = 409;
      return res.status(status).json({ status, success, error: `comment with id ${id} is already flagged` });
    }

    if (reason) {
      const flagged = { _id: flaggedCom.length + 1, commentId: parseInt(id), reason };

      flaggedCom.push(flagged)

      return res.status(status).json({ status, success, message: `comment with id ${id} successfully flagged` });
    }
    else {
      success = false;
      status = 400;
      return res.status(status).json({ status, success, error: 'Please state the reason why you want to flag this comment' });
    }
  }
}

export default Comment;

