// Todo: یه تسک تکی توی لیست ما
// این interface شکل داده رو مشخص می‌کنه، یعنی هر Todo دقیقاً همین فیلدها رو داره،
// نه کم نه زیاد، و TypeScript جلوی اشتباه (مثلاً فراموش کردن یه فیلد) رو می‌گیره.
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
export type FilterType = "all"| "active"| "completed";