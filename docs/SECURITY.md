# Security Information

## Known Vulnerabilities

### Moderate Severity (Development Only)

The project currently has **4 moderate severity vulnerabilities** in development dependencies:

- **esbuild** (via vite/vitest): CORS vulnerability in development server
- **Impact**: Development only - does not affect production builds
- **Risk Level**: Low (only affects local development)
- **Status**: Monitored, will be fixed when vitest/vite updates are available

### Why These Are Acceptable

1. **Development Only**: These vulnerabilities are in dev dependencies (esbuild, vite, vitest) and only affect the development server, not production builds
2. **No Production Impact**: Production builds are static and don't run a development server
3. **Breaking Changes**: Fixing would require vitest v4, which has breaking changes
4. **Low Risk**: The vulnerability requires local network access to the dev server

### Monitoring

- We monitor for updates to vite/vitest that fix these issues
- CI pipeline checks for high/critical vulnerabilities (moderate are informational)
- Will update when stable, non-breaking fixes are available

### Production Security

- ✅ No vulnerabilities in production dependencies
- ✅ API keys stored in environment variables (not in code)
- ✅ Input validation and sanitization
- ✅ Rate limiting implemented
- ✅ Error handling doesn't expose sensitive information

## Reporting Security Issues

If you discover a security vulnerability, please email security@chimdum.com (or create a private security advisory on GitHub).

