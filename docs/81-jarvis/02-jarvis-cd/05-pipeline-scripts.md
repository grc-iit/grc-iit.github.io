# Pipeline Scripts

Pipeline scripts are useful for storing cross-platform unit tests.
They store all of the information needed to create and execute
a pipeline.

## Running a pipline script

Pipeline scripts are YAML files and can be executed as follows:
```bash
jarvis ppl load yaml /path/to/my_pipeline.yaml
jarvis ppl run
```

Alternatively, if you want to load + run the script:
```bash
jarvis ppl run yaml /path/to/my_pipeline.yaml
```

## Updating a pipeline

To load changes made to a pipeline script, you can run:
```bash
jarvis ppl update yaml
```

The pipeline will store the path so you don't have to repeat.

## Example Pipeline Script

Below is a small example of a file for testing block device I/O
in a task-based I/O system named Chimaera.

The script is named ``test_bdev_io.yaml``

```yaml
name: chimaera_unit_ipc
env: chimaera
pkgs:
  - pkg_type: chimaera_run
    pkg_name: chimaera_run
    sleep: 10
    do_dbg: true
    dbg_port: 4000
  - pkg_type: chimaera_unit_tests
    pkg_name: chimaera_unit_tests
    TEST_CASE: TestBdevIo
    do_dbg: true
    dbg_port: 4001
```

## name: chimaera_unit_ipc

The name of the pipeline that jarvis references.

The following command would focus the pipeline in jarvis:
```bash
jarvis cd chimaera_unit_ipc
```

## env: chimaera

This command loads a named environment file.
It expects the environmnt to already exist.

In this example, the environment is expected to
be named ``chimaera``

```bash
jarvis env build chimaera
```

When you run ``jarvis ppl load yaml test_bdev_io.yaml``,
the environment chimaera will be automatically loaded.

## pkgs:

In this section, we define the parameters to each package
in the pipeline. 

Here, we have two packages, chimaera_run (the server) and
chimaera_unit_tests (the client). 

When you run ``jarvis ppl load yaml test_bdev_io.yaml``,
the following commands will be executed internally by Jarvis:
```bash
jarvis ppl append chimaera_run sleep=10 +do_dbg dbg_port=4000
jarvis ppl append chimaera_unit_tests +do_dbg dbg_port=4001 TEST_CASE=TestBdevIo
```