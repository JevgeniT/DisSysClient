import currency from "currency.js";

export class Reservation{
    constructor(object) {
        this.propertyId = object.propertyId || object.pId;
        this.checkInDate = object.checkInDate || object.from;
        this.checkOutDate = object.checkOutDate || object.to;
        this.adults = object.adults;
        this.children = object.children;
        this.arrivalTime = object.arrivalTime;
        this.message  = object.message;
        this.roomDtos = object.roomDtos.map(e=> {
            let obj =  {
                roomId: e.room.id,
                policyId: e.policy.id,
                roomTotalPrice : currency(e.roomTotalPrice),
                guestFirstLastName: e.guestFirstLastName,
                bedType: e.bedType
            }
            return obj;
        })
    }

}

export class ReservationDto{ // for transferring between views
    constructor(object) {
        this.propertyId = object.propertyId || object.pId;
        this.checkInDate = object.checkInDate || object.from;
        this.checkOutDate = object.checkOutDate || object.to;
        this.adults = object.adults;
        this.children = object.children;
        this.property = object.property
        this.roomDtos = this.filterRooms(object.roomDtos)
    }
    filterRooms(rooms){
        if (rooms != null) {
            return rooms.filter(r=> r !== null) || [].filter(r=> r !== null)
        }
        return []
    }
}