import {useState} from "react";

import {UploadedFile} from "@entities/file";
import {useUploadFile} from "@features/upload";
import {Branch} from "@shared/lib/branch";
import {Nullable} from "@shared/lib/types";
import {Upload} from "@shared/lib/upload";
import {GradientButton, Icon, Progress} from "@shared/ui";

interface UploadZoneProps
	extends Omit<
		React.ComponentProps<typeof Upload>,
		"onProgress" | "onUpload"
	> {
	onProgress?: (progress: Nullable<number>) => void;
	onUpload?: (file: UploadedFile) => void;
	children?: React.ReactNode;
	fileName?: string;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
	onProgress,
	onUpload,
	children,
	fileName: passedFileName,
	...props
}) => {
	const [progress, setProgress] = useState<Nullable<number>>(null);
	const [fileName, setFileName] = useState<Nullable<string>>(
		passedFileName || null,
	);

	const {uploadFile} = useUploadFile();

	const isUploading = !!progress && progress !== 1;
	const isUploaded = progress === 1;

	return (
		<Upload
			onUpload={(file) => {
				setProgress(0);
				setFileName(file.name);

				uploadFile({
					file,
					config: {
						onUploadProgress: (event) => {
							const progress = event.progress || null;

							setProgress(progress);
							onProgress?.(progress);
						},
					},
				}).then(({url, fileId}) => {
					setProgress(1);

					onUpload?.({
						id: fileId,
						name: file.name,
						url,
					});
				});
			}}
			{...props}
		>
			<div className="bg-[#ECEEF6] min-h-[32rem] p-34 rounded-12 space-y-12 flex flex-col items-center justify-center">
				<h6 className="text-[#3C56DE] font-bold text-24">{children}</h6>

				<Branch if={!!fileName}>
					<span className="inline-flex bg-[#DBE0F4] py-8 px-16 rounded-8">
						<span className="text-[#3C56DE] underline">
							{fileName}
						</span>
					</span>

					<GradientButton type="button" className="shadow-even-md">
						Загрузить
					</GradientButton>
				</Branch>

				{isUploading && (
					<Progress
						value={progress * 100}
						className="w-[60%] mx-auto !mt-32"
					/>
				)}

				{isUploaded && (
					<div className="w-full flex justify-center animate-in fade-in duration-500 !mt-32">
						<Icon.Check className="fill-primary w-24 h-auto" />
					</div>
				)}
			</div>
		</Upload>
	);
};
