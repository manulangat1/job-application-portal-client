export const JobApplicationStatus = {
  APPLIED: "APPLIED",
  INTERVIEWING: "INTERVIEWING",
  OFFERED: "OFFERED",
  REJECTED: "REJECTED",
  ACCEPTED: "ACCEPTED",
};

export const JobApplicationStatusDescription = {
  SALARY_MISMATCH: "SALARY_MISMATCH",
  OPPORTUNITY_MISMATCH: "OPPORTUNITY_MISMATCH",
  NO_RESPONSE_FROM_RECRUITER: "NO_RESPONSE_FROM_RECRUITER",
};
export const JobApplicationStatusList = [
  "APPLIED",
  "INTERVIEWING",
  "OFFERED",
  "REJECTED",
  "ACCEPTED",
];

export const CurrenciesList = ["KES", "USD", "EURO", "POUND"];

export const JobApplicationDescriptionList = [
  "SALARY_MISMATCH",
  "OPPORTUNITY_MISMATCH",
  "NO_RESPONSE_FROM_RECRUITER",
];

export interface LoaderInterface {
  isLoading: boolean;
  style?: any;
  size?: string;
  color?: string;
}
