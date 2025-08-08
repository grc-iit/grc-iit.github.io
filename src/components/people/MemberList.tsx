import React from "react";
import { Member, MemberType } from "@site/src/types";
import { usePluginData } from "@docusaurus/useGlobalData";

import MemberItem from "./MemberItem";

type MemberListProps = {
  memberType: MemberType;
};

export default function MemberList({ memberType }: MemberListProps) {
  const membersData = usePluginData("grc-plugin-members") as {
    members: Member[];
  };

  // Filter members by the specified type
  const filteredMembers =
    membersData?.members?.filter((member) => member.type === memberType) || [];

  // Sort members by surname (last name)
  const sortedMembers = filteredMembers.sort((a, b) => {
    // Extract surname from full name (last word after removing title prefixes)
    const getSurname = (name: string) => {
      const nameWithoutTitle = name.replace(
        /^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s+/i,
        ""
      );
      const parts = nameWithoutTitle.split(" ");
      return parts[parts.length - 1]; // Get last part as surname
    };

    const surnameA = getSurname(a.name).toLowerCase();
    const surnameB = getSurname(b.name).toLowerCase();

    return surnameA.localeCompare(surnameB);
  });

  return (
    <div className="row">
      {sortedMembers.map((member) => (
        <MemberItem member={member} key={member.name} />
      ))}
    </div>
  );
}
