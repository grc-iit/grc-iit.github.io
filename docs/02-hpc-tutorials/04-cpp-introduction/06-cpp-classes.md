# C++ Classes
In this section, we will discuss the basics of object-oriented programming (OOP)
in C++. A class represents a set of functions (i.e., methods) and data for those
methods. An object is an instance of a class.

* Class variables
* Methods
* Encapsulation:
* Polymorphism
* Inheritance
* Operator overloading

## Defining a Class
In C++, a class is a user-defined data type that combines data members (variables) and member functions (methods) into a single unit. Classes serve as blueprints for creating objects. Here's a simple example of defining a class in C++:

```cpp
#include <iostream>
using namespace std;

class Rectangle {
public:
    // Data members
    double length;
    double width;

    // Member functions
    double area() {
        return length * width;
    }

    double perimeter() {
        return 2 * (length + width);
    }
};
```
## Constructors
Constructors are special member functions used to initialize objects of a class. Here's an example of a constructor for the Rectangle class:

```cpp
Rectangle::Rectangle(double l, double w) {
    length = l;
    width = w;
}

// Usage
int main() {
    Rectangle r(5.0, 3.0); // Creating a Rectangle object with specified dimensions
    cout << "Area: " << r.area() << endl;
    cout << "Perimeter: " << r.perimeter() << endl;
    return 0;
}
```
## Destructor
In C++, a destructor is a special member function that gets called when an object goes out of scope or is explicitly deleted. Here's an example:

```cpp
Rectangle::~Rectangle() {
    cout << "Rectangle object destroyed" << endl;
}

// Usage
int main() {
    Rectangle r(5.0, 3.0);
    // r goes out of scope here, and the destructor is called automatically
    return 0;
}
```
## Operator Overloading
Operator overloading allows you to define how operators like +, -, *, and others behave with objects of your class. Here's an example of overloading the + operator for the Rectangle class:

```cpp
Rectangle operator+(const Rectangle& r1, const Rectangle& r2) {
    Rectangle result;
    result.length = r1.length + r2.length;
    result.width = r1.width + r2.width;
    return result;
}

// Usage
int main() {
    Rectangle r1(5.0, 3.0);
    Rectangle r2(2.0, 4.0);
    Rectangle sum = r1 + r2; // Using the overloaded + operator
    cout << "Sum of rectangles: Area=" << sum.area() << ", Perimeter=" << sum.perimeter() << endl;
    return 0;
}
```
### Assignment Operators
In C++, you can overload assignment operators (=, +=, -=) to define custom behavior for objects of your class during assignment. This allows you to control how your objects are copied or modified.

Example:

```cpp
class MyNumber {
private:
    int value;

public:
    MyNumber(int v) : value(v) {}

    // Overloading the assignment operator '='
    MyNumber& operator=(const MyNumber& other) {
        if (this == &other) // Self-assignment check
            return *this;
        
        value = other.value;
        return *this;
    }
};
```
In this example, we overload the assignment operator to ensure that self-assignment is handled gracefully.

### Arithmetic Operators
Arithmetic operators like +, -, *, /, and % can be overloaded to define custom arithmetic operations for objects of your class.

Example:

```cpp
class Complex {
private:
    double real;
    double imaginary;

public:
    Complex(double r, double i) : real(r), imaginary(i) {}

    // Overloading the addition operator '+'
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imaginary + other.imaginary);
    }
};
```
In this example, we overload the addition operator to perform complex number addition.

### 3.6.04.3. Relational Operators
Relational operators (``==``, ``!=``, ``<``, ``>``, ``<=``, ``>=``) can be overloaded to define custom comparison logic for objects of your class.

Example:

```cpp
class Student {
private:
    int id;

public:
    Student(int studentId) : id(studentId) {}

    // Overloading the equality operator '=='
    bool operator==(const Student& other) const {
        return id == other.id;
    }
};
```
In this example, we overload the equality operator to compare student objects based on their IDs.

### Member Access Operators
Member access operators (-> and .) can be overloaded to customize how you access members of objects of your class.

Example:

```cpp
class MyString {
private:
    char* str;

public:
    MyString(char* s) : str(s) {}

    // Overloading the member access operator '->'
    char operator[](size_t index) const {
        return str[index];
    }
};
```
In this example, we overload the member access operator to access individual characters of a string-like object.

### Function Call
You can overload the function call operator () to make objects of your class callable like functions.

Example:

```cpp
class MyFunction {
public:
    int operator()(int x, int y) const {
        return x + y;
    }
};
```
In this example, we overload the function call operator to create an object that behaves like a function, adding two integers.

### Bitwise Operators
Bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`) can be overloaded to define custom bitwise operations for objects of your class.

Example:

```cpp
class Bitset {
private:
    unsigned int data;

public:
    Bitset(unsigned int value) : data(value) {}

    // Overloading the bitwise AND operator '&'
    Bitset operator&(const Bitset& other) const {
        return Bitset(data & other.data);
    }
};
```
In this example, we overload the bitwise AND operator to perform bitwise AND operations on bitset objects.

These examples demonstrate how you can customize the behavior of operators for objects of your class, allowing you to work with them in a way that makes sense for your specific use case.

## Principle of Least Surprise

The principle of least surprise states that components should behave the way
that you expect them to behave. Operator overloading can be misused and cause
conflict when done poorly. Other languages, such as Java, do not provide
operator overloading for this reason. There are a few common-sense methods to
make overloading useful:

1. Don't use operator overloading unless the meaning of the operator
matches conceptually with what is happening in the operator. For example,
don't overload the addition operator and then implement multiplication there.
2. Make sure to consider the order of operations when designing your operator
overloads. Is your operator intended to be commutative or just associative?
Would it be intuitive and clear to someone who has never seen your code before?
3. It should be intuitive and clear what data types the operator accepts.
It shouldn't require the user to go to documentation every single time to
check if the operator is valid for a certain combination of types.

## Encapsulation

Encapsulation is the idea that the class should expose only the methods and
data that the user needs to see. It reduces the amount of mistakes that users
can make when using your code. It's also easier to read a codebase when you
have fewer methods to look at and understand.

Encapsulation is provided using *access specifiers*:
* **public**: The method or data can be called outside of the class
* **private**: The method or data cannot be called outside of the class
* **protected**: The method or data cannot be called outside of the class,
but it can be called by derived classes.

### Friend Functions
Friend functions can be used to break encapsulation in particular cases.
By declaring a function as "friend" that function can access private and protected
members of a certain class. A practical example of this is with C++ iterators,
which may call specific methods of the class being iterated over.

Below is an example demonstrating how we can giv the function ``friendFunction``
access to the private class variable ``data`` in ``MyFunction``:
```cpp
class MyClass {
private:
    int data;

public:
    MyClass(int d) : data(d) {}

    // Declare a friend function
    friend void friendFunction(MyClass& obj);
};

// Define the friend function
void friendFunction(MyClass& obj) {
    obj.data = 99; // Access private member of MyClass
}

// Usage
int main() {
    MyClass obj(42);
    friendFunction(obj); // Calls the friend function to modify obj's private member
    return 0;
}
```

## Inheritance + Virtual Methods

One of the most important principles in OOP is "Do Not Repeat Yourself" (DRY).
One way to accomplish this is through inheritance.

## Polymorphism
Polymorphism is a fundamental concept in object-oriented programming that allows objects of different classes to be treated as objects of a common base class. This enables you to write more generic code that can work with a variety of objects. In C++, polymorphism is achieved through the use of virtual functions and inheritance.

### Virtual Functions
In C++, you can define a function in a base class as "virtual." Virtual functions provide a mechanism for dynamic method dispatch, allowing the appropriate derived class's implementation to be called at runtime, based on the actual object type. This feature is crucial for achieving runtime polymorphism.

Example:
```cpp
class Shape {
public:
    virtual double area() const = 0; // Pure virtual function
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double r) : radius(r) {}

    double area() const override {
        return 3.14159265359 * radius * radius;
    }
};

class Rectangle : public Shape {
private:
    double length;
    double width;

public:
    Rectangle(double l, double w) : length(l), width(w) {}

    double area() const override {
        return length * width;
    }
};
```

### Pure Virtual Functions
A pure virtual function is a virtual function declared in a base class but without an implementation. Derived classes must provide an implementation for pure virtual functions. This concept is used to create abstract base classes, which cannot be instantiated themselves but serve as a common interface for derived classes.

Example:
```cpp
class Shape {
public:
    virtual double area() const = 0; // Pure virtual function
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double r) : radius(r) {}

    double area() const override {
        return 3.14159265359 * radius * radius;
    }
};
```

## Class Templates
Class templates in C++ allow you to define generic classes that can work with 
different data types. They are a powerful feature for creating reusable 
and type-safe code.

Example:
```cpp
template <typename T>
class Pair {
private:
    T first;
    T second;

public:
    Pair(T f, T s) : first(f), second(s) {}

    T getFirst() const {
        return first;
    }

    T getSecond() const {
        return second;
    }
};

// Usage
int main() {
    Pair<int> intPair(1, 2);
    Pair<double> doublePair(3.14, 2.71);
    return 0;
}
```
