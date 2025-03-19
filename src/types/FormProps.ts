import { FormEventHandler } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export type FormProps<T extends FieldValues> = {
	onSubmit: FormEventHandler<HTMLFormElement>;
	register: UseFormRegister<T>;
};
