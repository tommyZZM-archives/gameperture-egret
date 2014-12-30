class MyGameDisplay extends gamep.GameStage{

    protected onReady(){
        console.log('MyGameDisplay....onReady()');
        this.addCmdFeedback('hellofeedback',this.onHello);
    }

    protected onHello(){
        console.log('MyGameDisplay....onHello()')
    }
}