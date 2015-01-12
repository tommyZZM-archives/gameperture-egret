/**
 * IProtected专门用于解决IDEA对于protected的提示问题
 * 禁止export!
 */
module gamep {
    class WebSocketProxy {
        public onConnect(e:egret.Event):void {}
        public onData(e:egret.Event):void {}
        public send(data:any):void {}
        public close():void {}
    }
}