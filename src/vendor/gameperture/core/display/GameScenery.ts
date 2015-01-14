module gamep {
    export class GameScenery extends GameContainer{// implements ISceneryComponent

        public constructor(name:string){
            super();
            this.name = name;
            this.display();
        }

        public onAddToggle(...data){

        }

        protected display(){

        }

        protected setBackground(){

        }
        
        public clear(){this.removeChildren();}
        public hide(...arg):void{this.visible = false;}
        public show(...arg):void{this.visible = true;}

        public removeFromParent(){
            if(this.parent){
                this.parent.removeChild(this);
            }
        }

    }
}