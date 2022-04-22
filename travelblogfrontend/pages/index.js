import {getClient} from '../lib/sanity.server'
import groq from 'groq'
import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/Card'

const Home = ({posts}) => {

    return (
        <div className={'dashboard'}>
            <Head>
                <title>Nomad Travel Blog</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name={"viewport"} content={"initial-scale=1.0, width=device=width"}/>
            </Head>

            <div className="post-container">
                {posts?.map(post => (
                    <Link
                        key={post.id}
                        href="/travelblogfrontend/components/posts/[slug]"
                        as={`/posts/${post.slug.current}`}
                        passHref
                    >
                        <Card post={post}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const client = getClient()
    const query = groq`
        *[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
        _id,
        tittle,
        "username": author->username,
        "categories": categories[]->{id, tittle},
        "authorImage": author->avatar,
        body,
        "mainImage": mainImage.asset->url,
        slug,
        publishedAt
        }
    `
    const posts = await client.fetch(query)
    return {
        props: {
            posts,
        }
    }
}

export default Home