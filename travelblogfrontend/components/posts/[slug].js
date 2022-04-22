import groq from 'groq'
import Tag from '../Tag'
import {PortableText} from '@portabletext/react'
import {urlFor} from '../../lib/sanity'
import {getClient} from '../../lib/sanity.server'
import Map from '../Map'
import Image from 'next/image'

const PostComponents = {
    types: {
        image: ({value = undefined}) => {
            return (
                <Image
                    className={'post-image'}
                    alt={value.alt || ' '}
                    src={urlFor(value).width(600).url()}
                    layout={'fill'}
                />
            )
        }
    }
}

const ColoredLine = ({ color = undefined }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

const post = ({post = undefined}) => {

    const {tittle, mainImage, categories, body, authorImage, username, about, publishedAt, postedAt} = post

    console.log(PostComponents)
    return (
        <>
            {post && <article className={'post-container-column'}>
                <h1>{tittle}</h1>

                <ColoredLine color={'#000000'}/>

                <div className={'tag-container'}>
                    {categories.map((category) => (
                        <>
                            {category && (<Tag key={category.id} title={category.tittle}/>)}
                        </>
                    ))}
                </div>

                <PortableText value={body} components={PostComponents}/>
                <Image
                    className={'post-image'}
                    alt={'img'}
                    src={urlFor(mainImage).width(600).url()}
                    layout={'fill'}
                />

                <ColoredLine/>

                <div className={'info-container'}>
                    <div className={'author-container'}>
                        <Image
                            className={'avatar'}
                            alt={username + 'avatar'}
                            src={urlFor(authorImage).url()}
                            layout={'fill'}
                        />
                        <h3>Author: <strong>{username}</strong></h3>
                        <p>About author</p>
                        <p>{about}</p>
                    </div>

                    <div className={'map-container'}>
                        <Map longitude={postedAt.lng} latitude={postedAt.lat}/>
                    </div>

                </div>
            </article>}
        </>
    )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]
{
    tittle,
    "username": author->username,
    "about": author->bio,
    "categories": categories[]->{id, tittle},
    "authorImage": author->avatar,
    body,
    publishedAt,
    mainImage,
    postedAt
    }
    `

export async function getStaticPaths() {
    const paths = await getClient().fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: true
    }
}

export async function getStaticProps({params, preview = false}) {
    const post = await getClient(preview).fetch(query, {slug: params.slug})
    return {
        props: {
            post
        }
    }
}

export default post