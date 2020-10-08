export class Room {
  constructor (name, size, adultsCapacity, childCapacity, bed, propertyId) {
    this.name = name
    this.size = Number(size)
    this.adultsCapacity = Number(adultsCapacity)
    this.childCapacity = Number(childCapacity)
    this.bed = bed
    this.propertyId = propertyId
  }
}
