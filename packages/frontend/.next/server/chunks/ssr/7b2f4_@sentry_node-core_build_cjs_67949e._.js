module.exports = {

"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/logs/capture.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const node_util = require("node:util");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
/**
 * Capture a log with the given level.
 *
 * @param level - The level of the log.
 * @param message - The message to log.
 * @param attributes - Arbitrary structured data that stores information about the log - e.g., userId: 100.
 */ function captureLog(level, ...args) {
    const [messageOrMessageTemplate, paramsOrAttributes, maybeAttributes] = args;
    if (Array.isArray(paramsOrAttributes)) {
        const attributes = {
            ...maybeAttributes
        };
        attributes['sentry.message.template'] = messageOrMessageTemplate;
        paramsOrAttributes.forEach((param, index)=>{
            attributes[`sentry.message.parameter.${index}`] = param;
        });
        const message = node_util.format(messageOrMessageTemplate, ...paramsOrAttributes);
        core._INTERNAL_captureLog({
            level,
            message,
            attributes
        });
    } else {
        core._INTERNAL_captureLog({
            level,
            message: messageOrMessageTemplate,
            attributes: paramsOrAttributes
        });
    }
}
exports.captureLog = captureLog; //# sourceMappingURL=capture.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/logs/exports.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const capture = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/logs/capture.js [app-ssr] (ecmascript)");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
/**
 * @summary Capture a log with the `trace` level. Requires `_experiments.enableLogs` to be enabled.
 *
 * You can either pass a message and attributes or a message template, params and attributes.
 *
 * @example
 *
 * ```
 * Sentry.logger.trace('Starting database connection', {
 *   database: 'users',
 *   connectionId: 'conn_123'
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.trace('Database connection %s established for %s',
 *   ['successful', 'users'],
 *   { connectionId: 'conn_123' }
 * );
 * ```
 */ function trace(...args) {
    capture.captureLog('trace', ...args);
}
/**
 * @summary Capture a log with the `debug` level. Requires `_experiments.enableLogs` to be enabled.
 *
 * You can either pass a message and attributes or a message template, params and attributes.
 *
 * @example
 *
 * ```
 * Sentry.logger.debug('Cache miss for user profile', {
 *   userId: 'user_123',
 *   cacheKey: 'profile:user_123'
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.debug('Cache %s for %s: %s',
 *   ['miss', 'user profile', 'key not found'],
 *   { userId: 'user_123' }
 * );
 * ```
 */ function debug(...args) {
    capture.captureLog('debug', ...args);
}
/**
 * @summary Capture a log with the `info` level. Requires `_experiments.enableLogs` to be enabled.
 *
 * You can either pass a message and attributes or a message template, params and attributes.
 *
 * @example
 *
 * ```
 * Sentry.logger.info('User profile updated', {
 *   userId: 'user_123',
 *   updatedFields: ['email', 'preferences']
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.info('User %s updated their %s',
 *   ['John Doe', 'profile settings'],
 *   { userId: 'user_123' }
 * );
 * ```
 */ function info(...args) {
    capture.captureLog('info', ...args);
}
/**
 * @summary Capture a log with the `warn` level. Requires `_experiments.enableLogs` to be enabled.
 *
 * You can either pass a message and attributes or a message template, params and attributes.
 *
 * @example
 *
 * ```
 * Sentry.logger.warn('Rate limit approaching', {
 *   endpoint: '/api/users',
 *   currentRate: '95/100',
 *   resetTime: '2024-03-20T10:00:00Z'
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.warn('Rate limit %s for %s: %s',
 *   ['approaching', '/api/users', '95/100 requests'],
 *   { resetTime: '2024-03-20T10:00:00Z' }
 * );
 * ```
 */ function warn(...args) {
    capture.captureLog('warn', ...args);
}
/**
 * @summary Capture a log with the `error` level. Requires `_experiments.enableLogs` to be enabled.
 *
 * You can either pass a message and attributes or a message template, params and attributes.
 *
 * @example
 *
 * ```
 * Sentry.logger.error('Failed to process payment', {
 *   orderId: 'order_123',
 *   errorCode: 'PAYMENT_FAILED',
 *   amount: 99.99
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.error('Payment processing failed for order %s: %s',
 *   ['order_123', 'insufficient funds'],
 *   { amount: 99.99 }
 * );
 * ```
 */ function error(...args) {
    capture.captureLog('error', ...args);
}
/**
 * @summary Capture a log with the `fatal` level. Requires `_experiments.enableLogs` to be enabled.
 *
 * You can either pass a message and attributes or a message template, params and attributes.
 *
 * @example
 *
 * ```
 * Sentry.logger.fatal('Database connection pool exhausted', {
 *   database: 'users',
 *   activeConnections: 100,
 *   maxConnections: 100
 * });
 * ```
 *
 * @example With template strings
 *
 * ```
 * Sentry.logger.fatal('Database %s: %s connections active',
 *   ['connection pool exhausted', '100/100'],
 *   { database: 'users' }
 * );
 * ```
 */ function fatal(...args) {
    capture.captureLog('fatal', ...args);
}
exports.fmt = core.fmt;
exports.debug = debug;
exports.error = error;
exports.fatal = fatal;
exports.info = info;
exports.trace = trace;
exports.warn = warn; //# sourceMappingURL=exports.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/otel/instrument.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const instrumentation = __turbopack_require__("[project]/node_modules/.pnpm/@opentelemetry+instrumentation@0.57.2_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-ssr] (ecmascript) <facade>");
/** Exported only for tests. */ const INSTRUMENTED = {};
/**
 * Instrument an OpenTelemetry instrumentation once.
 * This will skip running instrumentation again if it was already instrumented.
 */ function generateInstrumentOnce(name, // eslint-disable-next-line @typescript-eslint/no-explicit-any
creatorOrClass, optionsCallback) {
    if (optionsCallback) {
        return _generateInstrumentOnceWithOptions(name, creatorOrClass, optionsCallback);
    }
    return _generateInstrumentOnce(name, creatorOrClass);
}
// The plain version without handling of options
// Should not be used with custom options that are mutated in the creator!
function _generateInstrumentOnce(name, creator) {
    return Object.assign((options)=>{
        const instrumented = INSTRUMENTED[name];
        if (instrumented) {
            // If options are provided, ensure we update them
            if (options) {
                instrumented.setConfig(options);
            }
            return instrumented;
        }
        const instrumentation$1 = creator(options);
        INSTRUMENTED[name] = instrumentation$1;
        instrumentation.registerInstrumentations({
            instrumentations: [
                instrumentation$1
            ]
        });
        return instrumentation$1;
    }, {
        id: name
    });
}
// This version handles options properly
function _generateInstrumentOnceWithOptions(name, instrumentationClass, optionsCallback) {
    return Object.assign((_options)=>{
        const options = optionsCallback(_options);
        const instrumented = INSTRUMENTED[name];
        if (instrumented) {
            // Ensure we update options
            instrumented.setConfig(options);
            return instrumented;
        }
        const instrumentation$1 = new instrumentationClass(options);
        INSTRUMENTED[name] = instrumentation$1;
        instrumentation.registerInstrumentations({
            instrumentations: [
                instrumentation$1
            ]
        });
        return instrumentation$1;
    }, {
        id: name
    });
}
/**
 * Ensure a given callback is called when the instrumentation is actually wrapping something.
 * This can be used to ensure some logic is only called when the instrumentation is actually active.
 *
 * This function returns a function that can be invoked with a callback.
 * This callback will either be invoked immediately
 * (e.g. if the instrumentation was already wrapped, or if _wrap could not be patched),
 * or once the instrumentation is actually wrapping something.
 *
 * Make sure to call this function right after adding the instrumentation, otherwise it may be too late!
 * The returned callback can be used any time, and also multiple times.
 */ function instrumentWhenWrapped(instrumentation) {
    let isWrapped = false;
    let callbacks = [];
    if (!hasWrap(instrumentation)) {
        isWrapped = true;
    } else {
        const originalWrap = instrumentation['_wrap'];
        instrumentation['_wrap'] = (...args)=>{
            isWrapped = true;
            callbacks.forEach((callback)=>callback());
            callbacks = [];
            return originalWrap(...args);
        };
    }
    const registerCallback = (callback)=>{
        if (isWrapped) {
            callback();
        } else {
            callbacks.push(callback);
        }
    };
    return registerCallback;
}
function hasWrap(instrumentation) {
    return typeof instrumentation['_wrap'] === 'function';
}
exports.INSTRUMENTED = INSTRUMENTED;
exports.generateInstrumentOnce = generateInstrumentOnce;
exports.instrumentWhenWrapped = instrumentWhenWrapped; //# sourceMappingURL=instrument.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/debug-build.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
/**
 * This serves as a build time flag that will be true by default, but false in non-debug builds or if users replace `__SENTRY_DEBUG__` in their generated code.
 *
 * ATTENTION: This constant must never cross package boundaries (i.e. be exported) to guarantee that it can be used for tree shaking.
 */ const DEBUG_BUILD = typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__;
exports.DEBUG_BUILD = DEBUG_BUILD; //# sourceMappingURL=debug-build.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/baggage.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
/**
 * Merge two baggage headers into one, where the existing one takes precedence.
 * The order of the existing baggage will be preserved, and new entries will be added to the end.
 */ function mergeBaggageHeaders(existing, baggage) {
    if (!existing) {
        return baggage;
    }
    const existingBaggageEntries = core.parseBaggageHeader(existing);
    const newBaggageEntries = core.parseBaggageHeader(baggage);
    if (!newBaggageEntries) {
        return existing;
    }
    // Existing entries take precedence, ensuring order remains stable for minimal changes
    const mergedBaggageEntries = {
        ...existingBaggageEntries
    };
    Object.entries(newBaggageEntries).forEach(([key, value])=>{
        if (!mergedBaggageEntries[key]) {
            mergedBaggageEntries[key] = value;
        }
    });
    return core.objectToBaggageHeader(mergedBaggageEntries);
}
exports.mergeBaggageHeaders = mergeBaggageHeaders; //# sourceMappingURL=baggage.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/getRequestUrl.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
/** Build a full URL from request options. */ function getRequestUrl(requestOptions) {
    const protocol = requestOptions.protocol || '';
    const hostname = requestOptions.hostname || requestOptions.host || '';
    // Don't log standard :80 (http) and :443 (https) ports to reduce the noise
    // Also don't add port if the hostname already includes a port
    const port = !requestOptions.port || requestOptions.port === 80 || requestOptions.port === 443 || /^(.*):(\d+)$/.test(hostname) ? '' : `:${requestOptions.port}`;
    const path = requestOptions.path ? requestOptions.path : '/';
    return `${protocol}//${hostname}${port}${path}`;
}
exports.getRequestUrl = getRequestUrl; //# sourceMappingURL=getRequestUrl.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/http/SentryHttpInstrumentation.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const diagnosticsChannel = require("node:diagnostics_channel");
const api = require("@opentelemetry/api");
const core$1 = __turbopack_require__("[project]/node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/index.js [app-ssr] (ecmascript) <facade>");
const instrumentation = __turbopack_require__("[project]/node_modules/.pnpm/@opentelemetry+instrumentation@0.57.2_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-ssr] (ecmascript) <facade>");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const opentelemetry = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+opentelemetry@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30_o5xloretc4oxncwjv67h3aqgxy/node_modules/@sentry/opentelemetry/build/cjs/index.js [app-ssr] (ecmascript)");
const debugBuild = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/debug-build.js [app-ssr] (ecmascript)");
const baggage = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/baggage.js [app-ssr] (ecmascript)");
const getRequestUrl = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/getRequestUrl.js [app-ssr] (ecmascript)");
const INSTRUMENTATION_NAME = '@sentry/instrumentation-http';
// We only want to capture request bodies up to 1mb.
const MAX_BODY_BYTE_LENGTH = 1024 * 1024;
/**
 * This custom HTTP instrumentation is used to isolate incoming requests and annotate them with additional information.
 * It does not emit any spans.
 *
 * The reason this is isolated from the OpenTelemetry instrumentation is that users may overwrite this,
 * which would lead to Sentry not working as expected.
 *
 * Important note: Contrary to other OTEL instrumentation, this one cannot be unwrapped.
 * It only does minimal things though and does not emit any spans.
 *
 * This is heavily inspired & adapted from:
 * https://github.com/open-telemetry/opentelemetry-js/blob/f8ab5592ddea5cba0a3b33bf8d74f27872c0367f/experimental/packages/opentelemetry-instrumentation-http/src/http.ts
 */ class SentryHttpInstrumentation extends instrumentation.InstrumentationBase {
    constructor(config = {}){
        super(INSTRUMENTATION_NAME, core.SDK_VERSION, config);
        this._propagationDecisionMap = new core.LRUMap(100);
        this._ignoreOutgoingRequestsMap = new WeakMap();
    }
    /** @inheritdoc */ init() {
        // We register handlers when either http or https is instrumented
        // but we only want to register them once, whichever is loaded first
        let hasRegisteredHandlers = false;
        const onHttpServerRequestStart = (_data)=>{
            const data = _data;
            this._patchServerEmitOnce(data.server);
        };
        const onHttpClientResponseFinish = (_data)=>{
            const data = _data;
            this._onOutgoingRequestFinish(data.request, data.response);
        };
        const onHttpClientRequestError = (_data)=>{
            const data = _data;
            this._onOutgoingRequestFinish(data.request, undefined);
        };
        const onHttpClientRequestCreated = (_data)=>{
            const data = _data;
            this._onOutgoingRequestCreated(data.request);
        };
        const wrap = (moduleExports)=>{
            if (hasRegisteredHandlers) {
                return moduleExports;
            }
            hasRegisteredHandlers = true;
            diagnosticsChannel.subscribe('http.server.request.start', onHttpServerRequestStart);
            diagnosticsChannel.subscribe('http.client.response.finish', onHttpClientResponseFinish);
            // When an error happens, we still want to have a breadcrumb
            // In this case, `http.client.response.finish` is not triggered
            diagnosticsChannel.subscribe('http.client.request.error', onHttpClientRequestError);
            // NOTE: This channel only exist since Node 22
            // Before that, outgoing requests are not patched
            // and trace headers are not propagated, sadly.
            if (this.getConfig().propagateTraceInOutgoingRequests) {
                diagnosticsChannel.subscribe('http.client.request.created', onHttpClientRequestCreated);
            }
            return moduleExports;
        };
        const unwrap = ()=>{
            diagnosticsChannel.unsubscribe('http.server.request.start', onHttpServerRequestStart);
            diagnosticsChannel.unsubscribe('http.client.response.finish', onHttpClientResponseFinish);
            diagnosticsChannel.unsubscribe('http.client.request.error', onHttpClientRequestError);
            diagnosticsChannel.unsubscribe('http.client.request.created', onHttpClientRequestCreated);
        };
        /**
     * You may be wondering why we register these diagnostics-channel listeners
     * in such a convoluted way (as InstrumentationNodeModuleDefinition...)˝,
     * instead of simply subscribing to the events once in here.
     * The reason for this is timing semantics: These functions are called once the http or https module is loaded.
     * If we'd subscribe before that, there seem to be conflicts with the OTEL native instrumentation in some scenarios,
     * especially the "import-on-top" pattern of setting up ESM applications.
     */ return [
            new instrumentation.InstrumentationNodeModuleDefinition('http', [
                '*'
            ], wrap, unwrap),
            new instrumentation.InstrumentationNodeModuleDefinition('https', [
                '*'
            ], wrap, unwrap)
        ];
    }
    /**
   * This is triggered when an outgoing request finishes.
   * It has access to the final request and response objects.
   */ _onOutgoingRequestFinish(request, response) {
        debugBuild.DEBUG_BUILD && core.logger.log(INSTRUMENTATION_NAME, 'Handling finished outgoing request');
        const _breadcrumbs = this.getConfig().breadcrumbs;
        const breadCrumbsEnabled = typeof _breadcrumbs === 'undefined' ? true : _breadcrumbs;
        // Note: We cannot rely on the map being set by `_onOutgoingRequestCreated`, because that is not run in Node <22
        const shouldIgnore = this._ignoreOutgoingRequestsMap.get(request) ?? this._shouldIgnoreOutgoingRequest(request);
        this._ignoreOutgoingRequestsMap.set(request, shouldIgnore);
        if (breadCrumbsEnabled && !shouldIgnore) {
            addRequestBreadcrumb(request, response);
        }
    }
    /**
   * This is triggered when an outgoing request is created.
   * It has access to the request object, and can mutate it before the request is sent.
   */ _onOutgoingRequestCreated(request) {
        const shouldIgnore = this._ignoreOutgoingRequestsMap.get(request) ?? this._shouldIgnoreOutgoingRequest(request);
        this._ignoreOutgoingRequestsMap.set(request, shouldIgnore);
        if (shouldIgnore) {
            return;
        }
        // Add trace propagation headers
        const url = getRequestUrl.getRequestUrl(request);
        // Manually add the trace headers, if it applies
        // Note: We do not use `propagation.inject()` here, because our propagator relies on an active span
        // Which we do not have in this case
        const tracePropagationTargets = core.getClient()?.getOptions().tracePropagationTargets;
        const addedHeaders = opentelemetry.shouldPropagateTraceForUrl(url, tracePropagationTargets, this._propagationDecisionMap) ? core.getTraceData() : undefined;
        if (!addedHeaders) {
            return;
        }
        const { 'sentry-trace': sentryTrace, baggage: baggage$1 } = addedHeaders;
        // We do not want to overwrite existing header here, if it was already set
        if (sentryTrace && !request.getHeader('sentry-trace')) {
            try {
                request.setHeader('sentry-trace', sentryTrace);
                debugBuild.DEBUG_BUILD && core.logger.log(INSTRUMENTATION_NAME, 'Added sentry-trace header to outgoing request');
            } catch (error) {
                debugBuild.DEBUG_BUILD && core.logger.error(INSTRUMENTATION_NAME, 'Failed to add sentry-trace header to outgoing request:', core.isError(error) ? error.message : 'Unknown error');
            }
        }
        if (baggage$1) {
            // For baggage, we make sure to merge this into a possibly existing header
            const newBaggage = baggage.mergeBaggageHeaders(request.getHeader('baggage'), baggage$1);
            if (newBaggage) {
                try {
                    request.setHeader('baggage', newBaggage);
                    debugBuild.DEBUG_BUILD && core.logger.log(INSTRUMENTATION_NAME, 'Added baggage header to outgoing request');
                } catch (error) {
                    debugBuild.DEBUG_BUILD && core.logger.error(INSTRUMENTATION_NAME, 'Failed to add baggage header to outgoing request:', core.isError(error) ? error.message : 'Unknown error');
                }
            }
        }
    }
    /**
   * Patch a server.emit function to handle process isolation for incoming requests.
   * This will only patch the emit function if it was not already patched.
   */ _patchServerEmitOnce(server) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const originalEmit = server.emit;
        // This means it was already patched, do nothing
        if (originalEmit.__sentry_patched__) {
            return;
        }
        debugBuild.DEBUG_BUILD && core.logger.log(INSTRUMENTATION_NAME, 'Patching server.emit');
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const instrumentation = this;
        const { ignoreIncomingRequestBody, maxIncomingRequestBodySize = 'medium' } = instrumentation.getConfig();
        const newEmit = new Proxy(originalEmit, {
            apply (target, thisArg, args) {
                // Only traces request events
                if (args[0] !== 'request') {
                    return target.apply(thisArg, args);
                }
                debugBuild.DEBUG_BUILD && core.logger.log(INSTRUMENTATION_NAME, 'Handling incoming request');
                const isolationScope = core.getIsolationScope().clone();
                const request = args[1];
                const response = args[2];
                const normalizedRequest = core.httpRequestToRequestData(request);
                // request.ip is non-standard but some frameworks set this
                const ipAddress = request.ip || request.socket?.remoteAddress;
                const url = request.url || '/';
                if (!ignoreIncomingRequestBody?.(url, request) && maxIncomingRequestBodySize !== 'none') {
                    patchRequestToCaptureBody(request, isolationScope, maxIncomingRequestBodySize);
                }
                // Update the isolation scope, isolate this request
                isolationScope.setSDKProcessingMetadata({
                    normalizedRequest,
                    ipAddress
                });
                // attempt to update the scope's `transactionName` based on the request URL
                // Ideally, framework instrumentations coming after the HttpInstrumentation
                // update the transactionName once we get a parameterized route.
                const httpMethod = (request.method || 'GET').toUpperCase();
                const httpTarget = core.stripUrlQueryAndFragment(url);
                const bestEffortTransactionName = `${httpMethod} ${httpTarget}`;
                isolationScope.setTransactionName(bestEffortTransactionName);
                if (instrumentation.getConfig().trackIncomingRequestsAsSessions !== false) {
                    recordRequestSession({
                        requestIsolationScope: isolationScope,
                        response,
                        sessionFlushingDelayMS: instrumentation.getConfig().sessionFlushingDelayMS ?? 60000
                    });
                }
                return core.withIsolationScope(isolationScope, ()=>{
                    // Set a new propagationSpanId for this request
                    // We rely on the fact that `withIsolationScope()` will implicitly also fork the current scope
                    // This way we can save an "unnecessary" `withScope()` invocation
                    core.getCurrentScope().getPropagationContext().propagationSpanId = core.generateSpanId();
                    // If we don't want to extract the trace from the header, we can skip this
                    if (!instrumentation.getConfig().extractIncomingTraceFromHeader) {
                        return target.apply(thisArg, args);
                    }
                    const ctx = api.propagation.extract(api.context.active(), normalizedRequest.headers);
                    return api.context.with(ctx, ()=>{
                        return target.apply(thisArg, args);
                    });
                });
            }
        });
        core.addNonEnumerableProperty(newEmit, '__sentry_patched__', true);
        server.emit = newEmit;
    }
    /**
   * Check if the given outgoing request should be ignored.
   */ _shouldIgnoreOutgoingRequest(request) {
        if (core$1.isTracingSuppressed(api.context.active())) {
            return true;
        }
        const ignoreOutgoingRequests = this.getConfig().ignoreOutgoingRequests;
        if (!ignoreOutgoingRequests) {
            return false;
        }
        const options = getRequestOptions(request);
        const url = getRequestUrl.getRequestUrl(request);
        return ignoreOutgoingRequests(url, options);
    }
}
/** Add a breadcrumb for outgoing requests. */ function addRequestBreadcrumb(request, response) {
    const data = getBreadcrumbData(request);
    const statusCode = response?.statusCode;
    const level = core.getBreadcrumbLogLevelFromHttpStatusCode(statusCode);
    core.addBreadcrumb({
        category: 'http',
        data: {
            status_code: statusCode,
            ...data
        },
        type: 'http',
        level
    }, {
        event: 'response',
        request,
        response
    });
}
function getBreadcrumbData(request) {
    try {
        // `request.host` does not contain the port, but the host header does
        const host = request.getHeader('host') || request.host;
        const url = new URL(request.path, `${request.protocol}//${host}`);
        const parsedUrl = core.parseUrl(url.toString());
        const data = {
            url: core.getSanitizedUrlString(parsedUrl),
            'http.method': request.method || 'GET'
        };
        if (parsedUrl.search) {
            data['http.query'] = parsedUrl.search;
        }
        if (parsedUrl.hash) {
            data['http.fragment'] = parsedUrl.hash;
        }
        return data;
    } catch  {
        return {};
    }
}
/**
 * This method patches the request object to capture the body.
 * Instead of actually consuming the streamed body ourselves, which has potential side effects,
 * we monkey patch `req.on('data')` to intercept the body chunks.
 * This way, we only read the body if the user also consumes the body, ensuring we do not change any behavior in unexpected ways.
 */ function patchRequestToCaptureBody(req, isolationScope, maxIncomingRequestBodySize) {
    let bodyByteLength = 0;
    const chunks = [];
    debugBuild.DEBUG_BUILD && core.logger.log(INSTRUMENTATION_NAME, 'Patching request.on');
    /**
   * We need to keep track of the original callbacks, in order to be able to remove listeners again.
   * Since `off` depends on having the exact same function reference passed in, we need to be able to map
   * original listeners to our wrapped ones.
   */ const callbackMap = new WeakMap();
    const maxBodySize = maxIncomingRequestBodySize === 'small' ? 1000 : maxIncomingRequestBodySize === 'medium' ? 10000 : MAX_BODY_BYTE_LENGTH;
    try {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        req.on = new Proxy(req.on, {
            apply: (target, thisArg, args)=>{
                const [event, listener, ...restArgs] = args;
                if (event === 'data') {
                    debugBuild.DEBUG_BUILD && core.logger.log(INSTRUMENTATION_NAME, `Handling request.on("data") with maximum body size of ${maxBodySize}b`);
                    const callback = new Proxy(listener, {
                        apply: (target, thisArg, args)=>{
                            try {
                                const chunk = args[0];
                                const bufferifiedChunk = Buffer.from(chunk);
                                if (bodyByteLength < maxBodySize) {
                                    chunks.push(bufferifiedChunk);
                                    bodyByteLength += bufferifiedChunk.byteLength;
                                } else if (debugBuild.DEBUG_BUILD) {
                                    core.logger.log(INSTRUMENTATION_NAME, `Dropping request body chunk because maximum body length of ${maxBodySize}b is exceeded.`);
                                }
                            } catch (err) {
                                debugBuild.DEBUG_BUILD && core.logger.error(INSTRUMENTATION_NAME, 'Encountered error while storing body chunk.');
                            }
                            return Reflect.apply(target, thisArg, args);
                        }
                    });
                    callbackMap.set(listener, callback);
                    return Reflect.apply(target, thisArg, [
                        event,
                        callback,
                        ...restArgs
                    ]);
                }
                return Reflect.apply(target, thisArg, args);
            }
        });
        // Ensure we also remove callbacks correctly
        // eslint-disable-next-line @typescript-eslint/unbound-method
        req.off = new Proxy(req.off, {
            apply: (target, thisArg, args)=>{
                const [, listener] = args;
                const callback = callbackMap.get(listener);
                if (callback) {
                    callbackMap.delete(listener);
                    const modifiedArgs = args.slice();
                    modifiedArgs[1] = callback;
                    return Reflect.apply(target, thisArg, modifiedArgs);
                }
                return Reflect.apply(target, thisArg, args);
            }
        });
        req.on('end', ()=>{
            try {
                const body = Buffer.concat(chunks).toString('utf-8');
                if (body) {
                    // Using Buffer.byteLength here, because the body may contain characters that are not 1 byte long
                    const bodyByteLength = Buffer.byteLength(body, 'utf-8');
                    const truncatedBody = bodyByteLength > maxBodySize ? `${Buffer.from(body).subarray(0, maxBodySize - 3).toString('utf-8')}...` : body;
                    isolationScope.setSDKProcessingMetadata({
                        normalizedRequest: {
                            data: truncatedBody
                        }
                    });
                }
            } catch (error) {
                if (debugBuild.DEBUG_BUILD) {
                    core.logger.error(INSTRUMENTATION_NAME, 'Error building captured request body', error);
                }
            }
        });
    } catch (error) {
        if (debugBuild.DEBUG_BUILD) {
            core.logger.error(INSTRUMENTATION_NAME, 'Error patching request to capture body', error);
        }
    }
}
function getRequestOptions(request) {
    return {
        method: request.method,
        protocol: request.protocol,
        host: request.host,
        hostname: request.host,
        path: request.path,
        headers: request.getHeaders()
    };
}
/**
 * Starts a session and tracks it in the context of a given isolation scope.
 * When the passed response is finished, the session is put into a task and is
 * aggregated with other sessions that may happen in a certain time window
 * (sessionFlushingDelayMs).
 *
 * The sessions are always aggregated by the client that is on the current scope
 * at the time of ending the response (if there is one).
 */ // Exported for unit tests
function recordRequestSession({ requestIsolationScope, response, sessionFlushingDelayMS }) {
    requestIsolationScope.setSDKProcessingMetadata({
        requestSession: {
            status: 'ok'
        }
    });
    response.once('close', ()=>{
        // We need to grab the client off the current scope instead of the isolation scope because the isolation scope doesn't hold any client out of the box.
        const client = core.getClient();
        const requestSession = requestIsolationScope.getScopeData().sdkProcessingMetadata.requestSession;
        if (client && requestSession) {
            debugBuild.DEBUG_BUILD && core.logger.debug(`Recorded request session with status: ${requestSession.status}`);
            const roundedDate = new Date();
            roundedDate.setSeconds(0, 0);
            const dateBucketKey = roundedDate.toISOString();
            const existingClientAggregate = clientToRequestSessionAggregatesMap.get(client);
            const bucket = existingClientAggregate?.[dateBucketKey] || {
                exited: 0,
                crashed: 0,
                errored: 0
            };
            bucket[({
                ok: 'exited',
                crashed: 'crashed',
                errored: 'errored'
            })[requestSession.status]]++;
            if (existingClientAggregate) {
                existingClientAggregate[dateBucketKey] = bucket;
            } else {
                debugBuild.DEBUG_BUILD && core.logger.debug('Opened new request session aggregate.');
                const newClientAggregate = {
                    [dateBucketKey]: bucket
                };
                clientToRequestSessionAggregatesMap.set(client, newClientAggregate);
                const flushPendingClientAggregates = ()=>{
                    clearTimeout(timeout);
                    unregisterClientFlushHook();
                    clientToRequestSessionAggregatesMap.delete(client);
                    const aggregatePayload = Object.entries(newClientAggregate).map(([timestamp, value])=>({
                            started: timestamp,
                            exited: value.exited,
                            errored: value.errored,
                            crashed: value.crashed
                        }));
                    client.sendSession({
                        aggregates: aggregatePayload
                    });
                };
                const unregisterClientFlushHook = client.on('flush', ()=>{
                    debugBuild.DEBUG_BUILD && core.logger.debug('Sending request session aggregate due to client flush');
                    flushPendingClientAggregates();
                });
                const timeout = setTimeout(()=>{
                    debugBuild.DEBUG_BUILD && core.logger.debug('Sending request session aggregate due to flushing schedule');
                    flushPendingClientAggregates();
                }, sessionFlushingDelayMS).unref();
            }
        }
    });
}
const clientToRequestSessionAggregatesMap = new Map();
exports.SentryHttpInstrumentation = SentryHttpInstrumentation;
exports.recordRequestSession = recordRequestSession; //# sourceMappingURL=SentryHttpInstrumentation.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/http/index.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const instrument = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/otel/instrument.js [app-ssr] (ecmascript)");
const SentryHttpInstrumentation = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/http/SentryHttpInstrumentation.js [app-ssr] (ecmascript)");
const INTEGRATION_NAME = 'Http';
const instrumentSentryHttp = instrument.generateInstrumentOnce(`${INTEGRATION_NAME}.sentry`, (options)=>{
    return new SentryHttpInstrumentation.SentryHttpInstrumentation(options);
});
/**
 * The http integration instruments Node's internal http and https modules.
 * It creates breadcrumbs for outgoing HTTP requests which will be attached to the currently active span.
 */ const httpIntegration = core.defineIntegration((options = {})=>{
    const dropSpansForIncomingRequestStatusCodes = options.dropSpansForIncomingRequestStatusCodes ?? [
        404
    ];
    return {
        name: INTEGRATION_NAME,
        setupOnce () {
            instrumentSentryHttp({
                ...options,
                extractIncomingTraceFromHeader: true,
                propagateTraceInOutgoingRequests: true
            });
        },
        processEvent (event) {
            // Drop transaction if it has a status code that should be ignored
            if (event.type === 'transaction') {
                const statusCode = event.contexts?.trace?.data?.['http.response.status_code'];
                if (typeof statusCode === 'number' && dropSpansForIncomingRequestStatusCodes.some((code)=>{
                    if (typeof code === 'number') {
                        return code === statusCode;
                    }
                    const [min, max] = code;
                    return statusCode >= min && statusCode <= max;
                })) {
                    return null;
                }
            }
            return event;
        }
    };
});
exports.httpIntegration = httpIntegration; //# sourceMappingURL=index.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/nodeVersion.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const NODE_VERSION = core.parseSemver(process.versions.node);
const NODE_MAJOR = NODE_VERSION.major;
const NODE_MINOR = NODE_VERSION.minor;
exports.NODE_MAJOR = NODE_MAJOR;
exports.NODE_MINOR = NODE_MINOR;
exports.NODE_VERSION = NODE_VERSION; //# sourceMappingURL=nodeVersion.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/node-fetch/SentryNodeFetchInstrumentation.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const api = require("@opentelemetry/api");
const core$1 = __turbopack_require__("[project]/node_modules/.pnpm/@opentelemetry+core@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/core/build/esm/index.js [app-ssr] (ecmascript) <facade>");
const instrumentation = __turbopack_require__("[project]/node_modules/.pnpm/@opentelemetry+instrumentation@0.57.2_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-ssr] (ecmascript) <facade>");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const opentelemetry = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+opentelemetry@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30_o5xloretc4oxncwjv67h3aqgxy/node_modules/@sentry/opentelemetry/build/cjs/index.js [app-ssr] (ecmascript)");
const diagch = require("diagnostics_channel");
const nodeVersion = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/nodeVersion.js [app-ssr] (ecmascript)");
const baggage = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/baggage.js [app-ssr] (ecmascript)");
const SENTRY_TRACE_HEADER = 'sentry-trace';
const SENTRY_BAGGAGE_HEADER = 'baggage';
// For baggage, we make sure to merge this into a possibly existing header
const BAGGAGE_HEADER_REGEX = /baggage: (.*)\r\n/;
/**
 * This custom node-fetch instrumentation is used to instrument outgoing fetch requests.
 * It does not emit any spans.
 *
 * The reason this is isolated from the OpenTelemetry instrumentation is that users may overwrite this,
 * which would lead to Sentry not working as expected.
 *
 * This is heavily inspired & adapted from:
 * https://github.com/open-telemetry/opentelemetry-js-contrib/blob/28e209a9da36bc4e1f8c2b0db7360170ed46cb80/plugins/node/instrumentation-undici/src/undici.ts
 */ class SentryNodeFetchInstrumentation extends instrumentation.InstrumentationBase {
    // Keep ref to avoid https://github.com/nodejs/node/issues/42170 bug and for
    // unsubscribing.
    constructor(config = {}){
        super('@sentry/instrumentation-node-fetch', core.SDK_VERSION, config);
        this._channelSubs = [];
        this._propagationDecisionMap = new core.LRUMap(100);
        this._ignoreOutgoingRequestsMap = new WeakMap();
    }
    /** No need to instrument files/modules. */ init() {
        return undefined;
    }
    /** Disable the instrumentation. */ disable() {
        super.disable();
        this._channelSubs.forEach((sub)=>sub.unsubscribe());
        this._channelSubs = [];
    }
    /** Enable the instrumentation. */ enable() {
        // "enabled" handling is currently a bit messy with InstrumentationBase.
        // If constructed with `{enabled: false}`, this `.enable()` is still called,
        // and `this.getConfig().enabled !== this.isEnabled()`, creating confusion.
        //
        // For now, this class will setup for instrumenting if `.enable()` is
        // called, but use `this.getConfig().enabled` to determine if
        // instrumentation should be generated. This covers the more likely common
        // case of config being given a construction time, rather than later via
        // `instance.enable()`, `.disable()`, or `.setConfig()` calls.
        super.enable();
        // This method is called by the super-class constructor before ours is
        // called. So we need to ensure the property is initalized.
        this._channelSubs = this._channelSubs || [];
        // Avoid to duplicate subscriptions
        if (this._channelSubs.length > 0) {
            return;
        }
        this._subscribeToChannel('undici:request:create', this._onRequestCreated.bind(this));
        this._subscribeToChannel('undici:request:headers', this._onResponseHeaders.bind(this));
    }
    /**
   * This method is called when a request is created.
   * You can still mutate the request here before it is sent.
   */ _onRequestCreated({ request }) {
        const config = this.getConfig();
        const enabled = config.enabled !== false;
        if (!enabled) {
            return;
        }
        const shouldIgnore = this._shouldIgnoreOutgoingRequest(request);
        // We store this decisision for later so we do not need to re-evaluate it
        // Additionally, the active context is not correct in _onResponseHeaders, so we need to make sure it is evaluated here
        this._ignoreOutgoingRequestsMap.set(request, shouldIgnore);
        if (shouldIgnore) {
            return;
        }
        const url = getAbsoluteUrl(request.origin, request.path);
        // Manually add the trace headers, if it applies
        // Note: We do not use `propagation.inject()` here, because our propagator relies on an active span
        // Which we do not have in this case
        // The propagator _may_ overwrite this, but this should be fine as it is the same data
        const tracePropagationTargets = core.getClient()?.getOptions().tracePropagationTargets;
        const addedHeaders = opentelemetry.shouldPropagateTraceForUrl(url, tracePropagationTargets, this._propagationDecisionMap) ? core.getTraceData() : undefined;
        if (!addedHeaders) {
            return;
        }
        const { 'sentry-trace': sentryTrace, baggage: baggage$1 } = addedHeaders;
        // We do not want to overwrite existing headers here
        // If the core UndiciInstrumentation is registered, it will already have set the headers
        // We do not want to add any then
        if (Array.isArray(request.headers)) {
            const requestHeaders = request.headers;
            // We do not want to overwrite existing header here, if it was already set
            if (sentryTrace && !requestHeaders.includes(SENTRY_TRACE_HEADER)) {
                requestHeaders.push(SENTRY_TRACE_HEADER, sentryTrace);
            }
            // For baggage, we make sure to merge this into a possibly existing header
            const existingBaggagePos = requestHeaders.findIndex((header)=>header === SENTRY_BAGGAGE_HEADER);
            if (baggage$1 && existingBaggagePos === -1) {
                requestHeaders.push(SENTRY_BAGGAGE_HEADER, baggage$1);
            } else if (baggage$1) {
                const existingBaggage = requestHeaders[existingBaggagePos + 1];
                const merged = baggage.mergeBaggageHeaders(existingBaggage, baggage$1);
                if (merged) {
                    requestHeaders[existingBaggagePos + 1] = merged;
                }
            }
        } else {
            const requestHeaders = request.headers;
            // We do not want to overwrite existing header here, if it was already set
            if (sentryTrace && !requestHeaders.includes(`${SENTRY_TRACE_HEADER}:`)) {
                request.headers += `${SENTRY_TRACE_HEADER}: ${sentryTrace}\r\n`;
            }
            const existingBaggage = request.headers.match(BAGGAGE_HEADER_REGEX)?.[1];
            if (baggage$1 && !existingBaggage) {
                request.headers += `${SENTRY_BAGGAGE_HEADER}: ${baggage$1}\r\n`;
            } else if (baggage$1) {
                const merged = baggage.mergeBaggageHeaders(existingBaggage, baggage$1);
                if (merged) {
                    request.headers = request.headers.replace(BAGGAGE_HEADER_REGEX, `baggage: ${merged}\r\n`);
                }
            }
        }
    }
    /**
   * This method is called when a response is received.
   */ _onResponseHeaders({ request, response }) {
        const config = this.getConfig();
        const enabled = config.enabled !== false;
        if (!enabled) {
            return;
        }
        const _breadcrumbs = config.breadcrumbs;
        const breadCrumbsEnabled = typeof _breadcrumbs === 'undefined' ? true : _breadcrumbs;
        const shouldIgnore = this._ignoreOutgoingRequestsMap.get(request);
        if (breadCrumbsEnabled && !shouldIgnore) {
            addRequestBreadcrumb(request, response);
        }
    }
    /** Subscribe to a diagnostics channel. */ _subscribeToChannel(diagnosticChannel, onMessage) {
        // `diagnostics_channel` had a ref counting bug until v18.19.0.
        // https://github.com/nodejs/node/pull/47520
        const useNewSubscribe = nodeVersion.NODE_MAJOR > 18 || nodeVersion.NODE_MAJOR === 18 && nodeVersion.NODE_MINOR >= 19;
        let unsubscribe;
        if (useNewSubscribe) {
            diagch.subscribe?.(diagnosticChannel, onMessage);
            unsubscribe = ()=>diagch.unsubscribe?.(diagnosticChannel, onMessage);
        } else {
            const channel = diagch.channel(diagnosticChannel);
            channel.subscribe(onMessage);
            unsubscribe = ()=>channel.unsubscribe(onMessage);
        }
        this._channelSubs.push({
            name: diagnosticChannel,
            unsubscribe
        });
    }
    /**
   * Check if the given outgoing request should be ignored.
   */ _shouldIgnoreOutgoingRequest(request) {
        if (core$1.isTracingSuppressed(api.context.active())) {
            return true;
        }
        // Add trace propagation headers
        const url = getAbsoluteUrl(request.origin, request.path);
        const ignoreOutgoingRequests = this.getConfig().ignoreOutgoingRequests;
        if (typeof ignoreOutgoingRequests !== 'function' || !url) {
            return false;
        }
        return ignoreOutgoingRequests(url);
    }
}
/** Add a breadcrumb for outgoing requests. */ function addRequestBreadcrumb(request, response) {
    const data = getBreadcrumbData(request);
    const statusCode = response.statusCode;
    const level = core.getBreadcrumbLogLevelFromHttpStatusCode(statusCode);
    core.addBreadcrumb({
        category: 'http',
        data: {
            status_code: statusCode,
            ...data
        },
        type: 'http',
        level
    }, {
        event: 'response',
        request,
        response
    });
}
function getBreadcrumbData(request) {
    try {
        const url = getAbsoluteUrl(request.origin, request.path);
        const parsedUrl = core.parseUrl(url);
        const data = {
            url: core.getSanitizedUrlString(parsedUrl),
            'http.method': request.method || 'GET'
        };
        if (parsedUrl.search) {
            data['http.query'] = parsedUrl.search;
        }
        if (parsedUrl.hash) {
            data['http.fragment'] = parsedUrl.hash;
        }
        return data;
    } catch  {
        return {};
    }
}
function getAbsoluteUrl(origin, path = '/') {
    try {
        const url = new URL(path, origin);
        return url.toString();
    } catch  {
        // fallback: Construct it on our own
        const url = `${origin}`;
        if (url.endsWith('/') && path.startsWith('/')) {
            return `${url}${path.slice(1)}`;
        }
        if (!url.endsWith('/') && !path.startsWith('/')) {
            return `${url}/${path.slice(1)}`;
        }
        return `${url}${path}`;
    }
}
exports.SentryNodeFetchInstrumentation = SentryNodeFetchInstrumentation; //# sourceMappingURL=SentryNodeFetchInstrumentation.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/node-fetch/index.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const instrument = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/otel/instrument.js [app-ssr] (ecmascript)");
const SentryNodeFetchInstrumentation = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/node-fetch/SentryNodeFetchInstrumentation.js [app-ssr] (ecmascript)");
const INTEGRATION_NAME = 'NodeFetch';
const instrumentSentryNodeFetch = instrument.generateInstrumentOnce(`${INTEGRATION_NAME}.sentry`, SentryNodeFetchInstrumentation.SentryNodeFetchInstrumentation, (options)=>{
    return options;
});
const _nativeNodeFetchIntegration = (options = {})=>{
    return {
        name: 'NodeFetch',
        setupOnce () {
            instrumentSentryNodeFetch(options);
        }
    };
};
const nativeNodeFetchIntegration = core.defineIntegration(_nativeNodeFetchIntegration);
exports.nativeNodeFetchIntegration = nativeNodeFetchIntegration; //# sourceMappingURL=index.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/context.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const node_child_process = require("node:child_process");
const node_fs = require("node:fs");
const os = require("node:os");
const node_path = require("node:path");
const node_util = require("node:util");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
/* eslint-disable max-lines */ const readFileAsync = node_util.promisify(node_fs.readFile);
const readDirAsync = node_util.promisify(node_fs.readdir);
// Process enhanced with methods from Node 18, 20, 22 as @types/node
// is on `14.18.0` to match minimum version requirements of the SDK
const INTEGRATION_NAME = 'Context';
const _nodeContextIntegration = (options = {})=>{
    let cachedContext;
    const _options = {
        app: true,
        os: true,
        device: true,
        culture: true,
        cloudResource: true,
        ...options
    };
    /** Add contexts to the event. Caches the context so we only look it up once. */ async function addContext(event) {
        if (cachedContext === undefined) {
            cachedContext = _getContexts();
        }
        const updatedContext = _updateContext(await cachedContext);
        // TODO(v10): conditional with `sendDefaultPii` here?
        event.contexts = {
            ...event.contexts,
            app: {
                ...updatedContext.app,
                ...event.contexts?.app
            },
            os: {
                ...updatedContext.os,
                ...event.contexts?.os
            },
            device: {
                ...updatedContext.device,
                ...event.contexts?.device
            },
            culture: {
                ...updatedContext.culture,
                ...event.contexts?.culture
            },
            cloud_resource: {
                ...updatedContext.cloud_resource,
                ...event.contexts?.cloud_resource
            }
        };
        return event;
    }
    /** Get the contexts from node. */ async function _getContexts() {
        const contexts = {};
        if (_options.os) {
            contexts.os = await getOsContext();
        }
        if (_options.app) {
            contexts.app = getAppContext();
        }
        if (_options.device) {
            contexts.device = getDeviceContext(_options.device);
        }
        if (_options.culture) {
            const culture = getCultureContext();
            if (culture) {
                contexts.culture = culture;
            }
        }
        if (_options.cloudResource) {
            contexts.cloud_resource = getCloudResourceContext();
        }
        return contexts;
    }
    return {
        name: INTEGRATION_NAME,
        processEvent (event) {
            return addContext(event);
        }
    };
};
/**
 * Capture context about the environment and the device that the client is running on, to events.
 */ const nodeContextIntegration = core.defineIntegration(_nodeContextIntegration);
/**
 * Updates the context with dynamic values that can change
 */ function _updateContext(contexts) {
    // Only update properties if they exist
    if (contexts.app?.app_memory) {
        contexts.app.app_memory = process.memoryUsage().rss;
    }
    if (contexts.app?.free_memory && typeof process.availableMemory === 'function') {
        const freeMemory = process.availableMemory?.();
        if (freeMemory != null) {
            contexts.app.free_memory = freeMemory;
        }
    }
    if (contexts.device?.free_memory) {
        contexts.device.free_memory = os.freemem();
    }
    return contexts;
}
/**
 * Returns the operating system context.
 *
 * Based on the current platform, this uses a different strategy to provide the
 * most accurate OS information. Since this might involve spawning subprocesses
 * or accessing the file system, this should only be executed lazily and cached.
 *
 *  - On macOS (Darwin), this will execute the `sw_vers` utility. The context
 *    has a `name`, `version`, `build` and `kernel_version` set.
 *  - On Linux, this will try to load a distribution release from `/etc` and set
 *    the `name`, `version` and `kernel_version` fields.
 *  - On all other platforms, only a `name` and `version` will be returned. Note
 *    that `version` might actually be the kernel version.
 */ async function getOsContext() {
    const platformId = os.platform();
    switch(platformId){
        case 'darwin':
            return getDarwinInfo();
        case 'linux':
            return getLinuxInfo();
        default:
            return {
                name: PLATFORM_NAMES[platformId] || platformId,
                version: os.release()
            };
    }
}
function getCultureContext() {
    try {
        if (typeof process.versions.icu !== 'string') {
            // Node was built without ICU support
            return;
        }
        // Check that node was built with full Intl support. Its possible it was built without support for non-English
        // locales which will make resolvedOptions inaccurate
        //
        // https://nodejs.org/api/intl.html#detecting-internationalization-support
        const january = new Date(9e8);
        const spanish = new Intl.DateTimeFormat('es', {
            month: 'long'
        });
        if (spanish.format(january) === 'enero') {
            const options = Intl.DateTimeFormat().resolvedOptions();
            return {
                locale: options.locale,
                timezone: options.timeZone
            };
        }
    } catch (err) {
    //
    }
    return;
}
/**
 * Get app context information from process
 */ function getAppContext() {
    const app_memory = process.memoryUsage().rss;
    const app_start_time = new Date(Date.now() - process.uptime() * 1000).toISOString();
    // https://nodejs.org/api/process.html#processavailablememory
    const appContext = {
        app_start_time,
        app_memory
    };
    if (typeof process.availableMemory === 'function') {
        const freeMemory = process.availableMemory?.();
        if (freeMemory != null) {
            appContext.free_memory = freeMemory;
        }
    }
    return appContext;
}
/**
 * Gets device information from os
 */ function getDeviceContext(deviceOpt) {
    const device = {};
    // Sometimes os.uptime() throws due to lacking permissions: https://github.com/getsentry/sentry-javascript/issues/8202
    let uptime;
    try {
        uptime = os.uptime();
    } catch (e) {
    // noop
    }
    // os.uptime or its return value seem to be undefined in certain environments (e.g. Azure functions).
    // Hence, we only set boot time, if we get a valid uptime value.
    // @see https://github.com/getsentry/sentry-javascript/issues/5856
    if (typeof uptime === 'number') {
        device.boot_time = new Date(Date.now() - uptime * 1000).toISOString();
    }
    device.arch = os.arch();
    if (deviceOpt === true || deviceOpt.memory) {
        device.memory_size = os.totalmem();
        device.free_memory = os.freemem();
    }
    if (deviceOpt === true || deviceOpt.cpu) {
        const cpuInfo = os.cpus();
        const firstCpu = cpuInfo?.[0];
        if (firstCpu) {
            device.processor_count = cpuInfo.length;
            device.cpu_description = firstCpu.model;
            device.processor_frequency = firstCpu.speed;
        }
    }
    return device;
}
/** Mapping of Node's platform names to actual OS names. */ const PLATFORM_NAMES = {
    aix: 'IBM AIX',
    freebsd: 'FreeBSD',
    openbsd: 'OpenBSD',
    sunos: 'SunOS',
    win32: 'Windows'
};
/** Linux version file to check for a distribution. */ /** Mapping of linux release files located in /etc to distributions. */ const LINUX_DISTROS = [
    {
        name: 'fedora-release',
        distros: [
            'Fedora'
        ]
    },
    {
        name: 'redhat-release',
        distros: [
            'Red Hat Linux',
            'Centos'
        ]
    },
    {
        name: 'redhat_version',
        distros: [
            'Red Hat Linux'
        ]
    },
    {
        name: 'SuSE-release',
        distros: [
            'SUSE Linux'
        ]
    },
    {
        name: 'lsb-release',
        distros: [
            'Ubuntu Linux',
            'Arch Linux'
        ]
    },
    {
        name: 'debian_version',
        distros: [
            'Debian'
        ]
    },
    {
        name: 'debian_release',
        distros: [
            'Debian'
        ]
    },
    {
        name: 'arch-release',
        distros: [
            'Arch Linux'
        ]
    },
    {
        name: 'gentoo-release',
        distros: [
            'Gentoo Linux'
        ]
    },
    {
        name: 'novell-release',
        distros: [
            'SUSE Linux'
        ]
    },
    {
        name: 'alpine-release',
        distros: [
            'Alpine Linux'
        ]
    }
];
/** Functions to extract the OS version from Linux release files. */ const LINUX_VERSIONS = {
    alpine: (content)=>content,
    arch: (content)=>matchFirst(/distrib_release=(.*)/, content),
    centos: (content)=>matchFirst(/release ([^ ]+)/, content),
    debian: (content)=>content,
    fedora: (content)=>matchFirst(/release (..)/, content),
    mint: (content)=>matchFirst(/distrib_release=(.*)/, content),
    red: (content)=>matchFirst(/release ([^ ]+)/, content),
    suse: (content)=>matchFirst(/VERSION = (.*)\n/, content),
    ubuntu: (content)=>matchFirst(/distrib_release=(.*)/, content)
};
/**
 * Executes a regular expression with one capture group.
 *
 * @param regex A regular expression to execute.
 * @param text Content to execute the RegEx on.
 * @returns The captured string if matched; otherwise undefined.
 */ function matchFirst(regex, text) {
    const match = regex.exec(text);
    return match ? match[1] : undefined;
}
/** Loads the macOS operating system context. */ async function getDarwinInfo() {
    // Default values that will be used in case no operating system information
    // can be loaded. The default version is computed via heuristics from the
    // kernel version, but the build ID is missing.
    const darwinInfo = {
        kernel_version: os.release(),
        name: 'Mac OS X',
        version: `10.${Number(os.release().split('.')[0]) - 4}`
    };
    try {
        // We try to load the actual macOS version by executing the `sw_vers` tool.
        // This tool should be available on every standard macOS installation. In
        // case this fails, we stick with the values computed above.
        const output = await new Promise((resolve, reject)=>{
            node_child_process.execFile('/usr/bin/sw_vers', (error, stdout)=>{
                if (error) {
                    reject(error);
                    return;
                }
                resolve(stdout);
            });
        });
        darwinInfo.name = matchFirst(/^ProductName:\s+(.*)$/m, output);
        darwinInfo.version = matchFirst(/^ProductVersion:\s+(.*)$/m, output);
        darwinInfo.build = matchFirst(/^BuildVersion:\s+(.*)$/m, output);
    } catch (e) {
    // ignore
    }
    return darwinInfo;
}
/** Returns a distribution identifier to look up version callbacks. */ function getLinuxDistroId(name) {
    return name.split(' ')[0].toLowerCase();
}
/** Loads the Linux operating system context. */ async function getLinuxInfo() {
    // By default, we cannot assume anything about the distribution or Linux
    // version. `os.release()` returns the kernel version and we assume a generic
    // "Linux" name, which will be replaced down below.
    const linuxInfo = {
        kernel_version: os.release(),
        name: 'Linux'
    };
    try {
        // We start guessing the distribution by listing files in the /etc
        // directory. This is were most Linux distributions (except Knoppix) store
        // release files with certain distribution-dependent meta data. We search
        // for exactly one known file defined in `LINUX_DISTROS` and exit if none
        // are found. In case there are more than one file, we just stick with the
        // first one.
        const etcFiles = await readDirAsync('/etc');
        const distroFile = LINUX_DISTROS.find((file)=>etcFiles.includes(file.name));
        if (!distroFile) {
            return linuxInfo;
        }
        // Once that file is known, load its contents. To make searching in those
        // files easier, we lowercase the file contents. Since these files are
        // usually quite small, this should not allocate too much memory and we only
        // hold on to it for a very short amount of time.
        const distroPath = node_path.join('/etc', distroFile.name);
        const contents = (await readFileAsync(distroPath, {
            encoding: 'utf-8'
        })).toLowerCase();
        // Some Linux distributions store their release information in the same file
        // (e.g. RHEL and Centos). In those cases, we scan the file for an
        // identifier, that basically consists of the first word of the linux
        // distribution name (e.g. "red" for Red Hat). In case there is no match, we
        // just assume the first distribution in our list.
        const { distros } = distroFile;
        linuxInfo.name = distros.find((d)=>contents.indexOf(getLinuxDistroId(d)) >= 0) || distros[0];
        // Based on the found distribution, we can now compute the actual version
        // number. This is different for every distribution, so several strategies
        // are computed in `LINUX_VERSIONS`.
        const id = getLinuxDistroId(linuxInfo.name);
        linuxInfo.version = LINUX_VERSIONS[id]?.(contents);
    } catch (e) {
    // ignore
    }
    return linuxInfo;
}
/**
 * Grabs some information about hosting provider based on best effort.
 */ function getCloudResourceContext() {
    if (process.env.VERCEL) {
        // https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables#system-environment-variables
        return {
            'cloud.provider': 'vercel',
            'cloud.region': process.env.VERCEL_REGION
        };
    } else if (process.env.AWS_REGION) {
        // https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html
        return {
            'cloud.provider': 'aws',
            'cloud.region': process.env.AWS_REGION,
            'cloud.platform': process.env.AWS_EXECUTION_ENV
        };
    } else if (process.env.GCP_PROJECT) {
        // https://cloud.google.com/composer/docs/how-to/managing/environment-variables#reserved_variables
        return {
            'cloud.provider': 'gcp'
        };
    } else if (process.env.ALIYUN_REGION_ID) {
        // TODO: find where I found these environment variables - at least gc.github.com returns something
        return {
            'cloud.provider': 'alibaba_cloud',
            'cloud.region': process.env.ALIYUN_REGION_ID
        };
    } else if (process.env.WEBSITE_SITE_NAME && process.env.REGION_NAME) {
        // https://learn.microsoft.com/en-us/azure/app-service/reference-app-settings?tabs=kudu%2Cdotnet#app-environment
        return {
            'cloud.provider': 'azure',
            'cloud.region': process.env.REGION_NAME
        };
    } else if (process.env.IBM_CLOUD_REGION) {
        // TODO: find where I found these environment variables - at least gc.github.com returns something
        return {
            'cloud.provider': 'ibm_cloud',
            'cloud.region': process.env.IBM_CLOUD_REGION
        };
    } else if (process.env.TENCENTCLOUD_REGION) {
        // https://www.tencentcloud.com/document/product/583/32748
        return {
            'cloud.provider': 'tencent_cloud',
            'cloud.region': process.env.TENCENTCLOUD_REGION,
            'cloud.account.id': process.env.TENCENTCLOUD_APPID,
            'cloud.availability_zone': process.env.TENCENTCLOUD_ZONE
        };
    } else if (process.env.NETLIFY) {
        // https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
        return {
            'cloud.provider': 'netlify'
        };
    } else if (process.env.FLY_REGION) {
        // https://fly.io/docs/reference/runtime-environment/
        return {
            'cloud.provider': 'fly.io',
            'cloud.region': process.env.FLY_REGION
        };
    } else if (process.env.DYNO) {
        // https://devcenter.heroku.com/articles/dynos#local-environment-variables
        return {
            'cloud.provider': 'heroku'
        };
    } else {
        return undefined;
    }
}
exports.getAppContext = getAppContext;
exports.getDeviceContext = getDeviceContext;
exports.nodeContextIntegration = nodeContextIntegration;
exports.readDirAsync = readDirAsync;
exports.readFileAsync = readFileAsync; //# sourceMappingURL=context.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/contextlines.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const node_fs = require("node:fs");
const node_readline = require("node:readline");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const debugBuild = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/debug-build.js [app-ssr] (ecmascript)");
const LRU_FILE_CONTENTS_CACHE = new core.LRUMap(10);
const LRU_FILE_CONTENTS_FS_READ_FAILED = new core.LRUMap(20);
const DEFAULT_LINES_OF_CONTEXT = 7;
const INTEGRATION_NAME = 'ContextLines';
// Determines the upper bound of lineno/colno that we will attempt to read. Large colno values are likely to be
// minified code while large lineno values are likely to be bundled code.
// Exported for testing purposes.
const MAX_CONTEXTLINES_COLNO = 1000;
const MAX_CONTEXTLINES_LINENO = 10000;
/**
 * Get or init map value
 */ function emplace(map, key, contents) {
    const value = map.get(key);
    if (value === undefined) {
        map.set(key, contents);
        return contents;
    }
    return value;
}
/**
 * Determines if context lines should be skipped for a file.
 * - .min.(mjs|cjs|js) files are and not useful since they dont point to the original source
 * - node: prefixed modules are part of the runtime and cannot be resolved to a file
 * - data: skip json, wasm and inline js https://nodejs.org/api/esm.html#data-imports
 */ function shouldSkipContextLinesForFile(path) {
    // Test the most common prefix and extension first. These are the ones we
    // are most likely to see in user applications and are the ones we can break out of first.
    if (path.startsWith('node:')) return true;
    if (path.endsWith('.min.js')) return true;
    if (path.endsWith('.min.cjs')) return true;
    if (path.endsWith('.min.mjs')) return true;
    if (path.startsWith('data:')) return true;
    return false;
}
/**
 * Determines if we should skip contextlines based off the max lineno and colno values.
 */ function shouldSkipContextLinesForFrame(frame) {
    if (frame.lineno !== undefined && frame.lineno > MAX_CONTEXTLINES_LINENO) return true;
    if (frame.colno !== undefined && frame.colno > MAX_CONTEXTLINES_COLNO) return true;
    return false;
}
/**
 * Checks if we have all the contents that we need in the cache.
 */ function rangeExistsInContentCache(file, range) {
    const contents = LRU_FILE_CONTENTS_CACHE.get(file);
    if (contents === undefined) return false;
    for(let i = range[0]; i <= range[1]; i++){
        if (contents[i] === undefined) {
            return false;
        }
    }
    return true;
}
/**
 * Creates contiguous ranges of lines to read from a file. In the case where context lines overlap,
 * the ranges are merged to create a single range.
 */ function makeLineReaderRanges(lines, linecontext) {
    if (!lines.length) {
        return [];
    }
    let i = 0;
    const line = lines[0];
    if (typeof line !== 'number') {
        return [];
    }
    let current = makeContextRange(line, linecontext);
    const out = [];
    // eslint-disable-next-line no-constant-condition
    while(true){
        if (i === lines.length - 1) {
            out.push(current);
            break;
        }
        // If the next line falls into the current range, extend the current range to lineno + linecontext.
        const next = lines[i + 1];
        if (typeof next !== 'number') {
            break;
        }
        if (next <= current[1]) {
            current[1] = next + linecontext;
        } else {
            out.push(current);
            current = makeContextRange(next, linecontext);
        }
        i++;
    }
    return out;
}
/**
 * Extracts lines from a file and stores them in a cache.
 */ function getContextLinesFromFile(path, ranges, output) {
    return new Promise((resolve, _reject)=>{
        // It is important *not* to have any async code between createInterface and the 'line' event listener
        // as it will cause the 'line' event to
        // be emitted before the listener is attached.
        const stream = node_fs.createReadStream(path);
        const lineReaded = node_readline.createInterface({
            input: stream
        });
        // We need to explicitly destroy the stream to prevent memory leaks,
        // removing the listeners on the readline interface is not enough.
        // See: https://github.com/nodejs/node/issues/9002 and https://github.com/getsentry/sentry-javascript/issues/14892
        function destroyStreamAndResolve() {
            stream.destroy();
            resolve();
        }
        // Init at zero and increment at the start of the loop because lines are 1 indexed.
        let lineNumber = 0;
        let currentRangeIndex = 0;
        const range = ranges[currentRangeIndex];
        if (range === undefined) {
            // We should never reach this point, but if we do, we should resolve the promise to prevent it from hanging.
            destroyStreamAndResolve();
            return;
        }
        let rangeStart = range[0];
        let rangeEnd = range[1];
        // We use this inside Promise.all, so we need to resolve the promise even if there is an error
        // to prevent Promise.all from short circuiting the rest.
        function onStreamError(e) {
            // Mark file path as failed to read and prevent multiple read attempts.
            LRU_FILE_CONTENTS_FS_READ_FAILED.set(path, 1);
            debugBuild.DEBUG_BUILD && core.logger.error(`Failed to read file: ${path}. Error: ${e}`);
            lineReaded.close();
            lineReaded.removeAllListeners();
            destroyStreamAndResolve();
        }
        // We need to handle the error event to prevent the process from crashing in < Node 16
        // https://github.com/nodejs/node/pull/31603
        stream.on('error', onStreamError);
        lineReaded.on('error', onStreamError);
        lineReaded.on('close', destroyStreamAndResolve);
        lineReaded.on('line', (line)=>{
            lineNumber++;
            if (lineNumber < rangeStart) return;
            // !Warning: This mutates the cache by storing the snipped line into the cache.
            output[lineNumber] = core.snipLine(line, 0);
            if (lineNumber >= rangeEnd) {
                if (currentRangeIndex === ranges.length - 1) {
                    // We need to close the file stream and remove listeners, else the reader will continue to run our listener;
                    lineReaded.close();
                    lineReaded.removeAllListeners();
                    return;
                }
                currentRangeIndex++;
                const range = ranges[currentRangeIndex];
                if (range === undefined) {
                    // This should never happen as it means we have a bug in the context.
                    lineReaded.close();
                    lineReaded.removeAllListeners();
                    return;
                }
                rangeStart = range[0];
                rangeEnd = range[1];
            }
        });
    });
}
/**
 * Adds surrounding (context) lines of the line that an exception occurred on to the event.
 * This is done by reading the file line by line and extracting the lines. The extracted lines are stored in
 * a cache to prevent multiple reads of the same file. Failures to read a file are similarly cached to prevent multiple
 * failing reads from happening.
 */ /* eslint-disable complexity */ async function addSourceContext(event, contextLines) {
    // keep a lookup map of which files we've already enqueued to read,
    // so we don't enqueue the same file multiple times which would cause multiple i/o reads
    const filesToLines = {};
    if (contextLines > 0 && event.exception?.values) {
        for (const exception of event.exception.values){
            if (!exception.stacktrace?.frames?.length) {
                continue;
            }
            // Maps preserve insertion order, so we iterate in reverse, starting at the
            // outermost frame and closer to where the exception has occurred (poor mans priority)
            for(let i = exception.stacktrace.frames.length - 1; i >= 0; i--){
                const frame = exception.stacktrace.frames[i];
                const filename = frame?.filename;
                if (!frame || typeof filename !== 'string' || typeof frame.lineno !== 'number' || shouldSkipContextLinesForFile(filename) || shouldSkipContextLinesForFrame(frame)) {
                    continue;
                }
                const filesToLinesOutput = filesToLines[filename];
                if (!filesToLinesOutput) filesToLines[filename] = [];
                // @ts-expect-error this is defined above
                filesToLines[filename].push(frame.lineno);
            }
        }
    }
    const files = Object.keys(filesToLines);
    if (files.length == 0) {
        return event;
    }
    const readlinePromises = [];
    for (const file of files){
        // If we failed to read this before, dont try reading it again.
        if (LRU_FILE_CONTENTS_FS_READ_FAILED.get(file)) {
            continue;
        }
        const filesToLineRanges = filesToLines[file];
        if (!filesToLineRanges) {
            continue;
        }
        // Sort ranges so that they are sorted by line increasing order and match how the file is read.
        filesToLineRanges.sort((a, b)=>a - b);
        // Check if the contents are already in the cache and if we can avoid reading the file again.
        const ranges = makeLineReaderRanges(filesToLineRanges, contextLines);
        if (ranges.every((r)=>rangeExistsInContentCache(file, r))) {
            continue;
        }
        const cache = emplace(LRU_FILE_CONTENTS_CACHE, file, {});
        readlinePromises.push(getContextLinesFromFile(file, ranges, cache));
    }
    // The promise rejections are caught in order to prevent them from short circuiting Promise.all
    await Promise.all(readlinePromises).catch(()=>{
        debugBuild.DEBUG_BUILD && core.logger.log('Failed to read one or more source files and resolve context lines');
    });
    // Perform the same loop as above, but this time we can assume all files are in the cache
    // and attempt to add source context to frames.
    if (contextLines > 0 && event.exception?.values) {
        for (const exception of event.exception.values){
            if (exception.stacktrace?.frames && exception.stacktrace.frames.length > 0) {
                addSourceContextToFrames(exception.stacktrace.frames, contextLines, LRU_FILE_CONTENTS_CACHE);
            }
        }
    }
    return event;
}
/* eslint-enable complexity */ /** Adds context lines to frames */ function addSourceContextToFrames(frames, contextLines, cache) {
    for (const frame of frames){
        // Only add context if we have a filename and it hasn't already been added
        if (frame.filename && frame.context_line === undefined && typeof frame.lineno === 'number') {
            const contents = cache.get(frame.filename);
            if (contents === undefined) {
                continue;
            }
            addContextToFrame(frame.lineno, frame, contextLines, contents);
        }
    }
}
/**
 * Clears the context lines from a frame, used to reset a frame to its original state
 * if we fail to resolve all context lines for it.
 */ function clearLineContext(frame) {
    delete frame.pre_context;
    delete frame.context_line;
    delete frame.post_context;
}
/**
 * Resolves context lines before and after the given line number and appends them to the frame;
 */ function addContextToFrame(lineno, frame, contextLines, contents) {
    // When there is no line number in the frame, attaching context is nonsensical and will even break grouping.
    // We already check for lineno before calling this, but since StackFrame lineno ism optional, we check it again.
    if (frame.lineno === undefined || contents === undefined) {
        debugBuild.DEBUG_BUILD && core.logger.error('Cannot resolve context for frame with no lineno or file contents');
        return;
    }
    frame.pre_context = [];
    for(let i = makeRangeStart(lineno, contextLines); i < lineno; i++){
        // We always expect the start context as line numbers cannot be negative. If we dont find a line, then
        // something went wrong somewhere. Clear the context and return without adding any linecontext.
        const line = contents[i];
        if (line === undefined) {
            clearLineContext(frame);
            debugBuild.DEBUG_BUILD && core.logger.error(`Could not find line ${i} in file ${frame.filename}`);
            return;
        }
        frame.pre_context.push(line);
    }
    // We should always have the context line. If we dont, something went wrong, so we clear the context and return
    // without adding any linecontext.
    if (contents[lineno] === undefined) {
        clearLineContext(frame);
        debugBuild.DEBUG_BUILD && core.logger.error(`Could not find line ${lineno} in file ${frame.filename}`);
        return;
    }
    frame.context_line = contents[lineno];
    const end = makeRangeEnd(lineno, contextLines);
    frame.post_context = [];
    for(let i = lineno + 1; i <= end; i++){
        // Since we dont track when the file ends, we cant clear the context if we dont find a line as it could
        // just be that we reached the end of the file.
        const line = contents[i];
        if (line === undefined) {
            break;
        }
        frame.post_context.push(line);
    }
}
// Helper functions for generating line context ranges. They take a line number and the number of lines of context to
// include before and after the line and generate an inclusive range of indices.
// Compute inclusive end context range
function makeRangeStart(line, linecontext) {
    return Math.max(1, line - linecontext);
}
// Compute inclusive start context range
function makeRangeEnd(line, linecontext) {
    return line + linecontext;
}
// Determine start and end indices for context range (inclusive);
function makeContextRange(line, linecontext) {
    return [
        makeRangeStart(line, linecontext),
        makeRangeEnd(line, linecontext)
    ];
}
/** Exported only for tests, as a type-safe variant. */ const _contextLinesIntegration = (options = {})=>{
    const contextLines = options.frameContextLines !== undefined ? options.frameContextLines : DEFAULT_LINES_OF_CONTEXT;
    return {
        name: INTEGRATION_NAME,
        processEvent (event) {
            return addSourceContext(event, contextLines);
        }
    };
};
/**
 * Capture the lines before and after the frame's context.
 */ const contextLinesIntegration = core.defineIntegration(_contextLinesIntegration);
exports.MAX_CONTEXTLINES_COLNO = MAX_CONTEXTLINES_COLNO;
exports.MAX_CONTEXTLINES_LINENO = MAX_CONTEXTLINES_LINENO;
exports._contextLinesIntegration = _contextLinesIntegration;
exports.addContextToFrame = addContextToFrame;
exports.contextLinesIntegration = contextLinesIntegration; //# sourceMappingURL=contextlines.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/debug.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
let cachedDebuggerEnabled;
/**
 * Was the debugger enabled when this function was first called?
 */ async function isDebuggerEnabled() {
    if (cachedDebuggerEnabled === undefined) {
        try {
            // Node can be built without inspector support
            const inspector = await Promise.resolve().then(()=>__turbopack_external_require__('node:inspector', true));
            cachedDebuggerEnabled = !!inspector.url();
        } catch (_) {
            cachedDebuggerEnabled = false;
        }
    }
    return cachedDebuggerEnabled;
}
exports.isDebuggerEnabled = isDebuggerEnabled; //# sourceMappingURL=debug.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/common.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
/**
 * The key used to store the local variables on the error object.
 */ const LOCAL_VARIABLES_KEY = '__SENTRY_ERROR_LOCAL_VARIABLES__';
/**
 * Creates a rate limiter that will call the disable callback when the rate limit is reached and the enable callback
 * when a timeout has occurred.
 * @param maxPerSecond Maximum number of calls per second
 * @param enable Callback to enable capture
 * @param disable Callback to disable capture
 * @returns A function to call to increment the rate limiter count
 */ function createRateLimiter(maxPerSecond, enable, disable) {
    let count = 0;
    let retrySeconds = 5;
    let disabledTimeout = 0;
    setInterval(()=>{
        if (disabledTimeout === 0) {
            if (count > maxPerSecond) {
                retrySeconds *= 2;
                disable(retrySeconds);
                // Cap at one day
                if (retrySeconds > 86400) {
                    retrySeconds = 86400;
                }
                disabledTimeout = retrySeconds;
            }
        } else {
            disabledTimeout -= 1;
            if (disabledTimeout === 0) {
                enable();
            }
        }
        count = 0;
    }, 1000).unref();
    return ()=>{
        count += 1;
    };
}
// Add types for the exception event data
/** Could this be an anonymous function? */ function isAnonymous(name) {
    return name !== undefined && (name.length === 0 || name === '?' || name === '<anonymous>');
}
/** Do the function names appear to match? */ function functionNamesMatch(a, b) {
    return a === b || `Object.${a}` === b || a === `Object.${b}` || isAnonymous(a) && isAnonymous(b);
}
exports.LOCAL_VARIABLES_KEY = LOCAL_VARIABLES_KEY;
exports.createRateLimiter = createRateLimiter;
exports.functionNamesMatch = functionNamesMatch;
exports.isAnonymous = isAnonymous; //# sourceMappingURL=common.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/local-variables-async.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const node_worker_threads = require("node:worker_threads");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const debug = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/debug.js [app-ssr] (ecmascript)");
const common = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/common.js [app-ssr] (ecmascript)");
// This string is a placeholder that gets overwritten with the worker code.
const base64WorkerScript = 'LyohIEBzZW50cnkvbm9kZS1jb3JlIDkuMzcuMCAoOTAxYzcyOSkgfCBodHRwczovL2dpdGh1Yi5jb20vZ2V0c2VudHJ5L3NlbnRyeS1qYXZhc2NyaXB0ICovCmltcG9ydHtTZXNzaW9uIGFzIGV9ZnJvbSJub2RlOmluc3BlY3Rvci9wcm9taXNlcyI7aW1wb3J0e3dvcmtlckRhdGEgYXMgdH1mcm9tIm5vZGU6d29ya2VyX3RocmVhZHMiO2NvbnN0IG49InVuZGVmaW5lZCI9PXR5cGVvZiBfX1NFTlRSWV9ERUJVR19ffHxfX1NFTlRSWV9ERUJVR19fLG89Z2xvYmFsVGhpcyxpPSI5LjM3LjAiO2NvbnN0IGE9WyJkZWJ1ZyIsImluZm8iLCJ3YXJuIiwiZXJyb3IiLCJsb2ciLCJhc3NlcnQiLCJ0cmFjZSJdLHM9e307ZnVuY3Rpb24gYyhlKXtpZighKCJjb25zb2xlImluIG8pKXJldHVybiBlKCk7Y29uc3QgdD1vLmNvbnNvbGUsbj17fSxpPU9iamVjdC5rZXlzKHMpO2kuZm9yRWFjaChlPT57Y29uc3Qgbz1zW2VdO25bZV09dFtlXSx0W2VdPW99KTt0cnl7cmV0dXJuIGUoKX1maW5hbGx5e2kuZm9yRWFjaChlPT57dFtlXT1uW2VdfSl9fSFmdW5jdGlvbihlLHQsbj1vKXtjb25zdCBhPW4uX19TRU5UUllfXz1uLl9fU0VOVFJZX198fHt9LHM9YVtpXT1hW2ldfHx7fTtzW2VdfHwoc1tlXT10KCkpfSgibG9nZ2VyIixmdW5jdGlvbigpe2xldCBlPSExO2NvbnN0IHQ9e2VuYWJsZTooKT0+e2U9ITB9LGRpc2FibGU6KCk9PntlPSExfSxpc0VuYWJsZWQ6KCk9PmV9O3JldHVybiBuP2EuZm9yRWFjaChuPT57dFtuXT0oLi4udCk9PntlJiZjKCgpPT57by5jb25zb2xlW25dKGBTZW50cnkgTG9nZ2VyIFske259XTpgLC4uLnQpfSl9fSk6YS5mb3JFYWNoKGU9Pnt0W2VdPSgpPT57fX0pLHR9KTtjb25zdCByPSJfX1NFTlRSWV9FUlJPUl9MT0NBTF9WQVJJQUJMRVNfXyI7Y29uc3QgdT10O2Z1bmN0aW9uIGwoLi4uZSl7dS5kZWJ1ZyYmYygoKT0+Y29uc29sZS5sb2coIltMb2NhbFZhcmlhYmxlcyBXb3JrZXJdIiwuLi5lKSl9YXN5bmMgZnVuY3Rpb24gZihlLHQsbixvKXtjb25zdCBpPWF3YWl0IGUucG9zdCgiUnVudGltZS5nZXRQcm9wZXJ0aWVzIix7b2JqZWN0SWQ6dCxvd25Qcm9wZXJ0aWVzOiEwfSk7b1tuXT1pLnJlc3VsdC5maWx0ZXIoZT0+Imxlbmd0aCIhPT1lLm5hbWUmJiFpc05hTihwYXJzZUludChlLm5hbWUsMTApKSkuc29ydCgoZSx0KT0+cGFyc2VJbnQoZS5uYW1lLDEwKS1wYXJzZUludCh0Lm5hbWUsMTApKS5tYXAoZT0+ZS52YWx1ZT8udmFsdWUpfWFzeW5jIGZ1bmN0aW9uIGcoZSx0LG4sbyl7Y29uc3QgaT1hd2FpdCBlLnBvc3QoIlJ1bnRpbWUuZ2V0UHJvcGVydGllcyIse29iamVjdElkOnQsb3duUHJvcGVydGllczohMH0pO29bbl09aS5yZXN1bHQubWFwKGU9PltlLm5hbWUsZS52YWx1ZT8udmFsdWVdKS5yZWR1Y2UoKGUsW3Qsbl0pPT4oZVt0XT1uLGUpLHt9KX1mdW5jdGlvbiBkKGUsdCl7ZS52YWx1ZSYmKCJ2YWx1ZSJpbiBlLnZhbHVlP3ZvaWQgMD09PWUudmFsdWUudmFsdWV8fG51bGw9PT1lLnZhbHVlLnZhbHVlP3RbZS5uYW1lXT1gPCR7ZS52YWx1ZS52YWx1ZX0+YDp0W2UubmFtZV09ZS52YWx1ZS52YWx1ZToiZGVzY3JpcHRpb24iaW4gZS52YWx1ZSYmImZ1bmN0aW9uIiE9PWUudmFsdWUudHlwZT90W2UubmFtZV09YDwke2UudmFsdWUuZGVzY3JpcHRpb259PmA6InVuZGVmaW5lZCI9PT1lLnZhbHVlLnR5cGUmJih0W2UubmFtZV09Ijx1bmRlZmluZWQ+IikpfWFzeW5jIGZ1bmN0aW9uIGIoZSx0KXtjb25zdCBuPWF3YWl0IGUucG9zdCgiUnVudGltZS5nZXRQcm9wZXJ0aWVzIix7b2JqZWN0SWQ6dCxvd25Qcm9wZXJ0aWVzOiEwfSksbz17fTtmb3IoY29uc3QgdCBvZiBuLnJlc3VsdClpZih0LnZhbHVlPy5vYmplY3RJZCYmIkFycmF5Ij09PXQudmFsdWUuY2xhc3NOYW1lKXtjb25zdCBuPXQudmFsdWUub2JqZWN0SWQ7YXdhaXQgZihlLG4sdC5uYW1lLG8pfWVsc2UgaWYodC52YWx1ZT8ub2JqZWN0SWQmJiJPYmplY3QiPT09dC52YWx1ZS5jbGFzc05hbWUpe2NvbnN0IG49dC52YWx1ZS5vYmplY3RJZDthd2FpdCBnKGUsbix0Lm5hbWUsbyl9ZWxzZSB0LnZhbHVlJiZkKHQsbyk7cmV0dXJuIG99bGV0IHA7KGFzeW5jIGZ1bmN0aW9uKCl7Y29uc3QgdD1uZXcgZTt0LmNvbm5lY3RUb01haW5UaHJlYWQoKSxsKCJDb25uZWN0ZWQgdG8gbWFpbiB0aHJlYWQiKTtsZXQgbj0hMTt0Lm9uKCJEZWJ1Z2dlci5yZXN1bWVkIiwoKT0+e249ITF9KSx0Lm9uKCJEZWJ1Z2dlci5wYXVzZWQiLGU9PntuPSEwLGFzeW5jIGZ1bmN0aW9uKGUse3JlYXNvbjp0LGRhdGE6e29iamVjdElkOm59LGNhbGxGcmFtZXM6b30pe2lmKCJleGNlcHRpb24iIT09dCYmInByb21pc2VSZWplY3Rpb24iIT09dClyZXR1cm47aWYocD8uKCksbnVsbD09bilyZXR1cm47Y29uc3QgaT1bXTtmb3IobGV0IHQ9MDt0PG8ubGVuZ3RoO3QrKyl7Y29uc3R7c2NvcGVDaGFpbjpuLGZ1bmN0aW9uTmFtZTphLHRoaXM6c309b1t0XSxjPW4uZmluZChlPT4ibG9jYWwiPT09ZS50eXBlKSxyPSJnbG9iYWwiIT09cy5jbGFzc05hbWUmJnMuY2xhc3NOYW1lP2Ake3MuY2xhc3NOYW1lfS4ke2F9YDphO2lmKHZvaWQgMD09PWM/Lm9iamVjdC5vYmplY3RJZClpW3RdPXtmdW5jdGlvbjpyfTtlbHNle2NvbnN0IG49YXdhaXQgYihlLGMub2JqZWN0Lm9iamVjdElkKTtpW3RdPXtmdW5jdGlvbjpyLHZhcnM6bn19fWF3YWl0IGUucG9zdCgiUnVudGltZS5jYWxsRnVuY3Rpb25PbiIse2Z1bmN0aW9uRGVjbGFyYXRpb246YGZ1bmN0aW9uKCkgeyB0aGlzLiR7cn0gPSB0aGlzLiR7cn0gfHwgJHtKU09OLnN0cmluZ2lmeShpKX07IH1gLHNpbGVudDohMCxvYmplY3RJZDpufSksYXdhaXQgZS5wb3N0KCJSdW50aW1lLnJlbGVhc2VPYmplY3QiLHtvYmplY3RJZDpufSl9KHQsZS5wYXJhbXMpLnRoZW4oYXN5bmMoKT0+e24mJmF3YWl0IHQucG9zdCgiRGVidWdnZXIucmVzdW1lIil9LGFzeW5jIGU9PntuJiZhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLnJlc3VtZSIpfSl9KSxhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLmVuYWJsZSIpO2NvbnN0IG89ITEhPT11LmNhcHR1cmVBbGxFeGNlcHRpb25zO2lmKGF3YWl0IHQucG9zdCgiRGVidWdnZXIuc2V0UGF1c2VPbkV4Y2VwdGlvbnMiLHtzdGF0ZTpvPyJhbGwiOiJ1bmNhdWdodCJ9KSxvKXtjb25zdCBlPXUubWF4RXhjZXB0aW9uc1BlclNlY29uZHx8NTA7cD1mdW5jdGlvbihlLHQsbil7bGV0IG89MCxpPTUsYT0wO3JldHVybiBzZXRJbnRlcnZhbCgoKT0+ezA9PT1hP28+ZSYmKGkqPTIsbihpKSxpPjg2NDAwJiYoaT04NjQwMCksYT1pKTooYS09MSwwPT09YSYmdCgpKSxvPTB9LDFlMykudW5yZWYoKSwoKT0+e28rPTF9fShlLGFzeW5jKCk9PntsKCJSYXRlLWxpbWl0IGxpZnRlZC4iKSxhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLnNldFBhdXNlT25FeGNlcHRpb25zIix7c3RhdGU6ImFsbCJ9KX0sYXN5bmMgZT0+e2woYFJhdGUtbGltaXQgZXhjZWVkZWQuIERpc2FibGluZyBjYXB0dXJpbmcgb2YgY2F1Z2h0IGV4Y2VwdGlvbnMgZm9yICR7ZX0gc2Vjb25kcy5gKSxhd2FpdCB0LnBvc3QoIkRlYnVnZ2VyLnNldFBhdXNlT25FeGNlcHRpb25zIix7c3RhdGU6InVuY2F1Z2h0In0pfSl9fSkoKS5jYXRjaChlPT57bCgiRmFpbGVkIHRvIHN0YXJ0IGRlYnVnZ2VyIixlKX0pLHNldEludGVydmFsKCgpPT57fSwxZTQpOw==';
function log(...args) {
    core.logger.log('[LocalVariables]', ...args);
}
/**
 * Adds local variables to exception frames
 */ const localVariablesAsyncIntegration = core.defineIntegration((integrationOptions = {})=>{
    function addLocalVariablesToException(exception, localVariables) {
        // Filter out frames where the function name is `new Promise` since these are in the error.stack frames
        // but do not appear in the debugger call frames
        const frames = (exception.stacktrace?.frames || []).filter((frame)=>frame.function !== 'new Promise');
        for(let i = 0; i < frames.length; i++){
            // Sentry frames are in reverse order
            const frameIndex = frames.length - i - 1;
            const frameLocalVariables = localVariables[i];
            const frame = frames[frameIndex];
            if (!frame || !frameLocalVariables) {
                break;
            }
            if (// We need to have vars to add
            frameLocalVariables.vars === undefined || // We're not interested in frames that are not in_app because the vars are not relevant
            frame.in_app === false || // The function names need to match
            !common.functionNamesMatch(frame.function, frameLocalVariables.function)) {
                continue;
            }
            frame.vars = frameLocalVariables.vars;
        }
    }
    function addLocalVariablesToEvent(event, hint) {
        if (hint.originalException && typeof hint.originalException === 'object' && common.LOCAL_VARIABLES_KEY in hint.originalException && Array.isArray(hint.originalException[common.LOCAL_VARIABLES_KEY])) {
            for (const exception of event.exception?.values || []){
                addLocalVariablesToException(exception, hint.originalException[common.LOCAL_VARIABLES_KEY]);
            }
            hint.originalException[common.LOCAL_VARIABLES_KEY] = undefined;
        }
        return event;
    }
    async function startInspector() {
        // We load inspector dynamically because on some platforms Node is built without inspector support
        const inspector = await Promise.resolve().then(()=>__turbopack_external_require__('node:inspector', true));
        if (!inspector.url()) {
            inspector.open(0);
        }
    }
    function startWorker(options) {
        const worker = new node_worker_threads.Worker(new URL(`data:application/javascript;base64,${base64WorkerScript}`), {
            workerData: options,
            // We don't want any Node args to be passed to the worker
            execArgv: [],
            env: {
                ...process.env,
                NODE_OPTIONS: undefined
            }
        });
        process.on('exit', ()=>{
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            worker.terminate();
        });
        worker.once('error', (err)=>{
            log('Worker error', err);
        });
        worker.once('exit', (code)=>{
            log('Worker exit', code);
        });
        // Ensure this thread can't block app exit
        worker.unref();
    }
    return {
        name: 'LocalVariablesAsync',
        async setup (client) {
            const clientOptions = client.getOptions();
            if (!clientOptions.includeLocalVariables) {
                return;
            }
            if (await debug.isDebuggerEnabled()) {
                core.logger.warn('Local variables capture has been disabled because the debugger was already enabled');
                return;
            }
            const options = {
                ...integrationOptions,
                debug: core.logger.isEnabled()
            };
            startInspector().then(()=>{
                try {
                    startWorker(options);
                } catch (e) {
                    core.logger.error('Failed to start worker', e);
                }
            }, (e)=>{
                core.logger.error('Failed to start inspector', e);
            });
        },
        processEvent (event, hint) {
            return addLocalVariablesToEvent(event, hint);
        }
    };
});
exports.base64WorkerScript = base64WorkerScript;
exports.localVariablesAsyncIntegration = localVariablesAsyncIntegration; //# sourceMappingURL=local-variables-async.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/local-variables-sync.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const nodeVersion = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/nodeVersion.js [app-ssr] (ecmascript)");
const debug = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/debug.js [app-ssr] (ecmascript)");
const common = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/common.js [app-ssr] (ecmascript)");
/** Creates a unique hash from stack frames */ function hashFrames(frames) {
    if (frames === undefined) {
        return;
    }
    // Only hash the 10 most recent frames (ie. the last 10)
    return frames.slice(-10).reduce((acc, frame)=>`${acc},${frame.function},${frame.lineno},${frame.colno}`, '');
}
/**
 * We use the stack parser to create a unique hash from the exception stack trace
 * This is used to lookup vars when the exception passes through the event processor
 */ function hashFromStack(stackParser, stack) {
    if (stack === undefined) {
        return undefined;
    }
    return hashFrames(stackParser(stack, 1));
}
/** Creates a container for callbacks to be called sequentially */ function createCallbackList(complete) {
    // A collection of callbacks to be executed last to first
    let callbacks = [];
    let completedCalled = false;
    function checkedComplete(result) {
        callbacks = [];
        if (completedCalled) {
            return;
        }
        completedCalled = true;
        complete(result);
    }
    // complete should be called last
    callbacks.push(checkedComplete);
    function add(fn) {
        callbacks.push(fn);
    }
    function next(result) {
        const popped = callbacks.pop() || checkedComplete;
        try {
            popped(result);
        } catch (_) {
            // If there is an error, we still want to call the complete callback
            checkedComplete(result);
        }
    }
    return {
        add,
        next
    };
}
/**
 * Promise API is available as `Experimental` and in Node 19 only.
 *
 * Callback-based API is `Stable` since v14 and `Experimental` since v8.
 * Because of that, we are creating our own `AsyncSession` class.
 *
 * https://nodejs.org/docs/latest-v19.x/api/inspector.html#promises-api
 * https://nodejs.org/docs/latest-v14.x/api/inspector.html
 */ class AsyncSession {
    /** Throws if inspector API is not available */ constructor(_session){
        this._session = _session;
    //
    }
    static async create(orDefault) {
        if (orDefault) {
            return orDefault;
        }
        const inspector = await Promise.resolve().then(()=>__turbopack_external_require__('node:inspector', true));
        return new AsyncSession(new inspector.Session());
    }
    /** @inheritdoc */ configureAndConnect(onPause, captureAll) {
        this._session.connect();
        this._session.on('Debugger.paused', (event)=>{
            onPause(event, ()=>{
                // After the pause work is complete, resume execution or the exception context memory is leaked
                this._session.post('Debugger.resume');
            });
        });
        this._session.post('Debugger.enable');
        this._session.post('Debugger.setPauseOnExceptions', {
            state: captureAll ? 'all' : 'uncaught'
        });
    }
    setPauseOnExceptions(captureAll) {
        this._session.post('Debugger.setPauseOnExceptions', {
            state: captureAll ? 'all' : 'uncaught'
        });
    }
    /** @inheritdoc */ getLocalVariables(objectId, complete) {
        this._getProperties(objectId, (props)=>{
            const { add, next } = createCallbackList(complete);
            for (const prop of props){
                if (prop.value?.objectId && prop.value.className === 'Array') {
                    const id = prop.value.objectId;
                    add((vars)=>this._unrollArray(id, prop.name, vars, next));
                } else if (prop.value?.objectId && prop.value.className === 'Object') {
                    const id = prop.value.objectId;
                    add((vars)=>this._unrollObject(id, prop.name, vars, next));
                } else if (prop.value) {
                    add((vars)=>this._unrollOther(prop, vars, next));
                }
            }
            next({});
        });
    }
    /**
   * Gets all the PropertyDescriptors of an object
   */ _getProperties(objectId, next) {
        this._session.post('Runtime.getProperties', {
            objectId,
            ownProperties: true
        }, (err, params)=>{
            if (err) {
                next([]);
            } else {
                next(params.result);
            }
        });
    }
    /**
   * Unrolls an array property
   */ _unrollArray(objectId, name, vars, next) {
        this._getProperties(objectId, (props)=>{
            vars[name] = props.filter((v)=>v.name !== 'length' && !isNaN(parseInt(v.name, 10))).sort((a, b)=>parseInt(a.name, 10) - parseInt(b.name, 10)).map((v)=>v.value?.value);
            next(vars);
        });
    }
    /**
   * Unrolls an object property
   */ _unrollObject(objectId, name, vars, next) {
        this._getProperties(objectId, (props)=>{
            vars[name] = props.map((v)=>[
                    v.name,
                    v.value?.value
                ]).reduce((obj, [key, val])=>{
                obj[key] = val;
                return obj;
            }, {});
            next(vars);
        });
    }
    /**
   * Unrolls other properties
   */ _unrollOther(prop, vars, next) {
        if (prop.value) {
            if ('value' in prop.value) {
                if (prop.value.value === undefined || prop.value.value === null) {
                    vars[prop.name] = `<${prop.value.value}>`;
                } else {
                    vars[prop.name] = prop.value.value;
                }
            } else if ('description' in prop.value && prop.value.type !== 'function') {
                vars[prop.name] = `<${prop.value.description}>`;
            } else if (prop.value.type === 'undefined') {
                vars[prop.name] = '<undefined>';
            }
        }
        next(vars);
    }
}
const INTEGRATION_NAME = 'LocalVariables';
/**
 * Adds local variables to exception frames
 */ const _localVariablesSyncIntegration = (options = {}, sessionOverride)=>{
    const cachedFrames = new core.LRUMap(20);
    let rateLimiter;
    let shouldProcessEvent = false;
    function addLocalVariablesToException(exception) {
        const hash = hashFrames(exception.stacktrace?.frames);
        if (hash === undefined) {
            return;
        }
        // Check if we have local variables for an exception that matches the hash
        // remove is identical to get but also removes the entry from the cache
        const cachedFrame = cachedFrames.remove(hash);
        if (cachedFrame === undefined) {
            return;
        }
        // Filter out frames where the function name is `new Promise` since these are in the error.stack frames
        // but do not appear in the debugger call frames
        const frames = (exception.stacktrace?.frames || []).filter((frame)=>frame.function !== 'new Promise');
        for(let i = 0; i < frames.length; i++){
            // Sentry frames are in reverse order
            const frameIndex = frames.length - i - 1;
            const cachedFrameVariable = cachedFrame[i];
            const frameVariable = frames[frameIndex];
            // Drop out if we run out of frames to match up
            if (!frameVariable || !cachedFrameVariable) {
                break;
            }
            if (// We need to have vars to add
            cachedFrameVariable.vars === undefined || // We're not interested in frames that are not in_app because the vars are not relevant
            frameVariable.in_app === false || // The function names need to match
            !common.functionNamesMatch(frameVariable.function, cachedFrameVariable.function)) {
                continue;
            }
            frameVariable.vars = cachedFrameVariable.vars;
        }
    }
    function addLocalVariablesToEvent(event) {
        for (const exception of event.exception?.values || []){
            addLocalVariablesToException(exception);
        }
        return event;
    }
    return {
        name: INTEGRATION_NAME,
        async setupOnce () {
            const client = core.getClient();
            const clientOptions = client?.getOptions();
            if (!clientOptions?.includeLocalVariables) {
                return;
            }
            // Only setup this integration if the Node version is >= v18
            // https://github.com/getsentry/sentry-javascript/issues/7697
            const unsupportedNodeVersion = nodeVersion.NODE_MAJOR < 18;
            if (unsupportedNodeVersion) {
                core.logger.log('The `LocalVariables` integration is only supported on Node >= v18.');
                return;
            }
            if (await debug.isDebuggerEnabled()) {
                core.logger.warn('Local variables capture has been disabled because the debugger was already enabled');
                return;
            }
            AsyncSession.create(sessionOverride).then((session)=>{
                function handlePaused(stackParser, { params: { reason, data, callFrames } }, complete) {
                    if (reason !== 'exception' && reason !== 'promiseRejection') {
                        complete();
                        return;
                    }
                    rateLimiter?.();
                    // data.description contains the original error.stack
                    const exceptionHash = hashFromStack(stackParser, data.description);
                    if (exceptionHash == undefined) {
                        complete();
                        return;
                    }
                    const { add, next } = createCallbackList((frames)=>{
                        cachedFrames.set(exceptionHash, frames);
                        complete();
                    });
                    // Because we're queuing up and making all these calls synchronously, we can potentially overflow the stack
                    // For this reason we only attempt to get local variables for the first 5 frames
                    for(let i = 0; i < Math.min(callFrames.length, 5); i++){
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const { scopeChain, functionName, this: obj } = callFrames[i];
                        const localScope = scopeChain.find((scope)=>scope.type === 'local');
                        // obj.className is undefined in ESM modules
                        const fn = obj.className === 'global' || !obj.className ? functionName : `${obj.className}.${functionName}`;
                        if (localScope?.object.objectId === undefined) {
                            add((frames)=>{
                                frames[i] = {
                                    function: fn
                                };
                                next(frames);
                            });
                        } else {
                            const id = localScope.object.objectId;
                            add((frames)=>session.getLocalVariables(id, (vars)=>{
                                    frames[i] = {
                                        function: fn,
                                        vars
                                    };
                                    next(frames);
                                }));
                        }
                    }
                    next([]);
                }
                const captureAll = options.captureAllExceptions !== false;
                session.configureAndConnect((ev, complete)=>handlePaused(clientOptions.stackParser, ev, complete), captureAll);
                if (captureAll) {
                    const max = options.maxExceptionsPerSecond || 50;
                    rateLimiter = common.createRateLimiter(max, ()=>{
                        core.logger.log('Local variables rate-limit lifted.');
                        session.setPauseOnExceptions(true);
                    }, (seconds)=>{
                        core.logger.log(`Local variables rate-limit exceeded. Disabling capturing of caught exceptions for ${seconds} seconds.`);
                        session.setPauseOnExceptions(false);
                    });
                }
                shouldProcessEvent = true;
            }, (error)=>{
                core.logger.log('The `LocalVariables` integration failed to start.', error);
            });
        },
        processEvent (event) {
            if (shouldProcessEvent) {
                return addLocalVariablesToEvent(event);
            }
            return event;
        },
        // These are entirely for testing
        _getCachedFramesCount () {
            return cachedFrames.size;
        },
        _getFirstCachedFrame () {
            return cachedFrames.values()[0];
        }
    };
};
/**
 * Adds local variables to exception frames.
 */ const localVariablesSyncIntegration = core.defineIntegration(_localVariablesSyncIntegration);
exports.createCallbackList = createCallbackList;
exports.hashFrames = hashFrames;
exports.hashFromStack = hashFromStack;
exports.localVariablesSyncIntegration = localVariablesSyncIntegration; //# sourceMappingURL=local-variables-sync.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/index.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const nodeVersion = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/nodeVersion.js [app-ssr] (ecmascript)");
const localVariablesAsync = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/local-variables-async.js [app-ssr] (ecmascript)");
const localVariablesSync = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/local-variables-sync.js [app-ssr] (ecmascript)");
const localVariablesIntegration = (options = {})=>{
    return nodeVersion.NODE_VERSION.major < 19 ? localVariablesSync.localVariablesSyncIntegration(options) : localVariablesAsync.localVariablesAsyncIntegration(options);
};
exports.localVariablesIntegration = localVariablesIntegration; //# sourceMappingURL=index.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/commonjs.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
/** Detect CommonJS. */ function isCjs() {
    try {
        return typeof module !== 'undefined' && typeof module.exports !== 'undefined';
    } catch  {
        return false;
    }
}
exports.isCjs = isCjs; //# sourceMappingURL=commonjs.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/modules.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const node_fs = require("node:fs");
const node_path = require("node:path");
const commonjs = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/commonjs.js [app-ssr] (ecmascript)");
let moduleCache;
const INTEGRATION_NAME = 'Modules';
/**
 * `__SENTRY_SERVER_MODULES__` can be replaced at build time with the modules loaded by the server.
 * Right now, we leverage this in Next.js to circumvent the problem that we do not get access to these things at runtime.
 */ const SERVER_MODULES = typeof __SENTRY_SERVER_MODULES__ === 'undefined' ? {} : __SENTRY_SERVER_MODULES__;
const _modulesIntegration = ()=>{
    return {
        name: INTEGRATION_NAME,
        processEvent (event) {
            event.modules = {
                ...event.modules,
                ..._getModules()
            };
            return event;
        },
        getModules: _getModules
    };
};
/**
 * Add node modules / packages to the event.
 * For this, multiple sources are used:
 * - They can be injected at build time into the __SENTRY_SERVER_MODULES__ variable (e.g. in Next.js)
 * - They are extracted from the dependencies & devDependencies in the package.json file
 * - They are extracted from the require.cache (CJS only)
 */ const modulesIntegration = _modulesIntegration;
function getRequireCachePaths() {
    try {
        return ("TURBOPACK compile-time truthy", 1) ? Object.keys(__turbopack_cache__) : ("TURBOPACK unreachable", undefined);
    } catch (e) {
        return [];
    }
}
/** Extract information about package.json modules */ function collectModules() {
    return {
        ...SERVER_MODULES,
        ...getModulesFromPackageJson(),
        ...commonjs.isCjs() ? collectRequireModules() : {}
    };
}
/** Extract information about package.json modules from require.cache */ function collectRequireModules() {
    const mainPaths = require.main?.paths || [];
    const paths = getRequireCachePaths();
    // We start with the modules from package.json (if possible)
    // These may be overwritten by more specific versions from the require.cache
    const infos = {};
    const seen = new Set();
    paths.forEach((path)=>{
        let dir = path;
        /** Traverse directories upward in the search of package.json file */ const updir = ()=>{
            const orig = dir;
            dir = node_path.dirname(orig);
            if (!dir || orig === dir || seen.has(orig)) {
                return undefined;
            }
            if (mainPaths.indexOf(dir) < 0) {
                return updir();
            }
            const pkgfile = node_path.join(orig, 'package.json');
            seen.add(orig);
            if (!node_fs.existsSync(pkgfile)) {
                return updir();
            }
            try {
                const info = JSON.parse(node_fs.readFileSync(pkgfile, 'utf8'));
                infos[info.name] = info.version;
            } catch (_oO) {
            // no-empty
            }
        };
        updir();
    });
    return infos;
}
/** Fetches the list of modules and the versions loaded by the entry file for your node.js app. */ function _getModules() {
    if (!moduleCache) {
        moduleCache = collectModules();
    }
    return moduleCache;
}
function getPackageJson() {
    try {
        const filePath = node_path.join(process.cwd(), 'package.json');
        const packageJson = JSON.parse(node_fs.readFileSync(filePath, 'utf8'));
        return packageJson;
    } catch (e) {
        return {};
    }
}
function getModulesFromPackageJson() {
    const packageJson = getPackageJson();
    return {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
    };
}
exports.modulesIntegration = modulesIntegration; //# sourceMappingURL=modules.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/errorhandling.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const debugBuild = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/debug-build.js [app-ssr] (ecmascript)");
const DEFAULT_SHUTDOWN_TIMEOUT = 2000;
/**
 * @hidden
 */ function logAndExitProcess(error) {
    core.consoleSandbox(()=>{
        // eslint-disable-next-line no-console
        console.error(error);
    });
    const client = core.getClient();
    if (client === undefined) {
        debugBuild.DEBUG_BUILD && core.logger.warn('No NodeClient was defined, we are exiting the process now.');
        global.process.exit(1);
        return;
    }
    const options = client.getOptions();
    const timeout = options?.shutdownTimeout && options.shutdownTimeout > 0 ? options.shutdownTimeout : DEFAULT_SHUTDOWN_TIMEOUT;
    client.close(timeout).then((result)=>{
        if (!result) {
            debugBuild.DEBUG_BUILD && core.logger.warn('We reached the timeout for emptying the request buffer, still exiting now!');
        }
        global.process.exit(1);
    }, (error)=>{
        debugBuild.DEBUG_BUILD && core.logger.error(error);
    });
}
exports.logAndExitProcess = logAndExitProcess; //# sourceMappingURL=errorhandling.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/onuncaughtexception.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const debugBuild = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/debug-build.js [app-ssr] (ecmascript)");
const errorhandling = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/errorhandling.js [app-ssr] (ecmascript)");
const INTEGRATION_NAME = 'OnUncaughtException';
/**
 * Add a global exception handler.
 */ const onUncaughtExceptionIntegration = core.defineIntegration((options = {})=>{
    const optionsWithDefaults = {
        exitEvenIfOtherHandlersAreRegistered: false,
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            global.process.on('uncaughtException', makeErrorHandler(client, optionsWithDefaults));
        }
    };
});
/** Exported only for tests */ function makeErrorHandler(client, options) {
    const timeout = 2000;
    let caughtFirstError = false;
    let caughtSecondError = false;
    let calledFatalError = false;
    let firstError;
    const clientOptions = client.getOptions();
    return Object.assign((error)=>{
        let onFatalError = errorhandling.logAndExitProcess;
        if (options.onFatalError) {
            onFatalError = options.onFatalError;
        } else if (clientOptions.onFatalError) {
            onFatalError = clientOptions.onFatalError;
        }
        // Attaching a listener to `uncaughtException` will prevent the node process from exiting. We generally do not
        // want to alter this behaviour so we check for other listeners that users may have attached themselves and adjust
        // exit behaviour of the SDK accordingly:
        // - If other listeners are attached, do not exit.
        // - If the only listener attached is ours, exit.
        const userProvidedListenersCount = global.process.listeners('uncaughtException').filter((listener)=>{
            // There are 3 listeners we ignore:
            return(// as soon as we're using domains this listener is attached by node itself
            listener.name !== 'domainUncaughtExceptionClear' && // the handler we register for tracing
            listener.tag !== 'sentry_tracingErrorCallback' && // the handler we register in this integration
            listener._errorHandler !== true);
        }).length;
        const processWouldExit = userProvidedListenersCount === 0;
        const shouldApplyFatalHandlingLogic = options.exitEvenIfOtherHandlersAreRegistered || processWouldExit;
        if (!caughtFirstError) {
            // this is the first uncaught error and the ultimate reason for shutting down
            // we want to do absolutely everything possible to ensure it gets captured
            // also we want to make sure we don't go recursion crazy if more errors happen after this one
            firstError = error;
            caughtFirstError = true;
            if (core.getClient() === client) {
                core.captureException(error, {
                    originalException: error,
                    captureContext: {
                        level: 'fatal'
                    },
                    mechanism: {
                        handled: false,
                        type: 'onuncaughtexception'
                    }
                });
            }
            if (!calledFatalError && shouldApplyFatalHandlingLogic) {
                calledFatalError = true;
                onFatalError(error);
            }
        } else {
            if (shouldApplyFatalHandlingLogic) {
                if (calledFatalError) {
                    // we hit an error *after* calling onFatalError - pretty boned at this point, just shut it down
                    debugBuild.DEBUG_BUILD && core.logger.warn('uncaught exception after calling fatal error shutdown callback - this is bad! forcing shutdown');
                    errorhandling.logAndExitProcess(error);
                } else if (!caughtSecondError) {
                    // two cases for how we can hit this branch:
                    //   - capturing of first error blew up and we just caught the exception from that
                    //     - quit trying to capture, proceed with shutdown
                    //   - a second independent error happened while waiting for first error to capture
                    //     - want to avoid causing premature shutdown before first error capture finishes
                    // it's hard to immediately tell case 1 from case 2 without doing some fancy/questionable domain stuff
                    // so let's instead just delay a bit before we proceed with our action here
                    // in case 1, we just wait a bit unnecessarily but ultimately do the same thing
                    // in case 2, the delay hopefully made us wait long enough for the capture to finish
                    // two potential nonideal outcomes:
                    //   nonideal case 1: capturing fails fast, we sit around for a few seconds unnecessarily before proceeding correctly by calling onFatalError
                    //   nonideal case 2: case 2 happens, 1st error is captured but slowly, timeout completes before capture and we treat second error as the sendErr of (nonexistent) failure from trying to capture first error
                    // note that after hitting this branch, we might catch more errors where (caughtSecondError && !calledFatalError)
                    //   we ignore them - they don't matter to us, we're just waiting for the second error timeout to finish
                    caughtSecondError = true;
                    setTimeout(()=>{
                        if (!calledFatalError) {
                            // it was probably case 1, let's treat err as the sendErr and call onFatalError
                            calledFatalError = true;
                            onFatalError(firstError, error);
                        }
                    }, timeout); // capturing could take at least sendTimeout to fail, plus an arbitrary second for how long it takes to collect surrounding source etc
                }
            }
        }
    }, {
        _errorHandler: true
    });
}
exports.makeErrorHandler = makeErrorHandler;
exports.onUncaughtExceptionIntegration = onUncaughtExceptionIntegration; //# sourceMappingURL=onuncaughtexception.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/onunhandledrejection.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const errorhandling = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/errorhandling.js [app-ssr] (ecmascript)");
const INTEGRATION_NAME = 'OnUnhandledRejection';
const _onUnhandledRejectionIntegration = (options = {})=>{
    const opts = {
        mode: 'warn',
        ...options
    };
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            global.process.on('unhandledRejection', makeUnhandledPromiseHandler(client, opts));
        }
    };
};
/**
 * Add a global promise rejection handler.
 */ const onUnhandledRejectionIntegration = core.defineIntegration(_onUnhandledRejectionIntegration);
/**
 * Send an exception with reason
 * @param reason string
 * @param promise promise
 *
 * Exported only for tests.
 */ function makeUnhandledPromiseHandler(client, options) {
    return function sendUnhandledPromise(reason, promise) {
        if (core.getClient() !== client) {
            return;
        }
        const level = options.mode === 'strict' ? 'fatal' : 'error';
        core.captureException(reason, {
            originalException: promise,
            captureContext: {
                extra: {
                    unhandledPromiseRejection: true
                },
                level
            },
            mechanism: {
                handled: false,
                type: 'onunhandledrejection'
            }
        });
        handleRejection(reason, options.mode);
    };
}
/**
 * Handler for `mode` option
 */ function handleRejection(reason, mode) {
    // https://github.com/nodejs/node/blob/7cf6f9e964aa00772965391c23acda6d71972a9a/lib/internal/process/promises.js#L234-L240
    const rejectionWarning = 'This error originated either by ' + 'throwing inside of an async function without a catch block, ' + 'or by rejecting a promise which was not handled with .catch().' + ' The promise rejected with the reason:';
    /* eslint-disable no-console */ if (mode === 'warn') {
        core.consoleSandbox(()=>{
            console.warn(rejectionWarning);
            console.error(reason && typeof reason === 'object' && 'stack' in reason ? reason.stack : reason);
        });
    } else if (mode === 'strict') {
        core.consoleSandbox(()=>{
            console.warn(rejectionWarning);
        });
        errorhandling.logAndExitProcess(reason);
    }
/* eslint-enable no-console */ }
exports.makeUnhandledPromiseHandler = makeUnhandledPromiseHandler;
exports.onUnhandledRejectionIntegration = onUnhandledRejectionIntegration; //# sourceMappingURL=onunhandledrejection.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/anr/index.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const node_util = require("node:util");
const node_worker_threads = require("node:worker_threads");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const nodeVersion = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/nodeVersion.js [app-ssr] (ecmascript)");
const debug = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/debug.js [app-ssr] (ecmascript)");
const { isPromise } = node_util.types;
// This string is a placeholder that gets overwritten with the worker code.
const base64WorkerScript = 'LyohIEBzZW50cnkvbm9kZS1jb3JlIDkuMzcuMCAoOTAxYzcyOSkgfCBodHRwczovL2dpdGh1Yi5jb20vZ2V0c2VudHJ5L3NlbnRyeS1qYXZhc2NyaXB0ICovCmltcG9ydHtTZXNzaW9uIGFzIHR9ZnJvbSJub2RlOmluc3BlY3RvciI7aW1wb3J0e3dvcmtlckRhdGEgYXMgbixwYXJlbnRQb3J0IGFzIGV9ZnJvbSJub2RlOndvcmtlcl90aHJlYWRzIjtpbXBvcnR7cG9zaXggYXMgcixzZXAgYXMgb31mcm9tIm5vZGU6cGF0aCI7aW1wb3J0KmFzIHMgZnJvbSJub2RlOmh0dHAiO2ltcG9ydCphcyBpIGZyb20ibm9kZTpodHRwcyI7aW1wb3J0e1JlYWRhYmxlIGFzIGN9ZnJvbSJub2RlOnN0cmVhbSI7aW1wb3J0e2NyZWF0ZUd6aXAgYXMgdX1mcm9tIm5vZGU6emxpYiI7aW1wb3J0KmFzIGEgZnJvbSJub2RlOm5ldCI7aW1wb3J0KmFzIGYgZnJvbSJub2RlOnRscyI7Y29uc3QgaD0idW5kZWZpbmVkIj09dHlwZW9mIF9fU0VOVFJZX0RFQlVHX198fF9fU0VOVFJZX0RFQlVHX18scD1nbG9iYWxUaGlzLGw9IjkuMzcuMCI7ZnVuY3Rpb24gZCgpe3JldHVybiBtKHApLHB9ZnVuY3Rpb24gbSh0KXtjb25zdCBuPXQuX19TRU5UUllfXz10Ll9fU0VOVFJZX198fHt9O3JldHVybiBuLnZlcnNpb249bi52ZXJzaW9ufHxsLG5bbF09bltsXXx8e319ZnVuY3Rpb24gZyh0LG4sZT1wKXtjb25zdCByPWUuX19TRU5UUllfXz1lLl9fU0VOVFJZX198fHt9LG89cltsXT1yW2xdfHx7fTtyZXR1cm4gb1t0XXx8KG9bdF09bigpKX1jb25zdCB5PVsiZGVidWciLCJpbmZvIiwid2FybiIsImVycm9yIiwibG9nIiwiYXNzZXJ0IiwidHJhY2UiXSxiPXt9O2Z1bmN0aW9uIHYodCl7aWYoISgiY29uc29sZSJpbiBwKSlyZXR1cm4gdCgpO2NvbnN0IG49cC5jb25zb2xlLGU9e30scj1PYmplY3Qua2V5cyhiKTtyLmZvckVhY2godD0+e2NvbnN0IHI9Ylt0XTtlW3RdPW5bdF0sblt0XT1yfSk7dHJ5e3JldHVybiB0KCl9ZmluYWxseXtyLmZvckVhY2godD0+e25bdF09ZVt0XX0pfX1jb25zdCBfPWcoImxvZ2dlciIsZnVuY3Rpb24oKXtsZXQgdD0hMTtjb25zdCBuPXtlbmFibGU6KCk9Pnt0PSEwfSxkaXNhYmxlOigpPT57dD0hMX0saXNFbmFibGVkOigpPT50fTtyZXR1cm4gaD95LmZvckVhY2goZT0+e25bZV09KC4uLm4pPT57dCYmdigoKT0+e3AuY29uc29sZVtlXShgU2VudHJ5IExvZ2dlciBbJHtlfV06YCwuLi5uKX0pfX0pOnkuZm9yRWFjaCh0PT57blt0XT0oKT0+e319KSxufSksdz0vY2FwdHVyZU1lc3NhZ2V8Y2FwdHVyZUV4Y2VwdGlvbi87ZnVuY3Rpb24gUyh0KXtyZXR1cm4gdFt0Lmxlbmd0aC0xXXx8e319Y29uc3QgJD0iPGFub255bW91cz4iO2NvbnN0IEU9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztmdW5jdGlvbiB4KHQsbil7cmV0dXJuIEUuY2FsbCh0KT09PWBbb2JqZWN0ICR7bn1dYH1mdW5jdGlvbiBOKHQpe3JldHVybiB4KHQsIlN0cmluZyIpfWZ1bmN0aW9uIEModCl7cmV0dXJuIHgodCwiT2JqZWN0Iil9ZnVuY3Rpb24gVCh0KXtyZXR1cm4gQm9vbGVhbih0Py50aGVuJiYiZnVuY3Rpb24iPT10eXBlb2YgdC50aGVuKX1mdW5jdGlvbiBrKHQsbil7dHJ5e3JldHVybiB0IGluc3RhbmNlb2Ygbn1jYXRjaCh0KXtyZXR1cm4hMX19Y29uc3Qgaj1wO2Z1bmN0aW9uIFIodCxuKXtjb25zdCBlPXQscj1bXTtpZighZT8udGFnTmFtZSlyZXR1cm4iIjtpZihqLkhUTUxFbGVtZW50JiZlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQmJmUuZGF0YXNldCl7aWYoZS5kYXRhc2V0LnNlbnRyeUNvbXBvbmVudClyZXR1cm4gZS5kYXRhc2V0LnNlbnRyeUNvbXBvbmVudDtpZihlLmRhdGFzZXQuc2VudHJ5RWxlbWVudClyZXR1cm4gZS5kYXRhc2V0LnNlbnRyeUVsZW1lbnR9ci5wdXNoKGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpKTtjb25zdCBvPW4/Lmxlbmd0aD9uLmZpbHRlcih0PT5lLmdldEF0dHJpYnV0ZSh0KSkubWFwKHQ9Plt0LGUuZ2V0QXR0cmlidXRlKHQpXSk6bnVsbDtpZihvPy5sZW5ndGgpby5mb3JFYWNoKHQ9PntyLnB1c2goYFske3RbMF19PSIke3RbMV19Il1gKX0pO2Vsc2V7ZS5pZCYmci5wdXNoKGAjJHtlLmlkfWApO2NvbnN0IHQ9ZS5jbGFzc05hbWU7aWYodCYmTih0KSl7Y29uc3Qgbj10LnNwbGl0KC9ccysvKTtmb3IoY29uc3QgdCBvZiBuKXIucHVzaChgLiR7dH1gKX19Y29uc3Qgcz1bImFyaWEtbGFiZWwiLCJ0eXBlIiwibmFtZSIsInRpdGxlIiwiYWx0Il07Zm9yKGNvbnN0IHQgb2Ygcyl7Y29uc3Qgbj1lLmdldEF0dHJpYnV0ZSh0KTtuJiZyLnB1c2goYFske3R9PSIke259Il1gKX1yZXR1cm4gci5qb2luKCIiKX1mdW5jdGlvbiBJKHQsbj0wKXtyZXR1cm4ic3RyaW5nIiE9dHlwZW9mIHR8fDA9PT1ufHx0Lmxlbmd0aDw9bj90OmAke3Quc2xpY2UoMCxuKX0uLi5gfWZ1bmN0aW9uIE8odCl7aWYoZnVuY3Rpb24odCl7c3dpdGNoKEUuY2FsbCh0KSl7Y2FzZSJbb2JqZWN0IEVycm9yXSI6Y2FzZSJbb2JqZWN0IEV4Y2VwdGlvbl0iOmNhc2UiW29iamVjdCBET01FeGNlcHRpb25dIjpjYXNlIltvYmplY3QgV2ViQXNzZW1ibHkuRXhjZXB0aW9uXSI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4gayh0LEVycm9yKX19KHQpKXJldHVybnttZXNzYWdlOnQubWVzc2FnZSxuYW1lOnQubmFtZSxzdGFjazp0LnN0YWNrLC4uLkQodCl9O2lmKG49dCwidW5kZWZpbmVkIiE9dHlwZW9mIEV2ZW50JiZrKG4sRXZlbnQpKXtjb25zdCBuPXt0eXBlOnQudHlwZSx0YXJnZXQ6QSh0LnRhcmdldCksY3VycmVudFRhcmdldDpBKHQuY3VycmVudFRhcmdldCksLi4uRCh0KX07cmV0dXJuInVuZGVmaW5lZCIhPXR5cGVvZiBDdXN0b21FdmVudCYmayh0LEN1c3RvbUV2ZW50KSYmKG4uZGV0YWlsPXQuZGV0YWlsKSxufXJldHVybiB0O3ZhciBufWZ1bmN0aW9uIEEodCl7dHJ5e3JldHVybiBuPXQsInVuZGVmaW5lZCIhPXR5cGVvZiBFbGVtZW50JiZrKG4sRWxlbWVudCk/ZnVuY3Rpb24odCxuPXt9KXtpZighdClyZXR1cm4iPHVua25vd24+Ijt0cnl7bGV0IGU9dDtjb25zdCByPTUsbz1bXTtsZXQgcz0wLGk9MDtjb25zdCBjPSIgPiAiLHU9Yy5sZW5ndGg7bGV0IGE7Y29uc3QgZj1BcnJheS5pc0FycmF5KG4pP246bi5rZXlBdHRycyxoPSFBcnJheS5pc0FycmF5KG4pJiZuLm1heFN0cmluZ0xlbmd0aHx8ODA7Zm9yKDtlJiZzKys8ciYmKGE9UihlLGYpLCEoImh0bWwiPT09YXx8cz4xJiZpK28ubGVuZ3RoKnUrYS5sZW5ndGg+PWgpKTspby5wdXNoKGEpLGkrPWEubGVuZ3RoLGU9ZS5wYXJlbnROb2RlO3JldHVybiBvLnJldmVyc2UoKS5qb2luKGMpfWNhdGNoKHQpe3JldHVybiI8dW5rbm93bj4ifX0odCk6T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpfWNhdGNoKHQpe3JldHVybiI8dW5rbm93bj4ifXZhciBufWZ1bmN0aW9uIEQodCl7aWYoIm9iamVjdCI9PXR5cGVvZiB0JiZudWxsIT09dCl7Y29uc3Qgbj17fTtmb3IoY29uc3QgZSBpbiB0KU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LGUpJiYobltlXT10W2VdKTtyZXR1cm4gbn1yZXR1cm57fX1mdW5jdGlvbiBQKHQ9ZnVuY3Rpb24oKXtjb25zdCB0PXA7cmV0dXJuIHQuY3J5cHRvfHx0Lm1zQ3J5cHRvfSgpKXtsZXQgbj0oKT0+MTYqTWF0aC5yYW5kb20oKTt0cnl7aWYodD8ucmFuZG9tVVVJRClyZXR1cm4gdC5yYW5kb21VVUlEKCkucmVwbGFjZSgvLS9nLCIiKTt0Py5nZXRSYW5kb21WYWx1ZXMmJihuPSgpPT57Y29uc3Qgbj1uZXcgVWludDhBcnJheSgxKTtyZXR1cm4gdC5nZXRSYW5kb21WYWx1ZXMobiksblswXX0pfWNhdGNoKHQpe31yZXR1cm4oWzFlN10rMWUzKzRlMys4ZTMrMWUxMSkucmVwbGFjZSgvWzAxOF0vZyx0PT4odF4oMTUmbigpKT4+dC80KS50b1N0cmluZygxNikpfWZ1bmN0aW9uIFUoKXtyZXR1cm4gRGF0ZS5ub3coKS8xZTN9Y29uc3QgTT1mdW5jdGlvbigpe2NvbnN0e3BlcmZvcm1hbmNlOnR9PXA7aWYoIXQ/Lm5vdylyZXR1cm4gVTtjb25zdCBuPURhdGUubm93KCktdC5ub3coKSxlPW51bGw9PXQudGltZU9yaWdpbj9uOnQudGltZU9yaWdpbjtyZXR1cm4oKT0+KGUrdC5ub3coKSkvMWUzfSgpO2Z1bmN0aW9uIEwodCl7Y29uc3Qgbj1NKCksZT17c2lkOlAoKSxpbml0OiEwLHRpbWVzdGFtcDpuLHN0YXJ0ZWQ6bixkdXJhdGlvbjowLHN0YXR1czoib2siLGVycm9yczowLGlnbm9yZUR1cmF0aW9uOiExLHRvSlNPTjooKT0+ZnVuY3Rpb24odCl7cmV0dXJue3NpZDpgJHt0LnNpZH1gLGluaXQ6dC5pbml0LHN0YXJ0ZWQ6bmV3IERhdGUoMWUzKnQuc3RhcnRlZCkudG9JU09TdHJpbmcoKSx0aW1lc3RhbXA6bmV3IERhdGUoMWUzKnQudGltZXN0YW1wKS50b0lTT1N0cmluZygpLHN0YXR1czp0LnN0YXR1cyxlcnJvcnM6dC5lcnJvcnMsZGlkOiJudW1iZXIiPT10eXBlb2YgdC5kaWR8fCJzdHJpbmciPT10eXBlb2YgdC5kaWQ/YCR7dC5kaWR9YDp2b2lkIDAsZHVyYXRpb246dC5kdXJhdGlvbixhYm5vcm1hbF9tZWNoYW5pc206dC5hYm5vcm1hbF9tZWNoYW5pc20sYXR0cnM6e3JlbGVhc2U6dC5yZWxlYXNlLGVudmlyb25tZW50OnQuZW52aXJvbm1lbnQsaXBfYWRkcmVzczp0LmlwQWRkcmVzcyx1c2VyX2FnZW50OnQudXNlckFnZW50fX19KGUpfTtyZXR1cm4gdCYmQihlLHQpLGV9ZnVuY3Rpb24gQih0LG49e30pe2lmKG4udXNlciYmKCF0LmlwQWRkcmVzcyYmbi51c2VyLmlwX2FkZHJlc3MmJih0LmlwQWRkcmVzcz1uLnVzZXIuaXBfYWRkcmVzcyksdC5kaWR8fG4uZGlkfHwodC5kaWQ9bi51c2VyLmlkfHxuLnVzZXIuZW1haWx8fG4udXNlci51c2VybmFtZSkpLHQudGltZXN0YW1wPW4udGltZXN0YW1wfHxNKCksbi5hYm5vcm1hbF9tZWNoYW5pc20mJih0LmFibm9ybWFsX21lY2hhbmlzbT1uLmFibm9ybWFsX21lY2hhbmlzbSksbi5pZ25vcmVEdXJhdGlvbiYmKHQuaWdub3JlRHVyYXRpb249bi5pZ25vcmVEdXJhdGlvbiksbi5zaWQmJih0LnNpZD0zMj09PW4uc2lkLmxlbmd0aD9uLnNpZDpQKCkpLHZvaWQgMCE9PW4uaW5pdCYmKHQuaW5pdD1uLmluaXQpLCF0LmRpZCYmbi5kaWQmJih0LmRpZD1gJHtuLmRpZH1gKSwibnVtYmVyIj09dHlwZW9mIG4uc3RhcnRlZCYmKHQuc3RhcnRlZD1uLnN0YXJ0ZWQpLHQuaWdub3JlRHVyYXRpb24pdC5kdXJhdGlvbj12b2lkIDA7ZWxzZSBpZigibnVtYmVyIj09dHlwZW9mIG4uZHVyYXRpb24pdC5kdXJhdGlvbj1uLmR1cmF0aW9uO2Vsc2V7Y29uc3Qgbj10LnRpbWVzdGFtcC10LnN0YXJ0ZWQ7dC5kdXJhdGlvbj1uPj0wP246MH1uLnJlbGVhc2UmJih0LnJlbGVhc2U9bi5yZWxlYXNlKSxuLmVudmlyb25tZW50JiYodC5lbnZpcm9ubWVudD1uLmVudmlyb25tZW50KSwhdC5pcEFkZHJlc3MmJm4uaXBBZGRyZXNzJiYodC5pcEFkZHJlc3M9bi5pcEFkZHJlc3MpLCF0LnVzZXJBZ2VudCYmbi51c2VyQWdlbnQmJih0LnVzZXJBZ2VudD1uLnVzZXJBZ2VudCksIm51bWJlciI9PXR5cGVvZiBuLmVycm9ycyYmKHQuZXJyb3JzPW4uZXJyb3JzKSxuLnN0YXR1cyYmKHQuc3RhdHVzPW4uc3RhdHVzKX1mdW5jdGlvbiBHKHQsbixlPTIpe2lmKCFufHwib2JqZWN0IiE9dHlwZW9mIG58fGU8PTApcmV0dXJuIG47aWYodCYmMD09PU9iamVjdC5rZXlzKG4pLmxlbmd0aClyZXR1cm4gdDtjb25zdCByPXsuLi50fTtmb3IoY29uc3QgdCBpbiBuKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLHQpJiYoclt0XT1HKHJbdF0sblt0XSxlLTEpKTtyZXR1cm4gcn1mdW5jdGlvbiBKKCl7cmV0dXJuIFAoKX1mdW5jdGlvbiBIKCl7cmV0dXJuIFAoKS5zdWJzdHJpbmcoMTYpfWNvbnN0IHo9Il9zZW50cnlTcGFuIjtmdW5jdGlvbiBGKHQsbil7bj9mdW5jdGlvbih0LG4sZSl7dHJ5e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se3ZhbHVlOmUsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9Y2F0Y2goZSl7aCYmXy5sb2coYEZhaWxlZCB0byBhZGQgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgIiR7bn0iIHRvIG9iamVjdGAsdCl9fSh0LHosbik6ZGVsZXRlIHRbel19ZnVuY3Rpb24gVyh0KXtyZXR1cm4gdFt6XX1jbGFzcyBZe2NvbnN0cnVjdG9yKCl7dGhpcy50PSExLHRoaXMubz1bXSx0aGlzLmk9W10sdGhpcy51PVtdLHRoaXMuaD1bXSx0aGlzLnA9e30sdGhpcy5sPXt9LHRoaXMubT17fSx0aGlzLnY9e30sdGhpcy5fPXt9LHRoaXMuUz17dHJhY2VJZDpKKCksc2FtcGxlUmFuZDpNYXRoLnJhbmRvbSgpfX1jbG9uZSgpe2NvbnN0IHQ9bmV3IFk7cmV0dXJuIHQudT1bLi4udGhpcy51XSx0Lmw9ey4uLnRoaXMubH0sdC5tPXsuLi50aGlzLm19LHQudj17Li4udGhpcy52fSx0aGlzLnYuZmxhZ3MmJih0LnYuZmxhZ3M9e3ZhbHVlczpbLi4udGhpcy52LmZsYWdzLnZhbHVlc119KSx0LnA9dGhpcy5wLHQuTj10aGlzLk4sdC5DPXRoaXMuQyx0LlQ9dGhpcy5ULHQuaz10aGlzLmssdC5pPVsuLi50aGlzLmldLHQuaD1bLi4udGhpcy5oXSx0Ll89ey4uLnRoaXMuX30sdC5TPXsuLi50aGlzLlN9LHQuaj10aGlzLmosdC5SPXRoaXMuUixGKHQsVyh0aGlzKSksdH1zZXRDbGllbnQodCl7dGhpcy5qPXR9c2V0TGFzdEV2ZW50SWQodCl7dGhpcy5SPXR9Z2V0Q2xpZW50KCl7cmV0dXJuIHRoaXMuan1sYXN0RXZlbnRJZCgpe3JldHVybiB0aGlzLlJ9YWRkU2NvcGVMaXN0ZW5lcih0KXt0aGlzLm8ucHVzaCh0KX1hZGRFdmVudFByb2Nlc3Nvcih0KXtyZXR1cm4gdGhpcy5pLnB1c2godCksdGhpc31zZXRVc2VyKHQpe3JldHVybiB0aGlzLnA9dHx8e2VtYWlsOnZvaWQgMCxpZDp2b2lkIDAsaXBfYWRkcmVzczp2b2lkIDAsdXNlcm5hbWU6dm9pZCAwfSx0aGlzLkMmJkIodGhpcy5DLHt1c2VyOnR9KSx0aGlzLkkoKSx0aGlzfWdldFVzZXIoKXtyZXR1cm4gdGhpcy5wfXNldFRhZ3ModCl7cmV0dXJuIHRoaXMubD17Li4udGhpcy5sLC4uLnR9LHRoaXMuSSgpLHRoaXN9c2V0VGFnKHQsbil7cmV0dXJuIHRoaXMubD17Li4udGhpcy5sLFt0XTpufSx0aGlzLkkoKSx0aGlzfXNldEV4dHJhcyh0KXtyZXR1cm4gdGhpcy5tPXsuLi50aGlzLm0sLi4udH0sdGhpcy5JKCksdGhpc31zZXRFeHRyYSh0LG4pe3JldHVybiB0aGlzLm09ey4uLnRoaXMubSxbdF06bn0sdGhpcy5JKCksdGhpc31zZXRGaW5nZXJwcmludCh0KXtyZXR1cm4gdGhpcy5rPXQsdGhpcy5JKCksdGhpc31zZXRMZXZlbCh0KXtyZXR1cm4gdGhpcy5OPXQsdGhpcy5JKCksdGhpc31zZXRUcmFuc2FjdGlvbk5hbWUodCl7cmV0dXJuIHRoaXMuVD10LHRoaXMuSSgpLHRoaXN9c2V0Q29udGV4dCh0LG4pe3JldHVybiBudWxsPT09bj9kZWxldGUgdGhpcy52W3RdOnRoaXMudlt0XT1uLHRoaXMuSSgpLHRoaXN9c2V0U2Vzc2lvbih0KXtyZXR1cm4gdD90aGlzLkM9dDpkZWxldGUgdGhpcy5DLHRoaXMuSSgpLHRoaXN9Z2V0U2Vzc2lvbigpe3JldHVybiB0aGlzLkN9dXBkYXRlKHQpe2lmKCF0KXJldHVybiB0aGlzO2NvbnN0IG49ImZ1bmN0aW9uIj09dHlwZW9mIHQ/dCh0aGlzKTp0LGU9biBpbnN0YW5jZW9mIFk/bi5nZXRTY29wZURhdGEoKTpDKG4pP3Q6dm9pZCAwLHt0YWdzOnIsZXh0cmE6byx1c2VyOnMsY29udGV4dHM6aSxsZXZlbDpjLGZpbmdlcnByaW50OnU9W10scHJvcGFnYXRpb25Db250ZXh0OmF9PWV8fHt9O3JldHVybiB0aGlzLmw9ey4uLnRoaXMubCwuLi5yfSx0aGlzLm09ey4uLnRoaXMubSwuLi5vfSx0aGlzLnY9ey4uLnRoaXMudiwuLi5pfSxzJiZPYmplY3Qua2V5cyhzKS5sZW5ndGgmJih0aGlzLnA9cyksYyYmKHRoaXMuTj1jKSx1Lmxlbmd0aCYmKHRoaXMuaz11KSxhJiYodGhpcy5TPWEpLHRoaXN9Y2xlYXIoKXtyZXR1cm4gdGhpcy51PVtdLHRoaXMubD17fSx0aGlzLm09e30sdGhpcy5wPXt9LHRoaXMudj17fSx0aGlzLk49dm9pZCAwLHRoaXMuVD12b2lkIDAsdGhpcy5rPXZvaWQgMCx0aGlzLkM9dm9pZCAwLEYodGhpcyx2b2lkIDApLHRoaXMuaD1bXSx0aGlzLnNldFByb3BhZ2F0aW9uQ29udGV4dCh7dHJhY2VJZDpKKCksc2FtcGxlUmFuZDpNYXRoLnJhbmRvbSgpfSksdGhpcy5JKCksdGhpc31hZGRCcmVhZGNydW1iKHQsbil7Y29uc3QgZT0ibnVtYmVyIj09dHlwZW9mIG4/bjoxMDA7aWYoZTw9MClyZXR1cm4gdGhpcztjb25zdCByPXt0aW1lc3RhbXA6VSgpLC4uLnQsbWVzc2FnZTp0Lm1lc3NhZ2U/SSh0Lm1lc3NhZ2UsMjA0OCk6dC5tZXNzYWdlfTtyZXR1cm4gdGhpcy51LnB1c2gociksdGhpcy51Lmxlbmd0aD5lJiYodGhpcy51PXRoaXMudS5zbGljZSgtZSksdGhpcy5qPy5yZWNvcmREcm9wcGVkRXZlbnQoImJ1ZmZlcl9vdmVyZmxvdyIsImxvZ19pdGVtIikpLHRoaXMuSSgpLHRoaXN9Z2V0TGFzdEJyZWFkY3J1bWIoKXtyZXR1cm4gdGhpcy51W3RoaXMudS5sZW5ndGgtMV19Y2xlYXJCcmVhZGNydW1icygpe3JldHVybiB0aGlzLnU9W10sdGhpcy5JKCksdGhpc31hZGRBdHRhY2htZW50KHQpe3JldHVybiB0aGlzLmgucHVzaCh0KSx0aGlzfWNsZWFyQXR0YWNobWVudHMoKXtyZXR1cm4gdGhpcy5oPVtdLHRoaXN9Z2V0U2NvcGVEYXRhKCl7cmV0dXJue2JyZWFkY3J1bWJzOnRoaXMudSxhdHRhY2htZW50czp0aGlzLmgsY29udGV4dHM6dGhpcy52LHRhZ3M6dGhpcy5sLGV4dHJhOnRoaXMubSx1c2VyOnRoaXMucCxsZXZlbDp0aGlzLk4sZmluZ2VycHJpbnQ6dGhpcy5rfHxbXSxldmVudFByb2Nlc3NvcnM6dGhpcy5pLHByb3BhZ2F0aW9uQ29udGV4dDp0aGlzLlMsc2RrUHJvY2Vzc2luZ01ldGFkYXRhOnRoaXMuXyx0cmFuc2FjdGlvbk5hbWU6dGhpcy5ULHNwYW46Vyh0aGlzKX19c2V0U0RLUHJvY2Vzc2luZ01ldGFkYXRhKHQpe3JldHVybiB0aGlzLl89Ryh0aGlzLl8sdCwyKSx0aGlzfXNldFByb3BhZ2F0aW9uQ29udGV4dCh0KXtyZXR1cm4gdGhpcy5TPXQsdGhpc31nZXRQcm9wYWdhdGlvbkNvbnRleHQoKXtyZXR1cm4gdGhpcy5TfWNhcHR1cmVFeGNlcHRpb24odCxuKXtjb25zdCBlPW4/LmV2ZW50X2lkfHxQKCk7aWYoIXRoaXMuailyZXR1cm4gXy53YXJuKCJObyBjbGllbnQgY29uZmlndXJlZCBvbiBzY29wZSAtIHdpbGwgbm90IGNhcHR1cmUgZXhjZXB0aW9uISIpLGU7Y29uc3Qgcj1uZXcgRXJyb3IoIlNlbnRyeSBzeW50aGV0aWNFeGNlcHRpb24iKTtyZXR1cm4gdGhpcy5qLmNhcHR1cmVFeGNlcHRpb24odCx7b3JpZ2luYWxFeGNlcHRpb246dCxzeW50aGV0aWNFeGNlcHRpb246ciwuLi5uLGV2ZW50X2lkOmV9LHRoaXMpLGV9Y2FwdHVyZU1lc3NhZ2UodCxuLGUpe2NvbnN0IHI9ZT8uZXZlbnRfaWR8fFAoKTtpZighdGhpcy5qKXJldHVybiBfLndhcm4oIk5vIGNsaWVudCBjb25maWd1cmVkIG9uIHNjb3BlIC0gd2lsbCBub3QgY2FwdHVyZSBtZXNzYWdlISIpLHI7Y29uc3Qgbz1uZXcgRXJyb3IodCk7cmV0dXJuIHRoaXMuai5jYXB0dXJlTWVzc2FnZSh0LG4se29yaWdpbmFsRXhjZXB0aW9uOnQsc3ludGhldGljRXhjZXB0aW9uOm8sLi4uZSxldmVudF9pZDpyfSx0aGlzKSxyfWNhcHR1cmVFdmVudCh0LG4pe2NvbnN0IGU9bj8uZXZlbnRfaWR8fFAoKTtyZXR1cm4gdGhpcy5qPyh0aGlzLmouY2FwdHVyZUV2ZW50KHQsey4uLm4sZXZlbnRfaWQ6ZX0sdGhpcyksZSk6KF8ud2FybigiTm8gY2xpZW50IGNvbmZpZ3VyZWQgb24gc2NvcGUgLSB3aWxsIG5vdCBjYXB0dXJlIGV2ZW50ISIpLGUpfUkoKXt0aGlzLnR8fCh0aGlzLnQ9ITAsdGhpcy5vLmZvckVhY2godD0+e3QodGhpcyl9KSx0aGlzLnQ9ITEpfX1jbGFzcyBLe2NvbnN0cnVjdG9yKHQsbil7bGV0IGUscjtlPXR8fG5ldyBZLHI9bnx8bmV3IFksdGhpcy5PPVt7c2NvcGU6ZX1dLHRoaXMuQT1yfXdpdGhTY29wZSh0KXtjb25zdCBuPXRoaXMuRCgpO2xldCBlO3RyeXtlPXQobil9Y2F0Y2godCl7dGhyb3cgdGhpcy5QKCksdH1yZXR1cm4gVChlKT9lLnRoZW4odD0+KHRoaXMuUCgpLHQpLHQ9Pnt0aHJvdyB0aGlzLlAoKSx0fSk6KHRoaXMuUCgpLGUpfWdldENsaWVudCgpe3JldHVybiB0aGlzLmdldFN0YWNrVG9wKCkuY2xpZW50fWdldFNjb3BlKCl7cmV0dXJuIHRoaXMuZ2V0U3RhY2tUb3AoKS5zY29wZX1nZXRJc29sYXRpb25TY29wZSgpe3JldHVybiB0aGlzLkF9Z2V0U3RhY2tUb3AoKXtyZXR1cm4gdGhpcy5PW3RoaXMuTy5sZW5ndGgtMV19RCgpe2NvbnN0IHQ9dGhpcy5nZXRTY29wZSgpLmNsb25lKCk7cmV0dXJuIHRoaXMuTy5wdXNoKHtjbGllbnQ6dGhpcy5nZXRDbGllbnQoKSxzY29wZTp0fSksdH1QKCl7cmV0dXJuISh0aGlzLk8ubGVuZ3RoPD0xKSYmISF0aGlzLk8ucG9wKCl9fWZ1bmN0aW9uIFYoKXtjb25zdCB0PW0oZCgpKTtyZXR1cm4gdC5zdGFjaz10LnN0YWNrfHxuZXcgSyhnKCJkZWZhdWx0Q3VycmVudFNjb3BlIiwoKT0+bmV3IFkpLGcoImRlZmF1bHRJc29sYXRpb25TY29wZSIsKCk9Pm5ldyBZKSl9ZnVuY3Rpb24gWih0KXtyZXR1cm4gVigpLndpdGhTY29wZSh0KX1mdW5jdGlvbiBxKHQsbil7Y29uc3QgZT1WKCk7cmV0dXJuIGUud2l0aFNjb3BlKCgpPT4oZS5nZXRTdGFja1RvcCgpLnNjb3BlPXQsbih0KSkpfWZ1bmN0aW9uIFEodCl7cmV0dXJuIFYoKS53aXRoU2NvcGUoKCk9PnQoVigpLmdldElzb2xhdGlvblNjb3BlKCkpKX1mdW5jdGlvbiBYKHQpe2NvbnN0IG49bSh0KTtyZXR1cm4gbi5hY3M/bi5hY3M6e3dpdGhJc29sYXRpb25TY29wZTpRLHdpdGhTY29wZTpaLHdpdGhTZXRTY29wZTpxLHdpdGhTZXRJc29sYXRpb25TY29wZToodCxuKT0+UShuKSxnZXRDdXJyZW50U2NvcGU6KCk9PlYoKS5nZXRTY29wZSgpLGdldElzb2xhdGlvblNjb3BlOigpPT5WKCkuZ2V0SXNvbGF0aW9uU2NvcGUoKX19ZnVuY3Rpb24gdHQoKXtyZXR1cm4gWChkKCkpLmdldEN1cnJlbnRTY29wZSgpLmdldENsaWVudCgpfWZ1bmN0aW9uIG50KHQpe3JldHVybntzY29wZTp0Ll9zZW50cnlTY29wZSxpc29sYXRpb25TY29wZTp0Ll9zZW50cnlJc29sYXRpb25TY29wZX19Y29uc3QgZXQ9L15zZW50cnktLztmdW5jdGlvbiBydCh0KXtjb25zdCBuPWZ1bmN0aW9uKHQpe2lmKCF0fHwhTih0KSYmIUFycmF5LmlzQXJyYXkodCkpcmV0dXJuO2lmKEFycmF5LmlzQXJyYXkodCkpcmV0dXJuIHQucmVkdWNlKCh0LG4pPT57Y29uc3QgZT1vdChuKTtyZXR1cm4gT2JqZWN0LmVudHJpZXMoZSkuZm9yRWFjaCgoW24sZV0pPT57dFtuXT1lfSksdH0se30pO3JldHVybiBvdCh0KX0odCk7aWYoIW4pcmV0dXJuO2NvbnN0IGU9T2JqZWN0LmVudHJpZXMobikucmVkdWNlKCh0LFtuLGVdKT0+e2lmKG4ubWF0Y2goZXQpKXt0W24uc2xpY2UoNyldPWV9cmV0dXJuIHR9LHt9KTtyZXR1cm4gT2JqZWN0LmtleXMoZSkubGVuZ3RoPjA/ZTp2b2lkIDB9ZnVuY3Rpb24gb3QodCl7cmV0dXJuIHQuc3BsaXQoIiwiKS5tYXAodD0+dC5zcGxpdCgiPSIpLm1hcCh0PT57dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQodC50cmltKCkpfWNhdGNoe3JldHVybn19KSkucmVkdWNlKCh0LFtuLGVdKT0+KG4mJmUmJih0W25dPWUpLHQpLHt9KX1mdW5jdGlvbiBzdCh0KXtjb25zdHtzcGFuSWQ6bix0cmFjZUlkOmUsaXNSZW1vdGU6cn09dC5zcGFuQ29udGV4dCgpLG89cj9uOmF0KHQpLnBhcmVudF9zcGFuX2lkLHM9bnQodCkuc2NvcGU7cmV0dXJue3BhcmVudF9zcGFuX2lkOm8sc3Bhbl9pZDpyP3M/LmdldFByb3BhZ2F0aW9uQ29udGV4dCgpLnByb3BhZ2F0aW9uU3BhbklkfHxIKCk6bix0cmFjZV9pZDplfX1mdW5jdGlvbiBpdCh0KXtyZXR1cm4gdCYmdC5sZW5ndGg+MD90Lm1hcCgoe2NvbnRleHQ6e3NwYW5JZDp0LHRyYWNlSWQ6bix0cmFjZUZsYWdzOmUsLi4ucn0sYXR0cmlidXRlczpvfSk9Pih7c3Bhbl9pZDp0LHRyYWNlX2lkOm4sc2FtcGxlZDoxPT09ZSxhdHRyaWJ1dGVzOm8sLi4ucn0pKTp2b2lkIDB9ZnVuY3Rpb24gY3QodCl7cmV0dXJuIm51bWJlciI9PXR5cGVvZiB0P3V0KHQpOkFycmF5LmlzQXJyYXkodCk/dFswXSt0WzFdLzFlOTp0IGluc3RhbmNlb2YgRGF0ZT91dCh0LmdldFRpbWUoKSk6TSgpfWZ1bmN0aW9uIHV0KHQpe3JldHVybiB0Pjk5OTk5OTk5OTk/dC8xZTM6dH1mdW5jdGlvbiBhdCh0KXtpZihmdW5jdGlvbih0KXtyZXR1cm4iZnVuY3Rpb24iPT10eXBlb2YgdC5nZXRTcGFuSlNPTn0odCkpcmV0dXJuIHQuZ2V0U3BhbkpTT04oKTtjb25zdHtzcGFuSWQ6bix0cmFjZUlkOmV9PXQuc3BhbkNvbnRleHQoKTtpZihmdW5jdGlvbih0KXtjb25zdCBuPXQ7cmV0dXJuISEobi5hdHRyaWJ1dGVzJiZuLnN0YXJ0VGltZSYmbi5uYW1lJiZuLmVuZFRpbWUmJm4uc3RhdHVzKX0odCkpe2NvbnN0e2F0dHJpYnV0ZXM6cixzdGFydFRpbWU6byxuYW1lOnMsZW5kVGltZTppLHN0YXR1czpjLGxpbmtzOnV9PXQ7cmV0dXJue3NwYW5faWQ6bix0cmFjZV9pZDplLGRhdGE6cixkZXNjcmlwdGlvbjpzLHBhcmVudF9zcGFuX2lkOiJwYXJlbnRTcGFuSWQiaW4gdD90LnBhcmVudFNwYW5JZDoicGFyZW50U3BhbkNvbnRleHQiaW4gdD90LnBhcmVudFNwYW5Db250ZXh0Py5zcGFuSWQ6dm9pZCAwLHN0YXJ0X3RpbWVzdGFtcDpjdChvKSx0aW1lc3RhbXA6Y3QoaSl8fHZvaWQgMCxzdGF0dXM6ZnQoYyksb3A6clsic2VudHJ5Lm9wIl0sb3JpZ2luOnJbInNlbnRyeS5vcmlnaW4iXSxsaW5rczppdCh1KX19cmV0dXJue3NwYW5faWQ6bix0cmFjZV9pZDplLHN0YXJ0X3RpbWVzdGFtcDowLGRhdGE6e319fWZ1bmN0aW9uIGZ0KHQpe2lmKHQmJjAhPT10LmNvZGUpcmV0dXJuIDE9PT10LmNvZGU/Im9rIjp0Lm1lc3NhZ2V8fCJ1bmtub3duX2Vycm9yIn1mdW5jdGlvbiBodCh0KXtyZXR1cm4gdC5fc2VudHJ5Um9vdFNwYW58fHR9Y29uc3QgcHQ9L15vKFxkKylcLi87ZnVuY3Rpb24gbHQodCxuPSExKXtjb25zdHtob3N0OmUscGF0aDpyLHBhc3M6byxwb3J0OnMscHJvamVjdElkOmkscHJvdG9jb2w6YyxwdWJsaWNLZXk6dX09dDtyZXR1cm5gJHtjfTovLyR7dX0ke24mJm8/YDoke299YDoiIn1AJHtlfSR7cz9gOiR7c31gOiIifS8ke3I/YCR7cn0vYDpyfSR7aX1gfWZ1bmN0aW9uIGR0KHQsbil7Y29uc3QgZT1uLmdldE9wdGlvbnMoKSx7cHVibGljS2V5OnIsaG9zdDpvfT1uLmdldERzbigpfHx7fTtsZXQgcztlLm9yZ0lkP3M9U3RyaW5nKGUub3JnSWQpOm8mJihzPWZ1bmN0aW9uKHQpe2NvbnN0IG49dC5tYXRjaChwdCk7cmV0dXJuIG4/LlsxXX0obykpO2NvbnN0IGk9e2Vudmlyb25tZW50OmUuZW52aXJvbm1lbnR8fCJwcm9kdWN0aW9uIixyZWxlYXNlOmUucmVsZWFzZSxwdWJsaWNfa2V5OnIsdHJhY2VfaWQ6dCxvcmdfaWQ6c307cmV0dXJuIG4uZW1pdCgiY3JlYXRlRHNjIixpKSxpfWZ1bmN0aW9uIG10KHQpe2NvbnN0IG49dHQoKTtpZighbilyZXR1cm57fTtjb25zdCBlPWh0KHQpLHI9YXQoZSksbz1yLmRhdGEscz1lLnNwYW5Db250ZXh0KCkudHJhY2VTdGF0ZSxpPXM/LmdldCgic2VudHJ5LnNhbXBsZV9yYXRlIik/P29bInNlbnRyeS5zYW1wbGVfcmF0ZSJdPz9vWyJzZW50cnkucHJldmlvdXNfdHJhY2Vfc2FtcGxlX3JhdGUiXTtmdW5jdGlvbiBjKHQpe3JldHVybiJudW1iZXIiIT10eXBlb2YgaSYmInN0cmluZyIhPXR5cGVvZiBpfHwodC5zYW1wbGVfcmF0ZT1gJHtpfWApLHR9Y29uc3QgdT1lLl9mcm96ZW5Ec2M7aWYodSlyZXR1cm4gYyh1KTtjb25zdCBhPXM/LmdldCgic2VudHJ5LmRzYyIpLGY9YSYmcnQoYSk7aWYoZilyZXR1cm4gYyhmKTtjb25zdCBoPWR0KHQuc3BhbkNvbnRleHQoKS50cmFjZUlkLG4pLHA9b1sic2VudHJ5LnNvdXJjZSJdLGw9ci5kZXNjcmlwdGlvbjtyZXR1cm4idXJsIiE9PXAmJmwmJihoLnRyYW5zYWN0aW9uPWwpLGZ1bmN0aW9uKHQpe2lmKCJib29sZWFuIj09dHlwZW9mIF9fU0VOVFJZX1RSQUNJTkdfXyYmIV9fU0VOVFJZX1RSQUNJTkdfXylyZXR1cm4hMTtjb25zdCBuPXR8fHR0KCk/LmdldE9wdGlvbnMoKTtyZXR1cm4hKCFufHxudWxsPT1uLnRyYWNlc1NhbXBsZVJhdGUmJiFuLnRyYWNlc1NhbXBsZXIpfSgpJiYoaC5zYW1wbGVkPVN0cmluZyhmdW5jdGlvbih0KXtjb25zdHt0cmFjZUZsYWdzOm59PXQuc3BhbkNvbnRleHQoKTtyZXR1cm4gMT09PW59KGUpKSxoLnNhbXBsZV9yYW5kPXM/LmdldCgic2VudHJ5LnNhbXBsZV9yYW5kIik/P250KGUpLnNjb3BlPy5nZXRQcm9wYWdhdGlvbkNvbnRleHQoKS5zYW1wbGVSYW5kLnRvU3RyaW5nKCkpLGMoaCksbi5lbWl0KCJjcmVhdGVEc2MiLGgsZSksaH1mdW5jdGlvbiBndCh0LG49MTAwLGU9MS8wKXt0cnl7cmV0dXJuIHl0KCIiLHQsbixlKX1jYXRjaCh0KXtyZXR1cm57RVJST1I6YCoqbm9uLXNlcmlhbGl6YWJsZSoqICgke3R9KWB9fX1mdW5jdGlvbiB5dCh0LG4sZT0xLzAscj0xLzAsbz1mdW5jdGlvbigpe2NvbnN0IHQ9bmV3IFdlYWtTZXQ7ZnVuY3Rpb24gbihuKXtyZXR1cm4hIXQuaGFzKG4pfHwodC5hZGQobiksITEpfWZ1bmN0aW9uIGUobil7dC5kZWxldGUobil9cmV0dXJuW24sZV19KCkpe2NvbnN0W3MsaV09bztpZihudWxsPT1ufHxbImJvb2xlYW4iLCJzdHJpbmciXS5pbmNsdWRlcyh0eXBlb2Ygbil8fCJudW1iZXIiPT10eXBlb2YgbiYmTnVtYmVyLmlzRmluaXRlKG4pKXJldHVybiBuO2NvbnN0IGM9ZnVuY3Rpb24odCxuKXt0cnl7aWYoImRvbWFpbiI9PT10JiZuJiYib2JqZWN0Ij09dHlwZW9mIG4mJm4uVSlyZXR1cm4iW0RvbWFpbl0iO2lmKCJkb21haW5FbWl0dGVyIj09PXQpcmV0dXJuIltEb21haW5FbWl0dGVyXSI7aWYoInVuZGVmaW5lZCIhPXR5cGVvZiBnbG9iYWwmJm49PT1nbG9iYWwpcmV0dXJuIltHbG9iYWxdIjtpZigidW5kZWZpbmVkIiE9dHlwZW9mIHdpbmRvdyYmbj09PXdpbmRvdylyZXR1cm4iW1dpbmRvd10iO2lmKCJ1bmRlZmluZWQiIT10eXBlb2YgZG9jdW1lbnQmJm49PT1kb2N1bWVudClyZXR1cm4iW0RvY3VtZW50XSI7aWYoIm9iamVjdCI9PXR5cGVvZihlPW4pJiZudWxsIT09ZSYmKGUuX19pc1Z1ZXx8ZS5NKSlyZXR1cm4iW1Z1ZVZpZXdNb2RlbF0iO2lmKGZ1bmN0aW9uKHQpe3JldHVybiBDKHQpJiYibmF0aXZlRXZlbnQiaW4gdCYmInByZXZlbnREZWZhdWx0ImluIHQmJiJzdG9wUHJvcGFnYXRpb24iaW4gdH0obikpcmV0dXJuIltTeW50aGV0aWNFdmVudF0iO2lmKCJudW1iZXIiPT10eXBlb2YgbiYmIU51bWJlci5pc0Zpbml0ZShuKSlyZXR1cm5gWyR7bn1dYDtpZigiZnVuY3Rpb24iPT10eXBlb2YgbilyZXR1cm5gW0Z1bmN0aW9uOiAke2Z1bmN0aW9uKHQpe3RyeXtyZXR1cm4gdCYmImZ1bmN0aW9uIj09dHlwZW9mIHQmJnQubmFtZXx8JH1jYXRjaCh0KXtyZXR1cm4gJH19KG4pfV1gO2lmKCJzeW1ib2wiPT10eXBlb2YgbilyZXR1cm5gWyR7U3RyaW5nKG4pfV1gO2lmKCJiaWdpbnQiPT10eXBlb2YgbilyZXR1cm5gW0JpZ0ludDogJHtTdHJpbmcobil9XWA7Y29uc3Qgcj1mdW5jdGlvbih0KXtjb25zdCBuPU9iamVjdC5nZXRQcm90b3R5cGVPZih0KTtyZXR1cm4gbj8uY29uc3RydWN0b3I/bi5jb25zdHJ1Y3Rvci5uYW1lOiJudWxsIHByb3RvdHlwZSJ9KG4pO3JldHVybi9eSFRNTChcdyopRWxlbWVudCQvLnRlc3Qocik/YFtIVE1MRWxlbWVudDogJHtyfV1gOmBbb2JqZWN0ICR7cn1dYH1jYXRjaCh0KXtyZXR1cm5gKipub24tc2VyaWFsaXphYmxlKiogKCR7dH0pYH12YXIgZX0odCxuKTtpZighYy5zdGFydHNXaXRoKCJbb2JqZWN0ICIpKXJldHVybiBjO2lmKG4uX19zZW50cnlfc2tpcF9ub3JtYWxpemF0aW9uX18pcmV0dXJuIG47Y29uc3QgdT0ibnVtYmVyIj09dHlwZW9mIG4uX19zZW50cnlfb3ZlcnJpZGVfbm9ybWFsaXphdGlvbl9kZXB0aF9fP24uX19zZW50cnlfb3ZlcnJpZGVfbm9ybWFsaXphdGlvbl9kZXB0aF9fOmU7aWYoMD09PXUpcmV0dXJuIGMucmVwbGFjZSgib2JqZWN0ICIsIiIpO2lmKHMobikpcmV0dXJuIltDaXJjdWxhciB+XSI7Y29uc3QgYT1uO2lmKGEmJiJmdW5jdGlvbiI9PXR5cGVvZiBhLnRvSlNPTil0cnl7cmV0dXJuIHl0KCIiLGEudG9KU09OKCksdS0xLHIsbyl9Y2F0Y2godCl7fWNvbnN0IGY9QXJyYXkuaXNBcnJheShuKT9bXTp7fTtsZXQgaD0wO2NvbnN0IHA9TyhuKTtmb3IoY29uc3QgdCBpbiBwKXtpZighT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHAsdCkpY29udGludWU7aWYoaD49cil7Zlt0XT0iW01heFByb3BlcnRpZXMgfl0iO2JyZWFrfWNvbnN0IG49cFt0XTtmW3RdPXl0KHQsbix1LTEscixvKSxoKyt9cmV0dXJuIGkobiksZn1mdW5jdGlvbiBidCh0LG4pe2NvbnN0IGU9bi5yZXBsYWNlKC9cXC9nLCIvIikucmVwbGFjZSgvW3xcXHt9KClbXF1eJCsqPy5dL2csIlxcJCYiKTtsZXQgcj10O3RyeXtyPWRlY29kZVVSSSh0KX1jYXRjaCh0KXt9cmV0dXJuIHIucmVwbGFjZSgvXFwvZywiLyIpLnJlcGxhY2UoL3dlYnBhY2s6XC8/L2csIiIpLnJlcGxhY2UobmV3IFJlZ0V4cChgKGZpbGU6Ly8pPy8qJHtlfS8qYCwiaWciKSwiYXBwOi8vLyIpfWZ1bmN0aW9uIHZ0KHQsbj1bXSl7cmV0dXJuW3Qsbl19ZnVuY3Rpb24gX3QodCxuKXtjb25zdCBlPXRbMV07Zm9yKGNvbnN0IHQgb2YgZSl7aWYobih0LHRbMF0udHlwZSkpcmV0dXJuITB9cmV0dXJuITF9ZnVuY3Rpb24gd3QodCl7Y29uc3Qgbj1tKHApO3JldHVybiBuLmVuY29kZVBvbHlmaWxsP24uZW5jb2RlUG9seWZpbGwodCk6KG5ldyBUZXh0RW5jb2RlcikuZW5jb2RlKHQpfWZ1bmN0aW9uIFN0KHQpe2NvbnN0W24sZV09dDtsZXQgcj1KU09OLnN0cmluZ2lmeShuKTtmdW5jdGlvbiBvKHQpeyJzdHJpbmciPT10eXBlb2Ygcj9yPSJzdHJpbmciPT10eXBlb2YgdD9yK3Q6W3d0KHIpLHRdOnIucHVzaCgic3RyaW5nIj09dHlwZW9mIHQ/d3QodCk6dCl9Zm9yKGNvbnN0IHQgb2YgZSl7Y29uc3RbbixlXT10O2lmKG8oYFxuJHtKU09OLnN0cmluZ2lmeShuKX1cbmApLCJzdHJpbmciPT10eXBlb2YgZXx8ZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpbyhlKTtlbHNle2xldCB0O3RyeXt0PUpTT04uc3RyaW5naWZ5KGUpfWNhdGNoKG4pe3Q9SlNPTi5zdHJpbmdpZnkoZ3QoZSkpfW8odCl9fXJldHVybiJzdHJpbmciPT10eXBlb2Ygcj9yOmZ1bmN0aW9uKHQpe2NvbnN0IG49dC5yZWR1Y2UoKHQsbik9PnQrbi5sZW5ndGgsMCksZT1uZXcgVWludDhBcnJheShuKTtsZXQgcj0wO2Zvcihjb25zdCBuIG9mIHQpZS5zZXQobixyKSxyKz1uLmxlbmd0aDtyZXR1cm4gZX0ocil9Y29uc3QgJHQ9e3Nlc3Npb246InNlc3Npb24iLHNlc3Npb25zOiJzZXNzaW9uIixhdHRhY2htZW50OiJhdHRhY2htZW50Iix0cmFuc2FjdGlvbjoidHJhbnNhY3Rpb24iLGV2ZW50OiJlcnJvciIsY2xpZW50X3JlcG9ydDoiaW50ZXJuYWwiLHVzZXJfcmVwb3J0OiJkZWZhdWx0Iixwcm9maWxlOiJwcm9maWxlIixwcm9maWxlX2NodW5rOiJwcm9maWxlIixyZXBsYXlfZXZlbnQ6InJlcGxheSIscmVwbGF5X3JlY29yZGluZzoicmVwbGF5IixjaGVja19pbjoibW9uaXRvciIsZmVlZGJhY2s6ImZlZWRiYWNrIixzcGFuOiJzcGFuIixyYXdfc2VjdXJpdHk6InNlY3VyaXR5Iixsb2c6ImxvZ19pdGVtIn07ZnVuY3Rpb24gRXQodCl7aWYoIXQ/LnNkaylyZXR1cm47Y29uc3R7bmFtZTpuLHZlcnNpb246ZX09dC5zZGs7cmV0dXJue25hbWU6bix2ZXJzaW9uOmV9fWZ1bmN0aW9uIHh0KHQsbixlLHIpe2NvbnN0IG89RXQoZSkscz10LnR5cGUmJiJyZXBsYXlfZXZlbnQiIT09dC50eXBlP3QudHlwZToiZXZlbnQiOyFmdW5jdGlvbih0LG4pe24mJih0LnNkaz10LnNka3x8e30sdC5zZGsubmFtZT10LnNkay5uYW1lfHxuLm5hbWUsdC5zZGsudmVyc2lvbj10LnNkay52ZXJzaW9ufHxuLnZlcnNpb24sdC5zZGsuaW50ZWdyYXRpb25zPVsuLi50LnNkay5pbnRlZ3JhdGlvbnN8fFtdLC4uLm4uaW50ZWdyYXRpb25zfHxbXV0sdC5zZGsucGFja2FnZXM9Wy4uLnQuc2RrLnBhY2thZ2VzfHxbXSwuLi5uLnBhY2thZ2VzfHxbXV0pfSh0LGU/LnNkayk7Y29uc3QgaT1mdW5jdGlvbih0LG4sZSxyKXtjb25zdCBvPXQuc2RrUHJvY2Vzc2luZ01ldGFkYXRhPy5keW5hbWljU2FtcGxpbmdDb250ZXh0O3JldHVybntldmVudF9pZDp0LmV2ZW50X2lkLHNlbnRfYXQ6KG5ldyBEYXRlKS50b0lTT1N0cmluZygpLC4uLm4mJntzZGs6bn0sLi4uISFlJiZyJiZ7ZHNuOmx0KHIpfSwuLi5vJiZ7dHJhY2U6b319fSh0LG8scixuKTtkZWxldGUgdC5zZGtQcm9jZXNzaW5nTWV0YWRhdGE7cmV0dXJuIHZ0KGksW1t7dHlwZTpzfSx0XV0pfWNvbnN0IE50PSJfX1NFTlRSWV9TVVBQUkVTU19UUkFDSU5HX18iO2Z1bmN0aW9uIEN0KHQpe2NvbnN0IG49WChkKCkpO3JldHVybiBuLnN1cHByZXNzVHJhY2luZz9uLnN1cHByZXNzVHJhY2luZyh0KTpmdW5jdGlvbiguLi50KXtjb25zdCBuPVgoZCgpKTtpZigyPT09dC5sZW5ndGgpe2NvbnN0W2Uscl09dDtyZXR1cm4gZT9uLndpdGhTZXRTY29wZShlLHIpOm4ud2l0aFNjb3BlKHIpfXJldHVybiBuLndpdGhTY29wZSh0WzBdKX0obj0+e24uc2V0U0RLUHJvY2Vzc2luZ01ldGFkYXRhKHtbTnRdOiEwfSk7Y29uc3QgZT10KCk7cmV0dXJuIG4uc2V0U0RLUHJvY2Vzc2luZ01ldGFkYXRhKHtbTnRdOnZvaWQgMH0pLGV9KX12YXIgVHQ7ZnVuY3Rpb24ga3QodCl7cmV0dXJuIG5ldyBqdChuPT57bih0KX0pfSFmdW5jdGlvbih0KXt0W3QuUEVORElORz0wXT0iUEVORElORyI7dFt0LlJFU09MVkVEPTFdPSJSRVNPTFZFRCI7dFt0LlJFSkVDVEVEPTJdPSJSRUpFQ1RFRCJ9KFR0fHwoVHQ9e30pKTtjbGFzcyBqdHtjb25zdHJ1Y3Rvcih0KXt0aGlzLkw9VHQuUEVORElORyx0aGlzLkI9W10sdGhpcy5HKHQpfXRoZW4odCxuKXtyZXR1cm4gbmV3IGp0KChlLHIpPT57dGhpcy5CLnB1c2goWyExLG49PntpZih0KXRyeXtlKHQobikpfWNhdGNoKHQpe3IodCl9ZWxzZSBlKG4pfSx0PT57aWYobil0cnl7ZShuKHQpKX1jYXRjaCh0KXtyKHQpfWVsc2Ugcih0KX1dKSx0aGlzLkooKX0pfWNhdGNoKHQpe3JldHVybiB0aGlzLnRoZW4odD0+dCx0KX1maW5hbGx5KHQpe3JldHVybiBuZXcganQoKG4sZSk9PntsZXQgcixvO3JldHVybiB0aGlzLnRoZW4obj0+e289ITEscj1uLHQmJnQoKX0sbj0+e289ITAscj1uLHQmJnQoKX0pLnRoZW4oKCk9PntvP2Uocik6bihyKX0pfSl9Sigpe2lmKHRoaXMuTD09PVR0LlBFTkRJTkcpcmV0dXJuO2NvbnN0IHQ9dGhpcy5CLnNsaWNlKCk7dGhpcy5CPVtdLHQuZm9yRWFjaCh0PT57dFswXXx8KHRoaXMuTD09PVR0LlJFU09MVkVEJiZ0WzFdKHRoaXMuSCksdGhpcy5MPT09VHQuUkVKRUNURUQmJnRbMl0odGhpcy5IKSx0WzBdPSEwKX0pfUcodCl7Y29uc3Qgbj0odCxuKT0+e3RoaXMuTD09PVR0LlBFTkRJTkcmJihUKG4pP24udGhlbihlLHIpOih0aGlzLkw9dCx0aGlzLkg9bix0aGlzLkooKSkpfSxlPXQ9PntuKFR0LlJFU09MVkVELHQpfSxyPXQ9PntuKFR0LlJFSkVDVEVELHQpfTt0cnl7dChlLHIpfWNhdGNoKHQpe3IodCl9fX1mdW5jdGlvbiBSdCh0LG4pe2NvbnN0e2ZpbmdlcnByaW50OmUsc3BhbjpyLGJyZWFkY3J1bWJzOm8sc2RrUHJvY2Vzc2luZ01ldGFkYXRhOnN9PW47IWZ1bmN0aW9uKHQsbil7Y29uc3R7ZXh0cmE6ZSx0YWdzOnIsdXNlcjpvLGNvbnRleHRzOnMsbGV2ZWw6aSx0cmFuc2FjdGlvbk5hbWU6Y309bjtPYmplY3Qua2V5cyhlKS5sZW5ndGgmJih0LmV4dHJhPXsuLi5lLC4uLnQuZXh0cmF9KTtPYmplY3Qua2V5cyhyKS5sZW5ndGgmJih0LnRhZ3M9ey4uLnIsLi4udC50YWdzfSk7T2JqZWN0LmtleXMobykubGVuZ3RoJiYodC51c2VyPXsuLi5vLC4uLnQudXNlcn0pO09iamVjdC5rZXlzKHMpLmxlbmd0aCYmKHQuY29udGV4dHM9ey4uLnMsLi4udC5jb250ZXh0c30pO2kmJih0LmxldmVsPWkpO2MmJiJ0cmFuc2FjdGlvbiIhPT10LnR5cGUmJih0LnRyYW5zYWN0aW9uPWMpfSh0LG4pLHImJmZ1bmN0aW9uKHQsbil7dC5jb250ZXh0cz17dHJhY2U6c3QobiksLi4udC5jb250ZXh0c30sdC5zZGtQcm9jZXNzaW5nTWV0YWRhdGE9e2R5bmFtaWNTYW1wbGluZ0NvbnRleHQ6bXQobiksLi4udC5zZGtQcm9jZXNzaW5nTWV0YWRhdGF9O2NvbnN0IGU9aHQobikscj1hdChlKS5kZXNjcmlwdGlvbjtyJiYhdC50cmFuc2FjdGlvbiYmInRyYW5zYWN0aW9uIj09PXQudHlwZSYmKHQudHJhbnNhY3Rpb249cil9KHQsciksZnVuY3Rpb24odCxuKXt0LmZpbmdlcnByaW50PXQuZmluZ2VycHJpbnQ/QXJyYXkuaXNBcnJheSh0LmZpbmdlcnByaW50KT90LmZpbmdlcnByaW50Olt0LmZpbmdlcnByaW50XTpbXSxuJiYodC5maW5nZXJwcmludD10LmZpbmdlcnByaW50LmNvbmNhdChuKSk7dC5maW5nZXJwcmludC5sZW5ndGh8fGRlbGV0ZSB0LmZpbmdlcnByaW50fSh0LGUpLGZ1bmN0aW9uKHQsbil7Y29uc3QgZT1bLi4udC5icmVhZGNydW1ic3x8W10sLi4ubl07dC5icmVhZGNydW1icz1lLmxlbmd0aD9lOnZvaWQgMH0odCxvKSxmdW5jdGlvbih0LG4pe3Quc2RrUHJvY2Vzc2luZ01ldGFkYXRhPXsuLi50LnNka1Byb2Nlc3NpbmdNZXRhZGF0YSwuLi5ufX0odCxzKX1jb25zdCBJdD1TeW1ib2wuZm9yKCJTZW50cnlCdWZmZXJGdWxsRXJyb3IiKTtmdW5jdGlvbiBPdCh0KXtjb25zdCBuPVtdO2Z1bmN0aW9uIGUodCl7cmV0dXJuIG4uc3BsaWNlKG4uaW5kZXhPZih0KSwxKVswXXx8UHJvbWlzZS5yZXNvbHZlKHZvaWQgMCl9cmV0dXJueyQ6bixhZGQ6ZnVuY3Rpb24ocil7aWYoISh2b2lkIDA9PT10fHxuLmxlbmd0aDx0KSlyZXR1cm4gbz1JdCxuZXcganQoKHQsbik9PntuKG8pfSk7dmFyIG87Y29uc3Qgcz1yKCk7cmV0dXJuLTE9PT1uLmluZGV4T2YocykmJm4ucHVzaChzKSxzLnRoZW4oKCk9PmUocykpLnRoZW4obnVsbCwoKT0+ZShzKS50aGVuKG51bGwsKCk9Pnt9KSksc30sZHJhaW46ZnVuY3Rpb24odCl7cmV0dXJuIG5ldyBqdCgoZSxyKT0+e2xldCBvPW4ubGVuZ3RoO2lmKCFvKXJldHVybiBlKCEwKTtjb25zdCBzPXNldFRpbWVvdXQoKCk9Pnt0JiZ0PjAmJmUoITEpfSx0KTtuLmZvckVhY2godD0+e2t0KHQpLnRoZW4oKCk9PnstLW98fChjbGVhclRpbWVvdXQocyksZSghMCkpfSxyKX0pfSl9fX1mdW5jdGlvbiBBdCh0LHtzdGF0dXNDb2RlOm4saGVhZGVyczplfSxyPURhdGUubm93KCkpe2NvbnN0IG89ey4uLnR9LHM9ZT8uWyJ4LXNlbnRyeS1yYXRlLWxpbWl0cyJdLGk9ZT8uWyJyZXRyeS1hZnRlciJdO2lmKHMpZm9yKGNvbnN0IHQgb2Ygcy50cmltKCkuc3BsaXQoIiwiKSl7Y29uc3RbbixlLCwsc109dC5zcGxpdCgiOiIsNSksaT1wYXJzZUludChuLDEwKSxjPTFlMyooaXNOYU4oaSk/NjA6aSk7aWYoZSlmb3IoY29uc3QgdCBvZiBlLnNwbGl0KCI7IikpIm1ldHJpY19idWNrZXQiPT09dCYmcyYmIXMuc3BsaXQoIjsiKS5pbmNsdWRlcygiY3VzdG9tIil8fChvW3RdPXIrYyk7ZWxzZSBvLmFsbD1yK2N9ZWxzZSBpP28uYWxsPXIrZnVuY3Rpb24odCxuPURhdGUubm93KCkpe2NvbnN0IGU9cGFyc2VJbnQoYCR7dH1gLDEwKTtpZighaXNOYU4oZSkpcmV0dXJuIDFlMyplO2NvbnN0IHI9RGF0ZS5wYXJzZShgJHt0fWApO3JldHVybiBpc05hTihyKT82ZTQ6ci1ufShpLHIpOjQyOT09PW4mJihvLmFsbD1yKzZlNCk7cmV0dXJuIG99ZnVuY3Rpb24gRHQodCxuLGU9T3QodC5idWZmZXJTaXplfHw2NCkpe2xldCByPXt9O3JldHVybntzZW5kOmZ1bmN0aW9uKHQpe2NvbnN0IG89W107aWYoX3QodCwodCxuKT0+e2NvbnN0IGU9ZnVuY3Rpb24odCl7cmV0dXJuICR0W3RdfShuKTsoZnVuY3Rpb24odCxuLGU9RGF0ZS5ub3coKSl7cmV0dXJuIGZ1bmN0aW9uKHQsbil7cmV0dXJuIHRbbl18fHQuYWxsfHwwfSh0LG4pPmV9KShyLGUpfHxvLnB1c2godCl9KSwwPT09by5sZW5ndGgpcmV0dXJuIGt0KHt9KTtjb25zdCBzPXZ0KHRbMF0sbyksaT10PT57X3QocywodCxuKT0+e30pfTtyZXR1cm4gZS5hZGQoKCk9Pm4oe2JvZHk6U3Qocyl9KS50aGVuKHQ9Pih2b2lkIDAhPT10LnN0YXR1c0NvZGUmJih0LnN0YXR1c0NvZGU8MjAwfHx0LnN0YXR1c0NvZGU+PTMwMCkmJmgmJl8ud2FybihgU2VudHJ5IHJlc3BvbmRlZCB3aXRoIHN0YXR1cyBjb2RlICR7dC5zdGF0dXNDb2RlfSB0byBzZW50IGV2ZW50LmApLHI9QXQocix0KSx0KSx0PT57dGhyb3cgaSgpLGgmJl8uZXJyb3IoIkVuY291bnRlcmVkIGVycm9yIHJ1bm5pbmcgdHJhbnNwb3J0IHJlcXVlc3Q6Iix0KSx0fSkpLnRoZW4odD0+dCx0PT57aWYodD09PUl0KXJldHVybiBoJiZfLmVycm9yKCJTa2lwcGVkIHNlbmRpbmcgZXZlbnQgYmVjYXVzZSBidWZmZXIgaXMgZnVsbC4iKSxpKCksa3Qoe30pO3Rocm93IHR9KX0sZmx1c2g6dD0+ZS5kcmFpbih0KX19Y29uc3QgUHQ9L14oXFMrOlxcfFwvPykoW1xzXFNdKj8pKCg/OlwuezEsMn18W14vXFxdKz98KShcLlteLi9cXF0qfCkpKD86Wy9cXF0qKSQvO2Z1bmN0aW9uIFV0KHQpe2NvbnN0IG49ZnVuY3Rpb24odCl7Y29uc3Qgbj10Lmxlbmd0aD4xMDI0P2A8dHJ1bmNhdGVkPiR7dC5zbGljZSgtMTAyNCl9YDp0LGU9UHQuZXhlYyhuKTtyZXR1cm4gZT9lLnNsaWNlKDEpOltdfSh0KSxlPW5bMF18fCIiO2xldCByPW5bMV07cmV0dXJuIGV8fHI/KHImJihyPXIuc2xpY2UoMCxyLmxlbmd0aC0xKSksZStyKToiLiJ9ZnVuY3Rpb24gTXQodCxuPSExKXtyZXR1cm4hKG58fHQmJiF0LnN0YXJ0c1dpdGgoIi8iKSYmIXQubWF0Y2goL15bQS1aXTovKSYmIXQuc3RhcnRzV2l0aCgiLiIpJiYhdC5tYXRjaCgvXlthLXpBLVpdKFthLXpBLVowLTkuXC0rXSkqOlwvXC8vKSkmJnZvaWQgMCE9PXQmJiF0LmluY2x1ZGVzKCJub2RlX21vZHVsZXMvIil9Y29uc3QgTHQ9U3ltYm9sKCJBZ2VudEJhc2VJbnRlcm5hbFN0YXRlIik7Y2xhc3MgQnQgZXh0ZW5kcyBzLkFnZW50e2NvbnN0cnVjdG9yKHQpe3N1cGVyKHQpLHRoaXNbTHRdPXt9fWlzU2VjdXJlRW5kcG9pbnQodCl7aWYodCl7aWYoImJvb2xlYW4iPT10eXBlb2YgdC5zZWN1cmVFbmRwb2ludClyZXR1cm4gdC5zZWN1cmVFbmRwb2ludDtpZigic3RyaW5nIj09dHlwZW9mIHQucHJvdG9jb2wpcmV0dXJuImh0dHBzOiI9PT10LnByb3RvY29sfWNvbnN0e3N0YWNrOm59PW5ldyBFcnJvcjtyZXR1cm4ic3RyaW5nIj09dHlwZW9mIG4mJm4uc3BsaXQoIlxuIikuc29tZSh0PT4tMSE9PXQuaW5kZXhPZigiKGh0dHBzLmpzOiIpfHwtMSE9PXQuaW5kZXhPZigibm9kZTpodHRwczoiKSl9Y3JlYXRlU29ja2V0KHQsbixlKXtjb25zdCByPXsuLi5uLHNlY3VyZUVuZHBvaW50OnRoaXMuaXNTZWN1cmVFbmRwb2ludChuKX07UHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKT0+dGhpcy5jb25uZWN0KHQscikpLnRoZW4obz0+e2lmKG8gaW5zdGFuY2VvZiBzLkFnZW50KXJldHVybiBvLmFkZFJlcXVlc3QodCxyKTt0aGlzW0x0XS5jdXJyZW50U29ja2V0PW8sc3VwZXIuY3JlYXRlU29ja2V0KHQsbixlKX0sZSl9Y3JlYXRlQ29ubmVjdGlvbigpe2NvbnN0IHQ9dGhpc1tMdF0uY3VycmVudFNvY2tldDtpZih0aGlzW0x0XS5jdXJyZW50U29ja2V0PXZvaWQgMCwhdCl0aHJvdyBuZXcgRXJyb3IoIk5vIHNvY2tldCB3YXMgcmV0dXJuZWQgaW4gdGhlIGBjb25uZWN0KClgIGZ1bmN0aW9uIik7cmV0dXJuIHR9Z2V0IGRlZmF1bHRQb3J0KCl7cmV0dXJuIHRoaXNbTHRdLmRlZmF1bHRQb3J0Pz8oImh0dHBzOiI9PT10aGlzLnByb3RvY29sPzQ0Mzo4MCl9c2V0IGRlZmF1bHRQb3J0KHQpe3RoaXNbTHRdJiYodGhpc1tMdF0uZGVmYXVsdFBvcnQ9dCl9Z2V0IHByb3RvY29sKCl7cmV0dXJuIHRoaXNbTHRdLnByb3RvY29sPz8odGhpcy5pc1NlY3VyZUVuZHBvaW50KCk/Imh0dHBzOiI6Imh0dHA6Iil9c2V0IHByb3RvY29sKHQpe3RoaXNbTHRdJiYodGhpc1tMdF0ucHJvdG9jb2w9dCl9fWZ1bmN0aW9uIEd0KC4uLnQpe18ubG9nKCJbaHR0cHMtcHJveHktYWdlbnQ6cGFyc2UtcHJveHktcmVzcG9uc2VdIiwuLi50KX1mdW5jdGlvbiBKdCh0KXtyZXR1cm4gbmV3IFByb21pc2UoKG4sZSk9PntsZXQgcj0wO2NvbnN0IG89W107ZnVuY3Rpb24gcygpe2NvbnN0IGM9dC5yZWFkKCk7Yz9mdW5jdGlvbihjKXtvLnB1c2goYykscis9Yy5sZW5ndGg7Y29uc3QgdT1CdWZmZXIuY29uY2F0KG8sciksYT11LmluZGV4T2YoIlxyXG5cclxuIik7aWYoLTE9PT1hKXJldHVybiBHdCgiaGF2ZSBub3QgcmVjZWl2ZWQgZW5kIG9mIEhUVFAgaGVhZGVycyB5ZXQuLi4iKSx2b2lkIHMoKTtjb25zdCBmPXUuc3ViYXJyYXkoMCxhKS50b1N0cmluZygiYXNjaWkiKS5zcGxpdCgiXHJcbiIpLGg9Zi5zaGlmdCgpO2lmKCFoKXJldHVybiB0LmRlc3Ryb3koKSxlKG5ldyBFcnJvcigiTm8gaGVhZGVyIHJlY2VpdmVkIGZyb20gcHJveHkgQ09OTkVDVCByZXNwb25zZSIpKTtjb25zdCBwPWguc3BsaXQoIiAiKSxsPSsocFsxXXx8MCksZD1wLnNsaWNlKDIpLmpvaW4oIiAiKSxtPXt9O2Zvcihjb25zdCBuIG9mIGYpe2lmKCFuKWNvbnRpbnVlO2NvbnN0IHI9bi5pbmRleE9mKCI6Iik7aWYoLTE9PT1yKXJldHVybiB0LmRlc3Ryb3koKSxlKG5ldyBFcnJvcihgSW52YWxpZCBoZWFkZXIgZnJvbSBwcm94eSBDT05ORUNUIHJlc3BvbnNlOiAiJHtufSJgKSk7Y29uc3Qgbz1uLnNsaWNlKDAscikudG9Mb3dlckNhc2UoKSxzPW4uc2xpY2UocisxKS50cmltU3RhcnQoKSxpPW1bb107InN0cmluZyI9PXR5cGVvZiBpP21bb109W2ksc106QXJyYXkuaXNBcnJheShpKT9pLnB1c2gocyk6bVtvXT1zfUd0KCJnb3QgcHJveHkgc2VydmVyIHJlc3BvbnNlOiAlbyAlbyIsaCxtKSxpKCksbih7Y29ubmVjdDp7c3RhdHVzQ29kZTpsLHN0YXR1c1RleHQ6ZCxoZWFkZXJzOm19LGJ1ZmZlcmVkOnV9KX0oYyk6dC5vbmNlKCJyZWFkYWJsZSIscyl9ZnVuY3Rpb24gaSgpe3QucmVtb3ZlTGlzdGVuZXIoImVuZCIsYyksdC5yZW1vdmVMaXN0ZW5lcigiZXJyb3IiLHUpLHQucmVtb3ZlTGlzdGVuZXIoInJlYWRhYmxlIixzKX1mdW5jdGlvbiBjKCl7aSgpLEd0KCJvbmVuZCIpLGUobmV3IEVycm9yKCJQcm94eSBjb25uZWN0aW9uIGVuZGVkIGJlZm9yZSByZWNlaXZpbmcgQ09OTkVDVCByZXNwb25zZSIpKX1mdW5jdGlvbiB1KHQpe2koKSxHdCgib25lcnJvciAlbyIsdCksZSh0KX10Lm9uKCJlcnJvciIsdSksdC5vbigiZW5kIixjKSxzKCl9KX1mdW5jdGlvbiBIdCguLi50KXtfLmxvZygiW2h0dHBzLXByb3h5LWFnZW50XSIsLi4udCl9Y2xhc3MgenQgZXh0ZW5kcyBCdHtzdGF0aWMgX19pbml0U3RhdGljKCl7dGhpcy5wcm90b2NvbHM9WyJodHRwIiwiaHR0cHMiXX1jb25zdHJ1Y3Rvcih0LG4pe3N1cGVyKG4pLHRoaXMub3B0aW9ucz17fSx0aGlzLnByb3h5PSJzdHJpbmciPT10eXBlb2YgdD9uZXcgVVJMKHQpOnQsdGhpcy5wcm94eUhlYWRlcnM9bj8uaGVhZGVycz8/e30sSHQoIkNyZWF0aW5nIG5ldyBIdHRwc1Byb3h5QWdlbnQgaW5zdGFuY2U6ICVvIix0aGlzLnByb3h5LmhyZWYpO2NvbnN0IGU9KHRoaXMucHJveHkuaG9zdG5hbWV8fHRoaXMucHJveHkuaG9zdCkucmVwbGFjZSgvXlxbfFxdJC9nLCIiKSxyPXRoaXMucHJveHkucG9ydD9wYXJzZUludCh0aGlzLnByb3h5LnBvcnQsMTApOiJodHRwczoiPT09dGhpcy5wcm94eS5wcm90b2NvbD80NDM6ODA7dGhpcy5jb25uZWN0T3B0cz17QUxQTlByb3RvY29sczpbImh0dHAvMS4xIl0sLi4ubj9XdChuLCJoZWFkZXJzIik6bnVsbCxob3N0OmUscG9ydDpyfX1hc3luYyBjb25uZWN0KHQsbil7Y29uc3R7cHJveHk6ZX09dGhpcztpZighbi5ob3N0KXRocm93IG5ldyBUeXBlRXJyb3IoJ05vICJob3N0IiBwcm92aWRlZCcpO2xldCByO2lmKCJodHRwczoiPT09ZS5wcm90b2NvbCl7SHQoIkNyZWF0aW5nIGB0bHMuU29ja2V0YDogJW8iLHRoaXMuY29ubmVjdE9wdHMpO2NvbnN0IHQ9dGhpcy5jb25uZWN0T3B0cy5zZXJ2ZXJuYW1lfHx0aGlzLmNvbm5lY3RPcHRzLmhvc3Q7cj1mLmNvbm5lY3Qoey4uLnRoaXMuY29ubmVjdE9wdHMsc2VydmVybmFtZTp0JiZhLmlzSVAodCk/dm9pZCAwOnR9KX1lbHNlIEh0KCJDcmVhdGluZyBgbmV0LlNvY2tldGA6ICVvIix0aGlzLmNvbm5lY3RPcHRzKSxyPWEuY29ubmVjdCh0aGlzLmNvbm5lY3RPcHRzKTtjb25zdCBvPSJmdW5jdGlvbiI9PXR5cGVvZiB0aGlzLnByb3h5SGVhZGVycz90aGlzLnByb3h5SGVhZGVycygpOnsuLi50aGlzLnByb3h5SGVhZGVyc30scz1hLmlzSVB2NihuLmhvc3QpP2BbJHtuLmhvc3R9XWA6bi5ob3N0O2xldCBpPWBDT05ORUNUICR7c306JHtuLnBvcnR9IEhUVFAvMS4xXHJcbmA7aWYoZS51c2VybmFtZXx8ZS5wYXNzd29yZCl7Y29uc3QgdD1gJHtkZWNvZGVVUklDb21wb25lbnQoZS51c2VybmFtZSl9OiR7ZGVjb2RlVVJJQ29tcG9uZW50KGUucGFzc3dvcmQpfWA7b1siUHJveHktQXV0aG9yaXphdGlvbiJdPWBCYXNpYyAke0J1ZmZlci5mcm9tKHQpLnRvU3RyaW5nKCJiYXNlNjQiKX1gfW8uSG9zdD1gJHtzfToke24ucG9ydH1gLG9bIlByb3h5LUNvbm5lY3Rpb24iXXx8KG9bIlByb3h5LUNvbm5lY3Rpb24iXT10aGlzLmtlZXBBbGl2ZT8iS2VlcC1BbGl2ZSI6ImNsb3NlIik7Zm9yKGNvbnN0IHQgb2YgT2JqZWN0LmtleXMobykpaSs9YCR7dH06ICR7b1t0XX1cclxuYDtjb25zdCBjPUp0KHIpO3Iud3JpdGUoYCR7aX1cclxuYCk7Y29uc3R7Y29ubmVjdDp1LGJ1ZmZlcmVkOmh9PWF3YWl0IGM7aWYodC5lbWl0KCJwcm94eUNvbm5lY3QiLHUpLHRoaXMuZW1pdCgicHJveHlDb25uZWN0Iix1LHQpLDIwMD09PXUuc3RhdHVzQ29kZSl7aWYodC5vbmNlKCJzb2NrZXQiLEZ0KSxuLnNlY3VyZUVuZHBvaW50KXtIdCgiVXBncmFkaW5nIHNvY2tldCBjb25uZWN0aW9uIHRvIFRMUyIpO2NvbnN0IHQ9bi5zZXJ2ZXJuYW1lfHxuLmhvc3Q7cmV0dXJuIGYuY29ubmVjdCh7Li4uV3QobiwiaG9zdCIsInBhdGgiLCJwb3J0Iiksc29ja2V0OnIsc2VydmVybmFtZTphLmlzSVAodCk/dm9pZCAwOnR9KX1yZXR1cm4gcn1yLmRlc3Ryb3koKTtjb25zdCBwPW5ldyBhLlNvY2tldCh7d3JpdGFibGU6ITF9KTtyZXR1cm4gcC5yZWFkYWJsZT0hMCx0Lm9uY2UoInNvY2tldCIsdD0+e0h0KCJSZXBsYXlpbmcgcHJveHkgYnVmZmVyIGZvciBmYWlsZWQgcmVxdWVzdCIpLHQucHVzaChoKSx0LnB1c2gobnVsbCl9KSxwfX1mdW5jdGlvbiBGdCh0KXt0LnJlc3VtZSgpfWZ1bmN0aW9uIFd0KHQsLi4ubil7Y29uc3QgZT17fTtsZXQgcjtmb3IociBpbiB0KW4uaW5jbHVkZXMocil8fChlW3JdPXRbcl0pO3JldHVybiBlfXp0Ll9faW5pdFN0YXRpYygpO2Z1bmN0aW9uIFl0KHQpe3JldHVybiB0LnJlcGxhY2UoL15bQS1aXTovLCIiKS5yZXBsYWNlKC9cXC9nLCIvIil9Y29uc3QgS3Q9bjtsZXQgVnQsWnQ9MCxxdD17fTtmdW5jdGlvbiBRdCh0KXtLdC5kZWJ1ZyYmY29uc29sZS5sb2coYFtBTlIgV29ya2VyXSAke3R9YCl9dmFyIFh0LHRuLG5uO2NvbnN0IGVuPWZ1bmN0aW9uKHQpe2xldCBuO3RyeXtuPW5ldyBVUkwodC51cmwpfWNhdGNoKG4pe3JldHVybiB2KCgpPT57Y29uc29sZS53YXJuKCJbQHNlbnRyeS9ub2RlXTogSW52YWxpZCBkc24gb3IgdHVubmVsIG9wdGlvbiwgd2lsbCBub3Qgc2VuZCBhbnkgZXZlbnRzLiBUaGUgdHVubmVsIG9wdGlvbiBtdXN0IGJlIGEgZnVsbCBVUkwgd2hlbiB1c2VkLiIpfSksRHQodCwoKT0+UHJvbWlzZS5yZXNvbHZlKHt9KSl9Y29uc3QgZT0iaHR0cHM6Ij09PW4ucHJvdG9jb2wscj1mdW5jdGlvbih0LG4pe2NvbnN0e25vX3Byb3h5OmV9PXByb2Nlc3MuZW52LHI9ZT8uc3BsaXQoIiwiKS5zb21lKG49PnQuaG9zdC5lbmRzV2l0aChuKXx8dC5ob3N0bmFtZS5lbmRzV2l0aChuKSk7cmV0dXJuIHI/dm9pZCAwOm59KG4sdC5wcm94eXx8KGU/cHJvY2Vzcy5lbnYuaHR0cHNfcHJveHk6dm9pZCAwKXx8cHJvY2Vzcy5lbnYuaHR0cF9wcm94eSksbz1lP2k6cyxhPXZvaWQgMCE9PXQua2VlcEFsaXZlJiZ0LmtlZXBBbGl2ZSxmPXI/bmV3IHp0KHIpOm5ldyBvLkFnZW50KHtrZWVwQWxpdmU6YSxtYXhTb2NrZXRzOjMwLHRpbWVvdXQ6MmUzfSksaD1mdW5jdGlvbih0LG4sZSl7Y29uc3R7aG9zdG5hbWU6cixwYXRobmFtZTpvLHBvcnQ6cyxwcm90b2NvbDppLHNlYXJjaDphfT1uZXcgVVJMKHQudXJsKTtyZXR1cm4gZnVuY3Rpb24oZil7cmV0dXJuIG5ldyBQcm9taXNlKChoLHApPT57Q3QoKCk9PntsZXQgbD1mdW5jdGlvbih0KXtyZXR1cm4gbmV3IGMoe3JlYWQoKXt0aGlzLnB1c2godCksdGhpcy5wdXNoKG51bGwpfX0pfShmLmJvZHkpO2NvbnN0IGQ9ey4uLnQuaGVhZGVyc307Zi5ib2R5Lmxlbmd0aD4zMjc2OCYmKGRbImNvbnRlbnQtZW5jb2RpbmciXT0iZ3ppcCIsbD1sLnBpcGUodSgpKSk7Y29uc3QgbT1uLnJlcXVlc3Qoe21ldGhvZDoiUE9TVCIsYWdlbnQ6ZSxoZWFkZXJzOmQsaG9zdG5hbWU6cixwYXRoOmAke299JHthfWAscG9ydDpzLHByb3RvY29sOmksY2E6dC5jYUNlcnRzfSx0PT57dC5vbigiZGF0YSIsKCk9Pnt9KSx0Lm9uKCJlbmQiLCgpPT57fSksdC5zZXRFbmNvZGluZygidXRmOCIpO2NvbnN0IG49dC5oZWFkZXJzWyJyZXRyeS1hZnRlciJdPz9udWxsLGU9dC5oZWFkZXJzWyJ4LXNlbnRyeS1yYXRlLWxpbWl0cyJdPz9udWxsO2goe3N0YXR1c0NvZGU6dC5zdGF0dXNDb2RlLGhlYWRlcnM6eyJyZXRyeS1hZnRlciI6biwieC1zZW50cnktcmF0ZS1saW1pdHMiOkFycmF5LmlzQXJyYXkoZSk/ZVswXXx8bnVsbDplfX0pfSk7bS5vbigiZXJyb3IiLHApLGwucGlwZShtKX0pfSl9fSh0LHQuaHR0cE1vZHVsZT8/byxmKTtyZXR1cm4gRHQodCxoKX0oe3VybDooWHQ9S3QuZHNuLHRuPUt0LnR1bm5lbCxubj1LdC5zZGtNZXRhZGF0YS5zZGssdG58fGAke2Z1bmN0aW9uKHQpe3JldHVybmAke2Z1bmN0aW9uKHQpe2NvbnN0IG49dC5wcm90b2NvbD9gJHt0LnByb3RvY29sfTpgOiIiLGU9dC5wb3J0P2A6JHt0LnBvcnR9YDoiIjtyZXR1cm5gJHtufS8vJHt0Lmhvc3R9JHtlfSR7dC5wYXRoP2AvJHt0LnBhdGh9YDoiIn0vYXBpL2B9KHQpfSR7dC5wcm9qZWN0SWR9L2VudmVsb3BlL2B9KFh0KX0/JHtmdW5jdGlvbih0LG4pe2NvbnN0IGU9e3NlbnRyeV92ZXJzaW9uOiI3In07cmV0dXJuIHQucHVibGljS2V5JiYoZS5zZW50cnlfa2V5PXQucHVibGljS2V5KSxuJiYoZS5zZW50cnlfY2xpZW50PWAke24ubmFtZX0vJHtuLnZlcnNpb259YCksbmV3IFVSTFNlYXJjaFBhcmFtcyhlKS50b1N0cmluZygpfShYdCxubil9YCl9KTthc3luYyBmdW5jdGlvbiBybigpe2lmKFZ0KXtRdCgiU2VuZGluZyBhYm5vcm1hbCBzZXNzaW9uIiksQihWdCx7c3RhdHVzOiJhYm5vcm1hbCIsYWJub3JtYWxfbWVjaGFuaXNtOiJhbnJfZm9yZWdyb3VuZCIscmVsZWFzZTpLdC5yZWxlYXNlLGVudmlyb25tZW50Okt0LmVudmlyb25tZW50fSk7Y29uc3QgdD1mdW5jdGlvbih0LG4sZSxyKXtjb25zdCBvPUV0KGUpO3JldHVybiB2dCh7c2VudF9hdDoobmV3IERhdGUpLnRvSVNPU3RyaW5nKCksLi4ubyYme3NkazpvfSwuLi4hIXImJm4mJntkc246bHQobil9fSxbImFnZ3JlZ2F0ZXMiaW4gdD9be3R5cGU6InNlc3Npb25zIn0sdF06W3t0eXBlOiJzZXNzaW9uIn0sdC50b0pTT04oKV1dKX0oVnQsS3QuZHNuLEt0LnNka01ldGFkYXRhLEt0LnR1bm5lbCk7UXQoSlNPTi5zdHJpbmdpZnkodCkpLGF3YWl0IGVuLnNlbmQodCk7dHJ5e2U/LnBvc3RNZXNzYWdlKCJzZXNzaW9uLWVuZGVkIil9Y2F0Y2godCl7fX19ZnVuY3Rpb24gb24odCl7aWYoIXQpcmV0dXJuO2NvbnN0IG49ZnVuY3Rpb24odCl7aWYoIXQubGVuZ3RoKXJldHVybltdO2NvbnN0IG49QXJyYXkuZnJvbSh0KTtyZXR1cm4vc2VudHJ5V3JhcHBlZC8udGVzdChTKG4pLmZ1bmN0aW9ufHwiIikmJm4ucG9wKCksbi5yZXZlcnNlKCksdy50ZXN0KFMobikuZnVuY3Rpb258fCIiKSYmKG4ucG9wKCksdy50ZXN0KFMobikuZnVuY3Rpb258fCIiKSYmbi5wb3AoKSksbi5zbGljZSgwLDUwKS5tYXAodD0+KHsuLi50LGZpbGVuYW1lOnQuZmlsZW5hbWV8fFMobikuZmlsZW5hbWUsZnVuY3Rpb246dC5mdW5jdGlvbnx8Ij8ifSkpfSh0KTtpZihLdC5hcHBSb290UGF0aClmb3IoY29uc3QgdCBvZiBuKXQuZmlsZW5hbWUmJih0LmZpbGVuYW1lPWJ0KHQuZmlsZW5hbWUsS3QuYXBwUm9vdFBhdGgpKTtyZXR1cm4gbn1hc3luYyBmdW5jdGlvbiBzbih0LG4pe2lmKFp0Pj1LdC5tYXhBbnJFdmVudHMpcmV0dXJuO1p0Kz0xLGF3YWl0IHJuKCksUXQoIlNlbmRpbmcgZXZlbnQiKTtjb25zdCBlPXtldmVudF9pZDpQKCksY29udGV4dHM6S3QuY29udGV4dHMscmVsZWFzZTpLdC5yZWxlYXNlLGVudmlyb25tZW50Okt0LmVudmlyb25tZW50LGRpc3Q6S3QuZGlzdCxwbGF0Zm9ybToibm9kZSIsbGV2ZWw6ImVycm9yIixleGNlcHRpb246e3ZhbHVlczpbe3R5cGU6IkFwcGxpY2F0aW9uTm90UmVzcG9uZGluZyIsdmFsdWU6YEFwcGxpY2F0aW9uIE5vdCBSZXNwb25kaW5nIGZvciBhdCBsZWFzdCAke0t0LmFuclRocmVzaG9sZH0gbXNgLHN0YWNrdHJhY2U6e2ZyYW1lczpvbih0KX0sbWVjaGFuaXNtOnt0eXBlOiJBTlIifX1dfSx0YWdzOkt0LnN0YXRpY1RhZ3N9O24mJmZ1bmN0aW9uKHQsbil7aWYoUnQodCxuKSwhdC5jb250ZXh0cz8udHJhY2Upe2NvbnN0e3RyYWNlSWQ6ZSxwYXJlbnRTcGFuSWQ6cixwcm9wYWdhdGlvblNwYW5JZDpvfT1uLnByb3BhZ2F0aW9uQ29udGV4dDt0LmNvbnRleHRzPXt0cmFjZTp7dHJhY2VfaWQ6ZSxzcGFuX2lkOm98fEgoKSxwYXJlbnRfc3Bhbl9pZDpyfSwuLi50LmNvbnRleHRzfX19KGUsbiksZnVuY3Rpb24odCl7aWYoMD09PU9iamVjdC5rZXlzKHF0KS5sZW5ndGgpcmV0dXJuO2NvbnN0IG49S3QuYXBwUm9vdFBhdGg/e306cXQ7aWYoS3QuYXBwUm9vdFBhdGgpZm9yKGNvbnN0W3QsZV1vZiBPYmplY3QuZW50cmllcyhxdCkpbltidCh0LEt0LmFwcFJvb3RQYXRoKV09ZTtjb25zdCBlPW5ldyBNYXA7Zm9yKGNvbnN0IHIgb2YgdC5leGNlcHRpb24/LnZhbHVlc3x8W10pZm9yKGNvbnN0IHQgb2Ygci5zdGFja3RyYWNlPy5mcmFtZXN8fFtdKXtjb25zdCByPXQuYWJzX3BhdGh8fHQuZmlsZW5hbWU7ciYmbltyXSYmZS5zZXQocixuW3JdKX1pZihlLnNpemU+MCl7Y29uc3Qgbj1bXTtmb3IoY29uc3RbdCxyXW9mIGUuZW50cmllcygpKW4ucHVzaCh7dHlwZToic291cmNlbWFwIixjb2RlX2ZpbGU6dCxkZWJ1Z19pZDpyfSk7dC5kZWJ1Z19tZXRhPXtpbWFnZXM6bn19fShlKTtjb25zdCByPXh0KGUsS3QuZHNuLEt0LnNka01ldGFkYXRhLEt0LnR1bm5lbCk7UXQoSlNPTi5zdHJpbmdpZnkocikpLGF3YWl0IGVuLnNlbmQociksYXdhaXQgZW4uZmx1c2goMmUzKSxadD49S3QubWF4QW5yRXZlbnRzJiZzZXRUaW1lb3V0KCgpPT57cHJvY2Vzcy5leGl0KDApfSw1ZTMpfWxldCBjbjtpZihRdCgiU3RhcnRlZCIpLEt0LmNhcHR1cmVTdGFja1RyYWNlKXtRdCgiQ29ubmVjdGluZyB0byBkZWJ1Z2dlciIpO2NvbnN0IG49bmV3IHQ7bi5jb25uZWN0VG9NYWluVGhyZWFkKCksUXQoIkNvbm5lY3RlZCB0byBkZWJ1Z2dlciIpO2NvbnN0IGU9bmV3IE1hcDtuLm9uKCJEZWJ1Z2dlci5zY3JpcHRQYXJzZWQiLHQ9PntlLnNldCh0LnBhcmFtcy5zY3JpcHRJZCx0LnBhcmFtcy51cmwpfSksbi5vbigiRGVidWdnZXIucGF1c2VkIix0PT57aWYoIm90aGVyIj09PXQucGFyYW1zLnJlYXNvbil0cnl7UXQoIkRlYnVnZ2VyIHBhdXNlZCIpO2NvbnN0IHM9Wy4uLnQucGFyYW1zLmNhbGxGcmFtZXNdLGk9S3QuYXBwUm9vdFBhdGg/ZnVuY3Rpb24odD0ocHJvY2Vzcy5hcmd2WzFdP1V0KHByb2Nlc3MuYXJndlsxXSk6cHJvY2Vzcy5jd2QoKSksbj0iXFwiPT09byl7Y29uc3QgZT1uP1l0KHQpOnQ7cmV0dXJuIHQ9PntpZighdClyZXR1cm47Y29uc3Qgbz1uP1l0KHQpOnQ7bGV0e2RpcjpzLGJhc2U6aSxleHQ6Y309ci5wYXJzZShvKTsiLmpzIiE9PWMmJiIubWpzIiE9PWMmJiIuY2pzIiE9PWN8fChpPWkuc2xpY2UoMCwtMSpjLmxlbmd0aCkpO2NvbnN0IHU9ZGVjb2RlVVJJQ29tcG9uZW50KGkpO3N8fChzPSIuIik7Y29uc3QgYT1zLmxhc3RJbmRleE9mKCIvbm9kZV9tb2R1bGVzIik7aWYoYT4tMSlyZXR1cm5gJHtzLnNsaWNlKGErMTQpLnJlcGxhY2UoL1wvL2csIi4iKX06JHt1fWA7aWYocy5zdGFydHNXaXRoKGUpKXtjb25zdCB0PXMuc2xpY2UoZS5sZW5ndGgrMSkucmVwbGFjZSgvXC8vZywiLiIpO3JldHVybiB0P2Ake3R9OiR7dX1gOnV9cmV0dXJuIHV9fShLdC5hcHBSb290UGF0aCk6KCk9Pnt9LGM9cy5tYXAodD0+ZnVuY3Rpb24odCxuLGUpe2NvbnN0IHI9bj9uLnJlcGxhY2UoL15maWxlOlwvXC8vLCIiKTp2b2lkIDAsbz10LmxvY2F0aW9uLmNvbHVtbk51bWJlcj90LmxvY2F0aW9uLmNvbHVtbk51bWJlcisxOnZvaWQgMCxzPXQubG9jYXRpb24ubGluZU51bWJlcj90LmxvY2F0aW9uLmxpbmVOdW1iZXIrMTp2b2lkIDA7cmV0dXJue2ZpbGVuYW1lOnIsbW9kdWxlOmUociksZnVuY3Rpb246dC5mdW5jdGlvbk5hbWV8fCI/Iixjb2xubzpvLGxpbmVubzpzLGluX2FwcDpyP010KHIpOnZvaWQgMH19KHQsZS5nZXQodC5sb2NhdGlvbi5zY3JpcHRJZCksaSkpLHU9c2V0VGltZW91dCgoKT0+e3NuKGMpLnRoZW4obnVsbCwoKT0+e1F0KCJTZW5kaW5nIEFOUiBldmVudCBmYWlsZWQuIil9KX0sNWUzKTtuLnBvc3QoIlJ1bnRpbWUuZXZhbHVhdGUiLHtleHByZXNzaW9uOiJnbG9iYWwuX19TRU5UUllfR0VUX1NDT1BFU19fKCk7IixzaWxlbnQ6ITAscmV0dXJuQnlWYWx1ZTohMH0sKHQsZSk9Pnt0JiZRdChgRXJyb3IgZXhlY3V0aW5nIHNjcmlwdDogJyR7dC5tZXNzYWdlfSdgKSxjbGVhclRpbWVvdXQodSk7Y29uc3Qgcj1lPy5yZXN1bHQ/ZS5yZXN1bHQudmFsdWU6dm9pZCAwO24ucG9zdCgiRGVidWdnZXIucmVzdW1lIiksbi5wb3N0KCJEZWJ1Z2dlci5kaXNhYmxlIiksc24oYyxyKS50aGVuKG51bGwsKCk9PntRdCgiU2VuZGluZyBBTlIgZXZlbnQgZmFpbGVkLiIpfSl9KX1jYXRjaCh0KXt0aHJvdyBuLnBvc3QoIkRlYnVnZ2VyLnJlc3VtZSIpLG4ucG9zdCgiRGVidWdnZXIuZGlzYWJsZSIpLHR9fSksY249KCk9Pnt0cnl7bi5wb3N0KCJEZWJ1Z2dlci5lbmFibGUiLCgpPT57bi5wb3N0KCJEZWJ1Z2dlci5wYXVzZSIpfSl9Y2F0Y2godCl7fX19Y29uc3R7cG9sbDp1bn09ZnVuY3Rpb24odCxuLGUscil7Y29uc3Qgbz10KCk7bGV0IHM9ITEsaT0hMDtyZXR1cm4gc2V0SW50ZXJ2YWwoKCk9Pntjb25zdCB0PW8uZ2V0VGltZU1zKCk7ITE9PT1zJiZ0Pm4rZSYmKHM9ITAsaSYmcigpKSx0PG4rZSYmKHM9ITEpfSwyMCkse3BvbGw6KCk9PntvLnJlc2V0KCl9LGVuYWJsZWQ6dD0+e2k9dH19fShmdW5jdGlvbigpe2xldCB0PXByb2Nlc3MuaHJ0aW1lKCk7cmV0dXJue2dldFRpbWVNczooKT0+e2NvbnN0W24sZV09cHJvY2Vzcy5ocnRpbWUodCk7cmV0dXJuIE1hdGguZmxvb3IoMWUzKm4rZS8xZTYpfSxyZXNldDooKT0+e3Q9cHJvY2Vzcy5ocnRpbWUoKX19fSxLdC5wb2xsSW50ZXJ2YWwsS3QuYW5yVGhyZXNob2xkLGZ1bmN0aW9uKCl7UXQoIldhdGNoZG9nIHRpbWVvdXQiKSxjbj8oUXQoIlBhdXNpbmcgZGVidWdnZXIgdG8gY2FwdHVyZSBzdGFjayB0cmFjZSIpLGNuKCkpOihRdCgiQ2FwdHVyaW5nIGV2ZW50IHdpdGhvdXQgYSBzdGFjayB0cmFjZSIpLHNuKCkudGhlbihudWxsLCgpPT57UXQoIlNlbmRpbmcgQU5SIGV2ZW50IGZhaWxlZCBvbiB3YXRjaGRvZyB0aW1lb3V0LiIpfSkpfSk7ZT8ub24oIm1lc3NhZ2UiLHQ9Pnt0LnNlc3Npb24mJihWdD1MKHQuc2Vzc2lvbikpLHQuZGVidWdJbWFnZXMmJihxdD10LmRlYnVnSW1hZ2VzKSx1bigpfSk7';
const DEFAULT_INTERVAL = 50;
const DEFAULT_HANG_THRESHOLD = 5000;
function log(message, ...args) {
    core.logger.log(`[ANR] ${message}`, ...args);
}
function globalWithScopeFetchFn() {
    return core.GLOBAL_OBJ;
}
/** Fetches merged scope data */ function getScopeData() {
    const scope = core.getGlobalScope().getScopeData();
    core.mergeScopeData(scope, core.getIsolationScope().getScopeData());
    core.mergeScopeData(scope, core.getCurrentScope().getScopeData());
    // We remove attachments because they likely won't serialize well as json
    scope.attachments = [];
    // We can't serialize event processor functions
    scope.eventProcessors = [];
    return scope;
}
/**
 * Gets contexts by calling all event processors. This shouldn't be called until all integrations are setup
 */ async function getContexts(client) {
    let event = {
        message: 'ANR'
    };
    const eventHint = {};
    for (const processor of client.getEventProcessors()){
        if (event === null) break;
        event = await processor(event, eventHint);
    }
    return event?.contexts || {};
}
const INTEGRATION_NAME = 'Anr';
// eslint-disable-next-line deprecation/deprecation
const _anrIntegration = (options = {})=>{
    if (nodeVersion.NODE_VERSION.major < 16 || nodeVersion.NODE_VERSION.major === 16 && nodeVersion.NODE_VERSION.minor < 17) {
        throw new Error('ANR detection requires Node 16.17.0 or later');
    }
    let worker;
    let client;
    // Hookup the scope fetch function to the global object so that it can be called from the worker thread via the
    // debugger when it pauses
    const gbl = globalWithScopeFetchFn();
    gbl.__SENTRY_GET_SCOPES__ = getScopeData;
    return {
        name: INTEGRATION_NAME,
        startWorker: ()=>{
            if (worker) {
                return;
            }
            if (client) {
                worker = _startWorker(client, options);
            }
        },
        stopWorker: ()=>{
            if (worker) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                worker.then((stop)=>{
                    stop();
                    worker = undefined;
                });
            }
        },
        async setup (initClient) {
            client = initClient;
            if (options.captureStackTrace && await debug.isDebuggerEnabled()) {
                core.logger.warn('ANR captureStackTrace has been disabled because the debugger was already enabled');
                options.captureStackTrace = false;
            }
            // setImmediate is used to ensure that all other integrations have had their setup called first.
            // This allows us to call into all integrations to fetch the full context
            setImmediate(()=>this.startWorker());
        }
    };
};
// eslint-disable-next-line deprecation/deprecation
/**
 * Application Not Responding (ANR) integration for Node.js applications.
 *
 * @deprecated The ANR integration has been deprecated. Use `eventLoopBlockIntegration` from `@sentry/node-native` instead.
 *
 * Detects when the Node.js main thread event loop is blocked for more than the configured
 * threshold (5 seconds by default) and reports these as Sentry events.
 *
 * ANR detection uses a worker thread to monitor the event loop in the main app thread.
 * The main app thread sends a heartbeat message to the ANR worker thread every 50ms by default.
 * If the ANR worker does not receive a heartbeat message for the configured threshold duration,
 * it triggers an ANR event.
 *
 * - Node.js 16.17.0 or higher
 * - Only supported in the Node.js runtime (not browsers)
 * - Not supported for Node.js clusters
 *
 * Overhead should be minimal:
 * - Main thread: Only polling the ANR worker over IPC every 50ms
 * - Worker thread: Consumes around 10-20 MB of RAM
 * - When ANR detected: Brief pause in debugger to capture stack trace (negligible compared to the blocking)
 *
 * @example
 * ```javascript
 * Sentry.init({
 *   dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
 *   integrations: [
 *     Sentry.anrIntegration({
 *       anrThreshold: 5000,
 *       captureStackTrace: true,
 *       pollInterval: 50,
 *     }),
 *   ],
 * });
 * ```
 */ const anrIntegration = core.defineIntegration(_anrIntegration);
/**
 * Starts the ANR worker thread
 *
 * @returns A function to stop the worker
 */ async function _startWorker(client, // eslint-disable-next-line deprecation/deprecation
integrationOptions) {
    const dsn = client.getDsn();
    if (!dsn) {
        return ()=>{
        //
        };
    }
    const contexts = await getContexts(client);
    // These will not be accurate if sent later from the worker thread
    delete contexts.app?.app_memory;
    delete contexts.device?.free_memory;
    const initOptions = client.getOptions();
    const sdkMetadata = client.getSdkMetadata() || {};
    if (sdkMetadata.sdk) {
        sdkMetadata.sdk.integrations = initOptions.integrations.map((i)=>i.name);
    }
    const options = {
        debug: core.logger.isEnabled(),
        dsn,
        tunnel: initOptions.tunnel,
        environment: initOptions.environment || 'production',
        release: initOptions.release,
        dist: initOptions.dist,
        sdkMetadata,
        appRootPath: integrationOptions.appRootPath,
        pollInterval: integrationOptions.pollInterval || DEFAULT_INTERVAL,
        anrThreshold: integrationOptions.anrThreshold || DEFAULT_HANG_THRESHOLD,
        captureStackTrace: !!integrationOptions.captureStackTrace,
        maxAnrEvents: integrationOptions.maxAnrEvents || 1,
        staticTags: integrationOptions.staticTags || {},
        contexts
    };
    if (options.captureStackTrace) {
        const inspector = await Promise.resolve().then(()=>__turbopack_external_require__('node:inspector', true));
        if (!inspector.url()) {
            inspector.open(0);
        }
    }
    const worker = new node_worker_threads.Worker(new URL(`data:application/javascript;base64,${base64WorkerScript}`), {
        workerData: options,
        // We don't want any Node args to be passed to the worker
        execArgv: [],
        env: {
            ...process.env,
            NODE_OPTIONS: undefined
        }
    });
    process.on('exit', ()=>{
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        worker.terminate();
    });
    const timer = setInterval(()=>{
        try {
            const currentSession = core.getIsolationScope().getSession();
            // We need to copy the session object and remove the toJSON method so it can be sent to the worker
            // serialized without making it a SerializedSession
            const session = currentSession ? {
                ...currentSession,
                toJSON: undefined
            } : undefined;
            // message the worker to tell it the main event loop is still running
            worker.postMessage({
                session,
                debugImages: core.getFilenameToDebugIdMap(initOptions.stackParser)
            });
        } catch (_) {
        //
        }
    }, options.pollInterval);
    // Timer should not block exit
    timer.unref();
    worker.on('message', (msg)=>{
        if (msg === 'session-ended') {
            log('ANR event sent from ANR worker. Clearing session in this thread.');
            core.getIsolationScope().setSession(undefined);
        }
    });
    worker.once('error', (err)=>{
        clearInterval(timer);
        log('ANR worker error', err);
    });
    worker.once('exit', (code)=>{
        clearInterval(timer);
        log('ANR worker exit', code);
    });
    // Ensure this thread can't block app exit
    worker.unref();
    return ()=>{
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        worker.terminate();
        clearInterval(timer);
    };
}
/**
 * Temporarily disables ANR detection for the duration of a callback function.
 *
 * This utility function allows you to disable ANR detection during operations that
 * are expected to block the event loop, such as intensive computational tasks or
 * synchronous I/O operations.
 *
 * @deprecated The ANR integration has been deprecated. Use `eventLoopBlockIntegration` from `@sentry/node-native` instead.
 */ function disableAnrDetectionForCallback(callback) {
    const integration = core.getClient()?.getIntegrationByName(INTEGRATION_NAME);
    if (!integration) {
        return callback();
    }
    integration.stopWorker();
    const result = callback();
    if (isPromise(result)) {
        return result.finally(()=>integration.startWorker());
    }
    integration.startWorker();
    return result;
}
exports.anrIntegration = anrIntegration;
exports.base64WorkerScript = base64WorkerScript;
exports.disableAnrDetectionForCallback = disableAnrDetectionForCallback; //# sourceMappingURL=index.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/spotlight.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const http = require("node:http");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const INTEGRATION_NAME = 'Spotlight';
const _spotlightIntegration = (options = {})=>{
    const _options = {
        sidecarUrl: options.sidecarUrl || 'http://localhost:8969/stream'
    };
    return {
        name: INTEGRATION_NAME,
        setup (client) {
            if (typeof process === 'object' && process.env && ("TURBOPACK compile-time value", "development") && ("TURBOPACK compile-time value", "development") !== 'development') {
                core.logger.warn("[Spotlight] It seems you're not in dev mode. Do you really want to have Spotlight enabled?");
            }
            connectToSpotlight(client, _options);
        }
    };
};
/**
 * Use this integration to send errors and transactions to Spotlight.
 *
 * Learn more about spotlight at https://spotlightjs.com
 *
 * Important: This integration only works with Node 18 or newer.
 */ const spotlightIntegration = core.defineIntegration(_spotlightIntegration);
function connectToSpotlight(client, options) {
    const spotlightUrl = parseSidecarUrl(options.sidecarUrl);
    if (!spotlightUrl) {
        return;
    }
    let failedRequests = 0;
    client.on('beforeEnvelope', (envelope)=>{
        if (failedRequests > 3) {
            core.logger.warn('[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests');
            return;
        }
        const serializedEnvelope = core.serializeEnvelope(envelope);
        core.suppressTracing(()=>{
            const req = http.request({
                method: 'POST',
                path: spotlightUrl.pathname,
                hostname: spotlightUrl.hostname,
                port: spotlightUrl.port,
                headers: {
                    'Content-Type': 'application/x-sentry-envelope'
                }
            }, (res)=>{
                if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
                    // Reset failed requests counter on success
                    failedRequests = 0;
                }
                res.on('data', ()=>{
                // Drain socket
                });
                res.on('end', ()=>{
                // Drain socket
                });
                res.setEncoding('utf8');
            });
            req.on('error', ()=>{
                failedRequests++;
                core.logger.warn('[Spotlight] Failed to send envelope to Spotlight Sidecar');
            });
            req.write(serializedEnvelope);
            req.end();
        });
    });
}
function parseSidecarUrl(url) {
    try {
        return new URL(`${url}`);
    } catch  {
        core.logger.warn(`[Spotlight] Invalid sidecar URL: ${url}`);
        return undefined;
    }
}
exports.INTEGRATION_NAME = INTEGRATION_NAME;
exports.spotlightIntegration = spotlightIntegration; //# sourceMappingURL=spotlight.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/childProcess.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const diagnosticsChannel = require("node:diagnostics_channel");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const INTEGRATION_NAME = 'ChildProcess';
/**
 * Capture breadcrumbs and events for child processes and worker threads.
 */ const childProcessIntegration = core.defineIntegration((options = {})=>{
    return {
        name: INTEGRATION_NAME,
        setup () {
            diagnosticsChannel.channel('child_process').subscribe((event)=>{
                if (event && typeof event === 'object' && 'process' in event) {
                    captureChildProcessEvents(event.process, options);
                }
            });
            diagnosticsChannel.channel('worker_threads').subscribe((event)=>{
                if (event && typeof event === 'object' && 'worker' in event) {
                    captureWorkerThreadEvents(event.worker, options);
                }
            });
        }
    };
});
function captureChildProcessEvents(child, options) {
    let hasExited = false;
    let data;
    child.on('spawn', ()=>{
        // This is Sentry getting macOS OS context
        if (child.spawnfile === '/usr/bin/sw_vers') {
            hasExited = true;
            return;
        }
        data = {
            spawnfile: child.spawnfile
        };
        if (options.includeChildProcessArgs) {
            data.spawnargs = child.spawnargs;
        }
    }).on('exit', (code)=>{
        if (!hasExited) {
            hasExited = true;
            // Only log for non-zero exit codes
            if (code !== null && code !== 0) {
                core.addBreadcrumb({
                    category: 'child_process',
                    message: `Child process exited with code '${code}'`,
                    level: code === 0 ? 'info' : 'warning',
                    data
                });
            }
        }
    }).on('error', (error)=>{
        if (!hasExited) {
            hasExited = true;
            core.addBreadcrumb({
                category: 'child_process',
                message: `Child process errored with '${error.message}'`,
                level: 'error',
                data
            });
        }
    });
}
function captureWorkerThreadEvents(worker, options) {
    let threadId;
    worker.on('online', ()=>{
        threadId = worker.threadId;
    }).on('error', (error)=>{
        if (options.captureWorkerErrors !== false) {
            core.captureException(error, {
                mechanism: {
                    type: 'instrument',
                    handled: false,
                    data: {
                        threadId: String(threadId)
                    }
                }
            });
        } else {
            core.addBreadcrumb({
                category: 'worker_thread',
                message: `Worker thread errored with '${error.message}'`,
                level: 'error',
                data: {
                    threadId
                }
            });
        }
    });
}
exports.childProcessIntegration = childProcessIntegration; //# sourceMappingURL=childProcess.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/winston.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const capture = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/logs/capture.js [app-ssr] (ecmascript)");
const DEFAULT_CAPTURED_LEVELS = [
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal'
];
// See: https://github.com/winstonjs/triple-beam
const LEVEL_SYMBOL = Symbol.for('level');
const MESSAGE_SYMBOL = Symbol.for('message');
const SPLAT_SYMBOL = Symbol.for('splat');
/**
 * Options for the Sentry Winston transport.
 */ /**
 * Creates a new Sentry Winston transport that fowards logs to Sentry. Requires `_experiments.enableLogs` to be enabled.
 *
 * Supports Winston 3.x.x.
 *
 * @param TransportClass - The Winston transport class to extend.
 * @returns The extended transport class.
 *
 * @experimental This method will experience breaking changes. This is not yet part of
 * the stable Sentry SDK API and can be changed or removed without warning.
 *
 * @example
 * ```ts
 * const winston = require('winston');
 * const Transport = require('winston-transport');
 *
 * const SentryWinstonTransport = Sentry.createSentryWinstonTransport(Transport);
 *
 * const logger = winston.createLogger({
 *   transports: [new SentryWinstonTransport()],
 * });
 * ```
 */ function createSentryWinstonTransport(// eslint-disable-next-line @typescript-eslint/no-explicit-any
TransportClass, sentryWinstonOptions) {
    // @ts-ignore - We know this is safe because SentryWinstonTransport extends TransportClass
    class SentryWinstonTransport extends TransportClass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(options){
            super(options);
            this._levels = new Set(sentryWinstonOptions?.levels ?? DEFAULT_CAPTURED_LEVELS);
        }
        /**
     * Forwards a winston log to the Sentry SDK.
     */ log(info, callback) {
            try {
                setImmediate(()=>{
                    // @ts-ignore - We know this is safe because SentryWinstonTransport extends TransportClass
                    this.emit('logged', info);
                });
                if (!isObject(info)) {
                    return;
                }
                const levelFromSymbol = info[LEVEL_SYMBOL];
                // See: https://github.com/winstonjs/winston?tab=readme-ov-file#streams-objectmode-and-info-objects
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { level, message, timestamp, ...attributes } = info;
                // Remove all symbols from the remaining attributes
                attributes[LEVEL_SYMBOL] = undefined;
                attributes[MESSAGE_SYMBOL] = undefined;
                attributes[SPLAT_SYMBOL] = undefined;
                const logSeverityLevel = WINSTON_LEVEL_TO_LOG_SEVERITY_LEVEL_MAP[levelFromSymbol] ?? 'info';
                if (this._levels.has(logSeverityLevel)) {
                    capture.captureLog(logSeverityLevel, message, {
                        ...attributes,
                        'sentry.origin': 'auto.logging.winston'
                    });
                }
            } catch  {
            // do nothing
            }
            if (callback) {
                callback();
            }
        }
    }
    return SentryWinstonTransport;
}
function isObject(anything) {
    return typeof anything === 'object' && anything != null;
}
// npm
// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }
//
// syslog
// {
//   emerg: 0,
//   alert: 1,
//   crit: 2,
//   error: 3,
//   warning: 4,
//   notice: 5,
//   info: 6,
//   debug: 7,
// }
const WINSTON_LEVEL_TO_LOG_SEVERITY_LEVEL_MAP = {
    // npm
    silly: 'trace',
    // npm and syslog
    debug: 'debug',
    // npm
    verbose: 'debug',
    // npm
    http: 'debug',
    // npm and syslog
    info: 'info',
    // syslog
    notice: 'info',
    // npm
    warn: 'warn',
    // syslog
    warning: 'warn',
    // npm and syslog
    error: 'error',
    // syslog
    emerg: 'fatal',
    // syslog
    alert: 'fatal',
    // syslog
    crit: 'fatal'
};
exports.createSentryWinstonTransport = createSentryWinstonTransport; //# sourceMappingURL=winston.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/otel/contextManager.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const contextAsyncHooks = __turbopack_require__("[project]/node_modules/.pnpm/@opentelemetry+context-async-hooks@1.30.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/context-async-hooks/build/src/index.js [app-ssr] (ecmascript)");
const opentelemetry = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+opentelemetry@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30_o5xloretc4oxncwjv67h3aqgxy/node_modules/@sentry/opentelemetry/build/cjs/index.js [app-ssr] (ecmascript)");
/**
 * This is a custom ContextManager for OpenTelemetry, which extends the default AsyncLocalStorageContextManager.
 * It ensures that we create a new hub per context, so that the OTEL Context & the Sentry Scopes are always in sync.
 *
 * Note that we currently only support AsyncHooks with this,
 * but since this should work for Node 14+ anyhow that should be good enough.
 */ const SentryContextManager = opentelemetry.wrapContextManagerClass(contextAsyncHooks.AsyncLocalStorageContextManager);
exports.SentryContextManager = SentryContextManager; //# sourceMappingURL=contextManager.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/otel/logger.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const api = require("@opentelemetry/api");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
/**
 * Setup the OTEL logger to use our own logger.
 */ function setupOpenTelemetryLogger() {
    const otelLogger = new Proxy(core.logger, {
        get (target, prop, receiver) {
            const actualProp = prop === 'verbose' ? 'debug' : prop;
            return Reflect.get(target, actualProp, receiver);
        }
    });
    // Disable diag, to ensure this works even if called multiple times
    api.diag.disable();
    api.diag.setLogger(otelLogger, api.DiagLogLevel.DEBUG);
}
exports.setupOpenTelemetryLogger = setupOpenTelemetryLogger; //# sourceMappingURL=logger.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/processSession.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const INTEGRATION_NAME = 'ProcessSession';
/**
 * Records a Session for the current process to track release health.
 */ const processSessionIntegration = core.defineIntegration(()=>{
    return {
        name: INTEGRATION_NAME,
        setupOnce () {
            core.startSession();
            // Emitted in the case of healthy sessions, error of `mechanism.handled: true` and unhandledrejections because
            // The 'beforeExit' event is not emitted for conditions causing explicit termination,
            // such as calling process.exit() or uncaught exceptions.
            // Ref: https://nodejs.org/api/process.html#process_event_beforeexit
            process.on('beforeExit', ()=>{
                const session = core.getIsolationScope().getSession();
                // Only call endSession, if the Session exists on Scope and SessionStatus is not a
                // Terminal Status i.e. Exited or Crashed because
                // "When a session is moved away from ok it must not be updated anymore."
                // Ref: https://develop.sentry.dev/sdk/sessions/
                if (session?.status !== 'ok') {
                    core.endSession();
                }
            });
        }
    };
});
exports.processSessionIntegration = processSessionIntegration; //# sourceMappingURL=processSession.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/proxy/base.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const http = require("node:http");
require("node:https");
/**
 * This code was originally forked from https://github.com/TooTallNate/proxy-agents/tree/b133295fd16f6475578b6b15bd9b4e33ecb0d0b7
 * With the following LICENSE:
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Nathan Rajlich <nathan@tootallnate.net>*
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:*
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.*
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */ const INTERNAL = Symbol('AgentBaseInternalState');
class Agent extends http.Agent {
    // Set by `http.Agent` - missing from `@types/node`
    constructor(opts){
        super(opts);
        this[INTERNAL] = {};
    }
    /**
   * Determine whether this is an `http` or `https` request.
   */ isSecureEndpoint(options) {
        if (options) {
            // First check the `secureEndpoint` property explicitly, since this
            // means that a parent `Agent` is "passing through" to this instance.
            if (typeof options.secureEndpoint === 'boolean') {
                return options.secureEndpoint;
            }
            // If no explicit `secure` endpoint, check if `protocol` property is
            // set. This will usually be the case since using a full string URL
            // or `URL` instance should be the most common usage.
            if (typeof options.protocol === 'string') {
                return options.protocol === 'https:';
            }
        }
        // Finally, if no `protocol` property was set, then fall back to
        // checking the stack trace of the current call stack, and try to
        // detect the "https" module.
        const { stack } = new Error();
        if (typeof stack !== 'string') return false;
        return stack.split('\n').some((l)=>l.indexOf('(https.js:') !== -1 || l.indexOf('node:https:') !== -1);
    }
    createSocket(req, options, cb) {
        const connectOpts = {
            ...options,
            secureEndpoint: this.isSecureEndpoint(options)
        };
        Promise.resolve().then(()=>this.connect(req, connectOpts)).then((socket)=>{
            if (socket instanceof http.Agent) {
                // @ts-expect-error `addRequest()` isn't defined in `@types/node`
                return socket.addRequest(req, connectOpts);
            }
            this[INTERNAL].currentSocket = socket;
            // @ts-expect-error `createSocket()` isn't defined in `@types/node`
            super.createSocket(req, options, cb);
        }, cb);
    }
    createConnection() {
        const socket = this[INTERNAL].currentSocket;
        this[INTERNAL].currentSocket = undefined;
        if (!socket) {
            throw new Error('No socket was returned in the `connect()` function');
        }
        return socket;
    }
    get defaultPort() {
        return this[INTERNAL].defaultPort ?? (this.protocol === 'https:' ? 443 : 80);
    }
    set defaultPort(v) {
        if (this[INTERNAL]) {
            this[INTERNAL].defaultPort = v;
        }
    }
    get protocol() {
        return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? 'https:' : 'http:');
    }
    set protocol(v) {
        if (this[INTERNAL]) {
            this[INTERNAL].protocol = v;
        }
    }
}
exports.Agent = Agent; //# sourceMappingURL=base.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/proxy/parse-proxy-response.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
function debug(...args) {
    core.logger.log('[https-proxy-agent:parse-proxy-response]', ...args);
}
function parseProxyResponse(socket) {
    return new Promise((resolve, reject)=>{
        // we need to buffer any HTTP traffic that happens with the proxy before we get
        // the CONNECT response, so that if the response is anything other than an "200"
        // response code, then we can re-play the "data" events on the socket once the
        // HTTP parser is hooked up...
        let buffersLength = 0;
        const buffers = [];
        function read() {
            const b = socket.read();
            if (b) ondata(b);
            else socket.once('readable', read);
        }
        function cleanup() {
            socket.removeListener('end', onend);
            socket.removeListener('error', onerror);
            socket.removeListener('readable', read);
        }
        function onend() {
            cleanup();
            debug('onend');
            reject(new Error('Proxy connection ended before receiving CONNECT response'));
        }
        function onerror(err) {
            cleanup();
            debug('onerror %o', err);
            reject(err);
        }
        function ondata(b) {
            buffers.push(b);
            buffersLength += b.length;
            const buffered = Buffer.concat(buffers, buffersLength);
            const endOfHeaders = buffered.indexOf('\r\n\r\n');
            if (endOfHeaders === -1) {
                // keep buffering
                debug('have not received end of HTTP headers yet...');
                read();
                return;
            }
            const headerParts = buffered.subarray(0, endOfHeaders).toString('ascii').split('\r\n');
            const firstLine = headerParts.shift();
            if (!firstLine) {
                socket.destroy();
                return reject(new Error('No header received from proxy CONNECT response'));
            }
            const firstLineParts = firstLine.split(' ');
            const statusCode = +(firstLineParts[1] || 0);
            const statusText = firstLineParts.slice(2).join(' ');
            const headers = {};
            for (const header of headerParts){
                if (!header) continue;
                const firstColon = header.indexOf(':');
                if (firstColon === -1) {
                    socket.destroy();
                    return reject(new Error(`Invalid header from proxy CONNECT response: "${header}"`));
                }
                const key = header.slice(0, firstColon).toLowerCase();
                const value = header.slice(firstColon + 1).trimStart();
                const current = headers[key];
                if (typeof current === 'string') {
                    headers[key] = [
                        current,
                        value
                    ];
                } else if (Array.isArray(current)) {
                    current.push(value);
                } else {
                    headers[key] = value;
                }
            }
            debug('got proxy server response: %o %o', firstLine, headers);
            cleanup();
            resolve({
                connect: {
                    statusCode,
                    statusText,
                    headers
                },
                buffered
            });
        }
        socket.on('error', onerror);
        socket.on('end', onend);
        read();
    });
}
exports.parseProxyResponse = parseProxyResponse; //# sourceMappingURL=parse-proxy-response.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/proxy/index.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const net = require("node:net");
const tls = require("node:tls");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const base = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/proxy/base.js [app-ssr] (ecmascript)");
const parseProxyResponse = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/proxy/parse-proxy-response.js [app-ssr] (ecmascript)");
function debug(...args) {
    core.logger.log('[https-proxy-agent]', ...args);
}
/**
 * The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to
 * the specified "HTTP(s) proxy server" in order to proxy HTTPS requests.
 *
 * Outgoing HTTP requests are first tunneled through the proxy server using the
 * `CONNECT` HTTP request method to establish a connection to the proxy server,
 * and then the proxy server connects to the destination target and issues the
 * HTTP request from the proxy server.
 *
 * `https:` requests have their socket connection upgraded to TLS once
 * the connection to the proxy server has been established.
 */ class HttpsProxyAgent extends base.Agent {
    static __initStatic() {
        this.protocols = [
            'http',
            'https'
        ];
    }
    constructor(proxy, opts){
        super(opts);
        this.options = {};
        this.proxy = typeof proxy === 'string' ? new URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug('Creating new HttpsProxyAgent instance: %o', this.proxy.href);
        // Trim off the brackets from IPv6 addresses
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, '');
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === 'https:' ? 443 : 80;
        this.connectOpts = {
            // Attempt to negotiate http/1.1 for proxy servers that support http/2
            ALPNProtocols: [
                'http/1.1'
            ],
            ...opts ? omit(opts, 'headers') : null,
            host,
            port
        };
    }
    /**
   * Called when the node-core HTTP client library is creating a
   * new HTTP request.
   */ async connect(req, opts) {
        const { proxy } = this;
        if (!opts.host) {
            throw new TypeError('No "host" provided');
        }
        // Create a socket connection to the proxy server.
        let socket;
        if (proxy.protocol === 'https:') {
            debug('Creating `tls.Socket`: %o', this.connectOpts);
            const servername = this.connectOpts.servername || this.connectOpts.host;
            socket = tls.connect({
                ...this.connectOpts,
                servername: servername && net.isIP(servername) ? undefined : servername
            });
        } else {
            debug('Creating `net.Socket`: %o', this.connectOpts);
            socket = net.connect(this.connectOpts);
        }
        const headers = typeof this.proxyHeaders === 'function' ? this.proxyHeaders() : {
            ...this.proxyHeaders
        };
        const host = net.isIPv6(opts.host) ? `[${opts.host}]` : opts.host;
        let payload = `CONNECT ${host}:${opts.port} HTTP/1.1\r\n`;
        // Inject the `Proxy-Authorization` header if necessary.
        if (proxy.username || proxy.password) {
            const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
            headers['Proxy-Authorization'] = `Basic ${Buffer.from(auth).toString('base64')}`;
        }
        headers.Host = `${host}:${opts.port}`;
        if (!headers['Proxy-Connection']) {
            headers['Proxy-Connection'] = this.keepAlive ? 'Keep-Alive' : 'close';
        }
        for (const name of Object.keys(headers)){
            payload += `${name}: ${headers[name]}\r\n`;
        }
        const proxyResponsePromise = parseProxyResponse.parseProxyResponse(socket);
        socket.write(`${payload}\r\n`);
        const { connect, buffered } = await proxyResponsePromise;
        req.emit('proxyConnect', connect);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Not EventEmitter in Node types
        this.emit('proxyConnect', connect, req);
        if (connect.statusCode === 200) {
            req.once('socket', resume);
            if (opts.secureEndpoint) {
                // The proxy is connecting to a TLS server, so upgrade
                // this socket connection to a TLS connection.
                debug('Upgrading socket connection to TLS');
                const servername = opts.servername || opts.host;
                return tls.connect({
                    ...omit(opts, 'host', 'path', 'port'),
                    socket,
                    servername: net.isIP(servername) ? undefined : servername
                });
            }
            return socket;
        }
        // Some other status code that's not 200... need to re-play the HTTP
        // header "data" events onto the socket once the HTTP machinery is
        // attached so that the node core `http` can parse and handle the
        // error status code.
        // Close the original socket, and a new "fake" socket is returned
        // instead, so that the proxy doesn't get the HTTP request
        // written to it (which may contain `Authorization` headers or other
        // sensitive data).
        //
        // See: https://hackerone.com/reports/541502
        socket.destroy();
        const fakeSocket = new net.Socket({
            writable: false
        });
        fakeSocket.readable = true;
        // Need to wait for the "socket" event to re-play the "data" events.
        req.once('socket', (s)=>{
            debug('Replaying proxy buffer for failed request');
            // Replay the "buffered" Buffer onto the fake `socket`, since at
            // this point the HTTP module machinery has been hooked up for
            // the user.
            s.push(buffered);
            s.push(null);
        });
        return fakeSocket;
    }
}
HttpsProxyAgent.__initStatic();
function resume(socket) {
    socket.resume();
}
function omit(obj, ...keys) {
    const ret = {};
    let key;
    for(key in obj){
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
}
exports.HttpsProxyAgent = HttpsProxyAgent; //# sourceMappingURL=index.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/transports/http.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const http = require("node:http");
const https = require("node:https");
const node_stream = require("node:stream");
const node_zlib = require("node:zlib");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const index = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/proxy/index.js [app-ssr] (ecmascript)");
// Estimated maximum size for reasonable standalone event
const GZIP_THRESHOLD = 1024 * 32;
/**
 * Gets a stream from a Uint8Array or string
 * Readable.from is ideal but was added in node.js v12.3.0 and v10.17.0
 */ function streamFromBody(body) {
    return new node_stream.Readable({
        read () {
            this.push(body);
            this.push(null);
        }
    });
}
/**
 * Creates a Transport that uses native the native 'http' and 'https' modules to send events to Sentry.
 */ function makeNodeTransport(options) {
    let urlSegments;
    try {
        urlSegments = new URL(options.url);
    } catch (e) {
        core.consoleSandbox(()=>{
            // eslint-disable-next-line no-console
            console.warn('[@sentry/node]: Invalid dsn or tunnel option, will not send any events. The tunnel option must be a full URL when used.');
        });
        return core.createTransport(options, ()=>Promise.resolve({}));
    }
    const isHttps = urlSegments.protocol === 'https:';
    // Proxy prioritization: http => `options.proxy` | `process.env.http_proxy`
    // Proxy prioritization: https => `options.proxy` | `process.env.https_proxy` | `process.env.http_proxy`
    const proxy = applyNoProxyOption(urlSegments, options.proxy || (isHttps ? process.env.https_proxy : undefined) || process.env.http_proxy);
    const nativeHttpModule = isHttps ? https : http;
    const keepAlive = options.keepAlive === undefined ? false : options.keepAlive;
    // TODO(v10): Evaluate if we can set keepAlive to true. This would involve testing for memory leaks in older node
    // versions(>= 8) as they had memory leaks when using it: #2555
    const agent = proxy ? new index.HttpsProxyAgent(proxy) : new nativeHttpModule.Agent({
        keepAlive,
        maxSockets: 30,
        timeout: 2000
    });
    const requestExecutor = createRequestExecutor(options, options.httpModule ?? nativeHttpModule, agent);
    return core.createTransport(options, requestExecutor);
}
/**
 * Honors the `no_proxy` env variable with the highest priority to allow for hosts exclusion.
 *
 * @param transportUrl The URL the transport intends to send events to.
 * @param proxy The client configured proxy.
 * @returns A proxy the transport should use.
 */ function applyNoProxyOption(transportUrlSegments, proxy) {
    const { no_proxy } = process.env;
    const urlIsExemptFromProxy = no_proxy?.split(',').some((exemption)=>transportUrlSegments.host.endsWith(exemption) || transportUrlSegments.hostname.endsWith(exemption));
    if (urlIsExemptFromProxy) {
        return undefined;
    } else {
        return proxy;
    }
}
/**
 * Creates a RequestExecutor to be used with `createTransport`.
 */ function createRequestExecutor(options, httpModule, agent) {
    const { hostname, pathname, port, protocol, search } = new URL(options.url);
    return function makeRequest(request) {
        return new Promise((resolve, reject)=>{
            // This ensures we do not generate any spans in OpenTelemetry for the transport
            core.suppressTracing(()=>{
                let body = streamFromBody(request.body);
                const headers = {
                    ...options.headers
                };
                if (request.body.length > GZIP_THRESHOLD) {
                    headers['content-encoding'] = 'gzip';
                    body = body.pipe(node_zlib.createGzip());
                }
                const req = httpModule.request({
                    method: 'POST',
                    agent,
                    headers,
                    hostname,
                    path: `${pathname}${search}`,
                    port,
                    protocol,
                    ca: options.caCerts
                }, (res)=>{
                    res.on('data', ()=>{
                    // Drain socket
                    });
                    res.on('end', ()=>{
                    // Drain socket
                    });
                    res.setEncoding('utf8');
                    // "Key-value pairs of header names and values. Header names are lower-cased."
                    // https://nodejs.org/api/http.html#http_message_headers
                    const retryAfterHeader = res.headers['retry-after'] ?? null;
                    const rateLimitsHeader = res.headers['x-sentry-rate-limits'] ?? null;
                    resolve({
                        statusCode: res.statusCode,
                        headers: {
                            'retry-after': retryAfterHeader,
                            'x-sentry-rate-limits': Array.isArray(rateLimitsHeader) ? rateLimitsHeader[0] || null : rateLimitsHeader
                        }
                    });
                });
                req.on('error', reject);
                body.pipe(req);
            });
        });
    };
}
exports.makeNodeTransport = makeNodeTransport; //# sourceMappingURL=http.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/envToBool.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const FALSY_ENV_VALUES = new Set([
    'false',
    'f',
    'n',
    'no',
    'off',
    '0'
]);
const TRUTHY_ENV_VALUES = new Set([
    'true',
    't',
    'y',
    'yes',
    'on',
    '1'
]);
/**
 * A helper function which casts an ENV variable value to `true` or `false` using the constants defined above.
 * In strict mode, it may return `null` if the value doesn't match any of the predefined values.
 *
 * @param value The value of the env variable
 * @param options -- Only has `strict` key for now, which requires a strict match for `true` in TRUTHY_ENV_VALUES
 * @returns true/false if the lowercase value matches the predefined values above. If not, null in strict mode,
 *          and Boolean(value) in loose mode.
 */ function envToBool(value, options) {
    const normalized = String(value).toLowerCase();
    if (FALSY_ENV_VALUES.has(normalized)) {
        return false;
    }
    if (TRUTHY_ENV_VALUES.has(normalized)) {
        return true;
    }
    return options?.strict ? null : Boolean(value);
}
exports.FALSY_ENV_VALUES = FALSY_ENV_VALUES;
exports.TRUTHY_ENV_VALUES = TRUTHY_ENV_VALUES;
exports.envToBool = envToBool; //# sourceMappingURL=envToBool.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/module.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const node_path = require("node:path");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
/** normalizes Windows paths */ function normalizeWindowsPath(path) {
    return path.replace(/^[A-Z]:/, '') // remove Windows-style prefix
    .replace(/\\/g, '/'); // replace all `\` instances with `/`
}
/** Creates a function that gets the module name from a filename */ function createGetModuleFromFilename(basePath = process.argv[1] ? core.dirname(process.argv[1]) : process.cwd(), isWindows = node_path.sep === '\\') {
    const normalizedBase = isWindows ? normalizeWindowsPath(basePath) : basePath;
    return (filename)=>{
        if (!filename) {
            return;
        }
        const normalizedFilename = isWindows ? normalizeWindowsPath(filename) : filename;
        // eslint-disable-next-line prefer-const
        let { dir, base: file, ext } = node_path.posix.parse(normalizedFilename);
        if (ext === '.js' || ext === '.mjs' || ext === '.cjs') {
            file = file.slice(0, ext.length * -1);
        }
        // The file name might be URI-encoded which we want to decode to
        // the original file name.
        const decodedFile = decodeURIComponent(file);
        if (!dir) {
            // No dirname whatsoever
            dir = '.';
        }
        const n = dir.lastIndexOf('/node_modules');
        if (n > -1) {
            return `${dir.slice(n + 14).replace(/\//g, '.')}:${decodedFile}`;
        }
        // Let's see if it's a part of the main module
        // To be a part of main module, it has to share the same base
        if (dir.startsWith(normalizedBase)) {
            const moduleName = dir.slice(normalizedBase.length + 1).replace(/\//g, '.');
            return moduleName ? `${moduleName}:${decodedFile}` : decodedFile;
        }
        return decodedFile;
    };
}
exports.createGetModuleFromFilename = createGetModuleFromFilename; //# sourceMappingURL=module.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/api.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const module$1 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/module.js [app-ssr] (ecmascript)");
/**
 * Returns a release dynamically from environment variables.
 */ // eslint-disable-next-line complexity
function getSentryRelease(fallback) {
    // Always read first as Sentry takes this as precedence
    if (process.env.SENTRY_RELEASE) {
        return process.env.SENTRY_RELEASE;
    }
    // This supports the variable that sentry-webpack-plugin injects
    if (core.GLOBAL_OBJ.SENTRY_RELEASE?.id) {
        return core.GLOBAL_OBJ.SENTRY_RELEASE.id;
    }
    // This list is in approximate alpha order, separated into 3 categories:
    // 1. Git providers
    // 2. CI providers with specific environment variables (has the provider name in the variable name)
    // 3. CI providers with generic environment variables (checked for last to prevent possible false positives)
    const possibleReleaseNameOfGitProvider = // GitHub Actions - https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
    process.env['GITHUB_SHA'] || // GitLab CI - https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
    process.env['CI_MERGE_REQUEST_SOURCE_BRANCH_SHA'] || process.env['CI_BUILD_REF'] || process.env['CI_COMMIT_SHA'] || // Bitbucket - https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/
    process.env['BITBUCKET_COMMIT'];
    const possibleReleaseNameOfCiProvidersWithSpecificEnvVar = // AppVeyor - https://www.appveyor.com/docs/environment-variables/
    process.env['APPVEYOR_PULL_REQUEST_HEAD_COMMIT'] || process.env['APPVEYOR_REPO_COMMIT'] || // AWS CodeBuild - https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html
    process.env['CODEBUILD_RESOLVED_SOURCE_VERSION'] || // AWS Amplify - https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html
    process.env['AWS_COMMIT_ID'] || // Azure Pipelines - https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml
    process.env['BUILD_SOURCEVERSION'] || // Bitrise - https://devcenter.bitrise.io/builds/available-environment-variables/
    process.env['GIT_CLONE_COMMIT_HASH'] || // Buddy CI - https://buddy.works/docs/pipelines/environment-variables#default-environment-variables
    process.env['BUDDY_EXECUTION_REVISION'] || // Builtkite - https://buildkite.com/docs/pipelines/environment-variables
    process.env['BUILDKITE_COMMIT'] || // CircleCI - https://circleci.com/docs/variables/
    process.env['CIRCLE_SHA1'] || // Cirrus CI - https://cirrus-ci.org/guide/writing-tasks/#environment-variables
    process.env['CIRRUS_CHANGE_IN_REPO'] || // Codefresh - https://codefresh.io/docs/docs/codefresh-yaml/variables/
    process.env['CF_REVISION'] || // Codemagic - https://docs.codemagic.io/yaml-basic-configuration/environment-variables/
    process.env['CM_COMMIT'] || // Cloudflare Pages - https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables
    process.env['CF_PAGES_COMMIT_SHA'] || // Drone - https://docs.drone.io/pipeline/environment/reference/
    process.env['DRONE_COMMIT_SHA'] || // Flightcontrol - https://www.flightcontrol.dev/docs/guides/flightcontrol/environment-variables#built-in-environment-variables
    process.env['FC_GIT_COMMIT_SHA'] || // Heroku #1 https://devcenter.heroku.com/articles/heroku-ci
    process.env['HEROKU_TEST_RUN_COMMIT_VERSION'] || // Heroku #2 https://docs.sentry.io/product/integrations/deployment/heroku/#configure-releases
    process.env['HEROKU_SLUG_COMMIT'] || // Railway - https://docs.railway.app/reference/variables#git-variables
    process.env['RAILWAY_GIT_COMMIT_SHA'] || // Render - https://render.com/docs/environment-variables
    process.env['RENDER_GIT_COMMIT'] || // Semaphore CI - https://docs.semaphoreci.com/ci-cd-environment/environment-variables
    process.env['SEMAPHORE_GIT_SHA'] || // TravisCI - https://docs.travis-ci.com/user/environment-variables/#default-environment-variables
    process.env['TRAVIS_PULL_REQUEST_SHA'] || // Vercel - https://vercel.com/docs/v2/build-step#system-environment-variables
    process.env['VERCEL_GIT_COMMIT_SHA'] || process.env['VERCEL_GITHUB_COMMIT_SHA'] || process.env['VERCEL_GITLAB_COMMIT_SHA'] || process.env['VERCEL_BITBUCKET_COMMIT_SHA'] || // Zeit (now known as Vercel)
    process.env['ZEIT_GITHUB_COMMIT_SHA'] || process.env['ZEIT_GITLAB_COMMIT_SHA'] || process.env['ZEIT_BITBUCKET_COMMIT_SHA'];
    const possibleReleaseNameOfCiProvidersWithGenericEnvVar = // CloudBees CodeShip - https://docs.cloudbees.com/docs/cloudbees-codeship/latest/pro-builds-and-configuration/environment-variables
    process.env['CI_COMMIT_ID'] || // Coolify - https://coolify.io/docs/knowledge-base/environment-variables
    process.env['SOURCE_COMMIT'] || // Heroku #3 https://devcenter.heroku.com/changelog-items/630
    process.env['SOURCE_VERSION'] || // Jenkins - https://plugins.jenkins.io/git/#environment-variables
    process.env['GIT_COMMIT'] || // Netlify - https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
    process.env['COMMIT_REF'] || // TeamCity - https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
    process.env['BUILD_VCS_NUMBER'] || // Woodpecker CI - https://woodpecker-ci.org/docs/usage/environment
    process.env['CI_COMMIT_SHA'];
    return possibleReleaseNameOfGitProvider || possibleReleaseNameOfCiProvidersWithSpecificEnvVar || possibleReleaseNameOfCiProvidersWithGenericEnvVar || fallback;
}
/** Node.js stack parser */ const defaultStackParser = core.createStackParser(core.nodeStackLineParser(module$1.createGetModuleFromFilename()));
exports.defaultStackParser = defaultStackParser;
exports.getSentryRelease = getSentryRelease; //# sourceMappingURL=api.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/client.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const os = require("node:os");
const api = require("@opentelemetry/api");
const instrumentation = __turbopack_require__("[project]/node_modules/.pnpm/@opentelemetry+instrumentation@0.57.2_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-ssr] (ecmascript) <facade>");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const opentelemetry = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+opentelemetry@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30_o5xloretc4oxncwjv67h3aqgxy/node_modules/@sentry/opentelemetry/build/cjs/index.js [app-ssr] (ecmascript)");
const worker_threads = require("worker_threads");
const debugBuild = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/debug-build.js [app-ssr] (ecmascript)");
const DEFAULT_CLIENT_REPORT_FLUSH_INTERVAL_MS = 60000; // 60s was chosen arbitrarily
/** A client for using Sentry with Node & OpenTelemetry. */ class NodeClient extends core.ServerRuntimeClient {
    constructor(options){
        const serverName = options.includeServerName === false ? undefined : options.serverName || global.process.env.SENTRY_NAME || os.hostname();
        const clientOptions = {
            ...options,
            platform: 'node',
            runtime: {
                name: 'node',
                version: global.process.version
            },
            serverName
        };
        if (options.openTelemetryInstrumentations) {
            instrumentation.registerInstrumentations({
                instrumentations: options.openTelemetryInstrumentations
            });
        }
        core.applySdkMetadata(clientOptions, 'node');
        core.logger.log(`Initializing Sentry: process: ${process.pid}, thread: ${worker_threads.isMainThread ? 'main' : `worker-${worker_threads.threadId}`}.`);
        super(clientOptions);
        if (this.getOptions()._experiments?.enableLogs) {
            this._logOnExitFlushListener = ()=>{
                core._INTERNAL_flushLogsBuffer(this);
            };
            if (serverName) {
                this.on('beforeCaptureLog', (log)=>{
                    log.attributes = {
                        ...log.attributes,
                        'server.address': serverName
                    };
                });
            }
            process.on('beforeExit', this._logOnExitFlushListener);
        }
    }
    /** Get the OTEL tracer. */ get tracer() {
        if (this._tracer) {
            return this._tracer;
        }
        const name = '@sentry/node';
        const version = core.SDK_VERSION;
        const tracer = api.trace.getTracer(name, version);
        this._tracer = tracer;
        return tracer;
    }
    // Eslint ignore explanation: This is already documented in super.
    // eslint-disable-next-line jsdoc/require-jsdoc
    async flush(timeout) {
        const provider = this.traceProvider;
        await provider?.forceFlush();
        if (this.getOptions().sendClientReports) {
            this._flushOutcomes();
        }
        return super.flush(timeout);
    }
    // Eslint ignore explanation: This is already documented in super.
    // eslint-disable-next-line jsdoc/require-jsdoc
    close(timeout) {
        if (this._clientReportInterval) {
            clearInterval(this._clientReportInterval);
        }
        if (this._clientReportOnExitFlushListener) {
            process.off('beforeExit', this._clientReportOnExitFlushListener);
        }
        if (this._logOnExitFlushListener) {
            process.off('beforeExit', this._logOnExitFlushListener);
        }
        return super.close(timeout);
    }
    /**
   * Will start tracking client reports for this client.
   *
   * NOTICE: This method will create an interval that is periodically called and attach a `process.on('beforeExit')`
   * hook. To clean up these resources, call `.close()` when you no longer intend to use the client. Not doing so will
   * result in a memory leak.
   */ // The reason client reports need to be manually activated with this method instead of just enabling them in a
    // constructor, is that if users periodically and unboundedly create new clients, we will create more and more
    // intervals and beforeExit listeners, thus leaking memory. In these situations, users are required to call
    // `client.close()` in order to dispose of the acquired resources.
    // We assume that calling this method in Sentry.init() is a sensible default, because calling Sentry.init() over and
    // over again would also result in memory leaks.
    // Note: We have experimented with using `FinalizationRegisty` to clear the interval when the client is garbage
    // collected, but it did not work, because the cleanup function never got called.
    startClientReportTracking() {
        const clientOptions = this.getOptions();
        if (clientOptions.sendClientReports) {
            this._clientReportOnExitFlushListener = ()=>{
                this._flushOutcomes();
            };
            this._clientReportInterval = setInterval(()=>{
                debugBuild.DEBUG_BUILD && core.logger.log('Flushing client reports based on interval.');
                this._flushOutcomes();
            }, clientOptions.clientReportFlushInterval ?? DEFAULT_CLIENT_REPORT_FLUSH_INTERVAL_MS)// Unref is critical for not preventing the process from exiting because the interval is active.
            .unref();
            process.on('beforeExit', this._clientReportOnExitFlushListener);
        }
    }
    /** Custom implementation for OTEL, so we can handle scope-span linking. */ _getTraceInfoFromScope(scope) {
        if (!scope) {
            return [
                undefined,
                undefined
            ];
        }
        return opentelemetry.getTraceContextForScope(this, scope);
    }
}
exports.NodeClient = NodeClient; //# sourceMappingURL=client.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/esmLoader.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const importInTheMiddle = __turbopack_require__("[project]/node_modules/.pnpm/import-in-the-middle@1.14.2/node_modules/import-in-the-middle/index.js [app-ssr] (ecmascript)");
const moduleModule = require("module");
var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/** Initialize the ESM loader. */ function maybeInitializeEsmLoader() {
    const [nodeMajor = 0, nodeMinor = 0] = process.versions.node.split('.').map(Number);
    // Register hook was added in v20.6.0 and v18.19.0
    if (nodeMajor >= 21 || nodeMajor === 20 && nodeMinor >= 6 || nodeMajor === 18 && nodeMinor >= 19) {
        if (!core.GLOBAL_OBJ._sentryEsmLoaderHookRegistered) {
            try {
                const { addHookMessagePort } = importInTheMiddle.createAddHookMessageChannel();
                // @ts-expect-error register is available in these versions
                moduleModule.default.register('import-in-the-middle/hook.mjs', typeof document === 'undefined' ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('sdk/esmLoader.js', document.baseURI).href, {
                    data: {
                        addHookMessagePort,
                        include: []
                    },
                    transferList: [
                        addHookMessagePort
                    ]
                });
            } catch (error) {
                core.logger.warn('Failed to register ESM hook', error);
            }
        }
    } else {
        core.consoleSandbox(()=>{
            // eslint-disable-next-line no-console
            console.warn(`[Sentry] You are using Node.js v${process.versions.node} in ESM mode ("import syntax"). The Sentry Node.js SDK is not compatible with ESM in Node.js versions before 18.19.0 or before 20.6.0. Please either build your application with CommonJS ("require() syntax"), or upgrade your Node.js version.`);
        });
    }
}
exports.maybeInitializeEsmLoader = maybeInitializeEsmLoader; //# sourceMappingURL=esmLoader.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/index.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const opentelemetry = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+opentelemetry@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30_o5xloretc4oxncwjv67h3aqgxy/node_modules/@sentry/opentelemetry/build/cjs/index.js [app-ssr] (ecmascript)");
const debugBuild = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/debug-build.js [app-ssr] (ecmascript)");
const childProcess = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/childProcess.js [app-ssr] (ecmascript)");
const context = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/context.js [app-ssr] (ecmascript)");
const contextlines = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/contextlines.js [app-ssr] (ecmascript)");
const index = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/http/index.js [app-ssr] (ecmascript)");
const index$2 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/index.js [app-ssr] (ecmascript)");
const modules = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/modules.js [app-ssr] (ecmascript)");
const index$1 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/node-fetch/index.js [app-ssr] (ecmascript)");
const onuncaughtexception = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/onuncaughtexception.js [app-ssr] (ecmascript)");
const onunhandledrejection = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/onunhandledrejection.js [app-ssr] (ecmascript)");
const processSession = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/processSession.js [app-ssr] (ecmascript)");
const spotlight = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/spotlight.js [app-ssr] (ecmascript)");
const http = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/transports/http.js [app-ssr] (ecmascript)");
const commonjs = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/commonjs.js [app-ssr] (ecmascript)");
const envToBool = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/envToBool.js [app-ssr] (ecmascript)");
const api = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/api.js [app-ssr] (ecmascript)");
const client = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/client.js [app-ssr] (ecmascript)");
const esmLoader = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/esmLoader.js [app-ssr] (ecmascript)");
/**
 * Get default integrations for the Node-Core SDK.
 */ function getDefaultIntegrations() {
    return [
        // Common
        // TODO(v10): Replace with `eventFiltersIntegration` once we remove the deprecated `inboundFiltersIntegration`
        // eslint-disable-next-line deprecation/deprecation
        core.inboundFiltersIntegration(),
        core.functionToStringIntegration(),
        core.linkedErrorsIntegration(),
        core.requestDataIntegration(),
        // Native Wrappers
        core.consoleIntegration(),
        index.httpIntegration(),
        index$1.nativeNodeFetchIntegration(),
        // Global Handlers
        onuncaughtexception.onUncaughtExceptionIntegration(),
        onunhandledrejection.onUnhandledRejectionIntegration(),
        // Event Info
        contextlines.contextLinesIntegration(),
        index$2.localVariablesIntegration(),
        context.nodeContextIntegration(),
        childProcess.childProcessIntegration(),
        processSession.processSessionIntegration(),
        modules.modulesIntegration()
    ];
}
/**
 * Initialize Sentry for Node.
 */ function init(options = {}) {
    return _init(options, getDefaultIntegrations);
}
/**
 * Initialize Sentry for Node, without any integrations added by default.
 */ function initWithoutDefaultIntegrations(options = {}) {
    return _init(options, ()=>[]);
}
/**
 * Initialize Sentry for Node, without performance instrumentation.
 */ function _init(_options = {}, getDefaultIntegrationsImpl) {
    const options = getClientOptions(_options, getDefaultIntegrationsImpl);
    if (options.debug === true) {
        if (debugBuild.DEBUG_BUILD) {
            core.logger.enable();
        } else {
            // use `console.warn` rather than `logger.warn` since by non-debug bundles have all `logger.x` statements stripped
            core.consoleSandbox(()=>{
                // eslint-disable-next-line no-console
                console.warn('[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.');
            });
        }
    }
    if (!commonjs.isCjs() && options.registerEsmLoaderHooks !== false) {
        esmLoader.maybeInitializeEsmLoader();
    }
    opentelemetry.setOpenTelemetryContextAsyncContextStrategy();
    const scope = core.getCurrentScope();
    scope.update(options.initialScope);
    if (options.spotlight && !options.integrations.some(({ name })=>name === spotlight.INTEGRATION_NAME)) {
        options.integrations.push(spotlight.spotlightIntegration({
            sidecarUrl: typeof options.spotlight === 'string' ? options.spotlight : undefined
        }));
    }
    const client$1 = new client.NodeClient(options);
    // The client is on the current scope, from where it generally is inherited
    core.getCurrentScope().setClient(client$1);
    client$1.init();
    core.logger.log(`Running in ${commonjs.isCjs() ? 'CommonJS' : 'ESM'} mode.`);
    client$1.startClientReportTracking();
    updateScopeFromEnvVariables();
    opentelemetry.enhanceDscWithOpenTelemetryRootSpanName(client$1);
    opentelemetry.setupEventContextTrace(client$1);
    return client$1;
}
/**
 * Validate that your OpenTelemetry setup is correct.
 */ function validateOpenTelemetrySetup() {
    if (!debugBuild.DEBUG_BUILD) {
        return;
    }
    const setup = opentelemetry.openTelemetrySetupCheck();
    const required = [
        'SentryContextManager',
        'SentryPropagator'
    ];
    if (core.hasSpansEnabled()) {
        required.push('SentrySpanProcessor');
    }
    for (const k of required){
        if (!setup.includes(k)) {
            core.logger.error(`You have to set up the ${k}. Without this, the OpenTelemetry & Sentry integration will not work properly.`);
        }
    }
    if (!setup.includes('SentrySampler')) {
        core.logger.warn('You have to set up the SentrySampler. Without this, the OpenTelemetry & Sentry integration may still work, but sample rates set for the Sentry SDK will not be respected. If you use a custom sampler, make sure to use `wrapSamplingDecision`.');
    }
}
function getClientOptions(options, getDefaultIntegrationsImpl) {
    const release = getRelease(options.release);
    const spotlight = options.spotlight ?? envToBool.envToBool(process.env.SENTRY_SPOTLIGHT, {
        strict: true
    }) ?? process.env.SENTRY_SPOTLIGHT;
    const tracesSampleRate = getTracesSampleRate(options.tracesSampleRate);
    const mergedOptions = {
        ...options,
        dsn: options.dsn ?? process.env.SENTRY_DSN,
        environment: options.environment ?? process.env.SENTRY_ENVIRONMENT,
        sendClientReports: options.sendClientReports ?? true,
        transport: options.transport ?? http.makeNodeTransport,
        stackParser: core.stackParserFromStackParserOptions(options.stackParser || api.defaultStackParser),
        release,
        tracesSampleRate,
        spotlight,
        debug: envToBool.envToBool(options.debug ?? process.env.SENTRY_DEBUG)
    };
    const integrations = options.integrations;
    const defaultIntegrations = options.defaultIntegrations ?? getDefaultIntegrationsImpl(mergedOptions);
    return {
        ...mergedOptions,
        integrations: core.getIntegrationsToSetup({
            defaultIntegrations,
            integrations
        })
    };
}
function getRelease(release) {
    if (release !== undefined) {
        return release;
    }
    const detectedRelease = api.getSentryRelease();
    if (detectedRelease !== undefined) {
        return detectedRelease;
    }
    return undefined;
}
function getTracesSampleRate(tracesSampleRate) {
    if (tracesSampleRate !== undefined) {
        return tracesSampleRate;
    }
    const sampleRateFromEnv = process.env.SENTRY_TRACES_SAMPLE_RATE;
    if (!sampleRateFromEnv) {
        return undefined;
    }
    const parsed = parseFloat(sampleRateFromEnv);
    return isFinite(parsed) ? parsed : undefined;
}
/**
 * Update scope and propagation context based on environmental variables.
 *
 * See https://github.com/getsentry/rfcs/blob/main/text/0071-continue-trace-over-process-boundaries.md
 * for more details.
 */ function updateScopeFromEnvVariables() {
    if (envToBool.envToBool(process.env.SENTRY_USE_ENVIRONMENT) !== false) {
        const sentryTraceEnv = process.env.SENTRY_TRACE;
        const baggageEnv = process.env.SENTRY_BAGGAGE;
        const propagationContext = core.propagationContextFromHeaders(sentryTraceEnv, baggageEnv);
        core.getCurrentScope().setPropagationContext(propagationContext);
    }
}
exports.getDefaultIntegrations = getDefaultIntegrations;
exports.init = init;
exports.initWithoutDefaultIntegrations = initWithoutDefaultIntegrations;
exports.validateOpenTelemetrySetup = validateOpenTelemetrySetup; //# sourceMappingURL=index.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/scope.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const api = require("@opentelemetry/api");
const opentelemetry = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+opentelemetry@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30_o5xloretc4oxncwjv67h3aqgxy/node_modules/@sentry/opentelemetry/build/cjs/index.js [app-ssr] (ecmascript)");
/**
 * Update the active isolation scope.
 * Should be used with caution!
 */ function setIsolationScope(isolationScope) {
    const scopes = opentelemetry.getScopesFromContext(api.context.active());
    if (scopes) {
        scopes.isolationScope = isolationScope;
    }
}
exports.setIsolationScope = setIsolationScope; //# sourceMappingURL=scope.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/addOriginToSpan.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
/** Adds an origin to an OTEL Span. */ function addOriginToSpan(span, origin) {
    span.setAttribute(core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, origin);
}
exports.addOriginToSpan = addOriginToSpan; //# sourceMappingURL=addOriginToSpan.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/createMissingInstrumentationContext.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const commonjs = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/commonjs.js [app-ssr] (ecmascript)");
const createMissingInstrumentationContext = (pkg)=>({
        package: pkg,
        'javascript.is_cjs': commonjs.isCjs()
    });
exports.createMissingInstrumentationContext = createMissingInstrumentationContext; //# sourceMappingURL=createMissingInstrumentationContext.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/ensureIsWrapped.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const instrumentation = __turbopack_require__("[project]/node_modules/.pnpm/@opentelemetry+instrumentation@0.57.2_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-ssr] (ecmascript) <facade>");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const commonjs = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/commonjs.js [app-ssr] (ecmascript)");
const createMissingInstrumentationContext = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/createMissingInstrumentationContext.js [app-ssr] (ecmascript)");
/**
 * Checks and warns if a framework isn't wrapped by opentelemetry.
 */ function ensureIsWrapped(maybeWrappedFunction, name) {
    const clientOptions = core.getClient()?.getOptions();
    if (!clientOptions?.disableInstrumentationWarnings && !instrumentation.isWrapped(maybeWrappedFunction) && core.isEnabled() && core.hasSpansEnabled(clientOptions)) {
        core.consoleSandbox(()=>{
            if (commonjs.isCjs()) {
                // eslint-disable-next-line no-console
                console.warn(`[Sentry] ${name} is not instrumented. This is likely because you required/imported ${name} before calling \`Sentry.init()\`.`);
            } else {
                // eslint-disable-next-line no-console
                console.warn(`[Sentry] ${name} is not instrumented. Please make sure to initialize Sentry in a separate file that you \`--import\` when running node, see: https://docs.sentry.io/platforms/javascript/guides/${name}/install/esm/.`);
            }
        });
        core.getGlobalScope().setContext('missing_instrumentation', createMissingInstrumentationContext.createMissingInstrumentationContext(name));
    }
}
exports.ensureIsWrapped = ensureIsWrapped; //# sourceMappingURL=ensureIsWrapped.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/common.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const replacements = [
    [
        'january',
        '1'
    ],
    [
        'february',
        '2'
    ],
    [
        'march',
        '3'
    ],
    [
        'april',
        '4'
    ],
    [
        'may',
        '5'
    ],
    [
        'june',
        '6'
    ],
    [
        'july',
        '7'
    ],
    [
        'august',
        '8'
    ],
    [
        'september',
        '9'
    ],
    [
        'october',
        '10'
    ],
    [
        'november',
        '11'
    ],
    [
        'december',
        '12'
    ],
    [
        'jan',
        '1'
    ],
    [
        'feb',
        '2'
    ],
    [
        'mar',
        '3'
    ],
    [
        'apr',
        '4'
    ],
    [
        'may',
        '5'
    ],
    [
        'jun',
        '6'
    ],
    [
        'jul',
        '7'
    ],
    [
        'aug',
        '8'
    ],
    [
        'sep',
        '9'
    ],
    [
        'oct',
        '10'
    ],
    [
        'nov',
        '11'
    ],
    [
        'dec',
        '12'
    ],
    [
        'sunday',
        '0'
    ],
    [
        'monday',
        '1'
    ],
    [
        'tuesday',
        '2'
    ],
    [
        'wednesday',
        '3'
    ],
    [
        'thursday',
        '4'
    ],
    [
        'friday',
        '5'
    ],
    [
        'saturday',
        '6'
    ],
    [
        'sun',
        '0'
    ],
    [
        'mon',
        '1'
    ],
    [
        'tue',
        '2'
    ],
    [
        'wed',
        '3'
    ],
    [
        'thu',
        '4'
    ],
    [
        'fri',
        '5'
    ],
    [
        'sat',
        '6'
    ]
];
/**
 * Replaces names in cron expressions
 */ function replaceCronNames(cronExpression) {
    return replacements.reduce(// eslint-disable-next-line @sentry-internal/sdk/no-regexp-constructor
    (acc, [name, replacement])=>acc.replace(new RegExp(name, 'gi'), replacement), cronExpression);
}
exports.replaceCronNames = replaceCronNames; //# sourceMappingURL=common.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/cron.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const common = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/common.js [app-ssr] (ecmascript)");
const ERROR_TEXT = 'Automatic instrumentation of CronJob only supports crontab string';
/**
 * Instruments the `cron` library to send a check-in event to Sentry for each job execution.
 *
 * ```ts
 * import * as Sentry from '@sentry/node';
 * import { CronJob } from 'cron';
 *
 * const CronJobWithCheckIn = Sentry.cron.instrumentCron(CronJob, 'my-cron-job');
 *
 * // use the constructor
 * const job = new CronJobWithCheckIn('* * * * *', () => {
 *  console.log('You will see this message every minute');
 * });
 *
 * // or from
 * const job = CronJobWithCheckIn.from({ cronTime: '* * * * *', onTick: () => {
 *   console.log('You will see this message every minute');
 * });
 * ```
 */ function instrumentCron(lib, monitorSlug) {
    let jobScheduled = false;
    return new Proxy(lib, {
        construct (target, args) {
            const [cronTime, onTick, onComplete, start, timeZone, ...rest] = args;
            if (typeof cronTime !== 'string') {
                throw new Error(ERROR_TEXT);
            }
            if (jobScheduled) {
                throw new Error(`A job named '${monitorSlug}' has already been scheduled`);
            }
            jobScheduled = true;
            const cronString = common.replaceCronNames(cronTime);
            async function monitoredTick(context, onComplete) {
                return core.withMonitor(monitorSlug, async ()=>{
                    try {
                        await onTick(context, onComplete);
                    } catch (e) {
                        core.captureException(e);
                        throw e;
                    }
                }, {
                    schedule: {
                        type: 'crontab',
                        value: cronString
                    },
                    timezone: timeZone || undefined
                });
            }
            return new target(cronTime, monitoredTick, onComplete, start, timeZone, ...rest);
        },
        get (target, prop) {
            if (prop === 'from') {
                return (param)=>{
                    const { cronTime, onTick, timeZone } = param;
                    if (typeof cronTime !== 'string') {
                        throw new Error(ERROR_TEXT);
                    }
                    if (jobScheduled) {
                        throw new Error(`A job named '${monitorSlug}' has already been scheduled`);
                    }
                    jobScheduled = true;
                    const cronString = common.replaceCronNames(cronTime);
                    param.onTick = async (context, onComplete)=>{
                        return core.withMonitor(monitorSlug, async ()=>{
                            try {
                                await onTick(context, onComplete);
                            } catch (e) {
                                core.captureException(e);
                                throw e;
                            }
                        }, {
                            schedule: {
                                type: 'crontab',
                                value: cronString
                            },
                            timezone: timeZone || undefined
                        });
                    };
                    return target.from(param);
                };
            } else {
                return target[prop];
            }
        }
    });
}
exports.instrumentCron = instrumentCron; //# sourceMappingURL=cron.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/node-cron.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const common = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/common.js [app-ssr] (ecmascript)");
/**
 * Wraps the `node-cron` library with check-in monitoring.
 *
 * ```ts
 * import * as Sentry from "@sentry/node";
 * import * as cron from "node-cron";
 *
 * const cronWithCheckIn = Sentry.cron.instrumentNodeCron(cron);
 *
 * cronWithCheckIn.schedule(
 *   "* * * * *",
 *   () => {
 *     console.log("running a task every minute");
 *   },
 *   { name: "my-cron-job" },
 * );
 * ```
 */ function instrumentNodeCron(lib) {
    return new Proxy(lib, {
        get (target, prop) {
            if (prop === 'schedule' && target.schedule) {
                // When 'get' is called for schedule, return a proxied version of the schedule function
                return new Proxy(target.schedule, {
                    apply (target, thisArg, argArray) {
                        const [expression, callback, options] = argArray;
                        const name = options?.name;
                        const timezone = options?.timezone;
                        if (!name) {
                            throw new Error('Missing "name" for scheduled job. A name is required for Sentry check-in monitoring.');
                        }
                        const monitoredCallback = async ()=>{
                            return core.withMonitor(name, async ()=>{
                                // We have to manually catch here and capture the exception because node-cron swallows errors
                                // https://github.com/node-cron/node-cron/issues/399
                                try {
                                    return await callback();
                                } catch (e) {
                                    core.captureException(e);
                                    throw e;
                                }
                            }, {
                                schedule: {
                                    type: 'crontab',
                                    value: common.replaceCronNames(expression)
                                },
                                timezone
                            });
                        };
                        return target.apply(thisArg, [
                            expression,
                            monitoredCallback,
                            options
                        ]);
                    }
                });
            } else {
                return target[prop];
            }
        }
    });
}
exports.instrumentNodeCron = instrumentNodeCron; //# sourceMappingURL=node-cron.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/node-schedule.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
const common = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/common.js [app-ssr] (ecmascript)");
/**
 * Instruments the `node-schedule` library to send a check-in event to Sentry for each job execution.
 *
 * ```ts
 * import * as Sentry from '@sentry/node';
 * import * as schedule from 'node-schedule';
 *
 * const scheduleWithCheckIn = Sentry.cron.instrumentNodeSchedule(schedule);
 *
 * const job = scheduleWithCheckIn.scheduleJob('my-cron-job', '* * * * *', () => {
 *  console.log('You will see this message every minute');
 * });
 * ```
 */ function instrumentNodeSchedule(lib) {
    return new Proxy(lib, {
        get (target, prop) {
            if (prop === 'scheduleJob') {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                return new Proxy(target.scheduleJob, {
                    apply (target, thisArg, argArray) {
                        const [nameOrExpression, expressionOrCallback, callback] = argArray;
                        if (typeof nameOrExpression !== 'string' || typeof expressionOrCallback !== 'string' || typeof callback !== 'function') {
                            throw new Error("Automatic instrumentation of 'node-schedule' requires the first parameter of 'scheduleJob' to be a job name string and the second parameter to be a crontab string");
                        }
                        const monitorSlug = nameOrExpression;
                        const expression = expressionOrCallback;
                        async function monitoredCallback() {
                            return core.withMonitor(monitorSlug, async ()=>{
                                await callback?.();
                            }, {
                                schedule: {
                                    type: 'crontab',
                                    value: common.replaceCronNames(expression)
                                }
                            });
                        }
                        return target.apply(thisArg, [
                            monitorSlug,
                            expression,
                            monitoredCallback
                        ]);
                    }
                });
            }
            return target[prop];
        }
    });
}
exports.instrumentNodeSchedule = instrumentNodeSchedule; //# sourceMappingURL=node-schedule.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/index.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const cron$1 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/cron.js [app-ssr] (ecmascript)");
const nodeCron = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/node-cron.js [app-ssr] (ecmascript)");
const nodeSchedule = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/node-schedule.js [app-ssr] (ecmascript)");
/** Methods to instrument cron libraries for Sentry check-ins */ const cron = {
    instrumentCron: cron$1.instrumentCron,
    instrumentNodeCron: nodeCron.instrumentNodeCron,
    instrumentNodeSchedule: nodeSchedule.instrumentNodeSchedule
};
exports.cron = cron; //# sourceMappingURL=index.js.map

}.call(this) }),
"[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/index.js [app-ssr] (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const exports$1 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/logs/exports.js [app-ssr] (ecmascript)");
const index = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/http/index.js [app-ssr] (ecmascript)");
const SentryHttpInstrumentation = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/http/SentryHttpInstrumentation.js [app-ssr] (ecmascript)");
const index$1 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/node-fetch/index.js [app-ssr] (ecmascript)");
const SentryNodeFetchInstrumentation = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/node-fetch/SentryNodeFetchInstrumentation.js [app-ssr] (ecmascript)");
const context = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/context.js [app-ssr] (ecmascript)");
const contextlines = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/contextlines.js [app-ssr] (ecmascript)");
const index$2 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/local-variables/index.js [app-ssr] (ecmascript)");
const modules = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/modules.js [app-ssr] (ecmascript)");
const onuncaughtexception = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/onuncaughtexception.js [app-ssr] (ecmascript)");
const onunhandledrejection = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/onunhandledrejection.js [app-ssr] (ecmascript)");
const index$3 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/anr/index.js [app-ssr] (ecmascript)");
const spotlight = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/spotlight.js [app-ssr] (ecmascript)");
const childProcess = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/childProcess.js [app-ssr] (ecmascript)");
const winston = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/integrations/winston.js [app-ssr] (ecmascript)");
const contextManager = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/otel/contextManager.js [app-ssr] (ecmascript)");
const logger = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/otel/logger.js [app-ssr] (ecmascript)");
const instrument = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/otel/instrument.js [app-ssr] (ecmascript)");
const index$4 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/index.js [app-ssr] (ecmascript)");
const scope = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/scope.js [app-ssr] (ecmascript)");
const api = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/api.js [app-ssr] (ecmascript)");
const module$1 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/module.js [app-ssr] (ecmascript)");
const addOriginToSpan = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/addOriginToSpan.js [app-ssr] (ecmascript)");
const getRequestUrl = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/getRequestUrl.js [app-ssr] (ecmascript)");
const commonjs = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/commonjs.js [app-ssr] (ecmascript)");
const ensureIsWrapped = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/ensureIsWrapped.js [app-ssr] (ecmascript)");
const createMissingInstrumentationContext = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/createMissingInstrumentationContext.js [app-ssr] (ecmascript)");
const envToBool = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/utils/envToBool.js [app-ssr] (ecmascript)");
const http = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/transports/http.js [app-ssr] (ecmascript)");
const client = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/sdk/client.js [app-ssr] (ecmascript)");
const index$5 = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/cron/index.js [app-ssr] (ecmascript)");
const nodeVersion = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+node-core@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30.1_@_5qpkyzp4ihlc3gu26w6kjgpjpi/node_modules/@sentry/node-core/build/cjs/nodeVersion.js [app-ssr] (ecmascript)");
const opentelemetry = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+opentelemetry@9.37.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@1.30_o5xloretc4oxncwjv67h3aqgxy/node_modules/@sentry/opentelemetry/build/cjs/index.js [app-ssr] (ecmascript)");
const core = __turbopack_require__("[project]/node_modules/.pnpm/@sentry+core@9.37.0/node_modules/@sentry/core/build/cjs/index.js [app-ssr] (ecmascript)");
exports.logger = exports$1;
exports.httpIntegration = index.httpIntegration;
exports.SentryHttpInstrumentation = SentryHttpInstrumentation.SentryHttpInstrumentation;
exports.nativeNodeFetchIntegration = index$1.nativeNodeFetchIntegration;
exports.SentryNodeFetchInstrumentation = SentryNodeFetchInstrumentation.SentryNodeFetchInstrumentation;
exports.nodeContextIntegration = context.nodeContextIntegration;
exports.contextLinesIntegration = contextlines.contextLinesIntegration;
exports.localVariablesIntegration = index$2.localVariablesIntegration;
exports.modulesIntegration = modules.modulesIntegration;
exports.onUncaughtExceptionIntegration = onuncaughtexception.onUncaughtExceptionIntegration;
exports.onUnhandledRejectionIntegration = onunhandledrejection.onUnhandledRejectionIntegration;
exports.anrIntegration = index$3.anrIntegration;
exports.disableAnrDetectionForCallback = index$3.disableAnrDetectionForCallback;
exports.spotlightIntegration = spotlight.spotlightIntegration;
exports.childProcessIntegration = childProcess.childProcessIntegration;
exports.createSentryWinstonTransport = winston.createSentryWinstonTransport;
exports.SentryContextManager = contextManager.SentryContextManager;
exports.setupOpenTelemetryLogger = logger.setupOpenTelemetryLogger;
exports.INSTRUMENTED = instrument.INSTRUMENTED;
exports.generateInstrumentOnce = instrument.generateInstrumentOnce;
exports.instrumentWhenWrapped = instrument.instrumentWhenWrapped;
exports.getDefaultIntegrations = index$4.getDefaultIntegrations;
exports.init = index$4.init;
exports.initWithoutDefaultIntegrations = index$4.initWithoutDefaultIntegrations;
exports.validateOpenTelemetrySetup = index$4.validateOpenTelemetrySetup;
exports.setIsolationScope = scope.setIsolationScope;
exports.defaultStackParser = api.defaultStackParser;
exports.getSentryRelease = api.getSentryRelease;
exports.createGetModuleFromFilename = module$1.createGetModuleFromFilename;
exports.addOriginToSpan = addOriginToSpan.addOriginToSpan;
exports.getRequestUrl = getRequestUrl.getRequestUrl;
exports.isCjs = commonjs.isCjs;
exports.ensureIsWrapped = ensureIsWrapped.ensureIsWrapped;
exports.createMissingInstrumentationContext = createMissingInstrumentationContext.createMissingInstrumentationContext;
exports.envToBool = envToBool.envToBool;
exports.makeNodeTransport = http.makeNodeTransport;
exports.NodeClient = client.NodeClient;
exports.cron = index$5.cron;
exports.NODE_VERSION = nodeVersion.NODE_VERSION;
exports.setNodeAsyncContextStrategy = opentelemetry.setOpenTelemetryContextAsyncContextStrategy;
exports.SDK_VERSION = core.SDK_VERSION;
exports.SEMANTIC_ATTRIBUTE_SENTRY_OP = core.SEMANTIC_ATTRIBUTE_SENTRY_OP;
exports.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN;
exports.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = core.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE;
exports.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE;
exports.Scope = core.Scope;
exports.addBreadcrumb = core.addBreadcrumb;
exports.addEventProcessor = core.addEventProcessor;
exports.addIntegration = core.addIntegration;
exports.captureCheckIn = core.captureCheckIn;
exports.captureConsoleIntegration = core.captureConsoleIntegration;
exports.captureEvent = core.captureEvent;
exports.captureException = core.captureException;
exports.captureFeedback = core.captureFeedback;
exports.captureMessage = core.captureMessage;
exports.captureSession = core.captureSession;
exports.close = core.close;
exports.consoleIntegration = core.consoleIntegration;
exports.consoleLoggingIntegration = core.consoleLoggingIntegration;
exports.continueTrace = core.continueTrace;
exports.createTransport = core.createTransport;
exports.dedupeIntegration = core.dedupeIntegration;
exports.endSession = core.endSession;
exports.eventFiltersIntegration = core.eventFiltersIntegration;
exports.extraErrorDataIntegration = core.extraErrorDataIntegration;
exports.featureFlagsIntegration = core.featureFlagsIntegration;
exports.flush = core.flush;
exports.functionToStringIntegration = core.functionToStringIntegration;
exports.getActiveSpan = core.getActiveSpan;
exports.getClient = core.getClient;
exports.getCurrentScope = core.getCurrentScope;
exports.getGlobalScope = core.getGlobalScope;
exports.getIsolationScope = core.getIsolationScope;
exports.getRootSpan = core.getRootSpan;
exports.getSpanDescendants = core.getSpanDescendants;
exports.getSpanStatusFromHttpCode = core.getSpanStatusFromHttpCode;
exports.getTraceData = core.getTraceData;
exports.getTraceMetaTags = core.getTraceMetaTags;
exports.inboundFiltersIntegration = core.inboundFiltersIntegration;
exports.instrumentSupabaseClient = core.instrumentSupabaseClient;
exports.isEnabled = core.isEnabled;
exports.isInitialized = core.isInitialized;
exports.lastEventId = core.lastEventId;
exports.linkedErrorsIntegration = core.linkedErrorsIntegration;
exports.parameterize = core.parameterize;
exports.profiler = core.profiler;
exports.requestDataIntegration = core.requestDataIntegration;
exports.rewriteFramesIntegration = core.rewriteFramesIntegration;
exports.setContext = core.setContext;
exports.setCurrentClient = core.setCurrentClient;
exports.setExtra = core.setExtra;
exports.setExtras = core.setExtras;
exports.setHttpStatus = core.setHttpStatus;
exports.setMeasurement = core.setMeasurement;
exports.setTag = core.setTag;
exports.setTags = core.setTags;
exports.setUser = core.setUser;
exports.spanToBaggageHeader = core.spanToBaggageHeader;
exports.spanToJSON = core.spanToJSON;
exports.spanToTraceHeader = core.spanToTraceHeader;
exports.startInactiveSpan = core.startInactiveSpan;
exports.startNewTrace = core.startNewTrace;
exports.startSession = core.startSession;
exports.startSpan = core.startSpan;
exports.startSpanManual = core.startSpanManual;
exports.supabaseIntegration = core.supabaseIntegration;
exports.suppressTracing = core.suppressTracing;
exports.trpcMiddleware = core.trpcMiddleware;
exports.updateSpanName = core.updateSpanName;
exports.withActiveSpan = core.withActiveSpan;
exports.withIsolationScope = core.withIsolationScope;
exports.withMonitor = core.withMonitor;
exports.withScope = core.withScope;
exports.wrapMcpServerWithSentry = core.wrapMcpServerWithSentry;
exports.zodErrorsIntegration = core.zodErrorsIntegration; //# sourceMappingURL=index.js.map

}.call(this) }),

};

//# sourceMappingURL=7b2f4_%40sentry_node-core_build_cjs_67949e._.js.map