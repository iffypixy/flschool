import React, {forwardRef} from "react";
import * as RXAvatar from "@radix-ui/react-avatar";
import {cx} from "class-variance-authority";
import {Maybe, Nullable} from "@shared/lib/types";

export const Avatar = forwardRef<
    React.ElementRef<typeof RXAvatar.Root>,
    React.ComponentPropsWithoutRef<typeof RXAvatar.Root>
>(({className, ...props}, ref) => (
    <RXAvatar.Root
        ref={ref}
        className={cx(
            "relative flex w-40 h-40 shrink-0 overflow-hidden rounded-full",
            className,
        )}
        {...props}
    />
));

Avatar.displayName = RXAvatar.Root.displayName;

interface AvatarImageProps
    extends Omit<React.ComponentPropsWithoutRef<typeof RXAvatar.Image>, "src"> {
    src: Maybe<string>;
}

export const AvatarImage = forwardRef<
    React.ElementRef<typeof RXAvatar.Image>,
    AvatarImageProps
>(({className, src, ...props}, ref) => (
    <RXAvatar.Image
        ref={ref}
        src={src!}
        className={cx("aspect-square h-full w-full object-cover", className)}
        {...props}
    />
));

AvatarImage.displayName = RXAvatar.Image.displayName;

export const AvatarFallback = forwardRef<
    React.ElementRef<typeof RXAvatar.Fallback>,
    React.ComponentPropsWithoutRef<typeof RXAvatar.Fallback>
>(({className, ...props}, ref) => (
    <RXAvatar.Fallback
        ref={ref}
        className={cx(
            "flex w-full h-full items-center justify-center rounded-full bg-[#c3c3c3]",
            className,
        )}
        {...props}
    />
));

AvatarFallback.displayName = RXAvatar.Fallback.displayName;

interface AvatarWithFallbackProps extends RXAvatar.AvatarProps {
    src?: AvatarImageProps["src"];
    alt?: AvatarImageProps["alt"];
    text?: Nullable<string>;
}

export const AvatarWithFallback: React.FC<AvatarWithFallbackProps> = ({
    src,
    alt,
    text,
    ...props
}) => {
    return (
        <Avatar {...props}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{text}</AvatarFallback>
        </Avatar>
    );
};
