import { memo } from "react";
import { FormProps } from "@/types/FormProps";
import { Button, HStack, Input } from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";

function Form({ onSubmit, register }: FormProps<{ name: string }>) {
	return (
		<form role="form" onSubmit={onSubmit}>
			<HStack>
				<Input
					data-testid="name-search-input"
					placeholder="Nombre"
					type="text"
					{...register("name")}
					variant="subtle"
				/>
				<Button data-testid="submit-button" type="submit" colorPalette="blue">
					<HiMagnifyingGlass />
					Buscar
				</Button>
			</HStack>
		</form>
	);
}

export default memo(Form);
