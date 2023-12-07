import * as z from 'zod';
import { WorkflowStatus } from '../../status.js';

/**
 * Possible workflow transition statuses for the "export design building" model.
 */
export type ProjectScenarioDesignBuildingExportStatus = (
  | WorkflowStatus.Pending
  | WorkflowStatus.Ready
  | WorkflowStatus.InProgress
  | WorkflowStatus.Succeeded
  | WorkflowStatus.Failed
);

/**
 * Create a `zod` validator for {@link ProjectScenarioDesignBuildingExportStatus}.
 */
export const PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_STATUS = z.enum([
  WorkflowStatus.Pending,
  WorkflowStatus.Ready,
  WorkflowStatus.InProgress,
  WorkflowStatus.Succeeded,
  WorkflowStatus.Failed,
]);
