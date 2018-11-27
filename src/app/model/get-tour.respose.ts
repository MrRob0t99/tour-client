import { Tour } from './tour.model';

export interface GetToursResponse {
    count: number;
    listTour: Array<Tour>;
}
