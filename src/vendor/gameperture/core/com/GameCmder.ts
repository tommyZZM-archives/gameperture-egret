module gamep {
    //commander
    export class GameCmder{

        private _name:string;

        public constructor(name) {
            this._name = name;
            this._regLogics();
        }

        protected regLogics():GameLogicer[]{
            return null;
        }

        public dispatchFeedback(feedback: string, ...courier:any[]):void{//,thisObject: any
            root.dispatchEvent(new Event.FacadeEvent(NotifyType.Feedback,feedback,courier));
        }

        public addNotifyListener(type:NotifyType,notify: string, callback: Function):void{//,thisObject: any
            GameFacade.instance['_postals'].get(type).set(notify,{thisobj:this, callback: callback})
        }

        // @final
        // 看我滥用索引...
        /*protected getView(name?:string):any{
            return name?GameFacade.instance['_display'].selectChild(name):GameFacade.instance['_display'];
        }*/
        protected getLogic(name:string):any{
            return this._logicPool.get(name);
        }
        private get _logicPool():Map<string,GameLogicer>{
            return GameFacade.instance['_logicpool']
        }
        protected _regLogics(){
            for(var i in this.regLogics()){
                var logic = (this.regLogics())[i];
                if(logic)this._logicPool.set(logic.name,logic);
            }
        }

        public get name(){
            return this._name;
        }
    }
}