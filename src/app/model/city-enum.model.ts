export enum CityEnum {
    Lviv = 0,
    Ternopil = 1,
    Kyiv = 2,
    Harkiv = 3,
    Zaporiza = 4,
    Dnipro = 5,
    Odessa = 6,
    IvanoFrankivsk = 7
}
export namespace CityEnum {
    export function values() {
        return Object.keys(CityEnum).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        );
    }
}
