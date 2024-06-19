import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/score")({
  component: lazyRouteComponent(() => import("../features/ScoreFile")),
});
