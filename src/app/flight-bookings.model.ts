export interface PassengerDetails {
  title: string;
  firstName: string;
  lastName: string;
  age: number;
}
export interface FlightBookingsModel {
  flightBookingId: number;
  flightId: number;
  userId: number;
  departureCity: string;
  arrivalCity: string;
  flightDate: string;
  flightTime: string;
  totalPrice: number;
  bookedSeats: number;
  airlineCompany: string;
  passengerInfo: PassengerDetails[];
  bookingStatus?: string;
  paymentMethod?: string;
  transactionId?: string;


}
