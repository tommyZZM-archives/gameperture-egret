module gamep{
    export class MyGame extends GameCycler {

        public static TESTCOMMAND:string = "TESTCOMMAND";

        protected cmdStartup(data){
            trace('2.MyGame...onReady()..with',data);
            this.proxy(AssetsLoaderProxy).loadAssets('preload');
            this.proxy(AssetsLoaderProxy).debug = true;
            //a$.dispatchBroadcast("testbroadcast");
            //console.log(m$.memory(MTemp).get("test"));
            this.addCmdHandler(MyGame.TESTCOMMAND,this.cmdTest);
        }

        private cmdTest(){
            console.log("cmdTest");
        }

    }
}
