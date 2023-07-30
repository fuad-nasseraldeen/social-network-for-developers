import React, { Fragment } from 'react'
import spinner from './spinner-without-background.gif'

const Spinner = () => {
    return (
        <Fragment>
            <img
                src={spinner}
                style={{
                    width: '200px', margin: 'auto', display: 'block',
                    position: 'fixed', top: '50%', left: '40%'
                }}
                alt='Loading...'
            />
        </Fragment>
    )
}
export default Spinner