export type ServerResponse = {
  success: boolean;
  status: number;
  message: string;
  errorMessage: string;
  errors: [];
  data: any;
};
