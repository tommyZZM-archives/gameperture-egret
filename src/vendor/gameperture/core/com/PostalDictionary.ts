/**
 * Created by 2014-11-06 on 2014/11/27.
 */
module gamep{
    export class PostalDictionary extends gamep.utils.Dictionary{
        constructor() {super();}

        public setRoutes(route: { notify: string; callback: Function; }[]){
            var dic:{key: any; value: any;}[] = [];
            for(var i in route){
                var key = route[i].notify;
                var value = route[i].callback;
                dic.push({key:key,value:value});
            }
            if(route && route['length']>0){
                super.setGroup(dic);
            }
        }

        public setRoute(notify:string,callback:Function){
            super.set(notify,callback);
        }
    }
}
