import React from "react";
import Layout from "@theme/Layout";
import { Publication } from "@site/src/types";

interface PublicationPageProps {
  publication: Publication;
}

export default function PublicationPage({
  publication,
}: PublicationPageProps): JSX.Element {
  return (
    <Layout title={publication.title}>
      <main className="container container--fluid margin-vert--lg">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col col--8">
            <article>
              <header>
                <h1>{publication.title}</h1>
              </header>

              <div className="margin-bottom--md">
                <p>
                  <strong>Authors:</strong> {publication.authors.join(", ")}
                </p>
                <p>
                  <strong>Date:</strong> {publication.date}
                </p>
                {publication.venue && (
                  <p>
                    <strong>Venue:</strong> {publication.venue}
                  </p>
                )}
                {publication.type && (
                  <p>
                    <strong>Type:</strong> {publication.type}
                  </p>
                )}
              </div>

              {publication.abstract && (
                <div className="margin-bottom--lg">
                  <h2>Abstract</h2>
                  <p style={{ textAlign: "justify", lineHeight: "1.6" }}>
                    {publication.abstract}
                  </p>
                </div>
              )}

              {publication.tags && publication.tags.length > 0 && (
                <div className="margin-bottom--lg">
                  <h3>Tags</h3>
                  <div>
                    {publication.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge badge--secondary margin-right--sm margin-bottom--sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {publication.links &&
                Object.keys(publication.links).length > 0 && (
                  <div className="margin-bottom--lg">
                    <h3>Links</h3>
                    <div>
                      {Object.entries(publication.links).map(([key, url]) => (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button--outline button--primary margin-right--sm margin-bottom--sm"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              {publication.doi && (
                <div className="margin-bottom--lg">
                  <p>
                    <strong>DOI:</strong>{" "}
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {publication.doi}
                    </a>
                  </p>
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
    </Layout>
  );
}
