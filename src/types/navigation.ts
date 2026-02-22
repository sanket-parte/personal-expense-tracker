import type { ParsedExpenseData } from './index';

/** Valid routes and params for the main bottom tab navigator */
export type AppTabParamList = {
  Dashboard: undefined;
  AddExpense: undefined;
  History: undefined;
  Settings: undefined;
};

/** Valid routes and params for the root stack navigator */
export type RootStackParamList = {
  App: undefined;
  AddExpense: { prefillData?: ParsedExpenseData } | undefined;
  ScanReceipt: undefined;
  NLAdd: undefined;
};
