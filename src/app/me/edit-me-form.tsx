"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { objectKeys } from "~/utils/objectKeys";
import { type Me } from "~/validators/me";
import { type UpdateMe, updateMeValidator } from "~/validators/update-me";

export const EditMeForm = () => {
  const {toast} = useToast()
  const apiUtils = api.useUtils();
  const {data} = api.me.getMe.useQuery()
  const editMeForm = useForm<UpdateMe>({
    resolver: zodResolver(updateMeValidator),
  });
  const updateFormValues = useCallback((vals: unknown)=>{

      const updatableFieldsValidationResult = updateMeValidator.safeParse(vals)
      if(!updatableFieldsValidationResult.success){
        return
      }
      const newMe = updatableFieldsValidationResult.data
      objectKeys(newMe).forEach(key=>{
        editMeForm.setValue(key, newMe[key])
      })
  },[editMeForm])

  useEffect(()=>{
    if(data?.me){
      updateFormValues(data?.me)
    }
  },[data?.me, updateFormValues])
  const {mutate: updateMe} = api.me.updateMe.useMutation({
    onSuccess: (updatedMe) => {
      void apiUtils.me.invalidate()
      updateFormValues(updatedMe)
    },
    onError: ({message}) => {
      toast({variant: 'destructive', title:message})
    },
  });
  const editMeSubmit = useCallback<SubmitHandler<UpdateMe>>(
    (myUpdatedDetails) => {
      updateMe(myUpdatedDetails)
    },
    [updateMe],
  );
  return (
    <Form {...editMeForm}>
      <form
        className="space-y-8 pt-8"
        onSubmit={editMeForm.handleSubmit(editMeSubmit)}
      >
        <FormField
          control={editMeForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editMeForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" type="email" {...field} />
              </FormControl>
              <FormDescription>
                This is the email that will be associated with your profile.
                Currently it won&apos;t be used for anything.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editMeForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
              </FormControl>
              <FormDescription>
                This is the phone number that will be associated with your
                profile. Currently it won&apos;t be used for anything.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Update account
        </Button>
      </form>
    </Form>
  );
};
