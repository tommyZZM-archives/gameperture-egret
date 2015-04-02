module gamep {
    export module Core {
        export class TickerEvent extends ProxyEvent {

            private _count:number;

            public setflag(_type:any){
                super.setflag(_type+getClassName(this));
            }

            public set conut(count:number){
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