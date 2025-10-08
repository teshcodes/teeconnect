export type User = {
  _id: string;
  name?: {
    first?: string;
    last?: string;
  };
  email?: string;
  location?: {
    country?: string;
  };
  status?: string;
  permission?: string;
  registered?: {
    date?: string;
  };
};