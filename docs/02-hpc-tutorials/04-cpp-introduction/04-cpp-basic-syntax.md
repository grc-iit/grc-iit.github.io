# C++ Basic Syntax
In this section, we will discuss some basic concepts of C and C++.
We discuss both C and C++ since you will likely see both.

## Builtin Numeric Types

C++ has a number of builtin integer types.

|Keyword|Description|  
|-------|----------|
|char|A signed 1-byte integer. Can represent ASCII character codes. Always 1 byte.|
|int|A signed integer. Typically 4 bytes.|
|float|A fractional number. Typically 4 bytes.|
|double|A large fractional number. Typically 8 bytes.|

```cpp
int main() {
  int x;
  float x;
  double x;
}
```

There are also *modifiers* which can be applied to these types. There
are two primary types of modifiers: *sign* modifiers and *size* modifiers.

*sign* modifiers apply to int and char specifically.

|Keyword|Description|  
|-------|----------|
|signed|The number can be negative|  
|unsigned|The number cannot be negative|



*size* modifiers apply to int and double types specifically.

|Keyword|Description|Applies to doubles?|  
|-------|----------|------------|
|short|Decrease length of type|No|
|long|Increase length of type|Yes|
|long long|Increase length of type more|Yes|

Below are a few examples of the above:
```cpp
int main() {
  // int examples
  long int a;
  long long int b;
  unsigned int c;
  long unsigned int d;
  unsigned long int e;
  short int f;
  short g;
  long h;

  // Double examples
  long double g;
  long long double h;
}
```

## Sized Types

Certain types are guaranteed to have a specific size. They are included
in the *stdint.h* header file. Having a specific size to types is frequently
useful.

|Keyword|Description|
|-------|----------|
|int8_t|Signed 8-bit integer|
|int16_t|Signed 16-bit integer|
|int32_t|Signed 32-bit integer|
|int64_t|Signed 64-bit integer|
|uint8_t|Unsigned 8-bit integer|
|uint16_t|Unsigned 16-bit integer|
|uint32_t|Unsigned 32-bit integer|
|uint64_t|Unsigned 64-bit integer|

Examples are below:
```cpp
#include <stdint.h>

int main() {
  int8_t a;
  int16_t b;
  uint64_t c;
}
```

## Simple Arrays

Arrays provide a way to define many instances of a single type quickly. Arrays
are stored on the stack, and have limited space. Typically, an array shouldn't
exceed more than 16KB of memory. This is not a hard rule, but I find it to be
generally safe.  Larger allocations should be made on the heap using a memory
allocator, which is described later.

An example is below:
```cpp
int main() {
  int hello[24];

  hello[0] = 0;
  hello[1] = 0;
}
```
We create an array containing 24 ints. We then set the first two elements
of the array to 0.

Arrays can also be initialized as follows:
```cpp
int main() {
  int hello[24] = {
    0, 1, 2, 3, 4, 5, 0
  };

  int hello2[24] = {0};
}
```
The first five elements of *hello* are initialized to 0 through 5. Elements 6
and onwards are initialized to 0.

For *hello2*, all elements are initialized to 0.

## Structs

structs can be used to logically group data.

For example, we can create a struct to represent a wallet. The wallet contains
money (in cents), driver's license, and a health insurance card.
```cpp
#include <stdint.h>

struct Wallet {
  uint8_t cents_;
  char license_[32];
  char health_id_[32];
};  // notice the ; here

int main() {
  struct Wallet wallet;
  wallet.pennies_ = 200;
  strcpy(wallet.license_, "dontpullmeover");
  strcpy(wallet.health_id_, "donthurtme");
}
```
Our wallet contains 200 cents, a license with the text "dontpullmeover",
and a health insure ID which states "donthurtme".

In addition, structs can be initialized using a special syntax to reduce lines
of code. Here we initialize the Lemonade struct. The lemonade can have a certain
amount of sugar, water, lemon juice, and coloring.
```cpp
struct Lemonade {
  int sugar_;  // grams
  int water_;  // mL
  int lemon_;  // mL
  int color_[3];  // (Red, Green, Blue)
}

int main() {
  // NOTE: 255, 255, 0 is yellow on the RGB color wheel
  struct Lemonade sour = {0, 100, 10,
                          255,255,0};
  struct Lemonade sweet = {20, 100, 10,
                           255,255,0};
}
```

## Memory Allocation and Pointers

### Malloc + Free

The very vast majority of data must be stored using a memory allocator.
The C-style way to do this is with malloc and free. Generally, it's
bad practice to directly use ```malloc``` and ```free```. However, sometimes
it is unavoidable. ```malloc``` allocates memory, ```free``` releases memory.
When you fail to release memory using ```free```, it is referred to as a
**memory leak**.

```cpp
#include <cstdlib>  // malloc + free
#include <cstring>  // memset

int main() {
  // Allocate
  int *data = (int*)malloc(64 * sizeof(int));
  // Clear
  memset(data, 0, 64 * sizeof(int));

  // Set integer 10 to 15
  data[10] = 15;

  // Allocate + clear
  int *data2 = (int*)calloc(64, sizeof(int));

  // Set integer 10 to 15
  data2[10] = 15;

  // Release data
  free(data1);
  free(data2);
}
```

When we perform ```int *data = (int*)malloc(64 * sizeof(int));```, malloc
returns a pointer (int*). A pointer is an address in memory which points to the
location of data. Pointers are 8 bytes in size on 64-bit machines and
4 bytes in size on 32-bit machines.

To create variables which have a pointer type, use "*".
```cpp
// A pointer to an integer
int *hello;
// hello1 & hello2 are pointers to integers
int *hello1, *hello2;
// hello3 is a pointer & hello4 is a regular integer
int *hello3, hello4;
```

### std::vector

Alternatively to malloc and free -- generally recommended -- is using a vector.
Memory leaks tend to plague C codebases -- especially for people beginning
programming. It is one of the reasons why C is a difficult language to deal
with. You can avoid a memory leak using vectors. Vectors automatically release
their memory when they go out of scope (i.e., when returning from a function).
In this case, the vector will be freed when returning from main.

```cpp
#include <vector>

int main() {
  // Allocate 64 ints and set to 0.
  std::vector<int> data(64, 0);

  // Set integer 10 to 15
  data[10] = 15;
}
```

## Conditional Statements

Conditions are represented either using "if-else", "switch-case", or "?:".

Let's say you're making a game. Your character is currently shopping at a
market, and they have two options:
1. Purchase fishing bait ($10)
2. Purchase fishing rod ($65)

We can implement this market using conditional statements. We show the
different ways to do this in the sections below.

### Conditional Operators

C/C++ provides various conditional operators. These operators are generally used
in if-else statements only. Conditional operators in C work only over integers
and pointers. In C++, operators can be overloaded, which will be discussed later
in 3.06.

|Name|Description|
|-------|----------|
|``A < B``|Less than operator. A is less than B.|
|``A <= B``|Less than or equal operator. A is at most B.|
|``A > B``|Greater than operator. A is larger than B.|
|``A >= B``|Greater than or equal operator. A is at least B.|
|``A == B``|Equality operator. A and B are the same|
|``A !\= B``|Inequality operator. A and B are not the same.|
|``A && B``|AND operator. Both A and B are true.|
|``A \\ B``|OR operator. One of A or B is true.|
|``!A``|NOT operator. Check if A is not true.|

### If-Else

If-else statements are generally used when conditions in the if-else
statement are complex.

```cpp
#include <stdexcept>  // runtime_error

size_t market(int key) {
  if (key == 1) {
    return 10;
  } else if (key == 2) {
    return 65;
  } else {
    throw std::runtime_error("An invalid menu item");
  }
}
```

Let's say key == 2. First, key == 1 is checked. Then key == 2 is checked.
key == 2 is true. Thus, the function returns 65.

NOTE: if will return true if a value is larger than 0. For example:
```cpp
int main() {
  if (25) {
    std::cout << "This is true" << std::endl;
  }
  if (1) {
    std::cout << "This is also true" << std::endl;
  }
  if (0) {
    std::cout << "This is false" << std::endl;
  }
}
```

This will have the following output:
```bash
This is true
This is also true
```

### Switch-Case

Switch-case avoids using if-else statements for simple integer comparisons.
Compilers optimize switch-case statements and do not necessarily translate
directly into if-else statements.

In the previous example, when key == 2, if-else requires two comparisons.
First, check if key == 1, and then check key == 2. Switch-case avoids
checking if key == 1 and jumps directly to key == 2, reducing the number
of comparisons. With large switch-case statements, this can be a
benefit.

In other words, this example is the best use case of a switch-case statement.

With a swith-case, this would be:
```cpp
#include <stdexcept>  // runtime_error

size_t market(int key) {
  switch(key) {
    case 1: {
      return 10;
    }
    case 2: {
      return 64;
    }
    default: {
      throw std::runtime_error("An invalid menu item");
    }
  }
}
```

Switch-case can also use break statements.
```cpp
#include <stdexcept>  // runtime_error

size_t market(int key) {
  int val;
  switch(key) {
    case 1: {
      val = 10;
      break;  // Stop checking cases
    }
    case 2: {
      val = 64;
      break;  // Stop checking cases
    }
    default: {
      throw std::runtime_error("An invalid menu item");
    }
  }
  return val;
}
```

Break statements mean not to go to the next case. For example, if we
removed the break statement in case 1, we would have the following:
```cpp
size_t market(int key) {
  int val;
  switch(key) {
    case 1: {
      val = 10;
    }
    case 2: {
      val = 64;
      break;
    }
    default: {
      throw std::runtime_error("An invalid menu item");
    }
  }
  return val;
}
```
If key == 1, val would be set to 10, and then it would be set to 64.
In other words, val would be equal to 64, which is incorrect.

### ?:

?: is generally not very useful, but you may come across it
occasionally. Sometimes it can reduce lines of code. It is used as follows:

```cpp
size_t market(int key) {
  if (key != 1 && key != 2) {
    throw std::runtime_error("An invalid menu item");
  }
  // condition ? value when true : value when false;
  // If key == 1, return 10
  // Else, return 64.
  return key == 1 ? 10 : 64;
}
```

Generally, ?: is used when the condition is very simple, and the values
the condition return are very simple. In the above example, this is true.
Although switch-case is the most correct for this example.

## Loop Statements

There are two general types of loops in C++:
1. for loop
2. while loop
3. do-while loop

### For loop

```cpp
int main() {
  for (int i = 0; i < 4; ++i) {
    std::cout << i << std::endl;
  }
}
```

Output:
```bash
0
1
2
3
```

### While loop

```cpp
int main() {
  int i = 0;
  while(i < 4) {
    std::cout << i << std::endl;
    ++i;
  }
}
```

Output:
```bash
0
1
2
3
```

### Do-While Loop

Do-while statements execute the first iteration of the loop without
checking the condition first. This circumstance sometimes comes up.

```cpp
int main() {
  do {
    std::cout << i << std::endl;
    ++i;
  } while(i < 4);
}
```

Output:
```bash
0
1
2
3
```

## Files and I/O

There are many ways to interact with files in C++. A file is an array of
bytes. This list is not exhaustive, but these are three common ways:
* stdc++fs
* STDIO
* POSIX (*Linux-specific)

We will introduce each of them here.

### Basic Filesystem Operations

Regardless of the API you use, filesystems have a few general
operations:
1. Create a new file
2. Open an existing file
3. Write to a file
4. Read from a file
5. Query statistics of the file (e.g., file size, last modify time)
6. Close a file
7. Delete a file

We won't show every API in this snippet. Instead, we'll show an example
which demonstrates the following:
1. How to create a new file and write to it
2. How to get the size of the file
3. How to read from the file
4. How to close the file

### stdc++fs

This is technically the way C++ recommends to do File I/O in general.
In HPC, it doesn't get used very often, though. Most HPC programs use
STDIO or POSIX. However, we introduce here anyway. It is located in
[libstdc.cc](https://github.com/grc-iit/grc-tutorial/blob/main/cpp/04-cpp-basic-syntax/src/libstd.cc).

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <filesystem>

void create_data() {
  // Write to a file using ofstream
  std::ofstream out_file("example.txt");
  if (out_file.is_open()) {
    out_file << "Hello, World!" << std::endl;
    out_file.close();
  } else {
    std::cout << "Error opening the file." << std::endl;
    exit(1);
  }
}

void read_data() {
  // Get the size of the file
  size_t file_size = std::filesystem::file_size("example.txt");

  // Read from the file using ifstream
  std::ifstream in_file("example.txt");
  if (in_file.is_open()) {
    std::string data(file_size, '\0');
    // Read the entire file into data string
    in_file.read(data.data(), file_size);
    in_file.close();
    // Print out the data
    std::cout << data << std::endl;
  } else {
    std::cout << "Error opening the file." << std::endl;
    exit(1);
  }
}

int main() {
  create_data();
  read_data();
}
```

To compile & run the code:
```bash
cd ${GRC_TUTORIAL}/cpp/04-cpp-basic-syntax
mkdir build
cd build
make
./bin/test_libstd
```

Output:
```
Hello, World!
```

### STDIO

The following example demonstrates the basics of the STDIO API.
The code is located in [stdio.cc](https://github.com/grc-iit/grc-tutorial/blob/main/cpp/04-cpp-basic-syntax/src/stdio.cc).

```cpp
#include <stdio.h>
#include <stdlib.h>

void create_data() {
  // Create a new file
  FILE* file = fopen("example.txt", "w");
  if (file == NULL) {
    perror("Error creating the file");
    return 1;
  }

  // Write to the file
  std::string data = "Hello, World!\n";
  if (fwrite(data.c_str(), data.size(), 1, file) < 0) {
    perror("Error writing to the file");
    fclose(file);
    return 1;
  }

  fclose(file);
}

void read_data() {
  // Open file for reading
  file = fopen("example.txt", "r");
  if (file == NULL) {
    perror("Error opening the file for reading");
    return 1;
  }

  // Get the size of the file
  fseek(file, 0L, SEEK_END);
  long file_size = ftell(file);
  if (file_size < 0) {
    perror("Error getting file size");
    fclose(file);
    return 1;
  }
  fseek(file, 0L, SEEK_SET);

  // Read the entire file into memory
  std::string data(file_size + 1, '\0');
  if (fread(data.data(), 1, file_size, file) != file_size) {
    perror("Error reading the file");
    fclose(file);
    return 1;
  }
  fclose(file);

  // Print out the data
  std::cout << data << std::endl;
  return 0;
}

int main() {
  create_data();
  read_data();
}
```

To compile & run the code:
```bash
cd ${GRC_TUTORIAL}/cpp/04-cpp-basic-syntax
mkdir build
cd build
make
./bin/test_stdio
```

Output:
```
Hello, World!
```

### POSIX

The following example demonstrates the basics of the POSIX API.
It is located in [posix.cc](https://github.com/grc-iit/grc-tutorial/blob/main/cpp/04-cpp-basic-syntax/src/posix.cc).

```cpp
#include <stdio.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

void create_data() {
  // Create a new file
  int out_fd = open("example.txt", O_CREAT | O_WRONLY, 0644);
  if (out_fd == -1) {
    perror("Error creating the file");
    return 1;
  }

  // Write to the file
  std::string data = "Hello, World!\n";
  ssize_t bytes_written = write(out_fd, data.c_str(), data.size());
  if (bytes_written < 0) {
    perror("Error writing to the file");
    close(out_fd);
    return 1;
  }
  close(out_fd);
}

void read_data() {
  // Get the size of the file
  struct stat st;
  if (stat("example.txt", &st) == -1) {
    perror("Error getting file size");
    return 1;
  }
  off_t file_size = st.st_size;

  // Open the file in read-only mode
  out_fd = open("example.txt", O_RDONLY);
  if (out_fd == -1) {
    perror("Error opening the file for reading");
    return 1;
  }

  // Read the entire file into memory
  std::string data(file_size + 1, '\0');  // NOTE: +1 for null-terminator
  ssize_t bytes_read = read(out_fd, data.data(), file_size);
  if (bytes_read < 0) {
    perror("Error reading the file");
    close(out_fd);
    return 1;
  }
  close(out_fd);

  // Print the data
  std::cout << data << std::endl;
}

int main() {
  create_data();
  read_data();
}
```

To compile & run the code:
```bash
cd ${GRC_TUTORIAL}/cpp/04-cpp-basic-syntax
mkdir build
cd build
make
./bin/test_posix
```

Output:
```
Hello, World!
```

## Functions & Parameters

In this section, we'll give a brief overview of different ways to pass
parameters to functions.

There are four general ways to pass data to a function:
1. **Pass by value**: copy data to the function
2. **Pass by left-value reference**: a reference to the data is passed to the function. Modifications to data in the function will be reflected after returning from the function.
3. **Pass by right-value reference**: Right-value references represent temporary
objects. The main use case is to move data from one object into another.
4. **Pass by const reference**: Const references are special. They can either pass an existing object to a function by reference, or construct the object in-place and pass to the function. Both right-value and left-value references can be passed to const references.

```cpp
#include "timer.h"
#include <iostream>

// Data will be copied to the function
// This can be expensive for large objects
void GetSumByValue(std::string data) {
  int sum = 0;
  for (const char &c : data) {
    sum += c;
  }
}

// Data will be passed by reference
// This is more efficient than passing by value
// data can be modified by the function
void GetSumByLvalReference(std::string &data) {
  int sum = 0;
  for (const char &c : data) {
    sum += c;
  }
}

// Data will be passed by reference
// Same as above, but data cannot be modified by the function
void GetSumByConstReference(const std::string &data) {
  int sum = 0;
  for (const char &c : data) {
    sum += c;
  }
}

// Data will be moved to the function without copying
// The original data object is no longer valid after this function
// NOTE: && is a single operator, not two ampersands.
void GetSumByRvalReference(std::string &&data) {
  int sum = 0;
  for (const char &c : data) {
    sum += c;
  }
}

int main() {
  // Create a string of 16 MB
  std::string data(16 * (1 << 20), 'a');
  Timer timer[3];

  timer[0].Resume();
  GetSumByValue(data);
  timer[0].Pause();

  timer[1].Resume();
  GetSumByLvalReference(data);
  timer[1].Pause();

  timer[2].Resume();
  GetSumByRvalReference(std::move(data));
  timer[2].Pause();

  std::cout << "By value: " << timer[0].GetUsec() << std::endl;
  std::cout << "By lval reference: " << timer[1].GetUsec() << std::endl;
  std::cout << "By rval reference: " << timer[2].GetUsec() << std::endl;
}
```

To compile & run the code:
```bash
cd ${GRC_TUTORIAL}/cpp/04-cpp-basic-syntax
mkdir build
cd build
make
./bin/test_parameter_pass
```

On my machine, the output was:
```
By value: 6163.84
By lval reference: 0.04
By rval reference: 0.04
```

Generally, passing by value should be avoided. The main use of pass by value is
for simple types, such as integers and floats. Structs and objects should be
passed by reference. Const references should be prioritized when they make sense
to use.

## Macros

Macros are replaced at compile-time with the code inside of the macro. Macros
are not type-checked. They can be helpful to reduce code repetition or to
change the way code is compiled. Macros should be used sparingly, since
they increase the complexity of debugging code. It is difficult to debug
macros directly.

Macros are sometimes used to define constants.
```cpp
#define MY_CONST 0

int main() {
  // Will print 0
  std::cout << MY_CONST << std::endl;
}
```

Macros can take parameters
```cpp
#define MY_MACRO(A, B)  printf(A, B);

int main() {
  // Will print hi
  MY_MACRO("%s\n", "hi")
}
```

Macros can take a variable number of parameters.
```cpp
#define MY_MACRO(A, ...) printf(A, __VA_ARGS__)

int main () {
  // Will print 1243
  MY_MACRO("%d%d%d\n", 1, 2, 3);
}
```

Macros can be defined on multiple lines using "\":
```cpp
#define MY_MACRO \
  void MyFunc() { \
    std::cout << "hi" << std::endl; \
  }

int main() {
  MyFunc();
}
```

## Enum Classes

Enumerations allow you to define a sequence of named integers. They
are particularly useful with switch-case statements.

```cpp
enum class FruitEnum {
  kApple,  // Equivalent to "0"
  kBanana,  // Equivalent to "1"
  kDragonFruit  // Equivalent to "2"
};

int main() {
  FruitEnum my_enum = FruitEnum::kApple;
  int enum_val = static_cast<int>(my_enum);

  switch (my_enum) {
    case FruitEnum::kApple: {
      break;
    }
    default {
      break;
    }
  }
}
```

## Exercise: Kitchen Fire Investigation

Pretend we are insurance auditors. We are investigating a kitchen fire which
burned down a popular Chicago restaurant: O'leary Smoke House. Fortunately the
entire city didn't burn down this time.

The restaurant had a smart thermometer which was tracking the temperature
and carbon monoxide (CO) level of the kitchen.
We want to analyze the dataset to determine the following:
1. When did the fire start and end? We assume the fire is started when the
temperature is at least 95 Farenheit OR the CO level is 200ppm. The fire
ends when both of these statements are no longer true.
2. What was the average temperature during the fire?
3. What was the average CO level during the fire?

To get the dataset, run the following:
```bash
cd ${GRC_TUTORIAL}/cpp/04-cpp-basic-syntax
mkdir build
cd build
make
./bin/make_kitchen_fire
```

The dataset will be stored in "kitchen_fire.bin". It is not human-readable. The
dataset contains atmospheric readings for every minute of the 24-hour day. There
are 1,440 minutes in a day. Each reading contains two entries: (Temperature,
Carbon Monoxide). They are represented as follows:

```
struct SensorEntry {
  float temp_;
  float co_;
};
```

To run the sample solution:
```bash
./bin/analyze_kitchen_fire
```

Expected output:
```
Start of fire: 621
End of fire: 650
Average temperature: 102.5
Average CO: 280
```

Your Objectives:
1. Create a file called my_analyze_kitchen_fire.cc in the ``${GRC_TUTORIAL}/cpp/04-cpp-basic-syntax`` directory
2. Edit the CMakeLists.txt in that directory to compile your code. Feel free to look at how the other sources in that directory were compiled.
3. How do you read "kitchen_fire.bin" and interpret its contents?
4. How do you analyze its contents to determine the start, end, and average
values for the fire?
5. You should create separate functions for determining the start, end, and average values for the fire.
6. Compare your solution to the sample solution.

What this exercise covers:
1. Basic data types (integers, floats, struct, etc.)
2. Conditional statements + loops
3. How to read a file
4. Functions + references
5. How to edit a CMake to compile your code
