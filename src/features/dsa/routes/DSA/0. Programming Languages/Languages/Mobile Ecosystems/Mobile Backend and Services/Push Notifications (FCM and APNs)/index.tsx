import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const PAGE_TITLE = 'Push Notifications (FCM and APNs)'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Push notifications on mobile usually mean a delivery chain that begins on an application server, moves through a provider such as Firebase Cloud Messaging or Apple Push Notification service, and ends on a device that may or may not be online, foregrounded, or willing to display the message immediately. This is an operational messaging system, not a guaranteed direct message bus.',
  'The right mental model is that FCM and APNs play different roles. APNs is Apple\'s native push transport for iPhone and iPad devices. FCM is Google\'s messaging layer that can act as the direct provider on Android and as an orchestration layer that still hands iOS delivery off to APNs. Teams need to understand both layers if they want reliable mobile messaging.',
  'This page focuses on push notifications in real mobile systems. It covers APNs and FCM responsibilities, token lifecycle, permissions, notification and data payloads, foreground and background behavior, routing, reliability, collapse and priority semantics, backend design, monitoring, examples, and the terms that matter when teams are debugging delivery or designing notification workflows.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Push notifications are remote messages sent to a device through a platform-controlled delivery path. On Apple devices that path ultimately ends at APNs. On Android it often ends at FCM directly. In a cross-platform product, teams often use FCM as the unified sending interface while still depending on APNs for iOS delivery under the hood.',
      'This matters because a push architecture is never only a client feature. It spans app permissions, token registration, backend targeting, provider credentials, payload design, app state behavior, and operational monitoring. A notification that fails to appear may be caused by any point in that chain.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why It Matters',
    paragraphs: [
      'Push is one of the main re-engagement and event-delivery channels in mobile products. It powers chat alerts, order updates, security warnings, marketing campaigns, reminders, background refresh triggers, and operational notices. For many apps, push is not a side feature; it is part of the product loop that brings users back into the app.',
      'It also matters because mobile apps are not always running. When the app is suspended or terminated, push may be the only practical way to notify the user or prompt limited background work. That gives push unusual operational importance compared with many other mobile APIs.',
    ],
    bullets: [
      'Critical channel for user re-engagement and event delivery.',
      'Often the only path into a suspended mobile app experience.',
      'Crosses product, backend, and platform boundaries.',
      'Requires both technical and UX discipline to be effective.',
    ],
  },
  {
    id: 'bp-fcm-vs-apns',
    title: 'FCM vs APNs Responsibilities',
    paragraphs: [
      'APNs is Apple\'s push gateway for Apple devices. If an iOS app receives remote notifications, APNs is part of the path. FCM is Google\'s messaging platform and can provide a unified API surface for mobile teams, topic routing, token management workflows, analytics integration, and Android-native delivery.',
      'For iOS specifically, FCM is not a replacement for APNs transport. It is a layer above it. Messages sent through Firebase to an iPhone still rely on APNs credentials and APNs delivery rules. Teams that miss that distinction often misdiagnose iOS notification issues as only Firebase issues or only Apple issues when the problem can span both.',
    ],
  },
  {
    id: 'bp-what-push-is-not',
    title: 'What Push Is Not',
    paragraphs: [
      'Push is not guaranteed immediate delivery, and it is not a substitute for strong in-app state synchronization. Devices may be offline, throttled, permission-denied, battery-constrained, or in a state where the operating system chooses not to surface the message exactly as the sender hoped.',
      'Push is also not a reason to move core business truth into transient notifications. Notifications should point toward state, not become the state. The app still needs authoritative backend data and app-open refresh logic because notifications can be delayed, dropped, collapsed, or dismissed.',
    ],
    bullets: [
      'Not guaranteed instant or guaranteed visible delivery.',
      'Not a database or durable synchronization layer.',
      'Not a reason to trust client state without server reconciliation.',
      'Not only a backend concern or only a client concern.',
    ],
  },
  {
    id: 'bp-decision-frame',
    title: 'Decision Frame',
    paragraphs: [
      'The useful design questions are: who should receive the message, what should the payload contain, what should happen if the app is foregrounded or backgrounded, what happens when delivery fails, and what user experience is appropriate for the urgency of the event. Push design is partly infrastructure and partly product design.',
      'Teams that answer those questions explicitly tend to build reliable and respectful notification systems. Teams that treat push as a generic blast channel usually end up with poor delivery hygiene, noisy user experience, and support problems around missing or duplicated alerts.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Push notifications should be understood as a full delivery pipeline: app permission, device token, provider routing, payload semantics, app-state handling, and backend targeting logic all matter.',
      'FCM and APNs are complementary in many mobile stacks rather than interchangeable. Reliable notification systems come from treating push as product infrastructure with clear operational ownership, not as a one-off SDK integration.',
    ],
    bullets: [
      'Understand the full pipeline, not just the client API.',
      'Treat APNs and FCM as distinct layers with distinct responsibilities.',
      'Design payloads and UX intentionally.',
      'Assume delivery is probabilistic and architect accordingly.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-token-lifecycle',
    title: 'Device Tokens and Registration Lifecycle',
    paragraphs: [
      'Push delivery begins with token registration. APNs issues a device token for an app-device combination on Apple platforms. FCM issues registration tokens for its own messaging workflows. The backend needs a trustworthy way to associate those tokens with users, devices, sessions, app versions, and sometimes notification preferences.',
      'This is not a trivial bookkeeping detail. Tokens rotate, expire, become invalid, or get replaced when the app is reinstalled, restored, or reconfigured. Production systems therefore need token upsert logic, invalid-token cleanup, and clear ownership rules for when a user logs in, logs out, or uses multiple devices.',
    ],
    bullets: [
      'Treat tokens as rotating delivery addresses, not permanent identity.',
      'Associate tokens with both user and device context where useful.',
      'Remove stale or invalid tokens from the backend promptly.',
      'Token lifecycle bugs are a common cause of missed notifications.',
    ],
  },
  {
    id: 'core-permissions',
    title: 'Permission Model and User Experience',
    paragraphs: [
      'On iOS, notification permission is explicit and user-facing. The app should request it at an intentional moment rather than blindly on first launch unless the product absolutely requires immediate setup. Permission strategy is part of UX design because premature prompts often reduce opt-in rates.',
      'Permission state also needs to be handled operationally. The backend and app should distinguish users who opted out, users who never granted permission, and users whose tokens are technically registered but should not receive certain categories of messages due to app-level preferences.',
    ],
  },
  {
    id: 'core-payloads',
    title: 'Notification Payloads and Data Payloads',
    paragraphs: [
      'Push payloads usually contain some combination of notification fields for user-visible presentation and data fields for app logic. On iOS, APNs payload structure and headers shape how the system treats the message. Through FCM, teams often compose a cross-platform payload that still has provider-specific delivery behavior underneath.',
      'Payload design should be deliberate. Include enough information to route the user meaningfully, but do not stuff sensitive or excessive data into notifications. In many cases the payload should identify the event and let the app fetch authoritative state when opened rather than trying to make the notification itself the source of truth.',
    ],
    bullets: [
      'Separate display intent from app-routing intent.',
      'Keep payloads small and purposeful.',
      'Do not put sensitive business truth into notification text or raw payloads casually.',
      'Use IDs and routing hints when the app can fetch fresh state safely.',
    ],
  },
  {
    id: 'core-foreground-background',
    title: 'Foreground, Background, and Terminated App Behavior',
    paragraphs: [
      'Push behavior changes depending on app state. A foregrounded app may choose to suppress or present a custom in-app experience. A backgrounded app may show a system notification or use a silent/background push to refresh limited state. A terminated app may rely on the system to display a notification without your process actively running.',
      'Because of that, notification handling must be designed per state rather than assuming one universal path. The same event might deserve a banner when the app is closed, a lightweight in-app toast when open, and a background refresh path when the user has not yet re-entered the app.',
    ],
  },
  {
    id: 'core-priority-collapse',
    title: 'Priority, Expiration, and Collapse Semantics',
    paragraphs: [
      'Push systems provide delivery semantics beyond just send or do not send. Priority indicates urgency. Expiration determines whether stale notifications should still be delivered later. Collapse identifiers or similar concepts allow newer updates to replace older ones for the same logical stream, which is useful for status updates or rapidly changing content.',
      'These controls are operationally important because they prevent both spam and stale delivery. A ride-status update, score update, or order-status update often should collapse into the newest version instead of showing five outdated alerts in sequence.',
    ],
    bullets: [
      'Use high urgency only for genuinely urgent messages.',
      'Set expiration deliberately for time-sensitive workflows.',
      'Collapse repeating state updates where older alerts no longer matter.',
      'Delivery semantics are a product decision, not only an infrastructure setting.',
    ],
  },
  {
    id: 'core-routing-deeplinks',
    title: 'Routing, Deep Links, and App Navigation',
    paragraphs: [
      'A useful notification is one the app can route meaningfully. That usually means the payload carries a stable event identifier, screen hint, entity ID, or deep-link target. When the user taps the notification, the app should land in a sensible destination rather than on a generic home screen that forces the user to guess what happened.',
      'This routing logic should still be resilient to stale state. If the referenced object no longer exists or the user no longer has access, the app should fail gracefully and refresh authoritative state rather than breaking navigation.',
    ],
  },
  {
    id: 'core-backend-design',
    title: 'Backend Targeting and Notification Architecture',
    paragraphs: [
      'A mature push system includes a backend notification service, not just client SDK setup. That service decides who should receive which message, deduplicates events, applies preferences and quiet hours, chooses templates, records delivery attempts, and hands messages to APNs or FCM with the correct credentials and payload format.',
      'This is where many products either become reliable or chaotic. Without a notification domain model, it is easy to send duplicates, ignore user preferences, lose auditability, or tie notification behavior too directly to random application code paths.',
    ],
    bullets: [
      'Centralize targeting, preference checks, and templating logic.',
      'Deduplicate events before sending.',
      'Keep notification generation separate from raw provider transport where possible.',
      'Auditability matters for support and debugging.',
    ],
  },
  {
    id: 'core-ios-specific',
    title: 'Apple-Specific Delivery Considerations',
    paragraphs: [
      'On Apple platforms, APNs credentials, bundle identity, push capabilities, environment matching, notification categories, interruption levels, and background modes all influence behavior. A perfectly valid backend message can still fail if app entitlements or provider credentials are wrong for the build being used.',
      'iOS also places strong system controls around background execution and visible interruption. Teams should design within those constraints rather than assuming the app can always wake and do arbitrary work because a push arrived.',
    ],
  },
  {
    id: 'core-fcm-specific',
    title: 'Firebase Cloud Messaging as a Cross-Platform Layer',
    paragraphs: [
      'FCM is often used because it simplifies a multi-platform notification backend. A team can target Android directly through FCM and target iOS through FCM while letting FCM hand off to APNs. It also adds concepts such as topics, device groups, analytics adjacency, and a unified admin SDK flow for many teams.',
      'The tradeoff is that FCM does not erase platform-specific reality. iOS delivery still obeys APNs rules. Notification appearance still depends on Apple behavior. Teams using FCM for iOS should still understand APNs headers, tokens, and app-state handling instead of treating Firebase as an opaque magic layer.',
    ],
  },
  {
    id: 'core-monitoring',
    title: 'Reliability, Monitoring, and Debugging',
    paragraphs: [
      'Push systems need observability. Teams should log notification creation, targeting decisions, provider responses, invalid-token cleanup, app-open attribution where appropriate, and the distinction between sent, accepted by provider, and actually displayed or acted upon. These are not the same event.',
      'Debugging push requires tracing the whole chain: did the app request permission, did it register a token, did the backend store the token correctly, did the provider accept the message, did the device state allow display, and did the app route the action correctly after receipt? Without logging, support incidents become guesswork.',
    ],
    bullets: [
      'Differentiate provider acceptance from end-user visibility.',
      'Track invalid tokens and cleanup success.',
      'Keep delivery and open-path logs where privacy and product design allow.',
      'Debug from the pipeline, not from assumptions about one layer.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-ios-permission',
    title: 'Request Notification Authorization on iOS',
    description: [
      'On iOS, notification permission should be requested intentionally and the result should feed app state. The app should treat authorization outcome as product state rather than as a fire-and-forget prompt.',
      'This example shows the basic permission request path in Swift using UserNotifications.',
    ],
    code: `import UserNotifications
import UIKit

UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) {
    granted, error in
    print(granted, error as Any)

    guard granted else { return }
    DispatchQueue.main.async {
        UIApplication.shared.registerForRemoteNotifications()
    }
}`,
    notes: [
      'Request timing should match the product moment where permission makes sense.',
      'Successful authorization still needs remote notification registration afterward.',
      'The app should handle denial paths explicitly.',
    ],
  },
  {
    id: 'examples-apns-token',
    title: 'Capture and Forward an APNs Device Token',
    description: [
      'After iOS registers for remote notifications, the app receives a device token. That token usually needs to be serialized and sent to the backend so the backend can target that device later.',
      'The backend should store it with user and device context rather than as an unscoped string.',
    ],
    code: `func application(
    _ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
) {
    let token = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
    print("APNs token:", token)
    // Send token to backend here.
}`,
    notes: [
      'Treat token registration as a backend synchronization event.',
      'Token updates should overwrite stale tokens for the same install where appropriate.',
      'Log enough to debug registration without leaking sensitive details broadly.',
    ],
  },
  {
    id: 'examples-fcm-send',
    title: 'Send a Targeted Notification Through FCM',
    description: [
      'A backend service often sends messages through FCM using an admin SDK or HTTP API. The message can include both display information and data for app-side routing.',
      'This example shows the basic shape of a targeted message rather than a full production notification service.',
    ],
    code: `import admin from 'firebase-admin'

await admin.messaging().send({
  token,
  notification: {
    title: 'Order updated',
    body: 'Your order is out for delivery.',
  },
  data: {
    type: 'order_update',
    orderId: '12345',
  },
})`,
    notes: [
      'Backend sending should apply preference and deduplication logic before transport.',
      'Data fields help the app route meaningfully after open.',
      'The send call is only one step in a larger notification pipeline.',
    ],
  },
  {
    id: 'examples-routing',
    title: 'Route a Notification Tap to a Specific Screen',
    description: [
      'A push notification becomes much more useful when the app can route it to the correct destination after the user taps it. That usually means reading a stable type and identifier from the payload.',
      'This example shows the shape of payload-driven routing logic rather than a complete navigation implementation.',
    ],
    code: `func handleNotificationPayload(_ userInfo: [AnyHashable: Any]) {
    guard
        let type = userInfo["type"] as? String,
        let orderId = userInfo["orderId"] as? String
    else {
        return
    }

    if type == "order_update" {
        print("Navigate to order detail for", orderId)
    }
}`,
    notes: [
      'Payload routing should degrade gracefully if the referenced entity is gone.',
      'Use stable identifiers rather than raw pre-rendered state when possible.',
      'Notification UX is part of navigation design, not only messaging design.',
    ],
  },
  {
    id: 'examples-apns-payload',
    title: 'Minimal APNs JSON Payload Shape',
    description: [
      'APNs messages are built around a JSON payload with an `aps` object. Additional custom keys can carry routing or event information for the app.',
      'Real production sends also depend on headers and provider credentials, but the payload shape is the foundation.',
    ],
    code: `{
  "aps": {
    "alert": {
      "title": "Security alert",
      "body": "A new sign-in was detected."
    },
    "badge": 1,
    "sound": "default"
  },
  "type": "security_event",
  "sessionId": "abc123"
}`,
    notes: [
      'Keep the visible alert concise and the custom data purposeful.',
      'Custom keys should help the app route or fetch authoritative state.',
      'Payload content should match the urgency and privacy needs of the event.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundational Terms',
    terms: [
      {
        term: 'APNs',
        definition: 'Apple Push Notification service, the native Apple transport used to deliver remote notifications to Apple devices.',
      },
      {
        term: 'FCM',
        definition: 'Firebase Cloud Messaging, Google\'s push messaging service often used directly for Android and as a sending/orchestration layer for iOS.',
      },
      {
        term: 'Device token',
        definition: 'A platform-issued address used to target a specific app installation on a device for push delivery.',
      },
      {
        term: 'Registration token',
        definition: 'A provider-specific token, such as an FCM token, used by the backend to address a mobile app instance.',
      },
      {
        term: 'Payload',
        definition: 'The structured message body sent through the push provider, including display information and optional data fields.',
      },
      {
        term: 'Silent push',
        definition: 'A background-oriented notification intended to wake or refresh the app without necessarily displaying a visible alert.',
      },
    ],
  },
  {
    id: 'glossary-delivery',
    title: 'Delivery and UX Terms',
    terms: [
      {
        term: 'Collapse identifier',
        definition: 'A grouping mechanism that allows a newer message to replace older pending messages for the same logical stream.',
      },
      {
        term: 'Expiration',
        definition: 'The time after which an undelivered notification should be dropped instead of arriving stale.',
      },
      {
        term: 'Priority',
        definition: 'The urgency hint provided to the push provider to influence delivery treatment and device wake behavior.',
      },
      {
        term: 'Foreground presentation',
        definition: 'How the app or operating system handles a notification while the app is already open and active.',
      },
      {
        term: 'Deep link',
        definition: 'A navigation target encoded in or derived from the notification so the app opens the relevant screen directly.',
      },
      {
        term: 'Notification preference',
        definition: 'An app-level user choice controlling which categories of notifications should be sent or shown.',
      },
    ],
  },
  {
    id: 'glossary-ops',
    title: 'Operational Terms',
    terms: [
      {
        term: 'Provider acceptance',
        definition: 'The state where APNs or FCM accepts the message for delivery processing, which is not the same as user-visible delivery.',
      },
      {
        term: 'Invalid token cleanup',
        definition: 'The backend process of removing tokens that providers report as stale, expired, or no longer valid.',
      },
      {
        term: 'Topic messaging',
        definition: 'An FCM feature for sending to groups of subscribed devices through a named topic instead of individual tokens.',
      },
      {
        term: 'Notification service',
        definition: 'A backend subsystem that decides who should receive a notification, builds payloads, and sends them through a provider.',
      },
      {
        term: 'Background mode',
        definition: 'An app capability and operating-system behavior that affects what work can happen when a notification arrives offscreen.',
      },
      {
        term: 'Delivery pipeline',
        definition: 'The full path from backend event creation through provider routing and device handling to user-visible or app-visible result.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

const pushHelpStyles = `
.push-help98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.push-help98-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.push-help98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.push-help98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  letter-spacing: 0.1px;
  white-space: nowrap;
}

.push-help98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.push-help98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  font: inherit;
  font-size: 11px;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.push-help98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.push-help98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  color: #000;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.push-help98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.push-help98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.push-help98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}
.push-help98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.push-help98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.push-help98-toc-list li {
  margin: 0 0 8px;
}

.push-help98-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.push-help98-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.push-help98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.push-help98-section {
  margin: 0 0 20px;
}

.push-help98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.push-help98-content p,
.push-help98-content li,
.push-help98-content dd,
.push-help98-content dt {
  font-size: 12px;
  line-height: 1.5;
}

.push-help98-content p,
.push-help98-content dd {
  margin: 0 0 10px;
}

.push-help98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.push-help98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.push-help98-codebox {
  margin: 8px 0 10px;
  padding: 8px;
  overflow-x: auto;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.push-help98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

.push-help98-glossary {
  margin: 0;
}

.push-help98-glossary dt {
  margin: 0 0 2px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .push-help98-main {
    grid-template-columns: 1fr;
  }

  .push-help98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .push-help98-content {
    padding: 14px 14px 20px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="push-help98-section">
      <h2 className="push-help98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {!isLast ? <hr className="push-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="push-help98-section">
      <h2 className="push-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="push-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="push-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="push-help98-section">
      <h2 className="push-help98-heading">{section.title}</h2>
      <dl className="push-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="push-help98-divider" /> : null}
    </section>
  )
}

export default function PushNotificationsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `${PAGE_TITLE} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: PAGE_TITLE,
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="push-help98-page">
      <style>{pushHelpStyles}</style>
      <div className="push-help98-window" role="presentation">
        <header className="push-help98-titlebar">
          <span className="push-help98-title">{PAGE_TITLE}</span>
          <div className="push-help98-controls">
            <button className="push-help98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="push-help98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="push-help98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`push-help98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="push-help98-main">
          <aside className="push-help98-toc" aria-label="Table of contents">
            <h2 className="push-help98-toc-title">Contents</h2>
            <ul className="push-help98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="push-help98-content">
            <h1 className="push-help98-doc-title">{PAGE_TITLE}</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <hr className="push-help98-divider" />

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) =>
                  renderContentSection(section, index === bigPictureSections.length - 1),
                )
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) =>
                  renderExampleSection(section, index === exampleSections.length - 1),
                )
              : null}

            {activeTab === 'glossary'
              ? glossarySections.map((section, index) =>
                  renderGlossarySection(section, index === glossarySections.length - 1),
                )
              : null}
          </main>
        </div>
      </div>
    </div>
  )
}
