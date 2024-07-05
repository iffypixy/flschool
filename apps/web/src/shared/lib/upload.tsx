import {useRef} from "react";
import {cx} from "class-variance-authority";

interface UploadProps extends React.ComponentProps<"input"> {
	onUpload?: (file: File) => void;
}

export const Upload: React.FC<UploadProps> = ({
	children,
	className,
	onUpload,
	...props
}) => {
	const ref = useRef<HTMLInputElement>(null);

	const clickInput = () => {
		ref.current?.click();
	};

	return (
		<div
			className={cx(
				"inline-block relative cursor-pointer outline-none",
				className,
			)}
			role="button"
			tabIndex={0}
			onClick={() => {
				clickInput();
			}}
			onKeyDown={(event) => {
				const code = "Enter";

				if (event.code === code) {
					clickInput();
				}
			}}
		>
			<input
				{...props}
				onChange={(event) => {
					if (props.onChange) props.onChange(event);

					const files = event.currentTarget.files;

					const validFile = files && files[0];

					if (validFile && onUpload) onUpload(validFile);
				}}
				ref={ref}
				type="file"
				className="hidden"
			/>

			{children}
		</div>
	);
};
