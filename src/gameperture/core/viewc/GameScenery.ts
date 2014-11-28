class GameScenery extends egret.DisplayObjectContainer{

    public constructor() {
        super();
        //TODO:your code here
    }

    public clear(){
        this.removeChildren();
    }

    public hide(){
        this.visible = false;
    }

    public get tween(){
        return egret.Tween.get(this);
    }

}