import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Appointment {
    $key: string;
    service: string;
    barber: string;
    mobile: number;
}
