module gamep {
    //commander
    export class GameCmder{

        private _name:string;

        public constructor() {
            this._name = this['__proto__']['__class__'];
            this._name = /\.?(\w+)$/.exec(this.name)[1];
        }

        //FIX:添加多个侦听有BUG...
        public addNotifyListener(notify: string, callback: Function):void{//,thisObject: any
            GameFacade.instance['_postals'].get(NotifyType.Cmd).set(notify+this.name,{thisobj:this, callback: callback})
        }

        // @final
        // 看我滥用索引...
        protected getProxy(proxy:any):any{
            return GameFacade.instance['getProxy'](proxy);
        }

        public get name(){
            return this._name;
        }
    }
}