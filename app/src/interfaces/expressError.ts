export interface ExpressError extends Error {
	status?: number;
	message: string;
}
