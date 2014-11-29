/**
 * Created by 2014-11-06 on 2014/11/27.
 */
module gp{
    export class RouteDictionary extends gp.util.Dictionary{
        constructor(dic: { key: number; value: Function; }[]) {
            super(dic);
        }

        public get callback(): Function[]{
            return this.values;
        }
    }
}
