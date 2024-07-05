import {AxiosRequestConfig} from "axios";

import {apiClient, Dto} from "@shared/api";

type GetPresignedUrlDto = Dto<
	{
		name: string;
		contentType: string;
		contentLength: number;
	},
	{
		url: string;
		key: string;
		fileId: string;
	}
>;

const getPresignedUrl = (req: GetPresignedUrlDto["req"]) =>
	apiClient.get<GetPresignedUrlDto["res"]>("/api/uploads/presigned/put", {
		params: req,
	});

type StoreFileDto = Dto<{
	url: string;
	file: File;
	config?: AxiosRequestConfig<StoreFileDto["res"]>;
}>;

const storeFile = (req: StoreFileDto["req"]) =>
	apiClient.put<StoreFileDto["res"]>(req.url, req.file, req.config);

export type UploadFileDto = Dto<
	{
		file: File;
		config?: AxiosRequestConfig<StoreFileDto["res"]>;
	},
	void
>;

export const uploadFile = async (req: UploadFileDto["req"]) => {
	const {
		data: {url, key, fileId},
	} = await getPresignedUrl({
		name: req.file.name,
		contentType: req.file.type,
		contentLength: req.file.size,
	});

	await storeFile({
		url,
		file: req.file,
		config: req.config,
	});

	return {
		url: `${import.meta.env.VITE_S3_URL}/${key}`,
		fileId,
	};
};
