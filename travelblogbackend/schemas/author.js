export default {
    name: 'author',
    tittle: 'Author',
    type: 'document',
    fields: [
        {
            name: 'username',
            tittle: 'Username',
            type: 'string'
        },
        {
            name: 'avatar',
            tittle: 'Avatar',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'slug',
            tittle: 'slug',
            type: 'slug',
            options: {
                source: 'username',
                maxLength: 96
            }
        },
        {
            name: 'bio',
            tittle: 'Bio',
            type: 'text'
        }
    ],
    preview: {
        select: {
            title: 'username',
            media: 'avatar'
        }
    }
}