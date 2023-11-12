"use client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "~/components/ui/card";
import { type ErrorPage } from "~/types/error-page";
const RootErrorPagee: ErrorPage = ({ error, reset }) => {
  return (
    <div className="flex flex-col gap-4 p-4 ">
      <Card className="bg-red-100 p-4">
        <CardTitle className="text-red-600">An error occured</CardTitle>
        <CardDescription className="text-red-600">{error.name}</CardDescription>

        <CardContent className="text-red-600">{error.message}</CardContent>
        <CardFooter>
          <Button onClick={reset}> refresh</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default RootErrorPagee;
