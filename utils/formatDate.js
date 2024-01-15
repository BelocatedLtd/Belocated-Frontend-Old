import {format} from 'date-fns'

export const formatDate = (date) => {
    const newDate = new Date(date);

    const formattedDate = format(newDate, 'MMMM dd, yyyy')

    return formattedDate
}