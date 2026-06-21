export type LoginMethod = 'libraryCard' | 'phone' | 'campus';

export type UserType = 'adult' | 'child';

export interface UserInfo {
  id: string;
  name: string;
  userType: UserType;
  libraryCardNo: string;
  phone: string;
  campusId?: string;
  parentPhone?: string;
  avatar?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'closure' | 'event' | 'info';
}

export interface BorrowRecord {
  id: string;
  bookTitle: string;
  dueDate: string;
  canRenew: boolean;
  coverColor: string;
}

export interface ReserveRecord {
  id: string;
  bookTitle: string;
  status: 'pending' | 'available' | 'expired';
  reserveDate: string;
  coverColor: string;
}

export interface LoginFormState {
  libraryCardNo: string;
  password: string;
  phone: string;
  verifyCode: string;
  campusId: string;
  campusPassword: string;
}

export type FindMethod = 'phone' | 'email';
