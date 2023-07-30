import React, { useEffect } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect, useSelector } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import * as _ from 'lodash'
import PostForm from './PostForm'

function Posts({ getPosts }) {
    useEffect(() => {
        getPosts()
    }, [getPosts])

    const post = useSelector(state => state.rootReducer.post)
    const { posts, loading } = post
    return (
        !_.isEmpty(post) && loading ? <Spinner />
            : (
                <div className='container'>
                    <h1 className='large text-primary'>
                        <FormattedMessage id='posts' />
                    </h1>

                    <p className='lead'>
                        <i className='fas fa-user header-icon' />
                        <FormattedMessage id='posts.welcome' />
                    </p>
                    <PostForm key={post._id} />
                    <div className='posts'>
                        {!_.isEmpty(post) && posts.map(post => {
                            return (
                                <PostItem key={post._id} post={post} />
                            )
                        })}
                    </div>
                </div>
            )
    )
}

Posts.propTypes = {

}

export default injectIntl(connect(null, { getPosts })(Posts))

