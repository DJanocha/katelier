import { CheckIcon, EditIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "~/components/ui/button";
import { Label, labelVariants } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export type EditableLabelProps = {
    defaultValue: string;
    onSave: (value: string) => void;
    label: string
    isLabelCompact?: boolean;
    component?: "Textarea" | "Input"
};
export const EditableLabel = ({ defaultValue, onSave, label, component = "Input", isLabelCompact = false }: EditableLabelProps) => {
    const [isEditable, setIsEditable] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const resetField = useCallback(() => {
        setValue(defaultValue);
        setIsEditable(false);
    }, [defaultValue]);
    const saveChanges = useCallback(() => {
        onSave(value ?? defaultValue);
        setIsEditable(false);
    }, [defaultValue, onSave, value]);


    if (!isEditable && isLabelCompact) {
        return (
            <div className="flex flex-col gap-1.5">
                <Label
                    onClick={() => {
                        setIsEditable(true);
                    }}
                    className={labelVariants({ className: 'text-start justify-start px-2 backdrop-blur-xl truncate' })}

                    onKeyDown={(e) => {
                        if (e.shiftKey) { return }
                        switch (e.key) {
                            case "Enter":
                            case " ":
                                e.preventDefault();
                                setIsEditable(true);
                                break;
                            default:
                                break;
                        }
                    }}
                >{defaultValue}
                </Label>

            </div>
        );
    }
    if (!isEditable) {
        return (
            <div className="flex flex-col gap-1.5">
                <div className="flex flex-row justify-between gap-2">
                    <div className="flex flex-col gap-1.5">
                        <Label>{label}</Label>
                        <Label className="whitespace-pre-wrap flex-1 text-muted-foreground" >{defaultValue ?? '---'}</Label>
                    </div>
                    <Button
                        variant={"ghost"}
                        size="icon"
                        onKeyDown={(e) => {
                            if (e.shiftKey) { return }
                            switch (e.key) {
                                case "Enter":
                                case " ":
                                    e.preventDefault();
                                    setIsEditable(true);
                                    break;
                                default:
                                    break;
                            }
                        }}
                    >
                        <EditIcon className="h-8 w-8" onClick={() => setIsEditable(true)} />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-row items-center space-x-4">
            {component === "Textarea" ? (
                <Textarea
                    value={value}
                    onChange={(e) => {
                        setValue(e.currentTarget.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.shiftKey) { return }
                        switch (e.key) {
                            case "Enter":
                                e.preventDefault();
                                saveChanges();

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

            ) : <Input
                value={value}
                onChange={(e) => {
                    setValue(e.currentTarget.value);
                }}
                onKeyDown={(e) => {
                    if (e.shiftKey) { return }
                    switch (e.key) {
                        case "Enter":
                            e.preventDefault();
                            saveChanges();

                            return;
                        case "Escape":
                            e.preventDefault();
                            resetField();
                            return;

                        default:
                            break;
                    }
                }}
            />}
            <div className={cn("flex ", component === "Textarea" && "flex-col ")}>
                <Button onClick={saveChanges} variant={"ghost"}>
                    <CheckIcon />
                </Button>
                <Button onClick={resetField} variant={"ghost"}>
                    <XIcon />
                </Button>
            </div>
        </div>
    );
};
