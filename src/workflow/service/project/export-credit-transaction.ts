import * as z from 'zod';
import { WorkflowStatus } from '../../../workflow/status.js';

/**
 * Possible workflow transition statuses for the "export credit transaction" model.
 */
export type ProjectExportCreditTransactionStatus = (
  | WorkflowStatus.Pending
  | WorkflowStatus.Approved
  | WorkflowStatus.Applied
  | WorkflowStatus.Declined
);

/**
 * Create a `zod` validator for {@link ProjectExportCreditTransactionStatus}.
 */
export const PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS = z.enum([
  WorkflowStatus.Pending,
  WorkflowStatus.Approved,
  WorkflowStatus.Applied,
  WorkflowStatus.Declined,
]);
