import { CheckIcon, EditIcon, UndoIcon } from "lucide-react";
import { useCallback, useState } from "react";
import {
    type ControllerProps,
    type FieldPath,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type TypedOmit } from "~/types/helpers";

export const EditableFormLabel = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TForm extends UseFormReturn<TFieldValues> = UseFormReturn<TFieldValues>,
>({
    ...props
}: TypedOmit<ControllerProps<TFieldValues, TName>, "render"> & {
    form: TForm;
    label: string;
    description?: string;
    placeholder?: string;
    onSave: () => void;
}) => {
    const [isEditable, setIsEditable] = useState(false);
    const resetField = useCallback(() => {
        setIsEditable(false);
        props.form.resetField(props.name);
    }, [props.form, props.name]);
    const saveChanges = useCallback(() => {
        props.onSave();
        setIsEditable(false);
    }, [props]);


    return (
        <FormField
            control={props.control}
            name={props.name}
            render={({ field }) => {
                if (!isEditable) {
                    return (
                        <div className="flex w-full flex-row gap-2">
                            <Badge variant="secondary">{props.label}</Badge>
                            <span className="w-full">{props.defaultValue}</span>
                            <Button variant={'ghost'} onKeyDown={
                                (e) => {
                                    switch (e.key) {
                                        case "Enter":
                                        case " ":
                                            e.preventDefault()
                                            setIsEditable(true)
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }>

                                <EditIcon
                                    className="h-8 w-8"
                                    onClick={() => setIsEditable(true)}
                                />
                            </Button>
                        </div>
                    );
                }
                return (
                    <FormItem>
                        <FormLabel>{props.label}</FormLabel>
                        <FormControl>
                            <div className="flex flex-row items-center space-x-4">
                                <Input
                                    placeholder={props.placeholder ?? "Type here..."}
                                    {...field}
                                    defaultValue={props.defaultValue}
                                    onKeyDown={(e) => {
                                        switch (e.key) {
                                            case "Enter":
                                                e.preventDefault();
                                                props.onSave();
                                                setIsEditable(false);
                                                return;
                                            case "Escape":
                                                e.preventDefault();
                                                resetField();
                                                return;

                                            default:
                                                break;
                                        }
                                    }}
                                />
                                <Button onClick={saveChanges} variant={'ghost'}>
                                    <CheckIcon />
                                </Button>
                                <Button onClick={resetField} variant={'ghost'}>
                                    <UndoIcon />
                                </Button>
                            </div>
                        </FormControl>
                        <FormDescription>{props.description}</FormDescription>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};
