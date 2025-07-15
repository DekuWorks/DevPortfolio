#!/bin/bash

# GitHub Project Board Setup Script
# This script helps set up your GitHub project board and initial issues

echo "🚀 Setting up GitHub Project Board for DevPortfolio"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Step 1: Create Project Board${NC}"
echo "1. Go to your GitHub repository"
echo "2. Click 'Projects' tab"
echo "3. Click 'New project'"
echo "4. Choose 'Board' view"
echo "5. Name it 'DevPortfolio - Project Tracker'"
echo ""

echo -e "${BLUE}📋 Step 2: Set Up Columns${NC}"
echo "Create these columns in order:"
echo "1. 📋 Backlog"
echo "2. 🚀 In Progress"
echo "3. 🧪 Testing"
echo "4. ✅ Completed"
echo "5. 🚀 Deployed"
echo ""

echo -e "${BLUE}📋 Step 3: Create Labels${NC}"
echo "Add these labels to your repository:"
echo ""
echo -e "${YELLOW}Priority Labels:${NC}"
echo "- 🔴 High Priority (red)"
echo "- 🟡 Medium Priority (yellow)"
echo "- 🟢 Low Priority (green)"
echo ""
echo -e "${YELLOW}Type Labels:${NC}"
echo "- 🐛 Bug (red)"
echo "- ✨ Feature (blue)"
echo "- 📚 Documentation (orange)"
echo "- 🧪 Testing (purple)"
echo "- 🔧 Refactor (gray)"
echo ""
echo -e "${YELLOW}Project Labels:${NC}"
echo "- 241Runners (blue)"
echo "- RexusOpsEMS (orange)"
echo "- ADF_2506 (purple)"
echo ""

echo -e "${BLUE}📋 Step 4: Create Issues${NC}"
echo "Use the templates in docs/github-issues-to-create.md"
echo "Copy and paste each issue block into GitHub"
echo ""

echo -e "${BLUE}📋 Step 5: Set Up Automation${NC}"
echo "1. Go to Settings → Secrets and variables → Actions"
echo "2. Add secret: PROJECT_URL (your project board URL)"
echo "3. The workflow will automatically manage cards"
echo ""

echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Create the project board manually"
echo "2. Add all labels"
echo "3. Create issues from the template"
echo "4. Set up automation secrets"
echo "5. Start moving cards as you work!"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "- Project setup guide: docs/github-project-setup.md"
echo "- Issue templates: docs/github-issues-to-create.md"
echo "- Automation workflow: .github/workflows/project-automation.yml"
echo ""
echo -e "${GREEN}🎉 Your GitHub project board is ready to use!${NC}" 