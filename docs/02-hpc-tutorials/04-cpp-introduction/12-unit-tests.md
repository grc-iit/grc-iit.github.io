# Unit Testing in C++

## a) Why is Testing Important?

Unit testing is a crucial aspect of software development. Here's why:

1. **Quality Assurance**: Unit tests ensure that individual units of code (like functions or methods) work as intended.
2. **Regression Detection**: When changes are made to the codebase, unit tests can detect if previously working functionality has been broken.
3. **Documentation**: Tests provide a form of documentation by showcasing how a piece of code is intended to be used.
4. **Design**: Writing tests can help in designing better and more modular code.
5. **Confidence**: With a comprehensive suite of tests, developers can make changes with the confidence that they haven't inadvertently introduced bugs.

**Example**:
Imagine you have a function `add(int a, int b)` that returns the sum of two numbers. A unit test would ensure that `add(2, 3)` always returns `5`.

## b) Testing in CMake with CTest

CTest is a testing tool distributed as a part of CMake. It allows you to easily create, manage, and run your tests.

**Basic Example**:

1. In your `CMakeLists.txt`, enable testing:
   ```cmake
   enable_testing()
   ```

2. Add a test executable:
   ```cmake
   add_executable(my_test test.cpp)
   ```

3. Add the test to CTest:
   ```cmake
   add_test(NAME MyTest COMMAND my_test)
   ```

4. Build and run tests:
   ```bash
   mkdir build && cd build
   cmake ..
   make
   ctest
   ```

**Documentation**: [CTest Documentation](https://cmake.org/cmake/help/latest/manual/ctest.1.html)

Using `FetchContent` is a popular way to integrate dependencies directly into a CMake project. Here's how you can integrate Google Test using `FetchContent`:

---

## c) Testing in CMake with Google Test

Google Test is a popular C++ testing framework. Here's how you can integrate it with CMake using `FetchContent`:

1. **Installation using `FetchContent`**:

   In your `CMakeLists.txt`, you can fetch Google Test as follows:

   ```cmake
   include(FetchContent)

   FetchContent_Declare(
     googletest
     GIT_REPOSITORY https://github.com/google/googletest.git
     GIT_TAG        release-1.10.0
   )

   FetchContent_MakeAvailable(googletest)
   ```

   This will download, build, and make Google Test available in your project.

2. **Integration with CMake**:

   After fetching Google Test, you can link against it:

   ```cmake
   add_executable(my_gtest test_gtest.cpp)
   target_link_libraries(my_gtest gtest_main)
   ```

3. **Writing a Test**:

   ```cpp
   #include <gtest/gtest.h>

   TEST(MyTestSuite, MyTestCase) {
       EXPECT_EQ(2 + 3, 5);
   }
   ```

   With `gtest_main` as a linked library, you don't need a `main` function; Google Test provides one for you.

4. Build and run tests as you would with CTest.

**Documentation**: [Google Test Github Repository](https://github.com/google/googletest)