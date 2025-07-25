import React from "react";
import { Publication } from "@site/src/types";
import { usePluginData } from "@docusaurus/useGlobalData";

import PublicationTable from "./PublicationTable";

interface PublicationListProps {
  // Optional props for filtering or customization
  limit?: number;
  isFooterVisible?: boolean;
  isSearchInputVisible?: boolean;
  isTagsColumnVisible?: boolean;
}

export default function PublicationList({
  limit,
  isFooterVisible,
  isSearchInputVisible,
  isTagsColumnVisible,
}: PublicationListProps): JSX.Element {
  const { publications } = usePluginData("grc-plugin-publications") as {
    publications: Publication[];
  };

  const displayedPublications = limit
    ? publications.slice(0, limit)
    : publications;

  return (
    <PublicationTable
      data={displayedPublications}
      isFooterVisible={isFooterVisible}
      isSearchInputVisible={isSearchInputVisible}
      isTagsColumnVisible={isTagsColumnVisible}
    />
  );
}
