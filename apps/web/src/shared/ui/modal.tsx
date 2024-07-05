import {forwardRef} from "react";
import * as RXModal from "@radix-ui/react-dialog";
import {cx} from "class-variance-authority";

import {Icon} from "@shared/ui";

export const Modal = RXModal.Root;
Modal.displayName = "Modal";

export const ModalTrigger = RXModal.Trigger;
ModalTrigger.displayName = "ModalTrigger";

export const ModalPortal = RXModal.Portal;
ModalPortal.displayName = "ModalPortal";

export const ModalClose = RXModal.Close;
ModalClose.displayName = "ModalClose";

export const ModalOverlay = forwardRef<
	React.ElementRef<typeof RXModal.Overlay>,
	React.ComponentPropsWithoutRef<typeof RXModal.Overlay>
>(({className, ...props}, ref) => (
	<RXModal.Overlay
		ref={ref}
		className={cx(
			"fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 !m-0",
			className,
		)}
		{...props}
	/>
));

ModalOverlay.displayName = "ModalOverlay";

interface ModalContentProps
	extends React.ComponentPropsWithoutRef<typeof RXModal.Content> {
	showClose?: boolean;
}

export const ModalContent = forwardRef<
	React.ElementRef<typeof RXModal.Content>,
	ModalContentProps
>(({className, children, showClose, ...props}, ref) => (
	<ModalOverlay>
		<ModalOverlay />

		<RXModal.Content
			ref={ref}
			className={cx(
				"fixed left-[50%] top-[50%] z-50 bg-[#fff] sm:w-[calc(100%-4rem)] grid translate-x-[-50%] translate-y-[-50%] gap-16 border p-24 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg",
				className,
			)}
			{...props}
		>
			{children}

			{showClose && (
				<RXModal.Close className="absolute right-16 top-16 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
					<Icon.Cross className="h-16 w-16" />
					<span className="sr-only">Close</span>
				</RXModal.Close>
			)}
		</RXModal.Content>
	</ModalOverlay>
));

ModalContent.displayName = "ModalContent";

export const ModalHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cx(
			"flex flex-col space-y-6 text-center sm:text-left",
			className,
		)}
		{...props}
	/>
);

ModalHeader.displayName = "ModalHeader";

export const ModalFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cx(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-8",
			className,
		)}
		{...props}
	/>
);

ModalFooter.displayName = "ModalFooter";

export const ModalTitle = forwardRef<
	React.ElementRef<typeof RXModal.Title>,
	React.ComponentPropsWithoutRef<typeof RXModal.Title>
>(({className, ...props}, ref) => (
	<RXModal.Title
		ref={ref}
		className={cx(
			"text-lg font-semibold leading-none tracking-tight",
			className,
		)}
		{...props}
	/>
));

ModalTitle.displayName = "ModalTitle";

export const ModalDescription = forwardRef<
	React.ElementRef<typeof RXModal.Description>,
	React.ComponentPropsWithoutRef<typeof RXModal.Description>
>(({className, ...props}, ref) => (
	<RXModal.Description
		ref={ref}
		className={cx("text-sm text-muted-foreground", className)}
		{...props}
	/>
));

ModalDescription.displayName = "ModalDescription";
