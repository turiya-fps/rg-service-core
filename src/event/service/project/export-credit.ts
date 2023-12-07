import type { ZodError } from 'zod';
import { number, object, string } from 'zod';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.ProjectExportCreditUpdated}.
 */
export type ProjectExportCreditUpdatedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly export_credit_id: UniqueIdentifierStringValue;
  readonly export_credit_balance: number;
  readonly export_credit_balance_before: number;
  readonly export_credit_balance_pending: number;
  readonly export_credit_balance_pending_before: number;
  readonly export_credit_updated_at: TimestampStringValue;
};

/**
 * A `zod` schema for {@link ProjectExportCreditUpdatedServiceEvent}.
 */
export const PROJECT_EXPORT_CREDIT_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectExportCreditUpdatedServiceEvent>>({
  user_id: string().uuid(),

  export_credit_id: string().uuid(),
  export_credit_balance: number(),
  export_credit_balance_before: number(),
  export_credit_balance_pending: number(),
  export_credit_balance_pending_before: number(),
  export_credit_updated_at: string().datetime({ offset: false }),
});

/**
 * Validate {@link ProjectExportCreditUpdatedServiceEvent} using the `zod` schema {@link PROJECT_EXPORT_CREDIT_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectExportCreditUpdatedServiceEvent = captureToResult<ProjectExportCreditUpdatedServiceEvent, ZodError>()((x) => {
  return PROJECT_EXPORT_CREDIT_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectExportCreditUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectExportCreditUpdatedServiceEvent}.
 */
export const createProjectExportCreditUpdatedServiceEvent = createEventFactory<ProjectExportCreditUpdatedServiceEvent>(
  ServiceEventType.ProjectExportCreditUpdated,
  validateProjectExportCreditUpdatedServiceEvent,
);
