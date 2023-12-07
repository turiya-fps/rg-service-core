import * as z from 'zod';
import { WorkflowStatus } from '../../status.js';

/**
 * Possible workflow transition statuses for the "kit revit plugin version" model.
 */
export type KitRevitPluginVersionStatus = (
  | WorkflowStatus.Pending
  | WorkflowStatus.Uploaded
  | WorkflowStatus.Failed
);

/**
 * Create a `zod` validator for {@link KitRevitPluginVersionStatus}.
 */
export const KIT_REVIT_PLUGIN_VERSION_STATUS_VALIDATOR = z.enum([
  WorkflowStatus.Pending,
  WorkflowStatus.Uploaded,
  WorkflowStatus.Failed,
]);
