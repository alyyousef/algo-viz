import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/32. Computer Vision/Object detection/index.mdx': `---
title: Object Detection
description: A fundamental computer vision task requiring an AI model to simultaneously mathematically classify multiple objects in an image and calculate exact geometric bounding boxes around them.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Object Detection">

Image Classification answers *"What is in this picture?"* Object Detection answers *"Where exactly is everything in this picture?"* It mathematically unifies Classification (categorical math) with Regression (spatial math).

## 1. The Regression Problem
To draw a bounding box, the network cannot output a category; it must output continuous physical coordinates. 
The AI mathematically predicts four exact numbers for every object: $[x, y, w, h]$.
- $x, y$: The coordinates of the center of the box.
- $w, h$: The width and height of the box relative to the image size.
During training, the loss function mathematically penalizes the network if its predicted coordinate is physically far away from the human-labeled Ground Truth box, forcing the network to perfectly align its geometric predictions with physical reality.

## 2. One-Stage vs. Two-Stage Detectors
- **Two-Stage (Faster R-CNN)**: Stage 1 mathematically guesses 1,000 places where an object *might* be (Region Proposals). Stage 2 crops those regions and classifies them. Extremely accurate, but mathematically slow.
- **One-Stage (YOLO, SSD)**: Mathematically divides the entire image into a dense physical grid (e.g., $13 \\times 13$). Every single cell in the grid mathematically predicts bounding boxes and classifications simultaneously in a single forward pass. Less accurate on tiny objects, but mathematically capable of running at 120 FPS for real-time video processing.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/OCR/index.mdx': `---
title: Optical Character Recognition (OCR)
description: The specialized algorithmic and deep learning process of mathematically extracting semantic, machine-readable ASCII text from raw pixels in photographs or scanned documents.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Optical Character Recognition (OCR)">

A human sees a stop sign and instantly reads "STOP". A computer only sees a matrix of red and white pixels. OCR is the mathematical bridge that converts physical pixel geometry back into semantic text.

## 1. The Tesseract Pipeline (Traditional OCR)
Traditional OCR (like the famous Tesseract engine) relies on strict mathematical heuristics. 
1. **Binarization**: The image is mathematically forced into pure black and white to isolate the ink from the paper.
2. **Line and Word Finding**: The algorithm projects mathematical histograms horizontally and vertically to find the physical whitespace separating lines and words.
3. **Pattern Matching**: The algorithm crops a single character and mathematically compares its pixel geometry against a hardcoded database of fonts. It is incredibly fast but fails catastrophically if the text is handwritten, rotated, or partially obscured.

## 2. CRNNs (Deep Learning OCR)
Modern OCR uses **Convolutional Recurrent Neural Networks (CRNNs)**.
Instead of trying to isolate single characters (which is impossible in cursive writing), the network reads the entire word simultaneously. 
A CNN mathematically extracts the visual features of the word. Those features are passed into a sequential RNN (LSTM). The RNN mathematically predicts a sequence of characters over time. Because the RNN has "memory," it uses mathematical linguistic context to fix errors (e.g., if the CNN isn't sure if a pixel is an 'l' or a '1', the RNN knows the word is likely "Hello", not "He11o").

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/OpenCV/index.mdx': `---
title: OpenCV (Open Source Computer Vision Library)
description: The industry-standard, highly optimized C++ mathematical library that provides the foundational algorithms for real-time image processing, camera calibration, and classic computer vision.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate
  title="OpenCV"
  subtitle="The Standard Library of Vision"
  tags={['Computer Vision', 'C++', 'Python', 'Library']}
>

While PyTorch and TensorFlow handle the Neural Networks, OpenCV handles the raw physics of the image. It is the mathematical plumbing underlying almost every computer vision application in existence.

## 1. Matrix Operations (cv::Mat)
The foundational mathematical object in OpenCV is the **Mat** (Matrix). 
An image is not a file; it is an $N$-dimensional array of bytes. OpenCV provides hyper-optimized, hardware-accelerated (SIMD/CUDA) functions to physically manipulate this matrix. 
If you need to rotate a 4K image 90 degrees, you do not write a TICK1forTICK1 loop in Python (it would take seconds). You call TICK1cv2.rotate()TICK1, which drops down to C++ and executes the affine transformation mathematics in milliseconds.

## 2. Camera Calibration and Physics
OpenCV provides the core mathematical equations for physical camera optics. 
Every physical camera lens has geometric distortion (fisheye effect). If you use a distorted camera for autonomous driving, the math calculating the distance to a pedestrian will be fatally wrong. 
OpenCV uses the **Checkerboard Algorithm**. You show the camera a perfectly square checkerboard. OpenCV mathematically measures the physical warping of the squares in the pixels, calculates a massive **Distortion Matrix**, and applies a mathematical transformation to physically un-warp every future frame coming out of that lens in real-time.

</TechnologyTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Pose estimation/index.mdx': `---
title: Pose Estimation
description: The highly complex AI task of mathematically locating and connecting the physical biomechanical keypoints (joints) of a human body in 2D or 3D space from a standard image or video.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Pose Estimation">

If you want to track an athlete's golf swing, you don't need to segment the pixels of their shirt. You need the exact spatial coordinates of their wrists, elbows, and shoulders. 

## 1. Top-Down vs. Bottom-Up Approaches
- **Top-Down (Two-Stage)**: First, an Object Detector (like YOLO) mathematically finds the person and crops a bounding box. Then, a second network analyzes the cropped box to find the joints. It is highly accurate but mathematically scales linearly with the number of people; if there are 50 people in the crowd, it runs 50 times slower.
- **Bottom-Up (Single-Stage)**: The AI (like OpenPose) mathematically searches the entire uncropped image for *all* joints simultaneously (finding 50 left elbows and 50 left wrists). It then uses a mathematical graph algorithm (Part Affinity Fields) to figure out which elbow physically connects to which wrist. This is much harder to train but mathematically runs at the same speed regardless of how many people are in the frame.

## 2. Heatmap Regression
To predict where a wrist is, the network does not output a raw $[x, y]$ coordinate.
Instead, it outputs a **Heatmap** (a 2D matrix representing the physical image). The matrix is entirely 0, except for a mathematically smooth 2D Gaussian curve peaking at 1.0 exactly where the wrist is. Predicting a physical Heatmap provides a much smoother, more stable mathematical gradient during backpropagation than trying to predict raw integer coordinates.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/R-CNN/index.mdx': `---
title: R-CNN (Region-Based Convolutional Neural Networks)
description: The seminal 2014 architecture that birthed modern Deep Learning Object Detection by mathematically combining traditional region proposals with the feature-extracting power of Convolutional Networks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="R-CNN (Region-Based CNN)">

Before R-CNN, object detection relied on terrible, hand-coded features (like HOG or SIFT). R-CNN proved that Neural Networks could dominate spatial object detection, though its original mathematical implementation was incredibly slow.

## 1. The Two-Stage Architecture
R-CNN physically separated the problem into two distinct mathematical steps:
1. **Region Proposal**: It used a traditional, non-AI algorithm (Selective Search) to mathematically analyze the pixels and group them by color and texture, proposing 2,000 bounding boxes where an object *might* exist.
2. **Feature Extraction & Classification**: The system physically cropped those 2,000 boxes out of the image, resized them to a uniform square, and fed every single one independently through a massive Convolutional Neural Network to extract features, finally using an SVM to classify them.

## 2. The Mathematical Bottleneck
R-CNN was accurate, but it was a computational nightmare.
Because it mathematically forced 2,000 independent crops through a massive CNN, it required 2,000 separate forward passes for a *single image*. It took nearly a minute to process one frame. 
This architectural flaw led directly to the invention of Fast R-CNN and Faster R-CNN, which solved the bottleneck by mathematically running the CNN *once* on the entire image, and then extracting the 2,000 regions from the resulting feature map, reducing the mathematical redundant computation to zero.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Semantic segmentation/index.mdx': `---
title: Semantic Segmentation
description: A dense computer vision task that mathematically classifies every single pixel in an image into a specific category (e.g., Road, Sky, Car) without distinguishing between individual objects.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Semantic Segmentation">

A self-driving car does not just need a bounding box around a pedestrian. It needs to know the exact physical boundaries of the drivable road, pixel by pixel.

## 1. The Fully Convolutional Network (FCN)
Standard CNNs end with a "Fully Connected" (Dense) layer that crushes the spatial 2D image into a flat 1D array to output a single word ("Dog").
Segmentation architectures (like FCN) physically delete the Dense layer. They are mathematically constructed entirely of Convolutions. Instead of outputting a single word, the network outputs a massive 2D matrix that is the exact same physical size as the input image. If the input is $1080 \\times 1920$, the output is a $1080 \\times 1920$ matrix where the mathematical value of every cell corresponds to a specific class ID (e.g., $1 = Road$, $2 = Sky$).

## 2. The Problem of Spatial Loss
As an image passes through a CNN, it is mathematically shrunk (Max Pooling) to extract high-level features. A 1080p image is compressed to a tiny 32x32 feature map.
If you try to mathematically blow that 32x32 map back up to 1080p to generate the final segmentation mask, the edges will be horribly blurred because the spatial data was destroyed. Architectures like **U-Net** solve this using **Skip Connections**, which mathematically wire the high-resolution edges from the early layers directly into the final upscaling layers, perfectly restoring spatial precision.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/SLAM (vision-based)/index.mdx': `---
title: V-SLAM (Visual Simultaneous Localization and Mapping)
description: The highly advanced mathematical algorithm that allows a robot or AR headset to use a single camera to build a 3D map of an unknown environment while simultaneously tracking its exact physical location within that map.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="V-SLAM (Visual SLAM)">

If a drone wakes up in an unknown room, it has two problems: It needs a 3D Map of the room so it doesn't crash, and it needs to know its exact $(X,Y,Z)$ coordinates on that map. V-SLAM solves both mathematical problems simultaneously in real-time.

## 1. Feature Tracking and Odometry
As the camera moves, the SLAM algorithm extracts mathematically distinct physical features (corners of tables, patterns on the wall) using algorithms like ORB or SIFT. 
By tracking exactly how many pixels these features move between Frame 1 and Frame 2, the algorithm mathematically calculates the physical motion vector of the camera lens (Visual Odometry). It deduces, *"The camera just moved 2 inches forward and rotated 5 degrees right."*

## 2. Loop Closure and Graph Optimization
Visual Odometry suffers from mathematical drift. If the math is off by 0.1% every frame, after 10 minutes, the drone will think it is in the next room.
SLAM solves this with **Loop Closure**. The algorithm mathematically memorizes the visual fingerprint of the room. If the drone flies in a circle and sees the starting wall again, the algorithm mathematically recognizes it. It realizes, *"I am back where I started, but my coordinates say I am 5 feet away."* It then executes a massive mathematical algorithm (Bundle Adjustment) to snap the entire 3D map and the flight trajectory back into physical alignment, eliminating the drift entirely.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/SSD/index.mdx': `---
title: SSD (Single Shot MultiBox Detector)
description: A groundbreaking One-Stage Object Detection architecture that achieved real-time performance by mathematically predicting bounding boxes from multiple feature maps at varying spatial resolutions.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="SSD (Single Shot MultiBox Detector)">

YOLO proved that One-Stage detection was blazingly fast. However, early YOLO struggled massively with tiny objects. SSD mathematically solved this scale problem without sacrificing real-time speed.

## 1. The Multi-Scale Feature Maps
In a standard CNN, the image gets mathematically smaller as it passes through the layers. 
- Early layers: High resolution (e.g., $38 \\times 38$ grid), but only understand simple edges.
- Late layers: Low resolution (e.g., $1 \\times 1$ grid), but understand complex concepts like "Car".
YOLO v1 only mathematically predicted bounding boxes from the very final, lowest-resolution layer. This made it mathematically impossible for it to detect a tiny bird taking up only 5 pixels.
SSD fixed this by mathematically attaching bounding box predictors to *multiple layers simultaneously*. 

## 2. Scale-Specific Detection
In SSD, the $38 \\times 38$ early layer is mathematically forced to predict tiny objects (because it still retains high spatial resolution). The $1 \\times 1$ final layer is mathematically forced to predict massive objects that take up the whole screen. 
By distributing the mathematical burden of detection across different spatial scales of the neural network, SSD achieved the real-time frame rates of YOLO while matching the high accuracy of the much slower Faster R-CNN on small objects.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/U-Net/index.mdx': `---
title: U-Net
description: The most famous architecture in biomedical image segmentation, uniquely designed with symmetrical mathematical skip connections to output pixel-perfect masks even when trained on extremely tiny datasets.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="U-Net">

Invented in 2015 for finding tumors in medical scans, U-Net revolutionized Semantic Segmentation. It proved that you can mathematically force a neural network to retain razor-sharp edge data during the decoding phase.

## 1. The "U" Architecture
The network is physically shaped like a "U".
- **The Encoder (Left Side)**: The image goes down. It passes through Convolutions and Max Pooling. The spatial resolution shrinks (e.g., $512 \\rightarrow 256 \\rightarrow 128$), but the mathematical feature depth increases (it learns *what* the tumor looks like, but forgets *where* the edges are).
- **The Decoder (Right Side)**: The image goes up. It uses Transposed Convolutions to mathematically blow the 128x128 image back up to 512x512.

## 2. The Skip Connections
If you just upscale the image on the Right Side, the tumor mask will be a blurry circle. 
U-Net's genius is the **Skip Connection**. It takes the high-resolution, razor-sharp edge data from the Left Side and mathematically concatenates it directly across the "U" to the corresponding layer on the Right Side. 
When the network is upscaling the mask, it is mathematically forced to look at the original, uncompressed physical edges of the image. This guarantees that the final generated segmentation mask conforms perfectly to the exact physical geometry of the cell or tumor.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Vision Transformers (ViT)/index.mdx': `---
title: Vision Transformers (ViT)
description: A paradigm-shifting architecture that proved the Transformer—originally designed for natural language—can mathematically dominate Convolutional Neural Networks (CNNs) in pure Computer Vision tasks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Vision Transformers (ViT)">

For a decade, CNNs (ResNet, VGG) were the undisputed kings of vision. They mathematically forced the AI to look at localized patches (convolutions). Vision Transformers destroyed this assumption, proving that massive Attention mechanisms are superior.

## 1. Patches as Words (Tokens)
A Transformer expects a sequence of words (Tokens). You cannot feed it a sequence of 3 million pixels; the $O(N^2)$ mathematical complexity of the Attention mechanism will instantly exhaust all VRAM.
ViT solves this by mathematically chopping the image into a grid of 16x16 pixel squares (**Patches**). 
It flattens each $16 \\times 16$ patch into a 1D Vector, exactly as if it were a word in a sentence. It then feeds this sequence of Patches directly into a standard NLP Transformer.

## 2. Global vs. Local Receptive Fields
A CNN is mathematically nearsighted. A filter only looks at a 3x3 grid. To understand that a dog's head is connected to a dog's tail, the CNN must stack 50 layers to mathematically widen its "Receptive Field."
A Vision Transformer has a **Global Receptive Field** from Layer 1. The mathematical Attention mechanism immediately calculates the relationship between Patch 1 (top left corner) and Patch 256 (bottom right corner). This allows ViT to learn global spatial patterns much faster. However, because ViT lacks the hardcoded "inductive bias" of a CNN, it requires astronomically more data (hundreds of millions of images) to mathematically deduce the basic physics of the visual world.

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
