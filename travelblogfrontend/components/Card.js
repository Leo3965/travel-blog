import {urlFor} from '../lib/sanity'
import Tag from './Tag'
import {forwardRef} from 'react'

const Card = forwardRef(({onClick, href, post}, ref) => {

    const {tittle, publishedAt, mainImage, authorImage, username, categories} = post

    return (
        <div className="card-container" href={href} onClick={onClick} ref={ref}>
            <h2>{tittle}</h2>
            <p>Published on: {new Date(publishedAt).toDateString()}</p>

            <img
                className="main-image"
                alt={tittle + 'image'}
                src={urlFor(mainImage).width(600).url()}
            />

            <hr/>

            <div className="info-container">
                <p>Posted by: {username}</p>
                <img
                    className={'avatar'}
                    alt={username + 'avatar'}
                    src={urlFor(authorImage).url()}
                />
            </div>

            <div className={'tag-container'}>
                {categories.map(category => (
                    <>
                        {category && (<Tag key={category.id} title={category.tittle}/>)}
                    </>
                ))}
            </div>
        </div>
    )
})

export default Card

