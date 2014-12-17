module gamep.event{
    export class ProfilerEvent extends egret.Event {

        public static ON_SECOND:string = "profiler_onsecond";

        public constructor(type:string) {
            super(type, false , false);
        }
    }

}