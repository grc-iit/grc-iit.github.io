import React from "react";
import { Affiliation } from "@site/src/types";
import { usePluginData } from "@docusaurus/useGlobalData";

import AffiliationItem from "./AffiliationItem";

type AffiliationListProps = {
  type?: Affiliation["type"];
  limit?: number;
  // Keep backward compatibility: allow passing pre-filtered data if needed
  data?: Affiliation[];
};

export default function AffiliationList({ type, limit, data }: AffiliationListProps) {
  const globalData = usePluginData("grc-plugin-affiliations") as {
    affiliations: Affiliation[];
  } | undefined;

  const source = data ?? globalData?.affiliations ?? [];
  const filtered = type ? source.filter((a) => a.type === type) : source;
  const displayed = typeof limit === "number" ? filtered.slice(0, limit) : filtered;

  return (
    <div className="margin-bottom--lg row">
      {displayed.map((affiliation) => (
        <AffiliationItem affiliation={affiliation} key={affiliation.name} />
      ))}
    </div>
  );
}
