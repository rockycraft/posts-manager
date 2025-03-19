import { Center, Text } from "@chakra-ui/react";
import { memo } from "react";

function NoDataMessage() {
	return (
		<Center>
			<Text data-testid="no-data-message" textStyle="2xl" fontWeight="bold">
				No hay posts para mostrar
			</Text>
		</Center>
	);
}

export default memo(NoDataMessage);
