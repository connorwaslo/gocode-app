import DataStorage from './DataStorage';

export let getTimeSinceOpened = () => {
    const MS_PER_DAY = 1000 * 3600 * 24;

    let today = new Date();
    let strToday = today.getUTCFullYear() + '/' + (today.getUTCMonth() + 1) + '/' + today.getUTCDate();

    let last = new Date(DataStorage.lastDate);
    let current = new Date(strToday);

    return Math.floor((current - last) / MS_PER_DAY);
};