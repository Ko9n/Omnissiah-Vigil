import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',

  // Configure release information
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  environment: process.env.NODE_ENV,

  // Configure server-side error handling
  beforeSend(event, hint) {
    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry Server Error:', hint.originalException || event);
    }

    return event;
  },

  // Configure tags
  initialScope: {
    tags: {
      component: 'network-monitor-server',
    },
  },
});
