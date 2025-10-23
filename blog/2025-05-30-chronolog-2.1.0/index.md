---
title: "ChronoLog 2.1.0 Release"
authors: grc
tags:
  - ChronoLog
  - Release
---

:::info
**We are excited to announce [ChronoLog 2.1.0 Release](https://github.com/grc-iit/ChronoLog/releases/tag/2025.05.30)!**
This release introduces flexible client modes, Docker containerization, and significant improvements to deployment and client architecture.
:::

## About ChronoLog

ChronoLog is a scalable, high-performance distributed shared log store designed to handle the
ever-growing volume, velocity, and variety of modern activity data. Built for applications
ranging from edge computing to high-performance computing (HPC) systems, ChronoLog offers
multi-tiered storage, high concurrency, and synchronization-free ordering using physical time.
The system supports scientific applications, IoT, financial services, and system telemetry across
diverse computing environments. Learn more at [chronolog.dev](https://chronolog.dev).

Building on our [2.0.0 release in February 2025](/blog/2025/02/05/chronolog-2.0.0), ChronoLog 2.1.0 introduces flexible client modes, containerized deployment, and enhanced developer experience with improved error handling and testing capabilities.

## ChronoLog Release 2.1.0

### New Features

- **Flexible Client Modes**: ChronoLog Client can now be instantiated in lightweight `WRITER_MODE` for applications only producing logging events, or in `READER_MODE` for applications consuming recorded log event data. This provides better resource optimization and clearer separation of concerns.
- **Docker Containerization**: ChronoLog deployment is now available using Docker containers, significantly simplifying deployment and improving portability across different environments.
- **Enhanced Client Architecture**: Complete refactoring of `ChronoLogClientImpl` with improved separation between writer and reader functionality, providing better performance and maintainability.

### Deployment & Infrastructure Improvements

- **Docker Compose Support**: Added support for controlling Docker Compose scale through command line arguments, enabling flexible scaling of ChronoLog services.
- **ChronoPlayer Integration**: ChronoPlayer has been added to distributed deployment scripts, completing the end-to-end deployment process.
- **Deployment Script Enhancements**: Comprehensive improvements to deployment scripts including better error handling, path normalization, and compatibility with different shell environments (bash/zsh).
- **HDF5 Archive Improvements**: Added SWMR (Single Writer Multiple Reader) access flag when opening HDF5 archive files for better concurrent access support.

### Client & API Enhancements

- **Error Code Standardization**: Refactored client and server error codes into enums with string conversion capabilities, improving debugging and error reporting.
- **Dependency Cleanup**: Removed ChronoLog Client dependency on `ConfigurationManager.h` and created separate client error codes header file for better modularity.
- **Spack Package Management**: Created a dedicated `spack.yaml` for the client, improving package management and dependency resolution.
- **Interactive Mode Improvements**: Enhanced client admin interactive mode to handle strings containing spaces and special characters without assertion failures.

### Performance & Memory Management

- **Memory Growth Fixes**: Addressed unreasonable memory growth in ChronoGrapher through improved chunk merging logic and better memory management.
- **Data Integrity**: Fixed incorrect data writing in `StoryChunkWriter` and improved data pointer handling to ensure data integrity.
- **Service Registration**: Refactored ChronoProcess ServiceIds and registration messages for better service management and identification.

### Testing & Quality Assurance

- **Client Integration Tests**: Added comprehensive client integration tests including hybrid writer/reader client tests and story reader functionality.
- **CMake Standardization**: Standardized CMake source paths and removed current directory dependencies for better build consistency.
- **Documentation Fixes**: Resolved landing page image linking issues and improved documentation accessibility.

For detailed information about all changes, see the [complete changelog](https://github.com/grc-iit/ChronoLog/compare/2.0.0...2025.05.30).

## Development Team

ChronoLog is being developed by a team of researchers and engineers at Illinois Tech and the
University of Chicago.

## Acknowledgements

We gratefully acknowledge the support of the National Science Foundation (NSF) for funding
this project. We also thank our collaborators from various scientific and engineering domains for
their valuable insights and feedback.
