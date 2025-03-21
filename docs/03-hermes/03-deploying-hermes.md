# Deploying Hermes

## Configuring + Deploying Hermes

The Hermes daemon is responsible for tracking various metadata, and it is
required to be launched before your application. There should only be
one Hermes daemon per node. We recommend
[Jarvis](https://github.com/grc-iit/jarvis-cd.git) for deploying Hermes.
Jarvis is a framework that configures and deploys complex applications and
services. Jarvis will automatically set various environment variables
that Hermes expects in order for applications to be deployed. We have
also integrated several applications into Jarvis that can be seamlessly
deployed with Hermes.

Jarvis is automatically installed as a dependency in GRC's spack repo.

## Building the Jarvis Configuration

### Bootstrapping for a single-node machine

You may be trying to test things on just a single node. 

In this case, run:
```bash
jarvis bootstrap from local
```

### Bootstrapping from a specific machine

Jarvis has been pre-configured on some machines. To bootstrap from
one of them, run the following:

```bash
jarvis bootstrap from ares
```

NOTE: Jarvis must be installed from the compute nodes in Ares, NOT the master node. This is because we store configuration data in /mnt/ssd by default, which is only on compute nodes. We do not store data in /tmp since it will be eventually destroyed.

To check the set of available machines to bootstrap from, run:
```bash
jarvis bootstrap list
```

### Creating a new configuration

A configuration can be generated as follows:
```bash
jarvis init [CONFIG_DIR] [PRIVATE_DIR] [SHARED_DIR]
```

* **CONFIG_DIR:** A directory where jarvis metadata for pkgs and pipelines
are stored. This directory can be anywhere that the current user can access.
* **PRIVATE_DIR:** A directory which is common across all machines, but
stores data locally to the machine. Some jarvis pkgs require certain data to
be stored per-machine. OrangeFS is an example.
* **SHARED_DIR:** A directory which is common across all machines, where
each machine has the same view of data in the directory. Most jarvis pkgs
require this, but on machines without a global filesystem (e.g., Chameleon Cloud),
this parameter can be set later.

For a personal machine, these directories can be the same directory. 

In addition to initializing the jarvis conf file, you must also build a resource graph.

## Set the active Hostfile

The hostfile contains the set of nodes that the pipeline will run over.
This is structured the same way as a traditional MPI hostfile.

An example hostfile:

```txt
ares-comp-20
ares-comp-[21-25]
```

To set the active hostfile, run:

```bash
jarvis hostfile set /path/to/hostfile
```

Note that every time you change the hostfile, you will need to update the
pipeline. Jarvis does not automatically detect changes to this file.

```bash
jarvis ppl update
```

## Building the Resource Graph

NOTE: This step only needs to be run if you did ``jarvis bootstrap from local`` or ``jarvis init``. 
If you bootstrap from a specific machine, then skip this section.

The resource graph is a snapshot of your systems network and storage.
Many packages depend on it for their configurations. The Hermes I/O system, for example,
uses this to identify valid networks and buffering locations.
```bash
jarvis rg build
```


## Building an Environment

We will now load all necessary environment variables and build a
Jarvis environment named hermes_env:

```bash
spack load hermes
jarvis env build hermes_env
```

hermes_env will store all important environment variables, including PATH,
LD_LIBRARY_PATH, etc. in a YAML file. This will make it so that you do not
need to repeatedly run spack load and module load if the machine is broken.

## Create a pipeline

```bash
jarvis ppl create hermes
```

hermes is the name of the pipeline. It doesn't need to be hermes,
it can be any name.

### Copy the environment cache

```bash
jarvis ppl env copy hermes_env
```

This will use the hermes_env environment that was previously created in

### Add Hermes runtime

```bash
jarvis ppl append hermes_run
jarvis pkg configure hermes_run \
sleep=5 \
include=${HOME}/ior_data
```

Jarvis will automatically produce a Hermes client and server configuration that
contains all storage devices and fastest available network defined in the
resource graph. These configurations will be located in:

```bash
$(jarvis path +shared)/hermes_run/hermes_server.yaml
$(jarvis path +shared)/hermes_run/hermes_client.yaml
```

To view all parameters of the Hermes package, you can run:
```bash
jarvis pkg help hermes_run
```

### Starting + Stopping Hermes

To start Hermes:

```bash
jarvis ppl start
```

### Stopping and Killing Hermes

To gracefully stop Hermes and flush data back to the PFS:

```bash
jarvis ppl stop
```

To kill a Hermes deployment that isn't stopping gracefully:

```bash
jarvis ppl kill
```

### Cleanup

To erase data produced by the pipeline:

```bash
jarvis ppl clean
```

To destroy the pipeline:

```bash
jarvis ppl destroy
```

## Changing the active Hostfile

You may want to change the hostfile at some point. This can 
be done using the same command as before. 

However, note that every time you change the hostfile, you will need to update the
pipeline. Jarvis does not automatically detect changes to this file.

```bash
jarvis ppl update
```

## Configuring + Deploying Hermes with an Application

As previously stated, Jarvis can be used to deploy and application
with Hermes. This will automatically set environment variables
(e.g., LD_PRELOAD) that will be necessary for the application to
run.

### Build an Environment

We will now load all necessary environment variables and build a
Jarvis environment named hermes_env:

```bash
spack load hermes
spack load ior
jarvis env build hermes_ior_env
```

hermes_ior_env will store all important environment variables, including PATH,
LD_LIBRARY_PATH, etc. in a YAML file.

### Create an empty pipeline

```bash
jarvis ppl create hermes_ior
```

### Copy the environment cache

```bash
jarvis ppl env copy hermes_ior_env
```

### Set the active hostfile

```bash
jarvis hostfile set /path/to/hostfile
```

### Add Hermes runtime

```bash
jarvis ppl append hermes_run
jarvis pkg configure hermes_run \
sleep=5 \
include=${HOME}/ior_data
```

This will ensure that if a Hermes interceptor is used, it will intercept
all paths in `${HOME}/ior_data`.

### Add Hermes MPI-IO interceptor

```bash
jarvis ppl append hermes_api +mpi
```

This will automatically locate the interceptor library by
traversing various environment variables. This will ensure
that MPI-IO is intercepted by Hermes.

hermes_api includes other interceptors that can be used: posix, stdio, vfd. To view the set of options:
```bash
jarvis pkg help hermes_run
```

### Add IOR

```bash
jarvis ppl append ior
jarvis pkg configure ior \
xfer=1m \
block=1g \
nprocs=64 \
ppn=16 \
+write +read \
out=${HOME}/ior_data/ior.bin \
api=mpiio
```

This IOR will perform 1GB of I/O per-process (block) in units of 1m (xfer) and
produce a single output file `${HOME}/ior_data/ior.bin`(out) using MPI-IO
(api). The total amount of I/O performed will be 64GB spread across 4 nodes.

### Run the Pipeline

To run the pipeline:

```bash
jarvis ppl run
```

This will launch Hermes, execute IOR, and then stop Hermes. It is equivalent
to:

```bash
jarvis ppl start
jarvis ppl stop
```

### Cleanup

The following will delete intermediate data generated by Hermes + IOR:

```bash
jarvis ppl clean
```

## Why is my application hanging?

### Resource Graph Misconfiguration

Commonly, the cause is a misconfiguration in the resource graph, specifically
with the network section. If the resource graph is misconfigured, Hermes may
crash with a ``mercury->fatal`` error and ultimately cause the program to stall
forever. Make sure that the domain, provider, and fabric are valid. To view the
Hermes configuration to see which network was selected from your resource graph,
you can run:

```bash
cat $(jarvis path)/hermes_run/hermes_server.yaml
```

### Dependency Problems

If you are using the MPI-IO interceptor, make sure that the MPI that Hermes
compiled with is equivalent to the one your application was compiled with.
You may have multiple versions of MPI installed and if you didn't specify
which one when installing Hermes and your program -- they may be different.

If you are using the VFD, make sure the VFD was compiled with the same HDF5
as the application.

To view the dependencies of your installed Hermes, run:
```
spack find -c -d hermes
```

### Machine Misconfiguration

We have found certain instances where using semantic hostnames in the hostfile
has resulted in incorrect behavior. If the machine is misconfigured, it is
possible that a hostname maps to a different network domain on different nodes.
To verify this, you can try using exact IP addresses in your hostfile.

To view your machine's IP addresses, you can run
``ip addr show`` or ``fi_info | grep fabric``

### Permissions Problems

If you cannot SSH between machines or if your known_hosts file is outdated,
it is possible that Hermes will fail to launch due to permissions problems
on the network. Make sure that you can SSH between machines without error.
