import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "../pages/Dashboard";
import { z } from "zod";


export const Route = createFileRoute("/dashboard")({
  validateSearch: z.object({
    completed: z.boolean().optional(),
    priority:z.number().optional(),
    sort:z.string().optional(),
  }),
  component: DashboardComponent,
});

function DashboardComponent() {
  return <Dashboard/>;
}
