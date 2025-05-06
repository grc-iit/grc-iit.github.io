# C++ References and Pointers
C++ has various ways to pass data and manage memory. This section goes
into more details 

## Rvalues, Lvalues
In C++, understanding the concepts of **rvalues** and **lvalues** is crucial for efficient resource management and parameter passing. Additionally, knowing how to pass objects as copies or moves and working with managed pointers is essential for effective memory management.

### Rvalues and Lvalues

In C++, every expression yields either an **lvalue** or an **rvalue**:

- **Lvalues**: Lvalues are expressions that represent objects with a persistent identity. They typically correspond to variables, data members, or objects with names. Lvalues can appear on both the left and right sides of an assignment.

- **Rvalues**: Rvalues are expressions that represent temporary values, often used on the right side of an assignment. They do not have a persistent identity and are usually the result of operations or computations.

Example:

```cpp
int x = 42;       // 'x' is an lvalue
int y = x + 5;    // 'x + 5' is an rvalue
```
## Constructors and Destructors Revisited
Constructors and destructors are special member functions that play a crucial role in object creation and resource management. In C++, you can define multiple constructors to create objects in various ways, and destructors ensure that resources are released when an object goes out of scope.

### Copy Constructor
A copy constructor is a constructor used to create a new object as a copy of an existing object. It is invoked when an object is passed by value or returned by value. Properly implementing copy constructors is essential for handling objects correctly in C++.

Example:
```cpp
class MyClass {
private:
    int data;

public:
    MyClass(int d) : data(d) {}

    // Copy constructor
    MyClass(const MyClass& other) : data(other.data) {}
};

// Usage
int main() {
    MyClass obj1(42);
    MyClass obj2 = obj1; // Copy constructor invoked
    return 0;
}
```

### Move Constructor
Move constructors are introduced in C++11 and are used to efficiently transfer ownership of resources (such as memory) from one object to another. They are invoked when moving objects, typically improving performance in scenarios involving dynamic memory management.

Example:
```cpp
class MyString {
private:
    char* str;

public:
    MyString(char* s) : str(s) {}

    // Move constructor
    MyString(MyString&& other) noexcept : str(other.str) {
        other.str = nullptr;
    }
};

// Usage
int main() {
    char* text = "Hello, World!";
    MyString str1(text);
    MyString str2 = std::move(str1); // Move constructor invoked
    return 0;
}
```

## Moving and copying
### Passing as a Copy

Passing an object as a copy involves creating a duplicate of the object, which can be useful when you want to isolate changes made within a function from the original object.

Example:

```cpp
void modifyValue(int value) {
    value *= 2;
}

int main() {
    int num = 10;
    modifyValue(num); // Passing 'num' as a copy
    // 'num' remains unchanged
    return 0;
}
```

### Passing as a Move

Passing an object as a move is more efficient than copying when you intend to transfer ownership of resources, like dynamically allocated memory, to another object. It involves the use of move constructors and move assignment operators.

Example:

```cpp
class MyString {
private:
    char* str;

public:
    MyString(char* s) : str(s) {}

    // Move constructor
    MyString(MyString&& other) noexcept : str(other.str) {
        other.str = nullptr;
    }
};

int main() {
    char* text = "Hello, World!";
    MyString str1(text);
    MyString str2 = std::move(str1); // Passing 'str1' as a move
    // 'str1' is now in a valid but unspecified state
    return 0;
}
```

of pointers in C++ that offer different levels of control and responsibility.

## Smart Pointers

**Smart pointers** are a category of pointers that provide automatic memory management by tracking the lifetime of dynamically allocated objects. They help ensure that memory is properly deallocated when it's no longer needed. C++ provides three main types of smart pointers:

### `std::shared_ptr`

- **Ownership**: Shared ownership among multiple shared_ptr instances.
- **Use Case**: When multiple pointers need access to the same dynamically allocated object.
- **Overhead**: Slightly higher overhead due to reference counting.

Example:

```cpp
#include <memory>

std::shared_ptr<int> numPtr = std::make_shared<int>(42);
```
### `std::unique_ptr`
Ownership: Exclusive ownership; cannot be shared or copied.
Use Case: When a single owner manages the dynamically allocated object.
Performance: Lower overhead compared to shared_ptr.
Example:

```cpp
#include <memory>

std::unique_ptr<int> numPtr = std::make_unique<int>(42);
```
### `std::weak_ptr`
Ownership: Weak reference to an object managed by shared_ptr.
Use Case: To avoid circular references and break potential reference cycles.
Usage: Convert to shared_ptr when access is needed.
Example:

```cpp
#include <memory>

std::shared_ptr<int> sharedPtr = std::make_shared<int>(42);
std::weak_ptr<int> weakPtr = sharedPtr;
```
### Dangling Pointers
Dangling pointers occur when a pointer references memory that has been deallocated, leading to undefined behavior. 
By using smart pointer classes, danlging pointer errors can be reduced.
