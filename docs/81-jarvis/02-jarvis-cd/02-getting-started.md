# Getting Started

In this section, we will discuss the jarvis command line interface.
We will discuss the basic steps of how to create a deployment
pipeline. In this example, we will deploy only IOR, but more complex
pipelines with more applications deployed at once can be made.

## Setup

```bash
spack install ior
```

## Define the Job Hostfile

Before jarvis can be used to deploy, the hostfile must be provided.

```bash
jarvis hostfile set [path-to-hostfile.txt]
```

This hostfile is used by all jarvis deployments.

## Build Resource Graph

NOTE: This step is not needed for machines which have pre-configured
resource graphs. Skip this step when deploying in Ares. Do this step
when deploying on your personal machine.

First we have to collect information about the system. The resource-graph
utility command depends on fi_info and lsblk. Make sure if these are not
provided by your machine, they are loaded.

To begin polling the system, run:

```bash
jarvis rg build
```

This information will be stored under `${JARVIS_ROOT}/config/resource_graph.yaml`. The command uses SSH to connect to all pkgs. It will use the hostfile from the previous command and scan those pkgs.

## Create an empty pipeline

The following command will create an empty pipeline "my_pipeline":

```bash
jarvis ppl create ior_test
```

After creating a pipeline, jarvis will focus on that pipeline.

## Updating a pipline

The very vast majority of problems encountered in Jarvis are because
a pipeline did not get updated. One common mistake is that a hostfile
changes, but the pipeline doesn't get updated. Pipelines initially
build configuration files to each specific program in the pipeline.
For example, a storage system would need to know the changed hosts
and then rebuild its configuration based on those new systems.

To update a pipeline, run:
```bash
jarvis ppl update
```

## Build Environment

Next, we must make jarvis aware of all environment variables needed
to execute applications in the pipeline. Jarvis automatically
captures most relevant variables, including PATH, LD_LIBRARY_PATH,
etc. This allows Jarvis to forward environment variables through SSH.

```bash
jarvis ppl env build
```

Alternatively, if you have an environment you would like to use
across pipelines, you can create a named environment as follows:

```bash
jarvis env build my_env_name
```

This named environment can then be copied to a pipeline as follows:
```bash
jarvis ppl env copy my_env_name
```

NOTE: this is machine-dependent. You would have to have these modules
installed on your machine before-hand.

NOTE: LD_PRELOAD should NOT be one of the environment variables set here.
Jarvis has specific "Interceptor" pkgs for handling LD_PRELOAD.

## Add pkgs to the pipeline

To add pkgs to the pipeline:

```bash
jarvis ppl append ior api=posix xfer=4k block=1m out=/tmp/ior.bin
```

## Start a pipeline

To start the service for the configured pipeline, do:

```bash
jarvis ppl run
```

## Get the status of the pipeline

To check whether the pipeline is functioning, do:

```bash
jarvis ppl status
```

NOTE: This command is not always implemented

## Clean a pipeline

Pipelines can create a bunch of data. For example, OrangeFS may contain
data leftover from a benchmark. To destroy this data, run:

```bash
jarvis ppl clean
```

## Re-configuring a `pkg`

There may be cases where you need to reconfigure a pkg in the pipeline.
To do this, run configure:

```bash
jarvis pkg conf ior api=mpiio
```

## Unlinking and removing `pkg`s

- Unlinking a `pkg` means Jarvis will remove the `pkg` from the pipeline,
  without destroying the `pkg`'s metadata. This will allow it to be
  re-appended in the future.
- Removing a `pkg` means Jarvis will remove the `pkg` from the pipeline
  AND destroy its metadata.

```bash
jarvis pkg unlink [pkg_id]
jarvis pkg remove [pkg_id]
```

## Changing to a different pipeline

To make jarvis start, end, etc. apply to a different pipeline,
use jarvis cd

```bash
jarvis cd [pipeline_name]
```

NOTE: Jarvis stores the current pipeline in a file. Only one
pipeline can be active at a time for a user.

## Destroying a pipeline

To destroy a pipeline, its pkgs, and all metadata associated with it:

```bash
jarvis ppl destroy [pipeline_name (opt)]
```

If no pipeline_name is provided, the current pipeline will be destroyed.

## Listing Existing Pipelines

To list all existing pipelines, run:

```bash
jarvis ppl list
```

## Viewing the pkgs in a Pipeline

```bash
jarvis ppl print
```

## Viewing the contents of a Pipeline

This will print the contents of the pipeline's root directory.

To view the CONFIG_DIR of the pipeline:
```bash
ls $(jarvis path)
```

To view the PRIVATE_DIR of the pipeline:
```bash
ls $(jarvis path +private)
```

To view the SHARED_DIR of the pipeline:
```bash
ls $(jarvis path +shared)
```

## Clear a pipeline

The following will remove all pkgs from a pipeline:
```bash
jarvis ppl reset
```

## Resetting Jarvis

The following command will destroy the metadata for all pipelines in Jarvis.
It will ask for confirmation to avoid accidents.

```bash
jarvis reset
```

## Other Examples

Each Jarvis repo contains its own README, which goes every specific examples.
For example, [gray_scott](https://github.com/scs-lab/jarvis-cd/blob/master/builtin/builtin/gray_scott/README.md)
shows an example of deploying over Hermes.
