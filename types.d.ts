interface AuthCredentials {
  companyName: string;
  email: string;
  lastName: string;
  firstName: string;
  password: string;
}

interface ErrorResponse {
  message: string;
  error: boolean;
}

type Contact = {
  email: string;
  phone: string;
  linkedIn: string;
};

type Roles = "ADMIN" | "USER";

type Duration =
  | "3 DAYS"
  | "5 DAYS"
  | "7 days"
  | "15 days"
  | "1 MONTH"
  | "3 MONTH"
  | "6 MONTH"
  | "1 YEAR"
  | "ABOVE 1 YEAR";

type Level = "Advanced" | "Beginner" | "Intermediate";

type Category =
  | "Leadership & Management"
  | "Technical Skills"
  | "Soft Skills"
  | "Finance"
  | "HR"
  | "Marketing";
type SolutionCategory =
  | "Training Solutions"
  | "Consulting Services"
  | "HR Consulting"
  | "Tech & Innovation"
  | "Regulatory Support"
  | "Leadership Development"
  | "Customer Experience"
  | "Business Performance"
  | "HR Development"
  | "Culture & Engagement";
type Mode = "In-Person" | "Virtual" | "Hybrid";
type Access = "Paid" | "Free";
type UserType = "Company" | "Individual";

type ScheduleDays =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

interface UserFormType {
  id?: string;
  role?: Role;
  companyName: string;
  email: string;
  lastName: string;
  firstName: string;
}

interface BusinessType {
  id: string;
  userId: string;
  businessName: string;
  businessTel: string;
  businessEmail: string;
  logoFile: FileType;
  businessDescription: string;
  registerationNumber: string;
  certificateFile?: {
    secure_url;
  };
  verificationId?: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessCountry: string;
  landmark: string;
}

interface CountryType {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  latitude: string;
  longitude: string;
  emoji: string;
  hasStates: boolean;
}

interface StateType {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  latitude: string;
  longitude: string;
  emoji: string;
  hasStates: boolean;
}
interface CityType {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  latitude: string;
  longitude: string;
  emoji: string;
  hasStates: boolean;
}
interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  mode: Mode;
  isFree: boolean;
  price: number;
}

interface FileType {
  secure_url: string;
  format: string;
  bytes: number;
  public_id: string;
}

interface Solution {
  title: string;
  category: string;
  description: string;
  industriesServed: string[];
}

interface ScheduleType {
  id: string;
  userId: string;
  daysInWeek: ScheduleDays;
  employeeCount: number;
  endDate: string;
  frequency: number;
  monthCount: number;
  name: string;
  note: string;
  startDate: string;
  timeInDay: string;
  type: UserType;
}

interface SolutionType {
  id: string;
  title: string;
  category: SolutionCategory;
  description: string;
  industriesServed: string[];
}
