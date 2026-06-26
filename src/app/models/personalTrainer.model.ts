export interface PersonalTrainerModel {
  tax_code: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  birth_date: string;   // LocalDate -> string (formato YYYY-MM-DD)
  salary: number;
  active: boolean;
  startDate: string;    // LocalDate -> string
  endDate: string;      // LocalDate -> string
}
