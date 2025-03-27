# Singleton

This library provides generic singleton classes that are generally useful.

## Traditional Singleton
```cpp
/**
 * A class to represent singleton pattern
 * Does not require specific initialization of the static variable
 * */
template <typename T, bool WithLock>
class SingletonBase {
 public:
  static T *GetInstance();
};

/** Singleton default case declaration */
template <typename T>
using Singleton = SingletonBase<T, true>;

/** Singleton without lock declaration */
template <typename T>
using LockfreeSingleton = SingletonBase<T, false>;
```

This is probably the most common singleton class.
* ``Singleton``: A thread-safe singleton. The first
access to the singleton is protected by a lock. This
lock is not a scalability concern as it happens only 
the first time the singleton is created.
* ``LockfreeSingleton``: For singletons that are
initialized in an obvious way in your program. Not
protected with an initialization lock. May improve
performance very slightly by avoiding additional
code paths.

## GPU-Compatible Singleton
```cpp
/**
 * A class to represent singleton pattern
 * Does not require specific initialization of the static variable
 * */
template <typename T, bool WithLock>
class CrossSingletonBase {
 public:
  HSHM_INLINE_CROSS_FUN
  static T *GetInstance();
};

/** Singleton default case declaration */
template <typename T>
using CrossSingleton = CrossSingletonBase<T, true>;

/** Singleton without lock declaration */
template <typename T>
using LockfreeCrossSingleton = CrossSingletonBase<T, false>;
```

This singleton can be compiled to work on GPU. Similar to
the traditional singleton.

## Global Singleton
```cpp
/**
 * Makes a singleton. Constructs during initialization of program.
 * Does not require specific initialization of the static variable.
 * */
template <typename T>
class GlobalSingleton {
 private:
  static T obj_;

 public:
  static T *GetInstance();
};
template <typename T>
T GlobalSingleton<T>::obj_;
```

The main difference between this singleton and the traditional
is the time at which it is created. This singleton is intialized 
when the program loads, unlike the traditional singleton which
must wait until the first time it is called. 

The global singleton does not need to be protected by a lock 
under any circumstance since its initialization point is known.

## GPU-Compatible Global Singleton
```cpp
/**
 * Makes a singleton. Constructs during initialization of program.
 * Does not require specific initialization of the static variable.
 * */
#ifdef HSHM_IS_HOST
template <typename T>
class GlobalCrossSingleton {
 private:
  static T obj_;

 public:
  static T *GetInstance();
};
template <typename T>
T GlobalCrossSingleton<T>::obj_;
#else
template <typename T>
using GlobalCrossSingleton = LockfreeCrossSingleton<T>;
#endif

```

This is effectively the same thing as the ``GlobalSingleton``.
The main difference is that the same code could compile
on GPU now.