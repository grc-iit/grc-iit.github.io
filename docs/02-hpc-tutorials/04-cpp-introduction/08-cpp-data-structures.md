# C++ Data Structures
The objective of this section is to provide an overview of the capabilities and
performance characteristics of our favorite data structures. This is not a
documentation page for every single container provided in C++.

## std::vector

An [std::vector](https://cplusplus.com/reference/vector/vector/) stores objects
sequentially in memory. They are also known as dynamically-sized arrays. Unlike
typical arrays, vectors do not necessarily have a fixed size. We describe the
basic usage below. This isn't comprehensive, check the documentation for a full
list of features.

### Construct

There are a few ways to create a vector
```cpp
#include <vector>
void TestVectorConstruct() {
  // An empty vector, no space allocated
  std::vector<int> vec1;
  // A vector of 100 ints, ints can be any value
  std::vector<int> vec2(100);
  // A vector of 100 ints, ints are initialized to 0
  std::vector<int> vec3(100, 0);
  // A vector of 5 ints, initialized to 0, 1, 2, 3, 4
  std::vector<int> vec4{0, 1, 2, 3, 4};
}
```

### Insert and Modify

There are a few ways to add and modify elements in a vector
```cpp
#include <vector>
void TestVectorModify() {
  std::vector<int> vec(100);
  // Add element to the back of a vector
  // Size of the vector increases by 1 (now 101)
  vec.emplace_back(2);
  // Insert element at index 1.
  // Size of the vector increases by 1 (now 102)
  vec.emplace(vec.begin() + 1, 1);
  // Modify first element of vector
  // Size of the vector does not change (still 102)
  vec[0] = 1;
}
```

### Access

There are various ways to access elements of a vector:
```cpp
#include <vector>
void TestVectorAccess() {
  std::vector<int> vec(100);
  // Get first element (operator)
  int val1 = vec[0];
  // Get first element (method)
  int val2 = vec.front();
  // Get first element (iterator)
  std::vector<int>::iterator it3 = vec.begin();
  int val3 = *it3;

  // Get last element (operator)
  int val4 = vec[vec.size() - 1];
  // Get last element (method)
  int val5 = vec.back();
  // Get last element (iterator)
  std::vector<int>::iterator it5 = vec.end() - 1;
  int val6 = *it5;

  // Get element at index 10 (operator)
  int val7 = vec[10];
  // Get element at index 10 (iterator)
  std::vector<int>::iterator it8 = vec.begin() + 10;
  int val8 = *it8;

  // Iterate over all elements of the vector
  for (int &val : vec) {
      // Do something with val
  }
  // Iterate over all elements of the vector
  for (auto it = vec.begin(); it != vec.end(); ++it) {
      int &val = *it;
  }
}
```

### Erase

There are a few methods to erase elements from a vector.
```cpp
#include <vector>
void TestVectorErase() {
  // Removes the element at index 2 (value 3)
  std::vector<int> vec1{1, 2, 3, 4, 5};
  vec1.erase(vec1.begin() + 2);
  // Removes values 2 through 4
  // Note, erase does NOT erase the value at vec.begin() + 4
  std::vector<int> vec2{1, 2, 3, 4, 5};
  vec2.erase(vec2.begin() + 1, vec2.begin() + 4);
  // Removes all elements from the vector
  std::vector<int> vec3{1, 2, 3, 4, 5};
  vec3.clear();
}
```

### Capacity & Statistics

Vectors have two main statistics:
1. Capacity: the number of elements that can be stored in the vector
2. Size: the number of elements currently stored in the vector

Capacity >= Size.

To increase capacity without creating new elements, use reserve(). To increase size (i.e., add and construct elements), use resize().

```cpp
#include <vector>
#include <cassert>  // for assert
void TestVectorSize() {
  std::vector<int> vec;
  // Initially empty
  assert(vec.size() == 0);
  // Increase to capacity 100
  vec.reserve(100);
  assert(vec.size() == 0);
  assert(vec.capacity() == 100);
  // Add elements to the vector
  // emplace_back is fast since there is capacity
  vec.emplace_back(0);
  vec.emplace_back(1);
  assert(vec.size() == 2);
  // Increase size to 150
  // Capacity is not necessarily equal to 150
  vec.resize(150);
  assert(vec.size() == 150);
  // Resize can be called with a smaller value
  vec.resize(50);
  assert(vec.size() == 50);
}
```

### Performance Characteristics

|Operation|Runtime Complexity|Memory Complexity|
|-------|----------|------|
|emplace_back|O(1) amortized. Most of the time, there will be enough capacity in the vector to avoid a reallocation. However, when the capacity is reached, a copy of the vector will be made.|O(1) or O(N). May end up creating a copy of the vector if capacity is reached.|
|emplace|O(N) since the vector will have to be shifted. It may also be copied if there's not enough capacity.|O(1) or O(N). May end up creating a copy of the vector if capacity is reached.|
|accessors ([],begin,end,first,last,etc.)|O(1)|O(1)|
|reserve|O(1) or O(N). O(1) if new size is less than old size. Vectors will not make the data smaller, it will just store the new size. O(N) otherwise.|O(1) or O(N) for the same reasons.|
|resize|O(N). Will make a copy of vector if new size is larger than old size. Will erase elements from the vector if new size is smaller than new size.|O(1) or O(N). O(1) if new size is smaller than old size. O(N) otherwise.|
|erase|O(N). Will shift elements after the erased value to the left.|O(1)|
|size / capacity|O(1)|O(1)|

When to use a vector?
1. If the number of elements is fixed or has a reasonable upper bound
2. You are performing many get or modify-in-place operations
3. It makes sense to access an element by an integer index between 0 and
the size of the vector
4. If you do not have to resize the vector often
5. If random access speeed is important to you

Considerations of using a vector:
1. emplace_back can be slow since it will trigger resizes eventually.
Even though the amortized cost is O(1), it can be extremely slow
if inserting many elements.
2. Vectors can have very poor memory utilization if you rely too much
on the dynamic ability. To make them have an O(1) complexity, they multiply
the capacity of the vector by a factor. As the size of the vector grows,
the space waste can be pretty bad.

## std::list

[std::list](https://cplusplus.com/reference/list/list/list/) is typically implemented as doubly-linked list. We describe the basic usage below.
This isn't comprehensive, check the documentation for a full list
of features.

### Construct

These are the main ways to construct a new std::list.
```cpp
#include <list>
void TestListConstruct() {
  // An empty list
  std::list<int> list1;
  // A list of 100 ints, ints can be any value
  std::list<int> list2(100);
  // A list of 100 ints, ints are initialized to 0
  std::list<int> list3(100, 0);
  // A list of 5 ints, initialized to 0, 1, 2, 3, 4
  std::list<int> list4{0, 1, 2, 3, 4};
}
```

### Insert + Modify

These are the main ways to insert + modify elements in an std::list.
```cpp
#include <list>
#include <iterator>  // std::next
void TestListModify() {
  // Add element at front of list
  // List becomes 0, 1, 2, 3, 4
  std::list<int> list1{1, 2, 3, 4};
  list1.emplace_front(0);
  // Add element at back of list
  // List becomes 0, 1, 2, 3, 4
  std::list<int> list2{0, 1, 2, 3};
  list2.emplace_back(4);
  // Add element at index 4 in the list
  // List becomes 0, 1, 2, 3, 4, 5
  std::list<int> list3{0, 1, 2, 4, 5};
  list3.emplace(std::next(list3.begin(), 4), 2);
  // Modify element at index 2 in the list
  std::list<int> list4{0, 1, 3, 3, 4};
  std::list<int>::iterator it = std::next(list4.begin(), 2);
  (*it) = 2;
}
```

### Access

There are a few ways to access elements in an std::list
```cpp
#include <list>
void TestListAccess() {
  std::list<int> list{0, 1, 2, 3, 4};
  // Get first element (method)
  int val1 = list.front();
  // Get first element (iterator)
  std::list<int>::iterator it1 = list.begin();
  int val2 = *it1;
  // Get last element (method)
  int val3 = list.back();
  // Get last element (iterator)
  std::list<int>::iterator it2 = list.end();
  int val4 = *(--it2);
  // Get element at index 2 (iterator)
  std::list<int>::iterator it3 = std::next(list.begin(), 2);
  int val5 = *it3;

  // Iterate over all elements in the list
  for (int &val : list) {
      // Do something with val
  }
  // Iterate over all elements in the list
  for (auto &it = list.begin(); it != list.end(); ++it) {
      int val = *it;
  }
}
```

std::next(list.begin(), n) is an O(n) operation. Unlike vectors, lists
are not stored contiguously in memory so you have to traverse each
element of the list.

### Erase

To erase elements from the list:
```cpp
void TestListErase() {
  // Removes the element at index 2 (value 3)
  std::list<int> list1{1, 2, 3, 4, 5};
  list1.erase(std::next(list1.begin(), 2));
  // Removes values 2 through 4
  // Note, erase does NOT erase the value at vec.begin() + 4
  std::list<int> list2{1, 2, 3, 4, 5};
  list2.erase(std::next(list2.begin(), 1), std::next(list2.begin(), 4));
  // Removes all elements from the list
  std::list<int> list3{1, 2, 3, 4, 5};
  list3.clear();
}
```

### Statistics

The main statistic that can be queried from a list are its size.
```cpp
void TestListStatistic() {
  std::list<int> list;
  // Initially empty
  assert(list.size() == 0);
  assert(list.empty());
}
```

### Performance Characteristics


|Operation|Runtime Complexity|Memory Complexity|
|-------|----------|------|
|emplace|O(1) when the position being emplaced at is known.|O(1)|
|std::next|O(N)|O(1)|
|erase|O(1)|O(1)|
|size / capacity|O(1)|O(1)|

When to use a list?
1. Frequent insertions and deletions, but few random accesses

Considerations:
1. Lists can be inefficient on memory usage. There is a cost to storing
the forward and backward pointers -- 16 bytes on 64-bit machine. A list
of ints, for example, will have to store 20 bytes per entry, whereas a
vector would be just 4 bytes per entry.
2. List traversals can be inefficient on CPU caches. This is because the prefetcher algorithm has a harder time prediciting what the next memory location is to load into the CPU cache. Make sure the task being performed isn't so performance-critical that this matters.

## std::pair

[std::pair](https://cplusplus.com/reference/utility/pair/) is used to represent
two values. They should be used when it is intuitive why one element is first
and the next element is second. They are often used to represent key-value
pairs, where the key is first and the value is second. Structs are preferred
over pairs when the elements have more meaningful names than "first" and
"second".

### Construct

A pair can be constructed using the following methods:
```cpp
#include <utility>
void TestPairConstruct() {
  // A pair of ints, initialized to 0, 0
  std::pair<int, int> pair1;
  // A pair of ints, initialized to 1, 2
  std::pair<int, int> pair2(1, 2);
  // A pair of ints, initialized to 1, 2
  std::pair<int, int> pair3 = {1, 2};
  // A pair of ints, initialized to 1, 2
  std::pair<int, int> pair4 = std::make_pair(1, 2);
}
```

### Access + Modify

Pairs store data using the "first" and "second" variables.
```cpp
#include <utility>
void TestPairModify() {
    std::pair<int, int> pair(1, 2);
    pair.first = 3;
    pair.second = 4;
}
```

## std::unordered_map

[std::unordered_map](https://cplusplus.com/reference/unordered_map/unordered_map/) is typically implemented as a chained hashtable. It is
efficient for lookups and inserts. Entries into the hashtable are unique.
You cannot have duplicate entries. Unordered maps can also be referred
to as key-value stores.

### Construct

```cpp
#include <unordered_map>
void TestUnorderedMapConstruct() {
  // An empty unordered_map
  std::unordered_map<int, int> map1;
  // An unordered_map with 100 elements
  std::unordered_map<int, int> map2(100);
  // An unordered_map with 5 elements, initialized to 0, 1, 2, 3, 4
  std::unordered_map<int, int> map3{{0, 0}, {1, 1}, {2, 2}, {3, 3}, {4, 4}};
}
```

### Insert + Modify

Elements can either be emplaced into the map or overriden using the
assignment operator. Emplace will fail if the element exists in the
unordered_map already. Assignment will override the element if it
exists. It will create a new element if the key doesn't exist in the map.

```cpp
#include <unordered_map>
void TestUnorderedMapModify() {
  // Add a key-value pair to the unordered_map
  std::unordered_map<int, int> map1;
  map1.emplace(0, 0);
  // Modify the value of a key-value pair or create a new one
  std::unordered_map<int, int> map2{{0, 0}};
  map2[0] = 1;
}
```

### Access

There are a few ways to access elements:
```cpp
#include <unordered_map>
void TestUnorderedMapAccess() {
  std::unordered_map<int, int> map{{0, 0}, {1, 1}, {2, 2}};
  // Get value associated with key 1 (method)
  int val1 = map.at(1);
  // Get value associated with key 1 (operator[])
  int val2 = map[1];
  // Get value associated with key 1 (iterator)
  std::unordered_map<int, int>::iterator it = map.find(1);
  int val3 = it->second;

  // Iterate over the entire unordered map
  for (const std::pair<int, int> &pair : map) {
    // Do something with the pair
  }
  // Iterate over the entire unordered map
  // auto &[key, value] is a special syntax for std::pair
  for (auto &[key, value] : map) {
    // Do something with the pair
  }
  // Iterate over the entire unordered map
  for (auto it = map.begin(); it != map.end(); ++it) {
      const std::pair<int, int> &pair = *it;
  }
}
```

### Statistics

The main statistic that can be queried is its size.
```cpp
#include <unordered_map>
void TestUnorderedMapStatistics() {
  std::unordered_map<int, int> map;
  // Initially empty
  assert(map.size() == 0);
  assert(map.empty());
}
```

### Performance Characteristics

|Operation|Runtime Complexity|Memory Complexity|
|-------|----------|------|
|emplace|O(1)|O(1)|
|find|O(1)|O(1)|
|erase|O(1)|O(1)|
|size / capacity|O(1)|O(1)|

Considerations:
1. Iterating over an unordered_map can be slow. It has to iterate over
buckets and collisions, which has a performance penalty. Iterating over
a list or vector is typically much faster.

## std::string

A string is used to represent an array of characters, typically
ASCII characters. It's similar to an ```std::vector<char>```.
However, they have constructors and methods tailored for
making data human-readable, unlike vectors.

We won't document every single thing that can be done with a string
here, but they're fairly powerful.

### Construct

These are the basic ways to construct a string:
```cpp
#include <string>
void TestStringConstruct() {
  // An empty string
  std::string str1;
  // A string with 100 'a' characters
  std::string str2(100, 'a');
  // A string with 5 elements, initialized to abcde
  std::string str4 = "abcde";
}
```
Each of these will create a null-terminated string.

### Access

The following demonstrates the primary ways to index a string:
```cpp
#include <string>
void TestStringAccess() {
  std::string str = "abcde";
  // Get first character (method)
  char val1 = str.front();
  // Get first character (operator[])
  char val2 = str[0];
  // Get last character (method)
  char val3 = str.back();
  // Get last character (operator[])
  char val4 = str[str.size() - 1];
  // Get character at index 2 (operator[])
  char val5 = str[2];
  // Get a c-style string
  const char *c_str = str.c_str();
  const char *c_str2 = str.data();
  char *data = &str[0];
  // Iterate over all characters in the string
  for (char &c : str) {
      // Do something with c
  }
  // Iterate over all characters in the string
  for (auto it = str.begin(); it != str.end(); ++it) {
      char &c = *it;
  }
}
```

### Insert + Modify

To insert new entries into a string or modify a entries
```cpp
#include <string>
void TestStringModification() {
  std::string str = "abcde";
  // Append a character to the end of the string
  str.push_back('f');
  // Append a string to the end of the string
  str.append("ghijk");
  // Insert a character at index 2
  str.insert(2, "l");
  // Insert a string at index 3
  str.insert(3, "mnopq");
  // Modify the character at index 2
  str[2] = 'r';
  // Resize a string
  std::string str2;
  str2.resize(10);
  // Reserve space for a string
  std::string str3;
  str2.reserve(10);
}
```

### Concatenation

Strings can be concatenated using the addition operator.

```cpp
#include <string>
void TestStringConcatenation() {
  std::string str1 = "abc";
  std::string str2 = "def";
  // Concatenate two strings
  std::string str3 = str1 + str2;
  // Concatenate a string and a character
  std::string str4 = str1 + 'g';
  // Concatenate a string and a C-style string
  std::string str5 = str1 + "hij";
  // Concatenate a string and a number
  std::string str6 = str1 + std::to_string(7);
  // Concatenate a string and a number
  std::string str7 = str1 + std::to_string(8.9);
}
```

### Conversions

A common operation with strings is to convert a number to a string
and vice-versa.

To convert a number to a string:
```cpp
#include <string>
void TestNumberToStringConversion() {
  int val1 = 123;
  long val2 = 123;
  long long val3 = 123;
  unsigned long val4 = 123;
  unsigned long long val5 = 123;
  float val6 = 123.456;
  double val7 = 123.456;
  long double val8 = 123.456;
  // Convert an int to a string
  std::string str1 = std::to_string(val1);
  // Convert a long to a string
  std::string str2 = std::to_string(val2);
  // Convert a long long to a string
  std::string str3 = std::to_string(val3);
  // Convert an unsigned long to a string
  std::string str4 = std::to_string(val4);
  // Convert an unsigned long long to a string
  std::string str5 = std::to_string(val5);
  // Convert a float to a string
  std::string str6 = std::to_string(val6);
  // Convert a double to a string
  std::string str7 = std::to_string(val7);
  // Convert a long double to a string
  std::string str8 = std::to_string(val8);
}
```

To convert a string to a number:
```cpp
#include <string>
void TestStringToNumberConversion() {
  std::string str = "123";
  // Convert a string to an int
  int val1 = std::stoi(str);
  // Convert a string to a long
  long val2 = std::stol(str);
  // Convert a string to a long long
  long long val3 = std::stoll(str);
  // Convert a string to an unsigned long
  unsigned long val4 = std::stoul(str);
  // Convert a string to an unsigned long long
  unsigned long long val5 = std::stoull(str);
  // Convert a string to a float
  float val6 = std::stof(str);
  // Convert a string to a double
  double val7 = std::stod(str);
  // Convert a string to a long double
  long double val8 = std::stold(str);
}
```

## Other Data Structures

C++ has various other data structures that may also come up. This list
is not exhaustive, but these are common ones:
1. [std::unordered_set](https://cplusplus.com/reference/unordered_set/unordered_set/) is implemented using a hash table. It's similar to
an unordered_map.
2. [std::queue](https://cplusplus.com/reference/queue/queue/) is a first-in-first-out queue
3. [std::priority_queue](https://cplusplus.com/reference/queue/priority_queue/) is a queue which uses a max heap to implement priorities.
4. [std::set](https://cplusplus.com/reference/set/set/) is an ordered set. The order with which elements are inserted are maintained. It's slower than an std::unordered_set in general, so use carefully.
5. [std::map](https://cplusplus.com/reference/map/map/) is an ordered map. The order with which elements are inserted are maintained. It's slower than an std::unordered_map in general, so use carefully.

## A Note on Thread Safety

STL data structures are not thread-safe. Multiple threads inserting
into an unordered_map at the same time, for example, can cause the program
to be incorrect or segfault. You'll have to use synchronization methods,
such as locks, in order to support concurrent access.
