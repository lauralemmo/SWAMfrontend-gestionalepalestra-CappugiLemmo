export interface AthleteModel {
  tax_code: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  birth_date: string; // formato ISO (LocalDate -> string)
  height: string;
  weight: string;
  subscriptionType: SubscriptionType;
  startDate: string; // formato ISO (LocalDate -> string)
}

export enum SubscriptionType {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUAL = 'SEMI_ANNUAL'
}
