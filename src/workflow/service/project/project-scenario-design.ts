import * as z from 'zod';
import { WorkflowStatus } from '../../status.js';

/**
 * Possible workflow transition statuses for the "aggregation file extraction" process for the "project scenario design option" model.
 */
export type ProjectScenarioDesignAggregationFileExtractionStatus = (
  | WorkflowStatus.Pending
  | WorkflowStatus.InProgress
  | WorkflowStatus.Completed
);

/**
 * Create a `zod` validator for {@link ProjectScenarioDesignAggregationFileExtractionStatus}.
 */
export const PROJECT_SCENARIO_DESIGN_AGGREGATION_FILE_EXTRACTION_STATUS = z.enum([
  WorkflowStatus.Pending,
  WorkflowStatus.InProgress,
  WorkflowStatus.Completed,
]);
