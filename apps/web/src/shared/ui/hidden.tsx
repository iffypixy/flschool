import * as RXVisuallyHidden from "@radix-ui/react-visually-hidden";

export const Hidden: React.FC<React.PropsWithChildren> = ({children}) => {
	return <RXVisuallyHidden.Root>{children}</RXVisuallyHidden.Root>;
};
