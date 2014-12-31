module gamep {
    //commander
    export class GameCmder{

        private _name:string;

        public constructor() {
            this._name = this['__proto__']['__class__'];
        }

        public dispatchFeedback(feedback: string, ...courier:any[]):void{//,thisObject: any
            root.dispatchEvent(new Event.FacadeEvent(NotifyType.Feedback,feedback,courier));
        }

        //FIX:添加多个侦听有BUG...
        public addNotifyListener(type:NotifyType,notify: string, callback: Function):void{//,thisObject: any
            GameFacade.instance['_postals'].get(type).set(notify+this.name,{thisobj:this, callback: callback})
        }

        // @final
        // 看我滥用索引...
        protected getLogic(logic:any):any{
            if(!this._logicPool.get(logic.name)){
                this._logicPool.set(logic.name,new logic());
            }
            return this._logicPool.get(logic.name);
        }
        private get _logicPool():Map<string,GameLogicer>{
            return GameFacade.instance['_logicpool']
        }

        public get name(){
            return this._name;
        }
    }
}