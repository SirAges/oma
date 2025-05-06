interface AuthCredentials {
  email: string;
  password: string;
}

type Roles = "ADMIN" | "USER";

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

interface Session {
  user: {
    id: string;
    role: Roles;
    email: string;
  };
}
interface Token {
 
    id: string;
    role: Roles;
    email: string;
  
}
interface FileType {
  secure_url: string;
  format: string;
  bytes: number;
  public_id: string;
}
