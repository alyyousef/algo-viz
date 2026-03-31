import { useEffect, useState } from 'react'
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

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  "Retrofit is Square's type-safe HTTP client for Java and Android. It sits above OkHttp and turns annotated Kotlin or Java interfaces into API clients. The important value is not just making HTTP calls shorter. It is making remote contracts explicit: paths, query parameters, request bodies, converters, error handling shape, and the relationship between transport code and the rest of the Android architecture.",
  'Retrofit is not a networking stack by itself in the same way OkHttp is. OkHttp handles the low-level HTTP client work. Retrofit builds an interface-driven declarative layer on top of that client so the app can describe endpoints as functions instead of manually constructing requests everywhere.',
  'This page is intentionally comprehensive. It covers what Retrofit is, how it relates to OkHttp, service interfaces, annotations, converters, call adapters, coroutine usage, error handling, interceptors, serialization strategy, repository integration, testing, performance, common Android architecture patterns, and the failure modes teams tend to encounter in production.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Retrofit is one of the most established choices for HTTP API access in Android applications. Developers define an interface, annotate its methods with HTTP semantics such as `@GET` or `@POST`, declare parameters and response types, and let Retrofit generate the implementation. That gives the network layer a strong contract and keeps request-building logic out of the rest of the app.',
      'The reason this matters in Android is architectural. Mobile apps frequently call JSON APIs, authenticate requests, handle retries or timeouts, map DTOs into domain models, and coordinate network with local persistence. Retrofit works well because it expresses the API surface cleanly while delegating transport concerns to OkHttp and serialization concerns to converter factories.',
      'It is especially valuable when the application has many endpoints, several response models, and a repository layer that should not know about raw HTTP details. It is less important when the app only needs one or two trivial requests or when a different client strategy is already a deliberate team choice.',
    ],
  },
  {
    id: 'bp-why-retrofit-exists',
    title: 'Why Retrofit Exists',
    paragraphs: [
      'Manual HTTP code on Android quickly becomes repetitive and error-prone. Developers have to build URLs, attach headers, encode bodies, parse responses, map errors, and keep the request layer consistent across the app. Even when OkHttp handles transport well, raw request code still spreads details everywhere unless the team imposes structure.',
      'Retrofit exists to turn that repeated request boilerplate into a stable declarative API contract. An endpoint becomes a method. A path parameter becomes an annotation. A response body becomes a typed return value through a converter. The result is not magic; it is disciplined indirection.',
    ],
    bullets: [
      'Endpoint contracts become explicit interfaces.',
      'Serialization is delegated to configurable converter factories.',
      'Transport stays on top of OkHttp instead of being reinvented in app code.',
      'Repository and use-case layers can depend on typed service methods rather than raw requests.',
    ],
  },
  {
    id: 'bp-when-retrofit-fits',
    title: 'When Retrofit Fits Best',
    paragraphs: [
      'Retrofit is a strong fit when the app talks to JSON or HTTP APIs with more than trivial complexity, especially if the codebase already uses Kotlin coroutines, repositories, DTO mapping, or a layered Android architecture. It is also a good fit when the team values interface-driven API design and wants to keep transport code standardized.',
      'Its value grows as the number of endpoints, authentication rules, and serialization concerns grows. In a medium or large Android app, that usually makes Retrofit an easy choice.',
    ],
    bullets: [
      'Apps with many HTTP endpoints.',
      'Codebases using repositories and ViewModels.',
      'Projects that want a clean separation between transport and domain logic.',
      'Teams already standardized on OkHttp and JSON serializers.',
    ],
  },
  {
    id: 'bp-when-retrofit-does-not-fit',
    title: 'When Retrofit Does Not Fit',
    paragraphs: [
      'Retrofit can be overkill when the app only performs one or two trivial requests, when the network layer is highly dynamic in a way that does not map well to interface declarations, or when the project already uses another deliberate HTTP client abstraction. It is also not the right place to hide every networking concern behind annotations if the application needs highly custom protocol-level logic.',
      'Another anti-pattern is expecting Retrofit to solve caching, retry strategy, authentication refresh, business-level error handling, or offline sync by itself. Those concerns often live above or beside Retrofit, not inside it.',
    ],
    bullets: [
      'Very small projects with almost no HTTP surface.',
      'Codebases with highly custom low-level HTTP behavior that do not map cleanly to service interfaces.',
      'Teams looking for Retrofit to replace broader networking architecture decisions.',
      'Cases where the project already has a stronger deliberate abstraction.',
    ],
  },
  {
    id: 'bp-building-blocks',
    title: 'The Main Building Blocks',
    paragraphs: [
      'Retrofit usage typically centers around a few core pieces: a Retrofit instance, one or more service interfaces, converter factories, an underlying OkHttpClient, and often repository classes that use the generated services. Around those pieces are cross-cutting concerns such as authentication, logging, interceptors, serialization strategy, testing, and response modeling.',
      'Understanding the boundaries between those layers is more important than memorizing annotations. Retrofit should own endpoint declaration. OkHttp should own low-level client concerns. Repositories should own application data coordination.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Retrofit dramatically improves networking ergonomics, but it does not make API design quality automatic. Teams still need to think about DTO stability, error contracts, retries, cancellation, rate limits, auth refresh, serialization defaults, and how network models map into domain models or Room entities.',
      'In production Android apps, Retrofit works best as a well-bounded transport layer, not as a place to mix domain logic, UI state, and every exception branch all at once.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The best decision rule is to ask whether the app has a real HTTP API layer and whether interface-driven endpoint declarations would improve maintainability. If yes, Retrofit is usually the default answer on Android. If the HTTP surface is tiny or highly irregular, the abstraction may buy less.',
      'Another useful question is whether the app architecture already values repositories, DTO mapping, and typed service contracts. If yes, Retrofit fits naturally into that shape.',
    ],
    bullets: [
      'Choose Retrofit when the app has meaningful HTTP API complexity.',
      'Do not expect Retrofit to replace broader networking architecture.',
      'Use Retrofit with OkHttp intentionally rather than treating them as interchangeable tools.',
      'Keep serialization, transport, and domain mapping boundaries clear.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-retrofit-is',
    title: 'What Retrofit Actually Is',
    paragraphs: [
      'Retrofit is a declarative HTTP client layer. You define an interface, annotate methods with HTTP metadata, and ask Retrofit to create an implementation. The library then uses reflection, factories, and the configured client stack to turn those method calls into real HTTP requests.',
      'That means Retrofit is not the transport engine and not the serializer itself. It is the contract layer that coordinates those pieces around a typed API surface.',
    ],
  },
  {
    id: 'core-retrofit-vs-okhttp',
    title: 'How Retrofit Relates to OkHttp',
    paragraphs: [
      'OkHttp is the underlying HTTP client responsible for connections, request execution, interceptors, TLS behavior, timeouts, pooling, and low-level transport details. Retrofit usually sits on top of an OkHttpClient and uses it to perform the actual calls.',
      'A useful shorthand is that OkHttp is the engine and Retrofit is the typed interface layer. The two are complementary, not interchangeable.',
    ],
  },
  {
    id: 'core-service-interfaces',
    title: 'Service Interfaces',
    paragraphs: [
      'A Retrofit service interface defines the remote API as a set of functions. Each function corresponds to an endpoint and is annotated with HTTP method and parameter information. This gives the network layer a strong contract and makes it easier to review changes because endpoint shape is visible in one place.',
      'A good service interface is cohesive. It groups related endpoints and keeps naming clear. A bad service interface becomes a giant file with unrelated endpoints and inconsistent return conventions.',
    ],
  },
  {
    id: 'core-annotations',
    title: 'HTTP Annotations and Parameter Mapping',
    paragraphs: [
      'Retrofit uses annotations such as `@GET`, `@POST`, `@PUT`, `@DELETE`, `@Path`, `@Query`, `@Header`, `@Body`, `@Field`, `@Part`, and others to describe how a method maps to an HTTP request. This is one of its strongest ideas because it keeps request semantics directly on the contract instead of scattering them through request-builder code.',
      'The key engineering principle is to keep annotation use clear rather than clever. If a method has become difficult to understand because too many headers, query rules, and multipart parts are packed into one signature, the API surface probably needs refactoring.',
    ],
  },
  {
    id: 'core-converters',
    title: 'Converter Factories and Serialization',
    paragraphs: [
      'Retrofit itself does not know how to turn JSON into Kotlin objects or request bodies into wire format. Converter factories provide that behavior. Common setups use Moshi, Gson, or kotlinx.serialization integrations depending on the project stack.',
      'Converter choice matters because it shapes null handling, default values, polymorphism support, custom adapters, and how strict or permissive serialization becomes. Retrofit is cleanest when serialization strategy is explicit and consistent across the app.',
    ],
  },
  {
    id: 'core-call-adapters',
    title: 'Call Adapters and Return Types',
    paragraphs: [
      'Retrofit supports multiple method return styles through call adapters. Historically this included `Call<T>` and additional adapters for RxJava or other reactive types. In modern Kotlin Android code, suspend functions are usually the dominant style because they integrate naturally with coroutines.',
      'The return type is an architectural decision. `Call<T>` exposes more manual control at the call site. Suspend functions are often simpler. Response wrappers such as `Response<T>` preserve metadata when needed. The right choice depends on how much of the HTTP response surface the repository must inspect.',
    ],
  },
  {
    id: 'core-coroutines',
    title: 'Coroutines, Cancellation, and Suspend Functions',
    paragraphs: [
      'Modern Retrofit integrates very naturally with Kotlin coroutines through suspend service methods. That makes endpoint calls read like ordinary asynchronous functions and works well with repository and ViewModel code.',
      'Cancellation still matters. If the calling coroutine scope is cancelled, the HTTP work should be allowed to stop promptly through the underlying stack. Good Android architecture therefore pairs Retrofit with lifecycle-aware coroutine scopes rather than detached long-lived work without ownership.',
    ],
  },
  {
    id: 'core-response-modeling',
    title: 'Response Modeling and DTO Strategy',
    paragraphs: [
      'A Retrofit response type should usually be a transport model, not necessarily the same shape the domain layer or UI consumes. DTOs are useful because APIs often have wire-focused structure, optional fields, or nested response envelopes that do not belong directly in business logic.',
      'Good architecture usually maps Retrofit DTOs into domain models, Room entities, or screen models in a repository or mapper layer. This keeps the wire contract from leaking everywhere.',
    ],
  },
  {
    id: 'core-error-handling',
    title: 'Errors, Exceptions, and HTTP Failure Handling',
    paragraphs: [
      "Retrofit does not decide the application's error policy for you. Network failures, non-2xx responses, parsing errors, auth expiry, and domain-level API failures still need a coherent handling strategy. The service interface only expresses the transport contract.",
      'A good pattern is to decide centrally whether repositories return domain results, throw exceptions upward, or wrap errors in a sealed result type. What matters most is consistency. The worst networking layers are the ones where every endpoint handles failures differently.',
    ],
  },
  {
    id: 'core-interceptors',
    title: 'Interceptors, Headers, Auth, and Cross-Cutting Concerns',
    paragraphs: [
      'Cross-cutting request behavior usually belongs in the OkHttp client rather than inside every Retrofit service method. Authentication headers, request IDs, logging, retry hints, and common header normalization are often best handled with interceptors.',
      'This keeps service interfaces focused on endpoint semantics instead of turning them into a place where every method has to repeat authorization and transport plumbing manually.',
    ],
  },
  {
    id: 'core-timeouts-retries',
    title: 'Timeouts, Retries, and Network Policy',
    paragraphs: [
      'Timeouts and retry policy are transport-level concerns that usually live in OkHttp configuration or in a higher application networking policy, not in Retrofit annotations themselves. Retrofit is the request contract layer, not the central policy engine for flaky network conditions.',
      'Teams should also separate transport retries from business retries. Automatically retrying a timed-out GET may be reasonable. Retrying a non-idempotent POST without careful design may not be.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing with MockWebServer and Fakes',
    paragraphs: [
      'Retrofit is very testable when the network layer is kept explicit. Service parsing behavior can be tested against MockWebServer, repositories can be tested with fake services, and higher layers can operate without knowing about HTTP details at all.',
      'The key is to avoid coupling Retrofit service implementations directly to UI or domain code. Once Retrofit sits behind clean boundaries, the app becomes much easier to verify.',
    ],
  },
  {
    id: 'core-repository-integration',
    title: 'Repository Integration and Android Architecture',
    paragraphs: [
      'Retrofit fits naturally under repositories. Services express transport contracts, repositories coordinate calls, map DTOs, write Room caches when needed, and expose domain-facing state to ViewModels. This separation is one of the main reasons Retrofit has stayed popular in Android architecture for so long.',
      'A common good pattern is network DTO -> mapper -> Room entity or domain model. That makes the boundaries between transport, storage, and UI explicit instead of letting response models leak everywhere.',
    ],
  },
  {
    id: 'core-compose-viewmodel',
    title: 'ViewModel and Compose Usage',
    paragraphs: [
      'Retrofit usually should not be called directly from Composables. The better shape is for ViewModels to call repositories, repositories to use Retrofit services, and the UI to observe resulting state. That keeps Compose focused on rendering and user interaction rather than network orchestration.',
      'The same architectural principle applies outside Compose as well. Retrofit belongs in the data layer, not in view code.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Serialization Cost',
    paragraphs: [
      'Retrofit itself usually is not the performance bottleneck. More often the heavy cost comes from network latency, large payloads, repeated calls, wasteful serialization, or poor caching strategy. That said, converter choice and response-model size still matter in mobile apps where startup and memory pressure can be real concerns.',
      'A good performance mindset is to shape APIs and DTOs for the actual screen or use case, avoid unnecessary payloads, and combine Retrofit with caching layers intelligently rather than expecting the library to fix architectural inefficiency.',
    ],
  },
  {
    id: 'core-comparisons',
    title: 'Retrofit Versus Raw OkHttp, Ktor, and Other Approaches',
    paragraphs: [
      'Retrofit should not be compared to OkHttp as if only one can be used. Retrofit usually uses OkHttp underneath. The real comparison is declarative typed endpoint interfaces versus lower-level manual request construction. Other clients such as Ktor may be attractive for different reasons, especially outside the traditional Android stack, but Retrofit remains strong when interface-driven HTTP contracts are the goal.',
      "The honest claim is narrower and stronger: Retrofit is one of the most effective ways to model an Android app's HTTP API layer when the project values stability, readability, and strong ecosystem fit.",
    ],
  },
  {
    id: 'core-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'One misconception is that Retrofit handles all networking concerns. It does not. Authentication refresh, retry policy, offline sync, caching strategy, and domain error interpretation still need architecture around it. Another misconception is that Retrofit eliminates the need for DTO mapping. In healthy codebases, transport models often should remain transport models.',
      'A third mistake is making every service method return a different shape or error convention. Retrofit works best when the networking layer is consistent and boring rather than clever and unpredictable.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-basic-service',
    title: 'Basic Service Interface',
    description: [
      'This is the essential Retrofit shape: a service interface with endpoint annotations and typed parameters.',
    ],
    code: `interface UserService {
  @GET("users/{id}")
  suspend fun getUser(
    @Path("id") id: Long
  ): UserDto

  @GET("users")
  suspend fun listUsers(
    @Query("page") page: Int
  ): List<UserDto>
}`,
    notes: [
      'The interface describes HTTP semantics directly.',
      'Suspend functions are the common modern Kotlin style.',
    ],
  },
  {
    id: 'examples-retrofit-builder',
    title: 'Retrofit Builder with OkHttp and Converter',
    description: [
      'A Retrofit instance usually combines a base URL, an OkHttp client, and at least one converter factory.',
    ],
    code: `val okHttp = OkHttpClient.Builder()
  .addInterceptor(AuthInterceptor(tokenProvider))
  .build()

val retrofit = Retrofit.Builder()
  .baseUrl("https://api.example.com/")
  .client(okHttp)
  .addConverterFactory(MoshiConverterFactory.create())
  .build()

val userService = retrofit.create(UserService::class.java)`,
    notes: [
      'Transport concerns stay in OkHttp configuration.',
      'Serialization concerns stay in the converter factory choice.',
    ],
  },
  {
    id: 'examples-response-wrapper',
    title: 'Using Response for Metadata',
    description: [
      'Sometimes the repository needs access to status codes or headers instead of only the deserialized body.',
    ],
    code: `interface AuthService {
  @POST("login")
  suspend fun login(
    @Body request: LoginRequest
  ): Response<LoginResponse>
}`,
    notes: [
      'Use `Response<T>` when the caller genuinely needs HTTP metadata.',
      'Do not wrap everything in `Response<T>` by default if the metadata is never used.',
    ],
  },
  {
    id: 'examples-multipart',
    title: 'Multipart Upload Endpoint',
    description: [
      'Retrofit supports multipart requests for uploads, but these should remain clear and specific rather than turning service methods into catch-all transport surfaces.',
    ],
    code: `interface UploadService {
  @Multipart
  @POST("avatars")
  suspend fun uploadAvatar(
    @Part image: MultipartBody.Part,
    @Part("userId") userId: RequestBody
  ): UploadResponse
}`,
    notes: [
      'Multipart support is powerful but can get messy quickly.',
      'Keep service method signatures readable and purpose-specific.',
    ],
  },
  {
    id: 'examples-repository',
    title: 'Repository with DTO Mapping',
    description: [
      'Retrofit works best when repositories map network models into the shapes the rest of the app actually wants.',
    ],
    code: `class UserRepository(
  private val service: UserService,
) {
  suspend fun getUser(id: Long): User {
    val dto = service.getUser(id)
    return dto.toDomain()
  }
}`,
    notes: [
      'DTO mapping prevents transport models from leaking into the rest of the app.',
      'Repositories are the right place to combine transport and application policy.',
    ],
  },
  {
    id: 'examples-error-handling',
    title: 'Consistent Error Mapping',
    description: [
      'A repository can centralize error handling so the rest of the app does not need to understand Retrofit or HTTP response shapes directly.',
    ],
    code: `suspend fun loadUser(id: Long): Result<User> =
  runCatching { service.getUser(id).toDomain() }
    .fold(
      onSuccess = { Result.success(it) },
      onFailure = { Result.failure(NetworkException(it)) },
    )`,
    notes: [
      'Consistency matters more than the specific wrapper type chosen.',
      'Repositories should translate transport failures into app-meaningful failures.',
    ],
  },
  {
    id: 'examples-testing',
    title: 'MockWebServer Test',
    description: [
      'MockWebServer is a practical way to verify serialization and endpoint behavior without talking to a real backend.',
    ],
    code: `val server = MockWebServer()
server.enqueue(
  MockResponse().setBody("""{"id":1,"name":"Ali"}""")
)

val retrofit = Retrofit.Builder()
  .baseUrl(server.url("/"))
  .addConverterFactory(MoshiConverterFactory.create())
  .build()

val service = retrofit.create(UserService::class.java)
val user = service.getUser(1)

assertThat(user.id).isEqualTo(1L)`,
    notes: [
      'MockWebServer tests the real wire contract more honestly than a pure fake.',
      'Repository tests and UI tests can still use simpler fakes above this layer.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Retrofit Terms',
    terms: [
      {
        term: 'Service interface',
        definition: 'An annotated interface whose methods describe HTTP endpoints.',
      },
      {
        term: 'Converter factory',
        definition: 'A plugin that converts between HTTP bodies and Kotlin or Java objects.',
      },
      {
        term: 'Call adapter',
        definition:
          'A factory that adapts Retrofit calls into return types such as `Call<T>` or other abstractions.',
      },
      {
        term: 'Base URL',
        definition: 'The root URL from which endpoint paths are resolved.',
      },
      {
        term: 'DTO',
        definition:
          'A data transfer object representing the API wire contract rather than necessarily the domain model.',
      },
      {
        term: 'Response<T>',
        definition: 'A Retrofit wrapper that exposes HTTP metadata together with the parsed body.',
      },
      {
        term: 'Multipart',
        definition: 'A request format commonly used for uploads with several body parts.',
      },
      {
        term: 'Suspend service method',
        definition: 'A Retrofit endpoint declaration designed for Kotlin coroutines.',
      },
    ],
  },
  {
    id: 'glossary-http',
    title: 'HTTP and Transport Terms',
    terms: [
      {
        term: 'Interceptor',
        definition: 'An OkHttp hook that can inspect or modify requests and responses.',
      },
      {
        term: 'Timeout',
        definition: 'A limit on how long transport operations may wait before failing.',
      },
      {
        term: 'Header',
        definition: 'Metadata sent with an HTTP request or response.',
      },
      {
        term: 'Query parameter',
        definition: 'A key-value parameter appended to the URL after the question mark.',
      },
      {
        term: 'Path parameter',
        definition: 'A variable value substituted directly into a URL path segment.',
      },
      {
        term: 'Request body',
        definition: 'The payload sent with an HTTP request, often JSON or multipart content.',
      },
      {
        term: '2xx response',
        definition: 'A successful HTTP status code in the 200 range.',
      },
      {
        term: 'Transport error',
        definition:
          'A failure in making or receiving the HTTP call itself rather than an application-level validation failure.',
      },
    ],
  },
  {
    id: 'glossary-android',
    title: 'Android Architecture Terms',
    terms: [
      {
        term: 'Repository',
        definition:
          'An app-layer abstraction that coordinates network, storage, and mapping logic.',
      },
      {
        term: 'ViewModel',
        definition:
          'A lifecycle-aware Android component that exposes screen state and survives configuration changes.',
      },
      {
        term: 'Room',
        definition:
          "Android Jetpack's SQLite abstraction often paired with Retrofit for cached or offline-first data flows.",
      },
      {
        term: 'MockWebServer',
        definition:
          'A testing utility commonly used to verify Retrofit and OkHttp behavior against controlled HTTP responses.',
      },
      {
        term: 'Source of truth',
        definition:
          'The canonical place the app trusts for the current state of data, often a local database in offline-first designs.',
      },
      {
        term: 'Mapper',
        definition: 'Code that converts DTOs into domain models, entities, or UI-facing objects.',
      },
      {
        term: 'Offline-first',
        definition:
          'An architecture where local persistence remains usable even when network connectivity is unavailable.',
      },
      {
        term: 'Lifecycle scope',
        definition:
          'A coroutine scope tied to Android lifecycle ownership so work can be cancelled appropriately.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-retrofit-exists', label: 'Why Retrofit Exists' },
    { id: 'bp-when-retrofit-fits', label: 'When Retrofit Fits' },
    { id: 'bp-when-retrofit-does-not-fit', label: 'When Retrofit Does Not Fit' },
    { id: 'bp-building-blocks', label: 'Main Building Blocks' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-retrofit-is', label: 'What Retrofit Is' },
    { id: 'core-retrofit-vs-okhttp', label: 'Retrofit and OkHttp' },
    { id: 'core-service-interfaces', label: 'Service Interfaces' },
    { id: 'core-annotations', label: 'Annotations and Parameters' },
    { id: 'core-converters', label: 'Converter Factories' },
    { id: 'core-call-adapters', label: 'Call Adapters' },
    { id: 'core-coroutines', label: 'Coroutines and Cancellation' },
    { id: 'core-response-modeling', label: 'Response Modeling' },
    { id: 'core-error-handling', label: 'Errors and Failures' },
    { id: 'core-interceptors', label: 'Interceptors and Headers' },
    { id: 'core-timeouts-retries', label: 'Timeouts and Retries' },
    { id: 'core-testing', label: 'Testing' },
    { id: 'core-repository-integration', label: 'Repository Integration' },
    { id: 'core-compose-viewmodel', label: 'ViewModel and Compose' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-comparisons', label: 'Comparisons' },
    { id: 'core-misconceptions', label: 'Misconceptions' },
  ],
  examples: [
    { id: 'examples-basic-service', label: 'Basic Service' },
    { id: 'examples-retrofit-builder', label: 'Retrofit Builder' },
    { id: 'examples-response-wrapper', label: 'Response Wrapper' },
    { id: 'examples-multipart', label: 'Multipart Upload' },
    { id: 'examples-repository', label: 'Repository Mapping' },
    { id: 'examples-error-handling', label: 'Error Mapping' },
    { id: 'examples-testing', label: 'MockWebServer Test' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Retrofit Terms' },
    { id: 'glossary-http', label: 'HTTP Terms' },
    { id: 'glossary-android', label: 'Android Architecture Terms' },
  ],
}

const pageStyles = `
.retrofit-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.retrofit-help-window {
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

.retrofit-help-titlebar {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.retrofit-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.retrofit-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.retrofit-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.retrofit-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.retrofit-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.retrofit-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.retrofit-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.retrofit-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.retrofit-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.retrofit-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.retrofit-help-toc-item {
  margin: 0 0 8px;
}

.retrofit-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.retrofit-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.retrofit-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.retrofit-help-section {
  margin: 0 0 20px;
}

.retrofit-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.retrofit-help-content p,
.retrofit-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.retrofit-help-content p {
  margin: 0 0 10px;
}

.retrofit-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.retrofit-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.retrofit-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.retrofit-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .retrofit-help-main {
    grid-template-columns: 1fr;
  }

  .retrofit-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .retrofit-help-window {
    min-height: auto;
  }

  .retrofit-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .retrofit-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .retrofit-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="retrofit-help-section">
      <h2 className="retrofit-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="retrofit-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="retrofit-help-section">
      <h2 className="retrofit-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="retrofit-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="retrofit-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="retrofit-help-section">
      <h2 className="retrofit-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="retrofit-help-divider" />}
    </section>
  )
}

export default function RetrofitPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Retrofit (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Retrofit',
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
    <div className="retrofit-help-page">
      <style>{pageStyles}</style>
      <div className="retrofit-help-window" role="presentation">
        <header className="retrofit-help-titlebar">
          <span className="retrofit-help-titletext">Retrofit</span>
          <div className="retrofit-help-controls">
            <button
              className="retrofit-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="retrofit-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="retrofit-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`retrofit-help-tab ${activeTab === tab.id ? 'retrofit-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="retrofit-help-main">
          <aside className="retrofit-help-toc" aria-label="Table of contents">
            <h2 className="retrofit-help-toc-title">Contents</h2>
            <ul className="retrofit-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="retrofit-help-toc-item">
                  <a href={`#${section.id}`} className="retrofit-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="retrofit-help-content">
            <h1 className="retrofit-help-doc-title">Retrofit</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

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
