# Introspect

This code provides compatability between operating systems for certain APIs.
Here we will discuss the APIs used most commonly across projects.

## Environment Variables

```cpp
HSHM_DLL static std::string Getenv(
    const char *name, size_t max_size = hshm::Unit<size_t>::Megabytes(1));

static std::string Getenv(
    const std::string &name,
    size_t max_size = hshm::Unit<size_t>::Megabytes(1));

HSHM_DLL static void Setenv(const char *name, const std::string &value,
                            int overwrite);

HSHM_DLL static void Unsetenv(const char *name);
```

These apis are self-explanatory. They provide portable ways to access environment
variables.

## CPU Introspection

```cpp
HSHM_DLL void RefreshCpuFreqKhz();

HSHM_DLL size_t GetCpuFreqKhz(int cpu);

HSHM_DLL size_t GetCpuMaxFreqKhz(int cpu);

HSHM_DLL size_t GetCpuMinFreqKhz(int cpu);

HSHM_DLL size_t GetCpuMinFreqMhz(int cpu);

HSHM_DLL size_t GetCpuMaxFreqMhz(int cpu);

HSHM_DLL void SetCpuFreqMhz(int cpu, size_t cpu_freq_mhz);

HSHM_DLL void SetCpuFreqKhz(int cpu, size_t cpu_freq_khz);

HSHM_DLL void SetCpuMinFreqKhz(int cpu, size_t cpu_freq_khz);

HSHM_DLL void SetCpuMaxFreqKhz(int cpu, size_t cpu_freq_khz);
```

These APIs only have effect on Linux. They relate
to the ability to get and set CPU frequency. This
is useful for various reasons. For example,
energy efficiency algorithms can lower CPU frequency
to handle low priority tasks.


