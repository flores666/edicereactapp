export type TResponse<TDataType> = {
  data: TDataType | null;
  isSuccess: boolean;
  message: boolean | null;
};
