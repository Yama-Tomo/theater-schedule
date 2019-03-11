import Vue from 'vue';
import { Route } from 'vue-router';
import { Context as OrgContext } from '@nuxt/vue-app/types';

export namespace Nuxt {
  export interface Context extends OrgContext {
    app: Vue & {
      getRouteBaseName(route: Route): string;
    };
  }

  export interface Error {
    statusCode: number;
    path: string;
    message: string;
  }
}