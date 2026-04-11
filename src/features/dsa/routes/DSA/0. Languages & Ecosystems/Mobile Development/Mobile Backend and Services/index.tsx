import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

// â”€â”€â”€ Big Picture â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Mobile backend and services refers to the server-side infrastructure that mobile apps depend on: authentication, databases, file storage, push notifications, analytics, crash reporting, remote configuration, and CI/CD pipelines. Most production mobile apps are thin clients backed by one or more of these services.',
    notes:
      'The trend is toward Backend-as-a-Service (BaaS) platforms that bundle auth, database, storage, and functions into a single SDK â€” reducing the need to build and operate separate backend infrastructure.',
  },
  {
    title: 'Why it matters',
    details:
      'A mobile app without a backend is limited to local-only functionality. Authentication, cloud sync, push notifications, A/B testing, crash reporting, and analytics all require server-side services. Choosing the right backend services early shapes the entire product architecture.',
    notes:
      "Service choices have long-term lock-in implications. Firebase tightly couples the app to Google's infrastructure. Supabase is open-source and self-hostable. Custom backends give full control at the cost of operational complexity.",
  },
  {
    title: 'The major platforms',
    details:
      'Firebase (Google) is the most widely adopted BaaS. Supabase is the open-source Firebase alternative built on PostgreSQL. AWS Amplify provides a mobile-optimized interface to AWS services. Custom REST or GraphQL backends (Node.js, Go, .NET) remain common for complex domains.',
    notes:
      'Many production apps use a hybrid approach: Firebase for auth and push notifications, a custom API for business logic, and a third-party service for analytics.',
  },
  {
    title: 'The services taxonomy',
    details:
      'Mobile backend services fall into six categories: (1) Authentication, (2) Database and sync, (3) File storage, (4) Messaging and push notifications, (5) Observability (analytics, crashes, logging), and (6) DevOps (CI/CD, feature flags, OTA updates).',
    notes:
      'Each category has specialized providers that outperform generalist BaaS platforms in their niche. Use the right tool for each job rather than forcing one platform to do everything.',
  },
]

// â”€â”€â”€ Mental Model â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const mentalModel = [
  {
    title: 'The app is a thin client',
    detail:
      'A well-architected mobile app contains minimal business logic. Validation, authorization, data integrity, and business rules live on the server. The app is a rendering layer that sends user intent to the backend and displays the result.',
  },
  {
    title: 'Offline-first vs online-first',
    detail:
      "Offline-first apps write to local storage first, sync in background, and resolve conflicts on reconnection. Online-first apps depend on network availability and degrade gracefully (show cached data, disable actions). Choose the model based on your users' connectivity patterns.",
  },
  {
    title: 'The authentication token flow',
    detail:
      'User signs in â†’ backend issues a short-lived JWT access token and a long-lived refresh token â†’ app stores tokens securely (Keychain/EncryptedSharedPreferences) â†’ app attaches access token to API requests â†’ when the access token expires, the refresh token is used to get a new one silently.',
  },
  {
    title: 'Push notification delivery chain',
    detail:
      'Your server sends a message to Apple Push Notification service (APNs) or Firebase Cloud Messaging (FCM) â†’ APNs/FCM delivers to the device OS â†’ the OS delivers to the app. Your server never talks to devices directly. The delivery guarantee depends on the notification priority and device state.',
  },
  {
    title: 'SDK vs REST API',
    detail:
      'BaaS platforms provide mobile SDKs that handle auth token management, retry logic, caching, and realtime subscriptions automatically. Calling the REST API directly gives more control but requires implementing all of this manually. Prefer SDKs for standard operations; use REST for unusual requirements.',
  },
  {
    title: 'Cost model awareness',
    detail:
      'BaaS platforms charge by reads, writes, storage, function invocations, or concurrent connections. Firebase Realtime Database charges per GB downloaded â€” a hot listener on a large document can become expensive quickly. Model costs before choosing a data architecture.',
  },
]

// â”€â”€â”€ Firebase â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const firebaseConcepts = [
  {
    title: 'Firebase Authentication',
    detail:
      'Provides email/password, phone, Google, Apple, Facebook, GitHub, Twitter, and anonymous sign-in. Issues JWTs consumed by Firestore Security Rules and other Firebase services. Custom token minting allows integration with existing auth systems. SDKs handle token refresh automatically.',
  },
  {
    title: 'Cloud Firestore',
    detail:
      'NoSQL document-collection database with offline persistence and real-time listeners. Documents are JSON objects; collections group documents. Security Rules authorize reads and writes based on auth state and document fields. Charges per document read/write, not per query.',
  },
  {
    title: 'Firebase Realtime Database',
    detail:
      'JSON tree database with sub-millisecond sync across clients. Simpler than Firestore but harder to query and less scalable. Charges per GB downloaded â€” real-time listeners on large data sets can generate unexpected costs. Prefer Firestore for new projects.',
  },
  {
    title: 'Firebase Storage',
    detail:
      'Google Cloud Storage with Firebase Security Rules integration. Upload, download, and delete files via SDK. Generates download URLs usable directly in image views. Supports resumable uploads for large files. Use for user-generated media: photos, videos, documents.',
  },
  {
    title: 'Firebase Cloud Messaging (FCM)',
    detail:
      'Free push notification delivery to Android (via FCM native), iOS (via FCM wrapping APNs), and web. Send data messages (handled by app) or notification messages (handled by OS). Supports topics (broadcast), device groups, and condition-based targeting.',
  },
  {
    title: 'Cloud Functions for Firebase',
    detail:
      'Serverless Node.js (or Python) functions triggered by Firestore events, Auth events, HTTP requests, schedules, and Pub/Sub messages. Use for server-side logic that should not run on-device: email sending, Stripe webhooks, data aggregation, heavy computation.',
  },
  {
    title: 'Firebase Remote Config',
    detail:
      'Key-value store for runtime app configuration. Change feature flags, UI text, API endpoints, and feature rollout percentages without an app release. Values are cached on device; fetch frequency is rate-limited. Use with A/B testing experiments via Firebase A/B Testing.',
  },
  {
    title: 'Firebase App Check',
    detail:
      'Verifies that requests to Firebase services come from legitimate app instances, not scrapers or bots. Uses DeviceCheck (iOS), Play Integrity (Android), or reCAPTCHA (web). Attach to Firestore, Storage, and Cloud Functions to block unauthorized API access.',
  },
  {
    title: 'Firestore Security Rules',
    detail:
      'Server-side authorization rules written in a custom DSL. Rules are evaluated per document access: allow read: if request.auth.uid == resource.data.ownerId. Cannot be bypassed by SDKs. Test rules with the Firebase Emulator Suite before deploying.',
  },
]

// â”€â”€â”€ Supabase â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const supabaseConcepts = [
  {
    title: 'What Supabase is',
    detail:
      'Supabase is an open-source Firebase alternative built on PostgreSQL. It provides a hosted Postgres database, authentication (GoTrue), file storage (using S3-compatible storage), Edge Functions (Deno), and Realtime (via Postgres logical replication). Self-hostable on your own infrastructure.',
  },
  {
    title: 'Supabase Auth (GoTrue)',
    detail:
      'Email/password, magic link, OAuth providers (Google, Apple, GitHub), and phone OTP. Issues JWTs consumed by Row Level Security policies. Supports custom SMTP for emails. Auth state is persisted in the client SDK and refreshed automatically.',
  },
  {
    title: 'Row Level Security (RLS)',
    detail:
      "PostgreSQL's native authorization layer. Policies restrict which rows a user can SELECT, INSERT, UPDATE, or DELETE based on the JWT claims. Must be explicitly enabled per table. Far more expressive than Firestore Security Rules because it is full SQL.",
  },
  {
    title: 'Supabase Realtime',
    detail:
      'Broadcasts Postgres changes (INSERT, UPDATE, DELETE) to subscribed clients via WebSocket. Subscribe to specific tables, rows, or columns. Built on Postgres logical replication â€” inherently consistent with the database state rather than an eventually-consistent cache.',
  },
  {
    title: 'Storage',
    detail:
      'S3-compatible file storage with access policies enforced via RLS-like storage policies. Buckets are either public or private. Generate signed URLs for temporary access to private files. Supports image transformations (resize, crop) via the image transformation API.',
  },
  {
    title: 'Edge Functions',
    detail:
      "Deno-based serverless functions deployed globally at the edge. Written in TypeScript. Invoked via HTTP. Use for webhooks, custom auth logic, Stripe integration, and heavy server-side computation. Cold start is faster than traditional Lambda functions due to Deno's runtime.",
  },
  {
    title: 'Supabase vs Firebase',
    detail:
      'Supabase uses SQL (PostgreSQL) â€” powerful queries, joins, indexes, and migrations. Firebase uses NoSQL â€” simpler data model but weaker querying. Supabase is open-source and self-hostable; Firebase is Google-proprietary. Supabase pricing is predictable (compute + storage); Firebase pricing can spike with read-heavy workloads.',
  },
]

// â”€â”€â”€ Authentication â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const authConcepts = [
  {
    title: 'JWT (JSON Web Token)',
    detail:
      'A signed, base64-encoded token containing claims (user ID, roles, expiry). Signed with a secret (HMAC) or keypair (RS256). The backend verifies the signature without a database lookup. Never store JWTs in localStorage on web â€” use HttpOnly cookies or Keychain/EncryptedSharedPreferences on mobile.',
  },
  {
    title: 'Access token + refresh token pattern',
    detail:
      'Access tokens are short-lived (15 min â€“ 1 hour). Refresh tokens are long-lived (daysâ€“weeks) and stored securely. When the access token expires, the client silently exchanges the refresh token for a new pair. The refresh token is invalidated on sign-out or compromise.',
  },
  {
    title: 'OAuth 2.0 and social login',
    detail:
      "OAuth 2.0 delegates authentication to a provider (Google, Apple, GitHub). The provider issues an authorization code; your backend exchanges it for tokens. On mobile, use the platform's native OAuth flow (ASWebAuthenticationSession on iOS, Chrome Custom Tabs on Android) rather than WebView.",
  },
  {
    title: 'Sign in with Apple (SIWA)',
    detail:
      'Mandatory on iOS if you offer any third-party social login. Apple generates a user identifier stable across devices but opaque (not the email). Apple provides a relay email to protect privacy. Handle the case where the user hides their email â€” your system must work with the relay address.',
  },
  {
    title: 'Biometric authentication',
    detail:
      'Face ID / Touch ID (iOS via LocalAuthentication) and Biometric API (Android via BiometricPrompt) authenticate the user against the device biometrics. This verifies device presence, not server identity. Combine with Keychain/Keystore to protect a secret that is only accessible after biometric auth.',
  },
  {
    title: 'Token storage on mobile',
    detail:
      'iOS: Keychain with kSecAttrAccessibleWhenUnlockedThisDeviceOnly. Android: EncryptedSharedPreferences backed by the Android Keystore. Never store tokens in UserDefaults, SharedPreferences, or plain files. These are accessible on jailbroken/rooted devices and unencrypted backups.',
  },
  {
    title: 'Session management',
    detail:
      'Track active sessions per device. On password change or suspicious activity, invalidate all refresh tokens (force re-login). Provide a "sign out all devices" option. Store session metadata (device name, last seen, IP) for user visibility.',
  },
]

// â”€â”€â”€ Push Notifications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const pushNotifications = [
  {
    title: 'APNs (Apple Push Notification service)',
    detail:
      "Apple's delivery infrastructure for iOS, macOS, watchOS, and tvOS. Requires a p8 key or p12 certificate from Apple Developer account. HTTP/2 protocol. Supports alert, background (content-available), and VoIP notifications. Delivery is best-effort; no guaranteed delivery for low-priority messages.",
  },
  {
    title: 'FCM (Firebase Cloud Messaging)',
    detail:
      "Google's push delivery infrastructure for Android and iOS (wraps APNs for iOS). Free with no message volume limit. Provides a unified API for Android and iOS from the server side. Supports data messages, notification messages, and multicast (topics).",
  },
  {
    title: 'Notification types',
    detail:
      'Alert notifications: display to the user (banner, lock screen, notification center). Background notifications: wake the app silently to fetch data (iOS content-available). Data messages (Android FCM): delivered to the app only, not shown as a notification by default. VoIP notifications: high-priority wakeup for call apps via PushKit.',
  },
  {
    title: 'Permission flow',
    detail:
      'iOS requires explicit permission (UNUserNotificationCenter.requestAuthorization). Show rationale before prompting â€” the system permission dialog can only be shown once. Android 13+ (API 33) also requires runtime permission. Handle denial gracefully: core features must work without notifications.',
  },
  {
    title: 'Device token registration',
    detail:
      'On first launch, request permission â†’ register with APNs/FCM â†’ receive a device token â†’ send the token to your server â†’ server stores (userId, token, platform). On token refresh (APNs rotates tokens periodically), update the server. Delete tokens on sign-out.',
  },
  {
    title: 'Notification payload',
    detail:
      'APNs payload: { aps: { alert: { title, body }, badge, sound }, customData: ... }. Total payload limit is 4 KB. For rich notifications (images, actions), use a Notification Service Extension (iOS) to download media and mutate the content before display.',
  },
  {
    title: 'Notification Service Extension (iOS)',
    detail:
      'A lightweight app extension that intercepts incoming notifications before display. Use to: download and attach images/video, decrypt end-to-end encrypted payloads, modify the notification body. Has a ~30 second execution window. Falls back to the original payload on timeout.',
  },
  {
    title: 'Delivery guarantees',
    detail:
      'APNs and FCM do not guarantee delivery. Messages may be dropped under low power mode, network unavailability, or throttling. For guaranteed delivery, combine push with a pull mechanism (background refresh or user-initiated refresh). Do not put critical business logic in notification-only flows.',
  },
]

// â”€â”€â”€ Analytics and Crash Reporting â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const observability = [
  {
    title: 'Firebase Analytics',
    detail:
      'Free event-based analytics with automatic events (first_open, app_update, session_start) and custom events. Integrates with Google Analytics, BigQuery export, A/B Testing, and Remote Config. Cannot be disabled per-user on iOS without complying with ATT (App Tracking Transparency).',
  },
  {
    title: 'Mixpanel',
    detail:
      "User-centric analytics focused on funnels, retention, and cohort analysis. Events are user-identified rather than device-identified. Better for product analytics than Firebase's session-oriented model. Paid; free tier available.",
  },
  {
    title: 'Amplitude',
    detail:
      'Product analytics platform similar to Mixpanel. Strong for behavioral cohorts, path analysis, and impact analysis. Widely used in B2C apps. Provides a data warehouse connector and a CDP (Customer Data Platform) layer.',
  },
  {
    title: 'Firebase Crashlytics',
    detail:
      'Real-time crash reporting with stack traces, device metadata, and custom keys/logs. Groups crashes by stack trace signature. Integrates with Firebase Analytics for pre/post-crash user context. Free, no volume limit. The standard crash reporter for most mobile apps.',
  },
  {
    title: 'Sentry',
    detail:
      'Cross-platform error monitoring covering crashes, non-fatal errors, and performance (spans, transactions). Open-source with a self-hosted option. Strong for teams that want unified error monitoring across mobile, web, and backend in one platform.',
  },
  {
    title: 'App Tracking Transparency (ATT)',
    detail:
      'iOS 14.5+ requires explicit user permission before tracking across apps and websites. Present the ATT prompt before initializing tracking-based SDKs. If denied, use SKAdNetwork for aggregate campaign attribution. Affects Facebook SDK, some analytics SDKs, and ad networks.',
  },
  {
    title: 'Remote logging',
    detail:
      'Log structured events (userId, action, timestamp, metadata) to a remote service. Use log levels (debug, info, warning, error). Redact PII before logging. On mobile, buffer logs locally and batch-upload to avoid impacting foreground performance. Datadog, Loggly, and Firebase Crashlytics custom logs are common choices.',
  },
]

// â”€â”€â”€ Remote Config and Feature Flags â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const remoteConfig = [
  {
    title: 'Use cases',
    detail:
      'Kill switches for broken features, percentage rollouts (5% â†’ 50% â†’ 100%), A/B test variants, dynamic content (promo text, API endpoints), onboarding flow experiments, and emergency patches without App Store review.',
  },
  {
    title: 'Firebase Remote Config',
    detail:
      'Free key-value store with conditional rules (by app version, country, audience, user property). Values are fetched and cached on device. Fetch interval has a minimum (12 hours by default in production; configurable for debug). Use fetchAndActivate() to get the latest values at startup.',
  },
  {
    title: 'LaunchDarkly',
    detail:
      'Enterprise feature flag platform with targeting rules, gradual rollouts, A/B testing, and audit logs. SDKs for iOS, Android, Flutter, and React Native. Streaming delivery means flag changes propagate to devices in milliseconds. Paid; overkill for most small teams.',
  },
  {
    title: 'Statsig',
    detail:
      'Feature flags + experimentation platform with a generous free tier. Provides gate checks, dynamic configs, and experiment assignments with statistical significance reporting. Popular with growth-focused product teams.',
  },
  {
    title: 'Implementation pattern',
    detail:
      'Fetch remote config at app startup (or on resume). Apply defaults in case fetch fails or the cache is cold. Gate features with if (config.isEnabled("feature_x")) checks in the relevant code paths. Never use remote config for security-critical decisions â€” the values are visible in the SDK cache.',
  },
]

// â”€â”€â”€ CI/CD for Mobile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const cicdConcepts = [
  {
    title: 'Why mobile CI/CD is hard',
    detail:
      'iOS builds require macOS runners with Xcode. Android builds require the Android SDK and emulators with hardware acceleration. Signing certificates are tied to Apple Developer accounts. Managing all of this in a general-purpose CI system (GitHub Actions, GitLab CI) requires significant setup.',
  },
  {
    title: 'Fastlane',
    detail:
      'Ruby-based automation for iOS and Android. Lane definitions in a Fastfile chain actions: test, build, sign, upload. Key features: Match (certificate/profile management in git), gym (build and archive), deliver (App Store submission), supply (Play Store submission), pilot (TestFlight).',
  },
  {
    title: 'Bitrise',
    detail:
      'Mobile-specialized CI/CD with macOS runners for iOS builds. Pre-built steps for Xcode, Fastlane, Flutter, React Native, and code signing. Caches are optimized for mobile dependency managers (CocoaPods, Gradle). More expensive than GitHub Actions for macOS minutes.',
  },
  {
    title: 'Codemagic',
    detail:
      'Flutter-first CI/CD, now supporting iOS, Android, React Native, and Unity. Handles code signing via GUI (no Fastlane required). Includes a built-in Mac M1/M2 runner option. Free tier available. Simpler setup than Bitrise for Flutter projects.',
  },
  {
    title: 'EAS Build (Expo)',
    detail:
      'Cloud build service for React Native/Expo apps. Runs iOS and Android builds on managed infrastructure without requiring local Xcode/Android Studio. Integrates with EAS Submit for automated store uploads and EAS Update for OTA JS bundle delivery.',
  },
  {
    title: 'GitHub Actions for mobile',
    detail:
      'Use macos-latest runners for iOS builds (expensive â€” billed per minute). Use ubuntu-latest for Android builds (cheaper). Cache CocoaPods with actions/cache, Gradle with gradle-build-action. Integrate Fastlane lanes as steps. Store signing secrets in GitHub Secrets.',
  },
  {
    title: 'Code signing in CI',
    detail:
      'Fastlane Match stores certificates and profiles in an encrypted git repo. CI pulls them at build time using the MATCH_PASSWORD secret. Eliminates per-developer certificate setup and prevents "works on my machine" signing failures.',
  },
  {
    title: 'Automated testing in CI',
    detail:
      'Unit tests run on every PR: fast, no device required. UI tests run on simulators/emulators: slower, run nightly or on release branches. Use Firebase Test Lab or BrowserStack for real-device testing. Gate merges on passing unit tests; treat UI test failures as warnings until stable.',
  },
]

// â”€â”€â”€ API Design for Mobile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const apiDesign = [
  {
    title: 'REST vs GraphQL for mobile',
    detail:
      'REST: simple, cacheable, widely supported. Multiple round trips for related data. GraphQL: fetch exactly the fields you need in one request, eliminating over/under-fetching. Better for complex UIs with varying data requirements. Higher implementation complexity on the server.',
  },
  {
    title: 'API versioning',
    detail:
      'Version APIs (/v1/, /v2/) to avoid breaking older app versions still in the field. Mobile apps are not instantly updated â€” old versions may be active for months. Never remove a field or change a field type in a live API version. Use deprecation headers to signal upcoming removals.',
  },
  {
    title: 'Pagination',
    detail:
      'Never return unbounded lists. Use cursor-based pagination (next_cursor token) for feeds and timelines â€” it is stable under insertions. Use offset-based for admin lists where stability under insertion is not required. Page size should be configurable to allow clients to tune for their network conditions.',
  },
  {
    title: 'Error response contract',
    detail:
      'Return consistent error payloads: { error: { code: "USER_NOT_FOUND", message: "...", details: [...] } }. Use HTTP status codes correctly (400 bad request, 401 unauthorized, 403 forbidden, 404 not found, 429 rate limited, 500 server error). Machine-readable error codes let clients display appropriate UI.',
  },
  {
    title: 'Compression and efficiency',
    detail:
      'Enable gzip/brotli on your API server â€” SDKs request it automatically. Use ETags or Last-Modified headers for cache validation. For mobile, minimize response payload size: return only fields the client uses, use short field names for high-frequency endpoints.',
  },
  {
    title: 'Rate limiting',
    detail:
      'Protect APIs with rate limits per user (or per device for unauthenticated endpoints). Return 429 with Retry-After headers. Implement exponential backoff with jitter in the mobile SDK for retry logic. Never retry immediately on 429.',
  },
]

// â”€â”€â”€ Offline and Sync â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const offlineSync = [
  {
    title: 'Offline-first architecture',
    detail:
      'All writes go to local storage first. A background sync worker replicates changes to the server when connectivity is available. The UI reads only from local storage â€” it is always fast and functional regardless of network state.',
  },
  {
    title: 'Conflict resolution',
    detail:
      'When two devices edit the same data offline, conflicts arise on sync. Strategies: last-write-wins (simple, risks data loss), server-wins (simple, discards client changes), merge (complex, preserves both). CRDTs (Conflict-free Replicated Data Types) allow automatic merging for specific data structures.',
  },
  {
    title: 'Optimistic updates',
    detail:
      'Apply state changes in the UI immediately before the server confirms them. Roll back on server error. Provides a responsive feel even over high-latency networks. Requires careful error handling â€” the rollback must leave the UI in a consistent, explainable state.',
  },
  {
    title: 'Firestore offline persistence',
    detail:
      "Firestore's SDK caches all read documents and queued writes locally. When offline, reads return cached data; writes queue and sync automatically on reconnection. Enabled by default on mobile. Does not support complex SQL queries â€” limitation of the NoSQL model.",
  },
  {
    title: 'Supabase realtime + local cache',
    detail:
      "Supabase Realtime delivers database changes over WebSocket. Combine with a local SQLite cache (Room on Android, Core Data/SQLite on iOS) for offline support. On reconnect, re-subscribe and reconcile missed changes using the record's updated_at timestamp.",
  },
]

// â”€â”€â”€ Security â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const securityPractices = [
  {
    title: 'Never trust the client',
    detail:
      'Validate all input on the server. Authorization checks must happen server-side â€” Firestore Security Rules or Row Level Security. A malicious client can send any payload regardless of what the mobile app enforces locally.',
  },
  {
    title: 'Secrets management',
    detail:
      'Never embed API keys, secrets, or private keys in the mobile binary â€” they are extractable. Use Firebase App Check to restrict which apps can call your APIs. Store server-side secrets in environment variables or a secrets manager (AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault).',
  },
  {
    title: 'Certificate pinning',
    detail:
      "Pin the server's certificate or public key in the mobile app to prevent MITM attacks. Implement in URLSession (iOS) or OkHttp (Android) via a custom TrustManager. Include a backup pin and a rotation window â€” a pin with no fallback causes outages on certificate renewal.",
  },
  {
    title: 'Data minimization',
    detail:
      'Collect only the data you need. Store only what you need. Display only what the user needs. Reducing data collection is the safest protection against breaches â€” data you do not have cannot be leaked. Align with GDPR, CCPA, and COPPA requirements early.',
  },
  {
    title: 'Firebase Security Rules â€” common mistakes',
    detail:
      'Rules default to deny all. Allow rules must be explicit. Never write allow read, write: if true â€” this is public access. Test rules with the Firebase Emulator before deploying. Rules cannot fix a data model that puts sensitive data in publicly-readable documents.',
  },
  {
    title: 'Token expiry and rotation',
    detail:
      'Short access token lifetimes (15â€“60 minutes) limit the damage from token theft. Refresh tokens should be rotated on each use (refresh token rotation). Invalidate all tokens on password change or sign-out-all-devices. Monitor for refresh token reuse as a compromise signal.',
  },
]

// â”€â”€â”€ Compare and Contrast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const compareContrast = [
  {
    title: 'Firebase vs Supabase',
    detail:
      'Firebase: NoSQL (Firestore), proprietary, Google-hosted, mature ecosystem, excellent real-time support. Supabase: SQL (PostgreSQL), open-source, self-hostable, more expressive querying, predictable pricing. Choose Firebase for speed-to-market with real-time needs; Supabase for teams comfortable with SQL who want to avoid lock-in.',
  },
  {
    title: 'FCM vs APNs direct',
    detail:
      'FCM provides a single server API for both Android and iOS push delivery (wrapping APNs for iOS). APNs direct requires a separate integration and managing APNs credentials separately. Use FCM as the unified abstraction unless you have a reason (VoIP notifications) to use APNs directly.',
  },
  {
    title: 'Firebase Crashlytics vs Sentry',
    detail:
      'Crashlytics is free, Firebase-integrated, and covers crash reporting well. Sentry covers crashes, non-fatal errors, and performance in one dashboard, across mobile and backend, and is open-source. Use Crashlytics if you are already Firebase-invested; Sentry for cross-platform error monitoring.',
  },
  {
    title: 'Firebase Remote Config vs LaunchDarkly',
    detail:
      'Firebase Remote Config is free, sufficient for most apps, and includes A/B Testing. LaunchDarkly provides real-time flag delivery, fine-grained targeting, audit trails, and statistical experiment analysis. Use Remote Config for simple flag needs; LaunchDarkly for regulated or high-complexity experimentation.',
  },
  {
    title: 'REST vs GraphQL',
    detail:
      'REST: simpler, cacheable, easier to version, broad tooling support. GraphQL: eliminates over/under-fetching, strong typing via schema, single endpoint. On mobile, GraphQL shines when the server serves multiple clients (web, iOS, Android) with different field requirements. REST is simpler for CRUD-heavy backends.',
  },
  {
    title: 'BaaS vs custom backend',
    detail:
      'BaaS (Firebase, Supabase): fast to set up, managed infrastructure, opinionated data model, vendor lock-in, cost unpredictability at scale. Custom backend: full control, any language/stack, scales predictably, requires more engineering investment. Teams choose BaaS for speed; they migrate to custom backends when BaaS limitations or costs become significant.',
  },
]

// â”€â”€â”€ Common Pitfalls â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const commonPitfalls = [
  {
    mistake: 'Embedding secrets in the mobile binary',
    description:
      'API keys and service credentials embedded in the app binary are extractable with standard tools. Use Firebase App Check, backend proxy endpoints, or environment-based configuration. Any secret in the binary should be treated as compromised.',
  },
  {
    mistake: 'Permissive Firestore Security Rules',
    description:
      'Writing allow read, write: if request.auth != null gives all authenticated users read/write access to all documents. Rules must be scoped per collection and per operation. Test with the Firebase Emulator before deploying to production.',
  },
  {
    mistake: 'Missing token expiry handling',
    description:
      'Not handling 401 responses by refreshing the access token causes users to be silently logged out. Implement a token refresh interceptor (OkHttp Authenticator on Android, URLSession delegate on iOS) that retries the request after refreshing.',
  },
  {
    mistake: 'Storing tokens in insecure storage',
    description:
      'UserDefaults (iOS) and SharedPreferences (Android) are unencrypted. Tokens stored there are accessible on jailbroken/rooted devices and in unencrypted backups. Use Keychain (iOS) and EncryptedSharedPreferences backed by Android Keystore.',
  },
  {
    mistake: 'Not handling push notification permission denial',
    description:
      'Requesting push permission at first launch before establishing value leads to high denial rates. Defer the prompt. Explain the benefit. Handle denial: do not break core features. Provide an in-app setting that directs users to re-enable in system settings.',
  },
  {
    mistake: 'Ignoring Firestore read costs on hot listeners',
    description:
      'A real-time listener on a document with frequent small updates, multiplied across many active users, can generate millions of reads per day at cost. Use snapshots (one-time fetches) where real-time is not needed. Paginate large collections instead of listening to all documents.',
  },
  {
    mistake: 'Not versioning APIs',
    description:
      'Changing an API response shape without versioning breaks existing app versions still in the field. Mobile apps are not instantly updated â€” old versions may be in use for 6â€“12 months after a release. Always version breaking changes.',
  },
  {
    mistake: 'Using WebView for OAuth',
    description:
      "Presenting OAuth flows in an embedded WebView allows the app to read the user's credentials â€” OAuth providers prohibit this. Use ASWebAuthenticationSession (iOS) or Chrome Custom Tabs (Android). These use the system browser's secure session and cookie store.",
  },
]

// â”€â”€â”€ Debugging Checklist â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const debuggingChecklist = [
  {
    title: 'Push notifications not arriving?',
    detail:
      'Check: (1) permission was granted, (2) device token was successfully registered and sent to server, (3) APNs/FCM credentials are valid and not expired, (4) payload is within the 4 KB limit, (5) the device has network connectivity, (6) Low Power Mode is not suppressing background notifications.',
  },
  {
    title: 'Firestore permission denied?',
    detail:
      'Check Security Rules in the Firebase Console Rules playground. Verify the request.auth.uid matches expected values. Ensure the user is authenticated (auth state is propagated before the Firestore call). Check collection path casing â€” Firestore paths are case-sensitive.',
  },
  {
    title: 'Auth token expired silently?',
    detail:
      'Check if 401 responses are handled by a retry interceptor. Firebase/Supabase SDKs refresh tokens automatically â€” if using raw API calls, implement refresh manually. Log token expiry times and compare against request timestamps.',
  },
  {
    title: 'Analytics events not appearing?',
    detail:
      'Firebase Analytics events have up to 24 hours of processing delay in the console. Use DebugView (enable with -FIRDebugEnabled launch argument on iOS) for real-time event inspection. Verify ATT permission on iOS â€” denial blocks event transmission to Firebase.',
  },
  {
    title: 'CI build failing on signing?',
    detail:
      'Check: (1) signing certificate is not expired, (2) provisioning profile matches the bundle ID and signing certificate, (3) MATCH_PASSWORD secret is set correctly in CI, (4) the Xcode signing settings are set to Manual rather than Automatic in CI lanes.',
  },
  {
    title: 'Remote Config not updating?',
    detail:
      'Firebase Remote Config caches values and enforces a minimum fetch interval (12 hours in production). In debug, set minimumFetchInterval to 0. Call fetchAndActivate() rather than fetch() then activate() separately. Changes take up to the cache interval plus propagation time.',
  },
]

// â”€â”€â”€ Correctness Checklist â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const correctnessChecklist = [
  'Store auth tokens in Keychain (iOS) or EncryptedSharedPreferences (Android) â€” never in UserDefaults or plain SharedPreferences.',
  'Implement a token refresh interceptor that retries 401 responses after silently refreshing the access token.',
  'Test Firestore Security Rules in the Firebase Emulator before deploying â€” never ship with allow read, write: if true.',
  'Version your APIs (/v1/) and treat breaking changes (field removal, type changes) as a new version.',
  'Request push notification permission contextually, not at first launch. Handle denial without breaking core features.',
  'Send device tokens to the server on every launch (tokens rotate); delete tokens from the server on sign-out.',
  'Never embed API secrets in the mobile binary. Use Firebase App Check or a backend proxy for protected endpoints.',
  'Enable gzip compression on your API server and handle compressed responses in the mobile SDK.',
  'Use cursor-based pagination for feeds and timelines; never return unbounded lists.',
  'Test crash reporting by triggering a test crash in a non-production build â€” verify it appears in the dashboard before shipping.',
]

// â”€â”€â”€ FAQ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const faq = [
  {
    question: 'Should I use Firebase or build a custom backend?',
    answer:
      'Firebase for fast iteration, small teams, and apps with real-time requirements. Custom backend when you need complex business logic, SQL relationships, predictable pricing at scale, or regulatory control over data residency. Many apps start on Firebase and migrate core logic to a custom backend as they grow.',
  },
  {
    question: 'Is Supabase production-ready?',
    answer:
      'Yes. Supabase is used in production by companies of varying sizes as of 2024. The managed hosting (supabase.com) handles infrastructure. Self-hosting is an option for organizations with strict data residency requirements. PostgreSQL has decades of production hardening behind it.',
  },
  {
    question: 'Do I need both FCM and APNs?',
    answer:
      'On the server side, you can use FCM as a unified API for both platforms â€” FCM handles the APNs delivery for iOS internally. You only need direct APNs integration for features FCM does not support, such as VoIP notifications via PushKit or CallKit.',
  },
  {
    question: 'How do I handle offline support with Firestore?',
    answer:
      'Enable offline persistence (it is on by default for mobile SDKs). All reads fall back to the local cache. Writes queue locally and sync on reconnection. For complex offline scenarios (conflict resolution, large datasets), consider a dedicated local database (Room, SQLite) with a custom sync layer.',
  },
  {
    question: 'What is the right crash reporter?',
    answer:
      'Firebase Crashlytics is free, excellent, and the default choice for most apps. If you want unified error monitoring across mobile and backend, or need performance tracing with the same tool, Sentry is the best alternative. Both integrate with Slack, Jira, and PagerDuty.',
  },
  {
    question: 'When should I use Remote Config vs a feature flag service?',
    answer:
      "Remote Config for simple kill switches, percentage rollouts, and A/B tests on small teams. LaunchDarkly or Statsig for regulated environments, complex targeting rules, real-time flag delivery, and statistical experiment rigor. Remote Config's 12-hour minimum fetch interval makes it unsuitable for time-sensitive flag changes.",
  },
  {
    question: 'How do I set up CI for both iOS and Android in GitHub Actions?',
    answer:
      'Use a matrix strategy: macos-latest runner for iOS (Xcode, Fastlane, code signing via Match), ubuntu-latest for Android (Gradle, signing with keystore from secrets). Cache CocoaPods and Gradle caches separately. Run unit tests on every PR; UI tests on merge to main or release branches.',
  },
]

// â”€â”€â”€ Key Takeaways â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const keyTakeaways = [
  'The mobile app is a thin client. Business logic, authorization, and data integrity belong on the server.',
  'Firebase is the fastest BaaS to production but introduces vendor lock-in and can produce unpredictable costs at scale. Supabase is the open-source SQL alternative.',
  'Use FCM as the unified push notification API for both Android and iOS. Handle APNs directly only for VoIP/PushKit.',
  'Store auth tokens in Keychain (iOS) or EncryptedSharedPreferences (Android). Never store secrets in the mobile binary.',
  'Test Firestore Security Rules and Supabase RLS policies in emulators before deploying â€” misconfigured rules are a critical security vulnerability.',
  'Version your APIs. Mobile apps are not instantly updated; old versions may be in the field for many months.',
  'Fastlane + Match solves the most painful part of mobile CI/CD: code signing. Set it up early.',
  'Crash reporting and analytics should be instrumented before the first TestFlight or beta release, not after the first production outage.',
]

// â”€â”€â”€ Pseudocode Patterns â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const pseudocodePatterns = [
  {
    title: 'Auth token refresh interceptor',
    code: `// Conceptual interceptor pattern (works in OkHttp/URLSession adapters)
intercept(request):
  response = chain.proceed(request)

  if response.statusCode == 401:
    synchronized(tokenLock):
      // Check if another thread already refreshed
      if currentToken != request.accessToken:
        return retry(request.withToken(currentToken))

      newTokens = authService.refreshToken(refreshToken)
      if newTokens != null:
        saveTokens(newTokens)
        return retry(request.withToken(newTokens.accessToken))
      else:
        signOut()  // Refresh token invalid â€” force re-login
        return response

  return response`,
    explanation:
      'The synchronized block prevents multiple concurrent requests from each triggering a separate refresh. The first thread refreshes; subsequent threads reuse the new token. On refresh failure, sign the user out rather than entering an infinite retry loop.',
  },
  {
    title: 'Push notification registration flow',
    code: `// App launch
requestNotificationPermission()
  â†’ granted: registerWithAPNs() / FCM.token()
  â†’ receive deviceToken (String)
  â†’ API.registerDevice(userId, deviceToken, platform)

// Server stores: { userId, token, platform, updatedAt }

// On token refresh (APNs rotates periodically)
onTokenRefresh(newToken):
  API.updateDevice(userId, newToken, platform)

// On sign-out
onSignOut():
  API.removeDevice(userId, deviceToken)
  FCM.deleteToken()`,
    explanation:
      'Register on every launch â€” not just first launch â€” because APNs tokens rotate silently. Always delete the server-side record on sign-out to prevent notifications being delivered to the wrong user after a device is transferred.',
  },
  {
    title: 'Offline-first write pattern',
    code: `// User submits a form
submitNote(content):
  note = Note(id: UUID(), content, syncStatus: .pending)
  localDB.insert(note)          // immediate local write
  updateUI()                     // instant response

  // Background sync worker
  syncWorker.scheduleIfNeeded()

// SyncWorker.run()
pendingNotes = localDB.fetchPending()
for note in pendingNotes:
  result = API.createNote(note)
  if result.success:
    localDB.markSynced(note.id, serverId: result.id)
  else if result.isConflict:
    resolveConflict(note, result.serverVersion)
  else:
    scheduleRetry(note)`,
    explanation:
      'The UI reads only from the local database, so it is always fast and functional offline. The sync worker runs in the background and handles retries. The .pending status allows the UI to show sync state without coupling to network calls.',
  },
]

// â”€â”€â”€ Code Examples â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const codeExamples = [
  {
    title: 'Firebase Auth (iOS Swift)',
    code: `import FirebaseAuth

// Sign in with email/password
func signIn(email: String, password: String) async throws -> User {
    let result = try await Auth.auth().signIn(withEmail: email, password: password)
    return result.user
}

// Observe auth state changes
func observeAuthState(onChange: @escaping (User?) -> Void) -> AuthStateDidChangeListenerHandle {
    Auth.auth().addStateDidChangeListener { _, user in
        onChange(user)
    }
}

// Get current ID token (auto-refreshed by SDK)
func currentIDToken() async throws -> String {
    guard let user = Auth.auth().currentUser else { throw AuthError.notSignedIn }
    return try await user.getIDToken()
}

// Sign out
func signOut() throws {
    try Auth.auth().signOut()
}`,
    explanation:
      'getIDToken() returns a cached token and refreshes it automatically when near expiry. Attach this token to API requests as a Bearer header. addStateDidChangeListener fires on app launch with the restored auth state â€” use it to drive navigation.',
  },
  {
    title: 'Firestore real-time listener',
    code: `import FirebaseFirestore

struct Note: Codable, Identifiable {
    @DocumentID var id: String?
    let title: String
    let body: String
    let ownerId: String
}

class NoteRepository {
    private let db = Firestore.firestore()

    func observeNotes(userId: String, onChange: @escaping ([Note]) -> Void) -> ListenerRegistration {
        db.collection("notes")
          .whereField("ownerId", isEqualTo: userId)
          .order(by: "createdAt", descending: true)
          .addSnapshotListener { snapshot, error in
              guard let docs = snapshot?.documents else { return }
              let notes = docs.compactMap { try? $0.data(as: Note.self) }
              onChange(notes)
          }
    }

    func addNote(_ note: Note) async throws {
        try db.collection("notes").addDocument(from: note)
    }
}`,
    explanation:
      'addSnapshotListener fires immediately with cached data, then again on each server update. The returned ListenerRegistration must be removed (listener.remove()) when the view disappears to prevent memory leaks. @DocumentID automatically populates the id from the Firestore document ID.',
  },
  {
    title: 'Supabase auth + RLS (Swift)',
    code: `import Supabase

let supabase = SupabaseClient(
    supabaseURL: URL(string: "https://xyz.supabase.co")!,
    supabaseKey: "anon-public-key"
)

// Sign in
func signIn(email: String, password: String) async throws {
    try await supabase.auth.signIn(email: email, password: password)
}

// Fetch rows (RLS automatically filters to the authenticated user's rows)
func fetchNotes() async throws -> [Note] {
    try await supabase
        .from("notes")
        .select()
        .order("created_at", ascending: false)
        .execute()
        .value
}

// Insert (RLS policy validates ownership server-side)
func insertNote(title: String, body: String) async throws {
    struct NewNote: Encodable {
        let title: String
        let body: String
    }
    try await supabase
        .from("notes")
        .insert(NewNote(title: title, body: body))
        .execute()
}`,
    explanation:
      'The anon key is safe to embed â€” it has no special privileges. RLS policies on the notes table ensure users can only see and modify their own rows. The JWT from supabase.auth.signIn() is automatically attached to all subsequent requests by the SDK.',
  },
  {
    title: 'FCM push notification (server â€” Node.js)',
    code: `import admin from 'firebase-admin';

admin.initializeApp({ credential: admin.credential.applicationDefault() });

async function sendPushNotification(
  deviceToken: string,
  title: string,
  body: string,
  data?: Record<string, string>,
) {
  const message: admin.messaging.Message = {
    token: deviceToken,
    notification: { title, body },
    data,
    apns: {
      payload: { aps: { badge: 1, sound: 'default' } },
    },
    android: {
      priority: 'high',
      notification: { channelId: 'default' },
    },
  };

  const messageId = await admin.messaging().send(message);
  console.log('Sent:', messageId);
  return messageId;
}`,
    explanation:
      'The apns and android blocks apply platform-specific overrides. android.priority: "high" wakes the device from Doze mode. The server uses a service account (application default credentials) â€” the FCM server key is never embedded in the mobile app.',
  },
  {
    title: 'Firebase Remote Config fetch (Android Kotlin)',
    code: `val remoteConfig = Firebase.remoteConfig

// Set defaults (used when fetch fails or cache is cold)
remoteConfig.setDefaultsAsync(
    mapOf(
        "new_checkout_enabled" to false,
        "max_items_per_order" to 10L,
        "promo_banner_text" to "Welcome!",
    )
)

// Fetch and activate at startup
suspend fun fetchConfig() {
    try {
        remoteConfig.fetchAndActivate().await()
    } catch (e: Exception) {
        // Defaults are already active â€” log and continue
        Timber.e(e, "Remote Config fetch failed")
    }
}

// Read values anywhere
val isNewCheckoutEnabled = remoteConfig.getBoolean("new_checkout_enabled")
val maxItems = remoteConfig.getLong("max_items_per_order").toInt()
val bannerText = remoteConfig.getString("promo_banner_text")`,
    explanation:
      'setDefaultsAsync ensures the app has working values before the first fetch completes. fetchAndActivate() fetches and applies in one call. In debug builds, set minimumFetchIntervalInSeconds = 0 to bypass the 12-hour cache. Production: use the default 12-hour interval.',
  },
  {
    title: 'Fastlane match + gym (iOS CI lane)',
    code: `# Fastfile
default_platform(:ios)

platform :ios do
  desc "Run tests"
  lane :test do
    run_tests(scheme: "MyApp")
  end

  desc "Build and upload to TestFlight"
  lane :beta do
    match(
      type: "appstore",
      readonly: true,          # CI: read certs from git, do not create new
      git_url: ENV["MATCH_GIT_URL"],
      password: ENV["MATCH_PASSWORD"],
    )
    increment_build_number(
      build_number: ENV["BUILD_NUMBER"],  # from CI environment
    )
    gym(
      scheme: "MyApp",
      export_method: "app-store",
      output_directory: "build",
    )
    pilot(
      ipa: "build/MyApp.ipa",
      skip_waiting_for_build_processing: true,
    )
  end
end`,
    explanation:
      'match readonly: true prevents CI from accidentally generating new certificates. BUILD_NUMBER from CI (e.g. GitHub Actions run number) ensures the build number increments automatically. pilot uploads the .ipa to TestFlight without manual App Store Connect interaction.',
  },
]

// â”€â”€â”€ Scenarios (interactive) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const scenarios = [
  {
    id: 'firebase-auth-flow',
    title: 'Firebase auth end-to-end',
    steps: [
      'User enters email and password. App calls Auth.auth().signIn(withEmail:password:).',
      'Firebase validates credentials server-side and returns a User object with an ID token (JWT, ~1 hour expiry) and refresh token.',
      'The SDK stores the refresh token securely. The app receives the User and navigates to the home screen.',
      'App makes an API call to the custom backend. It fetches the current ID token via user.getIDToken() â€” the SDK refreshes it automatically if near expiry.',
      'The custom backend verifies the JWT signature using Firebase Admin SDK. On success, it executes the business logic and returns the response.',
      'After 1 hour, the ID token expires. The next getIDToken() call triggers a silent refresh using the stored refresh token. The user never sees a sign-in prompt.',
      'User taps "Sign out." App calls Auth.auth().signOut(), deletes the FCM device token from the server, and clears local state.',
    ],
    summary:
      'Firebase Auth manages the full token lifecycle. Your backend only needs to verify JWTs â€” it never handles passwords or manages sessions directly.',
  },
  {
    id: 'push-registration',
    title: 'Push notification registration',
    steps: [
      'User first launches the app. At an appropriate moment (after seeing value), the app calls UNUserNotificationCenter.requestAuthorization.',
      'User grants permission. iOS registers the device with APNs and delivers a device token to application(_:didRegisterForRemoteNotificationsWithDeviceToken:).',
      'The app converts the token to a hex string and sends it to the backend: POST /api/devices { userId, token, platform: "ios" }.',
      'The backend stores the token in a devices table, indexed by userId.',
      'Server sends a notification: POST to FCM API with { token, notification: { title, body } }.',
      'FCM delivers to APNs. APNs delivers to the device OS. The OS displays the notification banner.',
      'User taps the notification. The app opens and the UNUserNotificationCenterDelegate method is called with the notification content and identifier.',
    ],
    summary:
      'Notifications travel server â†’ FCM/APNs â†’ OS â†’ app. Your server never contacts the device directly. Always keep device tokens updated on the server and remove them on sign-out.',
  },
  {
    id: 'cicd-release',
    title: 'Mobile CI/CD release pipeline',
    steps: [
      'Developer merges a pull request to the main branch. GitHub Actions triggers the release workflow.',
      'The workflow checks out code. Android job runs on ubuntu-latest; iOS job runs on macos-latest in parallel.',
      'iOS job: Fastlane match pulls signing certificates and profiles from the encrypted git repo using MATCH_PASSWORD secret.',
      'iOS job: fastlane gym builds and archives the app. Build number is set from the GitHub Actions run number.',
      'iOS job: fastlane pilot uploads the .ipa to TestFlight. Internal testers receive a build within minutes.',
      'Android job: Gradle assembles a release AAB, signed with the keystore stored in GitHub Secrets.',
      'Android job: Fastlane supply uploads the AAB to the Play Store internal track.',
      'QA validates both builds. On approval, the builds are promoted to the beta track, then to production with a phased rollout.',
    ],
    summary:
      'Automating signing and submission eliminates manual Xcode Organizer and Play Console steps. The entire pipeline from merge to TestFlight/internal track should run in under 30 minutes.',
  },
]

// â”€â”€â”€ Types and constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-mental-model', label: 'Mental Model' },
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-firebase', label: 'Firebase' },
    { id: 'core-supabase', label: 'Supabase' },
    { id: 'core-auth', label: 'Authentication' },
    { id: 'core-push', label: 'Push Notifications' },
    { id: 'core-observability', label: 'Analytics and Crash Reporting' },
    { id: 'core-remoteconfig', label: 'Remote Config and Feature Flags' },
    { id: 'core-cicd', label: 'CI/CD for Mobile' },
    { id: 'core-api', label: 'API Design for Mobile' },
    { id: 'core-offline', label: 'Offline and Sync' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Patterns' },
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-scenarios', label: 'Flow Walkthroughs' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Glossary Terms' }],
}

// â”€â”€â”€ Glossary â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const glossary = [
  {
    term: 'BaaS',
    definition:
      'Backend-as-a-Service â€” a platform providing pre-built backend services (auth, database, storage) via SDKs.',
  },
  {
    term: 'Firebase',
    definition:
      "Google's BaaS platform. Includes Firestore, Auth, Storage, FCM, Crashlytics, Remote Config, and Cloud Functions.",
  },
  {
    term: 'Supabase',
    definition:
      'Open-source Firebase alternative built on PostgreSQL with RLS, Realtime, Storage, and Edge Functions.',
  },
  {
    term: 'Firestore',
    definition:
      "Firebase's NoSQL document-collection database with offline persistence and real-time listeners.",
  },
  {
    term: 'RLS',
    definition:
      "Row Level Security â€” PostgreSQL's per-row authorization layer used extensively by Supabase.",
  },
  {
    term: 'JWT',
    definition:
      'JSON Web Token â€” a signed, encoded token containing claims used for stateless authentication.',
  },
  {
    term: 'Access token',
    definition: 'Short-lived JWT (15 minâ€“1 hour) attached to API requests to prove identity.',
  },
  {
    term: 'Refresh token',
    definition: 'Long-lived token used to obtain a new access token without requiring re-login.',
  },
  {
    term: 'APNs',
    definition:
      "Apple Push Notification service â€” Apple's infrastructure for delivering push notifications to iOS/macOS devices.",
  },
  {
    term: 'FCM',
    definition:
      "Firebase Cloud Messaging â€” Google's unified push delivery API for Android and iOS (wraps APNs for iOS).",
  },
  {
    term: 'Device token',
    definition:
      'A unique identifier issued by APNs/FCM to a specific app installation. Used to address push messages.',
  },
  {
    term: 'VoIP notification',
    definition:
      'High-priority APNs notification (via PushKit) for call apps. Wakes the app before the device fully processes it.',
  },
  {
    term: 'Notification Service Extension',
    definition:
      'iOS app extension that intercepts and modifies notifications before display. Used for rich media and encryption.',
  },
  {
    term: 'Firebase Crashlytics',
    definition:
      'Free real-time crash reporting service with stack traces, device metadata, and Firebase Analytics integration.',
  },
  {
    term: 'Sentry',
    definition:
      'Cross-platform error monitoring covering crashes, non-fatal errors, and performance across mobile and backend.',
  },
  {
    term: 'Remote Config',
    definition:
      'Server-side key-value store for runtime app configuration without requiring an app release.',
  },
  {
    term: 'Feature flag',
    definition:
      'A configuration switch that enables or disables a feature at runtime without deploying new code.',
  },
  {
    term: 'A/B test',
    definition:
      'Experiment that randomly assigns users to variants to measure the impact of a change.',
  },
  {
    term: 'ATT',
    definition:
      'App Tracking Transparency â€” iOS 14.5+ requirement to request user permission before cross-app tracking.',
  },
  {
    term: 'Fastlane',
    definition:
      'Open-source automation for mobile CI/CD: code signing (Match), building (gym), and store submission (deliver/pilot).',
  },
  {
    term: 'Fastlane Match',
    definition:
      'Fastlane tool that stores certificates and provisioning profiles in an encrypted git repo for team sharing.',
  },
  {
    term: 'EAS Build',
    definition:
      "Expo's cloud build service for React Native apps. Handles iOS and Android builds without local native toolchains.",
  },
  {
    term: 'OTA update',
    definition:
      'Over-the-air JS/asset bundle update. Delivers JavaScript changes without an App Store/Play Store release.',
  },
  {
    term: 'Cursor pagination',
    definition:
      'Pagination using an opaque cursor token for the next page position. Stable under insertions, unlike offset pagination.',
  },
  {
    term: 'Optimistic update',
    definition:
      'Applying a state change in the UI immediately before server confirmation, rolling back on error.',
  },
  {
    term: 'Offline-first',
    definition:
      'Architecture where all writes go to local storage first; network sync happens in the background.',
  },
  {
    term: 'Conflict resolution',
    definition:
      'Strategy for reconciling divergent data when two offline clients make different changes to the same record.',
  },
  {
    term: 'Firebase App Check',
    definition:
      'Service that verifies API calls come from legitimate app instances using DeviceCheck (iOS) or Play Integrity (Android).',
  },
  {
    term: 'Firestore Security Rules',
    definition:
      'Server-evaluated authorization rules that control who can read or write each Firestore document.',
  },
  {
    term: 'Firebase Emulator Suite',
    definition:
      'Local emulators for Firestore, Auth, Functions, Storage, and other Firebase services for development and testing.',
  },
  {
    term: 'SKAdNetwork',
    definition: "Apple's privacy-preserving ad attribution framework used when ATT is denied.",
  },
  {
    term: 'CloudKit',
    definition: "Apple's iCloud database and sync infrastructure for native iOS/macOS apps.",
  },
]

// â”€â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function MobileBackendAndServicesPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Mobile Backend and Services',
    defaultTab: 'big-picture',
  })

  const defaultExample = codeExamples[0] ?? { title: '', code: '', explanation: '' }
  const defaultScenario = scenarios[0] ?? { id: '', title: '', steps: [], summary: '' }

  const [selectedExampleTitle, setSelectedExampleTitle] = useState(defaultExample.title)
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id)
  const [stepIndex, setStepIndex] = useState(0)

  const selectedExample =
    codeExamples.find((e) => e.title === selectedExampleTitle) ?? defaultExample
  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId) ?? defaultScenario
  const canStepForward = stepIndex < selectedScenario.steps.length - 1

  const handleScenarioSelect = (id: string) => {
    setSelectedScenarioId(id)
    setStepIndex(0)
  }

  return (
    <TopicPageShell
      title="Mobile Backend and Services"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Mobile Backend and Services</h1>
      <p>
        Mobile apps depend on server-side services for authentication, data storage, push
        notifications, analytics, crash reporting, remote configuration, and CI/CD. This document
        covers Firebase, Supabase, authentication patterns, push delivery, observability, feature
        flags, API design, offline sync, and mobile release pipelines.
      </p>

      {/* â”€â”€ Big Picture â”€â”€ */}
      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-mental-model" className="bin98-section">
            <h2 className="bin98-heading">Mental Model</h2>
            {mentalModel.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why This Matters</h2>
            <p>
              The backend is where security, data integrity, and business logic live. A weak backend
              undermines a well-built mobile app. Misconfigured security rules, unversioned APIs,
              broken token refresh, and missing crash reporting are among the most common causes of
              mobile app incidents in production.
            </p>
            <p>
              Service selection made at the start of a project is hard to undo. Firebase data models
              do not translate cleanly to SQL. Tightly coupled push notification flows are expensive
              to replace. Understanding the trade-offs early prevents costly migrations later.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* â”€â”€ Core Concepts â”€â”€ */}
      {activeTab === 'core-concepts' && (
        <>
          <section id="core-firebase" className="bin98-section">
            <h2 className="bin98-heading">Firebase</h2>
            {firebaseConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-supabase" className="bin98-section">
            <h2 className="bin98-heading">Supabase</h2>
            {supabaseConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-auth" className="bin98-section">
            <h2 className="bin98-heading">Authentication</h2>
            {authConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-push" className="bin98-section">
            <h2 className="bin98-heading">Push Notifications</h2>
            {pushNotifications.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-observability" className="bin98-section">
            <h2 className="bin98-heading">Analytics and Crash Reporting</h2>
            {observability.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-remoteconfig" className="bin98-section">
            <h2 className="bin98-heading">Remote Config and Feature Flags</h2>
            {remoteConfig.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-cicd" className="bin98-section">
            <h2 className="bin98-heading">CI/CD for Mobile</h2>
            {cicdConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-api" className="bin98-section">
            <h2 className="bin98-heading">API Design for Mobile</h2>
            {apiDesign.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-offline" className="bin98-section">
            <h2 className="bin98-heading">Offline and Sync</h2>
            {offlineSync.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-security" className="bin98-section">
            <h2 className="bin98-heading">Security</h2>
            {securityPractices.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareContrast.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {commonPitfalls.map((p) => (
                <li key={p.mistake}>
                  <strong>{p.mistake}:</strong> {p.description}
                </li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="core-debugging" className="bin98-section">
            <h2 className="bin98-heading">Debugging Checklist</h2>
            {debuggingChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Checklist</h2>
            <ul>
              {correctnessChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="core-faq" className="bin98-section">
            <h2 className="bin98-heading">FAQ</h2>
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="bin98-subheading">{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {/* â”€â”€ Examples â”€â”€ */}
      {activeTab === 'examples' && (
        <>
          <section id="ex-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Pseudocode Patterns</h2>
            {pseudocodePatterns.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <div className="bin98-codebox">
                  <code>{item.code.trim()}</code>
                </div>
                <p>{item.explanation}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            <p>Select an example to view the implementation pattern.</p>
            <div className="bin98-inline-buttons">
              {codeExamples.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="bin98-push"
                  onClick={() => setSelectedExampleTitle(item.title)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <h3 className="bin98-subheading">{selectedExample.title}</h3>
            <div className="bin98-codebox">
              <code>{selectedExample.code.trim()}</code>
            </div>
            <p>{selectedExample.explanation}</p>
          </section>
          <hr className="bin98-divider" />
          <section id="ex-scenarios" className="bin98-section">
            <h2 className="bin98-heading">Flow Walkthroughs</h2>
            <p>Select a flow and step through how the system behaves end-to-end.</p>
            <div className="bin98-inline-buttons">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="bin98-push"
                  onClick={() => handleScenarioSelect(s.id)}
                >
                  {s.title}
                </button>
              ))}
            </div>
            <h3 className="bin98-subheading">{selectedScenario.title}</h3>
            <div className="bin98-step-box">
              Step {stepIndex + 1} of {selectedScenario.steps.length}:{' '}
              {selectedScenario.steps[stepIndex]}
            </div>
            <div className="bin98-step-controls">
              <button
                type="button"
                className="bin98-push"
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                disabled={stepIndex === 0}
              >
                &lt; Back
              </button>
              <button
                type="button"
                className="bin98-push"
                onClick={() =>
                  setStepIndex((i) => Math.min(selectedScenario.steps.length - 1, i + 1))
                }
                disabled={!canStepForward}
              >
                Next &gt;
              </button>
              <span>
                {stepIndex + 1} / {selectedScenario.steps.length}
              </span>
            </div>
            <p>
              <strong>Summary:</strong> {selectedScenario.summary}
            </p>
          </section>
        </>
      )}

      {/* â”€â”€ Glossary â”€â”€ */}
      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
