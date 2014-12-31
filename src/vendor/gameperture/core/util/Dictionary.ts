module gamep.utils {

    /**
     * create by dmck
     * fork by tommy
     * @version 1.0.1t
     */

    export interface IDictionary {

        set(key: string, value: any): void;//设置映射
        delete(key: string): void;//移除映射
        containsKey(key: string): boolean;//是否包括映射
        keys: string[];//获取所有key
        values: any[];//获取所有values
    }

    export class Dictionary implements IDictionary{

        _keys: string[] = [];
        _values: any[] = [];

        constructor(dic?: { key: any; value: any; }[]) {
            if(dic)this.setGroup(dic);
        }

        public setGroup(dic: { key: any; value: any; }[]){
            if(dic){
                for (var x = 0; x < dic.length; x++) {
                    this.set(dic[x].key+'',dic[x].value);
                }
            }
        }

        public get(key: string) {
            return this[key];
        }

        public set(key: string, value: any,__hard:boolean=false) {
            if(this[key]){
                if(!__hard){console.warn(key+' has already valued!try to remove hard!');return;}
                this.delete(key);//如果重复把之前的映射先移除
            }
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }

        public delete(key: string) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);

            delete this[key];
        }

        public get keys(): string[] {
            return this._keys;
        }

        public get numkeys():number{
            return this._keys.length;
        }

        public get values(): any[] {
            return this._values;
        }

        containsKey(key: string) {
            return typeof this[key] !== "undefined";
        }

        public get toLookup(): IDictionary {
            return this;
        }
    }
}