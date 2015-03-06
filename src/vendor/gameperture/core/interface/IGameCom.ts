module gamep {
    export interface IGameCom{
        addDemandListener(type: string, callback: Function,thisObject: egret.DisplayObject)
    }
}