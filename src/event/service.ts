/**
 * All service events defined against a single enum.
 */
export const enum ServiceEventType {
  /**
   * A (project service) "export credit" model has been updated.
   */
  ProjectExportCreditUpdated = 'project.export_credit.updated',

  /**
   * A (project service) "export credit transaction" model has been created.
   */
  ProjectExportCreditTransactionCreated = 'project.export_credit_transaction.created',

  /**
   * A (project service) "export credit transaction" model has been updated.
   */
  ProjectExportCreditTransactionUpdated = 'project.export_credit_transaction.updated',

  /**
   * A (project service) "export credit transaction" model is now in an "approved" state.
   */
  ProjectExportCreditTransactionApproved = 'project.export_credit_transaction.approved',

  /**
   * A (project service) "export credit transaction" model is now in an "applied" state.
   */
  ProjectExportCreditTransactionApplied = 'project.export_credit_transaction.applied',

  /**
   * A (project service) "export credit transaction" model is now in a "declined" state.
   */
  ProjectExportCreditTransactionDeclined = 'project.export_credit_transaction.declined',

  /**
   * A (project service) "project scenario design" model has been created.
   */
  ProjectScenarioDesignCreated = 'project.project_scenario_design.created',

  /**
   * A (project service) "project scenario design" model has been updated.
   */
  ProjectScenarioDesignUpdated = 'project.project_scenario_design.updated',

  /**
   * A (project service) "project scenario design" model has been created.
   */
  ProjectScenarioDesignExportCreated = 'project.project_scenario_design_export.created',

  /**
   * A (project service) "project scenario design" model has been updated.
   */
  ProjectScenarioDesignExportUpdated = 'project.project_scenario_design_export.updated',

  /**
   * An (project service) "project scenario design" model is now in a "ready" state.
   */
  ProjectScenarioDesignExportReady = 'project.project_scenario_design_export.ready',

  /**
   * An (project service) "project scenario design" model is now in an "in progress" state.
   */
  ProjectScenarioDesignExportInProgress = 'project.project_scenario_design_export.in_progress',

  /**
   * An (project service) "project scenario design" model is now a "succeeded" state.
   */
  ProjectScenarioDesignExportSucceeded = 'project.project_scenario_design_export.succeeded',

  /**
   * An (project service) "project scenario design" model is now in a "failed" state.
   */
  ProjectScenarioDesignExportFailed = 'project.project_scenario_design_export.failed',

  /**
   * A (project service) "project scenario design building" model has been created.
   */
  ProjectScenarioDesignBuildingCreated = 'project.project_scenario_design_building.created',

  /**
   * An (project service) "project scenario design building export" model has been created.
   */
  ProjectScenarioDesignBuildingExportCreated = 'project.project_scenario_design_building_export.created',

  /**
   * An (project service) "project scenario design building export" model has been updated.
   */
  ProjectScenarioDesignBuildingExportUpdated = 'project.project_scenario_design_building_export.updated',

  /**
   * An (project service) "project scenario design building export" model is now in a "ready" state.
   */
  ProjectScenarioDesignBuildingExportReady = 'project.project_scenario_design_building_export.ready',

  /**
   * An (project service) "project scenario design building export" model is now in an "in progress" state.
   */
  ProjectScenarioDesignBuildingExportInProgress = 'project.project_scenario_design_building_export.in_progress',

  /**
   * An (project service) "project scenario design building export" model is now in a "succeeded" state.
   */
  ProjectScenarioDesignBuildingExportSucceeded = 'project.project_scenario_design_building_export.succeeded',

  /**
   * An (project service) "project scenario design building export" model is now in a "failed" state.
   */
  ProjectScenarioDesignBuildingExportFailed = 'project.project_scenario_design_building_export.failed',

  /**
   * A (kit service) "kit revit plugin" model has been created.
   */
  KitRevitPluginCreated = 'kit.revit_plugin.created',

  /**
   * A (kit service) "kit revit plugin" model has been updated.
   */
  KitRevitPluginUpdated = 'kit.revit_plugin.updated',

  /**
   * A (kit service) "kit revit plugin" model is now in an "uploaded" state.
   */
  KitRevitPluginUploaded = 'kit.revit_plugin.uploaded',

  /**
   * A (kit service) "kit revit plugin" model is now in a "failed" state.
   */
  KitRevitPluginFailed = 'kit.revit_plugin.failed',

  /**
   * A (kit service) "kit revit plugin version" model has been created.
   */
  KitRevitPluginVersionCreated = 'kit.revit_plugin_version.created',

  /**
   * A (kit service) "kit revit plugin version" model has been updated.
   */
  KitRevitPluginVersionUpdated = 'kit.revit_plugin_version.updated',

  /**
   * A (kit service) "kit revit plugin version" model is now in an "uploaded" state.
   */
  KitRevitPluginVersionUploaded = 'kit.revit_plugin_version.uploaded',

  /**
   * A (kit service) "kit revit plugin version" model is now in a "failed" state.
   */
  KitRevitPluginVersionFailed = 'kit.revit_plugin_version.failed',

  /**
   * A (kit service) "kit revit task definition" model has been created.
   */
  KitRevitTaskDefinitionCreated = 'kit.revit_task_definition.created',

  /**
   * A (kit service) "kit revit task definition" model has been updated.
   */
  KitRevitTaskDefinitionUpdated = 'kit.revit_task_definition.updated',

  /**
   * A (kit service) "kit revit task definition" model is now in a "synchronised" state.
   */
  KitRevitTaskDefinitionSynchronised = 'kit.revit_task_definition.synchronised',

  /**
   * A (kit service) "kit revit task definition" model is now in a "failed" state.
   */
  KitRevitTaskDefinitionFailed = 'kit.revit_task_definition.failed',

  /**
   * A (kit service) "kit revit task run" model has been created.
   */
  KitRevitTaskRunCreated = 'kit.revit_task_run.created',

  /**
   * A (kit service) "kit revit task run" model has been updated.
   */
  KitRevitTaskRunUpdated = 'kit.revit_task_run.updated',

  /**
   * A (kit service) "kit revit task run" model is now in an "in progress" state.
   */
  KitRevitTaskRunInProgress = 'kit.revit_task_run.in_progress',

  /**
   * A (kit service) "kit revit task run" model is now in a "succeeded" state.
   */
  KitRevitTaskRunSucceeded = 'kit.revit_task_run.succeeded',

  /**
   * A (kit service) "kit revit task run" model is now in a "failed" state.
   */
  KitRevitTaskRunFailed = 'kit.revit_task_run.failed',

  /**
   * A (kit service) "kit revit export" model has been created.
   */
  KitRevitExportPackageCreated = 'kit.revit_export_package.created',

  /**
   * A (kit service) "kit revit export" model has been updated.
   */
  KitRevitExportPackageUpdated = 'kit.revit_export_package.updated',

  /**
   * A (kit service) "kit revit export" model is now in an "in progress" state.
   */
  KitRevitExportPackageInProgress = 'kit.revit_export_package.in_progress',

  /**
   * A (kit service) "kit revit export" model is now in a "succeeded" state.
   */
  KitRevitExportPackageSucceeded = 'kit.revit_export_package.succeeded',

  /**
   * A (kit service) "kit revit export" model is now in a "failed" state.
   */
  KitRevitExportPackageFailed = 'kit.revit_export_package.failed',
}
