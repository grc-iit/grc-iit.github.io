# Singleton
A singleton is used to provide a single instance of a class and a way
to access that object from any method. This case
comes up pretty frequently in our research.

We often use singletons to store configuration data. For example, storage systems and databases such as OrangeFS, Redis, and MongoDB, have configuration files. These files may be in XML, YAML, JSON etc. Often times, it is helpful to store the information from these files in a Singleton. We typically call this a ConfigurationManager.

Singletons are intended to be created once and then destroyed at the end of the program. They are similar to global variables -- except they are much
more readable. The main benefit of the singleton pattern is that you avoid passing a reference to the singleton data to every single function, class, and method. It helps reduce code duplication and the complexity of function parameter lists.

## Usage Example

First, we'll give a brief example of the singleton pattern.

```cpp
#include <iostream>
#include "easy_singleton.h"

#define CONFIG scs::EasySingleton<ConfigurationManager>::GetInstance()

struct ConfigurationManager {
  int a;
  int b;
};

void func1() {
  // Print 25
  std::cout << CONFIG->a << std::endl;
  // Print 30
  std::cout << CONFIG->b << std::endl;
}

int main() {
  // Config instance will be allocated here
  // Set the "a" entry to 25
  CONFIG->a = 25;
  // Set the "b" entry to 30
  CONFIG->b = 30;
  // Call func1
  func1();
}
```

In this example, the CONFIG macro can be called from any function.
There is no need to pass CONFIG to the function func1 directly.
The main benefit of the singleton is you don't have to pass around the
same parameters everywhere.

## Easy Singleton

One way to implement a singleton is in header files. Below is an example of
how to implement the EasySingleton.
```cpp
namespace scs {

/**
 * A class to represent singleton pattern
 * Does not require specific initialization of the static variable
 * */
template<typename T>
class EasySingleton {
 protected:
  /** static instance. */
  static T* obj_;
  static std::mutex lock_;

 public:
  /**
   * Uses unique pointer to build a static global instance of variable.
   * @tparam T
   * @return instance of T
   */
  template<typename ...Args>
  static T* GetInstance(Args&& ...args) {
    if (obj_ == nullptr) {
      lock_.lock();
      if (obj_ == nullptr) {
        obj_ = new T(std::forward<Args>(args)...);
      }
      lock_.unlock();
    }
    return obj_;
  }
};
template <typename T>
T* EasySingleton<T>::obj_ = nullptr;
template <typename T>
std::mutex EasySingleton<T>::lock_;

}  // namespace scs
```

This implementation is also thread-safe. Multiple threads can try to
access the singleton at the same time. This is important when dealing
with multi-threaded codebases. It is possible that multiple threads
will try to initialize the singleton at the same time, which can
cause segfaults.

## Singleton

One limitation of the Easy Singleton is that an instance of the singleton
will be created for each shared object that accesses the singleton. If you use the singleton across different libraries, you will create a copy of the singleton for each shared object, which can lead to initialization and correctness issues.

If you plan to use the singleton across shared objects, you need to implement the singleton as a shared object itself, and then link against it in your CMake.
