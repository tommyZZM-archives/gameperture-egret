module gamep {
    export interface ISceneryComponent {
        dispatchCmd(notify:string, ...courier:any[]);
        addFeedbackListener(proxy:any,feed: string, callback: Function,thisObject: egret.DisplayObject);
    }
}