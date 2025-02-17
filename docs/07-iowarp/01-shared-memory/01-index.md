# Hermes SHM

This library contains a variety of data structures and synchronization primitives which are compatible with shared memory. This library is also compatible with CUDA and ROCm.

[![Coverage Status](https://coveralls.io/repos/github/lukemartinlogan/hermes_shm/badge.svg?branch=master)](https://coveralls.io/github/lukemartinlogan/hermes_shm?branch=master)

## Spack Install

### Clone the IoWarp Spack Repo
```bash
cd ${HOME}
git clone https://github.com/iowarp/iowarp-install.git
spack repo add iowarp-install/iowarp-spack
```

### Installation: Users

For those installing this component (rather than all of iowarp):
```bash
spack install cte-hermes-shm
spack load cte-hermes-shm
```

### Installation: Devs

This will install dependencies of hermes-shm:
```bash
spack install cte-hermes-shm +nocompile
spack load cte-hermes-shm
```

NOTE: spack load needs to be done for each new terminal.

This will compile:
```bash
git clone https://github.com/grc-iit/hermes-shm.git
cd hermes-shm
mkdir build
cd build
cmake ../ -DHSHM_ENABLE_CUDA=OFF -DHSHM_ENABLE_ROCM=OFF
make -j8
```

## CMake

### For CPU-Only Version
```
find_package(HermesShm CONFIG REQUIRED)
message(STATUS "found hermes_shm.h at ${HermesShm_INCLUDE_DIRS}")
target_link_libraries(hshm::cxx)
```

### For CUDA Version
```
find_package(HermesShm CONFIG REQUIRED)
message(STATUS "found hermes_shm.h at ${HermesShm_INCLUDE_DIRS}")
target_link_libraries(hshm::cudacxx)
```

### For ROCM Version
```
find_package(HermesShm CONFIG REQUIRED)
message(STATUS "found hermes_shm.h at ${HermesShm_INCLUDE_DIRS}")
target_link_libraries(hshm::rocmcxx_gpu)
```

## Tests

To run the tests, do the following:
```
ctest
```

To run the MPSC queue tests, do the following:
```
ctest -VV -R test_mpsc_queue_mpi
```
