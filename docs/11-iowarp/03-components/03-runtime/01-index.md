# The IOWarp Runtime: Chimaera

Chimaera is a flexible runtime system for building and executing data-intensive tasks.
Chimaera defines a set of abstractions that make the development of active,
reliable, upgradeable and malleable I/O stacks easier. The core abstractions are the
ChiPool and ChiContainer. A **ChiPool** represents a set of ChiContainers. Each individual
**ChiContainer** represents a subset of data and the computations that can happen to that
data. ChiContainers can be migrated and are addressed using an unchanging, machine-independent
DomainId. For example, a ChiPool could represent a distributed key-value store while a ChiContainer
represents a bucket in that key-value store.

## The Abstraction

![Abstraction](images/abstraction.svg)

This diagram shows an overview of the Chimaera abstractions. More explanation soon.

