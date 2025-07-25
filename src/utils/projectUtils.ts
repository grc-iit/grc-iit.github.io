import { Project, ProjectId } from "@site/src/types";

export const getProjectById = (
  projects: Project[],
  id: ProjectId
): Project | undefined => {
  return projects.find((project) => project.id === id);
};
