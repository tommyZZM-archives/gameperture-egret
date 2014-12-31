module gamep{
    export class GameContainer extends egret.DisplayObjectContainer{

        private _componentpool:Map<string,egret.DisplayObject>;

        public constructor() {
            this._componentpool = new Map<string,egret.DisplayObject>();
            super();
            //TODO:your code here
        }

        public addChild(child: egret.DisplayObject):egret.DisplayObject{
            if(child.name){
                super.addChild(child);
                this._componentpool.set(child.name,child);
                return child
            }else{
                console.warn('child must have a name!');
                return null;
            }
        }

        public selectChild(name):any{
            return this._componentpool.get(name);
        }
    }
}
