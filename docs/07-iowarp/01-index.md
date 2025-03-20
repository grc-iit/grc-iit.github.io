# IoWarp

IoWarp is a powerful cutting-edge data management platform designed to streamline and accelerate scientific workflows, especially those intensified by the rise of artificial intelligence (AI). It optimizes data flow throughout the research process, ensuring efficient handling of diverse data types, formats, and the exponential growth of data. IOWarp aims to significantly reduce data access times, accelerate the pace of scientific discovery, and foster a collaborative research environment.

## Dependencies

Currently, IoWarp is Linux-only. We are working on extending portability.

[Spack](https://spack.io/) is the easiest way to install iowarp as of right now.

### Install Spack
```bash
cd ${HOME}
git clone https://github.com/spack/spack.git
cd spack
git checkout tags/v0.22.2
echo ". ${PWD}/share/spack/setup-env.sh" >> ~/.bashrc
source ~/.bashrc
```

### Clone the IoWarp Spack Repo
```bash
cd ${HOME}
git clone https://github.com/iowarp/iowarp-install.git
spack repo add iowarp-install/iowarp-spack
```

## Install IOWARP: USERS
For general users of IOWARP, use the following command:
```bash
spack install iowarp
```

## Install IOWARP: DEVS

### Project Environment
Decide on where you want to place your iowarp repos.
This guide will assume you have set a variable named IOWARP_PKGS.
```bash
export IOWARP_PKGS="${HOME}"
```

Set IOWARP_PKGs to where you want your packages.

NOTE: This variable needs to be reset for every new terminal.
On Linux, you could add the above command to your ``~/.bashrc``
to automate. 

### Clone the repos
```bash
cd ${IOWARP_PKGS}
git clone https://github.com/iowarp/cte-hermes-shm.git
git clone https://github.com/iowarp/iowarp-runtime
git clone https://github.com/iowarp/content-transfer-engine.git
```

IoWarp has three main repos actively developed right now. For 
the ones you are contributing to, fork them first and replace
the ``git clone`` urls above with your personal fork.

### Option 1: Install Dependencies on Native Machine
IoWarp is currently only compatible with Linux. This
section is for those who plan to develop iowarp on
their Linux machine.

To install iowarp dependencies:
```bash
spack install iowarp +nocompile
```

For developer installations, we will use a tool named scspkg.
scspkg is installed automatically by iowarp. It is a tool for
managing modulefiles, which set various environment variables
that streamline the installation of our tools.

### Option 2: Use Docker to Install Dependencies

For those that don't want to install Linux or would rather not
mess with their environment, we maintain a development container.
We provide an Ubuntu contianer where iowarp's dependencies are
already installed. 

Here is the docker compose:
```dockerfile
services:
  iowarp:
    image: lukemartinlogan/chimaera-deps:latest
    container_name: iowarp  
    shm_size: 8g
    mem_limit: 8g
    volumes:
      - ~/.ssh:/root/.ssh
      - ${IOWARP_PKGS}/cte-hermes-shm:/cte-hermes-shm
      - ${IOWARP_PKGS}/iowarp-runtime:/iowarp-runtime
      - ${IOWARP_PKGS}/content-transfer-engine:/content-transfer-engine
    stdin_open: true
    tty: true
    network_mode: host
```

To launch container:
```bash
mkdir -p ${IOWARP_PKGS}/docker/develop
cd ${IOWARP_PKGS}/docker/develop
touch ${IOWARP_PKGS}/docker/develop/docker-compose.yml
# Copy-paste the above into the file
docker compose up -d  # Only for recent dockers
docker-compose up -d  # Only for older dockers
```

To interact with the container:
```bash
docker exec -it iowarp bash
```

To stop container:
```bash
cd ${IOWARP_PKGS}/docker/develop
docker compose down  # Only for recent dockers
docker-compose down  # Only for older dockers
```

NOTE: ``shm_size`` and ``mem_limit`` are set to 8GB. Feel free to increase or decrease
that value.

### For Pull Requests
You may find the github [command line](https://cli.github.com/) useful for making PRs.
```bash
gh auth login
gh repo set-default
gh pr create --title "Your pull request title" --body "Your pull request description"
```

### Load Basic Packages

```bash
spack load iowarp
```

Make sure to understand your environment. If you get errors
like ``package X was not found``, it is most likely you forgot
to do either ``spack load X`` or ``module load X``.

### Hermes-SHM
```bash
cd ${IOWARP_PKGS}/cte-hermes-shm
scspkg create hermes_shm
rm -rf build
mkdir build
cd build
cmake ../ \
-DCMAKE_INSTALL_PREFIX=$(scspkg pkg root hermes_shm) \
-DHSHM_ENABLE_COMPRESS=ON \
-DHSHM_ENABLE_ENCRYPT=ON \
-DHSHM_RPC_THALLIUM=ON \
-DHSHM_USE_ELF=ON
make -j32 install
```

If you will be working on hermes-shm, create your own personal 
fork instead of cloning directly. The following will allow
you to keep your fork updated with changes to the global repo.
```bash
cd ${IOWARP_PKGS}/cte-hermes-shm
git remote add iowarp https://github.com/iowarp/cte-hermes-shm.git
git pull iowarp
```

### IoWarp Runtime: Chimaera
```bash
cd ${IOWARP_PKGS}/iowarp-runtime
scspkg create iowarp_runtime
module unload iowarp_runtime
module load hermes_shm  
rm -rf build
mkdir build
cd build
cmake ../ \
-DCMAKE_INSTALL_PREFIX=$(scspkg pkg root iowarp_runtime)
make -j32 install
```

NOTE: If you will be working on iowarp-runtime, create your own personal 
fork instead of cloning directly. The following will allow
you to keep your fork updated with changes to the global repo.
```bash
cd ${IOWARP_PKGS}/iowarp-runtime
git remote add iowarp https://github.com/iowarp/iowarp-runtime
git pull iowarp
```

### Content-Transfer-Engine: Hermes
```bash
cd ${IOWARP_PKGS}/content-transfer-engine
scspkg create cte
module unload cte
module load hermes_shm iowarp_runtime
rm -rf build
mkdir build
cd build
cmake ../ \
-DCMAKE_INSTALL_PREFIX=$(scspkg pkg root cte)
make -j32 install
```

NOTE: If you will be working on the cte, create your own personal
fork instead of cloning directly. The following will allow
you to keep your fork updated with changes to the global repo.
```bash
cd ${IOWARP_PKGS}/content-transfer-engine
git remote add iowarp https://github.com/iowarp/content-transfer-engine.git
git pull iowarp
```

### Another note on environments

By the end of this installation, you will have the following spack:
```bash
spack load iowarp
```

And the following modules:
```bash
module load hermes_shm iowarp_runtime cte
```

Understanding how your environment works is important. When
compiling you must make sure that only the necessary modules
are loaded. For example, the iowarp_runtime install only
requires ``spack load iowarp`` and ``module load hermes_shm``.

If you have ``module load iowarp_runtime`` as well, 
there is a chance the compiler will find header files
in the module's directory, instead of the build directory.
This can lead to compilation errors since the module directory
will likely be outdated compared to the code you just wrote.
