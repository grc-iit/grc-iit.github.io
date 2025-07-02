# Schedulers

Jarvis can be used inside of job specs. 

Mainly, Jarvis builds a hostfile and allows users to ensure that jarvis commands execute only on a single node.

## Slurm

Below is an example for slurm:
```
#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=4    # <- match to OMP_NUM_THREADS
#SBATCH --partition=cpu      # <- or one of: gpuA100x4 gpuA40x4 gpuA100x8 gpuMI100x8
#SBATCH --account=bekn-delta-cpu    # <- match to a "Project" returned by the "accounts" command
#SBATCH --job-name=myjobtest
#SBATCH --time=00:15:00      # hh:mm:ss for the job
#SBATCH --constraint="scratch"
#SBATCH -e slurm-%j.err
#SBATCH -o slurm-%j.out
### GPU options ###
##SBATCH --gpus-per-node=4
##SBATCH --gpu-bind=closest     # <- or closest
##SBATCH --mail-user=you@yourinstitution.edu
##SBATCH --mail-type="BEGIN,END" See sbatch or srun man pages for more email options

spack load iowarp
JARVIS_FIRST=$(jarvis sched hostfile build +slurm_host)
if [ "$JARVIS_FIRST" -eq 0 ]; then
    exit 0
fi
echo "On first node!!!"
# Any other jarvis commands
```

## PBS

```
spack load iowarp
JARVIS_FIRST=$(jarvis sched hostfile build +pbs_host)
if [ "$JARVIS_FIRST" -eq 0 ]; then
    exit 0
fi
echo "On first node!!!"
# Any other jarvis commands
```