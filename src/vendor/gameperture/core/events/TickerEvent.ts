module gamep {
    export module Core {
        export class TickerEvent extends ProxyEvent {

            private _count:number;

            public setflag(type:any, count){
                super.setflag(type+"TickerEvent");
                this._count = count;
            }

            public get count():number {
                return this._count
            }
        }
    }
}

module gamep{
    export enum TickerType{
        ON_MILLSECOND100 = 1,
        ON_SECOND      = 2
    }
}