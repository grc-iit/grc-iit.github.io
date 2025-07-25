import Layout from "@theme/Layout";
import React from "react";
import { Member, Publication } from "@site/src/types";

import MemberLinks from "./MemberLinks";
import PublicationsTable from "../publications/PublicationsTable";

interface MemberPageProps {
  member: Member;
  publications: Publication[];
}

export default function MemberPage({
  member,
  publications,
}: MemberPageProps): JSX.Element {
  return (
    <Layout title={member.name}>
      <main className="container container--fluid margin-vert--lg">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col col--8">
            <article>
              <header>
                <h1>{member.name}</h1>
              </header>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  {member.links && <MemberLinks links={member.links} />}

                  <p style={{ marginTop: "1rem", lineHeight: "1.6" }}>
                    {member.bio}
                  </p>
                </div>

                <div style={{ paddingLeft: 32 }}>
                  <img
                    src={`/img/members/${member.image}`}
                    alt={member.name}
                    style={{ borderRadius: 16, width: "160px" }}
                  />
                </div>
              </div>

              {member.researchInterests &&
                member.researchInterests.length > 0 && (
                  <>
                    <h2>Research Interests</h2>
                    <ul>
                      {member.researchInterests.map((interest, index) => (
                        <li key={index}>{interest}</li>
                      ))}
                    </ul>
                  </>
                )}

              <h2>Publications</h2>
              {publications.length > 0 ? (
                <PublicationsTable
                  data={publications}
                  isFooterVisible={false}
                  isSearchInputVisible={false}
                  isTagsColumnVisible={false}
                />
              ) : (
                <p>No publications found for {member.name}.</p>
              )}
            </article>
          </div>
        </div>
      </main>
    </Layout>
  );
}
