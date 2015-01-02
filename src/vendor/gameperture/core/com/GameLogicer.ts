module gamep {
    /**
     * 游戏逻辑业务,具备获得场景中的物体的能力!
     */
    class GameLogicer extends GameProxyer{
        protected getObject(scenery:string,obj:string):any{
            return GameFacade.instance['_display'].selectChild(scenery).selectChild(obj);
        }
    }
}