# Love Story Deployment Script

Write-Host "💌 Starting Deployment to GitHub..." -ForegroundColor Magenta

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed! Please install Git first."
    exit
}

# Initialize if not already
if (-not (Test-Path .git)) {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    git init
    git branch -M main
}

# Add all files
Write-Host "Adding files..." -ForegroundColor Cyan
git add .

# Commit
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Update Love Story $timestamp"

# Check remote
$remote = git remote -v
if (-not $remote) {
    $repoUrl = Read-Host "Please paste your GitHub Repository URL (e.g., https://github.com/username/love-story.git)"
    git remote add origin $repoUrl
}

# Push
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "If asked, please enter your GitHub username and password/token." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment Successful!" -ForegroundColor Green
    Write-Host "Don't forget to enable GitHub Pages in your repository settings!" -ForegroundColor White
} else {
    Write-Host "❌ Deployment failed. Please check the errors above." -ForegroundColor Red
}

Pause
