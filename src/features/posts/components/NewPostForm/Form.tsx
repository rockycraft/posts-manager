import { memo } from "react";
import { FormProps } from "@/types/FormProps";
import { Button, HStack, Input } from "@chakra-ui/react";
import { Post } from "@/types/Post";

function Form({ onSubmit, register }: FormProps<Omit<Post, "id">>) {
	return (
		<form role="form" onSubmit={onSubmit}>
			<HStack>
				<Input
					data-testid="name-input"
					placeholder="Nombre"
					type="text"
					{...register("name")}
					variant="subtle"
				/>
				<Input
					data-testid="description-input"
					placeholder="Descripción"
					type="text"
					{...register("description")}
					variant="subtle"
				/>
				<Button data-testid="submit-button" type="submit" colorPalette="blue">
					Crear
				</Button>
			</HStack>
		</form>
	);
}

export default memo(Form);
