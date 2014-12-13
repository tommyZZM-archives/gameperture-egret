module gamep {
    export class GameFacade{
        
        private _dispatcher:egret.EventDispatcher;

        public constructor() {
            super();
            this._dispatcher = new egret.DisplayObject();
        }

        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number){
            this._dispatcher.addEventListener(type,listener,thisObject,useCapture,priority)
        }

        public removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean){
            this._dispatcher.removeEventListener(type,listener,thisObject,useCapture)
        }

        //instance mode
        private static _instance:GameFacade;
        public static get instance():GameFacade{
            if (this._instance == null) {
                this._instance = new GameFacade();
            }
            return this._instance;
        }
    }
}