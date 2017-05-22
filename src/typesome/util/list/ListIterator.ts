import { Iterator } from "../Iterator";

export interface ListIterator<T> extends Iterator<T>{
	previous(): T;
	hasPrevious(): boolean;
	nextIndex(): number;
	previousIndex(): number;
};