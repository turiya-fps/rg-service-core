import * as z from 'zod';
import { WorkflowStatus } from '../../status.js';

/**
 * Possible workflow transition statuses for the "kit revit task definition" model.
 */
export type KitRevitTaskDefinitionStatus = (
  | WorkflowStatus.Pending
  | WorkflowStatus.Synchronised
  | WorkflowStatus.Failed
);

/**
 * Create a `zod` validator for {@link KitRevitTaskDefinitionStatus}.
 */
export const KIT_REVIT_TASK_DEFINITION_STATUS_VALIDATOR = z.enum([
  WorkflowStatus.Pending,
  WorkflowStatus.Synchronised,
  WorkflowStatus.Failed,
]);
