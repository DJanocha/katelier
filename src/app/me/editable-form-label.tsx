import { CheckIcon, EditIcon, UndoIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { type ControllerProps, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form';
import { Badge } from '~/components/ui/badge';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { type TypedOmit } from '~/types/helpers';

export const EditableFormLabel = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TForm extends UseFormReturn<TFieldValues> = UseFormReturn<TFieldValues>
>({
    ...props
}: TypedOmit<ControllerProps<TFieldValues, TName>, "render"> & {
    form: TForm;
    label: string,
    description?: string
    placeholder?: string
    onSave: () => void
}) => {
    const [isEditable, setIsEditable] = useState(false)
    const resetField = useCallback(() => {
        setIsEditable(false)
        props.form.resetField(props.name)
    }, [props.form, props.name])

    return (
        <FormField
            control={props.control}
            name={props.name}
            render={({ field }) => {
                if (!isEditable) {
                    return <div className="w-full flex flex-row gap-2">
                        <Badge variant="secondary">{props.label}</Badge>
                        <span className="w-full">{props.defaultValue}</span>
                        <EditIcon className="w-8 h-8" onClick={() => setIsEditable(true)} />
                    </div>
                }
                return (
                    <FormItem>
                        <FormLabel>{props.label}</FormLabel>
                        <FormControl>
                            <div className="flex flex-row items-center space-x-4">
                                <Input placeholder={props.placeholder ?? "Type here..."}{...field} defaultValue={props.defaultValue} />
                                <CheckIcon onClick={props.onSave} />
                                <UndoIcon onClick={resetField} />
                            </div>
                        </FormControl>
                        <FormDescription>
                            {props.description}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    );
};