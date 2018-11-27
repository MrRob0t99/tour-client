export interface Order {
    Id: number;
    TourId: number;
    ApplicationUserId: string;
    CityEnum: number;
    TypeOfFood: number;
    StartDate: Date;
    CountPeople: number;
    Duration: number;
    TotalPrice: number;
    Phone: string;
    IsConfirmed: boolean;
}
