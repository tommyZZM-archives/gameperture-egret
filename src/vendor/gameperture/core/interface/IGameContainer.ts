module gamep {
    export interface IGameContainer {
        dispatchCmd(command:any, cmd:string, ...courier:any[])
        addBroadcastListener(type:string, callback:Function, thisObject:egret.DisplayObject)
        addProxyListener(proxy:any, type:string, callback:Function, thisObject:egret.DisplayObject)
        addDemandListener(command:Function, type:string, callback:Function, thisObject:egret.DisplayObject)
    }
}