# Factory Design Pattern
The Factory pattern is used to provide a common interface to construct
objects that have a common base class. The main benefit is that you can
dynamically choose different policies at runtime, instead of forcing a
specific policy at compile-time.

Let's say we want to make a factory for I/O schedulers. An I/O scheduler
is a policy to decide the order with which I/O requests are sent to a storage device.

## The Base Class

First, we define the base class I/O scheduler.
```cpp
class IoSched {
 public:
  virtual void PushRequest() = 0;
  virtual void PopRequest() = 0;
};
```

We have two methods: push an I/O request and pop an I/O request.

## The Derived Classes

Now we implement some specific I/O scheduling policies. In this example,
we provide RoundRobinSched and DeadlineSched.

```cpp
class RoundRobinSched : public IoSched {
 public:
  void PushRequest() override {}
  void PopRequest() override {}
};

class DeadlineSched : public IoSched {
 public:
  DeadlineSched(int a, int b) {}
  void PushRequest() override {}
  void PopRequest() override {}
};
```

DeadlineSched takes parameters a & b. RoundRobinSched has no parameters.

## The Factory

```cpp
enum class IoSchedType {
  kRoundRobin,
  kDeadline
};

class IoSchedFactory {
 public:
  static std::unique_ptr<IoSched> Get(IoSchedType type) {
    switch (type) {
      case IoSchedType::kRoundRobin:
        return std::make_unique<RoundRobinSched>();
      case IoSchedType::kDeadline:
        return std::make_unique<DeadlineSched>(0, 1);
    }
  }
};
```

## Usage

Now you can use the factory to construct your object.
```cpp
int main() {
  auto sched = IoSchedFactory::Get(IoSchedType::kRoundRobin);
  sched->PushRequest();
  sched->PopRequest();
}
```

## Discussion

One of the main benefits of the factory design is that you can change policies
dynamically. I/O schedulers in the Linux kernel for example can be changed at
any time. Below is an example of using the Factory to dynamically set the
I/O scheduling policy.

```cpp
int main(int argc, char **argv) {
  IoSchedType sched_type = static_cast<IoSchedType>(std::stoi(argv[1]));
  auto sched = IoSchedFactory::Get(sched_type);
  sched->PushRequest();
  sched->PopRequest();
}
```

Factories can have a performance penalty since they require a memory allocation
to use. However, this penalty is almost always insignificant. If a factory
matches your use case, then make your code readable first. If it turns out to
cause significant performance problems, then fix it later. You can make a custom
memory allocator to fix the issue if it's really needed.
