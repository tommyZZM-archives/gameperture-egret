/**
 * Created by 2014-11-06 on 2014/11/27.
 */
module gp{
    export class RouteDictionary extends gp.util.Dictionary{
        constructor(route: { statu: number; circler: Function;surface: Function; }[]) {
            var dic:{key: any; value: any;}[] = [];
            for(var i in route){
                var key = route[i].statu;
                var value = {circler:route[i].circler,surface:route[i].surface};
                dic.push({key:key,value:value});
            }
            super(dic);
        }



        public get callback(): Function[]{
            return this.values;
        }

        addroutes(route: { statu: number; circler: Function;surface: Function; }[]){
            if(route){
                var dic:{key: any; value: any;}[] = [];
                for(var i in route){
                    var key = route[i].statu;
                    var value = {circler:route[i].circler,surface:route[i].surface};
                    dic.push({key:key,value:value});
                }
                this.addgroup(dic);
            }
        }


    }
}
