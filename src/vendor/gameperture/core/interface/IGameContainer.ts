module gamep {
    export interface IGameContainer {
        dispatchCmd(command:any,cmd:string, ...courier:any[])
        addSimpleFeedbackListener(type: string, callback: Function,thisObject: egret.DisplayObject)
        addFeedbackListener(proxy:any,type: string, callback: Function,thisObject: egret.DisplayObject)
    }
}