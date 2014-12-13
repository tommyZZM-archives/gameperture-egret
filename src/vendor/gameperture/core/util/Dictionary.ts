module gamep.utils {

    /**
     * create by dmck
     * fork by tommy
     * @version 1.0.1t
     */

    export interface IDictionary {

        set(key: string, value: any): void;//设置映射
        remove(key: string): void;//移除映射
        containsKey(key: string): boolean;//是否包括映射
        keys: string[];//获取所有key
        values: any[];//获取所有values
    }

    export class Dictionary implements IDictionary{

        _keys: string[] = [];
        _values: any[] = [];

        constructor(dic?: { key: any; value: any; }[]) {
            if(dic)this.addgroup(dic);
        }

        addgroup(dic: { key: any; value: any; }[]){
            if(dic){
                for (var x = 0; x < dic.length; x++) {
                    this.set(dic[x].key+'',dic[x].value);
                }
            }
        }

        public set(key: string, value: any) {
            if(this[key]){
                this.remove(key);//如果重复把之前的映射先移除
            }
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }

        public remove(key: string) {
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