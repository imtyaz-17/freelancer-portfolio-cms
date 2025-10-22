import { groq } from 'next-sanity'

// Personal Info Query (Singleton)
export const personalInfoQuery = groq`
  *[_type == "personalInfo"][0] {
    _id,
    name,
    headline,
    valueProposition,
    clientBenefits,
    availability,
    yearsExperience,
    projectsCompleted,
    happyClients,
    profileImage,
    shortBio,
    longBio,
    resumeURL,
    socialLinks[] {
      platform,
      url
    }
  }
`

// Featured Projects Query (top 4)
export const featuredProjectsQuery = groq`
  *[_type == "project"] | order(order asc) [0...4] {
    _id,
    title,
    slug,
    coverImage,
    summary,
    description,
    tags,
    githubLink,
    liveDemoLink,
    order,
    clientName,
    clientType,
    problemSolved,
    solution,
    results,
    resultMetrics,
    featured
  }
`

// Single Project Query by Slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    summary,
    description,
    tags,
    githubLink,
    liveDemoLink,
    order,
    clientName,
    clientType,
    problemSolved,
    solution,
    results,
    resultMetrics,
    featured
  }
`

// All Skills Query
export const skillsQuery = groq`
  *[_type == "skill"] | order(name asc) {
    _id,
    name,
    icon,
    category
  }
`

// All Experience Query
export const experienceQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    company,
    role,
    startDate,
    endDate,
    description,
    order
  }
`

// All Project Slugs for Static Generation
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][] {
    "slug": slug.current
  }
`

// Services Query
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    icon,
    description,
    features,
    idealFor,
    techStack,
    order
  }
`

// Testimonials Query
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(featured desc, order asc) {
    _id,
    clientName,
    clientTitle,
    clientPhoto,
    quote,
    projectType,
    featured,
    order
  }
`

// FAQ Query
export const faqQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`

// Process Steps Query
export const processStepsQuery = groq`
  *[_type == "processStep"] | order(order asc) {
    _id,
    title,
    description,
    duration,
    icon,
    order
  }
`
