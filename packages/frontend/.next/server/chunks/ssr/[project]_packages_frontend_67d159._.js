module.exports = {

"[project]/packages/frontend/src/lib/utils.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "cn": ()=>cn,
    "createBackupFilename": ()=>createBackupFilename,
    "debounce": ()=>debounce,
    "downloadFile": ()=>downloadFile,
    "formatBytes": ()=>formatBytes,
    "formatTimeAgo": ()=>formatTimeAgo,
    "formatTimeDetailed": ()=>formatTimeDetailed,
    "formatUptime": ()=>formatUptime,
    "generateId": ()=>generateId,
    "getStatusBgColor": ()=>getStatusBgColor,
    "getStatusColor": ()=>getStatusColor,
    "searchInObjects": ()=>searchInObjects
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/tailwind-merge@2.6.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$2$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatTimeAgo(date) {
    const now = new Date();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return 'неизвестно';
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    if (diffInSeconds < 60) return 'только что';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`;
    return `${Math.floor(diffInSeconds / 86400)} дн назад`;
}
function formatTimeDetailed(timestamp) {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    if (isNaN(date.getTime())) return 'неизвестно';
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function downloadFile(data, filename, type = 'application/json') {
    const blob = new Blob([
        data
    ], {
        type
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
function createBackupFilename(prefix = 'backup') {
    const date = new Date().toISOString().split('T')[0];
    return `${prefix}-${date}.json`;
}
function searchInObjects(items, searchTerm, searchFields) {
    if (!searchTerm.trim()) return items;
    const lowercaseSearch = searchTerm.toLowerCase();
    return items.filter((item)=>searchFields.some((field)=>{
            const value = item[field];
            return value && String(value).toLowerCase().includes(lowercaseSearch);
        }));
}
function debounce(func, wait) {
    let timeout = null;
    return (...args)=>{
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(()=>func(...args), wait);
    };
}
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    if (days > 0) return `${days}д ${hours}ч ${minutes}м`;
    if (hours > 0) return `${hours}ч ${minutes}м`;
    return `${minutes}м`;
}
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB'
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
function getStatusColor(status) {
    switch(status){
        case 'online':
            return 'text-green-500';
        case 'offline':
            return 'text-red-500';
        case 'warning':
            return 'text-yellow-500';
        default:
            return 'text-gray-500';
    }
}
function getStatusBgColor(status) {
    switch(status){
        case 'online':
            return 'bg-green-500/10 border-green-500/20';
        case 'offline':
            return 'bg-red-500/10 border-red-500/20';
        case 'warning':
            return 'bg-yellow-500/10 border-yellow-500/20';
        default:
            return 'bg-gray-500/10 border-gray-500/20';
    }
}

})()),
"[project]/packages/frontend/src/components/ui/button.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Button": ()=>Button,
    "buttonVariants": ()=>buttonVariants
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$slot$40$1$2e$2$2e$3_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@18.3.23_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/lib/utils.ts [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$slot$40$1$2e$2$2e$3_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/packages/frontend/src/components/ui/button.tsx",
        lineNumber: 42,
        columnNumber: 7
    }, this);
});
Button.displayName = 'Button';
;

})()),
"[project]/packages/frontend/src/components/ui/card.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Card": ()=>Card,
    "CardContent": ()=>CardContent,
    "CardDescription": ()=>CardDescription,
    "CardFooter": ()=>CardFooter,
    "CardHeader": ()=>CardHeader,
    "CardTitle": ()=>CardTitle
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/lib/utils.ts [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('rounded-lg border bg-card text-card-foreground shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/packages/frontend/src/components/ui/card.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, this));
Card.displayName = 'Card';
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col space-y-1.5 p-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/packages/frontend/src/components/ui/card.tsx",
        lineNumber: 23,
        columnNumber: 3
    }, this));
CardHeader.displayName = 'CardHeader';
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-2xl font-semibold leading-none tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/packages/frontend/src/components/ui/card.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, this));
CardTitle.displayName = 'CardTitle';
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm text-muted-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/packages/frontend/src/components/ui/card.tsx",
        lineNumber: 50,
        columnNumber: 3
    }, this));
CardDescription.displayName = 'CardDescription';
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('p-6 pt-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/packages/frontend/src/components/ui/card.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, this));
CardContent.displayName = 'CardContent';
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center p-6 pt-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/packages/frontend/src/components/ui/card.tsx",
        lineNumber: 70,
        columnNumber: 3
    }, this));
CardFooter.displayName = 'CardFooter';
;

})()),
"[project]/packages/frontend/src/components/ui/error-boundary.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ErrorBoundary": ()=>ErrorBoundary,
    "useErrorHandler": ()=>useErrorHandler,
    "withErrorBoundary": ()=>withErrorBoundary
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/alert-triangle.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$home$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/home.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$9$2e$42$2e$0_$40$open_7dfecb2e56996b4013f0802d0255d9dd$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/@sentry+nextjs@9.42.0_@open_7dfecb2e56996b4013f0802d0255d9dd/node_modules/@sentry/nextjs/build/cjs/index.server.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
'use client';
;
;
;
;
;
;
// Компонент отображения ошибки по умолчанию
function DefaultErrorFallback({ error, resetError }) {
    const handleGoHome = ()=>{
        window.location.href = '/';
    };
    const handleReload = ()=>{
        window.location.reload();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: "mx-auto max-w-md border-slate-700 bg-slate-800/50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                            className: "h-8 w-8 text-red-400"
                        }, void 0, false, {
                            fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mb-3 text-xl font-semibold text-white",
                        children: "Упс! Что-то пошло не так"
                    }, void 0, false, {
                        fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-6 text-sm text-slate-400",
                        children: "Произошла неожиданная ошибка. Мы уже работаем над её исправлением."
                    }, void 0, false, {
                        fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    ("TURBOPACK compile-time value", "development") === 'development' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        className: "mb-6 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                className: "mb-2 cursor-pointer text-sm font-medium text-red-400",
                                children: "Детали ошибки (только для разработки)"
                            }, void 0, false, {
                                fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg bg-slate-900/50 p-4 text-xs text-slate-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    className: "whitespace-pre-wrap break-words",
                                    children: [
                                        error.name,
                                        ": ",
                                        error.message,
                                        error.stack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                '\n\nStack trace:\n',
                                                error.stack
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                                    lineNumber: 58,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 sm:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: resetError,
                                className: "flex items-center justify-center gap-2",
                                variant: "default",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, this),
                                    "Попробовать снова"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: handleGoHome,
                                variant: "outline",
                                className: "flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$home$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    "На главную"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: handleReload,
                                variant: "ghost",
                                className: "text-slate-400 hover:text-white",
                                children: "Перезагрузить"
                            }, void 0, false, {
                                fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
        // Отправляем ошибку в Sentry
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$9$2e$42$2e$0_$40$open_7dfecb2e56996b4013f0802d0255d9dd$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.withScope((scope)=>{
            scope.setTag('errorBoundary', true);
            scope.setLevel('error');
            scope.setContext('errorInfo', {
                componentStack: errorInfo.componentStack
            });
            scope.setContext('errorBoundary', {
                fallbackType: this.props.fallback ? 'custom' : 'default',
                hasError: this.state.hasError
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$9$2e$42$2e$0_$40$open_7dfecb2e56996b4013f0802d0255d9dd$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.captureException(error);
        });
    }
    resetError = ()=>{
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };
    render() {
        if (this.state.hasError && this.state.error) {
            const FallbackComponent = this.props.fallback || DefaultErrorFallback;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FallbackComponent, {
                error: this.state.error,
                resetError: this.resetError,
                errorInfo: this.state.errorInfo || undefined
            }, void 0, false, {
                fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                lineNumber: 150,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
function useErrorHandler() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((error, errorInfo)=>{
        console.error('Error caught by useErrorHandler:', error, errorInfo);
        // Отправляем ошибку в Sentry через хук
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$9$2e$42$2e$0_$40$open_7dfecb2e56996b4013f0802d0255d9dd$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.withScope((scope)=>{
            scope.setTag('errorHandler', true);
            scope.setLevel('error');
            if (errorInfo) {
                scope.setContext('errorInfo', {
                    componentStack: errorInfo.componentStack
                });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$sentry$2b$nextjs$40$9$2e$42$2e$0_$40$open_7dfecb2e56996b4013f0802d0255d9dd$2f$node_modules$2f40$sentry$2f$nextjs$2f$build$2f$cjs$2f$index$2e$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.captureException(error);
        });
    }, []);
}
function withErrorBoundary(Component, fallback) {
    const WrappedComponent = (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorBoundary, {
            fallback: fallback,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
                ...props
            }, void 0, false, {
                fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/frontend/src/components/ui/error-boundary.tsx",
            lineNumber: 187,
            columnNumber: 5
        }, this);
    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
    return WrappedComponent;
}

})()),
"[project]/packages/frontend/src/data/mock-data.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "initialBandwidthHistory": ()=>initialBandwidthHistory,
    "initialConfig": ()=>initialConfig,
    "initialMetrics": ()=>initialMetrics,
    "initialSystemHealth": ()=>initialSystemHealth,
    "mockAlerts": ()=>mockAlerts,
    "mockDevices": ()=>mockDevices,
    "mockFolders": ()=>mockFolders
});
const mockFolders = [
    {
        id: 'datacenter',
        name: 'Центр обработки данных',
        description: 'Серверы и сетевое оборудование ЦОД',
        parentId: 'root',
        color: '#3B82F6',
        icon: 'Building',
        expanded: true,
        children: [
            {
                id: 'servers',
                name: 'Серверы',
                description: 'Физические и виртуальные серверы',
                parentId: 'datacenter',
                color: '#10B981',
                icon: 'Server',
                expanded: false,
                children: []
            },
            {
                id: 'storage',
                name: 'Системы хранения',
                description: 'NAS и SAN системы',
                parentId: 'datacenter',
                color: '#8B5CF6',
                icon: 'Database',
                expanded: false,
                children: []
            }
        ]
    },
    {
        id: 'core',
        name: 'Ядро сети',
        description: 'Основное сетевое оборудование',
        parentId: 'root',
        color: '#EF4444',
        icon: 'Network',
        expanded: false,
        children: []
    },
    {
        id: 'access',
        name: 'Уровень доступа',
        description: 'Коммутаторы доступа и точки WiFi',
        parentId: 'root',
        color: '#F59E0B',
        icon: 'Globe',
        expanded: false,
        children: []
    },
    {
        id: 'security',
        name: 'Безопасность',
        description: 'Системы безопасности и мониторинга',
        parentId: 'root',
        color: '#DC2626',
        icon: 'Shield',
        expanded: false,
        children: []
    }
];
const mockDevices = [
    // Datacenter servers
    {
        id: 'server-web-1',
        name: 'Веб сервер 1',
        ip: '192.168.1.10',
        mac: '00:1B:44:11:3A:B7',
        type: 'server',
        status: 'online',
        lastSeen: new Date('2024-01-15T10:30:00Z'),
        responseTime: 8,
        uptime: 99.2,
        location: 'Стойка A-1',
        folderId: 'servers',
        vendor: 'Dell',
        model: 'PowerEdge R740',
        monitoring: {
            ping: true,
            snmp: true,
            http: true,
            ssh: true
        },
        position: {
            x: 100,
            y: 200
        }
    },
    {
        id: 'server-db-1',
        name: 'База данных',
        ip: '192.168.1.11',
        mac: '00:1B:44:11:3A:B8',
        type: 'server',
        status: 'online',
        lastSeen: new Date('2024-01-15T10:30:00Z'),
        responseTime: 5,
        uptime: 99.8,
        location: 'Стойка A-2',
        folderId: 'servers',
        vendor: 'HP',
        model: 'ProLiant DL380',
        monitoring: {
            ping: true,
            snmp: true,
            http: false,
            ssh: true
        },
        position: {
            x: 150,
            y: 200
        }
    },
    // Network core equipment
    {
        id: 'switch-core-1',
        name: 'Основной коммутатор',
        ip: '192.168.1.1',
        mac: '00:1B:44:11:01:01',
        type: 'switch',
        status: 'online',
        lastSeen: new Date('2024-01-15T10:30:00Z'),
        responseTime: 2,
        uptime: 99.9,
        location: 'Стойка Core-1',
        folderId: 'core',
        vendor: 'Cisco',
        model: 'Catalyst 9300',
        monitoring: {
            ping: true,
            snmp: true,
            http: true,
            ssh: true
        },
        position: {
            x: 300,
            y: 150
        }
    },
    {
        id: 'router-main',
        name: 'Основной маршрутизатор',
        ip: '192.168.1.254',
        mac: '00:1B:44:11:02:01',
        type: 'router',
        status: 'online',
        lastSeen: new Date('2024-01-15T10:30:00Z'),
        responseTime: 3,
        uptime: 99.7,
        location: 'Стойка Core-1',
        folderId: 'core',
        vendor: 'Cisco',
        model: 'ISR 4351',
        monitoring: {
            ping: true,
            snmp: true,
            http: true,
            ssh: true
        },
        position: {
            x: 350,
            y: 100
        }
    },
    // Access layer devices
    {
        id: 'switch-office-1',
        name: 'Офисный коммутатор 1',
        ip: '192.168.1.51',
        mac: '00:1B:44:11:05:01',
        type: 'switch',
        status: 'online',
        lastSeen: new Date('2024-01-15T10:30:00Z'),
        responseTime: 6,
        uptime: 98.5,
        location: '1 этаж офис',
        folderId: 'access',
        vendor: 'Cisco',
        model: 'Catalyst 2960X',
        monitoring: {
            ping: true,
            snmp: true,
            http: false,
            ssh: true
        },
        position: {
            x: 200,
            y: 300
        }
    },
    {
        id: 'switch-office-2',
        name: 'Офисный коммутатор 2',
        ip: '192.168.1.52',
        mac: '00:1B:44:11:05:02',
        type: 'switch',
        status: 'offline',
        lastSeen: new Date('2024-01-15T08:15:00Z'),
        responseTime: 0,
        uptime: 97.2,
        location: '2 этаж офис',
        folderId: 'access',
        vendor: 'Cisco',
        model: 'Catalyst 2960X',
        monitoring: {
            ping: true,
            snmp: true,
            http: false,
            ssh: true
        },
        position: {
            x: 250,
            y: 400
        }
    },
    // WiFi Access Points
    {
        id: 'ap-floor1-01',
        name: 'WiFi точка доступа 1 этаж восток',
        ip: '192.168.1.161',
        mac: '00:1B:44:16:01:01',
        type: 'access_point',
        status: 'online',
        lastSeen: new Date('2024-01-15T10:30:00Z'),
        responseTime: 5,
        uptime: 99.1,
        location: '1 этаж - Восточное крыло',
        folderId: 'access',
        vendor: 'Ubiquiti',
        model: 'UniFi AP AC Pro',
        monitoring: {
            ping: true,
            snmp: true,
            http: true,
            ssh: true
        },
        position: {
            x: 400,
            y: 350
        }
    },
    // Security devices
    {
        id: 'firewall-main',
        name: 'Межсетевой экран',
        ip: '192.168.1.2',
        mac: '00:1B:44:11:02:02',
        type: 'firewall',
        status: 'online',
        lastSeen: new Date('2024-01-15T10:30:00Z'),
        responseTime: 4,
        uptime: 99.6,
        location: 'Стойка Security-1',
        folderId: 'security',
        vendor: 'Fortinet',
        model: 'FortiGate 100F',
        monitoring: {
            ping: true,
            snmp: true,
            http: true,
            ssh: true
        },
        position: {
            x: 500,
            y: 100
        }
    },
    // Storage systems (using 'server' type as storage is not in enum)
    {
        id: 'nas-backup',
        name: 'Система резервного копирования',
        ip: '192.168.1.20',
        mac: '00:1B:44:11:20:01',
        type: 'server',
        status: 'warning',
        lastSeen: new Date('2024-01-15T10:30:00Z'),
        responseTime: 15,
        uptime: 96.8,
        location: 'Стойка Storage-1',
        folderId: 'storage',
        vendor: 'Synology',
        model: 'DS920+',
        monitoring: {
            ping: true,
            snmp: true,
            http: true,
            ssh: false
        },
        position: {
            x: 550,
            y: 200
        }
    }
];
const mockAlerts = [
    {
        id: 'alert-1',
        type: 'warning',
        message: 'Высокая загрузка CPU на сервере web-1',
        timestamp: new Date(Date.now() - 300000),
        deviceId: 'server-web-1',
        resolved: false
    },
    {
        id: 'alert-2',
        type: 'info',
        message: 'Обновление ПО завершено успешно',
        timestamp: new Date(Date.now() - 600000),
        resolved: true
    },
    {
        id: 'alert-3',
        type: 'critical',
        message: 'Потеря связи с устройством switch-office-2',
        timestamp: new Date(Date.now() - 900000),
        resolved: false
    }
];
const initialMetrics = {
    totalDevices: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    warningDevices: 0,
    averageResponseTime: 0,
    totalBandwidth: 0,
    usedBandwidth: 0,
    packetLoss: 0,
    networkUptime: 0,
    lastUpdate: new Date()
};
const initialSystemHealth = {
    cpu: 65,
    memory: 78,
    disk: 45,
    network: 23,
    temperature: 42,
    processes: 156,
    uptime: 2847392,
    lastUpdate: new Date()
};
const initialBandwidthHistory = Array.from({
    length: 20
}, (_, i)=>({
        timestamp: new Date(Date.now() - (19 - i) * 5 * 60 * 1000),
        upload: Math.floor(Math.random() * 300) + 50,
        download: Math.floor(Math.random() * 800) + 100,
        total: 0
    })).map((data)=>({
        ...data,
        total: data.upload + data.download
    }));
const initialConfig = {
    pingInterval: 5000,
    snmpInterval: 30000,
    httpTimeout: 10000,
    retryAttempts: 3,
    alertThresholds: {
        responseTime: 100,
        packetLoss: 5,
        cpuUsage: 80,
        memoryUsage: 85,
        diskUsage: 90
    }
};

})()),
"[project]/packages/frontend/src/lib/api.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "AlertsApi": ()=>AlertsApi,
    "ApiError": ()=>ApiError,
    "DevicesApi": ()=>DevicesApi,
    "FoldersApi": ()=>FoldersApi,
    "MetricsApi": ()=>MetricsApi,
    "RealtimeApi": ()=>RealtimeApi,
    "api": ()=>api,
    "default": ()=>__TURBOPACK__default__export__
});
class ApiError extends Error {
    status;
    code;
    constructor(message, status, code){
        super(message);
        this.status = status;
        this.code = code;
        this.name = 'ApiError';
    }
}
// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 30000; // 30 seconds
// HTTP client configuration
class HttpClient {
    baseURL;
    timeout;
    defaultHeaders;
    constructor(baseURL, timeout = API_TIMEOUT){
        this.baseURL = baseURL;
        this.timeout = timeout;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }
    // Add authentication token
    setAuthToken(token) {
        this.defaultHeaders.Authorization = `Bearer ${token}`;
    }
    // Remove authentication token
    clearAuthToken() {
        delete this.defaultHeaders.Authorization;
    }
    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options.headers
            },
            signal: AbortSignal.timeout(this.timeout)
        };
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                throw new ApiError(errorData.message || `HTTP ${response.status}: ${response.statusText}`, response.status, errorData.code);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            if (error instanceof DOMException && error.name === 'TimeoutError') {
                throw new ApiError('Request timeout', 408, 'TIMEOUT');
            }
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new ApiError('Network error - server unavailable', 0, 'NETWORK_ERROR');
            }
            throw new ApiError('Unknown error occurred', 500, 'UNKNOWN_ERROR');
        }
    }
    // HTTP methods
    async get(endpoint, params) {
        const url = new URL(endpoint, this.baseURL);
        if (params) {
            Object.entries(params).forEach(([key, value])=>{
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }
        return this.request(url.pathname + url.search);
    }
    async post(endpoint, data) {
        console.log('🌐 API POST запрос к:', endpoint, 'с данными:', data);
        return this.request(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined
        });
    }
    async put(endpoint, data) {
        console.log('🌐 API PUT запрос к:', endpoint, 'с данными:', data);
        return this.request(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined
        });
    }
    async patch(endpoint, data) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined
        });
    }
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
}
// Create HTTP client instance
const httpClient = new HttpClient(API_BASE_URL);
class DevicesApi {
    // Get all devices with optional filtering
    static async getDevices(params) {
        return httpClient.get('/devices', params);
    }
    // Get single device by ID
    static async getDevice(id) {
        return httpClient.get(`/devices/${id}`);
    }
    // Create new device
    static async createDevice(device) {
        return httpClient.post('/devices', device);
    }
    // Update device
    static async updateDevice(id, updates) {
        return httpClient.put(`/devices/${id}`, updates);
    }
    // Delete device
    static async deleteDevice(id) {
        return httpClient.delete(`/devices/${id}`);
    }
    // Ping device
    static async pingDevice(id) {
        return httpClient.post(`/devices/${id}/ping`);
    }
    // Get device metrics
    static async getDeviceMetrics(id, period) {
        return httpClient.get(`/devices/${id}/metrics`, {
            period
        });
    }
}
class FoldersApi {
    // Get all folders
    static async getFolders() {
        return httpClient.get('/folders');
    }
    // Create new folder
    static async createFolder(folder) {
        return httpClient.post('/folders', folder);
    }
    // Update folder
    static async updateFolder(id, updates) {
        return httpClient.put(`/folders/${id}`, updates);
    }
    // Delete folder
    static async deleteFolder(id) {
        return httpClient.delete(`/folders/${id}`);
    }
}
class MetricsApi {
    // Get network metrics
    static async getNetworkMetrics() {
        return httpClient.get('/metrics/network');
    }
    // Get system health
    static async getSystemHealth() {
        return httpClient.get('/metrics/system');
    }
    // Get bandwidth history
    static async getBandwidthHistory(params) {
        return httpClient.get('/metrics/bandwidth', params);
    }
}
class AlertsApi {
    // Get all alerts
    static async getAlerts(params) {
        return httpClient.get('/alerts', params);
    }
    // Create new alert
    static async createAlert(alert) {
        return httpClient.post('/alerts', alert);
    }
    // Mark alert as resolved
    static async resolveAlert(id) {
        return httpClient.patch(`/alerts/${id}/resolve`);
    }
    // Acknowledge alert
    static async acknowledgeAlert(id, userId) {
        return httpClient.patch(`/alerts/${id}/acknowledge`, {
            userId
        });
    }
    // Delete alert
    static async deleteAlert(id) {
        return httpClient.delete(`/alerts/${id}`);
    }
}
class RealtimeApi {
    ws = null;
    reconnectAttempts = 0;
    maxReconnectAttempts = 5;
    reconnectDelay = 1000;
    connect(onMessage, onError) {
        const wsUrl = API_BASE_URL.replace(/^https?/, 'ws') + '/ws';
        try {
            this.ws = new WebSocket(wsUrl);
            this.ws.onopen = ()=>{
                console.log('WebSocket connected');
                this.reconnectAttempts = 0;
            };
            this.ws.onmessage = (event)=>{
                try {
                    const data = JSON.parse(event.data);
                    onMessage(data);
                } catch (error) {
                    console.error('Failed to parse WebSocket message:', error);
                }
            };
            this.ws.onclose = ()=>{
                console.log('WebSocket disconnected');
                this.reconnect(onMessage, onError);
            };
            this.ws.onerror = (error)=>{
                console.error('WebSocket error:', error);
                if (onError) {
                    onError(error);
                }
            };
        } catch (error) {
            console.error('Failed to connect WebSocket:', error);
            if (onError) {
                onError(error);
            }
        }
    }
    reconnect(onMessage, onError) {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
            console.log(`Reconnecting WebSocket in ${delay}ms (attempt ${this.reconnectAttempts})`);
            setTimeout(()=>{
                this.connect(onMessage, onError);
            }, delay);
        } else {
            console.error('Max WebSocket reconnection attempts reached');
        }
    }
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not connected');
        }
    }
}
const api = {
    devices: DevicesApi,
    folders: FoldersApi,
    metrics: MetricsApi,
    alerts: AlertsApi,
    realtime: new RealtimeApi(),
    // Auth methods
    setAuthToken: (token)=>httpClient.setAuthToken(token),
    clearAuthToken: ()=>httpClient.clearAuthToken()
};
const __TURBOPACK__default__export__ = api;

})()),
"[project]/packages/frontend/src/store/network-store.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "useNetworkStore": ()=>useNetworkStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.23_react@18.3.1/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.23_react@18.3.1/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/data/mock-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/lib/api.ts [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
const useNetworkStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeWithSelector"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // Initial state (devices и folders пустые, useApi всегда true)
        devices: [],
        folders: [],
        metrics: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialMetrics"],
        bandwidthHistory: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialBandwidthHistory"],
        alerts: [],
        systemHealth: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialSystemHealth"],
        connections: [],
        config: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialConfig"],
        systemLogs: [],
        // UI state
        selectedFolderId: 'root',
        sidebarCollapsed: false,
        loading: false,
        error: null,
        rootFolderExpanded: true,
        // Локальное состояние раскрытия папок (не отправляется на сервер)
        folderExpandedState: {},
        // API integration flags
        useApi: true,
        apiConnected: false,
        // WebSocket state
        webSocketConnected: false,
        // Device actions
        addDevice: async (deviceData)=>{
            console.log('🏪 Store: addDevice вызван с данными:', deviceData);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].devices.createDevice(deviceData);
                console.log('✅ Устройство создано через API:', response);
                await get().loadDevices();
            } catch (error) {
                console.error('❌ Ошибка создания устройства:', error);
                set({
                    error: 'Ошибка создания устройства через API'
                });
            }
        },
        updateDevice: async (deviceId, updates)=>{
            console.log('🏪 Store: updateDevice вызван для ID:', deviceId, 'с данными:', updates);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].devices.updateDevice(deviceId, updates);
                console.log('✅ Устройство обновлено через API:', response);
                await get().loadDevices();
            } catch (error) {
                console.error('❌ Ошибка обновления устройства:', error);
                set({
                    error: 'Ошибка обновления устройства через API'
                });
            }
        },
        deleteDevice: async (deviceId)=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].devices.deleteDevice(deviceId);
                console.log('✅ Устройство удалено через API');
                await get().loadDevices();
            } catch (error) {
                set({
                    error: 'Ошибка удаления устройства через API'
                });
            }
        },
        pingDevice: async (deviceId)=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].devices.pingDevice(deviceId);
                console.log('🏓 Ping выполнен через API:', response);
                if (response && response.data) {
                    const pingData = response.data;
                    const alive = pingData.alive;
                    const responseTime = pingData.responseTime || 0;
                    await get().updateDevice(deviceId, {
                        status: alive ? 'online' : 'offline',
                        responseTime: responseTime,
                        lastSeen: new Date()
                    });
                }
            } catch (error) {
                set({
                    error: 'Ошибка ping через API'
                });
            }
        },
        // Folder actions
        addFolder: async (folderData)=>{
            console.log('🏪 Store: addFolder вызван с данными:', folderData);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].folders.createFolder(folderData);
                console.log('✅ Папка создана через API:', response);
                await get().loadFolders();
            } catch (error) {
                console.error('❌ Ошибка создания папки:', error);
                set({
                    error: 'Ошибка создания папки через API'
                });
            }
        },
        updateFolder: async (folderId, updates)=>{
            // Специальная обработка для корневой папки
            if (folderId === 'root') {
                set((state)=>({
                        rootFolderExpanded: updates.expanded !== undefined ? updates.expanded : state.rootFolderExpanded
                    }));
                return;
            }
            // Если обновляется только состояние expanded, сохраняем локально
            if (Object.keys(updates).length === 1 && updates.expanded !== undefined) {
                set((state)=>({
                        folderExpandedState: {
                            ...state.folderExpandedState,
                            [folderId]: updates.expanded
                        }
                    }));
                return;
            }
            // Обновляем через API (только бизнес-данные, не UI состояние)
            console.log('🏪 Store: updateFolder вызван для папки:', folderId, updates);
            try {
                // Исключаем expanded из отправки на сервер
                const { expanded, ...serverUpdates } = updates;
                if (Object.keys(serverUpdates).length > 0) {
                    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].folders.updateFolder(folderId, serverUpdates);
                    console.log('✅ Папка обновлена через API:', response);
                    await get().loadFolders();
                }
                // Сохраняем состояние expanded локально
                if (expanded !== undefined) {
                    set((state)=>({
                            folderExpandedState: {
                                ...state.folderExpandedState,
                                [folderId]: expanded
                            }
                        }));
                }
            } catch (error) {
                console.error('❌ Ошибка обновления папки:', error);
                set({
                    error: 'Ошибка обновления папки через API'
                });
            }
        },
        deleteFolder: async (folderId)=>{
            console.log('🏪 Store: deleteFolder вызван для папки:', folderId);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].folders.deleteFolder(folderId);
                console.log('✅ Папка удалена через API:', response);
                await get().loadFolders();
                await get().loadDevices(); // Перезагружаем устройства, т.к. они могли быть перемещены
            } catch (error) {
                console.error('❌ Ошибка удаления папки:', error);
                set({
                    error: 'Ошибка удаления папки через API'
                });
            }
        },
        // Alert actions
        addAlert: (alertData)=>{
            const alert = {
                ...alertData,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date()
            };
            set((state)=>({
                    alerts: [
                        alert,
                        ...state.alerts
                    ].slice(0, 50)
                }));
        },
        markAlertResolved: (alertId)=>{
            set((state)=>({
                    alerts: state.alerts.map((alert)=>alert.id === alertId ? {
                            ...alert,
                            resolved: true
                        } : alert)
                }));
        },
        acknowledgeAlert: (alertId, userId)=>{
            set((state)=>({
                    alerts: state.alerts.map((alert)=>alert.id === alertId ? {
                            ...alert,
                            acknowledgedBy: userId,
                            acknowledgedAt: new Date()
                        } : alert)
                }));
        },
        clearAlerts: ()=>{
            set({
                alerts: []
            });
        },
        // Data actions
        setBandwidthData: (data)=>{
            set({
                bandwidthHistory: data
            });
        },
        addBandwidthData: (data)=>{
            set((state)=>({
                    bandwidthHistory: [
                        ...state.bandwidthHistory.slice(-19),
                        data
                    ]
                }));
        },
        updateSystemHealth: (health)=>{
            set({
                systemHealth: health
            });
        },
        updateMetrics: (metricsUpdate)=>{
            const state = get();
            const devices = state.devices;
            const totalDevices = devices.length;
            const onlineDevices = devices.filter((d)=>d.status === 'online').length;
            const offlineDevices = devices.filter((d)=>d.status === 'offline').length;
            const warningDevices = devices.filter((d)=>d.status === 'warning').length;
            const averageResponseTime = totalDevices > 0 ? Math.round(devices.reduce((sum, d)=>sum + d.responseTime, 0) / totalDevices) : 0;
            set({
                metrics: {
                    ...state.metrics,
                    totalDevices,
                    onlineDevices,
                    offlineDevices,
                    warningDevices,
                    averageResponseTime,
                    lastUpdate: new Date(),
                    ...metricsUpdate
                }
            });
        },
        loadDevices: async ()=>{
            set({
                loading: true,
                error: null
            });
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].devices.getDevices();
                let devices = [];
                if (response && response.data) {
                    devices = Array.isArray(response.data) ? response.data : [];
                } else if (Array.isArray(response)) {
                    devices = response;
                }
                set({
                    devices,
                    loading: false,
                    apiConnected: true,
                    error: null
                });
            // get().updateMetrics({}); // УДАЛЕНО: метрики теперь только из API
            } catch (error) {
                set({
                    devices: [],
                    loading: false,
                    error: 'API недоступен',
                    apiConnected: false
                });
            // get().updateMetrics({}); // УДАЛЕНО: метрики теперь только из API
            }
        },
        loadSystemHealth: async ()=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].metrics.getSystemHealth();
                console.log('✅ API Response system health:', response);
                // Простая обработка - пока используем initialSystemHealth и обновляем apiConnected
                set({
                    systemHealth: {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialSystemHealth"],
                        lastUpdate: new Date()
                    },
                    apiConnected: true,
                    error: null
                });
                console.log('💻 Системные метрики обновлены (API подключен)');
            } catch (error) {
                console.error('❌ API недоступен для системного здоровья:', error);
                set({
                    systemHealth: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialSystemHealth"],
                    apiConnected: false,
                    error: 'Метрики системы недоступны'
                });
            }
        },
        loadBandwidthData: async ()=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].metrics.getBandwidthHistory();
                console.log('✅ API Response bandwidth:', response);
                // Обрабатываем данные пропускной способности
                let bandwidthData = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialBandwidthHistory"];
                if (response && response.data && Array.isArray(response.data)) {
                    bandwidthData = response.data;
                }
                set({
                    bandwidthHistory: bandwidthData,
                    apiConnected: true
                });
                console.log('📊 Данные пропускной способности обновлены');
            } catch (error) {
                console.error('❌ API недоступен для данных пропускной способности:', error);
                set({
                    bandwidthHistory: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialBandwidthHistory"],
                    apiConnected: false
                });
            }
        },
        loadFolders: async ()=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].folders.getFolders();
                console.log('✅ API Response folders:', response);
                if (response && response.data) {
                    set({
                        folders: response.data,
                        apiConnected: true
                    });
                    console.log('📁 Папки загружены с API:', response.data.length);
                }
            } catch (error) {
                console.error('❌ API недоступен для папок:', error);
                set({
                    folders: [],
                    apiConnected: false
                });
            }
        },
        loadNetworkMetrics: async ()=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].metrics.getNetworkMetrics();
                console.log('✅ API Response network metrics:', response);
                // Обрабатываем метрики сети
                let metrics = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialMetrics"];
                if (response && response.data) {
                    metrics = {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialMetrics"],
                        ...response.data,
                        lastUpdate: new Date()
                    };
                }
                set({
                    metrics,
                    apiConnected: true
                });
                console.log('🌐 Метрики сети обновлены');
            } catch (error) {
                console.error('❌ API недоступен для метрик сети:', error);
                set({
                    metrics: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialMetrics"],
                    apiConnected: false
                });
            }
        },
        // UI actions
        setSelectedFolder: (folderId)=>{
            set({
                selectedFolderId: folderId
            });
        },
        setSidebarCollapsed: (collapsed)=>{
            set({
                sidebarCollapsed: collapsed
            });
        },
        setLoading: (loading)=>{
            set({
                loading
            });
        },
        setError: (error)=>{
            set({
                error
            });
        },
        setUseApi: (useApi)=>{
            set({
                useApi
            });
        },
        // Data management
        refreshData: async ()=>{
            set({
                loading: true,
                error: null
            });
            try {
                await Promise.allSettled([
                    get().loadDevices(),
                    get().loadSystemHealth(),
                    get().loadBandwidthData(),
                    get().loadNetworkMetrics()
                ]);
                set({
                    loading: false
                });
            } catch (error) {
                set({
                    loading: false,
                    error: error instanceof Error ? error.message : 'Ошибка обновления данных'
                });
            }
        },
        // Инициализация API подключения
        initializeApi: async ()=>{
            console.log('🔌 Попытка подключения к API...');
            try {
                // Проверяем доступность API
                const response = await fetch('http://localhost:5000/api/health');
                if (response.ok) {
                    console.log('✅ API доступен! Включаем API режим');
                    set({
                        useApi: true,
                        apiConnected: true
                    });
                    await get().loadFolders(); // Загружаем папки
                    await get().refreshData();
                } else {
                    console.log('❌ API недоступен, используем моковые данные');
                    set({
                        useApi: false,
                        apiConnected: false
                    });
                }
            } catch (error) {
                console.log('❌ API недоступен, используем моковые данные');
                set({
                    useApi: false,
                    apiConnected: false
                });
            }
        },
        exportData: ()=>{
            const state = get();
            const exportData = {
                devices: state.devices,
                folders: state.folders,
                connections: state.connections,
                config: state.config,
                exportTimestamp: new Date().toISOString()
            };
            return JSON.stringify(exportData, null, 2);
        },
        importData: (jsonData)=>{
            try {
                const data = JSON.parse(jsonData);
                set({
                    devices: data.devices || [],
                    folders: data.folders || [],
                    connections: data.connections || [],
                    config: data.config || __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialConfig"]
                });
                get().updateMetrics({});
                return true;
            } catch  {
                return false;
            }
        },
        resetData: ()=>{
            set({
                devices: [],
                folders: [],
                metrics: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialMetrics"],
                bandwidthHistory: [],
                alerts: [],
                systemHealth: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialSystemHealth"],
                connections: [],
                selectedFolderId: 'root',
                loading: false,
                error: null
            });
        },
        resetToMockData: ()=>{
        // Отключено: mock-данные больше не используются
        },
        setRootFolderExpanded: (expanded)=>{
            set({
                rootFolderExpanded: expanded
            });
        },
        // System log actions
        addSystemLog: (log)=>{
            const systemLog = {
                ...log,
                id: Date.now().toString(),
                timestamp: new Date()
            };
            set((state)=>({
                    systemLogs: [
                        systemLog,
                        ...state.systemLogs
                    ].slice(0, 100)
                }));
        },
        clearSystemLogs: ()=>{
            set({
                systemLogs: []
            });
        },
        // WebSocket actions
        setWebSocketConnected: (connected)=>{
            set({
                webSocketConnected: connected
            });
        },
        updateDeviceStatus: (deviceId, updates)=>{
            set((state)=>({
                    devices: state.devices.map((device)=>device.id === deviceId ? {
                            ...device,
                            ...updates,
                            lastSeen: new Date()
                        } : device)
                }));
            get().updateMetrics({});
        },
        // Folder UI state helpers
        getFolderExpandedState: (folderId)=>{
            const state = get();
            return state.folderExpandedState[folderId] ?? true; // По умолчанию папки развернуты
        }
    }), {
    name: 'network-monitor-storage',
    partialize: (state)=>({
            selectedFolderId: state.selectedFolderId,
            sidebarCollapsed: state.sidebarCollapsed,
            rootFolderExpanded: state.rootFolderExpanded
        })
})));

})()),
"[project]/packages/frontend/src/hooks/useWebSocket.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "useWebSocket": ()=>useWebSocket
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$socket$2e$io$2d$client$40$4$2e$8$2e$1$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/socket.io-client@4.8.1/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$socket$2e$io$2d$client$40$4$2e$8$2e$1$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/socket.io-client@4.8.1/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/store/network-store.ts [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
'use client';
;
;
;
const useWebSocket = ()=>{
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const reconnectTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])();
    const reconnectAttempts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const maxReconnectAttempts = 5;
    const updateDeviceStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNetworkStore"])((state)=>state.updateDeviceStatus);
    const updateMetrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNetworkStore"])((state)=>state.updateMetrics);
    const updateSystemHealth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNetworkStore"])((state)=>state.updateSystemHealth);
    const addBandwidthData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNetworkStore"])((state)=>state.addBandwidthData);
    const addSystemLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNetworkStore"])((state)=>state.addSystemLog);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (socket?.connected) {
            console.log('⚠️ WebSocket уже подключен, пропускаем');
            return;
        }
        console.log('🔌 Подключение к WebSocket серверу (http://localhost:5000)...');
        const newSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$socket$2e$io$2d$client$40$4$2e$8$2e$1$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])('http://localhost:5000', {
            transports: [
                'websocket',
                'polling'
            ],
            reconnection: false,
            timeout: 5000,
            forceNew: true
        });
        // Обработчики подключения
        newSocket.on('connect', ()=>{
            console.log('✅ WebSocket подключен');
            setConnected(true);
            reconnectAttempts.current = 0;
            addSystemLog({
                type: 'info',
                message: 'WebSocket соединение установлено'
            });
        });
        newSocket.on('disconnect', (reason)=>{
            console.log('❌ WebSocket отключен:', reason);
            setConnected(false);
            addSystemLog({
                type: 'warning',
                message: `WebSocket соединение разорвано: ${reason}`
            });
            // Автоматическое переподключение
            if (reconnectAttempts.current < maxReconnectAttempts) {
                const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
                console.log(`🔄 Переподключение через ${delay}ms (попытка ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`);
                reconnectTimeoutRef.current = setTimeout(()=>{
                    reconnectAttempts.current++;
                    newSocket.connect();
                }, delay);
            }
        });
        newSocket.on('connect_error', (error)=>{
            console.error('❌ Ошибка подключения WebSocket:', error);
            setConnected(false);
            addSystemLog({
                type: 'error',
                message: `Ошибка WebSocket подключения: ${error.message}`
            });
        });
        // Обработчики событий данных
        newSocket.on('device:ping:result', (data)=>{
            console.log('📡 Получен результат ping:', data);
            updateDeviceStatus(data.deviceId, {
                status: data.success ? 'online' : 'offline',
                responseTime: data.responseTime || 0,
                lastSeen: new Date()
            });
            if (!data.success && data.error) {
                addSystemLog({
                    type: 'warning',
                    message: `Устройство ${data.deviceId} недоступно: ${data.error}`
                });
            }
        });
        // Обработчик для старого формата events
        newSocket.on('metrics:update', (data)=>{
            console.log('📊 Получены обновленные метрики (старый формат):', data);
            if (data.metrics) {
                updateMetrics(data.metrics);
            }
            if (data.systemHealth) {
                updateSystemHealth(data.systemHealth);
            }
        });
        // Обработчик для нового формата от бэкенда
        newSocket.on('metrics_update', (data)=>{
            console.log('📊 Получены real-time метрики от бэкенда:', data);
            // Обновляем статусы устройств
            data.deviceMetrics.forEach((device)=>{
                updateDeviceStatus(device.deviceId, {
                    status: device.status,
                    responseTime: device.responseTime,
                    lastSeen: new Date()
                });
            });
            // Обновляем системные метрики
            updateSystemHealth({
                ...data.systemHealth,
                lastUpdate: new Date()
            });
            // Обновляем общие метрики сети
            updateMetrics({
                totalDevices: data.networkMetrics.totalDevices,
                onlineDevices: data.networkMetrics.onlineDevices,
                offlineDevices: data.networkMetrics.offlineDevices,
                averageResponseTime: data.networkMetrics.averageResponseTime,
                lastUpdate: new Date()
            });
            // Симулируем данные пропускной способности для графика
            const bandwidthData = {
                timestamp: new Date(),
                upload: 50 + Math.random() * 100,
                download: 100 + Math.random() * 200,
                total: 150 + Math.random() * 300
            };
            addBandwidthData(bandwidthData);
            addSystemLog({
                type: 'info',
                message: `Обновлены метрики: ${data.networkMetrics.onlineDevices}/${data.networkMetrics.totalDevices} устройств онлайн`
            });
        });
        newSocket.on('device:monitoring:update', (data)=>{
            console.log('🔄 Обновление мониторинга устройства:', data);
            updateDeviceStatus(data.deviceId, {
                status: data.status,
                responseTime: data.responseTime,
                lastSeen: new Date(data.timestamp)
            });
        });
        setSocket(newSocket);
    }, [
        socket,
        addSystemLog,
        updateDeviceStatus,
        updateMetrics,
        updateSystemHealth,
        addBandwidthData
    ]);
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }
        if (socket) {
            console.log('🔌 Отключение от WebSocket сервера...');
            socket.disconnect();
            setSocket(null);
            setConnected(false);
        }
    }, [
        socket
    ]);
    // Очистка при размонтировании
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            disconnect();
        };
    }, [
        disconnect
    ]);
    return {
        socket,
        connected,
        connect,
        disconnect
    };
};

})()),
"[project]/packages/frontend/src/components/dashboard/websocket-provider.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "WebSocketProvider": ()=>WebSocketProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/hooks/useWebSocket.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/store/network-store.ts [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
'use client';
;
;
;
;
const WebSocketProvider = ({ children })=>{
    const { socket, connected, connect, disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWebSocket"])();
    const apiConnected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNetworkStore"])((state)=>state.apiConnected);
    const setWebSocketConnected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNetworkStore"])((state)=>state.setWebSocketConnected);
    // Автоматическое подключение при доступности API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (apiConnected && !connected) {
            console.log('🔌 API доступен, подключаемся к WebSocket...');
            connect();
        } else if (!apiConnected && connected) {
            console.log('❌ API недоступен, отключаемся от WebSocket...');
            disconnect();
        }
    }, [
        apiConnected,
        connected
    ]); // Убираем connect/disconnect из зависимостей
    // Обновляем состояние подключения в store
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setWebSocketConnected(connected);
    }, [
        connected
    ]); // Убираем setWebSocketConnected из зависимостей
    // Очистка при размонтировании
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (connected) {
                disconnect();
            }
        };
    }, []); // Убираем все зависимости для cleanup эффекта
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
};

})()),
"[project]/packages/frontend/app/providers.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Providers": ()=>Providers
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$2$2e$1_next$40$14$2e$2_bec40b5b00d3d1e0b2d1842e8b7336b6$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next-themes@0.2.1_next@14.2_bec40b5b00d3d1e0b2d1842e8b7336b6/node_modules/next-themes/dist/index.module.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$ui$2f$error$2d$boundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/components/ui/error-boundary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$dashboard$2f$websocket$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/packages/frontend/src/components/dashboard/websocket-provider.tsx [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
'use client';
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$ui$2f$error$2d$boundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$2$2e$1_next$40$14$2e$2_bec40b5b00d3d1e0b2d1842e8b7336b6$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            attribute: "class",
            defaultTheme: "dark",
            enableSystem: false,
            storageKey: "network-monitor-theme",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$frontend$2f$src$2f$components$2f$dashboard$2f$websocket$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebSocketProvider"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/frontend/app/providers.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/frontend/app/providers.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/frontend/app/providers.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}

})()),
"[project]/packages/frontend/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),

};

//# sourceMappingURL=%5Bproject%5D_packages_frontend_67d159._.js.map