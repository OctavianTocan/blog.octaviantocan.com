# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based personal blog and portfolio website using the PaperMod theme. The site showcases projects, technical blog posts, and serves as a digital portfolio. It's deployed via Netlify and includes bilingual support (English/French).

## Development Commands

### Building and Development
- `hugo server` - Run local development server with live reload
- `hugo server -D` - Include draft content in development
- `hugo --gc --minify` - Production build (same as Netlify deployment)
- `hugo new posts/post-name.md` - Create new blog post
- `hugo new projects/project-name.md` - Create new portfolio project

### Content Management
- Blog posts go in `content/home-page-list/` (main blog section)
- Portfolio projects go in `content/projects/`
- Use archetypes in `archetypes/` for consistent frontmatter

## Architecture

### Theme Structure
- Base theme: PaperMod (git submodule in `themes/PaperMod/`)
- Custom overrides in `layouts/` take precedence over theme defaults
- Custom CSS in `assets/css/extended/` (portfolio.css, custom.css)

### Content Sections
- `home-page-list/` - Main blog posts section
- `projects/` - Portfolio projects with custom layout
- `archives/` - Archive pages
- `search/` - Search functionality

### Custom Layouts
- `layouts/projects/list.html` - Portfolio grid layout with project cards
- `layouts/projects/single.html` - Individual project page layout
- Projects use custom frontmatter: `image`, `alt`, `meta` for portfolio display

### Key Configuration
- Main config: `config.yml`
- Deployment: `netlify.toml` (Hugo 0.148.1, publishes `public/` directory)
- Content sections defined in `mainsections: ["posts", "home-page-list", "projects"]`

### Asset Pipeline
- Hugo processes assets from `assets/` to `public/assets/`
- Custom CSS compiled and minified automatically
- Images stored in `assets/images/` with Hugo image processing

## Content Guidelines

### Project Frontmatter
```yaml
title: "Project Name"
date: 2023-08-01
image: "https://example.com/image.jpg"  # Required for portfolio display
alt: "Alt text description"
meta: "Tech Stack • Date • Category"
```

### Blog Post Structure
- Use `home-page-list` section for main blog content
- Support for series, categories, and tags
- Featured images and reading time automatically calculated

## Deployment

- Automatically deploys to Netlify on push to main branch
- Build command: `hugo --gc --minify`
- Publish directory: `public`
- Environment: Hugo 0.148.1, Node.js 22, Go 1.24.2

## Theme Customization

When modifying theme behavior:
1. Check if PaperMod theme provides the functionality
2. Override in `layouts/` rather than modifying theme directly
3. Add custom CSS to `assets/css/extended/`
4. Test both light and dark themes