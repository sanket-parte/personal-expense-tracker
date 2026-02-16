import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  App: NavigatorScreenParams<AppTabParamList>;
  // Auth screens would go here
};

export type AppTabParamList = {
  Dashboard: undefined;
  AddExpense: undefined;
  History: undefined;
  Settings: undefined;
};
