export default{
    getDates(dayIn, dayOut) {
        return new Date(dayOut).getDate() - new Date(dayIn).getDate();
    },
    minCheckIn(val) {
        const dayIn = new Date(val)
        const endDate = new Date(dayIn.getFullYear(), dayIn.getMonth(), dayIn.getDate())
        return endDate.toISOString().slice(0, 10)
    },
    minCheckOut (val) {
        const dayOut = new Date(val)
        const endDate = new Date(dayOut.getFullYear(), dayOut.getMonth(), dayOut.getDate() + 3)
        return endDate.toISOString().slice(0, 10)
    },
    isoDate (val) {
        return new Date(val).toISOString().slice(0, 10)
    },
    utcDates(val) {
        return new Date(val).toUTCString().substr(0,16)
    }
}
