import {Button, Icon, Modal, ModalContent, ModalTrigger} from "@shared/ui";

import qr from "@shared/assets/qr.png";

export const PaymentModal: React.FC<React.PropsWithChildren> = ({children}) => {
	return (
		<Modal>
			<ModalTrigger>{children}</ModalTrigger>

			<ModalContent
				showClose
				className="max-w-[62rem] w-full flex flex-col space-y-44"
			>
				<div className="flex flex-col space-y-4">
					<h3 className="text-48 font-bold leading-[0.8em] xs:text-56">
						Оплата
					</h3>

					<span className="text-24 xs:text-26">
						Курсы Freelance teens
					</span>
				</div>

				<img
					src={qr}
					alt="QR-картинка"
					className="max-w-full max-h-[32rem] mx-auto"
				/>

				<div className="flex flex-col space-y-8">
					<Button className="xs:!text-26 py-12 !text-20">
						Перейти к оплате
					</Button>

					<Button
						color="secondary"
						className="xs:!text-26 py-12 !text-20 text-[#03B50A] xs:space-x-6 border-[#03B50A] space-x-8 text-center flex justify-center items-center"
					>
						<Icon.Social.Whatsapp className="xs:w-38 fill-[#03B50A] w-28 h-auto" />

						<span>Отправить чек</span>
					</Button>
				</div>
			</ModalContent>
		</Modal>
	);
};
