import * as z from 'zod';
import { WorkflowStatus } from '../../status.js';

/**
 * Possible workflow transition statuses for the "kit revit plugin" model.
 */
export type KitRevitPluginStatus = (
  | WorkflowStatus.Pending
  | WorkflowStatus.Uploaded
  | WorkflowStatus.Failed
);

/**
 * Create a `zod` validator for {@link KitRevitPluginStatus}.
 */
export const KIT_REVIT_PLUGIN_STATUS_VALIDATOR = z.enum([
  WorkflowStatus.Pending,
  WorkflowStatus.Uploaded,
  WorkflowStatus.Failed,
]);
