export type ArrToObj<TArr extends readonly string[]> = {
    [Key in  ( TArr[number] )]:Key
}

export const transformArrayToObject =<T extends readonly string[]> (arr: T): ArrToObj<T> =>{
    const res : Partial<Record<T[number],T[number]>> = {}
    arr.forEach(( arrItem: T[number]  )=>{res[arrItem]=arrItem})
    return res as unknown as ArrToObj<T>;
    
}