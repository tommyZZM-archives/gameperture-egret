class MyGameDisplay extends gamep.GameStage{

    protected callRoutes():{ notify: string; displayobj:egret.DisplayObject; callback: Function; }[]{
        return [
            {notify: 'hellocalbck',displayobj:this, callback:this.hellocallback}
        ];
    }

    protected onReady(){
        console.log('MyGameDisplay....onReady()')
    }

    private hellocallback(hi){
        console.log('MyGameDisplay...hellocallback(hi) hi='+hi)
    }
}