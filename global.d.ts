import 'axios'

export {}

declare module 'axios' {
  export interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    requestKey?: string;
  }
}
