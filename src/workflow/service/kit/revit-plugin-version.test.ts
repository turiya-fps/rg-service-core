import { WorkflowStatus } from '../../status.js';
import { KIT_REVIT_PLUGIN_VERSION_STATUS_VALIDATOR } from './revit-plugin-version.js';

describe('KIT_REVIT_PLUGIN_VERSION_STATUS_VALIDATOR', (): void => {
  type TestCase = {
    readonly input: WorkflowStatus;
  };

  it.each<TestCase>([
    { input: WorkflowStatus.Pending },
    { input: WorkflowStatus.Uploaded },
    { input: WorkflowStatus.Failed },
  ])('with status, $input, validates', (data): void => {
    expect(
      KIT_REVIT_PLUGIN_VERSION_STATUS_VALIDATOR.parse(data.input),
    ).toStrictEqual(data.input);
  });
});
