module gamep
{
    export class SimpleFeedbackProxy extends GameProxyer{
        public dispatchCmdFeedback(type:string, courier?:any){
            super.dispatchEvent(new SimpleFeedbackEvent(type,courier))
        }

        public dispatchEvent(event: egret.Event): boolean{return null}
    }
}