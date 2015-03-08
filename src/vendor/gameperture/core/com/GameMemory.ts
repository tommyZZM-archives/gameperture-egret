//16g超大内存
module gamep {
    //@abstract
    /**
     * beta
     */
    export class GameMemory{
        private _memorypool:Dict;

        public constructor(){
            this._memorypool = new Dict();
            //this.active(new MError());
        }

        public active(memory:IMemory){
            if(!this._memorypool.has(getClassName(memory))){
                this._memorypool.set(getClassName(memory),memory)
            }else{
                warn(getClassName(memory),"already active",this._memorypool.get(getClassName(memory)));
            }
        }

        public memory(memory:any):any{
            var m = this._memorypool.get(getClassName(memory));
            if(!m){
                warn("Memory NOT FOUND!");
            }
            return m;
        }

        public reset(memory:any):any{
            var m:IMemory = this._memorypool.get(getClassName(memory));
            m.reset();
        }

        private static _instance:GameMemory;
        public static get instance():GameMemory{
            if (this._instance == null) {
                this._instance = new GameMemory();
            }
            //if(this._instance['_game'] && this._instance['_display']){this._instance['_isinit'] = true;}
            return this._instance;
        }
    }

    export interface IMemory{
        init(...arg);
        reset();
    }

    //export class MError implements IMemory{
    //    init(...arg){}
    //    reset(){}
    //}

    export class MTemp implements IMemory,IDict{
        private _temppool:Dict;

        public constructor(){
            this._temppool = new Dict();
        }

        init(...arg){}

        public set(key:string,value){
            this._temppool.set(key,value)
        }

        public get(key:string){
            return this._temppool.get(key);
        }

        public delete(key:string){
            this._temppool.delete(key);
        }

        public reset(){
            this._temppool.clear();
        }
    }
}