class JsonResponse {
  success: boolean;
  statusCode: number;
  data: any;
  message: string;
  constructor(success: boolean = true, statusCode: number = 200, data: any, message: string = "ok") {
    this.success = success;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
  export default JsonResponse;
  