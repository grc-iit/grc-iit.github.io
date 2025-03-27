# Pipeline Tests

Pipeline tests are used to run experiment sets using
a grid search.

## Example File

Below is an example of a pipeline for running various 
configurations of spark KMeans.

```yaml
config:
  name: mm_kmeans_spark
  env: mega_mmap
  pkgs:
    - pkg_type: spark_cluster
      pkg_name: spark_cluster
      num_nodes: 1
    - pkg_type: mm_kmeans_df
      pkg_name: mm_kmeans_df
      path: ${HOME}/mm_data/parquet/kmeans.parquet
      window_size: 4g
      df_size: 4g
      nprocs: 1
      ppn: 16
      type: parquet
      k: 1000
    - pkg_type: mm_kmeans
      pkg_name: mm_kmeans
      path: ${HOME}/mm_data/parquet/*
      window_size: 30g
      api: spark
      max_iter: 4
      k: 8
      do_dbg: False
      dbg_port: 4001
vars:
  mm_kmeans_df.window_size: [16m, 64m, 128m, 1g, 2g, 4g]
  mm_kmeans_df.df_size: [16m, 64m, 128m, 1g, 2g, 4g]
  spark_cluster.num_nodes: [4]
loop:
  - [mm_kmeans_df.window_size, mm_kmeans_df.df_size]
  - [spark_cluster.num_nodes]
repeat: 1
output: "${SHARED_DIR}/output_multi"
```

## config:

This section is the skeleton of a pipeline. It has the same exact parameters
as a [pipeline script](05-pipeline-scripts.md).

This example, the pipeline will be called mm_kmeans_spark and launch a spark 
cluster, dataset generator, and spark kmeans in that order.

## vars:

Each pkg in the pipeline has a set of variables it exposes. In this example,
we vary the dataset size, a window size, and the number of nodes in the spark cluster.

The syntax of variables are: ``pkg_name.var_name``

## loop:

This is represents what test loop should look like. In pseudocode,
the above loop would translate to python roughly as follows:

```python
mm_kmeans_df_window_size = ['16m', '64m', '128m', '1g', '2g', '4g']
mm_kmeans_df_df_size = ['16m', '64m', '128m', '1g', '2g', '4g']
spark_cluster_num_nodes = [4]
for window_size, df_size in mm_kmeans_df_window_size, mm_kmeans_df_df_size:
  for num_nodes in spark_cluster_num_nodes:
    mm_kmeans_spark.configure(window_size, df_size, num_nodes)
```

In this example, a total of 6 cases are executed: 
```
16m 16m 4
64m 64m 4
128m 128m 4
1g 1g 4
2g 2g 4
4g 4g 4
```

By having a separate loop section, you can define certain variables as together or independent
to reduce the number of total test cases. In this example, ``mm_kmeans_df.window_size`` and ``mm_kmeans_df.df_size``
vary together, but independently from ``spark_cluster.num_nodes``.

``mm_kmeans_df.window_size`` and ``mm_kmeans_df.df_size`` must have the same size (in this case 6).

# repeat:

The number of times each experiment should be conducted. For example,
this can be used to calculate the average across experiment runs to
get a better understanding of variability and noise in your study.

In this example, experiments are only conducted once.

# output

This is the directory where the results are stored. Note, jarvis stores 
the pipeline's shared directory, private directory, and configuration directory
in the following three environment variables: ``${SHARED_DIR}``, ``${PRIVATE_DIR}``,
and ``${CONFIG_DIR}``.

By default, the output of this is going to be a dataset with each variable as a parameter:
```
[mm_kmeans_df.window_size] [mm_kmeans_df.df_size] [spark_cluster.num_nodes]
```

To get more columns, pkgs can define a custom ``_get_stat()`` function. This is more
for developers than users: Below is an example of a custom stat for the YCSB benchmark,
which analyzes the output of YCSB for its throughput and total runtime.
```python
class Ycsb:
  def _get_stat(self, stat_dict):
        """
        Get statistics from the application.

        :param stat_dict: A dictionary of statistics.
        :return: None
        """
        output = self.exec.stdout['localhost']
        if 'throughput(ops/sec)' in output:
            throughput = re.search(r'throughput\(ops\/sec\): ([0-9.]+)', output).group(1)
            stat_dict[f'{self.pkg_id}.throughput'] = throughput
        stat_dict[f'{self.pkg_id}.runtime'] = self.start_time
```