export const Center: React.FC<React.PropsWithChildren> = ({children}) => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			{children}
		</div>
	);
};
