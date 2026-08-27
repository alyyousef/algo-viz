import fs from 'fs/promises'
import path from 'path'

const TICK3 = '```'
const TICK1 = '`'

const contentMap = {
  'src/features/kb/routes/KB/32. Computer Vision/CNNs/index.mdx': `---
title: Convolutional Neural Networks (CNNs)
description: The foundational deep learning architecture of Computer Vision that mathematically detects visual patterns by sliding filters across a pixel matrix to extract hierarchical spatial features.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Convolutional Neural Networks (CNNs)">

If you feed a 1080p image into a standard Neural Network, it requires 2 million input neurons. The math instantly breaks. CNNs solve this by not looking at the whole image at once; they look at tiny patches using Convolutions.

## 1. The Convolution Operation
A Convolution is a mathematical matrix multiplication. 
The network learns a **Filter** (a tiny 3x3 grid of numbers). It physically slides this Filter across the massive 1080p image pixel by pixel (the Stride). At every step, it mathematically multiplies the Filter numbers by the underlying pixel values and sums them. 
If the Filter is mathematically optimized to detect vertical lines, the output of the Convolution will physically highlight every vertical line in the image, ignoring the rest.

## 2. Hierarchical Feature Extraction
A CNN stacks dozens of these Convolutional layers on top of each other, interspersed with **Pooling layers** (which mathematically shrink the image to save RAM).
- Layer 1 detects raw edges and colors.
- Layer 5 combines edges to detect shapes (circles, squares).
- Layer 20 combines shapes to detect complex textures (fur, scales).
- Layer 50 combines textures to detect "Dog."
This mathematical hierarchy perfectly mirrors how the human visual cortex processes light from the retina.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Depth estimation/index.mdx': `---
title: Depth Estimation (Monocular)
description: The highly complex AI process of mathematically predicting the 3D distance of every object in a scene using only a single, flat 2D image without stereo cameras or LiDAR.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Depth Estimation (Monocular)">

A single photograph mathematically destroys depth. A small car up close and a massive truck far away take up the exact same amount of pixels. Monocular Depth Estimation forces an AI to hallucinate the missing Z-axis based purely on visual context.

## 1. Visual Cues and Deep Learning
To estimate depth from one lens, a Neural Network (often a U-Net or a Vision Transformer) mathematically learns to detect the same physical cues humans use:
- **Occlusion**: If Object A blocks Object B, Object A is closer.
- **Perspective**: Parallel lines mathematically converge in the distance.
- **Texture Gradients**: Textures become mathematically denser and blurrier the further away they are.
The AI processes the 2D image and outputs a **Depth Map**, where the physical value of every pixel is a float representing its estimated distance in meters from the camera lens.

## 2. Self-Supervised Training
Historically, training these networks required strapping expensive LiDAR rigs to cars to get absolute "Ground Truth" depth data. 
Modern models use **Self-Supervised Learning**. You mount two cheap cameras on a car (stereo). You only train the network to look at the Left camera, but you mathematically penalize the network by forcing it to try and reconstruct the image from the Right camera. To successfully synthesize the Right image, the network *must* mathematically figure out the depth of the objects. Once trained, you throw away the Right camera, and the AI can estimate depth perfectly from a single lens.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/DETR/index.mdx': `---
title: DETR (DEtection TRansformer)
description: A groundbreaking architecture by Meta that mathematically eliminated the need for complex, hand-coded heuristics in Object Detection by treating the problem as a pure sequence-to-sequence translation.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="DETR (DEtection TRansformer)">

Before DETR, object detection networks (like YOLO or Faster R-CNN) were plagued by manual engineering. They mathematically predicted 10,000 bounding boxes and used a hand-coded algorithm (NMS) to delete the duplicates. DETR completely destroyed this paradigm.

## 1. Object Detection as Set Prediction
DETR (Detection Transformer) treats finding objects like translating a sentence. 
It passes the image through a CNN to extract features, and then feeds those features directly into a standard **Transformer** (the same architecture that powers ChatGPT).
The Transformer is mathematically forced to output a fixed Set of exactly 100 predictions (e.g., 5 Cars, 3 People, and 92 "Nothing" tokens). 

## 2. Bipartite Matching Loss
Because the output is a Set, the math of how you penalize the network during training is incredibly complex. If the network outputs "Car" in slot 5, but the Ground Truth had "Car" in slot 12, is it wrong?
DETR uses the **Hungarian Algorithm** (Bipartite Matching). It mathematically calculates the optimal 1-to-1 matching between the 100 predictions and the actual objects in the image. Because the Transformer's Attention mechanism inherently looks at the *entire* image at once, it mathematically learns never to predict two bounding boxes for the exact same object. This completely eliminated the need for manual duplicate-deletion code, proving that pure Attention can solve spatial computer vision.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Facial recognition/index.mdx': `---
title: Facial Recognition
description: A biometric AI technology that mathematically extracts the unique geometrical structure of a human face and maps it to a dense vector embedding for instantaneous, high-security identification.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Facial Recognition">

You cannot just compare the pixels of Face A to Face B; shadows, glasses, or a slight turn of the head mathematically change every single pixel. Facial Recognition relies on extracting invariant geometric topology.

## 1. The Face Embedding
When an image is passed to a Facial Recognition network (like FaceNet), it first runs a fast detector to draw a bounding box around the face. It aligns the face (straightens the eyes). 
Then, a deep CNN mathematically compresses the physical structure of the face (the distance between the pupils, the depth of the eye sockets, the shape of the jawline) into a dense **128-dimensional Vector**. This vector is mathematically invariant to lighting or facial expressions.

## 2. Triplet Loss Training
How do you train a network to do this? You use **Triplet Loss**.
During training, the network is fed three images simultaneously:
1. **Anchor**: A picture of John.
2. **Positive**: A different picture of John (different lighting).
3. **Negative**: A picture of Bob.
The mathematical Loss Function physically forces the network to adjust its weights so that the Distance between the Anchor Vector and the Positive Vector shrinks, while simultaneously forcing the Distance between the Anchor Vector and the Negative Vector to expand. In production, to unlock a phone, the system simply checks if the Cosine Similarity between the stored Vector and the camera Vector crosses a strict mathematical threshold (e.g., 0.95).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Faster R-CNN/index.mdx': `---
title: Faster R-CNN
description: The industry-standard architecture for high-accuracy Object Detection that introduced the Region Proposal Network (RPN), drastically speeding up the mathematical process of finding objects in an image.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Faster R-CNN">

YOLO is incredibly fast but struggles with tiny objects. Faster R-CNN is slower but achieves absolute mathematical precision, making it the dominant architecture for medical imaging and satellite analysis.

## 1. The Region Proposal Network (RPN)
Early R-CNN models were mathematically glacial because they used a slow, manual algorithm (Selective Search) to guess where objects *might* be before analyzing them.
Faster R-CNN mathematically integrated the guessing directly into the neural network. As the image passes through the Convolutional layers, a specialized **Region Proposal Network (RPN)** slides across the feature map. At every location, it mathematically predicts multiple "Anchors" (boxes of varying sizes). It outputs a mathematical probability: "Is there *any* object inside this box?" 

## 2. ROI Pooling and Classification
If the RPN predicts a high probability that an object exists in a specific bounding box, it mathematically extracts that specific Region of Interest (ROI) from the feature map using **ROI Pooling** (cropping and resizing it to a fixed square). 
This square is then passed to the final Classification head, which mathematically determines exactly *what* the object is (e.g., "Malignant Tumor" - 98%). By mathematically unifying the Proposal phase and the Classification phase into a single, end-to-end differentiable network, Faster R-CNN achieved massive speedups without sacrificing its legendary accuracy.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Image embeddings/index.mdx': `---
title: Image Embeddings
description: The mathematical process of compressing a high-resolution, 2D matrix of raw pixels into a dense, 1D array of floating-point numbers representing the pure semantic concept of the image.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Image Embeddings">

A $1024 \\times 1024$ color image contains over 3 million raw numbers. If you want to build a "Reverse Image Search" engine (like Google Images), you cannot mathematically compare 3 million pixels to 10 billion images in real-time. You must use Embeddings.

## 1. The Bottleneck Layer
To create an Image Embedding, you pass the image through a pre-trained CNN (like ResNet50) or a Vision Transformer (ViT). 
Instead of looking at the final output layer (which predicts a specific class like "Dog"), you mathematically extract the data from the **Penultimate Layer** (the Bottleneck). By the time the pixels reach this layer, the neural network has mathematically stripped away the lighting, the background, and the camera angle, compressing the absolute essence of the object into a tiny array of 2,048 floating-point numbers.

## 2. Latent Space Search
Once you have mathematically compressed 10 billion images into 2,048-dimensional Vectors, you store them in a Vector Database. 
When a user uploads a new photo, the system mathematically embeds it into a Vector and performs a **Cosine Similarity** search. Because the Embedding represents pure semantic meaning, the system will successfully return images of the same object, even if the new photo is taken at night, from a completely different angle, and is heavily pixelated.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Image processing fundamentals/index.mdx': `---
title: Image Processing Fundamentals
description: The core mathematical and algorithmic techniques used to manipulate raw pixel matrices before they are ever fed into deep learning models, forming the backbone of traditional Computer Vision.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Image Processing Fundamentals">

Before Neural Networks existed, Computer Vision relied entirely on pure, hardcoded mathematics to extract information from pixels. These techniques remain absolutely critical for preprocessing data in modern AI pipelines.

## 1. Kernels and Spatial Filtering
An image is just a massive 2D array of integers (0 to 255). 
Traditional Image Processing uses **Kernels** (small matrices, like 3x3) that mathematically slide over the image.
- **Gaussian Blur**: The Kernel mathematically averages the center pixel with its neighbors. This destroys high-frequency noise, which is mandatory before running edge detection.
- **Sobel Operator**: A specific mathematical Kernel that calculates the gradient (the derivative) of the pixel intensities. If the color suddenly jumps from Black (0) to White (255), the derivative spikes, mathematically proving the exact location of a physical Edge.

## 2. Morphological Operations and Thresholding
When isolating objects, you must convert the image to binary (black and white) using **Thresholding** (e.g., if a pixel is > 128, set it to 255; else 0). 
This often leaves mathematical artifacts (tiny specks of white noise). You use **Morphological Operations** to clean it:
- **Erosion**: Mathematically shaves pixels off the edges of white objects, destroying tiny noise specks.
- **Dilation**: Mathematically adds pixels to the edges, filling in small holes inside the object. These deterministic mathematical algorithms are vastly faster than Neural Networks for simple, highly controlled environments (like factory assembly lines).

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Image super-resolution/index.mdx': `---
title: Image Super-Resolution
description: The advanced AI technique of hallucinating missing high-frequency pixel data to mathematically upscale a low-resolution, blurry image into a sharp, high-definition output.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Image Super-Resolution">

If you upscale a 144p image to 4K using standard software (Bicubic Interpolation), it just mathematically stretches the pixels, resulting in a blurry, blocky mess. Super-Resolution uses AI to physically invent the missing details.

## 1. Generative Adversarial Networks (GANs)
The most successful Super-Resolution architectures (like SRGAN) use GANs.
- **The Generator**: Takes the blurry 144p image and mathematically tries to hallucinate the missing pores on a face or the individual blades of grass.
- **The Discriminator**: A second neural network that looks at the Generator's output and looks at real 4K photos. It mathematically tries to tell which one is the "fake" AI generation.
Because the Generator is mathematically penalized every time the Discriminator catches its fake pixels, it is forced to hallucinate photorealistic, high-frequency textures that perfectly mimic real-world physics.

## 2. Perceptual Loss
Historically, AI was trained using Mean Squared Error (MSE), which mathematically calculates the physical difference between the generated pixel and the true pixel. MSE mathematically results in extremely blurry images because the AI "hedges its bets" by outputting the average color.
Super-Resolution relies on **Perceptual Loss**. Instead of comparing raw pixels, the image is passed through a pre-trained CNN (like VGG-16). The mathematical loss is calculated based on the difference in the *features* (edges and textures), forcing the AI to optimize for crisp, human-perceivable sharpness rather than mathematical pixel averages.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Instance segmentation/index.mdx': `---
title: Instance Segmentation
description: The pinnacle of object detection, requiring the AI to not only draw a bounding box, but to mathematically classify every single physical pixel belonging to an exact, unique object.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Instance Segmentation">

- **Object Detection**: Draws a box around a car. (Misses the exact shape).
- **Semantic Segmentation**: Colors all "Car" pixels red. (If two cars overlap, they become one giant red blob).
- **Instance Segmentation**: Colors Car 1 red, and Car 2 blue, perfectly isolating their overlapping physical geometries pixel by pixel. 

## 1. The Mask Branch
The dominant architecture is **Mask R-CNN**. It starts with a standard Faster R-CNN architecture (which detects bounding boxes and classifies objects). 
However, Mask R-CNN mathematically splits the network at the very end. Alongside the bounding box output, it adds a brand new **Mask Branch** (a Fully Convolutional Network). 
Once the bounding box is found, the Mask Branch mathematically zooms in on that specific box and performs binary classification on *every single pixel inside the box*: "Is this pixel part of the Car, or is it part of the Background?"

## 2. RoIAlign
To achieve pixel-perfect accuracy, the math must be flawless. 
Older architectures used ROI Pooling, which mathematically rounded coordinates to the nearest integer when cropping the bounding box. Rounding by 1 pixel at the feature map level causes a massive spatial misalignment when upscaled to the final image. 
Mask R-CNN introduced **RoIAlign**, which uses mathematical Bilinear Interpolation to extract features at exact floating-point coordinates (e.g., pixel 14.7), preventing any spatial quantization errors and allowing the network to output razor-sharp, pixel-perfect segmentation masks.

</ConceptTemplate>
`,

  'src/features/kb/routes/KB/32. Computer Vision/Mask R-CNN/index.mdx': `---
title: Mask R-CNN
description: The industry-standard architecture for Instance Segmentation, mathematically extending Faster R-CNN by adding a parallel Fully Convolutional Network to predict pixel-perfect object masks.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Mask R-CNN">

Developed by Kaiming He (the creator of ResNet), Mask R-CNN solved the Instance Segmentation problem by proving that you can mathematically predict a highly complex 2D mask parallel to a simple 1D bounding box.

## 1. The Tripartite Output
When an image passes through Mask R-CNN, the final layer outputs three distinct mathematical tensors simultaneously for every object detected:
1. **Classification**: What is it? (e.g., "Person" - 99%).
2. **Bounding Box**: Where is it? (e.g., $[x, y, width, height]$).
3. **The Mask**: A spatial $28 \\times 28$ matrix of floating-point numbers between 0 and 1.
Crucially, the Mask prediction is mathematically decoupled from the Classification. The Mask Branch just predicts a generic binary shape. The Classification Branch provides the label. This separation prevents the network from mathematically competing against itself.

## 2. The Power of RoIAlign
The absolute mathematical breakthrough of Mask R-CNN was fixing the quantization error of its predecessor (Faster R-CNN).
When a CNN compresses a 1024x1024 image into a 32x32 feature map, a bounding box might start at coordinate 15.6. Faster R-CNN rounded this to 16. Mask R-CNN's **RoIAlign** uses bilinear interpolation to mathematically calculate the exact virtual pixel value at 15.6. 
Without RoIAlign, the generated mask would physically shift by several pixels, bleeding off the object. With RoIAlign, the network achieves pixel-perfect adherence to the physical boundaries of the object, making it the dominant architecture for medical cell segmentation and self-driving cars.

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
