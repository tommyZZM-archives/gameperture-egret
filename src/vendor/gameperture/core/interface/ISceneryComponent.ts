module gamep {
    export interface ISceneryComponent {
        dispatchCmd(notify:string, ...courier:any[]);
        addFeedbackListener(notify: string, callback: Function,thisObject: egret.DisplayObject);
        //** @deprecated */addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void
        //** @deprecated */dispatchEvent(event: egret.Event):boolean**/
    }
}