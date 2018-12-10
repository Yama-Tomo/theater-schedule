import { Route } from 'vue-router';
import { Store } from 'vuex';

interface NuxtContext {
  isDev: boolean;
  isHMR: boolean;
  isStatic: boolean;
  route: Route;
  store: Store<any>;
  env: object;
  query: { [key: string]: any };
  nuxtState: object;
  req: Request;
  res: Response;
  params: { [key: string]: any };
  redirect: (path: string) => void;
  error: (params: { statusCode?: number; message?: string }) => void;
  beforeNuxtRender: (arg: { Conmponents: any, nuxtState: any }) => void;
  $axios: NuxtAxiosInstance;
  app: {
    store: Store<any>
  };
}