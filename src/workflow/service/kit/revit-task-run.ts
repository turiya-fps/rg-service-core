import * as z from 'zod';
import { WorkflowStatus } from '../../status.js';

/**
 * Possible workflow transition statuses for the "kit revit task run" model.
 */
export type KitRevitTaskRunStatus = (
  | WorkflowStatus.Pending
  | WorkflowStatus.InProgress
  | WorkflowStatus.Succeeded
  | WorkflowStatus.Failed
);

/**
 * Create a `zod` validator for {@link KitRevitTaskRunStatus}.
 */
export const KIT_REVIT_TASK_RUN_STATUS_VALIDATOR = z.enum([
  WorkflowStatus.Pending,
  WorkflowStatus.InProgress,
  WorkflowStatus.Succeeded,
  WorkflowStatus.Failed,
]);
