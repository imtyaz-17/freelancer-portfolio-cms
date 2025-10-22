import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import personalInfo from './sanity/schemas/personalInfo'
import project from './sanity/schemas/project'
import skill from './sanity/schemas/skill'
import experience from './sanity/schemas/experience'
import service from './sanity/schemas/service'
import testimonial from './sanity/schemas/testimonial'
import faq from './sanity/schemas/faq'
import processStep from './sanity/schemas/processStep'

export default defineConfig({
  name: 'freelancer-portfolio-cms',
  title: 'Freelancer Portfolio CMS',
  projectId: '3bte25h4',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Freelancer Portfolio Content')
          .items([
            S.listItem()
              .title('Personal Info')
              .child(
                S.document()
                  .schemaType('personalInfo')
                  .documentId('personalInfo')
              ),
            S.divider(),
            S.listItem()
              .title('Services')
              .child(S.documentTypeList('service').title('Services')),
            S.listItem()
              .title('Client Success Stories')
              .child(S.documentTypeList('project').title('Projects')),
            S.listItem()
              .title('Process Steps')
              .child(S.documentTypeList('processStep').title('Process Steps')),
            S.listItem()
              .title('Testimonials')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            S.listItem()
              .title('FAQ')
              .child(S.documentTypeList('faq').title('FAQ')),
            S.divider(),
            S.listItem()
              .title('Skills')
              .child(S.documentTypeList('skill').title('Skills')),
            S.listItem()
              .title('Experience')
              .child(S.documentTypeList('experience').title('Experience')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [personalInfo, project, skill, experience, service, testimonial, faq, processStep],
  },
})