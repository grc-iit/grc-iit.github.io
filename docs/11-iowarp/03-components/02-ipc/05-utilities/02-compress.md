# Compress

HSHM provides an interface to many compression libraries (if built with compress support).

## The Factory

The compress factory exposes the following API:
```cpp
class Compressor {
 public:
  Compressor() = default;
  virtual ~Compressor() = default;

  /**
   * Compress the input buffer into the output buffer
   * */
  virtual bool Compress(void *output, size_t &output_size, void *input,
                        size_t input_size) = 0;

  /**
   * Decompress the input buffer into the output buffer.
   * */
  virtual bool Decompress(void *output, size_t &output_size, void *input,
                          size_t input_size) = 0;
};
```

## The Algorithms

We support many compression algorithms:
1. blosc
2. brotli
3. bzip2
4. lz4
5. lzma
6. lzo
7. snappy
8. zlib
9. zstd

## An example

```cpp
#include "hermes_shm/util/compress/compress_factory.h"

int main() {
    hshm::Zlib zlib;
    size_t cmpr_size = 1024, raw_size = 1024;
    zlib.Compress(compressed.data(), cmpr_size,
                    raw.data(), raw.size());
    zlib.Decompress(decompressed.data(), raw_size,
                    compressed.data(), cmpr_size);
    REQUIRE(raw == std::string(decompressed.data(), raw_size));
}
```