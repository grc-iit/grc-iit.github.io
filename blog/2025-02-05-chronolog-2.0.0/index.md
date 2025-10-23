---
title: "ChronoLog 2.0.0 Release"
authors: grc
tags:
  - ChronoLog
  - Release
---

:::info
**We are thrilled to announce [ChronoLog 2.0.0 Release](https://github.com/grc-iit/ChronoLog/releases/tag/2025.02.03)!**
This release introduces the first end-to-end bidirectional version of the ChronoLog framework, completing the data service with new playback capabilities and enhanced usability.
:::

## About ChronoLog

ChronoLog is a scalable, high-performance distributed shared log store designed to handle the
ever-growing volume, velocity, and variety of modern activity data. Built for applications
ranging from edge computing to high-performance computing (HPC) systems, ChronoLog offers
multi-tiered storage, high concurrency, and synchronization-free ordering using physical time.
The system supports scientific applications, IoT, financial services, and system telemetry across
diverse computing environments. Learn more at [chronolog.dev](https://chronolog.dev).

Building on our [1.0.0 release in June 2024](/blog/2024/06/06/chronolog-1.0.0), ChronoLog 2.0.0 represents a major milestone by completing the bidirectional data flow with new playback capabilities and comprehensive improvements across the entire system.

## ChronoLog Release 2.0.0

### New Core Features

ChronoLog 2.0.0 introduces new functional components completing bidirectional end-to-end ChronoLog data service:

- **ChronoPlayer Component**: The new addition manages the extraction pipeline, enabling efficient data retrieval and playback. It ensures seamless user-level access to stored data, significantly enhancing usability.
- **ChronoLog Client Playback API**: Introduction of story playback API in ChronoLog Client provides precise control over data playback for use cases ranging from analytics to real-time applications.
- **HDF5-Based Data Store**: ChronoLog integration with the HDF5-based data store ensures efficient data retrieval and compatibility with existing datasets.

### Improvements

- **Deployment Tools**: Project deployment scripts have been revamped for simplicity and enhanced functionality, now supporting end-to-end deployment. Additionally, configurability has been expanded to support non-uniform RecordingGroup compositions.
- **Test Suite Enhancements**: The testing suite now includes Python-based tests for improved industry alignment and nuanced multithreaded tests for the ChronoLog Client.
- **Performance Benchmark Suite**: A new suite provides insights into ChronoLog's capabilities and establishes a baseline for measuring progress in future releases.
- **Build System Refinements**: The CMake structure has been streamlined for a more efficient build process.
- **ChronoGrapher Improvements**: Statistic messages have been added to enhance the ChronoGrapher component.
- **Monitoring System Updates**: Logging consistency has been improved across the system.

### Documentation

- **Architecture Overview**: Updated with ChronoPlayer component details.
- **Client API**: Expanded to include playback query APIs.
- **Client Documentation**: Refined for clarity, including simple code examples for different ChronoLog Clients.
- **Deployment Tools**: Enhanced documentation reflects updates in usability and component additions.
- **Configuration Guide**: Comprehensive documentation now covers the structure and setup of configuration files.

### Tutorials

In ChronoLog 2.0.0 we introduce ChronoLog Tutorials to lower the entry barrier for new users and administrators of the system:

- **Getting Started**: A guide on how to download and access the ChronoLog system.
- **How to Deploy ChronoLog**: A guide that describes the process from downloading the system to how to make it work.
- **How to Run ChronoLog Tests**: A guide to allow users to run ChronoLog tests.

### Bug Fixes

- **RPC Implementation**: Redundant RPC implementations were removed from the configuration file.
- **AcquireStory Return Value**: Resolved an issue with incorrect return values during AcquireStory operations.
- **Client "DestroyStory" Bug**: Fixed an error where the "DestroyStory" API call inadvertently triggered "DestroyChronicle."
- **StoryChunk Extraction Failures**: Addressed an issue where StoryChunks were not properly drained, causing system failures.
- **Keeper Segmentation Fault**: Fixed a segmentation fault occurring on the Keeper component.

## Development Team

ChronoLog is being developed by a team of researchers and engineers at Illinois Tech and the
University of Chicago.

## Acknowledgements

We gratefully acknowledge the support of the National Science Foundation (NSF) for funding
this project. We also thank our collaborators from various scientific and engineering domains for
their valuable insights and feedback.
