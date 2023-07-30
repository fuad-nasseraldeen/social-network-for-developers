import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect, useSelector } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'
import { getPost } from '../../actions/post'

const Post = ({ getPost }) => {
  const { id } = useParams()
  const _post = useSelector(state => state.rootReducer.post)
  const { post, loading } = _post

  useEffect(() => {
    getPost(id)
  }, [getPost, id])

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <Link to='/posts' className='btn form-text-border'>
          <FormattedMessage id='back.to.post' />
        </Link>
        <PostItem post={post} showActions={false} />

        <CommentForm postId={post._id} />
        <div className='comments'>
          {post.comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      </div>
    </Fragment>

  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired
}


export default injectIntl(connect(null, { getPost })(Post))