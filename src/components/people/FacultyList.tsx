import React from "react";
import { Faculty } from "@site/src/types";
import { usePluginData } from "@docusaurus/useGlobalData";

import FacultyItem from "./FacultyItem";

export default function FacultyList() {
  const facultyData = usePluginData("grc-plugin-faculty") as {
    faculty: Faculty[];
  };

  // Faculty is already sorted by order field in the plugin, but we can ensure it here
  const sortedFaculty =
    facultyData?.faculty?.sort((a, b) => {
      const orderA = a.order || 999; // Default to high number if no order specified
      const orderB = b.order || 999;
      return orderA - orderB;
    }) || [];

  return (
    <div className="row">
      {sortedFaculty.map((faculty) => (
        <FacultyItem faculty={faculty} key={faculty.name} />
      ))}
    </div>
  );
}
