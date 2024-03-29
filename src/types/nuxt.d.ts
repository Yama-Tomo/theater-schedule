import Vue from 'vue';
import type { Route } from 'vue-router';
import { Context as OrgContext } from '@nuxt/types';

export namespace Nuxt {
  export interface Context extends OrgContext {
    app: Vue & {
      getRouteBaseName(route: Route): string;
    };
  }
}
