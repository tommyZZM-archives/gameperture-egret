class MyGame extends gamep.GameCycler {

    protected regCommands():gamep.GameCmder[]{
        return null;
    }

    protected regLogics():gamep.GameLogicer[]{
        return [
            new MyLogic('mylogic')
        ];
    }

    protected onReady(){
        console.log('MyGame...onReady()');
        this.addNotifyListener(gamep.NotifyType.Result,'hellocalbck',this.hellocallback)
        this.getLogic('mylogic').hellocallback()
    }

    private hellocallback(hi){
        console.log('MyGame...hellocallback(hi) hi='+hi);
        this.dispatchFeedback('hellofeedback')
    }


}