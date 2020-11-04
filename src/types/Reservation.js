export class Reservation{
    constructor(object) {
        this.propertyId = object.propertyId || object.pId;
        this.CheckInDate = object.CheckInDate || object.from;
        this.CheckOutdate = object.CheckOutdate || object.to;
        this.adults = object.adults;
        this.children = object.children;
        this.roomDtos = object.roomDtos || [];
    }
}