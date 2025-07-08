# Building C++ with CMake
Now that we have seen how to compile C++ code manually, we will discuss
build automation using CMake. Generally, compiling manually is bad
because it's difficult for someone to download your repo and just
build it. Building the repo should not be burdensome.

The main objectives of this tutorial are as follows:
1. Describe the structure of a proper C++ repo
2. Show how to use CMake to compile a C++ repo
3. Demonstrate how to build a basic CMakeLists.txt

We will re-use the example from [Building C++ Manually](02-cpp-build-manually.md).

## Setup

```bash
git clone https://github.com/grc-iit/grc-tutorial.git
cd grc-tutorial
export GRC_TUTORIAL=${PWD}
cd ${GRC_TUTORIAL}/cpp/03-cpp-build-with-cmake
```

Next perform:
```bash
spack install boost
spack load boost
```

## Basic C++ Repo Structure

Generally, a C++ repo will contain at least the following directories
1. include: where public header files go
2. src: where private source and header files go
3. test: where unit tests go

Note: A unit test is just a program which validates the correctness
of some component of your program.

In CMake, build configurations are stored in files called CMakeLists.txt.
In each directory which has source code or contains a directory which
has source code, there should be a file called CMakeLists.txt. The
CMakeLists.txt is responsible for determining which source codes are
used for building a library or executable, dependencies, etc.

## Building a CMake Project

To build this project, do the following:
```bash
cd ${GRC_TUTORIAL}/cpp/03-cpp-build-with-cmake
mkdir build
cd build
# CMake will produce a Makefile (in this case)
cmake ../
# Use make to build
make -j8
```

CMake is a build system generator, so it doesn't always need to
be a makefile which gets produced. It could also be something
like ninja. But generally it is make on Linux systems.

## Top-Level (or Root) CMakeLists.txt

First we will look at the CMakeLists.txt file in the project's root
directory. Generally, the root CMake is responsible for the following:
1. Finding packages (e.g., shared libraries) which are relevant to the build
2. Defining user configuration options
3. Setting variables global to the build
4. Setting compiler flags (e.g., optimization)

In this section, we will describe our root [CMakeLists.txt](https://github.com/grc-iit/grc-tutorial/blob/main/cpp/03-cpp-build-with-cmake/CMakeLists.txt).

### CMake Preamble
```cmake
cmake_minimum_required (VERSION 3.10)
project(MyFirstCMake)
set(CMAKE_CXX_STANDARD 17)
```

Here we require a minimum of CMake 3.10. This will cause CMake to fail
if the installed version is too old.

We also set the name of this project to be MyFirstCMake. The *project*
function will set the name of this project and store it in the variable
PROJECT_NAME. Calling from the top-level CMakeLists.txt also stores the project
name in the variable CMAKE_PROJECT_NAME.

### Global Compiler Flags
```cmake
#------------------------------------------------------------------------------
# Compiler optimization
#------------------------------------------------------------------------------
add_compile_options("-fPIC")
if (CMAKE_BUILD_TYPE STREQUAL "Debug")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O0")
elseif(CMAKE_BUILD_TYPE STREQUAL "RelWithDebInfo")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O2")
elseif(CMAKE_BUILD_TYPE STREQUAL "Release")
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -03")
else()
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -03")
endif()
```

CMake defines the following variables automatically:
1. CMAKE_CXX_STANDARD: The C++ version. For now C++17.
2. CMAKE_BUILD_TYPE: What mode to build your project in. Typically
this indicates compiler optimization. Default is usually RelWithDebInfo
3. CMAKE_CXX_FLAGS: Flags to pass to the compiler. By default, this
will be equivalent to the CXX_FLAGS environment variable from the
shell CMake gets executed in.

In this example, we define four CMAKE_BUILD_TYPES:
1. Debug: no compiler optimization
2. RelWithDebInfo: moderate compiler optimization
3. Release: heavy compiler optimization
4. Everything else: same as Release

These build types are very common in CMake projects.

When [Building C++ Manually](02-cpp-build-manually.md), we mentioned that the -fPIC flag was required when
building a shared library. In CMake this flag can be added to all
libraries as follows:
```cmake
add_compile_options("-fPIC")
```

For each CMake build type, we also enable different levels of optimization.
For example, with Debug we disabled compiler optimization as follows:
```cmake
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O0")
```

Setting CMAKE_CXX_FLAGS and add_compile_options are effectively the same thing.
In this case, it would also be equivalent (and actually encouraged) to write:
```cmake
add_compile_options("-O0")
```
However, in many C++ projects people will set CMAKE_CXX_FLAGS. The main
difference between the two approaches is that CMAKE_CXX_FLAGS will apply
globally, even if set in a lower-level CMakeLists.txt. This is partially due to
historical reasons.


### Build Options
```cmake
option(BUILD_TESTING "Build testing kits" OFF)
```

The option command allows users to configure the build. In this case, we include
a flag which indicates whether or not to build unit tests. In many cases, users
won't want to take the time to test code unless there are potential
portability issues. By default, this value is set to OFF. The alternative is to
set it to ON.

CMake options are passed to CMake using the -D flag. To build this project with testing, do the following:
```bash
cd ${GRC_TUTORIAL}/cpp/03-cpp-build-with-cmake
mkdir build
cd build
# Enable testing
cmake ../ -DBUILD_TESTING=ON
# Build
make -j8
```

### Output Directories

In this section, we will describe how to define where CMake should output
executables and shared objects.

```cmake
#------------------------------------------------------------------------------
# Setup CMake Output Directories
#------------------------------------------------------------------------------
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY
        ${CMAKE_BINARY_DIR}/bin CACHE PATH "Single Directory for all Executables.")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY
        ${CMAKE_BINARY_DIR}/bin CACHE PATH "Single Directory for all Libraries")
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY
        ${CMAKE_BINARY_DIR}/bin CACHE PATH "Single Directory for all static libraries.")
```

* CMAKE_RUNTIME_OUTPUT_DIRECTORY: output for executables
* CMAKE_LIBRARY_OUTPUT_DIRECTORY: output for shared libraries
* CMAKE_ARCHIVE_OUTPUT_DIRECTORY: output for static libraries (not important for us)

CMAKE_BINARY_DIR is automatically provided by CMake. This is the absolute
path to the directory which contains the root CMake. In our case, this would
be ``cd ${GRC_TUTORIAL}/cpp/03-cpp-build-with-cmake``.

In this example, we output all executables and shared objects to the bin
directory.

### Locating Dependencies

```cmake
#-----------------------------------------------------------------------------
# Dependencies common to all subdirectories
#-----------------------------------------------------------------------------
find_package(Boost COMPONENTS system filesystem REQUIRED)
```

*find_package* is used to locate packages installed on the system by parsing the
environment variable CMAKE_PREFIX_PATH. CMAKE_PREFIX_PATH must contain the paths
to .cmake (not .txt) files which actually load the package information. This
variable is often set by spack when loading packages.

### Enable Testing
```cmake
#-----------------------------------------------------------------------------
# Enable Testing
#-----------------------------------------------------------------------------
include(CTest)
if(CMAKE_PROJECT_NAME STREQUAL MyFirstCMake AND BUILD_TESTING)
  enable_testing()
endif()
```

This code will enable the ability to use a functionality called CTest.
CTests are used for automating unit tests for C++ projects. In our
case, this is only enabled when BUILD_TESTING is ON.

### Directory Descent

```cmake
#-----------------------------------------------------------------------------
# Source
#-----------------------------------------------------------------------------
add_subdirectory(src)

#-----------------------------------------------------------------------------
# Testing Sources
#-----------------------------------------------------------------------------
if(CMAKE_PROJECT_NAME STREQUAL MyFirstCMake AND BUILD_TESTING)
  add_subdirectory(test)
endif()
```

There is no source code in the root directory for this project. In
order to get to the source code, we must go into the src and test
directories. *add_subdirectory* will tell CMake to go to a specific
directory and execute the CMakeLists.txt in that subdirectory.


## src/CMakeLists.txt

In this section, we will discuss [src/CMakeLists.txt](https://github.com/grc-iit/grc-tutorial/blob/main/cpp/03-cpp-build-with-cmake/src/CMakeLists.txt).
This CMake file is responsible for defining how to build + install the
source code in this repo.

### Including Header Files

```cmake
#------------------------------------------------------------------------------
# Include Header Directories
#------------------------------------------------------------------------------
include_directories(${CMAKE_SOURCE_DIR}/include)
```

*include_directories* will ensure that header files can be discovered
by the C++ compiler. This is analagous to the ``-I`` flag in the gcc
compiler. Here we ensure that the compiler will search the directory
``${CMAKE_SOURCE_DIR}/include`` for header files.

CMAKE_SOURCE_DIR is provided automatically by CMake. It represents
the absolute path to the directory containing the root CMakeLists.txt.
In our case, this constant would expand to
``cd ${GRC_TUTORIAL}/cpp/03-cpp-build-with-cmake/``.

### Creating a Shared Library
```cmake
#------------------------------------------------------------------------------
# Build Database (DB) Library
#------------------------------------------------------------------------------
add_library(database_lib SHARED ${CMAKE_CURRENT_SOURCE_DIR}/database_lib.cc)
target_link_libraries(database_lib
        ${Boost_FILESYSTEM_LIBRARY}
        ${Boost_SYSTEM_LIBRARY})
```

*add_library* will create a shared library, in this case database_lib. This function takes as
input the path to all source files related to the build. The SHARED indicates
this library is shared (as opposed to static). Here, there is only one source
file, datbase_lib.cc. The output of this command will be "libdatabase_lib.so" in
the ``build/lib`` directory.

CMAKE_CURRENT_SOURCE_DIR is provided automatically by CMake. It represents
the absolute path to the directory containing the CMakeLists.txt currently
being processed. In our case, this constant would expand to
``cd ${GRC_TUTORIAL}/cpp/03-cpp-build-with-cmake/src``.

*target_link_libraries* will link all necessary libraries necessary to compile the target database_lib.
This is analagous to the "-l" flag in gcc. In our case, we link against the
Boost System + Filesystem modules. You need to look at specific documentation
for each dependency you include in order to include it!

### Creating an Executable

```cmake
#------------------------------------------------------------------------------
# Build Grocery DB
#------------------------------------------------------------------------------
add_executable(grocery_db ${CMAKE_CURRENT_SOURCE_DIR}/grocery_db.cc)
add_dependencies(grocery_db database_lib)
target_link_libraries(grocery_db database_lib)

#------------------------------------------------------------------------------
# Build Movies DB
#------------------------------------------------------------------------------
add_executable(movies_db ${CMAKE_CURRENT_SOURCE_DIR}/movies_db.cc)
add_dependencies(movies_db database_lib)
target_link_libraries(movies_db database_lib)
```

*add_executable* will create an executable. In our case, the executables
are movies_db and grocery_db.

*add_dependencies* will force certain CMake targets to be built before
others. In this case, we need database_lib to be built before movies_db
and grocery_db.

In this case, *target_link_libraries* will link database_lib to our executables.

### Installing Libraries + Executables
```cmake
#------------------------------------------------------------------------------
# Add libraries + executables to CMake install
#------------------------------------------------------------------------------
install(
        TARGETS
        database_lib
        grocery_db
        movies_db
        LIBRARY DESTINATION ${CMAKE_INSTALL_PREFIX}/lib
        ARCHIVE DESTINATION ${CMAKE_INSTALL_PREFIX}/lib
        RUNTIME DESTINATION ${CMAKE_INSTALL_PREFIX}/bin)
```

*install* defines what happens when a user calls "make install". In this
case we specify that our targets database_lib, grocery_db, and movies_db
should be installed into one of ``LIBRARY``, ``ARCHIVE``, or ``RUNTIME`` depending
on its type. For example, database_lib will be installed to LIBRARY
(since we used add_library), whereas grocery_db and movies_db will be installed
to ``RUNTIME`` (since we used add_executable).

``CMAKE_INSTALL_PREFIX`` is a constant provided by CMake which represents
where files should be installed. This can be configured by users by passing
``-DCMAKE_INSTALL_PREFIX`` to their CMake build. By default, the value of this
constant is /usr.

### Installing Header Files
```cmake
#-----------------------------------------------------------------------------
# Add header file(s) to CMake Install
#-----------------------------------------------------------------------------
install(
        FILES
        ${CMAKE_SOURCE_DIR}/include/database_lib.h
        DESTINATION
        ${CMAKE_INSTALL_PREFIX}/include
        COMPONENT
        headers)
```

In this case, we use *install* to specify
that the specific file ``${CMAKE_SOURCE_DIR}/include/database_lib.h`` should be
installed to ``${CMAKE_INSTALL_PREFIX}/include``. Here, we use the keyword
FILES instead of the keyword TARGET. Targets are defined using a CMake
function such as add_executable or add_library. Files are just the way
they are with no modification.

## test/CMakeLists.txt

In this section, we will discuss [test/CMakeLists.txt](https://github.com/grc-iit/grc-tutorial/blob/main/cpp/03-cpp-build-with-cmake/test/CMakeLists.txt). This CMake is responsible for creating unit tests.

### Creating a CTest
```cmake
add_test(test_grocery_db COMMAND ${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/grocery_db)
set_property(TEST test_grocery_db PROPERTY ENVIRONMENT
        "LD_LIBRARY_PATH=${CMAKE_LIBRARY_OUTPUT_DIRECTORY}")

add_test(test_movies_db COMMAND ${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/movies_db)
set_property(TEST test_movies_db PROPERTY ENVIRONMENT
        "LD_LIBRARY_PATH=${CMAKE_LIBRARY_OUTPUT_DIRECTORY}")
```

*add_test* creates a CTest case. Here we create two tests: test_grocery_db
and test_movies_db. The test will execute the command ``${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/grocery_db``.

CMAKE_RUNTIME_OUTPUT_DIRECTORY is a constant provided by CMake. It
is the location where an executable is installed after performing the
"make" command.

*set_property* sets some sort of property about a target. In this
case the target is the test case test_movies_db. We are setting
an environment variable ``LD_LIBRARY_PATH``. When [Building C++ Manually](02-cpp-build-manually.md), we
saw that we needed to be very careful about ensuring the OS
knows where shared libraries are located. In this case, we
ensure the OS will check the path ``${CMAKE_LIBRARY_OUTPUT_DIRECTORY}``.

CMAKE_LIBRARY_OUTPUT_DIRECTORY is a constant provided by CMake. It
is the location where a shared library is installed after performing
the "make" command.

### Putting it All Together

```bash
cd ${GRC_TUTORIAL}/cpp/03-cpp-build-with-cmake
mkdir install
mkdir build
cd build
cmake ../ -DBUILD_TESTING=ON -DCMAKE_INSTALL_PREFIX=../install
make -j8
ctest -VV
make install
```
The above code will build, test, and install this example project.

#### Generating a Makefile

```bash
cmake ../ -DBUILD_TESTING=ON -DCMAKE_INSTALL_PREFIX=../install
```

Here we generate a Makefile. The Makefile is used to actually compile
source code. Here CMake will create a Makefile which will compile
unit tests and install data to this tutorial's install directory.

#### Building with Make

```bash
make -j8
```
This command will build with 8 threads (-j indicates parallelism). In our
case, it will place all shared libraries and executables underneath the
"bin" directory.

Just to make sure, list the bin directory:
```bash
ls bin
```

The output should be as follows:
```bash
grocery_db  libdatabase_lib.so  movies_db
```

#### Running the Unit Tests

```bash
ctest -VV
```

This will run unit tests verbosely, meaning that terminal outputs
will not be hidden. -VV indicates making the tests verbose

You should see something like:
```bash
UpdateCTestConfiguration  from :/home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/DartConfiguration.tcl
Parse Config file:/home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/DartConfiguration.tcl
UpdateCTestConfiguration  from :/home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/DartConfiguration.tcl
Parse Config file:/home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/DartConfiguration.tcl
Test project /home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build
Constructing a list of tests
Done constructing a list of tests
Updating test list for fixtures
Added 0 tests to meet fixture requirements
Checking test dependency graph...
Checking test dependency graph end
test 1
    Start 1: test_grocery_db

1: Test command: /home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/bin/grocery_db
1: Working Directory: /home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/test
1: Environment variables: 
1:  LD_LIBRARY_PATH=/home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/bin
1: Test timeout computed to be: 1500
1: grocery: in create
1: grocery: in read
1: grocery: in update
1: grocery: in delete
1/2 Test #1: test_grocery_db ..................   Passed    0.00 sec
test 2
    Start 2: test_movies_db

2: Test command: /home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/bin/movies_db
2: Working Directory: /home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/test
2: Environment variables: 
2:  LD_LIBRARY_PATH=/home/luke/Documents/Projects/grc-tutorial/cpp/03-cpp-build-with-cmake/build/bin
2: Test timeout computed to be: 1500
2: movies: in create
2: movies: in read
2: movies: in update
2: movies: in delete
2/2 Test #2: test_movies_db ...................   Passed    0.00 sec

100% tests passed, 0 tests failed out of 2

Total Test time (real) =   0.01 sec
```

#### Installing

```bash
make install
```
This command will create the directories bin, lib, and include in the install
directory we created.
1. bin: all executables
2. lib: all shared libararies
3. include: all header files

Let's list the contents of the install directory and its subdirectories
```bash
cd ${GRC_TUTORIAL}/cpp/03-cpp-build-with-cmake
find install/*
```

The output should look like:
```bash
install/bin
install/bin/grocery_db
install/bin/movies_db
install/include
install/include/database_lib.h
install/lib
install/lib/libdatabase_lib.so
```
