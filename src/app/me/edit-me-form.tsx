"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Form
} from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { updateMeValidator, type UpdateMe } from "~/validators/update-me";
import { EditableFormLabel } from "../_components/editable-form-label";
import { type Me } from "~/validators/me";

type UpdateMeKey = keyof UpdateMe;

export type EditMeFormProps = {
  me: Me
}
export const EditMeForm = ({ me }: EditMeFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const apiUtils = api.useUtils();
  const { mutate: updateMe } = api.me.updateMe.useMutation({
    onSuccess: () => {
      void apiUtils.me.invalidate();
      router.refresh();
    },
    onError: ({ message }) => {
      toast({ variant: "destructive", title: message });
    },
  });
  const editMeForm = useForm<UpdateMe>({
    resolver: zodResolver(updateMeValidator),
  });

  const saveField = useCallback(async (key: UpdateMeKey) => {
    const fieldValidationResult = updateMeValidator.shape[key].safeParse(editMeForm.getValues()[key])
    if (!fieldValidationResult.success) {
      await editMeForm.trigger(key)
      return
    }
    updateMe({ [key]: fieldValidationResult.data })
  }, [editMeForm, updateMe])


  return (
    <Form {...editMeForm}>
      <form
        className="space-y-8 pt-8"
      >
        <EditableFormLabel
          form={editMeForm}
          label="Name"
          name="name"
          onSave={() => saveField("name")}
          control={editMeForm.control}
          defaultValue={me?.name}
          description="This is the name that will be displayed on your profile and in emails."
          key={"name"}
          placeholder="Your name"
        />
        <EditableFormLabel
          form={editMeForm}
          label="Email"
          name="email"
          onSave={() => saveField("email")}
          control={editMeForm.control}
          defaultValue={me?.email}
          description="This is the email that will be associated with your profile. Currently it won't be used for anything."
          key={"email"}
          placeholder="Your email"
        />
        <EditableFormLabel
          form={editMeForm}
          label="Phone"
          name="phoneNumber"
          onSave={() => saveField("phoneNumber")}
          control={editMeForm.control}
          defaultValue={me?.phoneNumber}
          description="This is the phone number that will be associated with your profile. Currently it won't be used for anything."
          key={"phoneNumber"}
          placeholder="Your phone number"
        />

      </form>
    </Form>
  );
};
