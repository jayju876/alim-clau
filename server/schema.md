# CMS Database Schema

The lightweight CMS stores JSON collections in `server/data/cms.json` for simple deployments. The collections map cleanly to MongoDB collections or PostgreSQL tables:

## users
- `id`
- `email`
- `passwordHash`
- `role`: `admin` or `editor`
- `resetToken`
- `resetExpiresAt`
- `createdAt`
- `updatedAt`

## blogs
- `id`
- `title`
- `slug`
- `content`
- `excerpt`
- `featuredImage`
- `authorId`
- `status`: `draft` or `published`
- `seo`: meta title, description, keywords, canonical, OG title, OG description
- `headings`: H1, H2, H3
- `faqs`
- `internalLinks`
- `lastUpdated`
- `disclaimer`
- `createdAt`
- `updatedAt`

## pages
- `id`
- `title`
- `slug`
- `content`
- `status`
- `seo`
- `headings`
- `faqs`
- `internalLinks`
- `createdAt`
- `updatedAt`

## authors
- `id`
- `name`
- `bio`
- `image`
- `linkedin`
- `createdAt`
- `updatedAt`

## seo
- `id`
- `pagePath`
- `metaTitle`
- `metaDescription`
- `metaKeywords`
- `canonicalUrl`
- `ogTitle`
- `ogDescription`
- `createdAt`
- `updatedAt`

## media
- `id`
- `filename`
- `originalName`
- `url`
- `alt`
- `mimeType`
- `size`
- `createdAt`
- `updatedAt`

## settings
- `navigation`
- `footer`
- `homepageSections`
