module gamep {
    //model
    export class GameProxyer extends egret.EventDispatcher{

        private _name:string;

        public constructor() {
            super();
            this._name = this['__proto__']['__class__'];
            this._name = /\.?(\w+)$/.exec(this.name)[1];
            //super();
        }

        public get name(){
            return this._name;
        }

        private addFeedbackListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number){
            super.addEventListener(type,listener,thisObject,useCapture,priority);
        }

        /** @deprecated */
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{}

        /*public destory(){
            GameFacade.instance['logoffCom'](GameFacade.instance['_proxypool'],this);
        }*/

    }
}