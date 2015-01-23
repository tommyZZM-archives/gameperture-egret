module gamep {
    //commander
    export class GameCmder{

        private _name:string;

        public constructor() {
            this._name = this['__proto__']['__class__'];
            this._name = /\.?(\w+)$/.exec(this.name)[1];
        }

        //FIX:添加多个侦听有BUG...
        public addCmdHandler(notify: string, callback: Function):void{//,thisObject: any
            //console.log("addCmdHandler..",notify+this.name,notify+getClassName(this))
            GameFacade.instance['_postals'].get(NotifyType.Cmd).set(notify+getClassName(this),{thisobj:this, callback: callback})
        }

        public dispatchSimpleFeedback(type:string, courier?:any){
            GameFacade.instance['getProxy'](SimpleFeedbackProxy).dispatchCmdFeedback(type,courier);
        }

        public dispatchTargetFeedback(type:string, courier?:any){
            if(getClassName(this)) {
                type = getClassName(this) + type;
                GameFacade.instance['getProxy'](SimpleFeedbackProxy).dispatchCmdFeedback(type,courier);
            }
        }

        // @final
        // 看我滥用索引...
        protected getProxy(proxy:any):any{
            if(proxy.prototype['__class__']==SimpleFeedbackProxy.prototype['__class__'])return;
            return GameFacade.instance['getProxy'](proxy);
        }

        public get name(){
            return this._name;
        }
    }
}