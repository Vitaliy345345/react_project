export const isTimeLeft = (targetDate: Date, currentDate: Date): boolean => {
    if(targetDate <= currentDate) {
        return true
    }
    return false
}