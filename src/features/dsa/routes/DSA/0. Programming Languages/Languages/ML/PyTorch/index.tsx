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

const PAGE_TITLE = 'PyTorch'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'PyTorch is a deep learning framework centered on tensor computation, automatic differentiation, neural network modules, custom training loops, and accelerator-aware execution on CPUs, GPUs, and related hardware. It is widely used for research, production training, computer vision, natural language processing, recommendation systems, multimodal learning, reinforcement learning, and scientific machine learning.',
  'The most useful mental model is not just "a Python library for neural networks," but "a tensor programming system with autograd plus a set of high-level building blocks for training models." Tensors, differentiable operations, modules, optimizers, datasets, and explicit training loops all fit together in a way that gives teams both flexibility and strong control over model behavior.',
  'This page is intentionally comprehensive. It covers the PyTorch programming model, tensors, autograd, modules, optimizers, datasets and data loaders, training loops, model modes, distributed training, inference and export concerns, performance tuning, ecosystem tools, tradeoffs, examples, and a practical glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'PyTorch is a machine learning framework built around multidimensional tensors, differentiable computation, and composable neural network modules. In practice it is best known as one of the two dominant deep learning frameworks, especially for research workflows and custom model development.',
      'Its popularity comes from a combination of flexibility and usability. It gives developers direct Python-native control over model code and training logic while still supporting accelerator-backed tensor operations, automatic gradient computation, serialization, and large-scale training patterns.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why PyTorch Matters',
    paragraphs: [
      'PyTorch matters because a large share of modern machine learning work involves differentiable models that need custom training behavior, iterative experimentation, and fine-grained debugging. PyTorch became especially influential by making that style of work feel natural in Python rather than forcing users into a separate graph-programming mindset first.',
      'It also matters because many major model ecosystems, tutorials, pretrained checkpoints, and research implementations are built around it. In practice, PyTorch is not just a framework but a common language for modern ML experimentation and production training.',
    ],
    bullets: [
      'Strong fit for deep learning and custom differentiable models.',
      'Widely used in research and increasingly common in production training stacks.',
      'Encourages explicit, debuggable training logic.',
      'Backed by a large ecosystem of pretrained models and tooling.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of PyTorch as tensor algebra plus automatic gradients plus user-defined Python programs. You create tensors, compose differentiable operations, define modules containing parameters, compute a loss, run backpropagation, and update parameters with an optimizer. That loop is the heartbeat of most PyTorch training code.',
      'The framework is explicit by design. Rather than hiding every training detail behind a single framework call, it encourages developers to own forward passes, losses, optimizer steps, data iteration, and mode switching. That explicitness is a major advantage when models or training objectives become nonstandard.',
    ],
    bullets: [
      'Tensors are the core data structure.',
      'Autograd tracks differentiable computations for backpropagation.',
      'Modules package parameters and forward logic.',
      'Training is usually an explicit loop rather than a black-box routine.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where PyTorch Fits Best',
    paragraphs: [
      'PyTorch fits best when the problem involves deep learning, custom differentiable computation, or a training workflow that is likely to evolve rapidly. It is particularly strong in vision, NLP, multimodal systems, reinforcement learning, generative models, scientific ML, recommendation, and any setting where the team wants direct control over model code and training dynamics.',
      'It is also a strong fit when the organization expects to iterate on architectures frequently, incorporate research code, or build custom losses and sampling strategies that would feel awkward in a more constrained framework.',
    ],
    bullets: [
      'Deep learning systems with custom architectures or losses.',
      'Research-heavy or iteration-heavy ML development.',
      'Workloads that need explicit training-loop control.',
      'Projects using pretrained PyTorch ecosystems or model hubs.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where PyTorch Is Not the Best Default',
    paragraphs: [
      'PyTorch is not automatically the right choice for every machine learning problem. Classical tabular problems may be solved more simply with scikit-learn or tree-based libraries. Small deterministic modeling tasks may not justify the overhead of a deep learning framework at all.',
      'It can also be a poor fit when teams want the framework to impose strong high-level workflow structure by default. PyTorch gives flexibility, but that means the surrounding architecture, data discipline, and production integration still need to be designed explicitly.',
    ],
    bullets: [
      'Classical tabular ML often has cheaper and simpler alternatives.',
      'Tiny one-off tasks may not benefit from deep learning infrastructure.',
      'Flexibility can become inconsistency without team conventions.',
      'Production lifecycle concerns still need surrounding engineering discipline.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A standard PyTorch workflow begins with tensors or datasets, then moves into module definition, data loading, loss and optimizer setup, and an explicit training loop over mini-batches. Validation, checkpointing, mixed precision, and learning-rate scheduling are typically added as training matures.',
      'Once the model is stable, teams usually think about checkpoint formats, evaluation loops, deployment constraints, performance profiling, and whether they need distributed training or inference-specific optimizations. Like most deep learning systems, the data path and runtime path matter almost as much as the model itself.',
    ],
    bullets: [
      'Define the model, loss, optimizer, and data loader explicitly.',
      'Build the training and validation loops with clear mode switching.',
      'Add checkpointing, metrics, and profiling early.',
      'Plan export and inference behavior before the system hardens around assumptions.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'PyTorch is best understood as a flexible tensor-and-autograd framework for deep learning rather than a one-click training library. Its power comes from the ability to write straightforward Python that still participates in efficient accelerator-backed learning.',
      'The framework works best when developers treat explicitness as a strength. Own the data pipeline, own the training loop, own the mode changes and checkpointing logic, and let the framework provide efficient numerical and gradient machinery underneath.',
    ],
    bullets: [
      'PyTorch excels when control and flexibility are real advantages.',
      'Tensors, modules, autograd, and explicit loops are the core concepts.',
      'Data loaders, device placement, and model modes are operationally critical.',
      'Good engineering around training and inference matters as much as architecture choice.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-identity',
    title: 'What PyTorch Actually Is',
    paragraphs: [
      'PyTorch is a Python-first machine learning framework for tensor computation and differentiable programming. At a practical level, it combines a tensor library, an automatic differentiation engine, a neural network module system, optimizer utilities, data loading infrastructure, and runtime support for accelerators.',
      'This layered identity matters because PyTorch is not only about neural network layers. It is a programmable substrate for many kinds of differentiable systems, which is why it appears in domains beyond standard image classification.',
    ],
  },
  {
    id: 'core-tensors',
    title: 'Tensors, Shapes, and Devices',
    paragraphs: [
      'The basic value type in PyTorch is the tensor, which is similar in spirit to an n-dimensional array. Tensors have shapes, dtypes, layouts, and device locations, and all of these characteristics affect both correctness and performance.',
      'Many PyTorch issues ultimately come down to shape mismatches, unintended broadcasting, dtype mistakes, or tensors living on the wrong device. Understanding tensor semantics is therefore not optional; it is foundational.',
    ],
    bullets: [
      'Tensors can live on CPU or accelerator devices.',
      'Shape and dtype discipline are major sources of correctness.',
      'Broadcasting can help or silently create bugs if misunderstood.',
      'Device movement is explicit and should be managed carefully.',
    ],
  },
  {
    id: 'core-autograd',
    title: 'Autograd and Backpropagation',
    paragraphs: [
      'PyTorch tracks differentiable tensor operations so gradients can be computed automatically. When a scalar loss is produced from trainable parameters, calling backward propagates gradients through the recorded computation graph to the relevant tensors.',
      'This is the core mechanism behind learning in PyTorch. The framework handles the gradient bookkeeping, while the user remains responsible for structuring the forward pass, loss calculation, optimizer updates, and gradient-reset behavior correctly.',
    ],
    bullets: [
      'Autograd builds the gradient path from tensor operations.',
      'Parameters usually require gradients during training.',
      'Gradients accumulate by default and must typically be reset each step.',
      'Incorrect detaching or no-grad usage can silently break learning.',
    ],
  },
  {
    id: 'core-modules',
    title: 'nn.Module and Model Structure',
    paragraphs: [
      'In PyTorch, trainable models are commonly expressed as subclasses of nn.Module. Modules encapsulate parameters, reusable submodules, buffers, and forward logic. Because modules can contain other modules, hierarchical model design is natural and compositional.',
      'This system matters because it keeps parameter registration and model state manageable. When a model is built as a well-formed module tree, optimizers, checkpointing, and mode switching have a coherent structure to operate on.',
    ],
    bullets: [
      'Modules package parameters and forward computation together.',
      'Submodules create hierarchical model structure naturally.',
      'Parameters registered on modules are visible to optimizers.',
      'Well-factored modules make checkpoints and debugging much easier.',
    ],
  },
  {
    id: 'core-forward-and-modes',
    title: 'Forward Passes, train, and eval',
    paragraphs: [
      'The forward pass defines how inputs become outputs. During training, some layers such as dropout and batch normalization behave differently than they do during inference. PyTorch exposes this distinction explicitly through train and eval modes on modules.',
      'This is a subtle but important operational detail. Forgetting to switch modes can corrupt validation metrics, distort inference behavior, or make saved checkpoints appear unreliable when the actual problem is mode handling.',
    ],
    bullets: [
      'Use model.train() during training updates.',
      'Use model.eval() during validation and inference.',
      'Mode switching does not disable gradients by itself.',
      'Behavioral differences in layers make correct mode handling mandatory.',
    ],
  },
  {
    id: 'core-optimizers-and-losses',
    title: 'Losses, Optimizers, and Learning Dynamics',
    paragraphs: [
      'PyTorch provides standard loss functions and optimizers such as SGD, Adam, AdamW, and others. The usual training rhythm is straightforward: compute predictions, compute a loss, backpropagate gradients, step the optimizer, and clear accumulated gradients before the next iteration.',
      'The simplicity of that loop is part of the frameworks appeal, but it also means the user owns the details. Gradient clipping, scheduler stepping, mixed precision, accumulation, and multiple optimizers are all explicit design choices rather than hidden framework defaults.',
    ],
  },
  {
    id: 'core-data',
    title: 'Dataset and DataLoader',
    paragraphs: [
      'PyTorch uses Dataset and DataLoader abstractions to feed training and inference workflows. A Dataset defines how individual samples are accessed, while a DataLoader handles batching, shuffling, worker processes, collation, and iteration.',
      'This is critical because training performance and reproducibility often depend heavily on the data path. Slow host-side preprocessing or poor collation strategy can waste accelerator time even when the model code is efficient.',
    ],
    bullets: [
      'Datasets define sample access logic.',
      'DataLoaders define batching and iteration behavior.',
      'Shuffling, worker count, and pinning choices affect throughput.',
      'The input pipeline is part of system performance, not separate from it.',
    ],
  },
  {
    id: 'core-training-loops',
    title: 'Explicit Training Loops',
    paragraphs: [
      'PyTorch is famous for making custom training loops feel straightforward. A typical loop iterates over batches, moves data to the target device, computes outputs, evaluates the loss, performs backward, steps the optimizer, and updates metrics.',
      'That explicitness is what makes PyTorch attractive for nonstandard objectives, multitask training, adversarial setups, RL updates, curriculum strategies, and other workflows that do not fit a single canned trainer call. The tradeoff is that users must be disciplined about correctness and bookkeeping.',
    ],
  },
  {
    id: 'core-no-grad-and-inference',
    title: 'no_grad, Inference, and Memory Behavior',
    paragraphs: [
      'During inference or validation steps where gradients are not needed, PyTorch allows gradient tracking to be disabled. This reduces memory usage and can improve runtime behavior because the framework no longer needs to retain autograd history for those operations.',
      'Proper use of no_grad or related inference contexts is both a correctness and performance concern. It helps prevent accidental graph retention and makes model evaluation cheaper.',
    ],
  },
  {
    id: 'core-distribution',
    title: 'Distributed Training and Scaling',
    paragraphs: [
      'PyTorch supports multi-device and multi-process training, including distributed data parallel patterns for scaling across GPUs and machines. In practice, serious scaling work often relies on explicit process-based distribution and careful control of data partitioning, synchronization, and checkpointing.',
      'Distributed training is not just a speed switch. It changes optimizer dynamics, effective batch size, logging behavior, reproducibility constraints, and failure modes. Teams should adopt it deliberately when the workload and infrastructure justify it.',
    ],
    bullets: [
      'Data parallel strategies are common for multi-GPU workloads.',
      'Distribution changes batch semantics and operational complexity.',
      'Checkpoint and logging design become more important at scale.',
      'Measure actual throughput gains instead of assuming perfect scaling.',
    ],
  },
  {
    id: 'core-export-and-deploy',
    title: 'Serialization, Export, and Deployment',
    paragraphs: [
      'PyTorch commonly saves model parameters through state dictionaries, and larger deployment workflows may involve exported representations or runtime-specific conversion paths. The important idea is that training code and inference code are related but not identical concerns.',
      'Teams should think early about how models will be restored, versioned, served, and validated after training. The easiest checkpointing approach for experimentation is not always the best long-term deployment artifact.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Optimization',
    paragraphs: [
      'PyTorch performance depends on more than GPU availability. Batch sizing, tensor layout, data loading, mixed precision, kernel efficiency, Python overhead, and communication costs all matter. The right optimization target is often the end-to-end step time, not just raw model FLOPs.',
      'A good performance workflow profiles real training or inference loops, verifies accelerator utilization, and separates data stalls from model bottlenecks. Prematurely rewriting model code without measuring the pipeline often wastes time.',
    ],
    bullets: [
      'Profile before guessing about the bottleneck.',
      'Data pipeline throughput can dominate overall runtime.',
      'Mixed precision can materially improve speed on supported hardware.',
      'End-to-end step time matters more than isolated microbenchmarks.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Around PyTorch',
    paragraphs: [
      'PyTorch sits inside a large ecosystem that includes data libraries, pretrained model hubs, domain packages for vision and audio, training-framework wrappers, optimization libraries, and deployment tools. Many teams use only core PyTorch at first, then adopt surrounding libraries as project complexity grows.',
      'The ecosystem matters because it changes the cost of iteration. Having common model definitions, datasets, and checkpoint formats available can accelerate experimentation significantly, but it also increases the importance of versioning and dependency discipline.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Use Cases',
    paragraphs: [
      'PyTorch is common in image classification, object detection, segmentation, language modeling, text generation, speech, recommendation, multimodal models, reinforcement learning, time-series deep learning, and differentiable scientific workloads. It is especially strong when the model or objective is likely to evolve while the project is still under active design.',
      'It is also frequently used where pretrained architectures or community implementations are part of the workflow, because many research-first ecosystems publish PyTorch examples first.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Common Pitfalls',
    paragraphs: [
      'PyTorch is flexible, but flexibility does not guarantee good engineering. Common failures include incorrect mode switching, silent device mismatches, gradient accumulation mistakes, data-loader bottlenecks, missing checkpoint metadata, and weak separation between training and inference assumptions.',
      'Another pitfall is assuming that because a model trains, it is production-ready. Memory behavior, exportability, runtime latency, reproducibility, and evaluation discipline are separate concerns that the framework helps with but does not solve automatically.',
    ],
    bullets: [
      'Explicit loops are powerful, but they expose more ways to be wrong.',
      'Watch mode switching, gradient reset logic, and device placement carefully.',
      'Do not ignore checkpointing and reproducibility until the end.',
      'Treat deployment and inference behavior as first-class design constraints.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast',
    paragraphs: [
      'Compared with TensorFlow, PyTorch is often perceived as more direct and Python-native for custom training logic, while TensorFlow is often perceived as broader in integrated deployment pathways. Compared with JAX, PyTorch often feels more object-oriented and framework-like, while JAX often emphasizes functional transformations and compiled array programming.',
      'Compared with scikit-learn, PyTorch is far better suited for large differentiable models and representation learning, but it comes with more engineering overhead and heavier compute expectations. The right choice depends on the problem class and the surrounding system, not on popularity alone.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Practical PyTorch Checklist',
    paragraphs: [
      'A good PyTorch project starts with clear tensor shapes, a correct model definition, explicit device handling, and a training loop that is small enough to debug. Only after that should the team add scheduling, distributed training, or sophisticated optimization features.',
      'The goal is not merely to see the loss go down. The goal is to build a model that trains reproducibly, validates honestly, checkpoints correctly, and behaves predictably in inference contexts.',
    ],
    bullets: [
      'Validate shapes, dtypes, and device movement before long runs.',
      'Use train and eval modes consistently.',
      'Reset gradients deliberately and checkpoint early.',
      'Profile data loading as well as model execution.',
      'Add mixed precision or distribution only after the baseline loop is correct.',
      'Test restoration and inference behavior before calling the model done.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-basic-module',
    title: 'Basic Module and Training Step',
    description: [
      'This example shows the canonical PyTorch pattern: define an nn.Module, run a forward pass, compute a loss, backpropagate, and update parameters with an optimizer.',
      'The point is not the specific network size. The point is to make the training lifecycle explicit and inspectable.',
    ],
    code: `import torch
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(128, 256),
            nn.ReLU(),
            nn.Linear(256, 1),
        )

    def forward(self, x):
        return self.net(x)

model = MLP()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.BCEWithLogitsLoss()

x_batch = torch.randn(64, 128)
y_batch = torch.randint(0, 2, (64, 1)).float()

model.train()
optimizer.zero_grad()
logits = model(x_batch)
loss = loss_fn(logits, y_batch)
loss.backward()
optimizer.step()`,
    notes: [
      'A correct training step is usually more important than trying a fancy architecture too early.',
      'Use zero_grad before the backward pass unless you intentionally want gradient accumulation.',
    ],
  },
  {
    id: 'ex-dataloader-loop',
    title: 'Dataset and DataLoader Training Loop',
    description: [
      'Real training usually iterates over datasets rather than single in-memory batches. DataLoader handles batching and shuffling, while the loop owns device movement, optimizer updates, and metrics.',
      'This pattern is the workhorse for many production PyTorch systems.',
    ],
    code: `import torch
from torch.utils.data import DataLoader, TensorDataset

dataset = TensorDataset(
    torch.randn(1000, 128),
    torch.randint(0, 10, (1000,)),
)

loader = DataLoader(dataset, batch_size=64, shuffle=True)
model = torch.nn.Linear(128, 10)
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3)
loss_fn = torch.nn.CrossEntropyLoss()

for x_batch, y_batch in loader:
    optimizer.zero_grad()
    logits = model(x_batch)
    loss = loss_fn(logits, y_batch)
    loss.backward()
    optimizer.step()`,
    notes: [
      'If training on GPU, move both model and batches to the same device explicitly.',
      'DataLoader settings can become a performance bottleneck long before the model does.',
    ],
  },
  {
    id: 'ex-eval-mode',
    title: 'Validation with eval and no_grad',
    description: [
      'Validation should usually switch the model into eval mode and disable gradient tracking. That prevents training-only layer behavior from leaking into evaluation and reduces memory use.',
      'This is a small code pattern with a large impact on metric correctness.',
    ],
    code: `model.eval()
correct = 0
total = 0

with torch.no_grad():
    for x_batch, y_batch in valid_loader:
        logits = model(x_batch)
        pred = logits.argmax(dim=1)
        correct += (pred == y_batch).sum().item()
        total += y_batch.size(0)

accuracy = correct / total`,
    notes: [
      'eval mode and no_grad solve different problems and are often used together.',
      'Forgetting eval mode can invalidate metrics when dropout or batch norm are present.',
    ],
  },
  {
    id: 'ex-save-restore',
    title: 'Saving and Restoring Model State',
    description: [
      'Checkpointing is part of normal PyTorch practice. Saving model and optimizer state allows training to resume and makes inference artifacts more reproducible.',
      'The usual convention is to save state dictionaries rather than whole Python objects.',
    ],
    code: `torch.save(
    {
        "model_state": model.state_dict(),
        "optimizer_state": optimizer.state_dict(),
        "epoch": epoch,
    },
    "checkpoint.pt",
)

checkpoint = torch.load("checkpoint.pt", map_location="cpu")
model.load_state_dict(checkpoint["model_state"])
optimizer.load_state_dict(checkpoint["optimizer_state"])`,
    notes: [
      'State dictionaries are usually safer and more portable than serializing entire objects.',
      'Checkpoint enough metadata to restore the actual training context, not only the weights.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundational Terms',
    terms: [
      {
        term: 'Tensor',
        definition:
          'The core PyTorch data structure, representing an n-dimensional array with dtype, shape, and device placement.',
      },
      {
        term: 'Autograd',
        definition:
          'PyTorchs automatic differentiation engine that computes gradients through recorded tensor operations.',
      },
      {
        term: 'Gradient',
        definition:
          'The derivative signal used to update trainable parameters during optimization.',
      },
      {
        term: 'nn.Module',
        definition:
          'The base class commonly used to define trainable models and reusable network components.',
      },
      {
        term: 'Forward pass',
        definition:
          'The computation that maps inputs through a model to outputs.',
      },
      {
        term: 'Loss function',
        definition:
          'The scalar objective minimized during training.',
      },
      {
        term: 'Optimizer',
        definition:
          'The component that updates parameters using gradients.',
      },
      {
        term: 'Backward pass',
        definition:
          'The process of propagating gradients from the loss back through the computation graph.',
      },
    ],
  },
  {
    id: 'glossary-training',
    title: 'Training and Runtime Terms',
    terms: [
      {
        term: 'train mode',
        definition:
          'The model state used during training where layers like dropout and batch normalization behave accordingly.',
      },
      {
        term: 'eval mode',
        definition:
          'The model state used during validation or inference where training-specific behavior is disabled.',
      },
      {
        term: 'torch.no_grad',
        definition:
          'A context that disables gradient tracking for operations that do not require backpropagation.',
      },
      {
        term: 'Dataset',
        definition:
          'An object that defines how samples are accessed in a PyTorch data pipeline.',
      },
      {
        term: 'DataLoader',
        definition:
          'An iterator utility that batches, shuffles, and loads data from a Dataset.',
      },
      {
        term: 'state_dict',
        definition:
          'A mapping of module or optimizer state values commonly used for checkpointing.',
      },
      {
        term: 'Gradient accumulation',
        definition:
          'The default behavior where gradients add into parameter buffers until cleared.',
      },
      {
        term: 'Device placement',
        definition:
          'The assignment of tensors and modules to CPU or accelerator devices.',
      },
    ],
  },
  {
    id: 'glossary-scale',
    title: 'Scale and Performance Terms',
    terms: [
      {
        term: 'Mixed precision',
        definition:
          'A training or inference approach that uses lower-precision arithmetic where safe to improve speed and memory use.',
      },
      {
        term: 'Checkpoint',
        definition:
          'A saved snapshot of model and often optimizer state used for recovery or reuse.',
      },
      {
        term: 'Distributed training',
        definition:
          'Training across multiple devices or workers with coordinated parameter updates.',
      },
      {
        term: 'Mini-batch',
        definition:
          'A small subset of training data processed together in one optimization step.',
      },
      {
        term: 'Inference',
        definition:
          'Running a trained model to produce outputs without updating parameters.',
      },
      {
        term: 'Scheduler',
        definition:
          'A component that changes the learning rate or related optimizer settings over time.',
      },
      {
        term: 'Pinned memory',
        definition:
          'A memory configuration that can improve host-to-device transfer efficiency in data loading workflows.',
      },
      {
        term: 'Step time',
        definition:
          'The wall-clock time required to complete one training iteration or batch update.',
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

const pytorchHelpStyles = `
.pytorch-help98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.pytorch-help98-window {
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

.pytorch-help98-titlebar {
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

.pytorch-help98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  letter-spacing: 0.1px;
  white-space: nowrap;
}

.pytorch-help98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.pytorch-help98-control {
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

.pytorch-help98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.pytorch-help98-tab {
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

.pytorch-help98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.pytorch-help98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.pytorch-help98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.pytorch-help98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.pytorch-help98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.pytorch-help98-toc-list li {
  margin: 0 0 8px;
}

.pytorch-help98-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.pytorch-help98-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.pytorch-help98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.pytorch-help98-section {
  margin: 0 0 20px;
}

.pytorch-help98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.pytorch-help98-content p,
.pytorch-help98-content li,
.pytorch-help98-content dd,
.pytorch-help98-content dt {
  font-size: 12px;
  line-height: 1.5;
}

.pytorch-help98-content p,
.pytorch-help98-content dd {
  margin: 0 0 10px;
}

.pytorch-help98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.pytorch-help98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.pytorch-help98-codebox {
  margin: 8px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.pytorch-help98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

.pytorch-help98-glossary {
  margin: 0;
}

.pytorch-help98-glossary dt {
  margin: 0 0 2px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .pytorch-help98-main {
    grid-template-columns: 1fr;
  }

  .pytorch-help98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .pytorch-help98-content {
    padding: 14px 14px 20px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="pytorch-help98-section">
      <h2 className="pytorch-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="pytorch-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="pytorch-help98-section">
      <h2 className="pytorch-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="pytorch-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="pytorch-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="pytorch-help98-section">
      <h2 className="pytorch-help98-heading">{section.title}</h2>
      <dl className="pytorch-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="pytorch-help98-divider" /> : null}
    </section>
  )
}

export default function PyTorchPage(): JSX.Element {
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
    <div className="pytorch-help98-page">
      <style>{pytorchHelpStyles}</style>
      <div className="pytorch-help98-window" role="presentation">
        <header className="pytorch-help98-titlebar">
          <span className="pytorch-help98-title">{PAGE_TITLE}</span>
          <div className="pytorch-help98-controls">
            <button className="pytorch-help98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="pytorch-help98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="pytorch-help98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`pytorch-help98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pytorch-help98-main">
          <aside className="pytorch-help98-toc" aria-label="Table of contents">
            <h2 className="pytorch-help98-toc-title">Contents</h2>
            <ul className="pytorch-help98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="pytorch-help98-content">
            <h1 className="pytorch-help98-doc-title">{PAGE_TITLE}</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <hr className="pytorch-help98-divider" />

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) => renderContentSection(section, index === bigPictureSections.length - 1))
              : null}
            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}
            {activeTab === 'examples'
              ? exampleSections.map((section, index) => renderExampleSection(section, index === exampleSections.length - 1))
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
