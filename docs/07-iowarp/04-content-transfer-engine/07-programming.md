# Programming

This section gives a high-level example of the core Hermes APIs.

To see demonstrations of the API, check out our [API tests](https://github.com/iowarp/content-transfer-engine/blob/main/test/unit/hermes/test_bucket.cc)

## Blob API Example
```cpp
#include <cassert>

#include "hermes/hermes.h"

int main() {
  TRANSPARENT_HERMES();
  hermes::Bucket bkt("hello");
  size_t blob_size = KILOBYTES(4);
  hermes::Context ctx;

  hermes::Blob blob1(1024);
  bkt.Put("0", blob1, ctx);

  hermes::Blob blob2(1024);
  bkt.Get("0", blob2, ctx);

  assert(blob1 == blob2);
}
```

## STL API Example

This example will place a blob into the DMSH and then retrieve that blob.

```cpp
#include <cassert>

#include "hermes/hermes.h"

int main() {
  TRANSPARENT_HERMES();
  hermes::Bucket bkt("hello");
  size_t blob_size = KILOBYTES(4);
  hermes::Context ctx;

  std::vector<int> data_put(1024, 0);
  bkt.Put<std::vector<int>>("0", data_put, ctx);

  std::vector<int> data_get(1024, 1);
  bkt.Get<std::vector<int>>("0", data_get, ctx);

  assert(data_put == data_get);
}
```

# Linking with CMake

Below is an example CMakeLists.txt to link with hermes.

```cmake
cmake_minimum_required(VERSION 3.25)
project(hermes_external)

set(CMAKE_CXX_STANDARD 17)

find_package(Hermes REQUIRED)
message("Found hermes at ${HERMES_LIB_DIR}")
add_executable(test_hermes_external_compile
        external.cc
)
target_link_libraries(test_hermes_external_compile
        hermes::hermes_core_client)
```