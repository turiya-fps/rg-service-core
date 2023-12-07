import type { ZodError } from 'zod';
import { number, object, string } from 'zod';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { ProjectExportCreditTransactionStatus } from '../../../workflow/service/project/export-credit-transaction.js';
import { PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS } from '../../../workflow/service/project/export-credit-transaction.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.ProjectExportCreditTransactionCreated}.
 */
export type ProjectExportCreditTransactionCreatedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly export_credit_id: UniqueIdentifierStringValue;
  readonly export_credit_balance: number;
  readonly export_credit_balance_pending: number;

  readonly export_credit_transaction_id: UniqueIdentifierStringValue;
  readonly export_credit_transaction_status: ProjectExportCreditTransactionStatus;
  readonly export_credit_transaction_amount: number;
  readonly export_credit_transaction_created_at: TimestampStringValue;
  readonly export_credit_transaction_updated_at: TimestampStringValue;
};

/**
 * A `zod` schema for {@link ProjectExportCreditTransactionCreatedServiceEvent}.
 */
export const PROJECT_EXPORT_CREDIT_TRANSACTION_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectExportCreditTransactionCreatedServiceEvent>>({
  user_id: string().uuid(),

  export_credit_id: string().uuid(),
  export_credit_balance: number(),
  export_credit_balance_pending: number(),

  export_credit_transaction_id: string().uuid(),
  export_credit_transaction_status: PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS,
  export_credit_transaction_amount: number(),
  export_credit_transaction_created_at: string().datetime({ offset: false }),
  export_credit_transaction_updated_at: string().datetime({ offset: false }),
});

/**
 * Validate {@link ProjectExportCreditTransactionCreatedServiceEvent} using the `zod` schema {@link PROJECT_EXPORT_CREDIT_TRANSACTION_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectExportCreditTransactionCreatedServiceEvent = captureToResult<ProjectExportCreditTransactionCreatedServiceEvent, ZodError>()((x) => {
  return PROJECT_EXPORT_CREDIT_TRANSACTION_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectExportCreditTransactionCreatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectExportCreditTransactionCreatedServiceEvent}.
 */
export const createProjectExportCreditTransactionCreatedServiceEvent = createEventFactory<ProjectExportCreditTransactionCreatedServiceEvent>(
  ServiceEventType.ProjectExportCreditTransactionCreated,
  validateProjectExportCreditTransactionCreatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectExportCreditTransactionUpdated}.
 */
export type ProjectExportCreditTransactionUpdatedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly export_credit_id: UniqueIdentifierStringValue;
  readonly export_credit_balance: number;
  readonly export_credit_balance_pending: number;

  readonly export_credit_transaction_id: UniqueIdentifierStringValue;
  readonly export_credit_transaction_status: ProjectExportCreditTransactionStatus;
  readonly export_credit_transaction_amount: number;
  readonly export_credit_transaction_created_at: TimestampStringValue;
  readonly export_credit_transaction_updated_at: TimestampStringValue;
};

/**
 * A `zod` schema for {@link ProjectExportCreditTransactionUpdatedServiceEvent}.
 */
export const PROJECT_EXPORT_CREDIT_TRANSACTION_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectExportCreditTransactionUpdatedServiceEvent>>({
  user_id: string().uuid(),

  export_credit_id: string().uuid(),
  export_credit_balance: number(),
  export_credit_balance_pending: number(),

  export_credit_transaction_id: string().uuid(),
  export_credit_transaction_status: PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS,
  export_credit_transaction_amount: number(),
  export_credit_transaction_created_at: string().datetime({ offset: false }),
  export_credit_transaction_updated_at: string().datetime({ offset: false }),
});

/**
 * Validate {@link ProjectExportCreditTransactionUpdatedServiceEvent} using the `zod` schema {@link PROJECT_EXPORT_CREDIT_TRANSACTION_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectExportCreditTransactionUpdatedServiceEvent = captureToResult<ProjectExportCreditTransactionUpdatedServiceEvent, ZodError>()((x) => {
  return PROJECT_EXPORT_CREDIT_TRANSACTION_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectExportCreditTransactionUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectExportCreditTransactionUpdatedServiceEvent}
 */
export const createProjectExportCreditTransactionUpdatedServiceEvent = createEventFactory<ProjectExportCreditTransactionUpdatedServiceEvent>(
  ServiceEventType.ProjectExportCreditTransactionUpdated,
  validateProjectExportCreditTransactionUpdatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectExportCreditTransactionApproved}.
 */
export type ProjectExportCreditTransactionApprovedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly export_credit_id: UniqueIdentifierStringValue;
  readonly export_credit_balance: number;
  readonly export_credit_balance_pending: number;

  readonly export_credit_transaction_id: UniqueIdentifierStringValue;
  readonly export_credit_transaction_status: ProjectExportCreditTransactionStatus;
  readonly export_credit_transaction_amount: number;
  readonly export_credit_transaction_created_at: TimestampStringValue;
  readonly export_credit_transaction_updated_at: TimestampStringValue;
};

/**
 * A `zod` schema for {@link ProjectExportCreditTransactionApprovedServiceEvent}.
 */
export const PROJECT_EXPORT_CREDIT_TRANSACTION_APPROVED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectExportCreditTransactionApprovedServiceEvent>>({
  user_id: string().uuid(),

  export_credit_id: string().uuid(),
  export_credit_balance: number(),
  export_credit_balance_pending: number(),

  export_credit_transaction_id: string().uuid(),
  export_credit_transaction_status: PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS,
  export_credit_transaction_amount: number(),
  export_credit_transaction_created_at: string().datetime({ offset: false }),
  export_credit_transaction_updated_at: string().datetime({ offset: false }),
});

/**
 * Validate {@link ProjectExportCreditTransactionApprovedServiceEvent} using the `zod` schema {@link PROJECT_EXPORT_CREDIT_TRANSACTION_APPROVED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectExportCreditTransactionApprovedServiceEvent = captureToResult<ProjectExportCreditTransactionApprovedServiceEvent, ZodError>()((x) => {
  return PROJECT_EXPORT_CREDIT_TRANSACTION_APPROVED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectExportCreditTransactionApprovedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectExportCreditTransactionApprovedServiceEvent}
 */
export const createProjectExportCreditTransactionApprovedServiceEvent = createEventFactory<ProjectExportCreditTransactionApprovedServiceEvent>(
  ServiceEventType.ProjectExportCreditTransactionApproved,
  validateProjectExportCreditTransactionApprovedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectExportCreditTransactionApplied}.
 */
export type ProjectExportCreditTransactionAppliedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly export_credit_id: UniqueIdentifierStringValue;
  readonly export_credit_balance: number;
  readonly export_credit_balance_pending: number;

  readonly export_credit_transaction_id: UniqueIdentifierStringValue;
  readonly export_credit_transaction_status: ProjectExportCreditTransactionStatus;
  readonly export_credit_transaction_amount: number;
  readonly export_credit_transaction_created_at: TimestampStringValue;
  readonly export_credit_transaction_updated_at: TimestampStringValue;
};

/**
 * A `zod` schema for {@link ProjectExportCreditTransactionAppliedServiceEvent}.
 */
export const PROJECT_EXPORT_CREDIT_TRANSACTION_APPLIED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectExportCreditTransactionAppliedServiceEvent>>({
  user_id: string().uuid(),

  export_credit_id: string().uuid(),
  export_credit_balance: number(),
  export_credit_balance_pending: number(),

  export_credit_transaction_id: string().uuid(),
  export_credit_transaction_status: PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS,
  export_credit_transaction_amount: number(),
  export_credit_transaction_created_at: string().datetime({ offset: false }),
  export_credit_transaction_updated_at: string().datetime({ offset: false }),
});

/**
 * Validate {@link ProjectExportCreditTransactionAppliedServiceEvent} using the `zod` schema {@link PROJECT_EXPORT_CREDIT_TRANSACTION_APPLIED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectExportCreditTransactionAppliedServiceEvent = captureToResult<ProjectExportCreditTransactionAppliedServiceEvent, ZodError>()((x) => {
  return PROJECT_EXPORT_CREDIT_TRANSACTION_APPLIED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectExportCreditTransactionAppliedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectExportCreditTransactionAppliedServiceEvent}
 */
export const createProjectExportCreditTransactionAppliedServiceEvent = createEventFactory<ProjectExportCreditTransactionAppliedServiceEvent>(
  ServiceEventType.ProjectExportCreditTransactionApplied,
  validateProjectExportCreditTransactionAppliedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectExportCreditTransactionDeclined}.
 */
export type ProjectExportCreditTransactionDeclinedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly export_credit_id: UniqueIdentifierStringValue;
  readonly export_credit_balance: number;
  readonly export_credit_balance_pending: number;

  readonly export_credit_transaction_id: UniqueIdentifierStringValue;
  readonly export_credit_transaction_status: ProjectExportCreditTransactionStatus;
  readonly export_credit_transaction_amount: number;
  readonly export_credit_transaction_created_at: TimestampStringValue;
  readonly export_credit_transaction_updated_at: TimestampStringValue;
};

/**
 * A `zod` schema for {@link ProjectExportCreditTransactionDeclinedServiceEvent}.
 */
export const PROJECT_EXPORT_CREDIT_TRANSACTION_DECLINED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectExportCreditTransactionDeclinedServiceEvent>>({
  user_id: string().uuid(),

  export_credit_id: string().uuid(),
  export_credit_balance: number(),
  export_credit_balance_pending: number(),

  export_credit_transaction_id: string().uuid(),
  export_credit_transaction_status: PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS,
  export_credit_transaction_amount: number(),
  export_credit_transaction_created_at: string().datetime({ offset: false }),
  export_credit_transaction_updated_at: string().datetime({ offset: false }),
});

/**
 * Validate {@link ProjectExportCreditTransactionDeclinedServiceEvent} using the `zod` schema {@link PROJECT_EXPORT_CREDIT_TRANSACTION_DECLINED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectExportCreditTransactionDeclinedServiceEvent = captureToResult<ProjectExportCreditTransactionDeclinedServiceEvent, ZodError>()((x) => {
  return PROJECT_EXPORT_CREDIT_TRANSACTION_DECLINED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectExportCreditTransactionDeclinedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectExportCreditTransactionDeclinedServiceEvent}
 */
export const createProjectExportCreditTransactionDeclinedServiceEvent = createEventFactory<ProjectExportCreditTransactionDeclinedServiceEvent>(
  ServiceEventType.ProjectExportCreditTransactionDeclined,
  validateProjectExportCreditTransactionDeclinedServiceEvent,
);
