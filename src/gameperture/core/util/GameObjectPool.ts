module gp.util {
    export class ObjectPool{
        constructor() {}
        private _pool = {};
        private _list:Array<any> = [];

        public createObject(classFactory:any,params?: any):GameSprite {
            var result;
            var key = classFactory.name;
            if(key == 'undefined'){
                return null;
            }
            var arr = this._pool[key];
            if (arr != null && arr.length) {
                result = arr.shift();
            }
            else {
                result = new classFactory(params);
                result.name = key;
            }
            result.onCreate();
            this._list.push(result);
            return result;
        }

        public destroyObject(obj:GameSprite) {
            var key = obj.name;
            if (this._pool[key] == null) {
                this._pool[key] = [];
            }
            this._pool[key].push(obj);
            obj.onDestroy();
            var index = this._list.indexOf(obj);
            if (index != -1) {
                this._list.splice(index, 1);
            }
        }

        private static instance:ObjectPool;
        public static getInstance():ObjectPool {
            if (ObjectPool.instance == null) {
                ObjectPool.instance = new ObjectPool();
            }
            return ObjectPool.instance;
        }
    }
}
