# Deploying Hermes

## Configuring + Deploying Hermes

The Hermes daemon is responsible for tracking various metadata, and it is
required to be launched before your application. There should only be
one Hermes daemon per node. We use the platform plugin interface's
Jarvis-CD to deploy hermes, which is installed automatically.

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
jarvis init [CONFIG_DIR] [PRIVATE_DIR] [SHARED_DIR (optional)]
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

## Set or Change the active Hostfile

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

## An Example Unit Test Deployment

### Building an Environment

We will now load all necessary environment variables and build a
Jarvis environment named hermes:

```bash
spack load iowarp
jarvis env build hermes
```

hermes will store all important environment variables, including PATH,
LD_LIBRARY_PATH, etc. in a YAML file. This will make it so that you do not
need to repeatedly run spack load and module load if the machine is broken.

### Load an example pipeline
```bash
jarvis ppl index load jarvis_hermes.hermes.test_hermes
```
This pipeline assumes the environment "hermes" exists from
the previous step.

Alternatively, you could do:
```
jarvis ppl index copy jarvis_hermes.hermes.test_hermes
jarvis ppl load yaml test_hermes.yaml
```

This will copy the test_hermes pipeline script to the current
directory as test_hermes.yaml. You could then play with
the parameters from there.

### Run the pipeline
```bash
jarvis ppl run
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

## Configuring + Deploying Hermes with an Application

As previously stated, Jarvis can be used to deploy and application
with Hermes. This will automatically set environment variables
(e.g., LD_PRELOAD) that will be necessary for the application to
run. This assumes the application is integrated with Jarvis.

This example, the application is the IOR benchmark.

### Build an Environment

We will now load all necessary environment variables and build a
Jarvis environment named hermes:

```bash
spack install ior
```

```bash
spack load iowarp
spack load ior
jarvis env build hermes
```

### Copy the IOR Pipeline
```bash
jarvis ppl index copy jarvis_hermes.test_ior
```

This will create a pipeline script named ``test_ior.yaml`` in your
current working directory that contains the following:
```yaml
name: hermes_unit_ior
env: hermes
pkgs:
  # Launch IOWarp runtime
  - pkg_type: chimaera_run
    pkg_name: chimaera_run
    sleep: 5
    do_dbg: false
    dbg_port: 4000
    port: 6000
    modules: ['hermes_core']
  # Add hermes to the runtime
  - pkg_type: hermes_run
    pkg_name: hermes_run
    do_dbg: false
    dbg_port: 4000
  # Intercept client I/O calls
  - pkg_type: hermes_api
    pkg_name: hermes_api
    mpi: true
  # Launch IOR
  - pkg_type: ior
    pkg_name: ior
    api: mpiio
    out: /tmp/test_hermes/ior.bin  # Output directory
    xfer: 1m
    block: 32m
    nprocs: 4  # Total number of processes
    ppn: 1  # Process per node
```

You can edit the parameters to this script. E.g., change number
of processes in IOR, buffering locations, etc. This file does not
demonstrate every single parameter of iowarp, but gives some
configuration options.

To view the arguments for the cte and iowarp runtime:
```bash
jarvis pkg help hermes_run
jarvis pkg help chimaera_run
```

### Load the pipeline

Load the IOR yaml:
```bash
jarvis ppl load yaml test_ior.yaml
```

### Run the Pipeline

To run the pipeline:

```bash
jarvis ppl run
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
