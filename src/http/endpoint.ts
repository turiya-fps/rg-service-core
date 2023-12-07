import type { HttpTransport, HttpTransportKind } from '@matt-usurp/grok/http/transport.js';
import { HttpHeaders, HttpMethod, HttpStatusCode } from '../http.js';

export {
  /** @deprecated use import from top-level `http` submodule */
  HttpHeaders,
  /** @deprecated use import from top-level `http` submodule */
  HttpMethod,
  /** @deprecated use import from top-level `http` submodule */
  HttpStatusCode,
};

/**
 * A series of common response identifiers that services can return via endpoints.
 */
export namespace CommonResponseIdentifier {
  export type SuccessData<T extends string> = `success:data:${T}`;
  export type SuccessCreated<T extends string> = `success:created:${T}`;
  export type SuccessUpdated<T extends string> = `success:updated:${T}`;
  export type SuccessDeleted<T extends string> = `success:deleted:${T}`;

  export type FailureNotFound<T extends string> = `failure:not-found:${T}`;
  export type FailureForbidden<T extends string> = `failure:forbidden:${T}`;
  export type FailureInvalid<T extends string, E extends string> = `failure:invalid:${T}:${E}`;

  export type FailureDependencyNotFound<T extends string> = `failure:dependency:not-found:${T}`;
  export type FailureDependencyInvalid<T extends string, E extends string> = `failure:dependency:invalid:${T}:${E}`;

  /**
   * @deprecated use {@link SuccessData} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceReturned<T extends string> = `success:resource-returned:${T}`;

  /**
   * @deprecated use {@link SuccessData} instead, collection is not differentiated anymore, to be removed in `^2.0.0`.
   */
  export type SuccessResourceCollectionReturned<T extends string> = `success:resource-collection-returned:${T}`;

  /**
   * @deprecated use {@link SuccessCreated} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceCreated<T extends string> = `success:resource-created:${T}`;

  /**
   * @deprecated use {@link SuccessUpdated} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceUpdated<T extends string> = `success:resource-updated:${T}`;

  /**
   * @deprecated use {@link SuccessDeleted} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceDeleted<T extends string> = `success:resource-deleted:${T}`;

  /**
   * @deprecated use {@link FailureNotFound} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceNotFound<T extends string> = `failure:resource-not-found:${T}`;

  /**
   * @deprecated use {@link FailureForbidden} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceForbidden<T extends string> = `failure:resource-forbidden:${T}`;

  /**
   * @deprecated use {@link FailureResourceStateInvalid} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceStateInvalid<T extends string> = `failure:resource-state-invalid:${T}`;

  /**
   * @deprecated use {@link FailureDependencyNotFound} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceDependencyNotFound<T extends string> = `failure:resource-dependency-not-found:${T}`;

  /**
   * @deprecated use {@link FailureDependencyInvalid} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceDependencyInvalid<T extends string> = `failure:resource-dependency-invalid:${T}`;

  /**
   * @deprecated use {@link FailureRequestUnauthorised} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceUnauthorised<T extends string> = `failure:resource-unauthorised:${T}`;

  export type FailureAccountInactive = 'failure:account-inactive';

  /**
   * A request is unuathorised via the session authentication middleware.
   * Additional information should be available in the headers.
   */
  export type FailureRequestUnauthorised = 'failure:request-unauthorised';

  export type FailureRequestRequiresActor = 'failure:request-forbidden:requires-actor';
  export type FailureRequestRequiresAdmin = 'failure:request-forbidden:requires-admin';
  export type FailureRequestRequiresAdminAndActor = 'failure:request-forbidden:requires-admin-actor';
}

/**
 * The common response header mapping structure.
 */
export type CommonResponseHeaderMapping<T extends string> = {
  /**
   * The response identifier for the returned response.
   */
  readonly 'api-response': T;
};

/**
 * A variant of {@link CommonResponseHeaderMapping} with authoriser errors.
 */
export type CommonResponseHeaderMappingForAuthorisation = (
  & CommonResponseHeaderMapping<CommonResponseIdentifier.FailureRequestUnauthorised>
  & {
    /**
     * The authoriser response code.
     */
    readonly 'api-authoriser': string;
  }
);

/**
 * The common response http transport structure.
 * This represents the response in its data form.
 */
export type CommonResponseTransport<T extends string, S extends number, B> = HttpTransport<S, B, CommonResponseHeaderMapping<T>>;

/**
 * A series of common responses that relate to the {@link CommonResponseIdentifier} namespace.
 *
 * These go hand-in-hand with the identifiers and are pre-crafted http transports with the correct status codes and configurations.
 */
export namespace CommonResponse {
  export type SuccessData<T extends CommonResponseIdentifier.SuccessData<string>, B> = CommonResponseTransport<T, HttpStatusCode.Ok, B>;
  export type SuccessDataNoContent<T extends CommonResponseIdentifier.SuccessData<string>, B> = CommonResponseTransport<T, HttpStatusCode.NoContent, B>;
  export type SuccessCreated<T extends CommonResponseIdentifier.SuccessCreated<string>, B> = CommonResponseTransport<T, HttpStatusCode.Created, B>;
  export type SuccessUpdated<T extends CommonResponseIdentifier.SuccessUpdated<string>, B> = CommonResponseTransport<T, HttpStatusCode.Ok, B>;
  export type SuccessUpdatedWithNoContent<T extends CommonResponseIdentifier.SuccessUpdated<string>> = CommonResponseTransport<T, HttpStatusCode.NoContent, undefined>;
  export type SuccessDeleted<T extends CommonResponseIdentifier.SuccessDeleted<string>, B> = CommonResponseTransport<T, HttpStatusCode.NoContent, B>;

  export type FailureNotFound<T extends CommonResponseIdentifier.FailureNotFound<string>> = CommonResponseTransport<T, HttpStatusCode.NotFound, undefined>;
  export type FailureForbidden<T extends CommonResponseIdentifier.FailureForbidden<string>> = CommonResponseTransport<T, HttpStatusCode.Forbidden, undefined>;
  export type FailureInvalid<T extends CommonResponseIdentifier.FailureInvalid<string, string>> = CommonResponseTransport<T, HttpStatusCode.Conflict, undefined>;

  export type FailureDependencyNotFound<T extends CommonResponseIdentifier.FailureDependencyNotFound<string>> = CommonResponseTransport<T, HttpStatusCode.NotFound, undefined>;
  export type FailureDependencyInvalid<T extends CommonResponseIdentifier.FailureDependencyInvalid<string, string>> = CommonResponseTransport<T, HttpStatusCode.Conflict, undefined>;

  /**
   * @deprecated use {@link SuccessData} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceReturned<T extends string, B> = CommonResponseTransport<T, HttpStatusCode.Ok, B>;

  /**
   * @deprecated use {@link SuccessData} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceCollectionReturned<T extends CommonResponseIdentifier.SuccessResourceCollectionReturned<string>, B> = CommonResponseTransport<T, HttpStatusCode.Ok, B>;

  /**
   * @deprecated use {@link SuccessCreated} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceCreated<T extends CommonResponseIdentifier.SuccessResourceCreated<string>, B> = CommonResponseTransport<T, HttpStatusCode.Created, B>;

  /**
   * @deprecated use {@link SuccessUpdated} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceUpdated<T extends CommonResponseIdentifier.SuccessResourceUpdated<string>, B> = CommonResponseTransport<T, HttpStatusCode.Ok, B>;

  /**
   * @deprecated use {@link SuccessUpdatedWithNoContent} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceUpdatedWithNoContent<T extends CommonResponseIdentifier.SuccessResourceUpdated<string>> = CommonResponseTransport<T, HttpStatusCode.NoContent, undefined>;

  /**
   * @deprecated use {@link SuccessDeleted} instead, to be removed in `^2.0.0`.
   */
  export type SuccessResourceDeleted<T extends CommonResponseIdentifier.SuccessResourceDeleted<string>, B> = CommonResponseTransport<T, HttpStatusCode.NoContent, B>;

  /**
   * @deprecated use {@link FailureNotFound} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceNotFound<T extends CommonResponseIdentifier.FailureResourceNotFound<string>> = CommonResponseTransport<T, HttpStatusCode.NotFound, undefined>;

  /**
   * @deprecated use {@link FailureForbidden} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceForbidden<T extends CommonResponseIdentifier.FailureResourceForbidden<string>> = CommonResponseTransport<T, HttpStatusCode.Forbidden, undefined>;

  /**
   * @deprecated use {@link FailureInvalid} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceStateInvalid<T extends CommonResponseIdentifier.FailureResourceStateInvalid<string>> = CommonResponseTransport<T, HttpStatusCode.Conflict, undefined>;

  /**
   * @deprecated use {@link FailureDependencyNotFound} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceDependencyNotFound<T extends CommonResponseIdentifier.FailureResourceDependencyNotFound<string>> = CommonResponseTransport<T, HttpStatusCode.NotFound, undefined>;

  /**
   * @deprecated use {@link FailureDependencyInvalid} instead, to be removed in `^2.0.0`.
   */
  export type FailureResourceDependencyInvalid<T extends CommonResponseIdentifier.FailureResourceDependencyInvalid<string>> = CommonResponseTransport<T, HttpStatusCode.Conflict, undefined>;

  /**
   * @deprecated Pretty sure this makes no sense, you cannot be unauthorised to see a resource, you are forbidden it?
   */
  export type FailureResourceUnauthorised<T extends CommonResponseIdentifier.FailureResourceUnauthorised<string>> = CommonResponseTransport<T, HttpStatusCode.Unauthorised, undefined>;

  export type FailureAccountInactive<T extends CommonResponseIdentifier.FailureAccountInactive> = CommonResponseTransport<T, HttpStatusCode.Forbidden, undefined>;

  /**
   * A request is unuathorised via the session authentication middleware.
   * Additional information should be available in the headers.
   */
  export type FailureRequestUnauthorised = HttpTransport<HttpStatusCode.Unauthorised, undefined, CommonResponseHeaderMappingForAuthorisation>;

  export type FailureRequestRequiresActor = CommonResponseTransport<CommonResponseIdentifier.FailureRequestRequiresActor, HttpStatusCode.Forbidden, undefined>;
  export type FailureRequestRequiresAdmin = CommonResponseTransport<CommonResponseIdentifier.FailureRequestRequiresAdmin, HttpStatusCode.Forbidden, undefined>;
  export type FailureRequestRequiresAdminAndActor = CommonResponseTransport<CommonResponseIdentifier.FailureRequestRequiresAdminAndActor, HttpStatusCode.Forbidden, undefined>;
}

/**
 * Extract the response identifiers from the responses in {@link R}.
 */
export type ExtractHttpResponseIdentifiers<R extends HttpTransportKind> = (
  R extends { readonly headers?: infer H }
    ? H extends CommonResponseHeaderMapping<infer T>
      ? T
      : never
    : never
);

/**
 * Extract the response identifier {@link T} from the possibles responses in {@link R}.
 * The possible response identifiers that {@link T} can be is bound to the possible response identifiers within {@link R}.
 */
export type ExtractHttpResponseByType<R extends HttpTransportKind, T extends ExtractHttpResponseIdentifiers<R>> = (
  R extends { readonly headers?: infer H }
    ? H extends CommonResponseHeaderMapping<T>
      ? R
      : never
    : never
);

/**
 * Assert the given response {@link R} is the expected response identifier {@link T}.
 *
 * This can be used with type exhaustion to remove responses from the union of possible responses.
 * Once all responses have been exhausted the union will resolve to `never` which can be used pass the build.
 * Examples of this can be found in any of the endpoint tests where exhaustion is checked.
 */
export const isHttpResponseIdentifier = <
  R extends HttpTransportKind,
  T extends ExtractHttpResponseIdentifiers<R>,
>(response: R, type: T): response is ExtractHttpResponseByType<R, T> => {
  return response.headers !== undefined
    && (response.headers as CommonResponseHeaderMapping<string>)['api-response'] === type;
};
