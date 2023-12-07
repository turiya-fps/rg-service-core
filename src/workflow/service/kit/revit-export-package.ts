import * as z from 'zod';
import { WorkflowStatus } from '../../status.js';

/**
 * Possible workflow transition statuses for the "kit revit export" model.
 */
export type KitRevitExportPackageStatus = (
  | WorkflowStatus.Pending
  | WorkflowStatus.InProgress
  | WorkflowStatus.Succeeded
  | WorkflowStatus.Failed
);

/**
 * Create a `zod` validator for {@link KitRevitExportPackageStatus}.
 */
export const KIT_REVIT_EXPORT_PACKAGE_STATUS_VALIDATOR = z.enum([
  WorkflowStatus.Pending,
  WorkflowStatus.InProgress,
  WorkflowStatus.Succeeded,
  WorkflowStatus.Failed,
]);
