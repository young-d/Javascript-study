export const isInstance = (target, origin) => {
    if ((target instanceof origin)) {
        return true;
    }

    console.error('There is no new operator');
    return false;
}
