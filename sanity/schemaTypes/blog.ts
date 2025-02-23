import { defineType, defineField } from 'sanity'

export const blog = defineType({
    name: "blog",
    title: "Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: (Rule) => Rule.required().max(160).warning(
                "Descriptions should be less than 160 characters"
            ),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "icon",
            title: "Icon",
            type: "string",
            validation: (Rule) => Rule.required().warning(
                "Need Icon"),
        }),
        defineField({
            name: "image",
            title: "Main Image",
            type: "image",
            options: {
                hotspot: true,
                accept: "image/*",

            },
            validation: (Rule) => Rule.required().assetRequired(),
        }),
        defineField({
            name: "created_at",
            title: "Created At",
            type: "string",
            initialValue: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }),

            readOnly: true,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            title: "Estimated Reading Time (Minutes)",
            name: "estimated_reading_time",
            type: "number",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            title: "Category",
            name: "category",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            title: 'Content',
            name: 'content',
            type: 'array',
            of: [
                { type: 'block' }, // Allows rich text (headings, paragraphs, etc.)
                { type: 'image' } // Allows images inside the blog content
            ]
        })
    ]
})
