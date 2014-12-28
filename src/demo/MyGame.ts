class MyGame extends gamep.GameCycler {

    protected regCommands():gamep.GameCmder[]{
        return null;
    }

    protected cmdRoutes():{ notify: string; callback: Function; }[]{
        return null;
    }

    protected regLogics():gamep.GameLogicer[]{
        return [
            new MyLogic('mylogic')
        ];
    }

    protected onReady(){
        console.log('MyGame...onReady()');
        this.getLogic('mylogic').hellocallback()
    }


}