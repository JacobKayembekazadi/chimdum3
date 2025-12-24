# Chimdum Holistic Wellness Guide

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A digital assistant built on Dr. Chimdum's African herbal philosophy, guiding users through a holistic assessment to find the right herbal support.

## ✨ Features

- **Text-Based Assessment**: Quick quiz to understand your wellness needs
- **Voice Assessment**: Interactive voice conversation with AI guide
- **Personalized Recommendations**: AI-powered wellness recommendations based on your answers
- **Error Handling**: Comprehensive error handling with retry logic
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Performance**: Optimized bundle size and code splitting
- **PWA Ready**: Progressive Web App support with offline capabilities
- **Testing**: Comprehensive test suite with Vitest

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: Node.js 20 LTS)
- npm or yarn
- Gemini API key from [Google AI Studio](https://ai.google.dev/) (supports voice)
- Or DeepSeek API key from [DeepSeek Platform](https://platform.deepseek.com/) (text only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/chimdum.git
   cd chimdum
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your GEMINI_API_KEY
   # Your API key is already configured in .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 📚 Documentation

- [API Documentation](./docs/API.md) - API reference and usage
- [Component Documentation](./docs/COMPONENTS.md) - Component API reference
- [Integration Guide](./docs/INTEGRATION.md) - Setup and deployment guide
- [Architecture](./docs/ARCHITECTURE.md) - Architecture overview
- [Contributing](./CONTRIBUTING.md) - Contribution guidelines
- [Changelog](./CHANGELOG.md) - Version history

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # TypeScript type checking
```

### Project Structure

```
chimdum/
├── components/          # React components
│   ├── AssessmentWizard.tsx
│   ├── ErrorBoundary.tsx
│   ├── ErrorDisplay.tsx
│   ├── Hero.tsx
│   ├── Layout.tsx
│   ├── ResultsView.tsx
│   └── VoiceAssessment.tsx
├── services/           # API services
│   └── geminiService.ts
├── utils/              # Utility functions
│   ├── apiHelpers.ts
│   ├── apiKeyValidator.ts
│   ├── envValidation.ts
│   ├── errorLogger.ts
│   └── validation.ts
├── hooks/              # Custom React hooks
│   ├── useAnswerValidation.ts
│   ├── useRateLimit.ts
│   └── useWebVitals.ts
├── __tests__/          # Test files
├── public/             # Static assets
├── docs/               # Documentation
└── .github/            # GitHub workflows
```

## 🧪 Testing

The project uses [Vitest](https://vitest.dev/) for testing and [React Testing Library](https://testing-library.com/react) for component tests.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🎨 Code Quality

The project uses ESLint and Prettier for code quality:

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Deploy to Vercel

1. **Push your code to GitHub** (already done ✅)

2. **Import project in Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository: `JacobKayembekazadi/chimdum`
   - Vercel will auto-detect Vite configuration

3. **Add Environment Variable** ⚠️ **REQUIRED**
   - In Vercel project settings, go to **Settings** → **Environment Variables**
   - Add: `GEMINI_API_KEY` = `AIzaSyAUWC2nvn8-2Pn_92wvN94krs5w-sCTzZY`
   - Enable for: Production, Preview, and Development
   - **Important:** Without this, the app will show a configuration error

4. **Deploy**
   - Click **Deploy** or push a new commit
   - Vercel will automatically build and deploy

**📖 See [Vercel Deployment Guide](./docs/VERCEL_DEPLOYMENT.md) for detailed instructions.**

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Add `GEMINI_API_KEY` environment variable

### Deploy to AWS S3

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
```

## 🔒 Security

- API keys are stored in environment variables (never commit `.env.local`)
- Input validation and sanitization to prevent XSS
- Rate limiting to prevent API abuse
- Error handling that doesn't expose sensitive information

## ♿ Accessibility

The application follows WCAG AA guidelines:

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## 📊 Performance

- Code splitting with React.lazy
- Bundle optimization
- Performance monitoring
- Web Vitals tracking

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Google Gemini AI](https://ai.google.dev/) (with voice support)
- Alternative: [DeepSeek AI](https://platform.deepseek.com/) (text only)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Tested with [Vitest](https://vitest.dev/)

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the [documentation](./docs/)
- Review [troubleshooting guide](./docs/INTEGRATION.md#troubleshooting)

---

**Built with ❤️ for holistic wellness**
