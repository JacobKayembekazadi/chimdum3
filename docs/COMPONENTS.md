# Component Documentation

## ErrorBoundary

Catches React errors and displays a fallback UI.

**Props:**

- `children: ReactNode` - Child components to wrap
- `fallback?: ReactNode` - Custom fallback UI (optional)

**Usage:**

```tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## ErrorDisplay

Displays error messages with retry functionality.

**Props:**

- `title?: string` - Error title (default: "Something Went Wrong")
- `message: string` - Error message
- `onRetry?: () => void` - Retry callback
- `onDismiss?: () => void` - Dismiss callback
- `showRetry?: boolean` - Show retry button (default: true)

## AssessmentWizard

Multi-step assessment wizard for collecting user answers.

**Props:**

- `onComplete: (answers: UserAnswers) => void` - Called when assessment is complete
- `onCancel: () => void` - Called when user cancels

## ResultsView

Displays wellness recommendation results.

**Props:**

- `answers: UserAnswers` - User's assessment answers
- `preGeneratedContent?: string` - Pre-generated content (for voice assessment)
- `onRestart: () => void` - Restart callback

## VoiceAssessment

Voice-based assessment component using Gemini Live API.

**Props:**

- `onComplete: (recommendation: string) => void` - Called when assessment completes
- `onCancel: () => void` - Called when user cancels

## Layout

Main layout component with header, navigation, and footer.

**Props:**

- `children: ReactNode` - Page content
- `currentView: View` - Current view state
- `onViewChange: (view: View) => void` - View change handler

