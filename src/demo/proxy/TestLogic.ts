module gamep {
    export class TestLogic extends GameProxyer{
        protected onEnterSecond(e:any){
            console.log(e.count);
        }

        protected onEnter100MillSecond(e:any){
            console.log(e.count);
        }
    }
}