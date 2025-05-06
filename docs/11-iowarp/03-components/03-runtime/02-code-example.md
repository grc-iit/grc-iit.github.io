# Client API Example

Below is an example of how someone would use an existing module in their code.
In this case, the module is named ``small_message`` and exposes an api named ``Md``.
The small_message ChiPool, when created, stores an integer (by default) in each ChiContainer.
``Md`` reads that integer and returns it to the user.

```cpp
#include "chimaera/api/chimaera_client.h"
#include "chimaera_admin/chimaera_admin_client.h"
#include "small_message/small_message_client.h"

CHI_NAMESPACE_INIT

int main() {
  CHIMAERA_CLIENT_INIT();

  int rank, nprocs;
  MPI_Barrier(MPI_COMM_WORLD);
  MPI_Comm_rank(MPI_COMM_WORLD, &rank);
  MPI_Comm_size(MPI_COMM_WORLD, &nprocs);
  CHI_ADMIN->RegisterModule(HSHM_DEFAULT_MEM_CTX,
                            chi::DomainQuery::GetGlobalBcast(),
                            "small_message");
  chi::small_message::Client client;
  client.Create(
      HSHM_DEFAULT_MEM_CTX,
      chi::DomainQuery::GetDirectHash(chi::SubDomainId::kGlobalContainers, 0),
      chi::DomainQuery::GetGlobalBcast(), "ipc_test");
  hshm::Timer t;
  size_t ops = 256;
  HILOG(kInfo, "OPS: {}", ops);
  t.Resume();
  int depth = 0;
  for (size_t i = 0; i < ops; ++i) {
    int cont_id = i;
    int ret = client.Md(HSHM_DEFAULT_MEM_CTX,
                        chi::DomainQuery::GetDirectHash(
                            chi::SubDomainId::kGlobalContainers, cont_id),
                        depth, 0);
    REQUIRE(ret == 1);
  }
  t.Pause();

  HILOG(kInfo, "Latency: {} MOps, {} MTasks", ops / t.GetUsec(),
        ops * (depth + 1) / t.GetUsec());
}
```

## Headers and Macros

The first few lines relate to the includes.
```cpp
#include "chimaera/api/chimaera_client.h"
#include "chimaera_admin/chimaera_admin_client.h"
#include "small_message/small_message_client.h"

CHI_NAMESPACE_INIT
```

* ``chimaera/api/chimaera_client.h`` includes all code for
connecting to the runtime
* ``chimaera_admin/chimaera_admin.h`` includes all APIs for
registering modules to the runtime
* ``small_message/small_message.h`` is the small_message module
* ``CHI_NAMESPACE_INIT`` is a macro that makes various typedefs
to avoid having the same "using chi::*" preambles everywhere

## Initializing Connection

To initialize the connection to the client, the main function first calls:
```cpp
CHIMAERA_CLIENT_INIT();
```

This function will connect to a shared-memory segment between this process
and the runtime to allow tasks to be scheduled.

## RegisterModule

```cpp
CHI_ADMIN->RegisterModule(HSHM_DEFAULT_MEM_CTX,
                          chi::DomainQuery::GetGlobalBcast(),
                          "small_message");
```

This line of code will register the "small_message" module on
every node. Registering a module means searching for the
shared object named "small_message". 

Before the runtime is spawned, the "small_message" object needs
to be in the runtime's search path. This could be in the variables
PATH or LD_LIBRARY_PATH.

## Create the Small Message ChiPool

```cpp
chi::small_message::Client client;
client.Create(
    HSHM_DEFAULT_MEM_CTX,
    chi::DomainQuery::GetDirectHash(chi::SubDomainId::kGlobalContainers, 0),
    chi::DomainQuery::GetGlobalBcast(), "ipc_test");
```

``Create`` will create a ChiPool. This pool will span all nodes 
(``chi::DomainQuery::GetGlobalBcast()``) and will
be registered first by Chimaera Admin's first container 
(``chi::DomainQuery::GetDirectHash(chi::SubDomainId::kGlobalContainers, 0)``).
By default, there will be one container per node in the provided domain.
In this case, the set of all nodes.

## Send the Metadata Task

```cpp
  hshm::Timer t;
  size_t ops = 256;
  HILOG(kInfo, "OPS: {}", ops);
  t.Resume();
  int depth = 0;
  for (size_t i = 0; i < ops; ++i) {
    int cont_id = i;
    int ret = client.Md(HSHM_DEFAULT_MEM_CTX,
                        chi::DomainQuery::GetDirectHash(
                            chi::SubDomainId::kGlobalContainers, cont_id),
                        depth, 0);
    REQUIRE(ret == 1);
  }
  t.Pause();

  HILOG(kInfo, "Latency: {} MOps, {} MTasks", ops / t.GetUsec(),
        ops * (depth + 1) / t.GetUsec());
```

In a loop, ``client.Md`` will construct an MdTask object and schedule
to the container ``cont_id`` in the Small Message ChiPool. At the
end, the overall performance is reported.