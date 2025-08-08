import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectId, Project } from "@site/src/types";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { getProjectById } from "@site/src/utils/projectUtils";
import { usePluginData } from "@docusaurus/useGlobalData";

type ProjectBadgesProps = {
  addMargin?: boolean;
  isCompact?: boolean;
  projectId: ProjectId;
};

import styles from "./ProjectBadges.module.css";

export default function ProjectBadges({
  addMargin = true,
  projectId,
}: ProjectBadgesProps) {
  const { projects } = usePluginData("grc-plugin-projects") as {
    projects: Project[];
  };
  const project = getProjectById(projects, projectId);

  if (!project) {
    return null;
  }

  const { isOurs = false, sourceLink, tutorialLink, type } = project;
  const isFunded = type === "funded";
  // Check if all false
  if (!isFunded && !isOurs && !sourceLink && !tutorialLink) {
    return null;
  }
  return (
    <div className={clsx(addMargin && "margin-bottom--md")}>
      {isOurs && (
        <span className="badge badge--primary margin-right--xs">GRC-led</span>
      )}
      {isFunded && (
        <span className="badge badge--success margin-right--xs">Funded</span>
      )}
      {typeof sourceLink !== "undefined" && (
        <a
          className={clsx(
            "badge badge--secondary margin-right--xs",
            styles.badgeDarker
          )}
          href={sourceLink}
          rel="noreferrer"
          style={{ color: "var(--ifm-color-black) !important" }}
          target="_blank"
        >
          Open Source
          <FontAwesomeIcon
            className="margin-left--xs"
            icon={faArrowUpRightFromSquare}
            size="sm"
            style={{ color: "var(--ifm-color-black)" }}
          />
        </a>
      )}
      {typeof tutorialLink !== "undefined" && (
        <a
          className="badge badge--danger margin-right--xs"
          href={tutorialLink}
          rel="noreferrer"
          style={{
            backgroundColor: "var(--ifm-color-warning-lightest) !important",
            borderColor: "var(--ifm-color-warning-lightest) !important",
            color: "var(--ifm-color-black) !important",
          }}
          target="_blank"
        >
          Tutorial
          <FontAwesomeIcon
            className="margin-left--xs"
            icon={faArrowUpRightFromSquare}
            size="sm"
            style={{ color: "var(--ifm-color-black)" }}
          />
        </a>
      )}
    </div>
  );
}
