# Developer Guide

Hermes can be complicated to debug due to its distributed and asynchronous
nature. Faults can happen in the client program, or in the Hermes daemon.
The first step when encountering problems is to compile in Debug mode.

```cmake
cmake .. -DCMAKE_BUILD_TYPE=Debug
```

The Debug mode will increase the number of logging statements the program
uses to give you a stronger hint as to where the problem occurs. These
statements are typically compiled out for performance reasons.

Secondly, make sure to use an IDE which supports visual debugging. Debugging
using a terminal with gdb can be very cumbersome, especially when multi-process cases come along.

## Hermes Repo Structure

The Hermes repo is organized as follows:
1. ``tasks/hermes_core`` contains the majority of Hermes implementation. These are tasks that execute in the Hermes runtime
1. ``src`` contains a single source file that is used to construct the Hermes library object that applications link to. Very little code is here, as most implementation is executed in the runtime.
1. ``hermes_adapters`` includes all code relating to the adapters, such as  POSIX, STDIO, and MPI-IO interception
1. ``config`` contains default configurations of Hermes.
1. ``wrapper`` contains all code for binding Hermes to other languages.
1. ``test`` includes all unit tests
1. ``benchmark`` includes some performance benchmark kernels
1. ``ci`` includes all code for continuous integration

## Preparing Pull Request (PR)

Please run these two steps and remove all warnings.

```bash
make dox
make lint
```

## PR Check Failure

We use the [deps.Dockerfile](https://github.com/HDFGroup/hermes/blob/master/docker/deps.Dockerfile)
to avoid reinstalling packages in the github action. While github has a cache action,
we find it somewhat cumbersome. This way, we get the benefit of both a maintained
dockerfile and a fast github action.

## Remote Debugging

IDEs like VSCode have modules for connecting to remote machines.
They will allow you to install their debuggers, such as gdb.

Below is an example ``~/.ssh/config`` file that allows you to 
connect to the Ares machine's 4th compute node.
```bash
Host ares-comp
  HostName ares-comp-04
  User llogan
  ProxyJump ares.cs.iit.edu
```

In vscode, you can install Remote-SSH module to connect via the ``ares-comp`` name.

You may also want to install a pretty print for gdb on the remote server if it's Linux:
```bash
mkdir -p ~/distribs/gdb_printers
cd ~/distribs/gdb_printers
svn co svn://gcc.gnu.org/svn/gcc/trunk/libstdc++-v3/python
echo "python
import sys 
sys.path.insert(0, '${HOME}/distribs/gdb_printers/python')
from libstdcxx.v6.printers import register_libstdcxx_printers
register_libstdcxx_printers (None)
end" > ~/.gdbinit
```

## Preparing For Release

1. Create a GitHub Project for the _next_ release
1. Update the `HERMES_VERSION_*` variables in `CMakeLists.txt`
1. Update `PROJECT_NUMBER` in `Doxyfile.in`.
1. To make release note generation as automated as possible, make sure
   relevant pull requests that are part of the release have proper labels and and
   titles, as that information will show up directly in the generated release
   notes in the next step.
1. Draft a release on Github. Click `auto-generate release notes` and edit
   the result as necessary. Fill in the new tag, and select "Create new tag x.x.x
   on publish" so that Github will automatically tag the release when it is
   published.
1. The docker containers will be automatically built and pushed to docker hub
   whenever a new tag is added. Check the CI actions to make sure there were no
   errors.
1. Copy/move ideas to the project for the next release
1. Close and archive the project for the _current_ release
1. Merge the latest release branch (if one exists) of the wiki into the `master` branch.
1. Make an announcement in the Hermes topic of the HDF forum.
1. Send Lori a note for the next HDF5 newsletter.

## Introduction to our Continuous Integration (CI)

We are primarily using Python for managing for running unit tests. Under
[our root CMakeList](https://github.com/HDFGroup/hermes/blob/master/CMakeLists.txt), we implement a
CMake function called jarvis_test, which uses [Jarvis](https://github.com/grc-iit/jarvis-cd.git)
and its [pipelines](https://github.com/HDFGroup/hermes/tree/master/test/unit/pipelines) concept.

## Adding a New Adapter

1. Create a new directory under the `adapter` directory.
