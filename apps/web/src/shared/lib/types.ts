export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export interface PropsWithClassName {
	className?: string;
}

export type MaybeObject<T> = {
	[P in keyof T]?: T[P] | undefined | null;
};

export type Icon = React.FC<
	React.SVGProps<SVGSVGElement> & {
		title?: string | undefined;
	}
>;
