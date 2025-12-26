# Quick Reference Guide

Quick access to key information and commands for the Chimdum Wellness Guide project.

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## 📁 Key File Locations

### Configuration Files

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier formatting rules
- `.env.example` - Environment variables template

### Core Application Files

- `App.tsx` - Main application component
- `index.tsx` - Application entry point
- `index.html` - HTML template
- `index.css` - Global styles

### Components

- `components/AssessmentWizard.tsx` - Text-based assessment
- `components/VoiceAssessment.tsx` - Voice-based assessment
- `components/ResultsView.tsx` - Results display
- `components/ErrorBoundary.tsx` - Error handling
- `components/Layout.tsx` - App layout

### Services

- `services/geminiService.ts` - Gemini API integration

### Utilities

- `utils/envValidation.ts` - Environment validation
- `utils/apiHelpers.ts` - API utilities
- `utils/validation.ts` - Input validation

## 🔑 Environment Variables

Required environment variables (add to `.env.local`):

```env
GEMINI_API_KEY=your_api_key_here
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- AssessmentWizard.test.tsx
```

### Test Structure

```
__tests__/
├── components/     # Component tests
├── integration/    # Integration tests
└── utils/          # Utility tests
```

## 🎨 Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting without fixing
npm run format:check
```

## 🐛 Debugging

### Common Issues

1. **Missing API Key**
   - Check `.env.local` file exists
   - Verify `GEMINI_API_KEY` is set
   - Restart dev server after adding env vars

2. **Build Errors**
   - Clear `node_modules` and reinstall
   - Check TypeScript errors: `npm run type-check`
   - Verify all dependencies installed

3. **Test Failures**
   - Run tests individually to isolate issues
   - Check test setup files
   - Verify mocks are properly configured

## 📦 Dependencies

### Production

- `react` - UI library
- `react-dom` - React DOM renderer
- `@google/genai` - Gemini API client
- `@sentry/react` - Error tracking

### Development

- `vite` - Build tool
- `typescript` - Type checking
- `vitest` - Testing framework
- `@testing-library/react` - Component testing
- `eslint` - Linting
- `prettier` - Code formatting

## 🔧 Development Workflow

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code
   - Add tests
   - Update documentation

3. **Quality Checks**

   ```bash
   npm run lint
   npm run format
   npm test
   ```

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📊 Project Structure

```
chimdum/
├── components/      # React components
├── services/        # API services
├── utils/           # Utility functions
├── hooks/           # Custom React hooks
├── __tests__/       # Test files
├── public/          # Static assets
├── docs/            # Documentation
└── scripts/         # Build/deploy scripts
```

## 🎯 Priority Order

When implementing features, follow this priority:

1. **Critical** - Phase 1 & 2 (Fixes + Security)
2. **High** - Phase 3 & 5 (Testing + Accessibility)
3. **Medium** - Phase 4, 6, 8, 9, 10, 11 (Quality, Performance, Monitoring, SEO, CI/CD, Docs)
4. **Low** - Phase 7 & 12 (PWA + Additional Features)

## 📝 Code Style Guidelines

### TypeScript

- Use strict mode
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Avoid `any` type

### React

- Use functional components
- Use hooks for state management
- Keep components small and focused
- Extract reusable logic to custom hooks

### Naming Conventions

- Components: PascalCase (`AssessmentWizard.tsx`)
- Utilities: camelCase (`apiHelpers.ts`)
- Constants: UPPER_SNAKE_CASE (`SYSTEM_PROMPT`)
- Hooks: camelCase with `use` prefix (`useAnswerValidation.ts`)

## 🔍 Useful Commands

```bash
# Check TypeScript errors
npx tsc --noEmit

# Analyze bundle size
npm run build -- --analyze

# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Clean install
rm -rf node_modules package-lock.json && npm install
```

## 📚 Documentation Links

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev)
- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## 🆘 Getting Help

1. Check `IMPLEMENTATION_PLAN.md` for detailed plans
2. Review `TASK_CHECKLIST.md` for task tracking
3. Check existing code for patterns
4. Review documentation in `docs/` folder
5. Check GitHub issues (if applicable)

## ✅ Pre-Commit Checklist

Before committing code:

- [ ] All tests pass
- [ ] Linting passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] TypeScript compiles without errors
- [ ] No console.log statements left
- [ ] Documentation updated (if needed)
- [ ] Environment variables documented (if new)

---

**Last Updated:** [Date]

