import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',

  // Configure error filtering
  beforeSend(event, hint) {
    // Filter out certain errors in development
    if (process.env.NODE_ENV === 'development') {
      // Ignore common development errors
      if (
        event.exception?.values?.some(
          (value) =>
            value.value?.includes('ResizeObserver') ||
            value.value?.includes('Non-Error promise rejection')
        )
      ) {
        return null;
      }
    }

    return event;
  },

  // Configure replay for better debugging
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Configure release information
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  environment: process.env.NODE_ENV,

  // Configure tags
  initialScope: {
    tags: {
      component: 'network-monitor',
    },
  },
});
