class MyGameDisplay extends gamep.GameStage{

    protected onReady(){
        console.log('1.MyGameDisplay....onReady()');
        this.addFeedbackListener('hellofeedback',this.onHello);
    }

    protected onHello(){
        console.log('5.MyGameDisplay....onHello()')
    }
}