import { WorkflowStatus } from '../../status.js';
import { PROJECT_SCENARIO_DESIGN_EXPORT_STATUS } from './project-scenario-design-export.js';

describe('PROJECT_SCENARIO_DESIGN_EXPORT_STATUS', (): void => {
  type TestCase = {
    readonly input: WorkflowStatus;
  };

  it.each<TestCase>([
    { input: WorkflowStatus.Pending },
    { input: WorkflowStatus.Ready },
    { input: WorkflowStatus.InProgress },
    { input: WorkflowStatus.Succeeded },
    { input: WorkflowStatus.Failed },
  ])('with status, $input, validates', (data): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_EXPORT_STATUS.parse(data.input),
    ).toStrictEqual(data.input);
  });
});
