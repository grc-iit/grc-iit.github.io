# Domains

Domains are used to represent groupings of ChiContainers for logical organization.
By default, the following domains are created:
* ``chi::SubDomainId::kGlobalContainers``: The set of all containers in the pool
* ``chi::SubDomainId::kLocalContainers``: The set of containers on this node

There is also a ``chi::SubDomainId::kPhysicalNode``, which represents the
address of an actual machine. When a runtime is launched on a node, it is assigned a
unique ID between 1 and 2^32. This domain gets used for situations such as migrating
ChiContainers across nodes.

## Domain Query

A Domain Query represents a subset of addresses. For example, a hashtable may
route a task to a specific ChiContainer, which represents the bucket. Alternatively,
a cache invalidation algorithm may want to broadcast a task across all ChiContainers
to invalidate data caches.

### Range Flags

Range flags represent the scope of the query:
* ``kLocal``: Only addresses local to this node are used
* ``kDirect``: A single specific address is used
* ``kGlobal``: Can be a range of addresses across all nodes
* ``kSchedule``: Determine the addresses later through a scheduler

###  Selection Flags

Selection flags indicate how the addresses are represented:
* ``kId``: The address is the exact address to be used
* ``kHash``: The address will be hashed against the size of the domain
* ``kRange``: The address will be a range of nodes

### Iteration Algorithms

Iteration flags indicate how  a task will be dispersed among the domain
* ``kBroadcast``: Will broadcast the task across all nodes in the domain
* ``kRepUntilSuccess``: Will iterate over the domain until success

## Domain Query: GetDirectHash

```cpp
static DomainQuery GetDirectHash(const SubDomainGroup &sub_id, u32 hash,
                                   u32 iter_flags = kBroadcast);
```

Hash the task to an offset in the subdomain vector. Good for things
like hashtables.

## Domain Query:: GetGlobal

```cpp
static DomainQuery GetGlobalBcast();
```

Broadcast the task to every ChiContainer in the ChiPool. Useful
for things like flushing.

