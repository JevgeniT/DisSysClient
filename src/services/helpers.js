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
        return new Date(val).toDateString()
    },
    monthAndDay(f, t) {
        if (new Date(f).getFullYear() === new Date(t).getFullYear()){
            return this.utcDates(f).slice(0,10) + ' - ' + this.utcDates(t)
        }
        return this.utcDates(f) + '-' + this.utcDates(t)
    },
    getScore (value) {
        const scoreMap = new Map([[6, 'Pleasant'], [7, 'Good'], [8, 'Very good'], [9, 'Wonderful']])
        return scoreMap.get(Math.round(value))
    }
}
