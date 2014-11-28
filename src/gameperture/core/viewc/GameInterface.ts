class GameInterface extends egret.DisplayObjectContainer{

    private components:Dictionary;

    public constructor() {
        this.components = new Dictionary();
        super();
        //TODO:your code here
    }

    public addChild(child: UiComponentBase):egret.DisplayObject{
        this.components.add(child.name,child);
        super.addChild(child);
        return child;
    }

    public select(name):UiComponentBase{
        return this.components[name];
    }

}