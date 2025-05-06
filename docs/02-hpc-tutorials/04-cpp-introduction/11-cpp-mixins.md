# Mixins
Mixins are a design pattern which combines the functionality of multiple classes into a single class. No two mixins can have a method or variable by the same name. Mixins are the best way to handle multiple inheritance as they avoid conflicts in namespaces.

An example of mixins which can come up are for making objects printable and
serializeable.

```cpp
class PrintableMixin {
 public:
  virtual void Print() = 0;
};

class SerializeableMixin {
 public:
  virtual void Serialize() = 0;
};

class Matrix : public PrintableMixin, public SerializeableMixin {
 public:
  void Print() override {}
  void Serialize() override {}
};
```
