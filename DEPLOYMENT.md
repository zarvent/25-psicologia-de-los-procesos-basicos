# Deployment Guide

## Prerequisites

### 1. Install Ruby (Windows)

1. Download Ruby installer from [RubyInstaller.org](https://rubyinstaller.org/)
2. Download Ruby+Devkit 3.0.0 or higher
3. Run the installer and follow the installation wizard
4. When prompted, install MSYS2 and the development toolchain

### 2. Install Jekyll and Bundler

```powershell
gem install jekyll bundler
```

### 3. Install Dependencies

```powershell
cd "c:\areas\software engineer\github-repositories\25-psicologia-de-los-procesos-basicos"
bundle install
```

## Local Development

### 1. Start the Development Server

```powershell
bundle exec jekyll serve
```

### 2. View the Site

Open your browser to `http://localhost:4000`

### 3. Live Reload

The site will automatically rebuild when you make changes to the files.

## GitHub Pages Deployment

### Automatic Deployment

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to Pages section
4. Set source to "GitHub Actions"
5. The GitHub Action will automatically build and deploy your site

### Manual Deployment

1. Build the site:

```powershell
bundle exec jekyll build
```

2. The built site will be in the `_site` folder

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
JEKYLL_ENV=production
GOOGLE_ANALYTICS_ID=your-ga-id
```

### Site Configuration

Edit `_config.yml` to customize:

- Site title and description
- Navigation menu
- Social links
- Google Analytics
- Theme settings

## Troubleshooting

### Common Issues

1. **Ruby not found**: Ensure Ruby is installed and in your PATH
2. **Bundle install fails**: Try `gem install bundler` first
3. **Port already in use**: Use `bundle exec jekyll serve --port 4001`
4. **SSL certificate issues**: Use `bundle exec jekyll serve --ssl-cert-dir=_ssl`

### Performance Optimization

1. **Image optimization**: Use WebP format for images
2. **CSS minification**: Enable in `_config.yml`
3. **JavaScript minification**: Use Jekyll minifier plugin
4. **Caching**: Configure CDN for static assets

### Development Tips

1. Use `bundle exec jekyll serve --drafts` to preview draft posts
2. Use `bundle exec jekyll serve --livereload` for automatic browser refresh
3. Use `bundle exec jekyll build --profile` to analyze build performance

## Maintenance

### Regular Updates

1. Update Ruby gems: `bundle update`
2. Update Jekyll: `gem update jekyll`
3. Check for security updates: `bundle audit`

### Backup

1. Backup your `_config.yml` file
2. Backup your content in `_sections/` folder
3. Backup your custom CSS/JS files

## Support

For issues with:

- Jekyll: [Jekyll Documentation](https://jekyllrb.com/docs/)
- GitHub Pages: [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Ruby: [Ruby Documentation](https://www.ruby-lang.org/en/documentation/)
