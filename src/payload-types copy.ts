/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    teams: Team;
    projects: Project;
    deployments: Deployment;
    plans: Plan;
    templates: Template;
    'api-keys': ApiKey;
  };
  globals: {};
}
export interface User {
  id: string;
  name?: string;
  githubID?: string;
  defaultTeam?: string | Team;
  teams: {
    team: string | Team;
    roles?: ('owner' | 'admin' | 'user')[];
    invitedOn?: string;
    acceptedOn?: string;
    default?: boolean;
    id?: string;
  }[];
  projects: {
    project?: string | Project;
    roles?: ('owner' | 'admin' | 'user')[];
    invitedOn?: string;
    acceptedOn?: string;
    id?: string;
  }[];
  roles?: ('admin' | 'user')[];
  githubAccessToken?: string;
  githubAccessTokenExpiration?: number;
  githubRefreshToken?: string;
  githubRefreshTokenExpiration?: number;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  _verified?: boolean;
  _verificationToken?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}
export interface Team {
  id: string;
  name?: string;
  slug?: string;
  billingEmail?: string;
  stripeCustomerID?: string;
  subscriptions: {
    stripeSubscriptionID?: string;
    stripeProductID?: string;
    plan?: string | Plan;
    status?: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
    id?: string;
  }[];
  skipSync?: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Plan {
  id: string;
  name?: string;
  slug?: string;
  stripeProductID?: string;
  priceJSON?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}
export interface Project {
  id: string;
  status?: 'draft' | 'published';
  name: string;
  slug?: string;
  deletedOn?: string;
  plan?: string | Plan;
  team: string | Team;
  source?: 'github';
  repositoryName?: string;
  template?: string | Template;
  makePrivate?: boolean;
  repositoryURL?: string;
  repositoryID?: string;
  installID?: string;
  deploymentBranch?: string;
  rootDirectory?: string;
  outputDirectory?: string;
  buildScript?: string;
  installScript?: string;
  runScript?: string;
  environmentVariables: {
    key?: string;
    value?: string;
    id?: string;
  }[];
  aws: {
    user?: string;
  };
  skipSync?: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Template {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  repositoryURL?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}
export interface Deployment {
  id: string;
  name?: string;
  team: string | Team;
  project: string | Project;
  deployedAt: string;
  deploymentURL: string;
  logs: {
    timestamp?: string;
    message?: string;
    id?: string;
  }[];
  deploymentStatus?: 'success' | 'error';
  createdAt: string;
  updatedAt: string;
}
export interface ApiKey {
  id: string;
  name?: string;
  roles: ('owner' | 'admin' | 'user')[];
  enableAPIKey?: boolean;
  apiKey?: string;
  apiKeyIndex?: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}
