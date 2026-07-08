import { createFileRoute } from "@tanstack/react-router";
import { PortfolioShell } from "@/components/portfolio/PortfolioShell";
import { Recognition, Certs } from "@/components/portfolio/Journey";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Journey — Naaga Sumukh B S" },
      {
        name: "description",
        content: "Recognition and credentials of Naaga Sumukh B S.",
      },
      { property: "og:title", content: "Journey — Naaga Sumukh B S" },
      { property: "og:description", content: "Recognition and credentials." },
      { property: "og:url", content: "https://naagasumukh.engineer/journey" },
    ],
    links: [{ rel: "canonical", href: "https://naagasumukh.engineer/journey" }],
  }),
  component: () => (
    <PortfolioShell>
      <h1 className="sr-only">Professional Recognition and Credentials</h1>
      <Recognition />
      <Certs />
    </PortfolioShell>
  ),
});
