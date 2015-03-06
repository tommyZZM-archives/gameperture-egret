module gamep
{
    export class BroadcastProxy extends GameProxyer{
        public dispatchCmdFeedback(type:string, courier?:any){
            super.dispatchEvent(new BroadcastEvent(type,courier))
        }

        public dispatchEvent(event: egret.Event): boolean{return null}
    }
}