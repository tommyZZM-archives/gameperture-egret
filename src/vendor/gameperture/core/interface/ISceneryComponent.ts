module gamep {
    export interface ISceneryComponent {
        dispatchCmd(notify:string, ...courier:any[]);
        addFeedbackListener(notify: string, callback: Function,thisObject: egret.DisplayObject);
    }
}