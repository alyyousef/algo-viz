import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/27. Natural Language Processing/POS tagging/index.mdx': `---
title: Part-of-Speech (POS) Tagging
description: The foundational NLP task of mathematically assigning a grammatical category (Noun, Verb, Adjective) to every single word in a sentence based on its contextual meaning.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Part-of-Speech Tagging">

If a computer sees the word "book," is it a Noun (a physical object) or a Verb (to reserve a flight)? POS Tagging provides the mathematical context required for higher-level AI.

## 1. The Sequence Labeling Problem
Like Named Entity Recognition (NER), POS Tagging is mathematically modeled as a Sequence Labeling problem. 
The algorithm reads a sentence and outputs a parallel mathematical array of tags (usually based on the Penn Treebank Tagset).
Sentence: "I book the book."
Tags: TICK1[PRP, VBP, DT, NN]TICK1 (Pronoun, Verb, Determiner, Noun).

## 2. Hidden Markov Models (HMM)
Before Neural Networks, POS Tagging was dominated by Hidden Markov Models (HMMs). 
An HMM mathematically calculates two probabilities:
1. **Emission Probability**: What is the probability that the mathematical tag "Noun" emits the physical word "book"?
2. **Transition Probability**: What is the probability that a "Noun" tag immediately follows a "Determiner" (the) tag?
Using the Viterbi Algorithm, the system mathematically calculates the single most probable sequence of tags for the entire sentence, successfully deciphering that the second "book" is a noun because it follows "the." Modern systems use Bi-directional LSTMs or Transformers to achieve near-perfect mathematical accuracy on this task.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Question answering/index.mdx': `---
title: Question Answering (QA)
description: A highly advanced NLP architecture where an AI mathematically processes a natural language question and extracts or generates the precise factual answer from a text corpus.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Question Answering">

When you ask Google "When was Abraham Lincoln born?", it doesn't give you 10 blue links; it mathematically extracts the exact date (Feb 12, 1809). This requires complex QA architectures.

## 1. Extractive QA
In Extractive QA (like the famous SQuAD dataset task), the AI is given a Question and a Paragraph of text.
The Neural Network (usually BERT) mathematically reads both. Instead of generating a new sentence, the network is trained to mathematically predict exactly two numbers: the **Start Index** and the **End Index** of the answer within the provided paragraph. It literally highlights the text. If the mathematical probability of the Start Index is low across the entire paragraph, the model concludes that the answer is not present in the text.

## 2. Generative QA (RAG)
Modern Generative QA (like ChatGPT) doesn't just extract text; it synthesizes it. 
However, raw Generative models hallucinate. The industry standard solution is **Retrieval-Augmented Generation (RAG)**. 
First, the system mathematically converts your question into a Vector and searches a massive database to retrieve relevant facts. Second, it mathematically injects those retrieved facts into the prompt of a Generative AI. The AI then synthesizes a perfectly grammatical, mathematically constrained answer based *only* on the provided facts, preventing hallucinations.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Sentiment analysis/index.mdx': `---
title: Sentiment Analysis
description: The mathematical process of classifying the emotional polarity (Positive, Negative, Neutral) of unstructured text, widely used in finance and marketing.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sentiment Analysis">

If a company releases a new phone, they cannot physically read 10 million tweets to see if people like it. They use Sentiment Analysis to mathematically aggregate the emotional tone of the internet.

## 1. The Classification Math
At its core, Sentiment Analysis is a binary (or multi-class) mathematical classification problem. 
A text document is converted into a Vector (using TF-IDF or Word Embeddings). That Vector is fed into a Machine Learning model (like Logistic Regression or a Transformer). The model mathematically outputs a float between 0.0 (Extremely Negative) and 1.0 (Extremely Positive). 

## 2. The Sarcasm Problem
Simple Bag-of-Words models fail catastrophically at Sentiment Analysis because of human sarcasm.
"I absolutely loved waiting 4 hours in the rain for this product!"
A dumb algorithm sees "loved" and mathematically scores the sentence as Highly Positive.
Modern models (like BERT) mathematically process the *Context* (waiting 4 hours in the rain). By analyzing the contradiction between the positive verb and the negative context, the Neural Network mathematically deduces sarcasm and correctly classifies the sentence as Highly Negative.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Sequence models/index.mdx': `---
title: Sequence Models
description: Specialized Neural Network architectures mathematically designed to process temporal, ordered data (like text or audio) where the sequence of inputs fundamentally alters the meaning.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Sequence Models">

A standard Neural Network (Feed-Forward) assumes every input is mathematically independent. If you feed it the word "Not", it has no memory of the word "Happy" that came before it. Sequence Models possess mathematical Memory.

## 1. Recurrent Neural Networks (RNN)
An RNN processes a sentence one word at a time, from left to right.
When it reads word #2, it mathematically combines the Vector for word #2 with the **Hidden State** (the mathematical memory) generated from word #1. This allows the network to maintain a running mathematical summary of the sentence. 
However, standard RNNs suffer from the **Vanishing Gradient Problem**. During Backpropagation, the mathematical gradients multiply. If the sentence is 50 words long, the gradient mathematically shrinks to exactly 0, causing the network to completely "forget" the beginning of the sentence.

## 2. LSTM (Long Short-Term Memory)
To fix the Vanishing Gradient, engineers invented the LSTM.
An LSTM introduces mathematical "Gates" (Forget Gate, Input Gate, Output Gate). These gates act as microscopic bouncers, using Sigmoid math (0 or 1) to explicitly decide whether a piece of memory should be kept or deleted. This allows LSTMs to mathematically hold onto important context for hundreds of words, solving the memory bottleneck of early sequence models.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Speaker diarization/index.mdx': `---
title: Speaker Diarization
description: The advanced audio-processing algorithm that mathematically answers the question "Who spoke when?" by clustering audio segments based on unique human vocal biometrics.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Speaker Diarization">

If you pass a 1-hour audio recording of a board meeting into a Speech-to-Text engine, you get a massive block of text. To be useful, the text must be mathematically split and assigned to Speaker 1, Speaker 2, etc. This is Diarization.

## 1. Acoustic Feature Extraction
The algorithm does not care what words are being spoken; it only cares about the physical physics of the voice.
It breaks the audio into tiny 20-millisecond frames. For each frame, it mathematically calculates the **Mel-Frequency Cepstral Coefficients (MFCCs)**. These coefficients are a mathematical representation of the physical shape of the speaker's vocal tract. 

## 2. Clustering (The i-Vector)
Once the audio is converted into thousands of mathematical vectors, the algorithm uses unsupervised clustering (like Gaussian Mixture Models or K-Means). 
It mathematically groups the vectors. If 400 frames map to a very similar vocal tract shape, the algorithm clusters them and labels them "Speaker A." If the vocal tract shape mathematically shifts, it creates a new cluster "Speaker B." It then overlays these clusters onto a timeline, generating a precise mathematical log of exactly when each person started and stopped speaking.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Speech-to-text/index.mdx': `---
title: Speech-to-Text (ASR)
description: Automatic Speech Recognition (ASR) is the complex AI pipeline that mathematically translates raw acoustic audio waves into structured, human-readable text.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Speech-to-Text (ASR)">

An audio file is mathematically just a massive array of numbers representing the physical air pressure hitting a microphone 44,100 times a second. ASR converts these physics into words.

## 1. The Acoustic Model
The first step is mathematically converting the raw waveform into a Spectrogram (a visual heat map of audio frequencies over time).
The Acoustic Model (a Neural Network) scans the Spectrogram. It does not try to predict words; it mathematically predicts **Phonemes** (the foundational sounds of human speech, like "ah", "ee", "ch"). It outputs a mathematical probability distribution for every phoneme at every millisecond of audio.

## 2. The Language Model and CTC
The Acoustic model might predict that the sounds were "r-eh-k-ah-g-n-ay-z-s-p-ee-ch".
The **Language Model** takes over. It uses NLP mathematics to figure out what English words those phonemes represent. Does it mean "wreck a nice beach" or "recognize speech"? By mathematically calculating the statistical probability of those phrases occurring in the English language, it corrects the acoustic errors. 
Modern systems (like OpenAI's Whisper) use End-to-End Deep Learning, completely merging the Acoustic and Language models into a single massive Transformer network.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Stemming/index.mdx': `---
title: Stemming
description: A fast, mathematically primitive algorithm that uses hardcoded heuristic rules to chop the suffixes and prefixes off words to normalize text.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Stemming">

Before the invention of deep learning and complex Lemmatization dictionaries, search engines needed a mathematically cheap way to normalize text so that searching for "running" would also find documents containing "run."

## 1. The Porter Stemmer Algorithm
The most famous stemming algorithm was invented by Martin Porter in 1980.
It does not use AI; it uses a rigid sequence of mathematical Regex string-replacements. 
For example, a rule might state: TICK1If a word ends in "sses", replace it with "ss"TICK1 (e.g., "caresses" -> "caress"). 
Another rule: TICK1If a word ends in "ing", delete "ing"TICK1.

## 2. Over-stemming and Under-stemming
Because Stemming is mathematically blind to context, it causes catastrophic linguistic errors.
- **Over-stemming**: The algorithm chops off too much. It might stem both "University" and "Universe" down to "Univers." A search engine will now mathematically conflate the two concepts, returning articles about outer space when you search for college.
- **Under-stemming**: The algorithm fails to chop enough. It might stem "Data" to "Data" but "Datum" to "Datum", failing to mathematically recognize that they are the singular and plural forms of the exact same concept. 

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Summarisation (extractive/index.mdx': `---
title: Extractive Summarization
description: A computationally efficient NLP technique that mathematically scores the importance of every sentence in a document and simply copies the top N sentences to form a summary.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Extractive Summarization">

Unlike Abstractive Summarization (which requires a massive AI to write brand new text), Extractive Summarization acts like a student with a yellow highlighter. It mathematically identifies the most important sentences and copies them verbatim.

## 1. Sentence Scoring (TF-IDF)
To figure out which sentences are important, the algorithm mathematically scores them.
It calculates the TF-IDF (Term Frequency - Inverse Document Frequency) of every word in the document. Words that appear frequently in this document, but rarely in other documents, receive a massively high mathematical score (they are "keywords"). 
The algorithm then mathematically sums the scores of all the words in a sentence. A sentence containing 5 keywords gets a much higher score than a sentence containing mostly "the" and "and."

## 2. Graph-Based Ranking (TextRank)
A more advanced mathematical approach is TextRank (derived from Google's PageRank).
Every sentence in the document becomes a Node in a mathematical Graph. If two sentences share similar vocabulary, an Edge is drawn between them. Sentences that share vocabulary with many other sentences are mathematically calculated to be the "central hubs" of the document's meaning. The algorithm ranks the Nodes by their mathematical centrality and extracts the top 3 as the final summary.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Text classification/index.mdx': `---
title: Text Classification
description: The fundamental machine learning task of mathematically analyzing an unstructured document and assigning it to one or more predefined categorical labels.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Text Classification">

Text Classification is the foundational mathematics behind Spam Filtering, Sentiment Analysis, and Topic Routing (e.g., automatically sending customer support emails to the correct department).

## 1. Feature Extraction
A Neural Network cannot mathematically process the string "Buy cheap pills now!" 
The text must be mathematically vectorized. Traditionally, this was done using Bag-of-Words or TF-IDF. Today, it is done by passing the text through an Embedding model (like BERT), which mathematically converts the entire paragraph into a dense 768-dimensional float vector that captures the semantic meaning of the text.

## 2. The Classifier Model
Once the text is a mathematical vector, it is passed into a Classifier algorithm.
- **Naive Bayes**: A mathematically lightweight statistical algorithm based on Bayes' Theorem. It calculates: "Given that the word 'pills' is in this email, what is the mathematical probability that this email belongs to the 'Spam' category?"
- **Deep Learning**: The 768-dimensional vector is passed into a Feed-Forward Neural Network, terminating in a **Softmax** layer. The Softmax layer mathematically forces the output probabilities across all categories (e.g., Tech, Sports, Politics) to sum to exactly 1.0 (100%), allowing the system to confidently predict the most likely label.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/27. Natural Language Processing/Text-to-speech/index.mdx': `---
title: Text-to-Speech (TTS)
description: The highly complex AI process of mathematically synthesizing human-like acoustic waveforms from raw text, accounting for emotion, cadence, and pronunciation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Text-to-Speech">

Early TTS systems (like Microsoft Sam) were mathematically primitive. They simply took pre-recorded audio snippets of human phonemes and violently concatenated them together, resulting in a robotic, soulless voice. Modern TTS mathematically synthesizes the audio from scratch.

## 1. Text Normalization and Grapheme-to-Phoneme
First, the AI must mathematically normalize the text. If it sees "I owe him $5", it must convert it to "I owe him five dollars." 
Next, it uses a Grapheme-to-Phoneme (G2P) mathematical model. It translates English letters (which have terrible, inconsistent spelling rules) into absolute phonetic representations (e.g., the International Phonetic Alphabet), ensuring the AI knows exactly how the word physically sounds.

## 2. The Mel-Spectrogram and Vocoder
The AI does not mathematically generate audio directly. 
It uses a Sequence-to-Sequence neural network (like Tacotron 2) to translate the Phonemes into a **Mel-Spectrogram** (a visual, mathematical image of what the audio frequencies should look like). 
Finally, a massive Neural Vocoder (like DeepMind's WaveNet) takes that mathematical image and mathematically calculates the exact physical air pressure amplitude required for every single audio sample (44,100 times a second), producing indistinguishable-from-human speech.

</ConceptTemplate>
`
}

async function main() {
  for (const [filePath, content] of Object.entries(contentMap)) {
    const fullPath = path.resolve(filePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    
    // Safely replace TICK1 and TICK3 placeholders with actual backticks
    let finalContent = content.replace(/TICK3/g, TICK3).replace(/TICK1/g, TICK1)
    
    // Append a safe newline
    await fs.writeFile(fullPath, finalContent.trim() + '\n', 'utf-8')
    console.log('Wrote ' + filePath)
  }
}

main().catch(console.error)
