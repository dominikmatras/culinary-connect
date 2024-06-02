export const throwErrorHandler = (error: any, message: string) => {
  if (error instanceof Error && error.message) {
    console.log(error);
    throw error;
  } else {
    console.log(error);
    throw new Error(message);
  }
}