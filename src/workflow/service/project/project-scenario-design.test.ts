import { WorkflowStatus } from '../../status.js';
import { PROJECT_SCENARIO_DESIGN_AGGREGATION_FILE_EXTRACTION_STATUS } from './project-scenario-design.js';

describe('PROJECT_SCENARIO_DESIGN_AGGREGATION_FILE_EXTRACTION_STATUS', (): void => {
  type TestCase = {
    readonly input: WorkflowStatus;
  };

  it.each<TestCase>([
    { input: WorkflowStatus.Pending },
    { input: WorkflowStatus.InProgress },
    { input: WorkflowStatus.Completed },
  ])('with status, $input, validates', (data): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_AGGREGATION_FILE_EXTRACTION_STATUS.parse(data.input),
    ).toStrictEqual(data.input);
  });
});
