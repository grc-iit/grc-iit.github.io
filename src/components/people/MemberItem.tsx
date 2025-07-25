import React from "react";
import clsx from "clsx";
import { Member } from "@site/src/types";

import styles from "./MemberItem.module.css";

type MemberItemProps = {
  member: Member;
};

export default function MemberItem({ member }: MemberItemProps) {
  return (
    <div className="col col--4 padding-bottom--lg">
      <div className={styles.innerContainer}>
        <div className="padding-top--lg text--center">
          <img
            alt={member.name}
            className={styles.image}
            src={`/img/members/${member.image}`}
          />
        </div>
        {member.type === "researcher" || member.type === "engineer" ? (
          <a
            className={clsx("text--bold text--center", styles.name)}
            href={`/members/${member.slug}`}
          >
            {member.name}
          </a>
        ) : (
          <div className={clsx("text--bold text--center", styles.name)}>
            {member.name}
          </div>
        )}
        <div className="text--center">{member.title}</div>
        {member.affiliation && (
          <div className="text--center">{member.affiliation}</div>
        )}
        <div className="padding-bottom--lg" />
      </div>
    </div>
  );
}
