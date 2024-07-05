export const Container: React.FC<React.PropsWithChildren> = ({children}) => {
	return (
		<div className="max-w-[1280px] w-full mx-auto lg:px-36 md:px-32 sm:px-28 xs:px-16">
			{children}
		</div>
	);
};
