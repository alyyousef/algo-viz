import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.1 Bioinformatics/Phylogenetics/index.mdx': `---
title: Phylogenetics
description: "The study of evolutionary relationships among biological entities, using computational algorithms to construct evolutionary trees from genetic data."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Phylogenetics"
  subtitle="Computing the Tree of Life"
  tags={['Bioinformatics', 'Genetics', 'Algorithms', 'Data Science']}
>

**Phylogenetics** is the computational science of discovering how different species (or viruses, or genes) are related to each other evolutionarily. By treating DNA sequences as massive strings of text, computer scientists can calculate the mathematical "edit distance" between species to draw a family tree (a Phylogenetic Tree).

## 1. The Computational Problem

If you have the DNA sequence of a Human, a Chimp, and a Banana, you want to know which two are most closely related. 
In computer science terms, this is a **Multiple Sequence Alignment (MSA)** problem. The algorithm aligns the strings of ATCGs and looks for mutations, insertions, or deletions. 
If the human and chimp sequences have a 98% match, and the human and banana have a 60% match, the algorithm mathematically deduces that the human and chimp share a much more recent common ancestor.

## 2. Distance Matrix Methods

One of the most common algorithms used is **Neighbor-Joining (NJ)**. 
1. The algorithm calculates the pairwise genetic distance between every single species in the dataset, creating a massive $N \\\\times N$ Distance Matrix.
2. It finds the two species with the shortest distance (the closest neighbors) and merges them into a single "Node" representing their common ancestor.
3. It recalculates the matrix to find the distance from this new ancestor node to all other species, recursively repeating until a single Root node is found.

## 3. Real-World Application: Epidemiology

Phylogenetics isn't just for studying dinosaurs; it is a critical tool in modern epidemiology.
During the COVID-19 pandemic, scientists used phylogenetic algorithms (like the *Nextstrain* project) to track the real-time evolution of the virus. By sequencing the RNA of the virus from patients around the world and drawing a phylogenetic tree, they could computationally prove exactly how the virus mutated and which geographic routes it took to spread across the globe.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.3 Geographic Systems/GeoJSON/index.mdx': `---
title: GeoJSON
description: "An open standard format designed for representing simple geographical features, along with their non-spatial attributes, using JavaScript Object Notation (JSON)."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="GeoJSON"
  subtitle="The JSON Standard for Maps"
  tags={['GIS', 'Data Formats', 'Web Development', 'Geography']}
>

**GeoJSON** is the undisputed industry standard for transmitting geographic data over the web. Built entirely on standard JSON, it allows developers to pass complex mapping data (like the borders of a country or the route of a delivery truck) through REST APIs just like any other JavaScript object.

## 1. The Geometry Types

A GeoJSON object must contain a TICK1geometryTICK1 field, which supports a specific set of mathematical shapes based on longitude and latitude arrays:

- **Point**: A single coordinate (e.g., a restaurant). TICK1[longitude, latitude]TICK1.
- **LineString**: An array of connected points (e.g., a highway).
- **Polygon**: An array of closed LineStrings representing a filled area (e.g., the border of France). It also supports "holes" (e.g., a lake inside the country).
- **MultiPolygon**: For complex entities like the State of Hawaii (multiple disconnected islands acting as one political entity).

## 2. Features and FeatureCollections

A raw geometry isn't very useful by itself. GeoJSON introduces the **Feature** object, which bundles a Geometry with **Properties** (metadata).

TICK3json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-73.985, 40.748]
  },
  "properties": {
    "name": "Empire State Building",
    "height_meters": 443
  }
}
TICK3

APIs usually return a **FeatureCollection**, which is simply an array of these Feature objects, allowing a web frontend (like Mapbox or Leaflet) to instantly loop through and render thousands of pins on a map.

## 3. The Coordinate System

By strict specification (RFC 7946), GeoJSON uses the **WGS 84** coordinate reference system.
This is a critical standardization. It guarantees that coordinates are always written as TICK1[Longitude, Latitude]TICK1 (X, Y). Many developers mistakenly write them as Latitude, Longitude, which causes the GeoJSON parser to render the map completely sideways or in the middle of the ocean.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.1 Bioinformatics/Proteomics/index.mdx': `---
title: Proteomics
description: "The large-scale computational study of proteomes—the entire set of proteins that is produced or modified by an organism or system."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Proteomics"
  subtitle="Computing the Machinery of Life"
  tags={['Bioinformatics', 'Biology', 'Data Science', 'Machine Learning']}
>

If Genomics is the study of the "blueprint" (DNA), **Proteomics** is the study of the actual "machinery" (Proteins) that the blueprint builds. 
While a human has roughly 20,000 genes, those genes can produce over 1,000,000 different proteins through complex folding and modifications. Studying this massive, dynamic dataset requires intense computational power.

## 1. The Protein Folding Problem

For 50 years, the grand challenge of computational biology was the Protein Folding Problem. 
Proteins are long chains of amino acids. However, a protein only functions based on its 3D physical shape. Determining how a 1D string of amino acids will magnetically and chemically fold itself into a complex 3D nanostructure is a physics simulation that would take traditional supercomputers thousands of years to calculate for a single protein.

## 2. AlphaFold (The Deep Learning Revolution)

In 2020, Google DeepMind solved the Protein Folding Problem using AI. 
Their neural network, **AlphaFold**, bypassed the brute-force physics simulations. Instead, it was trained on the massive database of known protein structures. By using deep learning attention mechanisms, AlphaFold learned the hidden patterns of how amino acids interact, predicting the 3D structure of almost every known protein in the universe with atomic accuracy in a matter of minutes.

<Callout type="success" title="Impact on Drug Discovery">
  Proteomics is the foundation of modern pharmacology. Almost all drugs work by physically binding to a specific protein in the body (like a key fitting into a lock). By computationally knowing the exact 3D shape of a disease-causing protein, supercomputers can rapidly screen millions of chemical compounds to find the one molecule that perfectly slots into the protein's receptor site, cutting drug development time by years.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.1 Bioinformatics/Genomics/index.mdx': `---
title: Genomics
description: "The computational study of genomes, mapping and analyzing the complete set of DNA within a single cell of an organism."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Genomics"
  subtitle="Decoding the Source Code of Life"
  tags={['Bioinformatics', 'Genetics', 'Data Science', 'Algorithms']}
>

**Genomics** is the intersection of biology and computer science. It treats the DNA of an organism as a massive, 3-billion-character string of code (written in A, C, T, G), using computational algorithms to search, analyze, and reverse-engineer the biological software.

## 1. Genome Assembly (The Jigsaw Puzzle)

When DNA is sequenced by a machine in a lab, the machine cannot read the entire 3-billion-letter string from start to finish. Instead, it shreds the DNA into millions of tiny "reads" (e.g., 150 letters long) and reads those.

The computer science problem is **Genome Assembly**. Algorithms must take these 100 million tiny, overlapping strings and stitch them back together into the massive original sequence. This is computationally equivalent to finding the Shortest Superstring, famously solved using **De Bruijn Graphs**. The algorithm maps overlaps as edges on a graph and finds an Eulerian path that reconstructs the genome.

## 2. Variant Calling

Once a human's genome is assembled, it is compared against the "Reference Human Genome". 
Algorithms perform incredibly fast string-matching (using data structures like the **Burrows-Wheeler Transform**) to find the exact indices where a patient's DNA differs from the reference (a mutation or "variant"). By cross-referencing these variants against medical databases, doctors can computationally predict a patient's risk for specific cancers or hereditary diseases.

## 3. The Big Data Problem

Genomics is one of the largest big data domains on Earth. A single raw human genome sequence is roughly 200 Gigabytes of data. Storing, querying, and running machine learning models over millions of patients' genomes requires massive cloud computing infrastructure, specialized compression algorithms, and distributed computing frameworks like Apache Spark.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.5 EdTech - HealthTech - LegalTech (Domain Applications)/Telemedicine platforms/index.mdx': `---
title: Telemedicine Platforms
description: "The software infrastructure that enables the remote delivery of healthcare services, including clinical consultations, via telecommunications technology."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Telemedicine Platforms"
  subtitle="Engineering Remote Healthcare"
  tags={['HealthTech', 'WebRTC', 'Compliance', 'Architecture']}
>

A **Telemedicine Platform** is not just a standard video-conferencing app like Zoom. It is a highly specialized SaaS architecture that must combine real-time communication with extreme legal compliance, medical record integrations, and specialized hardware support.

## 1. WebRTC for Encrypted Video

The core of a telemedicine visit is the video stream. This is almost universally powered by **WebRTC** (Web Real-Time Communication), an open-source protocol that allows peer-to-peer video streaming directly in the browser without plugins.
WebRTC provides built-in end-to-end encryption (DTLS and SRTP), ensuring that the video stream between the doctor and patient cannot be intercepted, a critical requirement for medical privacy.

## 2. HIPAA Compliance (USA)

In the United States, telemedicine platforms must strictly adhere to the **HIPAA** (Health Insurance Portability and Accountability Act) regulations.
From a software engineering perspective, this requires:
- **Audit Logging**: Every time a doctor views a patient's file, the database must log the timestamp, IP address, and user ID.
- **Data Encryption**: All database volumes must be encrypted at rest (AES-256), and all API traffic must be encrypted in transit (TLS 1.2+).
- **BAAs (Business Associate Agreements)**: You cannot just use standard AWS or Heroku. The cloud provider must sign a legal contract guaranteeing they meet HIPAA security standards for the physical servers.

<Callout type="info" title="EHR Integration">
  A telemedicine app is useless if the doctor has to manually re-type their notes into the hospital's main database. Telemedicine platforms use standards like **HL7** or **FHIR** (Fast Healthcare Interoperability Resources)—which are essentially standardized REST APIs for healthcare—to push the video visit summary directly into the hospital's massive Electronic Health Record (EHR) system like Epic or Cerner.
</Callout>

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.2 Computational Finance/Time-series analysis/index.mdx': `---
title: Time-Series Analysis
description: "A statistical technique used to analyze sequence data points collected over specific time intervals, crucial for algorithmic trading and forecasting."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Time-Series Analysis"
  subtitle="Forecasting the Future of Data"
  tags={['Computational Finance', 'Data Science', 'Statistics', 'Machine Learning']}
>

In computational finance, almost all data is a **Time-Series**: a sequence of data points indexed in time order (e.g., the price of Apple stock recorded every minute for 5 years). 
Analyzing this data requires entirely different algorithms than standard relational data, because the *order* of the rows fundamentally matters.

## 1. Stationarity and Autocorrelation

Before running predictive models, quants must analyze the mathematical properties of the time-series:
- **Stationarity**: A time-series is stationary if its statistical properties (mean, variance) remain constant over time. Stock prices are notoriously non-stationary (they drift upwards). Data scientists often transform the data by calculating the *daily percentage change* rather than the raw price to make it stationary.
- **Autocorrelation**: Measuring how correlated a variable is with delayed (lagged) versions of itself. If today's stock volume is highly correlated with yesterday's volume, the series has high autocorrelation.

## 2. Traditional Models (ARIMA)

For decades, the gold standard for time-series forecasting was the **ARIMA** (AutoRegressive Integrated Moving Average) model.
It mathematically combines three ideas:
1. **AR**: Predicting the next point based on a linear combination of past points.
2. **I**: Differencing the data (subtracting today from yesterday) to force it to be stationary.
3. **MA**: Using past forecast errors to adjust the current prediction.

## 3. Deep Learning (LSTMs)

In modern quantitative finance, deep learning has largely taken over. 
Standard neural networks fail at time-series because they have no "memory". **LSTMs (Long Short-Term Memory networks)** are a specialized Recurrent Neural Network architecture designed specifically for time-series. They contain mathematical "gates" that learn which historical data points are important to remember for the long term, and which recent noise should be forgotten, making them incredibly powerful for algorithmic trading models.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.2 Computational Finance/Options pricing/index.mdx': `---
title: Options Pricing
description: "The highly complex mathematical models used by financial institutions to determine the fair theoretical value of an options contract."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Options Pricing"
  subtitle="The Math of Derivatives"
  tags={['Computational Finance', 'Mathematics', 'Algorithms', 'Economics']}
>

An **Option** is a financial derivative contract that gives the buyer the right (but not the obligation) to buy or sell a stock at a specific price on a specific date. 
Because the payoff is asymmetrical and occurs in the future, determining exactly how much that contract should cost *today* is one of the most famous problems in computational finance.

## 1. The Black-Scholes Model

In 1973, Fischer Black, Myron Scholes, and Robert Merton published the **Black-Scholes Equation**, a differential equation that revolutionized Wall Street (and won a Nobel Prize).
It mathematically proves that you can determine the exact fair price of a European option using five specific variables:
1. The current stock price.
2. The strike price of the option.
3. The time remaining until expiration.
4. The risk-free interest rate.
5. **Implied Volatility**: How wildly the market expects the stock to swing.

The algorithm outputs a precise dollar value. If the market is selling the option for less than the Black-Scholes value, a computer algorithm will instantly buy it, knowing it is mathematically underpriced.

## 2. The Greeks

Options pricing models don't just output a price; they calculate "The Greeks", which measure the exact mathematical sensitivity of the option's price to changes in the universe:
- **Delta ($\\\\Delta$)**: How much the option price changes if the underlying stock moves by $1.
- **Theta ($\\\\Theta$)**: How much value the option loses every single day due to time decay.
- **Vega ($\\mathcal{V}$)**: The sensitivity to changes in market volatility.

## 3. Monte Carlo Simulations

Black-Scholes only works for simple "European" options. For complex "Exotic" options, there is no clean mathematical formula.
Quants use **Monte Carlo Simulations**. They use massive computing clusters to simulate 10 million possible random paths the stock price could take over the next year (using geometric Brownian motion). They calculate the payoff for all 10 million paths, average them together, and discount it back to today's value, using raw compute power to solve an unsolvable equation.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.2 Computational Finance/Quantitative finance/index.mdx': `---
title: Quantitative Finance
description: "The application of mathematical models, statistics, and massive computing power to analyze financial markets and securities."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate
  title="Quantitative Finance"
  subtitle="Algorithms on Wall Street"
  tags={['Computational Finance', 'Machine Learning', 'Algorithms', 'Data Science']}
>

**Quantitative Finance** (or "Quant") is the domain where Wall Street meets Silicon Valley. Instead of humans reading news articles and looking at balance sheets, Quants use pure mathematics, stochastic calculus, and C++ algorithms to find tiny, highly profitable inefficiencies in global financial markets.

## 1. Alpha Generation

The ultimate goal of a Quant is to find "Alpha"—a mathematical edge that allows them to beat the market. 
They do this by feeding massive datasets into Machine Learning models. 
- **Alternative Data**: Instead of just looking at stock prices, Quants will train computer vision algorithms on satellite imagery of Walmart parking lots to predict their quarterly earnings before the official report is released, allowing their algorithms to buy or sell the stock milliseconds before the rest of the world reacts.

## 2. High-Frequency Trading (HFT)

A major sub-domain of Quantitative Finance is HFT. 
HFT algorithms do not hold stocks for years; they hold them for microseconds. The algorithms act as market makers, providing liquidity and making fractions of a penny on millions of trades per second.
This is a domain of extreme low-latency engineering. Quants write code in highly optimized C++ or program logic directly into hardware **FPGAs** (Field Programmable Gate Arrays) because the time it takes an electric signal to travel through a standard CPU architecture is considered "too slow."

## 3. Risk Management

Quants don't just predict profits; they mathematically model catastrophe.
Using **Value at Risk (VaR)** models, computational finance algorithms simulate worst-case scenarios (e.g., "What happens to our portfolio if oil drops 20% and the Euro crashes simultaneously?"). If the algorithmic risk crosses a specific threshold, the computers will autonomously hedge the portfolio by automatically buying insurance (options) in the derivatives market.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.3 Geographic Systems/Satellite imagery analysis/index.mdx': `---
title: Satellite Imagery Analysis
description: "The computational extraction of meaningful information from raw pixel data captured by earth-observation satellites, heavily utilizing computer vision."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Satellite Imagery Analysis"
  subtitle="Computer Vision from Orbit"
  tags={['GIS', 'Computer Vision', 'Machine Learning', 'Big Data']}
>

Satellites generate petabytes of images of the Earth every single day. Human analysts cannot possibly look at all of it. **Satellite Imagery Analysis** is the specialized application of Computer Vision and Deep Learning designed to autonomously extract data from massive geospatial rasters.

## 1. The Data Structure (Rasters)

Unlike a standard iPhone photo (which just has Red, Green, and Blue channels), satellite imagery is **Multispectral**. 
A single pixel might contain 10 different bands of data, including Near-Infrared (NIR) and Shortwave-Infrared (SWIR). This means a satellite image isn't just a picture; it is a massive 3D matrix of scientific data. By mathematically combining these invisible bands, algorithms can detect things human eyes cannot see, like the exact moisture content of a cornfield.

## 2. Convolutional Neural Networks (CNNs)

The primary tool for analyzing this data is the **CNN**. 
- **Semantic Segmentation**: Algorithms like U-Net are trained to classify every single pixel in a satellite image. They can take an image of a city and autonomously draw perfect vector polygons around every single building footprint, road, and tree.
- **Object Detection**: CNNs are used to count discrete objects from space, such as counting the number of cargo ships in a port, or tracking the migration of elephant herds in Africa.

## 3. Change Detection (Temporal Analysis)

Because satellites pass over the exact same spot on Earth every few days, computers can perform **Automated Change Detection**.
By perfectly aligning an image from Monday and an image from Thursday, the algorithm subtracts the matrices. The AI can instantly alert human operators to illegal deforestation in the Amazon, the construction of new military bases, or the exact spread of a wildfire over 24 hours.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/61. Applied - Specialized CS Domains/61.2 Computational Finance/Market microstructure/index.mdx': `---
title: Market Microstructure
description: "The study of the extremely low-level mechanics of how financial exchanges operate, focusing on the order book, latency, and how individual trades impact prices."
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'
import { Callout } from '@/features/kb/components/mdx/Callout'

<ConceptTemplate
  title="Market Microstructure"
  subtitle="The Engineering of a Stock Exchange"
  tags={['Computational Finance', 'Systems Design', 'Algorithms', 'HFT']}
>

When a normal person buys a stock on an app, they just see a price and click "Buy." 
**Market Microstructure** is the study of what happens under the hood. It is the deep computer science and engineering of the actual matching engines running on the servers at the New York Stock Exchange.

## 1. The Limit Order Book (LOB)

Exchanges do not have a single "price." They have an **Order Book**.
The Order Book is a massive, real-time data structure (usually implemented as a combination of Hash Maps and Doubly Linked Lists or Red-Black Trees).
- It contains a list of every single person offering to sell the stock (Asks) and every person offering to buy (Bids).
- The "Spread" is the gap between the highest Bid and lowest Ask.
- When an algorithm submits a "Market Order", the exchange's matching engine traverses the data structure, instantly matching the buyer with the lowest available Ask, deleting that node from the tree.

## 2. Market Impact

If a massive hedge fund algorithm wants to buy 1,000,000 shares of Apple, it cannot just submit one massive order. Doing so would instantly consume all the liquidity in the Order Book, driving the price up astronomically (slippage).
Algorithms use Microstructure theory to execute **Iceberg Orders** or **TWAP (Time-Weighted Average Price)**. The algorithm mathematically slices the massive order into 10,000 microscopic orders, drip-feeding them into the exchange over 4 hours to remain invisible and prevent moving the market price.

<Callout type="warning" title="Colocation and Latency">
  In Market Microstructure, the speed of light is a limiting factor. High-Frequency Trading firms pay millions of dollars for "Colocation"—the right to place their physical servers in the exact same data center room as the Nasdaq matching engine. By using fiber optic cables that are exactly equal in length, they guarantee their algorithm's network request reaches the exchange microseconds faster than their competitors.
</Callout>

</ConceptTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)
    
    // Fix MDX brace parsing issues inside math blocks
    finalContent = finalContent.replace(/\\\\\\{/g, '\\\\lbrace ').replace(/\\\\\\}/g, '\\\\rbrace ')
    
    // Enforce Unix line endings
    finalContent = finalContent.replace(/\r\n/g, '\n')
    
    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
