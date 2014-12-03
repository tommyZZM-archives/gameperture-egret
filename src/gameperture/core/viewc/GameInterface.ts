module gp.viewc{
    export class GameInterface extends egret.DisplayObjectContainer{

        private components:util.Dictionary;

        public constructor() {
            this.components = new util.Dictionary();
            super();
            //TODO:your code here
        }

        public addChild(child: gp.viewc.GameUiObject):egret.DisplayObject{
            this.components.add(child.name,child);
            super.addChild(child);
            return child;
        }

        /*public get debug(){
            return this.components;
        }*/

        public select(name):gp.viewc.GameUiObject{
            return this.components[name];
        }
    }
}
