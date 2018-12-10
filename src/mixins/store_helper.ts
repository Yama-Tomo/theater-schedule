import { Vue } from 'nuxt-property-decorator';
import { Store } from 'vuex';
import { Mixin } from 'vue-mixin-decorator';
import { StateMaps, ActionMaps } from '../module_mapper';

export type Actions<A> = {
  [K in keyof A]: (payload: A[K]) => Promise<any> | void
};

export class StoreHelper {
  public static getState<K extends keyof StateMaps>(store: Store<any>, module: K): StateMaps[K] {
    return store.state[module];
  }

  public static getActions<K extends keyof ActionMaps>(store: Store<any>, module: K): Actions<ActionMaps[K]> {
    return Object.keys((store as any)._actions).reduce((actions: any, name: string) => {
      const namespacePaths = name.split('/');

      if (namespacePaths.length === 1) {
        actions[name] = (payload: any) => store.dispatch(name, payload);
      } else {
        if (module !== namespacePaths[0]) {
           return actions;
        }
        actions[namespacePaths[1]] = (payload: any) => store.dispatch(name, payload);
      }

      return actions;
    }, {});
  }
}

/**
 * vuexがinjectするストアからstate, actionを型付けしつつ返します
 * componentがストアに依存しないよう全てのコンポーネントでこのmixinを使用せずに
 * container componentでの使用にとどめ，propsでstate, actionを渡す実装がよいでしょう
 */
// TODO: https://github.com/vuejs/vue-class-component/issues/294 が解決するまで tsconfigに "strictFunctionTypes": false を設定しておく
@Mixin
export class StoreHelperMixin extends Vue {
  public getState<K extends keyof StateMaps>(module: K): StateMaps[K] {
    return StoreHelper.getState(this.$store, module);
  }

  public getActions<K extends keyof ActionMaps>(module: K): Actions<ActionMaps[K]> {
    return StoreHelper.getActions(this.$store, module);
  }
}
