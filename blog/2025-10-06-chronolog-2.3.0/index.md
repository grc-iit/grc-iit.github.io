---
title: "ChronoLog 2.3.0 Release"
authors: grc
tags:
  - ChronoLog
  - Release
---

:::info
**We are excited to announce [ChronoLog 2.3.0 Release](https://github.com/grc-iit/ChronoLog/releases/tag/2025.10.06)!**
This release brings significant enhancements to ChronoLog, including a new key-value store interface, improved code architecture, and enhanced deployment capabilities.
:::

## About ChronoLog

ChronoLog is a scalable, high-performance distributed shared log store designed to handle the
ever-growing volume, velocity, and variety of modern activity data. Built for applications
ranging from edge computing to high-performance computing (HPC) systems, ChronoLog offers
multi-tiered storage, high concurrency, and synchronization-free ordering using physical time.
The system supports scientific applications, IoT, financial services, and system telemetry across
diverse computing environments. Learn more at [chronolog.dev](https://chronolog.dev).

Since our [1.0.0 release in June 2024](/blog/2024/06/06/chronolog-1.0.0), we have been continuously improving ChronoLog with several milestone releases (2.0.0, 2.1.0, and 2.2.0). Version 2.3.0 continues this momentum with important architectural improvements and new capabilities.

## ChronoLog Release 2.3.0

### ChronoKVS: Key-Value Store Interface

The most significant addition in this release is **ChronoKVS**, a new multi-version key-value store interface built on top of ChronoLog's distributed logging infrastructure. This feature enables:

- **Flexible Data Access**: Access log data using familiar key-value semantics alongside traditional log interfaces.
- **Optimized Queries**: Enhanced GET operations with specific time range support for improved query performance.
- **Example Applications**: Comprehensive example programs demonstrating ChronoKVS usage patterns and best practices.

ChronoKVS expands ChronoLog's versatility, making it easier to integrate with applications that expect key-value storage semantics while maintaining all the benefits of ChronoLog's distributed architecture.

### Code Architecture Enhancements

We've undertaken a comprehensive refactoring effort to improve code quality and maintainability:

- **Consistent Header Inclusion**: Standardized header file inclusion practices across all core components (ChronoVisor, ChronoKeeper, ChronoGrapher, ChronoPlayer, Client, and Test modules).
- **Unified API Structure**: Merged ChronoAPI into chrono_common for better code organization and reduced complexity.
- **Streamlined Dependencies**: Removed the external_libs directory and reorganized tools into a dedicated tools/ directory.
- **Improved Build System**: Enhanced library linking to ensure installed executables can properly locate libchronolog_client.so.

These changes make ChronoLog easier to maintain, extend, and contribute to, setting a solid foundation for future development.

### Deployment & Infrastructure Improvements

- **Enhanced Compatibility**: Migrated from mpssh to pssh for improved cross-platform compatibility in distributed deployments.
- **Deployment Reliability**: Fixed issues in distributed deployment scripts for better stability on HPC systems such as ALCF Ares.
- **Plugin Support**: Added infrastructure for ChronoStream plugins, enabling extensible data processing capabilities.
- **Documentation**: Added MCP (Message Chaining Protocol) availability notes to the README for better user guidance.

### Bug Fixes & Stability

- **Query Logic Improvements**: Fixed range query logic in calculating start and end iterators for more accurate results.
- **Replay Validation**: Corrected ReplayStory success checks in ReaderExample for reliable data replay operations.
- **Deployment Script Fixes**: Resolved dynamic deployment script issues for proper container description generation.

### Testing & Developer Experience

- **Story Pipeline Testing**: Added comprehensive unit tests for the story pipeline to ensure robustness.
- **Code Organization**: Created dedicated tools/ directory for client admin utilities and deployment scripts.

For detailed information about all changes, see the [complete changelog](https://github.com/grc-iit/ChronoLog/compare/2025.08.01...2025.10.06).

## Development Team

ChronoLog is being developed by a team of researchers and engineers at Illinois Tech and the
University of Chicago.

## Acknowledgements

We gratefully acknowledge the support of the National Science Foundation (NSF) for funding
this project. We also thank our collaborators from various scientific and engineering domains for
their valuable insights and feedback.
