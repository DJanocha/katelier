"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, EditIcon, UndoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "~/components/ui/badge";
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
import { updateMeValidator, type UpdateMe } from "~/validators/update-me";

type UpdateMeKey = keyof UpdateMe;

export const EditMeForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const apiUtils = api.useUtils();
  const { data } = api.me.getMe.useQuery();
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
  const [editableFields, setEditableFields] = useState<UpdateMeKey[]>([])
  const makeFieldEditable = useCallback((key: UpdateMeKey) => {
    if (editableFields.includes(key)) { return }
    setEditableFields(prev => [...prev, key])
  }, [editableFields])

  const saveField = useCallback(async (key: UpdateMeKey) => {
    if (!editableFields.includes(key)) { return }
    const fieldValidationResult = updateMeValidator.shape[key].safeParse(editMeForm.getValues()[key])
    if (!fieldValidationResult.success) {
      await editMeForm.trigger(key)
      return
    }
    setEditableFields(prev => prev.filter(k => k !== key))
    updateMe({ [key]: fieldValidationResult.data })
  }, [editMeForm, editableFields, updateMe])

  const resetField = useCallback((key: UpdateMeKey) => {
    if (!editableFields.includes(key)) { return }
    editMeForm.setValue(key, data?.me[key])
    editMeForm.clearErrors(key)
    setEditableFields(prev => prev.filter(k => k !== key))
  }, [data?.me, editMeForm, editableFields])

  const updateFormValues = useCallback(
    (vals: unknown) => {
      const updatableFieldsValidationResult = updateMeValidator.safeParse(vals);
      if (!updatableFieldsValidationResult.success) {
        return;
      }
      const newMe = updatableFieldsValidationResult.data;
      objectKeys(newMe).forEach((key) => {
        editMeForm.setValue(key, newMe[key]);
      });
    },
    [editMeForm],
  );

  useEffect(() => {
    try {
      const newMe = updateMeValidator.parse(data?.me);
      objectKeys(newMe).forEach((key) => {
        editMeForm.setValue(key, newMe[key]);
      });
    } catch (error) { }
    updateFormValues(data?.me);
  }, [data?.me, editMeForm, updateFormValues]);

  return (
    <Form {...editMeForm}>
      <form
        className="space-y-8 pt-8"
      >
        <FormField
          control={editMeForm.control}
          name="name"
          render={({ field }) => {
            if (!editableFields.includes(field.name)) {
              return <div className="w-full flex flex-row gap-2">
                <Badge variant="secondary">{field.name}</Badge>
                <span className="w-full">{data?.me?.[field.name]}</span>
                <EditIcon className="w-8 h-8" onClick={() => makeFieldEditable(field.name)} />
              </div>
            }
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className="flex flex-row items-center space-x-4">
                    <Input placeholder="Your name" {...field} />
                    <CheckIcon onClick={() => saveField(field.name)} />
                    <UndoIcon onClick={() => resetField(field.name)} />
                  </div>
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on your profile and in
                  emails.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={editMeForm.control}
          name="email"
          render={({ field }) => {
            if (!editableFields.includes(field.name)) {
              return <div className="w-full flex flex-row gap-2">
                <Badge variant="secondary">{field.name}</Badge>
                <span className="w-full">{data?.me?.[field.name]}</span>
                <EditIcon className="w-8 h-8" onClick={() => makeFieldEditable(field.name)} />
              </div>
            }
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex flex-row items-center space-x-4">
                    <Input placeholder="Your email" type="email" {...field} />
                    <CheckIcon onClick={() => saveField(field.name)} />
                    <UndoIcon onClick={() => resetField(field.name)} />
                  </div>
                </FormControl>
                <FormDescription>
                  This is the email that will be associated with your profile.
                  Currently it won&apos;t be used for anything.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={editMeForm.control}
          name="phoneNumber"
          render={({ field }) => {
            if (!editableFields.includes(field.name)) {
              return <div className="w-full flex flex-row gap-2">
                <Badge variant="secondary">{field.name}</Badge>
                <span className="w-full">{data?.me?.[field.name]}</span>
                <EditIcon className="w-8 h-8" onClick={() => makeFieldEditable(field.name)} />
              </div>
            }
            return (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <div className="flex flex-row items-center space-x-4">
                    <Input placeholder="Your phone numberemail" {...field} />
                    <CheckIcon onClick={() => saveField(field.name)} />
                    <UndoIcon onClick={() => resetField(field.name)} />
                  </div>
                </FormControl>
                <FormDescription>
                  This is the phone number that will be associated with your
                  profile. Currently it won&apos;t be used for anything.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </form>
    </Form>
  );
};
