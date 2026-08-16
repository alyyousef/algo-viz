import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  // 61.1 Bioinformatics
  '61. Applied - Specialized CS Domains/61.1 Bioinformatics/Computational biology/index.mdx': `---
title: Computational biology
description: The use of data analysis, mathematical modeling and computational simulations to understand biological systems and relationships.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Computational Biology">

Biology is fundamentally an information science. A living organism is just a biological computer executing a massive, complex codebase written in DNA.

**Computational Biology** is the mathematical discipline of reverse-engineering that codebase. Instead of using microscopes and petri dishes, computational biologists use Python, machine learning, and supercomputers to mathematically model cellular processes, predict protein folding, and simulate entire biological systems in silico.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.1 Bioinformatics/Genomics/index.mdx': `---
title: Genomics
description: An interdisciplinary field of biology focusing on the structure, function, evolution, mapping, and editing of genomes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Genomics">

A genome is an organism's complete set of DNA. Human DNA contains roughly 3 billion base pairs (A, C, G, T).

Mathematically, a human genome is a 3-Gigabyte text file written in a 4-letter alphabet. **Genomics** is the computer science of storing, analyzing, and querying these massive text files. It involves finding "bugs" in the code (genetic mutations) that cause biological diseases, and comparing the text files of different humans to understand genetic diversity.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.1 Bioinformatics/DNA sequencing/index.mdx': `---
title: DNA sequencing
description: The process of determining the nucleic acid sequence – the order of nucleotides in DNA.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DNA Sequencing">

You cannot biologically extract a single continuous 3-Gigabyte string of DNA from a cell. The DNA naturally breaks into millions of tiny, randomized fragments.

<Callout icon="warning" title="The Jigsaw Puzzle">
  **DNA Sequencing** is the algorithmic nightmare of putting the fragments back together.
  
  Sequencing machines read millions of 150-letter fragments simultaneously. Computer scientists then use massive string-matching algorithms (like De Bruijn graphs) to mathematically stitch these millions of overlapping strings back into the single original 3-billion-letter string. This is computationally identical to assembling a 10-million-piece jigsaw puzzle where all the pieces are almost exactly the same color.
</Callout>

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.1 Bioinformatics/Sequence alignment/index.mdx': `---
title: Sequence alignment
description: A way of arranging the sequences of DNA, RNA, or protein to identify regions of similarity that may be a consequence of functional, structural, or evolutionary relationships.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sequence Alignment">

If you want to know if a human and a mouse share a specific gene, you mathematically compare their DNA strings.

However, DNA mutates. Base pairs get inserted, deleted, or swapped over millions of years. Standard string equality (\`string1 == string2\`) is biologically useless. **Sequence Alignment** algorithms (like Needleman-Wunsch or Smith-Waterman) use Dynamic Programming to mathematically calculate the optimal alignment between two strings, tolerating gaps and mutations, to prove evolutionary relationships.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.1 Bioinformatics/BLAST/index.mdx': `---
title: BLAST
description: Basic Local Alignment Search Tool is an algorithm and program for comparing primary biological sequence information, such as the amino-acid sequences of proteins or the nucleotides of DNA and/or RNA sequences.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="BLAST"
  subtitle="The Search Engine of Biology"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Blast_logo.png/512px-Blast_logo.png"
  description="BLAST is the most famous algorithm in bioinformatics, acting as the biological Google Search for DNA and protein sequences."
  yearCreated={1990}
  creator="Altschul, Gish, Miller, Myers, Lipman"
  isOpenSource={true}
  websiteUrl="https://blast.ncbi.nlm.nih.gov/Blast.cgi"
>

Running exact Dynamic Programming sequence alignment on a massive database of all known life is mathematically too slow ($O(N^2)$).

**BLAST** sacrifices perfect accuracy for biological speed. It uses a mathematical heuristic approach. It chops the search query into tiny "words" (e.g., 11 letters long), rapidly scans the database for exact matches of those tiny words, and only performs the expensive alignment math on the regions where a seed word was found. It mathematically reduced weeks of supercomputer calculation into seconds.

</TechnologyTemplate>
`,
  '61. Applied - Specialized CS Domains/61.1 Bioinformatics/Phylogenetics/index.mdx': `---
title: Phylogenetics
description: The study of the evolutionary history and relationships among or within groups of organisms.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Phylogenetics">

**Phylogenetics** is the mathematical construction of the "Tree of Life".

By taking the DNA sequences of 100 different species and running massive sequence alignments, computer scientists mathematically calculate the exact genetic distance between every species. They then use clustering algorithms to draw a biological tree graph (a Phylogeny) that mathematically proves exactly when humans diverged from chimpanzees millions of years ago.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.1 Bioinformatics/Proteomics/index.mdx': `---
title: Proteomics
description: The large-scale study of proteins.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Proteomics">

DNA is just the static instruction manual. Proteins are the biological nanomachines that actually do the work in a cell. 

**Proteomics** is the study of these proteins. While DNA is a simple 1D text string, a protein is a complex 3D shape that folds in on itself. The biological function of a protein is dictated entirely by its 3D physical shape. Mathematically predicting exactly how a 1D string of amino acids will physically fold into a 3D structure is one of the hardest problems in physics, recently revolutionized by DeepMind's AlphaFold.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.1 Bioinformatics/BioPython/index.mdx': `---
title: BioPython
description: An open-source collection of non-commercial Python tools for computational biology and bioinformatics.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Biopython"
  subtitle="The Python Library for DNA"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Biopython_logo.svg/512px-Biopython_logo.svg.png"
  description="Biopython is the biological industry standard Python framework for writing scripts that interact with DNA sequences, proteins, and major biological databases."
  yearCreated={1999}
  creator="The Biopython Consortium"
  isOpenSource={true}
  websiteUrl="https://biopython.org/"
>

If a computational biologist wants to download a genome from the NCBI database, translate the DNA string into an RNA string, and then parse the results into a Pandas dataframe, they mathematically do not write this from scratch.

Biopython provides robust, battle-tested objects like \`SeqRecord\`. It handles the terrifying biological edge cases of file formats (like parsing massive FASTA or GenBank files) so the scientist can focus on the actual biology.

</TechnologyTemplate>
`,

  // 61.2 Computational Finance
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Quantitative finance/index.mdx': `---
title: Quantitative finance
description: The use of mathematical models and extremely large datasets to analyze financial markets and securities.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Quantitative Finance">

The stock market is no longer run by human traders yelling on a biological trading floor. It is a massive, distributed computer system.

**Quantitative Finance** (Quant) is the application of hardcore computer science, statistics, and physics to financial markets. "Quants" mathematically model the probability of a stock going up or down. They do not care about a company's CEO or their biological products; they only care about the mathematical signals hidden in the massive streams of market data.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Algorithmic trading/index.mdx': `---
title: Algorithmic trading
description: A method of executing orders using automated pre-programmed trading instructions accounting for variables such as time, price, and volume.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Algorithmic Trading">

**Algorithmic Trading** is the automation of the Quant's mathematical models.

<Callout icon="warning" title="Removing the Human">
  The trading script connects directly to the stock exchange API. It reads the incoming price data, executes the mathematical model, and automatically buys or sells millions of dollars of stock in milliseconds.
  
  High-Frequency Trading (HFT) takes this to the physical extreme. HFT firms spend hundreds of millions of dollars to lay their own fiber-optic cables in straight lines through mountains just to reduce the biological network latency to the exchange by 3 milliseconds, allowing their algorithms to mathematically execute trades before their competitors.
</Callout>

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Market microstructure/index.mdx': `---
title: Market microstructure
description: A branch of finance concerned with the details of how exchange occurs in markets.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Market Microstructure">

When you buy a stock on Robinhood, you do not mathematically buy it from "the market". You buy it from a specific human or algorithm.

**Market Microstructure** is the computer science study of *how* these trades physically occur. It examines the biological rules of the exchange, the latency of the network, the behavior of Market Makers (algorithms that constantly provide liquidity), and how a single massive trade can mathematically cause a "Flash Crash" by accidentally triggering a cascade of automated stop-loss algorithms.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Order book dynamics/index.mdx': `---
title: Order book dynamics
description: The study of the electronic list of buy and sell orders for a specific security or financial instrument organized by price level.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Order Book Dynamics">

The **Order Book** is the core mathematical data structure of any exchange (Stock, Crypto, etc).

It is a massive, real-time list of every single biological participant who wants to buy (Bids) and sell (Asks). An algorithmic trader mathematically studies the *dynamics* of this book. If they see a massive wall of Ask orders at \$100, they mathematically know the price will struggle to cross \$100. Furthermore, they look for "Spoofing"—illegal algorithms that place massive fake orders to biologically scare other algorithms into changing their prices.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Time-series analysis/index.mdx': `---
title: Time-series analysis
description: Methods for analyzing time series data in order to extract meaningful statistics and other characteristics of the data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Time-Series Analysis">

A stock price chart is just a **Time-Series**—a sequence of data points mathematically indexed in time order.

Quants use Time-Series Analysis to find biological patterns. They use mathematical models like ARIMA or GARCH to detect seasonality, momentum, and volatility. The mathematical goal is to prove that the sequence of numbers is not a random walk, and that the past 10 minutes of data statistically constrain the probability of the next 1 minute of data.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Black-Scholes/index.mdx': `---
title: Black-Scholes
description: A mathematical model for the dynamics of a financial market containing derivative investment instruments.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="The Black-Scholes Model">

In 1973, Fischer Black and Myron Scholes published a mathematical equation that literally revolutionized global finance, ultimately winning a Nobel Prize.

<Callout icon="success" title="Pricing the Future">
  The **Black-Scholes equation** mathematically calculates the exact, fair biological price of a European Call Option (a contract to buy a stock in the future).
  
  Before this equation, options trading was basically biological gambling. Black-Scholes proved that by mathematically combining the current stock price, the strike price, the time to expiration, the risk-free interest rate, and the stock's volatility, you can eliminate risk entirely through dynamic hedging. It is the mathematical foundation of the multi-trillion-dollar derivatives market.
</Callout>

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Options pricing/index.mdx': `---
title: Options pricing
description: The mathematical process of determining the fair value of an options contract.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Options Pricing">

While Black-Scholes is famous, it makes strict mathematical assumptions (like assuming volatility is constant, which is biologically false).

Modern **Options Pricing** involves massive computational power. Quants write C++ programs to mathematically solve complex Partial Differential Equations (PDEs) or use Binomial Tree algorithms to calculate the price of "Exotic Options" (contracts with insane biological rules, like "The payoff depends on the average price over the last 30 days, but only if the price never dropped below \$50").

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Monte Carlo simulation/index.mdx': `---
title: Monte Carlo simulation
description: A broad class of computational algorithms that rely on repeated random sampling to obtain numerical results.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Monte Carlo Simulation">

If a financial derivative is too mathematically complex to be solved with an equation, Quants use **Monte Carlo Simulations**.

<Callout icon="tip" title="Simulating the Multiverse">
  A computer mathematically simulates 100,000 different possible biological futures for the stock market, using random numbers and probability distributions.
  
  The computer then evaluates the complex financial contract in every single one of those 100,000 parallel universes. Finally, it mathematically averages the result. This requires massive High-Performance Computing clusters, but it provides a reliable price for derivatives that are otherwise mathematically impossible to calculate.
</Callout>

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Risk modelling/index.mdx': `---
title: Risk modelling
description: The use of formal econometric techniques to determine the aggregate risk in a financial portfolio.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Risk Modelling">

In 2008, the global financial system collapsed because the **Risk Models** were biologically wrong.

Banks use computer science to mathematically calculate "Value at Risk" (VaR)—the maximum amount of money they could theoretically lose in a single day. Risk Modelling involves mathematically combining the volatility of thousands of different assets and, crucially, calculating their *correlation*. If the model incorrectly assumes that Housing Prices in Florida have 0% correlation with Housing Prices in Nevada, the bank will mathematically believe it is safe, right up until the moment it goes biologically bankrupt.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Portfolio optimisation/index.mdx': `---
title: Portfolio optimisation
description: The process of selecting the best portfolio out of the set of all portfolios being considered, according to some objective.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Portfolio Optimization">

If you have \$1 Million, how much should you put in Apple, and how much in Gold?

Based on Harry Markowitz's Modern Portfolio Theory, **Portfolio Optimization** is a mathematical convex optimization problem. A computer algorithm evaluates thousands of assets, aiming to mathematically maximize the expected biological return while strictly minimizing the mathematical variance (risk). The algorithm searches the "Efficient Frontier" to find the mathematically perfect allocation percentages.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Financial ML/index.mdx': `---
title: Financial ML
description: The application of machine learning techniques to financial data to detect patterns, predict asset prices, or optimize trading strategies.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Financial Machine Learning">

Classic Quant finance relies on strict mathematical statistics and PDEs. **Financial ML** abandons formulas and lets AI find the patterns.

Quants feed Deep Neural Networks or Random Forests massive datasets: 10 years of Order Book data, biological satellite imagery of Walmart parking lots, and NLP sentiment analysis of Elon Musk's tweets. The AI mathematically discovers invisible, non-linear relationships that no human mathematician could ever derive. However, financial data has a notoriously low signal-to-noise ratio, making these models highly prone to catastrophic overfitting.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.2 Computational Finance/Backtesting frameworks/index.mdx': `---
title: Backtesting frameworks
description: Software environments that allow traders to test a trading strategy on relevant historical data to ensure its viability before risking actual capital.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Backtesting Frameworks">

Before a Quant deploys an algorithm with real money, they must mathematically prove it works on the past 5 years of historical data.

<Callout icon="warning" title="The Illusion of Success">
  **Backtesting Frameworks** (like Backtrader or Zipline) simulate the exchange. However, writing a biological backtester is incredibly dangerous.
  
  If the simulation mathematically allows the algorithm to "peek" 1 millisecond into the future (Look-ahead Bias), or assumes the algorithm could have bought 10,000 shares without physically moving the price of the stock (Slippage/Market Impact), the backtest will mathematically show a 500% profit, but the live algorithm will instantly lose millions of dollars.
</Callout>

</ConceptTemplate>
`,

  // 61.3 Geographic Systems
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/GIS/index.mdx': `---
title: GIS (Geographic Information System)
description: A conceptualized framework that provides the ability to capture and analyze spatial and geographic data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GIS (Geographic Information System)">

**GIS** is the computer science of mathematically mapping the biological Earth.

It is vastly more complex than just drawing a Google Map. GIS involves layering massive, disparate datasets—mathematically combining road networks, biological population density, elevation topography, and real-time weather data. City planners use GIS software (like ArcGIS or QGIS) to mathematically calculate the optimal location to build a new hospital based on 30 different geographic variables.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/Map projections/index.mdx': `---
title: Map projections
description: A systematic transformation of the latitudes and longitudes of locations from the surface of a sphere or an ellipsoid into locations on a plane.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Map Projections">

The biological Earth is a 3D sphere. A computer monitor is a 2D rectangle. 

<Callout icon="warning" title="Mathematical Distortion">
  It is mathematically impossible to flatten a 3D sphere into a 2D rectangle without distorting the data. This requires **Map Projections**.
  
  The famous Mercator Projection preserves exact navigational angles, but mathematically distorts size (making Greenland look as big as Africa). Software engineers building GIS applications must constantly use complex trigonometric math (like the PROJ library) to translate coordinates between different projections, or else their data will biologically appear hundreds of miles away from its true location.
</Callout>

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/GPS/index.mdx': `---
title: GPS (Global Positioning System)
description: A satellite-based radionavigation system owned by the United States government and operated by the United States Space Force.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GPS">

**GPS** is one of the greatest biological achievements of human engineering.

There are ~31 GPS satellites orbiting the Earth, constantly broadcasting a simple message: *"I am Satellite X, and the current time is Y"*. Your smartphone passively listens to these signals. Because the signal travels at the speed of light, your phone mathematically calculates exactly how far away each satellite is. Using **Trilateration**, if your phone receives signals from 4 satellites, it can mathematically calculate your exact 3D location on Earth. It even mathematically requires Einstein's Theory of Relativity to correct for the time dilation caused by the satellites' speed and gravity.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/Geospatial databases/index.mdx': `---
title: Geospatial databases
description: A database designed to store, query, and manipulate geographic information and spatial data.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Geospatial Databases">

If you want to find all coffee shops within a 5-mile radius of a user, a standard SQL database mathematically fails. Scanning the Latitude and Longitude of 10 million businesses using standard \`>\` and \`<\` operators is $O(N)$ and biologically too slow.

**Geospatial Databases** use specialized mathematical indexing structures like **R-Trees** or **Geohashes**. These indexes mathematically divide the 2D map into a grid of bounding boxes, allowing the database to instantly filter out 99% of the Earth and mathematically execute the radius query in sub-millisecond time.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/PostGIS/index.mdx': `---
title: PostGIS
description: An open source software program that adds support for geographic objects to the PostgreSQL object-relational database.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="PostGIS"
  subtitle="The Geographic Engine of PostgreSQL"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/PostGIS_logo.png/512px-PostGIS_logo.png"
  description="PostGIS is an extension that mathematically transforms PostgreSQL into the most powerful open-source Geospatial Database on Earth."
  yearCreated={2001}
  creator="Refractions Research"
  isOpenSource={true}
  websiteUrl="https://postgis.net/"
>

With PostGIS installed, a developer can biologically insert complex geographic shapes (Points, Lines, Polygons) directly into SQL columns.

More importantly, it provides hundreds of mathematical geographic functions. You can write a single SQL query that mathematically calculates the total area of a polygon, checks if a point intersects a boundary, or calculates the shortest distance between two biological zip codes, all executed natively inside the C engine of the database.

</TechnologyTemplate>
`,
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/GeoJSON/index.mdx': `---
title: GeoJSON
description: An open standard format designed for representing simple geographical features, along with their non-spatial attributes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="GeoJSON">

When a server mathematically sends map data to a browser (like Google Maps), it uses **GeoJSON**.

It is literally just standard JSON, but strictly formatted to hold geometric math. You declare a \`type\` (like "Polygon" or "Point") and provide an array of \`coordinates\`. It allows frontend JavaScript libraries (like Leaflet or Mapbox) to effortlessly parse the biological data and mathematically render borders, roads, and markers onto an interactive HTML canvas.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/Geocoding/index.mdx': `---
title: Geocoding
description: The computational process of transforming a physical address description to a location on the Earth's surface.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Geocoding">

Humans biologically understand "1600 Pennsylvania Avenue, Washington, DC". Computers mathematically only understand \`[38.897, -77.036]\`.

**Geocoding** is the algorithmic process of translating the biological human address into the mathematical Latitude/Longitude coordinate. It is incredibly difficult because human addresses are messy, misspelled, and lack global standardization. **Reverse Geocoding** is the opposite: taking a GPS coordinate and mathematically querying a database to figure out the name of the biological street the user is standing on.

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/Routing algorithms/index.mdx': `---
title: Routing algorithms
description: Algorithms used to find optimal paths through a network of roads or other transportation infrastructure.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Routing Algorithms">

When Google Maps mathematically plots your drive from New York to Los Angeles, it executes a **Routing Algorithm**.

<Callout icon="info" title="A* Search on the Highway">
  The Earth's road network is mathematically represented as a massive Graph (Intersections are Nodes, Roads are Edges). 
  
  Dijkstra's Algorithm is biologically too slow to search a graph of 100 million roads. Modern GIS uses **A* (A-Star) Search** combined with Hierarchical algorithms (like Contraction Hierarchies). The math heavily penalizes side-streets and prioritizes highways, allowing the computer to mathematically guarantee the fastest biological route across an entire continent in under 50 milliseconds.
</Callout>

</ConceptTemplate>
`,
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/OpenStreetMap/index.mdx': `---
title: OpenStreetMap
description: A collaborative project to create a free editable geographic database of the world.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="OpenStreetMap (OSM)"
  subtitle="The Wikipedia of Maps"
  logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Openstreetmap_logo.svg/512px-Openstreetmap_logo.svg.png"
  description="OSM is a massive, crowdsourced, open-source database containing the mathematical coordinates of almost every biological road, building, and tree on Earth."
  yearCreated={2004}
  creator="Steve Coast"
  isOpenSource={true}
  websiteUrl="https://www.openstreetmap.org/"
>

Google Maps is a closed, proprietary biological monopoly. If a company wants to build their own routing engine, they mathematically cannot afford Google's API fees.

OpenStreetMap provides the raw mathematical dataset for free. Millions of human volunteers biologically trace satellite imagery and walk their neighborhoods with GPS units to update the database. Massive tech companies (like Uber, Apple, and Amazon) heavily rely on and contribute to OSM because it frees them from Google's mathematical control.

</TechnologyTemplate>
`,
  '61. Applied - Specialized CS Domains/61.3 Geographic Systems/Satellite imagery analysis/index.mdx': `---
title: Satellite imagery analysis
description: The use of computer vision algorithms to extract meaningful data from images of the Earth taken by satellites.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Satellite Imagery Analysis">

Satellites biologically photograph the entire Earth every single day, generating Petabytes of raw visual data.

Computer scientists mathematically feed these images into massive Convolutional Neural Networks (CNNs). The AI mathematically counts the number of biological cars in Walmart parking lots to predict retail stock prices, measures the health of agricultural crops using Infrared frequencies, and biologically detects illegal deforestation in the Amazon rainforest in real-time. 

</ConceptTemplate>
`,
}

async function generateMega116a() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega116a().catch(console.error)
