export function isNull(val){
    if (val === null || val === undefined) {
        return true;
    }
    return false;
}
export function isNullStr(val){
    if(isNull(val) || val === ''){
        return true;
    }
    return false;
}