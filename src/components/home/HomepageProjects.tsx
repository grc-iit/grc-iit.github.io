import React from "react";
import clsx from "clsx";
import { Project } from "@site/src/types";
import { usePluginData } from "@docusaurus/useGlobalData";

import ProjectItem from "../projects/ProjectItem";
import SectionHeader from "../common/SectionHeader";
import styles from "./HomepageProjects.module.css";

export default function HomepageProjects({
  className,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>): JSX.Element {
  const { projects } = usePluginData("grc-plugin-projects") as {
    projects: Project[];
  };
  const featuredProjects = projects.filter((project) => project.isFeatured);
  return (
    <section className={clsx(styles.projects, className)}>
      <SectionHeader>Featured projects</SectionHeader>
      <div className="container">
        <div className="row">
          {featuredProjects.map((project) => (
            <ProjectItem
              isCompact={true}
              isThemeLight={true}
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
