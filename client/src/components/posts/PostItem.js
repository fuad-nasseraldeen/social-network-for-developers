import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { addLike, removeLike, removePost } from '../../actions/post'
import Moment from 'react-moment'
function PostItem({ post, addLike, removeLike, removePost, showActions }) {
    const { _id, text, name, avatar, user, likes, comments, date } = post
    const auth = useSelector(state => state.rootReducer.auth)


    return (
        <Fragment>
            <div className='post bg-white p-1 my-1 form-text-border'>
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            className='round-img'
                            src={avatar}
                            alt=''
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className='my-1'>{text}</p>
                    <p className='post-date'>
                        <FormattedMessage id='posted.on' />
                        {<Moment format='YYYY/MM/DD'>{date}</Moment>}
                    </p>
                    {showActions && (
                        <Fragment>
                            <button onClick={e => addLike(_id)} type='button' className='btn btn-light'>
                                <i className='fas fa-thumbs-up header-icon'></i>
                                {likes && likes.length > 0 && (
                                    <span>{likes.length}</span>
                                )}
                            </button>
                            <button onClick={e => removeLike(_id)} type='button' className='btn btn-light'>
                                <i className='fas fa-thumbs-down header-icon'></i>
                            </button>
                            <Link to={`/posts/${_id}`} className='btn btn-primary'>
                                <FormattedMessage id='posts.discussion' />
                                {comments && comments.length > 0 && (
                                    <span className='comment-count header-icon'>{comments.length}</span>
                                )}
                            </Link>
                            {!auth.loading && user === auth.user._id && (
                                <button
                                    onClick={e => removePost(_id)}
                                    type='button'
                                    className='btn btn-danger'
                                >
                                    <i className='fas fa-times'></i>
                                </button>
                            )}
                        </Fragment>
                    )}

                </div>
            </div>
        </Fragment >
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
}
export default injectIntl(connect(null, { addLike, removeLike, removePost })(PostItem))

