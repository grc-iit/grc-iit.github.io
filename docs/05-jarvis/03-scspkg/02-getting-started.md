# Getting Started
SCSPKG provides an infrastructures for installing packages manually.
It provides a structure to modulefiles so that you don't have to build them manually.
It's useful for when you're developing things or when spack fails.
We will go through an example which installs zlib.

## Create a Package

A package is a space where source code and configuration files will be stored.
To create a package, run the following command:
```bash
scspkg create zlib
```

Packages have two important directories and one file:
1. The root directory: where the compiled objects will be installed. It will be created at ``~/.scspkg/packages/${PACKAGE_NAME}``
2. The source directory: where compilation will occur and where source code is stored. It will be created at ``~/.scspkg/pacakges/${PACKAGE_NAME}/src``
3. The modulefile: the modulefile for this package. It will be created at ``~/.scspkg/modulefiles/${PACKAGE_NAME}``

## Download, Compile, and Install Source Code

First, we cd into the package's source directory and unpack zlib
```bash
cd $(scspkg pkg src zlib)
wget https://www.zlib.net/zlib-1.3.1.tar.gz
tar -xzf zlib-1.3.1.tar.gz
cd zlib-1.3.1
```

Next, we configure zlib to store the installed files in the package's root directory.
```bash
./configure --prefix=$(scspkg pkg root zlib)
```

Lastly, we compile and install zlib.
```bash
make -j8
make install
```

We can then view the installed files here:
```bash
ls $(scspkg pkg root zlib)/lib
```

## Load the Modulefile

You can then load the produced modulefile as follows:
```bash
module load zlib
```
You will now be able to link against zlib

To undo:
```bash
module unload zlib
```

## What's in the Modulefile?

The modulefile primarily stores environment variables.
The modulefile will store the following by default: PATH, LD_LIBRARY_PATH, LIBRARY_PATH, INCLUDE, CPATH, CFLAGS, LDFLAGS.

If other environment variables are needed, they'll have to be added manually.

To view the modulefile contents:
```bash
scspkg module show zlib
```

To get the modulefile path:
```bash
scspkg module path zlib
```

## Setting Environment Variables

There two ways to set environment variables:
1. Set environment variable
2. Prepend environment variable

```bash
scspkg env prepend zlib MYPREPEND '25' '26' '27'
scspkg env set zlib MYSET='25'
module load zlib
echo $MYPREPEND
echo $MYSET
module unload zlib
```

Output:
```bash
27:26:25
25
```

## Removing Environment Variables

There are two ways to remove environment variables
1. Remove environment variable
2. Remove path prepend

```bash
scspkg env unset zlib MYSET
scspkg env pop zlib MYPREPEND 25 26
module load zlib
echo $MYSET
echo $MYPREPEND
module unload zlib
```

Output:
```bash

27
```

## Adding Module Dependencies

Sometimes modulefiles may depend on other modules to be loaded.

For example, let's say we have the following two packages:
```bash
scspkg create app1
scspkg env set app1 APP1='APP1'
scspkg create app2
scspkg env set app2 APP2='APP2'
scspkg create app3
scspkg env set app3 APP3='APP3'
```

Let's say app3 depends on app1 and app2
```bash
scspkg dep add app3 app1 app2
```

We can then load all app1, app2, and app3 as follows:
```bash
module load app3
```

We can verify this works:
```bash
module load app3
echo $APP1 $APP2 $APP3
module unload app3
```

Output:
```bash
APP1 APP2 APP3
```

## Removing Module Dependencies 

Continuing from 1.6., we can remove module dependencies as follows

We can remove app1 as a dependency of app3 as follows:
```bash
scspkg dep pop app3 app1
module load app3
echo $APP1 $APP2 $APP3
module unload app3
```

Output:
```bash
APP2 APP3
```

## Listing Module Dependencies

```bash
scspkg dep list
```

## Destroying Packages

To destroy the contents of a package (including source code):
```bash
scspkg create test
scspkg destroy test
```

## Introspecting Environment Variables

The following will collect relevant environment variables (LD_LIBRARY_PATH, etc) and then dump them into the modulefile.
This can help avoid calling spack load repeatedly.
```bash
scspkg create test
scspkg build profile test
```

## Printing Environment Variables

The following will print the current environment and store it in a way that is accessible by an IDE:

```bash
scspkg build profile
```
