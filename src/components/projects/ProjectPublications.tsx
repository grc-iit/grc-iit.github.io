import PublicationTable from "../publications/PublicationTable";
import React from "react";
import {
  ProjectId,
  PublicationTag,
  Publication,
  Project,
} from "@site/src/types";
import { getProjectById } from "@site/src/utils/projectUtils";
import { usePluginData } from "@docusaurus/useGlobalData";

type ProjectPublicationsProps = {
  projectId?: ProjectId;
  tag?: PublicationTag;
};

const getPublicationsByTag = (
  publications: Publication[],
  tagToFilter: PublicationTag
): Publication[] => {
  return publications.filter((publication) =>
    publication.tags.includes(tagToFilter)
  );
};

export default function ProjectPublications({
  projectId,
  tag,
}: ProjectPublicationsProps) {
  const { publications: allPublications } = usePluginData(
    "grc-plugin-publications"
  ) as { publications: Publication[] };

  const { projects: allProjects } = usePluginData("grc-plugin-projects") as {
    projects: Project[];
  };

  let publications = [];
  if (projectId) {
    const project = getProjectById(allProjects, projectId);
    if (project) {
      publications = getPublicationsByTag(
        allPublications,
        project.name as PublicationTag
      );
    }
  } else if (tag) {
    publications = getPublicationsByTag(allPublications, tag);
  } else {
    throw new Error("Either projectId or tag must be provided");
  }

  return (
    <PublicationTable
      data={publications}
      isFooterVisible={false}
      isSearchInputVisible={false}
      isTagsColumnVisible={false}
    />
  );
}
