import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('')

    const onSubmit = e => {
        window.scrollTo(0, 0)
        e.preventDefault()
        addPost({ text })
        setText('')
    }

    return (
        <Fragment>
            <div className='container'>
                <div className='post-form'>
                    <div className='bg-primary p'>
                        <h3><FormattedMessage id='say.something' /></h3>
                    </div>
                    <form className='form my-1' onSubmit={e => onSubmit(e)}>
                        <textarea
                            value={text}
                            name='text'
                            onChange={e => setText(e.target.value)}
                            cols='30'
                            rows='5'
                            placeholder='Create a post'
                            required
                        ></textarea>
                        <input type='submit' className='btn btn-dark my-1' value='Submit' />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default injectIntl(connect(null, { addPost })(PostForm))

