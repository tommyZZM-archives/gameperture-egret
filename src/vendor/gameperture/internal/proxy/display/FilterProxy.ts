module gamep {
    export class FilterProxy extends GameProxyer {

        public constructor(){
            super();
            this.applyGlobalFilter((imagedata)=>{return imagedata})
        }

        private _filter:Function;
        public applyGlobalFilter(fn:(imagedata:ImageData)=>ImageData){
            this._filter = fn;
        }

        public get filter():Function{
            return this._filter
        }
    }
}