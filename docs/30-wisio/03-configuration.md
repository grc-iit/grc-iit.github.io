# Configuration

This reference guide documents all the configuration parameters available in WisIO. These parameters control the behavior of analyzers, outputs, and cluster configurations.

## Using Configuration Parameters

WisIO uses [Hydra](https://hydra.cc) for configuration management, which provides a flexible way to organize and override parameters. You can specify parameters in several ways:

1. **Command line overrides**:

   ```bash
   wisio trace_path=path/to/traces +analyzer=recorder percentile=0.99
   ```

2. **Group selection**:

   ```bash
   wisio +analyzer=dftracer +cluster=slurm +output=csv
   ```

3. **Nested parameters**:

   ```bash
   wisio output.max_bottlenecks=5 cluster.n_workers=4
   ```

## Core Parameters

| Parameter                 | Type      | Default                                  | Description                                             |
| ------------------------- | --------- | ---------------------------------------- | ------------------------------------------------------- |
| `trace_path`              | string    | Required                                 | Path to the I/O trace data for analysis                 |
| `percentile`              | float     | null                                     | Percentile threshold for significant I/O operations     |
| `threshold`               | int       | null                                     | Severity threshold value for significant I/O operations |
| `time_granularity`        | float     | 1e6                                      | Time granularity for analysis (varies by analyzer)      |
| `metrics`                 | list[str] | ["iops"]                                 | Metrics to analyze (e.g., "iops", "bandwidth")          |
| `debug`                   | bool      | false                                    | Enable debug mode with more verbose output              |
| `verbose`                 | bool      | false                                    | Enable verbose information display                      |
| `view_types`              | list[str] | ["time_range", "file_name", "proc_name"] | Views to analyze for bottlenecks                        |
| `logical_view_types`      | bool      | false                                    | Enable logical view types for hierarchical analysis     |
| `exclude_bottlenecks`     | list[str] | []                                       | List of bottleneck types to exclude from analysis       |
| `exclude_characteristics` | list[str] | []                                       | List of I/O characteristics to exclude from reporting   |

## Analyzer Configuration

WisIO supports multiple analyzers for different trace formats. You can select an analyzer using the `+analyzer=<type>` parameter.

### Common Analyzer Parameters

These parameters are available for all analyzer types:

| Parameter                   | Type   | Default                                   | Description                               |
| --------------------------- | ------ | ----------------------------------------- | ----------------------------------------- |
| `analyzer.bottleneck_dir`   | string | `${hydra:runtime.output_dir}/bottlenecks` | Directory for saving bottleneck data      |
| `analyzer.checkpoint`       | bool   | true                                      | Enable checkpointing of analysis state    |
| `analyzer.checkpoint_dir`   | string | `${hydra:runtime.output_dir}/checkpoints` | Directory for saving checkpoints          |
| `analyzer.time_approximate` | bool   | true                                      | Use approximate time for analysis         |
| `analyzer.time_granularity` | float  | Varies by analyzer                        | Time granularity specific to the analyzer |

### Darshan Analyzer (`+analyzer=darshan`)

For analyzing Darshan DXT trace files.

| Parameter                   | Type  | Default | Description                                   |
| --------------------------- | ----- | ------- | --------------------------------------------- |
| `analyzer.time_granularity` | float | 1e3     | Time granularity for Darshan (in nanoseconds) |

### DFTracer Analyzer (`+analyzer=dftracer`)

For analyzing DFTracer trace files.

| Parameter                   | Type  | Default | Description                                    |
| --------------------------- | ----- | ------- | ---------------------------------------------- |
| `analyzer.time_granularity` | float | 1e6     | Time granularity for DFTracer (in nanoseconds) |

### Recorder Analyzer (`+analyzer=recorder`)

For analyzing Recorder trace files.

| Parameter                   | Type  | Default | Description                                    |
| --------------------------- | ----- | ------- | ---------------------------------------------- |
| `analyzer.time_granularity` | float | 1e7     | Time granularity for Recorder (in nanoseconds) |

## Output Configuration

Control how analysis results are presented and stored.

### Common Output Parameters

These parameters are available for all output types:

| Parameter               | Type      | Default | Description                           |
| ----------------------- | --------- | ------- | ------------------------------------- |
| `output.compact`        | bool      | false   | Use compact output format             |
| `output.group_behavior` | bool      | false   | Group similar bottlenecks by behavior |
| `output.name`           | string    | ""      | Custom name for the output            |
| `output.root_only`      | bool      | true    | Only show output on the root process  |
| `output.view_names`     | list[str] | []      | Specific views to include in output   |

### Console Output (`+output=console`)

For displaying results directly in the console.

| Parameter                     | Type | Default | Description                              |
| ----------------------------- | ---- | ------- | ---------------------------------------- |
| `output.max_bottlenecks`      | int  | 3       | Maximum number of bottlenecks to display |
| `output.show_debug`           | bool | false   | Show debug information                   |
| `output.show_characteristics` | bool | true    | Show I/O characteristics                 |
| `output.show_header`          | bool | true    | Show header information                  |

### CSV Output (`+output=csv`)

For saving results to CSV files.

No additional parameters beyond the common ones.

### SQLite Output (`+output=sqlite`)

For storing results in an SQLite database.

| Parameter            | Type   | Default | Description                      |
| -------------------- | ------ | ------- | -------------------------------- |
| `output.run_db_path` | string | ""      | Path to the SQLite database file |

## Cluster Configuration

WisIO can distribute analysis across multiple nodes or cores using various cluster configurations.

### Common Cluster Parameters

These parameters are available for all cluster types:

| Parameter                 | Type   | Default                                  | Description                           |
| ------------------------- | ------ | ---------------------------------------- | ------------------------------------- |
| `cluster.local_directory` | string | `/tmp/${hydra:job.name}/${hydra:job.id}` | Directory for cluster temporary files |

### Local Cluster (`+cluster=local`)

For running analysis on a local machine.

| Parameter              | Type   | Default       | Description                          |
| ---------------------- | ------ | ------------- | ------------------------------------ |
| `cluster.host`         | string | null          | Host address for the local cluster   |
| `cluster.memory_limit` | int    | null          | Memory limit per worker              |
| `cluster.n_workers`    | int    | null          | Number of worker processes           |
| `cluster.processes`    | bool   | true          | Use processes instead of threads     |
| `cluster.silence_logs` | int    | 50 (CRITICAL) | Log level for silencing cluster logs |

### Job Queue Cluster Parameters

These parameters are common to LSF, PBS, and SLURM clusters:

| Parameter                                     | Type      | Default          | Description                        |
| --------------------------------------------- | --------- | ---------------- | ---------------------------------- |
| `cluster.cores`                               | int       | 16               | Number of cores per job            |
| `cluster.death_timeout`                       | int       | 60               | Timeout for worker death detection |
| `cluster.job_directives_skip`                 | list[str] | []               | Job directives to skip             |
| `cluster.job_extra_directives`                | list[str] | []               | Extra job directives               |
| `cluster.log_directory`                       | string    | ""               | Directory for job logs             |
| `cluster.memory`                              | string    | null             | Memory per job                     |
| `cluster.processes`                           | int       | 1                | Number of processes per job        |
| `cluster.scheduler_options.dashboard_address` | string    | null             | Dashboard address                  |
| `cluster.scheduler_options.host`              | string    | Current hostname | Host for the scheduler             |

### LSF Cluster (`+cluster=lsf`)

For running on LSF-based HPC systems.

| Parameter           | Type | Default | Description                  |
| ------------------- | ---- | ------- | ---------------------------- |
| `cluster.use_stdin` | bool | true    | Use stdin for job submission |

## Advanced Usage Examples

### Analyzing with Different Time Granularities

```bash
# Use a fine-grained time granularity for detailed analysis
wisio +analyzer=darshan time_granularity=1e2 trace_path=path/to/traces

# Use a coarse-grained granularity for faster analysis of large datasets
wisio +analyzer=recorder time_granularity=1e8 trace_path=path/to/traces
```

### Filtering Bottlenecks

```bash
# Exclude specific bottleneck types
wisio trace_path=path/to/traces exclude_bottlenecks=["small_io", "metadata_heavy"]

# Focus only on certain views
wisio trace_path=path/to/traces view_types=["file_name", "proc_name"]
```

### Using Multiple Output Formats

```bash
# Generate both console output and save to CSV
wisio trace_path=path/to/traces +output=console,csv
```

### Cluster-Specific Configuration

```bash
# Run on a SLURM cluster with specific resources
wisio trace_path=path/to/traces +cluster=slurm \
  cluster.cores=32 \
  cluster.memory=64GB \
  cluster.job_extra_directives=["--partition=compute", "--qos=normal"]
```
