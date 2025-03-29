# Deploy Hermes Alone

This section will go over an example of how to use jarvis to deploy
Hermes. Here our objective is only to get Hermes up and running.
We will give example applications in a different article.

## Building an Environment

We will now load all necessary environment variables and build a
Jarvis environment named hermes:

```bash
spack load iowarp
jarvis env build hermes
```

hermes will store all important environment variables, including PATH,
LD_LIBRARY_PATH, etc. in a YAML file. This will make it so that you do not
need to repeatedly run spack load and module load if the machine is broken.

## Load an example pipeline
```bash
jarvis ppl index copy jarvis_hermes.hermes.test_hermes
jarvis ppl load yaml test_hermes.yaml
```

This will copy the test_hermes pipeline script to the current
directory as test_hermes.yaml. You could then play with
the parameters from there.

## Run the pipeline
```bash
jarvis ppl run
```

## Stopping and Killing Hermes

To gracefully stop Hermes and flush data back to the PFS:

```bash
jarvis ppl stop
```

To kill a Hermes deployment that isn't stopping gracefully:

```bash
jarvis ppl kill
```

## Cleanup

To erase data produced by the pipeline:

```bash
jarvis ppl clean
```

To destroy the pipeline:

```bash
jarvis ppl destroy
```
