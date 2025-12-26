# Dependencies Installation Guide

Complete list of dependencies needed for the Chimdum Wellness Guide implementation.

## 📦 Current Dependencies

### Production Dependencies

```json
{
  "dependencies": {
    "@google/genai": "^1.34.0",
    "react": "^19.2.3",
    "react-dom": "^19.2.3"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```

---

## 🆕 New Dependencies to Add

### Phase 1: Critical Fixes

**No new dependencies required** - Uses existing packages

---

### Phase 2: Security & Validation

**No new dependencies required** - Uses existing packages

---

### Phase 3: Testing Infrastructure

```bash
npm install --save-dev \
  vitest@^1.0.0 \
  @testing-library/react@^14.0.0 \
  @testing-library/jest-dom@^6.1.0 \
  @testing-library/user-event@^14.5.0 \
  jsdom@^23.0.0
```

**Package.json addition:**

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "jsdom": "^23.0.0"
  }
}
```

**Optional E2E Testing:**

```bash
# Option 1: Playwright
npm install --save-dev @playwright/test@^1.40.0

# Option 2: Cypress
npm install --save-dev cypress@^13.6.0
```

---

### Phase 4: Code Quality & Formatting

```bash
npm install --save-dev \
  eslint@^8.50.0 \
  @typescript-eslint/eslint-plugin@^6.10.0 \
  @typescript-eslint/parser@^6.10.0 \
  eslint-plugin-react@^7.33.0 \
  eslint-plugin-react-hooks@^4.6.0 \
  eslint-plugin-jsx-a11y@^6.8.0 \
  eslint-plugin-import@^2.29.0 \
  prettier@^3.1.0 \
  eslint-config-prettier@^9.0.0 \
  eslint-plugin-prettier@^5.0.0
```

**Package.json addition:**

```json
{
  "devDependencies": {
    "eslint": "^8.50.0",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-import": "^2.29.0",
    "prettier": "^3.1.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0"
  }
}
```

---

### Phase 5: Accessibility

**No new dependencies required** - Uses existing packages

---

### Phase 6: Performance & Optimization

```bash
npm install --save-dev rollup-plugin-visualizer@^5.12.0
```

**Package.json addition:**

```json
{
  "devDependencies": {
    "rollup-plugin-visualizer": "^5.12.0"
  }
}
```

---

### Phase 7: PWA & Offline Support

```bash
npm install --save-dev vite-plugin-pwa@^0.17.0
```

**Package.json addition:**

```json
{
  "devDependencies": {
    "vite-plugin-pwa": "^0.17.0"
  }
}
```

---

### Phase 8: Monitoring & Analytics

```bash
npm install @sentry/react@^7.80.0
```

**Package.json addition:**

```json
{
  "dependencies": {
    "@sentry/react": "^7.80.0"
  }
}
```

**Optional Analytics:**

```bash
# Option 1: Google Analytics
npm install react-ga4@^2.1.0

# Option 2: Plausible (privacy-focused)
# No npm package needed, use script tag
```

---

### Phase 9: SEO & Meta

**No new dependencies required** - Uses existing packages

**Optional:**

```bash
npm install react-helmet-async@^2.0.0
```

---

### Phase 10: CI/CD & Deployment

**No new dependencies required** - Uses GitHub Actions (no npm packages)

---

### Phase 11: Documentation

**No new dependencies required** - Uses Markdown

**Optional documentation tools:**

```bash
npm install --save-dev \
  typedoc@^0.25.0 \
  @microsoft/api-extractor@^7.40.0
```

---

### Phase 12: Additional Features

**No new dependencies required** - Uses existing packages

---

## 📋 Complete Dependency List

### Final Production Dependencies

```json
{
  "dependencies": {
    "@google/genai": "^1.34.0",
    "@sentry/react": "^7.80.0",
    "react": "^19.2.3",
    "react-dom": "^19.2.3"
  }
}
```

### Final Development Dependencies

```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/node": "^22.14.0",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^5.0.0",
    "eslint": "^8.50.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-import": "^2.29.0",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-prettier": "^5.0.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "jsdom": "^23.0.0",
    "prettier": "^3.1.0",
    "rollup-plugin-visualizer": "^5.12.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0",
    "vite-plugin-pwa": "^0.17.0",
    "vitest": "^1.0.0"
  }
}
```

---

## 🚀 Installation Commands

### Install All Dependencies at Once

```bash
# Production dependencies
npm install @google/genai@^1.34.0 @sentry/react@^7.80.0

# Development dependencies
npm install --save-dev \
  vitest@^1.0.0 \
  @testing-library/react@^14.0.0 \
  @testing-library/jest-dom@^6.1.0 \
  @testing-library/user-event@^14.5.0 \
  jsdom@^23.0.0 \
  eslint@^8.50.0 \
  @typescript-eslint/eslint-plugin@^6.10.0 \
  @typescript-eslint/parser@^6.10.0 \
  eslint-plugin-react@^7.33.0 \
  eslint-plugin-react-hooks@^4.6.0 \
  eslint-plugin-jsx-a11y@^6.8.0 \
  eslint-plugin-import@^2.29.0 \
  prettier@^3.1.0 \
  eslint-config-prettier@^9.0.0 \
  eslint-plugin-prettier@^5.0.0 \
  rollup-plugin-visualizer@^5.12.0 \
  vite-plugin-pwa@^0.17.0 \
  @playwright/test@^1.40.0
```

### Install by Phase

```bash
# Phase 3: Testing
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Phase 4: Code Quality
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import prettier eslint-config-prettier eslint-plugin-prettier

# Phase 6: Performance
npm install --save-dev rollup-plugin-visualizer

# Phase 7: PWA
npm install --save-dev vite-plugin-pwa

# Phase 8: Monitoring
npm install @sentry/react

# Phase 3 (Optional): E2E
npm install --save-dev @playwright/test
```

---

## 🔄 Update Existing Dependencies

### Check for Updates

```bash
npm outdated
```

### Update All Dependencies

```bash
npm update
```

### Update Specific Package

```bash
npm install package-name@latest
```

---

## 📊 Bundle Size Impact

### Estimated Size Increases

- **@sentry/react:** ~50KB (gzipped)
- **Testing libraries:** Development only (no production impact)
- **ESLint/Prettier:** Development only (no production impact)
- **vite-plugin-pwa:** ~10KB (service worker)

### Total Production Bundle Impact

- **Before:** ~200KB (estimated)
- **After:** ~260KB (estimated)
- **Increase:** ~60KB (30% increase)

---

## ⚠️ Compatibility Notes

### Node.js Version

- **Required:** Node.js 18+ (for Vite 6)
- **Recommended:** Node.js 20 LTS

### Browser Support

- **Modern browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Voice Assessment:** Requires modern browser with Web Audio API support

### TypeScript Version

- **Current:** TypeScript 5.8.2
- **Compatible:** TypeScript 5.0+

---

## 🔍 Dependency Audit

### Security Audit

```bash
npm audit
```

### Fix Security Issues

```bash
npm audit fix
```

### Check for Vulnerabilities

```bash
npm audit --audit-level=moderate
```

---

## 📝 Notes

1. **Version Pinning:** All versions are pinned with `^` to allow patch and minor updates
2. **Peer Dependencies:** Some packages may require peer dependencies (check warnings)
3. **Optional Dependencies:** E2E testing and some analytics are optional
4. **Development Only:** Most new dependencies are dev-only and won't affect production bundle
5. **Regular Updates:** Keep dependencies updated regularly for security patches

---

**Last Updated:** [Date]
**Next Review:** After Phase 1 completion

