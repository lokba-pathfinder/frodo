export interface ResponseDataWithMessage<T> {
  data: T;
  message: string;
}

export interface APIResponseData<T> {
  data: T;
  message: string;
  code: string;
}
