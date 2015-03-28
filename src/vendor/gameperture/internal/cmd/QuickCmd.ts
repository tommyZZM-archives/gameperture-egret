module gamep {
    export class QuickCmd extends GameCmder {

        public static SET_TIME_CALLBACK:string = "QuickCmd_SET_TIME_OUT";
        public static REMOVE_TIME_CALLBACK:string = "QuickCmd_REMOVE_TIME_CALLBACK";

        public constructor(){
            super();
            this.addCmdHandler(QuickCmd.SET_TIME_CALLBACK,this.addDisposableTimeCallback);
            this.addCmdHandler(QuickCmd.REMOVE_TIME_CALLBACK,this.deDisposableTimeCallback);
        }

        private addDisposableTimeCallback(name:string,second:number,callback:Function,thisArg:any,...para){
            this.proxy(CountTimeProxy).addDisposableTimeCallback(name,second,callback,thisArg,para)
        }

        private deDisposableTimeCallback(name:string){
            this.proxy(CountTimeProxy).deDisposableTimeCallback(name)
        }
    }
}