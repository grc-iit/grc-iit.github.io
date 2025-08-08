import React from "react";
import { Project } from "@site/src/types";
import { usePluginData } from "@docusaurus/useGlobalData";

import ProjectItem from "./ProjectItem";

type ProjectListProps = {
  isSorted?: boolean;
};

export default function ProjectList({
  isSorted = false,
}: ProjectListProps) {
  const { projects } = usePluginData("grc-plugin-projects") as {
    projects: Project[];
  };

  return (
    <div className="container">
      <div className="row">
        {(isSorted
          ? [...projects].sort((a, b) => {
              const hasOrderA = typeof a.order === "number";
              const hasOrderB = typeof b.order === "number";
              if (hasOrderA && hasOrderB) {
                if (a.order !== b.order) return (a.order as number) - (b.order as number);
                return a.name.localeCompare(b.name);
              }
              if (hasOrderA) return -1;
              if (hasOrderB) return 1;
              return a.name.localeCompare(b.name);
            })
          : projects
        ).map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
