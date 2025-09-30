# IOWarp Website Page Upgrade Plan

## Overview
This document outlines the comprehensive plan for upgrading the IOWarp project page on the GRC website, incorporating recent work on agentic workflows, Model Context Protocols (MCPs), and performance achievements.

## Key Changes Summary
1. Backup current page as `iowarp_old.mdx`
2. Enhance content with agentic workflows and MCP focus
3. Add publications component
4. Include collaborator logos and NSF funding details
5. Embed demo videos from YouTube
6. Use existing images from reference materials

## Available Image Assets

### Main Story Images (reference_material/)
- `IoWarp-HourGlass.jpg` - Main architecture overview
- `CTE with labios.jpg` - Content Transfer Engine with LabIOS integration
- `PFS-HourGlass.jpg` - Parallel File System integration

### Poster Images (reference_material/FiguresPoster/)
- `architecture (2).png` - Detailed architecture diagram
- `atom_1000_trajectory.png` - LAMMPS trajectory visualization
- `atom_1000_crop.png` - Cropped atom trajectory
- `duration_chart_w_OC.png` - Performance duration charts
- `figure_ior_performance_test.png` - IOR benchmark results
- `ndp-claude.png` - NDP integration with Claude
- `ndp-output-1.PNG` - NDP output example
- `observability.png` - System observability dashboard
- `paraview_pipe.png` - ParaView pipeline visualization

### MCP Paper Images (reference_material/figureMCPTCP/)
- `20_ior_performance_test.png` - IOR performance benchmarks
- `architecture (2).png` - MCP architecture
- `atom_1000_trajectory.png` - Atom trajectory analysis
- `config_success_rates.png` - Configuration success metrics
- `duration_chart.png` - Task duration analysis
- `duration_chart_w_OC.png` - Duration with overhead compensation
- `ndp-claude.png` - NDP-Claude integration
- `ndp-output-1.PNG` - NDP output samples
- `observability.png` - Observability metrics
- `success_rate_by_agent_model.png` - Agent model comparisons
- `success_rate_chart.png` - Overall success rates

### Existing Website Assets
- `static/img/affiliations/nsf.png` - NSF logo
- `static/img/affiliations/hdfgroup.jpg` - HDF Group logo
- `static/img/projects/iowarp/architecture.svg` - Current architecture diagram
- `static/img/projects/iowarp/IoWarp-HourGlass.svg` - Current hourglass diagram

## Detailed Page Structure

### 1. Header Section
```mdx
---
title: "IOWarp: Advanced Data Management Platform for AI-Augmented Scientific Workflows"
---

import ProjectBadges from "@site/src/components/projects/ProjectBadges";
import ProjectPublications from "@site/src/components/projects/ProjectPublications";

<ProjectBadges projectId="iowarp" />
```

### 2. Introduction
- **Keep**: Basic platform description
- **Add**:
  - NSF Award #2411318 (2024-2029)
  - $5 million funding highlight
  - Emphasis on agentic workflows and MCP integration
  - Deployments at Argonne, LLNL, NERSC

### 3. Architecture Overview
**Primary Image**: Use `reference_material/FiguresPoster/architecture (2).png`

Content sections:
- Four-pillar architecture explanation
- Content Assimilation Engine (CAE)
- Content Transfer Engine (CTE)
- Content Exploration Interface (CEI)
- Platform Plugins Interface (PPI)

### 4. Agentic Workflows & Model Context Protocols
**Images to use**:
- `reference_material/FiguresPoster/ndp-claude.png` - Show NDP integration
- `reference_material/figureMCPTCP/success_rate_chart.png` - Success metrics
- `reference_material/figureMCPTCP/success_rate_by_agent_model.png` - Model comparisons

Content:
- November 2024 Anthropic MCP release
- IOWarp's pioneering scientific MCPs
- Available at github.com/iowarp/scientific-mcps
- Integration with Claude Code

### 5. Performance & Benchmarks
**Images to use**:
- `reference_material/FiguresPoster/figure_ior_performance_test.png` - IOR benchmarks
- `reference_material/figureMCPTCP/duration_chart_w_OC.png` - Performance duration
- `reference_material/figureMCPTCP/config_success_rates.png` - Configuration success

Key metrics to highlight:
- 2.6x less DRAM usage
- 5x performance improvement
- 17% inference loss improvement
- 2x more data than cuFile without crashes

### 6. Scientific Application Examples
**Images to use**:
- `reference_material/FiguresPoster/atom_1000_trajectory.png` - LAMMPS visualization
- `reference_material/FiguresPoster/paraview_pipe.png` - ParaView integration
- `reference_material/FiguresPoster/atom_1000_crop.png` - Detailed atom analysis

Content:
- LAMMPS simulation analysis
- Adios BP5 file processing
- HDF5 exploration capabilities

### 7. System Integration
**Images to use**:
- `reference_material/PFS-HourGlass.jpg` - PFS integration
- `reference_material/CTE with labios.jpg` - LabIOS integration

### 8. Observability & Monitoring
**Image to use**:
- `reference_material/FiguresPoster/observability.png`

Content:
- Real-time monitoring capabilities
- Performance tracking
- Resource utilization metrics

### 9. Demo Videos
Embed YouTube videos (from links.txt):
```mdx
## Demonstrations

### IOWarp-MCP Demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/bjQ8uks4b5s"
        frameborder="0" allowfullscreen></iframe>

### IOWarp Reproducibility Demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/AfS7xrYIRwc"
        frameborder="0" allowfullscreen></iframe>

### IOWarp-MCP Adios Demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/2x6yAcCPJFc"
        frameborder="0" allowfullscreen></iframe>
```

### 10. Publications
```mdx
## Publications
<ProjectPublications projectId="iowarp" />
```

### 11. Resources & Links
- GitHub Organization: https://github.com/iowarp/
- IOWarp MCPs: https://github.com/iowarp/iowarp-mcps
- Documentation: https://iowarp.github.io/iowarp-mcps/
- Project Website: https://grc.iit.edu/research/projects/iowarp

### 12. Collaborators & Partners
```mdx
## Collaborators

<div className="row">
  <div className="col-md-4 text-center">
    <img src={require("@site/static/img/affiliations/hdfgroup.jpg").default}
         alt="HDF Group" width="200" />
    <p><strong>HDF Group</strong></p>
  </div>
  <div className="col-md-4 text-center">
    <p><strong>University of Utah</strong></p>
  </div>
</div>

## Deployment Partners
- Argonne National Laboratory
- Lawrence Livermore National Laboratory
- NERSC (National Energy Research Scientific Computing Center)
```

### 13. Funding Acknowledgment
```mdx
## Sponsor

<div className="text-center">
  <img src={require("@site/static/img/affiliations/nsf.png").default}
       alt="National Science Foundation" width="300" />
  <h3>National Science Foundation</h3>
  <p><strong>Award #2411318 (2024-2029)</strong></p>
  <p>$5 Million</p>
</div>
```

## Implementation Steps

### Step 1: Prepare Images
1. Create directory if not exists: `static/img/projects/iowarp/`
2. Copy main story images from `reference_material/`:
   - `IoWarp-HourGlass.jpg`
   - `CTE with labios.jpg`
   - `PFS-HourGlass.jpg`
3. Copy poster images from `reference_material/FiguresPoster/`:
   - All 9 PNG files
4. Copy MCP paper images from `reference_material/figureMCPTCP/`:
   - Select unique images not duplicated in FiguresPoster

### Step 2: Backup Current Page
```bash
cp src/pages/research/projects/iowarp.mdx src/pages/research/projects/iowarp_old.mdx
```

### Step 3: Create New Enhanced Page
1. Start with the structure outlined above
2. Integrate all text content from reference materials
3. Ensure all component imports are correct
4. Add responsive image sizing

### Step 4: Content Integration Priority
1. **High Priority**:
   - Agentic workflows and MCP content
   - Performance metrics with specific numbers
   - Video demonstrations
   - NSF funding details

2. **Medium Priority**:
   - Detailed architecture explanations
   - Application examples
   - Deployment site mentions

3. **Standard Priority**:
   - Technical API details
   - Extended architecture descriptions

### Step 5: Testing
1. Verify all images load correctly
2. Test ProjectPublications component works
3. Check video embeds function
4. Validate responsive design
5. Ensure all links are functional

### Step 6: Final Review
1. Compare with other project pages (Hermes, WisIO) for consistency
2. Verify all reference material content is incorporated
3. Check citation generator functionality
4. Ensure page follows website style guidelines

## Content Highlights from Reference Materials

### Key Performance Metrics
- **Memory Efficiency**: 2.6x less DRAM usage while maintaining competitive speed
- **Performance**: Up to 5x performance over disk-based DDN
- **Data Capacity**: 2x more data than cuFile without crashes
- **Inference Improvement**: 17% improvement in inference loss
- **Read Performance**: 95.5% reduction in read time at 512 KiB
- **Processing Speed**: 340,000 potential bottlenecks per second

### Agentic Workflow Features
- Model Context Protocol (MCP) support
- Natural language interface via WarpGPT
- Integration with Claude Code
- Support for scientific data formats (HDF5, Adios BP5)
- Automated workflow orchestration

### Technical Innovations
- GPU infinite memory APIs
- Transparent data tiering
- CuFile interception for tiering
- Producer-consumer optimization
- Accelerated I/O resolution

## Notes
- University of Utah logo not found in current assets - will use text mention only
- Citation generator already exists in the system - no need to create
- All images should be optimized for web (consider converting large PNGs to WebP)
- Maintain consistency with existing project page styles