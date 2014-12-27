module gamep {
    export class GameScenery extends GameContainer implements ISceneryComponent{

        public constructor(parent:GameStage){
            super();
            parent.addChild(this);
        }

        protected dispatchCmd(cmd:string, ...courier:any[]){
            rootscene.dispatchEvent(new event.FacadeEvent(notify.cmd,cmd,courier));
        }

    }
}