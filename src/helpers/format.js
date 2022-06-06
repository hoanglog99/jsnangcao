export const formatMoney = (money) =>{
    return money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});;
}

export const formatStatus = (status) =>{
    if(status) return 'hiện'
    return 'ẩn'
}