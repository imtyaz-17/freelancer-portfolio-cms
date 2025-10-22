import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Brief project description for cards',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    }),
    defineField({
      name: 'liveDemoLink',
      title: 'Live Demo',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'Optional: Client name (e.g., "Acme Corp" or "E-commerce Startup")',
    }),
    defineField({
      name: 'clientType',
      title: 'Client Type',
      type: 'string',
      description: 'Type of client (e.g., "Startup", "Agency", "Small Business")',
      options: {
        list: [
          { title: 'Startup', value: 'startup' },
          { title: 'Agency', value: 'agency' },
          { title: 'Small Business', value: 'smb' },
          { title: 'Enterprise', value: 'enterprise' },
          { title: 'Non-profit', value: 'nonprofit' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'problemSolved',
      title: 'Problem Solved',
      type: 'text',
      description: 'Client\'s challenge or business problem',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'solution',
      title: 'Solution Delivered',
      type: 'text',
      description: 'What you built from business perspective',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'results',
      title: 'Results/Impact',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Measurable outcomes (e.g., "30% increase in sales", "500+ users")',
    }),
    defineField({
      name: 'resultMetrics',
      title: 'Result Metrics',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Quantifiable results (e.g., "30% increase in sales", "500+ users")',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      description: 'Highlight this as a top case study',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName',
      media: 'coverImage',
    },
  },
})
