import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'personalInfo',
  title: 'Personal Info',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Professional title or tagline',
    }),
    defineField({
      name: 'valueProposition',
      title: 'Value Proposition',
      type: 'string',
      description: 'Main freelancer headline (e.g., "I Build Custom Software Solutions That Drive Real Business Results")',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'clientBenefits',
      title: 'Client Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key benefits you offer clients (e.g., "Fast delivery", "Scalable solutions")',
      validation: (Rule) => Rule.required().min(3).max(5),
    }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      description: 'Current availability (e.g., "Accepting projects for Q1 2025")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Number of years in development',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'projectsCompleted',
      title: 'Projects Completed',
      type: 'number',
      description: 'Total number of projects delivered',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'happyClients',
      title: 'Happy Clients',
      type: 'number',
      description: 'Number of satisfied clients',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      description: 'Brief introduction for hero section',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'longBio',
      title: 'Long Bio',
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
      name: 'resumeURL',
      title: 'Resume File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Email', value: 'email' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Portfolio', value: 'portfolio' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'valueProposition',
      media: 'profileImage',
    },
  },
})
