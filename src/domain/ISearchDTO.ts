class ISearchDTO {
   private _from: Date;
   private _to: Date;
   private _adults: number;
   private _child: number;
   private _childAge: number;

   constructor(from: Date, to: Date, adults: number, child: number, childAge: number) {
       this._from = from;
       this._to = to;
       this._adults = adults;
       this._child = child;
       this._childAge = childAge;
   }

   set from(value: Date) {
       this._from = value;
   }

   set to(value: Date) {
       this._to = value;
   }

   set adults(value: number) {
       this._adults = value;
   }

   set child(value: number) {
       this._child = value;
   }

   set childAge(value: number) {
       this._childAge = value;
   }
}
