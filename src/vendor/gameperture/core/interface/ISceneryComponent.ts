module gamep {
    export interface ISceneryComponent {
        dispatchCmd(notify:string, ...courier:any[]);
        //** @deprecated */addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void
        //** @deprecated */dispatchEvent(event: egret.Event):boolean**/
    }
}