module gp{
    export class GameInterface extends egret.DisplayObjectContainer{

        private components:util.Dictionary;

        public constructor() {
            this.components = new util.Dictionary();
            super();
            //TODO:your code here
        }

        public addChild(child: gp.GameUiObject):egret.DisplayObject{
            this.components.add(child.name,child);
            super.addChild(child);
            return child;
        }

        /*public get debug(){
            return this.components;
        }*/

        public select(name):gp.GameUiObject{
            return this.components[name];
        }
    }
}
