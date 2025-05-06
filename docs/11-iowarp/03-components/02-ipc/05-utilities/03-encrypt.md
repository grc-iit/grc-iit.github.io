# Encryption

HSHM provides an interface to encryption libraries when built with encrypt support.

Currently, there are two supported:
* AES
* Blowfish

For now, we do not abstract encryption libraries behind a class like the compression
ones. When we integrate more, we will see the commonalities between them to do this.

## API

Both blowfish and AES have the same structure.

```cpp
class AES {
 public:
  std::string key_;
  std::string iv_;
  std::string salt_;

 public:
  void CreateInitialVector(const std::string &salt = "");

  void GenerateKey(const std::string &password);

  bool Encrypt(char *output, size_t &output_size, char *input,
               size_t input_size);

  bool Decrypt(char *output, size_t &output_size, char *input,
               size_t input_size);
};
```

## Example

Below is an example:
```cpp
#include "hermes_shm/util/encrypt/encrypt.h"

int main() {
    hshm::AES crypto;
    crypto.GenerateKey("passwd");
    size_t encoded_size = 8192 + 256, decoded_size = 8192;
    std::vector<char> data(8192, 0), encoded(8192 + 256, 1),
        decoded(8192 + 256, 2);
    crypto.CreateInitialVector();
    crypto.Encrypt(encoded.data(), encoded_size, data.data(), data.size());
    crypto.Decrypt(decoded.data(), decoded_size, encoded.data(), encoded_size);
    decoded.resize(decoded_size);
    REQUIRE(data == decoded);
}
```
