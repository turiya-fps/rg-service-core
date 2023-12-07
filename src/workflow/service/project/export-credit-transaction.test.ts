import { WorkflowStatus } from '../../../workflow/status.js';
import { PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS } from './export-credit-transaction.js';

describe('PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS', (): void => {
  type TestCase = {
    readonly input: WorkflowStatus;
  };

  it.each<TestCase>([
    { input: WorkflowStatus.Pending },
    { input: WorkflowStatus.Approved },
    { input: WorkflowStatus.Applied },
    { input: WorkflowStatus.Declined },
  ])('with status, $input, validates', (data): void => {
    expect(
      PROJECT_EXPORT_CREDIT_TRANSACTION_STATUS.parse(data.input),
    ).toStrictEqual(data.input);
  });
});
