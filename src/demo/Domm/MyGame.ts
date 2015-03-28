module game.Domm{
    /**
     * 可用，正确
     * 健壮，容错
     * 可修改(包括可维护、可扩展，结构重组、可移植)
     */
    export class MyGame extends gamep.GameCycler {

        protected cmdStartup(data){
            trace("Dom test");
            trace('2.MyGame...onReady()..with',data);
            this.proxy(gamep.AssetsLoaderProxy).loadAssets('preload');
            this.proxy(gamep.AssetsLoaderProxy).debug = true;

            //gamep.d$.query("<div class='test'></div>");
            gamep.d$.query("#test");

            //console.log(gamep.d$.query("div").node);
            //gamep.GIDomUi.instance.active();
            //gamep.d$.query("img")
        }

    }
}
