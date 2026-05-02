import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'price',
      type: 'number',
    }),
    defineField({
      name: 'discountPercentage',
      type: 'number',
    }),
    defineField({
      name: 'isOnSale',
      type: 'boolean',
    }),
defineField({
      name: 'stock',
      type: 'number',
}),
    defineField({
 name: 'tags',
  title: 'Tags',
  type: 'array',
  of: [
    {
      type: 'string',
      options: {
        list: [
          { title: 'Best Seller', value: 'Best Seller' },
          { title: 'New Arrival', value: 'New Arrival' },
          { title: 'Preorder', value: 'Preorder' },
          { title: 'Coming Soon', value: 'Coming Soon' },
        ],
      },
    },
  ],
    }),
 defineField({
      name: 'variants',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'size',
              type: 'string',
            },
            {
              name: 'price',
              type: 'number',
            },
            {
              name: 'stock',
              type: 'number',
            }
          ],
        }),
      ],
    }),
    defineField({
      name: 'brand',
      type: 'reference',
      to: {type: 'brand'},
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      author: 'brand.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
