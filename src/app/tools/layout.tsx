import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educational AI Tools",
  description: "Explore the comprehensive suite of Al Manhal AI pedagogical tools designed to empower teachers with automated lesson plans, assessments, and classroom activities.",
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
