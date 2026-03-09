# GitHub Actions Workflows

## Deploy to GitHub Pages

This workflow automatically builds and deploys the website to GitHub Pages when changes are pushed to the `main` branch.

### Workflow Features

- **Automatic Deployment**: Triggers on push to `main` branch
- **Manual Deployment**: Can be triggered manually via GitHub Actions UI
- **Build Validation**: Runs tests and type checking before deployment
- **Optimized Caching**: Uses npm cache for faster builds

### Workflow Steps

1. **Build Job**
   - Checkout repository
   - Setup Node.js 20 with npm caching
   - Install dependencies
   - Run tests (`npm test`)
   - Run type check and build (`npm run build`)
   - Upload build artifacts from `dist/` directory

2. **Deploy Job**
   - Deploy artifacts to GitHub Pages
   - Requires successful build job completion

### GitHub Pages Configuration

To enable GitHub Pages deployment, ensure the following settings are configured in your repository:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy to: `https://danesm.github.io`

### Manual Deployment

To manually trigger a deployment:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

### Troubleshooting

**Build Failures**
- Check the Actions tab for detailed error logs
- Ensure all tests pass locally: `npm test`
- Ensure build succeeds locally: `npm run build`

**Deployment Failures**
- Verify GitHub Pages is enabled in repository settings
- Check that the workflow has proper permissions (configured in workflow file)
- Ensure the `dist/` directory is being generated correctly

**Permission Issues**
- The workflow requires `contents: read`, `pages: write`, and `id-token: write` permissions
- These are configured in the workflow file and should work automatically

### Local Testing

Before pushing to `main`, test the build locally:

```bash
# Install dependencies
npm ci

# Run tests
npm test

# Build the site
npm run build

# Preview the built site
npm run preview
```

### Workflow File Location

The workflow configuration is located at: `.github/workflows/deploy.yml`
