export interface All {
  key: string;
  count: number;
  sum: number;
}

export interface Status {
  key: string;
  count: number;
  sum: number;
}

export interface Facets {
  all: All[];
  status: Status[];
}

export interface BankAccount {
  id: number;
  name: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface BankEntry {
  id: number;
  name: string;
}

export interface BudgetCategory {
  user_code: string;
  id: number;
  name: string;
}

export interface Tax {
  id: number;
  name: string;
  rate: number;
  enabled: boolean;
}

export interface Payee {
  id: number;
  name: string;
}

export interface ReconciledDocument {
  id: number;
  bank_entry: BankEntry;
  document_type: string;
  document_id: number;
  document_date: string;
  user_code: string;
  amount: number;
  budget_category: BudgetCategory;
  secondary_budget_categories: any[];
  tax: Tax;
  payee_type: string;
  payee: Payee;
  locked: boolean;
  auto_reconciled: boolean;
  bank_entry_reconciled: boolean;
  attachments: any[];
}

export interface Result {
  id: number;
  external_id: string;
  bank_account: BankAccount;
  posted_date: string;
  transaction_date: string;
  amount: number;
  currency_iso_code: string;
  description: string;
  provider_name: string;
  provider_category_id: number;
  provider_category_id_str: string;
  payment_method: PaymentMethod;
  status: string;
  reconciled_documents: ReconciledDocument[];
}

export interface Transactions {
  has_next_page: string;
  facets: Facets;
  results: Result[];
}
