import { WorkflowStatus } from '../../status.js';
import { KIT_REVIT_TASK_DEFINITION_STATUS_VALIDATOR } from './revit-task-definition.js';

describe('KIT_REVIT_TASK_DEFINITION_STATUS_VALIDATOR', (): void => {
  type TestCase = {
    readonly input: WorkflowStatus;
  };

  it.each<TestCase>([
    { input: WorkflowStatus.Pending },
    { input: WorkflowStatus.Synchronised },
    { input: WorkflowStatus.Failed },
  ])('with status, $input, validates', (data): void => {
    expect(
      KIT_REVIT_TASK_DEFINITION_STATUS_VALIDATOR.parse(data.input),
    ).toStrictEqual(data.input);
  });
});
