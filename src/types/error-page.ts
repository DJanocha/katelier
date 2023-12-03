import { type ReactNode } from "react";

export type ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => ReactNode;
