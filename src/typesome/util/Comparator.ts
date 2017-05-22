export interface Comperator<T> {
	(o1: T, o2: T): number;
}