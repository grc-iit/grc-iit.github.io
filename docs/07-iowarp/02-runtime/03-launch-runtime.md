# Launch Runtime

For spawning the runtime, we use the platform plugins interface (Jarvis-CD).

## Load Environment

### Spack Users
```bash
spack load iowarp
```

### Developers
```bash
spack load iowarp
module load hermes_shm iowarp_runtime cte
```

## Copy the IPC Test Pipeline

```bash
jarvis ppl index copy jarvis_chimaera.test_ipc
```

## Edit the Pipeline Script
```bash
nano test_ipc.yaml
```
Change the parameters as needed.

## Load the Pipeline
```bash
jarvis ppl load yaml test_ipc.yaml
```

## Build Jarvis Environment

This will take a snapshot of your current environment:
```bash
jarvis env build iowarp
jarvis ppl env copy iowarp
```

## Run the Pipeline
```bash
jarvis ppl run
```
