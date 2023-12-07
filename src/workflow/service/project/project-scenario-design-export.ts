import * as z from 'zod';
import { WorkflowStatus } from '../../status.js';

/**
 * Possible workflow transition statuses for the "export design" model.
 */
export type ProjectScenarioDesignExportStatus = (
  | WorkflowStatus.Pending
  | WorkflowStatus.Ready
  | WorkflowStatus.InProgress
  | WorkflowStatus.Succeeded
  | WorkflowStatus.Failed
);

/**
 * Create a `zod` validator for {@link ProjectScenarioDesignExportStatus}.
 */
export const PROJECT_SCENARIO_DESIGN_EXPORT_STATUS = z.enum([
  WorkflowStatus.Pending,
  WorkflowStatus.Ready,
  WorkflowStatus.InProgress,
  WorkflowStatus.Succeeded,
  WorkflowStatus.Failed,
]);
