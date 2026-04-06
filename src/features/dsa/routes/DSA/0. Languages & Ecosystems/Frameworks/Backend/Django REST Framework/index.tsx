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
  'Django REST Framework is a powerful toolkit for building web APIs on top of Django. It is widely used for REST-style backend services, internal APIs, admin-facing backends, mobile and web application APIs, and systems where teams want the broader Django platform plus a mature API layer with serializers, views, authentication, permissions, and browsable endpoints.',
  'The most useful way to think about Django REST Framework is as an API framework deeply integrated with Django rather than a separate standalone server toolkit. It adds serializers, API views, generic views, viewsets, routers, authentication, permissions, parsers, renderers, and schema-friendly conventions on top of Djangos request lifecycle and ORM ecosystem.',
  'This page is intentionally thorough. It covers the DRF programming model, serializers, views, viewsets, routers, authentication, permissions, filtering, pagination, validation, testing, deployment, performance, and the tradeoffs that matter when using Django REST Framework in production.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Django REST Framework, commonly called DRF, is a toolkit for building APIs with Django. It extends Django with serializer abstractions, request and response helpers, class-based API views, generic CRUD scaffolding, authentication and permission systems, and router-based endpoint composition.',
      'Its main appeal is that it gives teams an API-specific layer without leaving the broader Django ecosystem. That means Django models, authentication systems, admin tooling, middleware, settings, and operational patterns can all remain part of the same application platform.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why DRF Matters',
    paragraphs: [
      'DRF matters because many Python teams need APIs without abandoning the Django platform. It provides a structured way to expose models and services over HTTP while preserving Django conventions around apps, auth, ORM usage, settings, and deployment.',
      'It is also important because it reduces repetitive API boilerplate. Serialization, validation, permissions, pagination, filtering, and generic CRUD flows are all common backend needs, and DRF offers mature abstractions for them.',
    ],
    bullets: [
      'Brings API-focused abstractions into the Django ecosystem.',
      'Provides mature serializer and view abstractions.',
      'Supports auth, permissions, pagination, filtering, and browsable APIs.',
      'Reduces repetitive CRUD and validation boilerplate for many services.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is Djangos web platform plus an API layer built around serializers and class-based views. A DRF endpoint usually takes request data, validates it through a serializer, applies permission and authentication checks, performs domain or model work, and returns a Response object with negotiated rendering.',
      'That means DRF is not just about turning Django models into JSON. It is about structured API design on top of Django conventions. The serializer, view, queryset, permission, and router layers all shape how a request becomes an API response.',
    ],
    bullets: [
      'Think Django request lifecycle plus API-specific abstractions.',
      'Think serializers and views as core framework ideas.',
      'Think structured API conventions rather than raw HTTP plumbing.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When DRF Fits Best',
    paragraphs: [
      'DRF fits best when a team is already using Django or wants Djangos platform strengths together with a mature API layer. It is a strong fit for CRUD-heavy APIs, business applications, admin-backed products, mobile and SPA backends, internal systems, and applications where auth, ORM integration, and platform consistency matter.',
      'It is especially useful when the project benefits from Django itself, because the combined platform story is one of DRFs biggest strengths.',
    ],
    bullets: [
      'Teams already invested in Django and its ecosystem.',
      'APIs that benefit from structured serializers and generic views.',
      'Applications needing auth, permissions, ORM integration, and admin-friendly workflows.',
      'Business backends where convention and maturity are advantages.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where DRF Is Not the Best Default',
    paragraphs: [
      'DRF is not the best default when the team does not want the Django platform at all, when the application wants a much lighter microframework, or when the service architecture depends on patterns that fit poorly with Djangos synchronous and monolithic roots.',
      'It can also be a weak fit when teams use the generic abstractions mechanically and end up with APIs shaped around database tables rather than domain boundaries and product needs.',
    ],
    bullets: [
      'Projects that do not want the broader Django stack.',
      'Teams wanting a smaller or more explicitly decoupled API framework.',
      'Systems where table-driven CRUD abstractions would distort domain design.',
      'Use cases where Djangos platform overhead is not justified.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'DRF is strongest when Django is already a good platform fit and the application benefits from a mature, structured API toolkit. It can accelerate development substantially when serializers, viewsets, routers, permissions, and pagination are used deliberately.',
      'The best DRF systems do not mistake convenience for architecture. They use the framework to reduce boilerplate while still designing domain boundaries, validation rules, authorization logic, and API contracts carefully.',
    ],
    bullets: [
      'Choose DRF when Django plus a mature API layer is the right platform combination.',
      'Treat serializers, permissions, and view abstractions as architectural tools.',
      'Use convenience features to support clarity rather than table-shaped API drift.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What DRF Actually Is',
    paragraphs: [
      'Django REST Framework is an API toolkit layered onto Django. It provides serializers for transforming and validating data, API views and generic views for request handling, viewsets and routers for CRUD-style endpoint composition, and built-in support for authentication, permissions, pagination, throttling, parsers, renderers, and testing.',
      'Its identity is a structured API layer within the Django platform. DRF is not a separate universe from Django. It works best when its abstractions are understood as extensions of Djangos request lifecycle, ORM ecosystem, auth system, and application organization.',
    ],
  },
  {
    id: 'core-app-structure',
    title: 'Application Object and Project Structure',
    paragraphs: [
      'A DRF project usually follows normal Django structure with apps, settings, models, URLs, and reusable modules. Inside that structure, API-specific concerns often live in serializers, views, permissions, filters, and sometimes dedicated service or selector layers depending on the teams architecture.',
      'The framework does not force one internal architecture beyond the Django baseline. Good DRF systems keep API transport concerns in serializers and views while domain logic, business rules, and complex data workflows are extracted into clearer application-level modules.',
    ],
  },
  {
    id: 'core-serializers',
    title: 'Serializers and Data Transformation',
    paragraphs: [
      'Serializers are one of the defining DRF abstractions. They convert complex Python objects, often Django model instances, into primitive response data and validate incoming data before creation or update logic runs.',
      'The serializer is not only a formatting helper. It is often the API boundary for input validation and representation design. Used carefully, serializers make contracts clear; used carelessly, they can accumulate business logic and become bloated.',
    ],
  },
  {
    id: 'core-views',
    title: 'APIView, Generic Views, and Mixins',
    paragraphs: [
      'DRF supports multiple layers of view abstraction. APIView offers explicit control over request methods, while generic views and mixins provide reusable CRUD-oriented behavior such as list, create, retrieve, update, and destroy.',
      'These abstractions help remove boilerplate, but they should be chosen deliberately. Generic views are productive when the resource model fits them. When the workflow is more domain-specific, explicit views may be clearer than forcing everything into CRUD scaffolding.',
    ],
  },
  {
    id: 'core-viewsets',
    title: 'ViewSets and Routers',
    paragraphs: [
      'ViewSets let teams group related actions for a resource into one class, and routers can automatically generate URL patterns for those actions. This is one of the fastest ways to expose standard CRUD endpoints in DRF.',
      'The tradeoff is that ViewSets can make endpoint behavior feel farther from the URL configuration if used indiscriminately. They work best when the resource shape is genuinely cohesive and the team understands the generated routing model.',
    ],
  },
  {
    id: 'core-request-response',
    title: 'Request, Response, Parsers, and Renderers',
    paragraphs: [
      'DRF wraps Djangos request and response handling with API-friendly abstractions. Requests can expose parsed data through request.data, and responses are returned with DRFs Response class so renderers can determine the final representation.',
      'Parsers and renderers matter because they define how the API accepts and emits formats. JSON is the common default, but the framework supports broader negotiation patterns when needed.',
    ],
  },
  {
    id: 'core-auth',
    title: 'Authentication and Permission System',
    paragraphs: [
      'DRF provides authentication classes and permission classes as first-class API concepts. Authentication determines who the user is, while permissions determine whether that user can access a view or object.',
      'This distinction is important. Many security bugs come from mixing identity with authorization logic. DRF gives clear extension points, but teams still need disciplined security design and object-level authorization where appropriate.',
    ],
  },
  {
    id: 'core-querysets',
    title: 'QuerySets, Filtering, and Pagination',
    paragraphs: [
      'Many DRF views work from a queryset that defines the base data access scope for the endpoint. Filtering, searching, ordering, and pagination can then shape how data is exposed to clients.',
      'This is productive, but careless queryset design can be expensive or insecure. Queryset defaults, prefetch behavior, select_related use, and object filtering all matter to correctness and performance.',
    ],
  },
  {
    id: 'core-validation',
    title: 'Validation and Save Flow',
    paragraphs: [
      'Validation in DRF often happens through serializer fields, field-level validation methods, object-level validate methods, and create or update implementations. This makes serializers a central place for API input rules.',
      'The engineering challenge is deciding what belongs in serializer validation versus what belongs in deeper domain services. DRF gives convenient hooks, but not every business rule should live in a serializer just because it can.',
    ],
  },
  {
    id: 'core-errors',
    title: 'Exception Handling and Error Responses',
    paragraphs: [
      'DRF provides a structured exception handling model for validation errors, authentication failures, permission denials, and other API exceptions. The default responses are useful, but teams often add custom exception handling for consistency and product requirements.',
      'Error design matters because APIs are contracts. Clients should receive predictable error shapes, status codes, and messages rather than a mix of framework defaults and ad hoc failures.',
    ],
  },
  {
    id: 'core-database',
    title: 'Database Integration and Persistence',
    paragraphs: [
      'DRF commonly works directly with Djangos ORM through models and querysets. That can make CRUD-heavy APIs very productive, especially when serializers map cleanly onto models.',
      'The risk is overcoupling the external API too tightly to the database structure. Mature systems often introduce service or selector layers, transaction boundaries, and more explicit domain logic once the application outgrows direct model-shaped endpoints.',
    ],
  },
  {
    id: 'core-versioning',
    title: 'Versioning, Schema, and API Evolution',
    paragraphs: [
      'As APIs evolve, DRF projects often need explicit versioning strategies, schema documentation, deprecation plans, and compatibility discipline. DRF can participate in these concerns, but it does not solve them automatically.',
      'The important point is that serializer changes, route changes, and permission changes can all become client-breaking behavior. Framework convenience does not remove the need for careful API lifecycle management.',
    ],
  },
  {
    id: 'core-settings',
    title: 'Settings, Middleware, and Django Integration',
    paragraphs: [
      'DRF lives inside the broader Django runtime, so settings, installed apps, middleware, authentication backends, caching, and deployment settings all influence API behavior. This integration is one of the frameworks strengths, but it also means the API is affected by wider project choices.',
      'Teams should understand where behavior comes from. Some concerns belong to DRF settings, some to Django middleware, some to per-view classes, and some to project-level architecture.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'DRF supports API-level tests through Django and DRF test tools such as APIClient and APITestCase. These tests can verify authentication, permissions, serializers, pagination behavior, status codes, and response payloads while staying close to the actual HTTP contract.',
      'As with other frameworks, test quality improves when views, serializers, and domain logic have clean boundaries. Otherwise tests become overly broad and brittle.',
    ],
  },
  {
    id: 'core-deployment',
    title: 'Deployment and Runtime Model',
    paragraphs: [
      'DRF applications are deployed as Django applications, typically behind WSGI or ASGI servers with reverse proxies, containers, or orchestration platforms. Runtime behavior depends on Django settings, database configuration, caching, process model, and surrounding infrastructure.',
      'The important deployment point is that DRF inherits both the strengths and the operational concerns of Django. Observability, caching, static settings discipline, migrations, worker behavior, and database performance all remain central.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'DRF performance depends heavily on queryset design, serializer cost, N+1 query problems, permission checks, pagination patterns, caching strategy, and payload size. The framework can support solid performance, but its abstractions do not remove database and serialization fundamentals.',
      'The right mindset is empirical. Profile slow endpoints, inspect query counts, use select_related and prefetch_related deliberately, and solve the actual bottleneck rather than assuming generic views are either inherently good or inherently bad.',
    ],
    bullets: [
      'Watch query counts and ORM access patterns carefully.',
      'Treat serializer work as a real part of endpoint cost.',
      'Use caching and pagination deliberately for expensive endpoints.',
      'Do not let convenience abstractions hide data-access problems.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'DRF is widely used for CRUD-heavy APIs, internal business systems, authenticated product backends, mobile app APIs, admin-backed operational tools, and Django applications that need a serious API surface without leaving the platform.',
      'It is especially common where the team values Django conventions, ORM integration, mature auth patterns, and a well-understood Python platform story.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use DRF',
    paragraphs: [
      'DRF is a weaker fit when Django itself is the wrong platform choice, when the application needs a much smaller microframework, or when the architecture strongly favors patterns that do not align well with Djangos integrated style.',
      'It is also a weak fit when teams keep exposing model-shaped CRUD endpoints without enough domain design, because DRF can make that anti-pattern very convenient.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common DRF mistakes include putting too much business logic into serializers, relying blindly on ModelViewSet for everything, exposing database structure directly as public API design, missing queryset optimization, and assuming permission classes alone equal complete authorization strategy.',
      'Another recurring issue is letting the convenience of generic views hide poor architectural boundaries. DRF is productive, but without discipline it can make accidental architecture feel efficient for longer than it should.',
    ],
    bullets: [
      'Do not put every business rule into serializers by default.',
      'Do not let CRUD scaffolding dictate your API design.',
      'Do not ignore queryset performance until production traffic forces the issue.',
      'Do not confuse authentication, permissions, and full authorization design.',
    ],
  },
  {
    id: 'core-compare',
    title: 'DRF Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with Flask or FastAPI, DRF is more tightly integrated with a broader web platform. Compared with lighter API frameworks, it offers more batteries included around auth, ORM integration, admin-adjacent workflows, and mature Django conventions. Compared with broader platforms such as Spring Boot or Laravel, it occupies a similar area in that it is most powerful when the full ecosystem around it is part of the value.',
      'The right comparison is whether the team wants an API toolkit inside a mature application platform or a smaller, more decoupled framework with fewer integrated assumptions.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose DRF when Django is the right platform, the project benefits from structured serializers and class-based API tooling, and the team wants a mature integrated path for authentication, permissions, ORM-backed resources, and API development. Choose something else when the broader Django platform is not a good fit or when you need a smaller and more decoupled framework.',
      'The best DRF decisions happen when the team understands both the leverage and the risks of its abstractions and uses them to support domain design rather than replace it.',
    ],
    bullets: [
      'Need Django plus a mature API toolkit: strong DRF signal.',
      'Need auth, permissions, serializers, and ORM integration in one platform: strong DRF signal.',
      'Need a smaller microframework with fewer integrated assumptions: weaker DRF signal.',
      'Need rapid CRUD-heavy API development inside a Django codebase: strong DRF signal.',
    ],
  },
]
const exampleSections: ExampleSection[] = [
  {
    id: 'examples-serializer',
    title: 'Serializer for Validation and Representation',
    description: [
      'Serializers define how incoming data is validated and how model instances are exposed to clients. This is one of the core DRF patterns.',
      'A serializer often acts as the API boundary for a resource.',
    ],
    code: `from rest_framework import serializers

class BookSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=200)
    author = serializers.CharField(max_length=120)
    published_year = serializers.IntegerField()`,
    notes: [
      'Serializers shape both validation and representation behavior.',
      'Field design becomes part of the public API contract.',
    ],
  },
  {
    id: 'examples-apiview',
    title: 'APIView for Explicit Request Handling',
    description: [
      'APIView gives explicit control over HTTP methods while still using DRF request parsing, authentication, permissions, and response handling.',
      'It is a good fit when the endpoint behavior is more specific than generic CRUD scaffolding.',
    ],
    code: `from rest_framework.response import Response
from rest_framework.views import APIView

class HealthcheckView(APIView):
    def get(self, request):
        return Response({"status": "ok"})`,
    notes: [
      'APIView trades more code for more explicit control.',
      'Use it when the endpoint does not fit simple generic patterns cleanly.',
    ],
  },
  {
    id: 'examples-model-viewset',
    title: 'ModelViewSet with Router Registration',
    description: [
      'ModelViewSet combines standard CRUD actions for a model-backed resource. Routers can then generate the corresponding URL patterns automatically.',
      'This is a common DRF productivity pattern for standard resource APIs.',
    ],
    code: `from rest_framework import routers, viewsets

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

router = routers.DefaultRouter()
router.register(r"books", BookViewSet)`,
    notes: [
      'Very productive for standard resource patterns.',
      'Do not let CRUD convenience become the only API design tool you use.',
    ],
  },
  {
    id: 'examples-permissions',
    title: 'Permission Class on a ViewSet',
    description: [
      'Permissions are declared as explicit classes so access control becomes part of the view configuration rather than ad hoc logic in every method body.',
      'This keeps authorization behavior visible and reusable.',
    ],
    code: `from rest_framework.permissions import IsAuthenticated

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]`,
    notes: [
      'Authentication answers who the user is; permissions answer whether access is allowed.',
      'Object-level authorization may still need extra logic beyond a class declaration.',
    ],
  },
  {
    id: 'examples-filtering',
    title: 'Filtering and Pagination in a List API',
    description: [
      'List APIs often combine filtering and pagination to keep responses usable and efficient. DRF supports this through filter backends and pagination classes.',
      'These features should be treated as part of endpoint design rather than as optional UI polish.',
    ],
    code: `from rest_framework import filters
from rest_framework.pagination import PageNumberPagination

class StandardPagination(PageNumberPagination):
    page_size = 20

class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "author"]
    ordering_fields = ["title", "published_year"]
    pagination_class = StandardPagination`,
    notes: [
      'Pagination and filtering decisions affect both performance and client ergonomics.',
      'Queryset optimization still matters underneath the convenience layer.',
    ],
  },
  {
    id: 'examples-api-client',
    title: 'Testing with APIClient',
    description: [
      'DRF test tools make it straightforward to exercise endpoints and verify status codes and payloads close to the real API surface.',
      'This helps validate permissions, serializers, and endpoint behavior together.',
    ],
    code: `from rest_framework import status
from rest_framework.test import APIClient

def test_healthcheck_endpoint():
    client = APIClient()
    response = client.get("/api/health/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"status": "ok"}`,
    notes: [
      'API tests are useful for real contract verification.',
      'Keep view logic and serializer logic structured so tests can stay focused.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core DRF Terms',
    terms: [
      {
        term: 'Serializer',
        definition:
          'The DRF abstraction used to validate incoming data and transform Python objects into API-friendly representations.',
      },
      {
        term: 'APIView',
        definition:
          'A class-based DRF view that gives explicit control over HTTP methods with API-aware request and response handling.',
      },
      {
        term: 'ViewSet',
        definition:
          'A DRF class that groups related actions for a resource and often works with routers to expose endpoints.',
      },
      {
        term: 'Response',
        definition:
          'The DRF response wrapper that works with renderers and content negotiation to produce API output.',
      },
      {
        term: 'Router',
        definition:
          'A DRF URL generator that maps viewsets to URL patterns automatically.',
      },
    ],
  },
  {
    id: 'glossary-request',
    title: 'Request Lifecycle Terms',
    terms: [
      {
        term: 'Authentication Class',
        definition:
          'A DRF component that determines how the incoming request identifies the user.',
      },
      {
        term: 'Permission Class',
        definition:
          'A DRF component that decides whether the current request should be allowed to access a view or object.',
      },
      {
        term: 'Parser',
        definition:
          'A DRF class that determines how incoming request bodies are parsed into request.data.',
      },
      {
        term: 'Renderer',
        definition:
          'A DRF class that determines how outgoing Response data is rendered for clients.',
      },
      {
        term: 'Pagination',
        definition:
          'The mechanism used to split large collections into manageable pages with metadata and navigation links.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Testing Terms',
    terms: [
      {
        term: 'ModelSerializer',
        definition:
          'A DRF serializer that can automatically derive fields and behavior from a Django model.',
      },
      {
        term: 'QuerySet',
        definition:
          'A lazy Django ORM object representing a database query, often used as the base data source for DRF views.',
      },
      {
        term: 'DefaultRouter',
        definition:
          'A DRF router that automatically registers common routes and can include an API root view.',
      },
      {
        term: 'APIClient',
        definition:
          'A DRF testing helper used to make request-like calls against endpoints during automated tests.',
      },
      {
        term: 'Browsable API',
        definition:
          'The HTML interface DRF can expose for interacting with API endpoints during development and debugging.',
      },
    ],
  },
]

const pageStyles = `
.postgres-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.postgres-help-window {
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

.postgres-help-titlebar {
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

.postgres-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.postgres-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.postgres-help-control {
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

.postgres-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.postgres-help-tab {
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

.postgres-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.postgres-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.postgres-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.postgres-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.postgres-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.postgres-help-toc-item {
  margin: 0 0 8px;
}

.postgres-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.postgres-help-toc-link:hover,
.postgres-help-toc-link:focus-visible {
  text-decoration: underline;
}

.postgres-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.postgres-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.postgres-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.postgres-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.postgres-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.postgres-help-content p,
.postgres-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.postgres-help-content p {
  margin: 0 0 10px;
}

.postgres-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.postgres-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.postgres-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.postgres-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .postgres-help-main {
    grid-template-columns: 1fr;
  }

  .postgres-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .postgres-help-window {
    min-height: auto;
  }

  .postgres-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .postgres-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .postgres-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }
}
`

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

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
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="postgres-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

export default function DjangoRestFrameworkPage(): JSX.Element {
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
    document.title = `Django REST Framework (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Django REST Framework',
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
    <div className="postgres-help-page">
      <style>{pageStyles}</style>
      <div className="postgres-help-window" role="presentation">
        <header className="postgres-help-titlebar">
          <span className="postgres-help-titletext">Django REST Framework</span>
          <div className="postgres-help-controls">
            <button className="postgres-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="postgres-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="postgres-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`postgres-help-tab ${activeTab === tab.id ? 'postgres-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="postgres-help-main">
          <aside className="postgres-help-toc" aria-label="Table of contents">
            <h2 className="postgres-help-toc-title">Contents</h2>
            <ul className="postgres-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="postgres-help-toc-item">
                  <a href={`#${section.id}`} className="postgres-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="postgres-help-content">
            <h1 className="postgres-help-doc-title">Django REST Framework</h1>
            <p className="postgres-help-doc-subtitle">
              Django API framework reference covering serializers, views,
              permissions, querysets, pagination, deployment, and tradeoffs.
            </p>

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
