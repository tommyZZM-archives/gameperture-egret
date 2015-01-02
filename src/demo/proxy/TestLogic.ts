module gamep {
    export class TestLogic extends GameLogicer{
        protected onEnterSecond(e:any){
            console.log(e.count);
        }
    }
}