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
          ? projects.sort((p1, p2) => p1.name.localeCompare(p2.name))
          : projects
        ).map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
