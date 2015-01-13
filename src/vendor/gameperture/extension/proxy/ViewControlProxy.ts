module gamep
{
    export class ViewControlProxy extends GameProxyer{
        public dispatchCmdFeedback(type:string, courier?:any){
            super.dispatchEvent(new ViewControlEvent(type,courier))
        }

        public dispatchEvent(event: egret.Event): boolean{return null}
    }

    export class ViewControlEvent extends Event.ProxyEvent{
        public constructor(type:string, courier?:any) {
            super(type,courier);
        }
    }
}