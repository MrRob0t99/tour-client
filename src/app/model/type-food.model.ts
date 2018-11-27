export enum TypeOfFood {
    RO= 0,
    BB= 1,
    HB= 2,
    FB= 3,
    AI= 4,
    UAI= 5
}
export namespace TypeOfFood {

    export function values() {
      return Object.keys(TypeOfFood).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }
