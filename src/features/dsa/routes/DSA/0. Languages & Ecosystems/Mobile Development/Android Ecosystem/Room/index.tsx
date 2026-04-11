import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  "Room is Android Jetpack's persistence layer on top of SQLite. It is not a different database engine and it does not replace SQLite on the device. What it adds is structure: annotated entities, DAO interfaces, compile-time SQL validation, generated implementations, migrations, observable queries, and much better integration with modern Android app architecture than hand-written cursor code.",
  'The useful comparison is not "SQLite or Room" as if those were competing storage engines. Room uses SQLite. The real tradeoff is direct low-level SQLite access versus a schema-aware abstraction that preserves SQL while giving the team stronger compile-time safety and a clearer persistence architecture.',
  'This page is intentionally comprehensive. It covers what Room is, when it fits, entities, DAOs, database builders, async query rules, Flow and observable reads, relationships, transactions, type converters, migrations, schema export, testing, performance, integration with Repository or ViewModel or Compose, and the most common failure modes in production Android apps.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Room is the standard relational persistence layer for many Android applications that need durable on-device data. It models tables as annotated classes, maps SQL queries through DAO methods, and generates the low-level implementation code. That gives teams a much better development experience than raw SQLite APIs without hiding the fact that the data is still relational.',
      'Room is especially valuable when the app needs local caches, offline-first behavior, searchable collections, durable structured state, or a local source of truth under repositories and UI. It is less useful when the app only needs a few key-value preferences or when a different storage model is a better fit.',
      'The crucial idea is that Room improves persistence discipline. It does not remove the need to think about schema design, SQL shape, indexes, and migrations. It just makes those concerns easier to express and safer to evolve.',
    ],
  },
  {
    id: 'bp-why-room-exists',
    title: 'Why Room Exists',
    paragraphs: [
      'Manual SQLite access on Android is powerful but expensive to maintain. Teams have to write SQL strings by hand, map cursors manually, handle schema changes carefully, keep work off the main thread, and remember a lot of low-level API details. Those costs accumulate quickly as the app grows.',
      'Room exists to reduce exactly that maintenance burden. It lets SQL stay visible, which is good, while moving the repetitive and error-prone parts of persistence behind generated code and compile-time validation.',
    ],
    bullets: [
      'Compile-time validation of many DAO queries.',
      'Generated implementations instead of hand-written cursor plumbing.',
      'A visible schema model through entities and the database definition.',
      'Built-in support for transactions, migrations, and observable reads.',
    ],
  },
  {
    id: 'bp-when-room-fits',
    title: 'When Room Fits Best',
    paragraphs: [
      'Room is a strong fit when the app has genuine relational data: lists, filters, joins, search, caching, sorted collections, or durable business records that must survive app restarts and offline periods. It fits naturally with repository-driven Android architecture because it can expose local data as reactive streams while keeping SQL explicit.',
      'It is also a good fit when the team wants SQL to remain first-class instead of moving to a persistence layer that hides relational concepts behind a more magical API.',
    ],
    bullets: [
      'Offline-first or cache-first application flows.',
      'Structured local datasets with sorting, filtering, or joins.',
      'Apps that want Flow-backed local source-of-truth architecture.',
      'Teams that want SQL visibility plus compile-time safeguards.',
    ],
  },
  {
    id: 'bp-when-room-does-not-fit',
    title: 'When Room Does Not Fit',
    paragraphs: [
      'Room is usually the wrong tool for simple settings, flags, or lightweight key-value preferences. DataStore is usually the more honest choice there. It can also be overkill for data that is purely ephemeral, purely in-memory, or not relational in any meaningful sense.',
      'Another anti-pattern is using Room as a dumping ground for every piece of app state. Not all state belongs in a database, and trying to persist everything usually creates unnecessary complexity.',
    ],
    bullets: [
      'Simple user preferences and feature flags.',
      'Transient UI-only state.',
      'Data that has no relational query needs.',
      'Projects where another persistence strategy is already the deliberate choice.',
    ],
  },
  {
    id: 'bp-building-blocks',
    title: 'The Main Building Blocks',
    paragraphs: [
      'Room applications are built from entities, DAOs, and the database class. Entities model tables. DAOs express queries and writes. The database class defines the full schema and exposes DAO entry points.',
      'Around those core parts are supporting mechanisms that matter in real apps: type converters, transactions, migrations, schema export, testing helpers, observable query return types, and integration with repositories and UI state.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Room reduces a lot of persistence pain, but it does not make database design optional. Teams still need to think about primary keys, indexes, query shape, migration paths, transaction boundaries, and data ownership rules. Bad schema decisions are still bad schema decisions even if the code is generated cleanly.',
      'In practice, Room is valuable because it makes the persistence layer less fragile and much easier to review, test, and evolve.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The best decision rule is simple: if the app has real local relational data and the team benefits from compile-time persistence checks, Room is often the default answer. If the app only needs preferences or lightweight key-value state, it usually is not.',
      'A second good question is whether the app architecture already wants a durable local source of truth beneath repositories and UI. If yes, Room usually fits very naturally.',
    ],
    bullets: [
      'Choose Room for genuine relational persistence on Android.',
      'Do not choose Room for simple preferences.',
      'Treat Room as structured SQLite, not as an excuse to ignore SQL.',
      'Take migrations and schema history seriously from the beginning.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-room-is',
    title: 'What Room Actually Is',
    paragraphs: [
      'Room is a Jetpack library that wraps SQLite with annotations and code generation. Developers define schema and data-access contracts, and Room generates the implementation. It still expects developers to write SQL for many operations, which is a strength because query logic remains explicit and reviewable.',
      'This means Room is not a fully abstract ORM that tries to hide the database. It is a structured persistence layer that respects the underlying relational model.',
    ],
  },
  {
    id: 'core-room-vs-sqlite',
    title: 'How Room Relates to SQLite',
    paragraphs: [
      'SQLite is the storage engine. Room is the app-facing abstraction layer above it. If SQLite is the engine room of the ship, Room is the control surface the app uses to interact with that engine more safely.',
      'Because SQLite is still underneath, all the usual relational concerns remain real: indexes, query plans, joins, transactions, constraints, and schema design. Room improves safety and maintainability, not the fundamental laws of relational storage.',
    ],
  },
  {
    id: 'core-entities',
    title: 'Entities and Schema Modeling',
    paragraphs: [
      'Entities define tables and columns. This is where primary keys, table names, foreign keys, indices, and nullability usually become explicit. A good entity design reflects storage truth, not just whatever a UI model happened to look like first.',
      'A common mistake is letting persistence models collapse into view models or network DTOs. Room works best when entities are designed as persistence models with clear ownership and lifecycle.',
    ],
    bullets: [
      'Use clear primary keys.',
      'Add indices for real lookup patterns.',
      'Treat nullability and defaults deliberately.',
      'Separate persistence models from UI models when their responsibilities differ.',
    ],
  },
  {
    id: 'core-dao',
    title: 'DAO Model',
    paragraphs: [
      "A DAO is the main access boundary to the database. It declares reads, inserts, updates, deletes, upserts, and transactional operations. Room then generates the implementation. This is one of the library's biggest wins because it eliminates most manual statement and cursor plumbing.",
      'DAOs should be cohesive. A well-designed DAO represents a coherent slice of persistence behavior, not a dumping ground for every query in the app.',
    ],
  },
  {
    id: 'core-database-class',
    title: 'Database Class and Builder',
    paragraphs: [
      'The `@Database` class is the schema root. It names the entities, declares the schema version, and exposes DAO methods. Database creation is typically done with `Room.databaseBuilder` in production and `Room.inMemoryDatabaseBuilder` in tests.',
      'The builder is also where policy lives: migration registration, destructive fallback behavior, callbacks, prepackaged database usage, and related configuration. That makes the builder part of the persistence contract, not just setup boilerplate.',
    ],
  },
  {
    id: 'core-query-validation',
    title: 'Compile-Time Query Validation',
    paragraphs: [
      'Room validates many DAO queries at compile time against the known schema. If a table name is wrong, a column is missing, or a result shape does not align with the declared return type, developers often find out before the app runs.',
      'This is one of the strongest reasons to use Room. It moves common persistence failures into the build and CI instead of waiting for runtime discovery.',
    ],
  },
  {
    id: 'core-async-threading',
    title: 'Async Queries and Main-Thread Rules',
    paragraphs: [
      'Room does not allow ordinary database access on the main thread by default because database work can block rendering and input. That rule is good and should almost never be bypassed in production code.',
      'Asynchronous APIs, suspend functions, and reactive return types are therefore central to correct Room usage rather than optional polish.',
    ],
  },
  {
    id: 'core-observable-queries',
    title: 'Observable Queries and Flow',
    paragraphs: [
      'Room integrates naturally with reactive return types such as Kotlin Flow. A DAO query can therefore become a stream of database-backed updates rather than a one-shot read. This fits well under repository and ViewModel architecture because the local database can behave as a source of truth that continuously informs UI state.',
      'Observable queries still need design care. They rerun on invalidation, so query cost and invalidation scope still matter.',
    ],
  },
  {
    id: 'core-relationships',
    title: 'Relationships, Joins, and Nested Reads',
    paragraphs: [
      'Room supports direct SQL joins and also relation-style mapping through annotations such as `@Relation` and wrapper result types. That can make nested reads cleaner, but it should not encourage careless object-graph thinking. The cost of the underlying query pattern still matters.',
      'The best habit is to stay SQL-conscious. Use relation mapping where it clarifies a real read model, but do not assume every connected object graph should be loaded automatically just because the annotation exists.',
    ],
  },
  {
    id: 'core-transactions',
    title: 'Transactions and Consistency',
    paragraphs: [
      'Transactions matter whenever several reads or writes must behave as one consistent unit. Room supports them through `@Transaction` and lower-level transaction APIs on the database.',
      'A transaction is a correctness boundary, not just a performance feature. Use it for multi-step updates, aggregate changes, and relation reads that must observe a stable snapshot.',
    ],
  },
  {
    id: 'core-type-converters',
    title: 'Type Converters and Custom Types',
    paragraphs: [
      'Type converters let Room persist custom app-facing types by converting them to storable column values. This is useful for types such as timestamps, enums, and IDs that are more expressive in code than in raw SQLite storage.',
      'Converters should simplify persistence, not hide bad schema design. If a team is serializing arbitrary nested object graphs into single columns just to avoid relational modeling, that is usually a warning sign.',
    ],
  },
  {
    id: 'core-migrations',
    title: 'Migrations and Schema Evolution',
    paragraphs: [
      'Schema evolution is one of the most important production concerns in Room. The database version is explicit, and when the schema changes the app must define how existing user data moves forward. Room supports manual migrations and also automated migrations for some classes of schema change when schema history is available.',
      'Migration discipline means more than registering migration objects. It also means exporting schemas, testing upgrade paths, and understanding exactly what destructive fallback would do to user data.',
    ],
  },
  {
    id: 'core-schema-export',
    title: 'Schema Export and the Room Gradle Plugin',
    paragraphs: [
      'Schema export keeps versioned snapshots of the database shape so migration tooling can reason about how the schema evolved. This is strategically important because database version history is part of the product, not disposable build output.',
      'Modern Room guidance also includes the Room Gradle Plugin for cleaner schema-location configuration. The broader lesson is that schema history should be treated as source material worth keeping under version control.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing and room-testing',
    paragraphs: [
      'Persistence bugs are costly because they affect user data, offline behavior, and upgrade safety. Room supports better testing through in-memory databases and dedicated migration testing helpers from its testing artifacts.',
      'A serious testing strategy should cover more than happy-path CRUD. Migration paths, conflict behavior, relation reads, and transaction semantics are often where the real failures appear.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, Indexes, and Query Shape',
    paragraphs: [
      'Room does not make poor SQL fast. Developers still need to choose indexes intelligently, avoid needless table scans, shape queries for the screen or use case, and think about projection size instead of always loading full entities.',
      'This is one area where Room is helpful precisely because it keeps SQL visible. The abstraction makes persistence safer without preventing direct reasoning about relational performance.',
    ],
  },
  {
    id: 'core-advanced-features',
    title: 'Advanced Features: Views, FTS, Raw Queries, and Prepackaged Databases',
    paragraphs: [
      'Room supports advanced SQLite-oriented features such as database views, full-text search entities, raw queries, and prepackaged databases. These matter when the app grows beyond simple CRUD and needs more deliberate read models or stronger local search behavior.',
      "The engineering judgment is knowing when to stay inside Room's common abstractions and when to use these advanced tools deliberately. They are escape hatches and power tools, not defaults for every screen.",
    ],
  },
  {
    id: 'core-architecture-integration',
    title: 'Repository, ViewModel, and Compose Integration',
    paragraphs: [
      'Room fits naturally under the repository pattern. DAOs expose database operations, repositories coordinate local and remote data, ViewModels expose state to the screen, and Compose or classic Android UI observes the resulting streams. This is why Room feels so coherent in modern Android architecture.',
      'In Compose-oriented apps, Flow-backed Room queries often connect cleanly into collected UI state. That makes Room a natural foundation when the UI wants durable local data rather than transient widget state.',
    ],
  },
  {
    id: 'core-comparisons',
    title: 'Room Versus DataStore, Direct SQLite, and Other Choices',
    paragraphs: [
      'Room should not be compared blindly to every persistence tool. DataStore is usually for preferences or lightweight key-value state, not relational querying. Direct SQLite gives lower-level control but far more maintenance burden. Other libraries may optimize for different ecosystems or multiplatform goals.',
      'The honest claim is narrower and stronger: Room is usually the default relational persistence layer for Android apps that want structured local data and Jetpack-friendly architecture.',
    ],
  },
  {
    id: 'core-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'One misconception is that Room removes the need to understand SQL. It does not. The best Room code is written by developers who still think carefully about keys, indexes, projections, and migration paths. Another misconception is that Room is only for large apps. Small apps with real relational storage needs can benefit from it too.',
      'A third mistake is treating Room like universal app state storage. Not everything belongs in a database. Use Room for durable structured data, not for every preference or every temporary UI value.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-basic-setup',
    title: 'Basic Entity, DAO, and Database',
    description: [
      'This is the canonical Room shape: one entity, one DAO, and one database class. The value is not just the annotations. It is the clarity of the schema and access boundary.',
    ],
    code: `@Entity(tableName = "users")
data class UserEntity(
  @PrimaryKey val id: Long,
  val name: String,
  val email: String
)

@Dao
interface UserDao {
  @Query("SELECT * FROM users ORDER BY name")
  fun observeAll(): Flow<List<UserEntity>>

  @Insert(onConflict = OnConflictStrategy.REPLACE)
  suspend fun insertAll(users: List<UserEntity>)
}

@Database(entities = [UserEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
  abstract fun userDao(): UserDao
}`,
    notes: [
      'The schema is visible and reviewable.',
      'The DAO exposes both a reactive read and a suspend write.',
    ],
  },
  {
    id: 'examples-querying',
    title: 'Projection Query',
    description: [
      'A good Room habit is querying for the exact shape a screen needs instead of always materializing full entities.',
    ],
    code: `data class UserRow(
  val id: Long,
  val name: String
)

@Dao
interface UserDao {
  @Query("SELECT id, name FROM users WHERE name LIKE :prefix || '%' ORDER BY name")
  fun observeRows(prefix: String): Flow<List<UserRow>>
}`,
    notes: [
      'Projection types reduce over-fetching.',
      'Not every query result should map to a full entity.',
    ],
  },
  {
    id: 'examples-relations',
    title: 'Relation Read with Transaction',
    description: [
      'Relation wrappers are useful when the app wants a nested read model, but they should be used with a clear transaction boundary when consistency matters.',
    ],
    code: `@Entity(tableName = "playlists")
data class PlaylistEntity(
  @PrimaryKey val id: Long,
  val title: String
)

@Entity(tableName = "songs")
data class SongEntity(
  @PrimaryKey val id: Long,
  val playlistId: Long,
  val title: String
)

data class PlaylistWithSongs(
  @Embedded val playlist: PlaylistEntity,
  @Relation(
    parentColumn = "id",
    entityColumn = "playlistId"
  )
  val songs: List<SongEntity>
)

@Dao
interface PlaylistDao {
  @Transaction
  @Query("SELECT * FROM playlists WHERE id = :id")
  suspend fun getPlaylistWithSongs(id: Long): PlaylistWithSongs?
}`,
    notes: [
      'Use relation wrappers deliberately rather than everywhere.',
      'The transaction protects the consistency of the read.',
    ],
  },
  {
    id: 'examples-converters',
    title: 'Type Converter',
    description: [
      'Type converters are the clean way to persist simple custom types such as `Instant` without polluting app logic with storage-specific conversion code.',
    ],
    code: `class InstantConverters {
  @TypeConverter
  fun fromEpochMillis(value: Long?): Instant? =
    value?.let(Instant::ofEpochMilli)

  @TypeConverter
  fun toEpochMillis(value: Instant?): Long? =
    value?.toEpochMilli()
}

@Database(entities = [UserEntity::class], version = 1)
@TypeConverters(InstantConverters::class)
abstract class AppDatabase : RoomDatabase()`,
    notes: [
      'Converters should be small and deterministic.',
      'Do not use converters to hide bad relational design.',
    ],
  },
  {
    id: 'examples-migrations',
    title: 'Manual Migration',
    description: [
      'A migration is production data logic. It should be treated with the same seriousness as any other persistent state transition.',
    ],
    code: `val MIGRATION_1_2 = object : Migration(1, 2) {
  override fun migrate(db: SupportSQLiteDatabase) {
    db.execSQL(
      "ALTER TABLE users ADD COLUMN createdAt INTEGER"
    )
  }
}

val db = Room.databaseBuilder(
  context,
  AppDatabase::class.java,
  "app.db"
).addMigrations(MIGRATION_1_2)
 .build()`,
    notes: [
      'Migrations should be tested rather than assumed.',
      'Version bumps without migration discipline are a user-data risk.',
    ],
  },
  {
    id: 'examples-repository',
    title: 'Repository Pattern with Flow',
    description: [
      'Room works especially well when the database is kept behind a repository that coordinates local and remote data.',
    ],
    code: `class UserRepository(
  private val api: UserApi,
  private val userDao: UserDao,
) {
  fun observeUsers(): Flow<List<UserEntity>> =
    userDao.observeAll()

  suspend fun refresh() {
    val remote = api.fetchUsers()
    userDao.insertAll(remote.map { it.toEntity() })
  }
}`,
    notes: [
      'The repository keeps persistence and network coordination out of the UI.',
      'Flow from Room makes local source-of-truth architecture straightforward.',
    ],
  },
  {
    id: 'examples-testing',
    title: 'In-Memory DAO Test',
    description: [
      'Persistence code deserves real tests. In-memory Room databases are useful for DAO semantics and query behavior.',
    ],
    code: `lateinit var db: AppDatabase
lateinit var dao: UserDao

@Before
fun setup() {
  db = Room.inMemoryDatabaseBuilder(
    context,
    AppDatabase::class.java
  ).build()
  dao = db.userDao()
}

@Test
fun insertThenRead() = runTest {
  dao.insertAll(listOf(UserEntity(1, "Ali", "a@example.com")))
  val users = dao.observeAll().first()
  assertThat(users).hasSize(1)
}`,
    notes: [
      'DAO behavior should be tested close to the real schema.',
      'Migration tests still need dedicated coverage as well.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Room Terms',
    terms: [
      {
        term: 'Entity',
        definition: 'A class annotated to represent a database table in Room.',
      },
      {
        term: 'DAO',
        definition: 'A Data Access Object that declares queries and persistence operations.',
      },
      {
        term: 'RoomDatabase',
        definition: 'The abstract schema root class generated and managed by Room.',
      },
      {
        term: 'TypeConverter',
        definition:
          'A function that converts between app-facing types and database-storable values.',
      },
      {
        term: 'Migration',
        definition: 'A version-to-version schema or data transition for existing user databases.',
      },
      {
        term: 'AutoMigration',
        definition:
          'A Room feature that can generate some schema migrations when schema history is exported.',
      },
      {
        term: 'Transaction',
        definition: 'A unit of work that must behave atomically and consistently.',
      },
      {
        term: 'Observable query',
        definition:
          'A DAO query that returns a reactive stream and updates when underlying tables invalidate.',
      },
    ],
  },
  {
    id: 'glossary-sql',
    title: 'Relational Terms',
    terms: [
      {
        term: 'Primary key',
        definition: 'The column or set of columns that uniquely identifies a row.',
      },
      {
        term: 'Index',
        definition: 'A database structure that accelerates specific query patterns.',
      },
      {
        term: 'Join',
        definition: 'A relational operation that combines rows from multiple tables.',
      },
      {
        term: 'Projection',
        definition: 'The exact set of columns selected by a query.',
      },
      {
        term: 'Foreign key',
        definition: 'A relational constraint that links one table to another.',
      },
      {
        term: 'FTS',
        definition: 'Full-text search support in SQLite for text-heavy lookup scenarios.',
      },
      {
        term: 'Database view',
        definition: 'A named query-backed read model exposed like a table.',
      },
      {
        term: 'Table scan',
        definition:
          'A query plan that reads the whole table because no better access path is available.',
      },
    ],
  },
  {
    id: 'glossary-android',
    title: 'Android Architecture Terms',
    terms: [
      {
        term: 'Repository',
        definition: 'An app-layer abstraction that coordinates local and remote data sources.',
      },
      {
        term: 'ViewModel',
        definition:
          'A lifecycle-aware component that exposes screen state and survives configuration changes.',
      },
      {
        term: 'Flow',
        definition: 'A Kotlin stream type commonly used with Room for observable queries.',
      },
      {
        term: 'DataStore',
        definition:
          'An Android persistence option for preferences or lightweight key-value data rather than relational storage.',
      },
      {
        term: 'Source of truth',
        definition: 'The canonical place the app trusts for the current state of a dataset.',
      },
      {
        term: 'Offline-first',
        definition:
          'An architecture where local persistence is central and the app remains useful without constant network access.',
      },
      {
        term: 'Instrumentation test',
        definition:
          'A test that runs in an Android environment rather than only as a plain JVM unit test.',
      },
      {
        term: 'Schema export',
        definition:
          'Persisting Room schema history to files so migrations can be reasoned about and verified over time.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-room-exists', label: 'Why Room Exists' },
    { id: 'bp-when-room-fits', label: 'When Room Fits' },
    { id: 'bp-when-room-does-not-fit', label: 'When Room Does Not Fit' },
    { id: 'bp-building-blocks', label: 'Main Building Blocks' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-room-is', label: 'What Room Is' },
    { id: 'core-room-vs-sqlite', label: 'Room and SQLite' },
    { id: 'core-entities', label: 'Entities and Schema' },
    { id: 'core-dao', label: 'DAO Model' },
    { id: 'core-database-class', label: 'Database Class' },
    { id: 'core-query-validation', label: 'Query Validation' },
    { id: 'core-async-threading', label: 'Async and Threading' },
    { id: 'core-observable-queries', label: 'Observable Queries' },
    { id: 'core-relationships', label: 'Relationships and Joins' },
    { id: 'core-transactions', label: 'Transactions' },
    { id: 'core-type-converters', label: 'Type Converters' },
    { id: 'core-migrations', label: 'Migrations' },
    { id: 'core-schema-export', label: 'Schema Export' },
    { id: 'core-testing', label: 'Testing' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-advanced-features', label: 'Advanced Features' },
    { id: 'core-architecture-integration', label: 'Architecture Integration' },
    { id: 'core-comparisons', label: 'Comparisons' },
    { id: 'core-misconceptions', label: 'Misconceptions' },
  ],
  examples: [
    { id: 'examples-basic-setup', label: 'Basic Setup' },
    { id: 'examples-querying', label: 'Projection Query' },
    { id: 'examples-relations', label: 'Relation Read' },
    { id: 'examples-converters', label: 'Type Converter' },
    { id: 'examples-migrations', label: 'Manual Migration' },
    { id: 'examples-repository', label: 'Repository Pattern' },
    { id: 'examples-testing', label: 'Testing Example' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Room Terms' },
    { id: 'glossary-sql', label: 'Relational Terms' },
    { id: 'glossary-android', label: 'Android Architecture Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="room-help-section">
      <h2 className="room-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="room-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="room-help-section">
      <h2 className="room-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="room-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="room-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="room-help-section">
      <h2 className="room-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="room-help-divider" />}
    </section>
  )
}

export default function RoomAndroidPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Room (Android)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Room (Android)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Room (Android)</h1>
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
    </TopicPageShell>
  )
}
