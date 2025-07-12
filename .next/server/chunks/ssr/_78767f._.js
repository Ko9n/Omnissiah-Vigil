module.exports = {

"[project]/src/data/mock-data.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
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
    totalDevices: 10,
    onlineDevices: 8,
    offlineDevices: 1,
    warningDevices: 1,
    averageResponseTime: 6,
    totalBandwidth: 1000,
    usedBandwidth: 720,
    packetLoss: 0.2,
    networkUptime: 98.7,
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
"[project]/src/store/network-store.ts [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "useNetworkStore": ()=>useNetworkStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.23_react@18.3.1/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/zustand@4.5.7_@types+react@18.3.23_react@18.3.1/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/data/mock-data.ts [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const useNetworkStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeWithSelector"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$4$2e$5$2e$7_$40$types$2b$react$40$18$2e$3$2e$23_react$40$18$2e$3$2e$1$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        // Initial state with mock data
        devices: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockDevices"],
        folders: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFolders"],
        metrics: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialMetrics"],
        bandwidthHistory: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialBandwidthHistory"],
        alerts: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockAlerts"],
        systemHealth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialSystemHealth"],
        connections: [],
        config: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialConfig"],
        // UI state
        selectedFolderId: 'root',
        sidebarCollapsed: false,
        loading: false,
        error: null,
        rootFolderExpanded: true,
        othersExpanded: false,
        // Device actions
        addDevice: (deviceData)=>{
            const device = {
                ...deviceData,
                id: Math.random().toString(36).substr(2, 9),
                lastSeen: new Date(),
                status: 'online'
            };
            set((state)=>({
                    devices: [
                        ...state.devices,
                        device
                    ]
                }));
            // Update metrics
            get().updateMetrics({});
        },
        updateDevice: (deviceId, updates)=>{
            set((state)=>({
                    devices: state.devices.map((device)=>device.id === deviceId ? {
                            ...device,
                            ...updates,
                            lastSeen: new Date()
                        } : device)
                }));
            // Update metrics
            get().updateMetrics({});
        },
        deleteDevice: (deviceId)=>{
            set((state)=>({
                    devices: state.devices.filter((device)=>device.id !== deviceId)
                }));
            // Update metrics
            get().updateMetrics({});
        },
        // Folder actions
        addFolder: (folderData)=>{
            const folder = {
                ...folderData,
                id: Math.random().toString(36).substr(2, 9),
                children: []
            };
            const addFolderRecursive = (folders)=>{
                return folders.map((f)=>f.id === (folder.parentId || 'root') ? {
                        ...f,
                        children: [
                            ...f.children,
                            folder
                        ]
                    } : {
                        ...f,
                        children: addFolderRecursive(f.children)
                    });
            };
            if (!folder.parentId || folder.parentId === 'root') {
                set((state)=>({
                        folders: [
                            ...state.folders,
                            folder
                        ]
                    }));
            } else {
                set((state)=>({
                        folders: addFolderRecursive(state.folders)
                    }));
            }
        },
        updateFolder: (folderId, updates)=>{
            // Специальная обработка для корневой папки
            if (folderId === 'root') {
                set((state)=>({
                        rootFolderExpanded: updates.expanded !== undefined ? updates.expanded : state.rootFolderExpanded
                    }));
                return;
            }
            // Специальная обработка для папки "Иные"
            if (folderId === 'others') {
                set((state)=>({
                        othersExpanded: updates.expanded !== undefined ? updates.expanded : state.othersExpanded
                    }));
                return;
            }
            const updateFolderRecursive = (folders)=>{
                return folders.map((folder)=>folder.id === folderId ? {
                        ...folder,
                        ...updates
                    } : {
                        ...folder,
                        children: updateFolderRecursive(folder.children)
                    });
            };
            set((state)=>({
                    folders: updateFolderRecursive(state.folders)
                }));
        },
        deleteFolder: (folderId)=>{
            const removeFolderRecursive = (folders)=>{
                return folders.filter((folder)=>folder.id !== folderId).map((folder)=>({
                        ...folder,
                        children: removeFolderRecursive(folder.children)
                    }));
            };
            set((state)=>({
                    folders: removeFolderRecursive(state.folders),
                    devices: state.devices.map((device)=>device.folderId === folderId ? {
                            ...device,
                            folderId: 'root'
                        } : device)
                }));
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
        // Data management
        refreshData: async ()=>{
            set({
                loading: true,
                error: null
            });
            try {
                // Simulate API call
                await new Promise((resolve)=>setTimeout(resolve, 1000));
                get().updateMetrics({});
                set({
                    loading: false
                });
            } catch (error) {
                set({
                    loading: false,
                    error: error instanceof Error ? error.message : 'Ошибка загрузки данных'
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
                    config: data.config || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialConfig"]
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
                metrics: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialMetrics"],
                bandwidthHistory: [],
                alerts: [],
                systemHealth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialSystemHealth"],
                connections: [],
                selectedFolderId: 'root',
                loading: false,
                error: null
            });
        },
        resetToMockData: ()=>{
            set({
                devices: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockDevices"],
                folders: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFolders"],
                metrics: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialMetrics"],
                bandwidthHistory: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialBandwidthHistory"],
                alerts: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockAlerts"],
                systemHealth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initialSystemHealth"],
                connections: [],
                selectedFolderId: 'root',
                loading: false,
                error: null,
                rootFolderExpanded: true,
                othersExpanded: false
            });
            get().updateMetrics({});
        }
    }), {
    name: 'network-monitor-storage',
    partialize: (state)=>({
            devices: state.devices,
            folders: state.folders,
            config: state.config,
            selectedFolderId: state.selectedFolderId,
            sidebarCollapsed: state.sidebarCollapsed
        })
})));

})()),
"[project]/src/components/ui/context-menu.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "DeviceContextMenu": ()=>DeviceContextMenu
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/terminal.js [app-ssr] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/wifi.js [app-ssr] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/pen-line.js [app-ssr] (ecmascript) <export default as Edit3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/activity.js [app-ssr] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
"__TURBOPACK__ecmascript__hoisting__location__";
'use client';
;
;
;
const DeviceContextMenu = ({ device, position, isVisible, onClose, onAction })=>{
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        const handleEscape = (event)=>{
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [
        isVisible,
        onClose
    ]);
    if (!isVisible) return null;
    const menuItems = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"],
            label: 'Пинг устройства',
            action: 'ping',
            color: 'text-green-400 hover:text-green-300',
            disabled: device.status === 'offline'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"],
            label: 'SSH подключение',
            action: 'ssh',
            color: 'text-blue-400 hover:text-blue-300',
            disabled: device.status === 'offline'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
            label: 'Веб-интерфейс',
            action: 'web',
            color: 'text-purple-400 hover:text-purple-300',
            disabled: device.status === 'offline'
        },
        {
            divider: true
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
            label: 'Настройки',
            action: 'settings',
            color: 'text-slate-400 hover:text-white'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"],
            label: 'Редактировать',
            action: 'edit',
            color: 'text-slate-400 hover:text-white'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"],
            label: 'Сканировать порты',
            action: 'scan',
            color: 'text-cyan-400 hover:text-cyan-300'
        },
        {
            divider: true
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
            label: 'Просмотр логов',
            action: 'logs',
            color: 'text-yellow-400 hover:text-yellow-300'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
            label: 'Безопасность',
            action: 'security',
            color: 'text-orange-400 hover:text-orange-300'
        },
        {
            divider: true
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"],
            label: 'Удалить устройство',
            action: 'delete',
            color: 'text-red-400 hover:text-red-300',
            dangerous: true
        }
    ];
    // Проверяем, чтобы меню не выходило за границы экрана
    const adjustedPosition = {
        x: Math.min(position.x, (typeof window !== 'undefined' ? window.innerWidth : 1920) - 250),
        y: Math.min(position.y, (typeof window !== 'undefined' ? window.innerHeight : 1080) - menuItems.length * 40)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: menuRef,
        className: "fixed z-50 min-w-[240px] rounded-lg border border-slate-600/50 bg-slate-800/95 py-2 shadow-xl backdrop-blur-sm",
        style: {
            left: adjustedPosition.x,
            top: adjustedPosition.y
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-slate-600/50 px-4 py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `h-3 w-3 rounded-full ${device.status === 'online' ? 'bg-green-500' : device.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/context-menu.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-medium text-white",
                                    children: device.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/context-menu.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-slate-400",
                                    children: device.ip
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/context-menu.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/context-menu.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/context-menu.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/context-menu.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-1",
                children: menuItems.map((item, index)=>{
                    if ('divider' in item) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-2 my-1 h-px bg-slate-600/30"
                        }, index, false, {
                            fileName: "[project]/src/components/ui/context-menu.tsx",
                            lineNumber: 172,
                            columnNumber: 15
                        }, this);
                    }
                    const Icon = item.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            onAction(item.action, device);
                            onClose();
                        },
                        disabled: item.disabled,
                        className: `flex w-full items-center space-x-3 px-4 py-2 text-sm transition-colors ${item.disabled ? 'cursor-not-allowed text-slate-500' : `${item.color} cursor-pointer hover:bg-slate-700/50`} ${item.dangerous ? 'hover:bg-red-500/10' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/context-menu.tsx",
                                lineNumber: 191,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/context-menu.tsx",
                                lineNumber: 192,
                                columnNumber: 15
                            }, this),
                            item.disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto text-xs text-slate-500",
                                children: "(офлайн)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/context-menu.tsx",
                                lineNumber: 194,
                                columnNumber: 17
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/src/components/ui/context-menu.tsx",
                        lineNumber: 178,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ui/context-menu.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-slate-600/50 px-4 py-2 text-xs text-slate-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Тип: ",
                                    device.type
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/context-menu.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Время отклика: ",
                                    device.responseTime,
                                    "ms"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/context-menu.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/context-menu.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Uptime: ",
                                    device.uptime.toFixed(1),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/context-menu.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Последний: ",
                                    new Date(device.lastSeen).toLocaleTimeString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/context-menu.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/context-menu.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/context-menu.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/context-menu.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
};

})()),
"[project]/src/components/ui/toast.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ToastContainer": ()=>ToastContainer,
    "useToast": ()=>useToast
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$10$2e$18$2e$0_react_39718d184a546e7029955c4644d61736$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@10.18.0_react_39718d184a546e7029955c4644d61736/node_modules/framer-motion/dist/es/render/dom/motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$10$2e$18$2e$0_react_39718d184a546e7029955c4644d61736$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@10.18.0_react_39718d184a546e7029955c4644d61736/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/alert-triangle.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
"__TURBOPACK__ecmascript__hoisting__location__";
'use client';
;
;
;
;
const ToastItem = ({ toast, onClose })=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const duration = toast.duration || 5000;
        const timer = setTimeout(()=>{
            onClose(toast.id);
        }, duration);
        return ()=>clearTimeout(timer);
    }, [
        toast.id,
        toast.duration,
        onClose
    ]);
    const getIcon = ()=>{
        switch(toast.type){
            case 'success':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                    className: "h-5 w-5 text-green-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/toast.tsx",
                    lineNumber: 38,
                    columnNumber: 16
                }, this);
            case 'error':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                    className: "h-5 w-5 text-red-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/toast.tsx",
                    lineNumber: 40,
                    columnNumber: 16
                }, this);
            case 'warning':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "h-5 w-5 text-yellow-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/toast.tsx",
                    lineNumber: 42,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                    className: "h-5 w-5 text-blue-400"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/toast.tsx",
                    lineNumber: 44,
                    columnNumber: 16
                }, this);
        }
    };
    const getBorderColor = ()=>{
        switch(toast.type){
            case 'success':
                return 'border-l-green-500';
            case 'error':
                return 'border-l-red-500';
            case 'warning':
                return 'border-l-yellow-500';
            default:
                return 'border-l-blue-500';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$10$2e$18$2e$0_react_39718d184a546e7029955c4644d61736$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        exit: {
            opacity: 0,
            y: -50,
            scale: 0.95
        },
        transition: {
            duration: 0.2
        },
        className: `border border-slate-600/50 bg-slate-800/95 backdrop-blur-sm ${getBorderColor()} w-full max-w-sm rounded-lg border-l-4 p-4 shadow-xl`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start space-x-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0",
                    children: getIcon()
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/toast.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "text-sm font-medium text-white",
                            children: toast.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/toast.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        toast.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-slate-300",
                            children: toast.message
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/toast.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/toast.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onClose(toast.id),
                    className: "flex-shrink-0 text-slate-400 transition-colors hover:text-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/toast.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/toast.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/toast.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
};
const ToastContainer = ({ toasts, onClose })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-4 top-4 z-[100] space-y-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$10$2e$18$2e$0_react_39718d184a546e7029955c4644d61736$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastItem, {
                    toast: toast,
                    onClose: onClose
                }, toast.id, false, {
                    fileName: "[project]/src/components/ui/toast.tsx",
                    lineNumber: 98,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/toast.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/toast.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
};
const useToast = ()=>{
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const addToast = (toast)=>{
        const id = Date.now().toString();
        setToasts((prev)=>[
                ...prev,
                {
                    ...toast,
                    id
                }
            ]);
    };
    const removeToast = (id)=>{
        setToasts((prev)=>prev.filter((toast)=>toast.id !== id));
    };
    const success = (title, message, duration)=>{
        addToast({
            type: 'success',
            title,
            message,
            duration
        });
    };
    const error = (title, message, duration)=>{
        addToast({
            type: 'error',
            title,
            message,
            duration
        });
    };
    const warning = (title, message, duration)=>{
        addToast({
            type: 'warning',
            title,
            message,
            duration
        });
    };
    const info = (title, message, duration)=>{
        addToast({
            type: 'info',
            title,
            message,
            duration
        });
    };
    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info
    };
};

})()),
"[project]/src/components/ui/network-topology.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "NetworkTopology": ()=>NetworkTopology
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$10$2e$18$2e$0_react_39718d184a546e7029955c4644d61736$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@10.18.0_react_39718d184a546e7029955c4644d61736/node_modules/framer-motion/dist/es/render/dom/motion.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/network.js [app-ssr] (ecmascript) <export default as Network>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-ssr] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$router$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Router$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/router.js [app-ssr] (ecmascript) <export default as Router>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/wifi.js [app-ssr] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/monitor.js [app-ssr] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/server.js [app-ssr] (ecmascript) <export default as Server>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-ssr] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/store/network-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/context-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/toast.tsx [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
'use client';
;
;
;
;
;
;
;
;
// Device type configuration
const deviceIcons = {
    router: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$router$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Router$3e$__["Router"],
    switch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"],
    computer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"],
    server: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"],
    mobile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"],
    wifi: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"],
    workstation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"],
    printer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"],
    firewall: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
    access_point: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"]
};
const deviceColors = {
    router: '#3B82F6',
    switch: '#10B981',
    computer: '#8B5CF6',
    server: '#F59E0B',
    mobile: '#EF4444',
    wifi: '#06B6D4',
    workstation: '#6B7280',
    printer: '#F97316',
    firewall: '#DC2626',
    access_point: '#10B981'
};
function NetworkTopology({ isFullscreen = false }) {
    const { devices, updateDevice, selectedFolderId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$network$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNetworkStore"])();
    const { toasts, removeToast, success, error, warning, info } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Инициализируем соединения из localStorage сразу
    const [connections, setConnections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if (typeof window !== 'undefined') {
            const savedConnections = localStorage.getItem('topology-connections');
            if (savedConnections) {
                try {
                    return JSON.parse(savedConnections);
                } catch (e) {
                    console.error('Failed to load connections:', e);
                }
            }
        }
        return [];
    });
    const [dragState, setDragState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isDragging: false,
        deviceId: null,
        offset: {
            x: 0,
            y: 0
        }
    });
    const [connectionState, setConnectionState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isConnecting: false,
        sourceId: null,
        tempLine: null
    });
    const [contextMenu, setContextMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isVisible: false,
        device: null,
        position: {
            x: 0,
            y: 0
        }
    });
    // Инициализируем позиции устройств из localStorage сразу
    const [devicePositions, setDevicePositions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if (typeof window !== 'undefined') {
            const savedPositions = localStorage.getItem('topology-positions');
            if (savedPositions) {
                try {
                    return JSON.parse(savedPositions);
                } catch (e) {
                    console.error('Failed to load positions:', e);
                }
            }
        }
        return {};
    });
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Generate default positions for devices
    const generateDefaultPositions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((devices)=>{
        const positions = {};
        const gridCols = 4;
        const spacing = {
            x: 200,
            y: 150
        };
        const offset = {
            x: 100,
            y: 80
        };
        devices.forEach((device, index)=>{
            const col = index % gridCols;
            const row = Math.floor(index / gridCols);
            positions[device.id] = {
                x: offset.x + col * spacing.x,
                y: offset.y + row * spacing.y
            };
        });
        return positions;
    }, []);
    // Генерируем позиции по умолчанию для новых устройств
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setDevicePositions((prev)=>{
            // Если позиции уже есть для всех устройств, не изменяем
            const hasAllPositions = devices.every((device)=>prev[device.id]);
            if (hasAllPositions && Object.keys(prev).length > 0) {
                return prev;
            }
            // Генерируем позиции только для новых устройств
            const newPositions = {
                ...prev
            };
            const defaultPositions = generateDefaultPositions(devices);
            devices.forEach((device)=>{
                if (!newPositions[device.id]) {
                    newPositions[device.id] = defaultPositions[device.id];
                }
            });
            return newPositions;
        });
    }, [
        devices,
        generateDefaultPositions
    ]);
    // Save positions when they change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (Object.keys(devicePositions).length > 0) {
            localStorage.setItem('topology-positions', JSON.stringify(devicePositions));
        }
    }, [
        devicePositions
    ]);
    // Save connections when they change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('topology-connections', JSON.stringify(connections));
    }, [
        connections
    ]);
    // Combine devices with positions
    const devicesWithPositions = devices.map((device)=>({
            ...device,
            position: devicePositions[device.id] || {
                x: 100,
                y: 100
            }
        }));
    // Reset layout function
    const resetLayout = ()=>{
        const defaultPositions = generateDefaultPositions(devices);
        setDevicePositions(defaultPositions);
        setConnections([]);
        localStorage.removeItem('topology-positions');
        localStorage.removeItem('topology-connections');
        success('Макет сброшен', 'Расположение устройств и соединения сброшены к настройкам по умолчанию');
    };
    // Mouse handlers for dragging
    const handleMouseDown = (e, deviceId)=>{
        if (!isEditMode) return;
        e.preventDefault();
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;
        const device = devicesWithPositions.find((d)=>d.id === deviceId);
        if (!device?.position) return;
        setDragState({
            isDragging: true,
            deviceId,
            offset: {
                x: e.clientX - rect.left - device.position.x,
                y: e.clientY - rect.top - device.position.y
            }
        });
    };
    const handleMouseMove = (e)=>{
        if (!isEditMode) return;
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return;
        if (dragState.isDragging && dragState.deviceId) {
            const newX = e.clientX - rect.left - dragState.offset.x;
            const newY = e.clientY - rect.top - dragState.offset.y;
            setDevicePositions((prev)=>({
                    ...prev,
                    [dragState.deviceId]: {
                        x: newX,
                        y: newY
                    }
                }));
        }
        if (connectionState.isConnecting && connectionState.sourceId) {
            setConnectionState((prev)=>({
                    ...prev,
                    tempLine: {
                        ...prev.tempLine,
                        x2: e.clientX - rect.left,
                        y2: e.clientY - rect.top
                    }
                }));
        }
    };
    const handleMouseUp = ()=>{
        setDragState({
            isDragging: false,
            deviceId: null,
            offset: {
                x: 0,
                y: 0
            }
        });
    };
    // Device click handler
    const handleDeviceClick = (deviceId)=>{
        if (!isEditMode) return;
        if (connectionState.isConnecting) {
            if (connectionState.sourceId === deviceId) {
                // Cancel connection
                setConnectionState({
                    isConnecting: false,
                    sourceId: null,
                    tempLine: null
                });
                info('Отменено', 'Создание соединения отменено');
            } else {
                // Create connection
                const newConnection = {
                    id: `${connectionState.sourceId}-${deviceId}`,
                    sourceId: connectionState.sourceId,
                    targetId: deviceId
                };
                setConnections((prev)=>[
                        ...prev,
                        newConnection
                    ]);
                setConnectionState({
                    isConnecting: false,
                    sourceId: null,
                    tempLine: null
                });
                success('Соединение создано', 'Новое соединение успешно добавлено');
            }
        } else {
            // Start connection
            const device = devicesWithPositions.find((d)=>d.id === deviceId);
            if (device?.position) {
                setConnectionState({
                    isConnecting: true,
                    sourceId: deviceId,
                    tempLine: {
                        x1: device.position.x,
                        y1: device.position.y,
                        x2: device.position.x,
                        y2: device.position.y
                    }
                });
                info('Режим соединения', 'Кликните на другое устройство для создания соединения');
            }
        }
    };
    // Connection deletion
    const handleDeleteConnection = (connectionId)=>{
        setConnections((prev)=>prev.filter((c)=>c.id !== connectionId));
        warning('Соединение удалено', 'Соединение между устройствами удалено');
    };
    // Context menu handlers
    const handleContextMenu = (e, device)=>{
        e.preventDefault();
        setContextMenu({
            isVisible: true,
            device,
            position: {
                x: e.clientX,
                y: e.clientY
            }
        });
    };
    const handleCloseContextMenu = ()=>{
        setContextMenu({
            isVisible: false,
            device: null,
            position: {
                x: 0,
                y: 0
            }
        });
    };
    const handleContextAction = (action, device)=>{
        handleCloseContextMenu();
        switch(action){
            case 'ping':
                if (device.status === 'online') {
                    success('Ping успешен', `Устройство ${device.name} отвечает`);
                } else {
                    error('Ping неудачен', `Устройство ${device.name} не отвечает`);
                }
                break;
            case 'ssh':
                if (device.status === 'online') {
                    info('SSH соединение', `Подключение к ${device.name} через SSH...`);
                } else {
                    error('SSH недоступен', `Устройство ${device.name} офлайн`);
                }
                break;
            case 'web':
                if (device.status === 'online') {
                    info('Веб-интерфейс', `Открытие веб-интерфейса ${device.name}...`);
                } else {
                    error('Веб-интерфейс недоступен', `Устройство ${device.name} офлайн`);
                }
                break;
            case 'edit':
                info('Редактирование', `Редактирование настроек ${device.name}...`);
                break;
            case 'delete':
                warning('Удаление устройства', `Устройство ${device.name} помечено для удаления`);
                break;
            default:
                info(action, `Действие "${action}" для устройства ${device.name}`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$10$2e$18$2e$0_react_39718d184a546e7029955c4644d61736$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5
        },
        className: "rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm",
        children: [
            !isFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg bg-slate-700/50 p-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"], {
                                    className: "h-5 w-5 text-blue-400"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/network-topology.tsx",
                                    lineNumber: 409,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 408,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-white",
                                        children: "Сетевая топология"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 412,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-400",
                                        children: "Интерактивная карта сети"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 415,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/network-topology.tsx",
                        lineNumber: 407,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsEditMode(!isEditMode),
                                className: `rounded-lg px-4 py-2 transition-colors ${isEditMode ? 'border border-green-500/30 bg-green-500/20 text-green-400' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'}`,
                                children: isEditMode ? 'Выйти из редактора' : 'Режим редактирования'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 420,
                                columnNumber: 13
                            }, this),
                            isEditMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: resetLayout,
                                        className: "rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white",
                                        title: "Сбросить расположение",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/network-topology.tsx",
                                            lineNumber: 437,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 432,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const positions = localStorage.getItem('topology-positions');
                                            const savedConnections = localStorage.getItem('topology-connections');
                                            // Debug info только для разработки
                                            if ("TURBOPACK compile-time truthy", 1) {
                                                console.log('=== DEBUG localStorage ===');
                                                console.log('Positions:', positions ? JSON.parse(positions) : 'Not found');
                                                console.log('Saved Connections:', savedConnections ? JSON.parse(savedConnections) : 'Not found');
                                                console.log('Current devices:', devices.length);
                                                console.log('Current connections count:', connections.length);
                                                info('Debug info', 'Проверьте консоль браузера (F12)');
                                            }
                                        },
                                        className: "rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white",
                                        title: "Отладка localStorage",
                                        children: "🐛"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 439,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/network-topology.tsx",
                                    lineNumber: 475,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 474,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.push('/topology-fullscreen'),
                                className: "flex items-center space-x-2 rounded-lg border border-blue-500/30 bg-blue-500/20 px-4 py-2 text-blue-400 transition-colors hover:bg-blue-500/30",
                                title: "Открыть в полноэкранном режиме",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 482,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Полный экран"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 483,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 477,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/network-topology.tsx",
                        lineNumber: 419,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/network-topology.tsx",
                lineNumber: 406,
                columnNumber: 9
            }, this),
            isEditMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-blue-400",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Режим редактирования:"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/network-topology.tsx",
                            lineNumber: 492,
                            columnNumber: 13
                        }, this),
                        " Перетаскивайте устройства для их перемещения. Кликайте по устройствам для создания соединений.",
                        connectionState.isConnecting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-2 text-yellow-400",
                            children: "Кликните на другое устройство для подключения, или на то же для отмены."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/network-topology.tsx",
                            lineNumber: 495,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/network-topology.tsx",
                    lineNumber: 491,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/network-topology.tsx",
                lineNumber: 490,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full rounded-lg border border-slate-700/30 bg-slate-900/50",
                style: {
                    height: isFullscreen ? 'calc(100vh - 120px)' : '700px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    ref: svgRef,
                    width: "100%",
                    height: "100%",
                    className: "overflow-visible",
                    onMouseMove: handleMouseMove,
                    onMouseUp: handleMouseUp,
                    onMouseLeave: handleMouseUp,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                                id: "topology-grid",
                                width: "20",
                                height: "20",
                                patternUnits: "userSpaceOnUse",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M 20 0 L 0 0 0 20",
                                    fill: "none",
                                    stroke: "#475569",
                                    strokeWidth: "0.5",
                                    opacity: "0.3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/network-topology.tsx",
                                    lineNumber: 526,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 520,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/network-topology.tsx",
                            lineNumber: 519,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            width: "100%",
                            height: "100%",
                            fill: "url(#topology-grid)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/network-topology.tsx",
                            lineNumber: 535,
                            columnNumber: 11
                        }, this),
                        connections.map((connection)=>{
                            const sourceDevice = devicesWithPositions.find((d)=>d.id === connection.sourceId);
                            const targetDevice = devicesWithPositions.find((d)=>d.id === connection.targetId);
                            if (!sourceDevice || !targetDevice) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: sourceDevice.position.x,
                                        y1: sourceDevice.position.y,
                                        x2: targetDevice.position.x,
                                        y2: targetDevice.position.y,
                                        stroke: "#6B7280",
                                        strokeWidth: "2",
                                        strokeDasharray: "5,5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 550,
                                        columnNumber: 17
                                    }, this),
                                    isEditMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: (sourceDevice.position.x + targetDevice.position.x) / 2,
                                        cy: (sourceDevice.position.y + targetDevice.position.y) / 2,
                                        r: "8",
                                        fill: "#EF4444",
                                        className: "cursor-pointer hover:fill-red-600",
                                        onClick: ()=>handleDeleteConnection(connection.id),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                                            children: "Кликните для удаления соединения"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/network-topology.tsx",
                                            lineNumber: 572,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 560,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, connection.id, true, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 549,
                                columnNumber: 15
                            }, this);
                        }),
                        connectionState.tempLine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: connectionState.tempLine.x1,
                            y1: connectionState.tempLine.y1,
                            x2: connectionState.tempLine.x2,
                            y2: connectionState.tempLine.y2,
                            stroke: "#3B82F6",
                            strokeWidth: "2",
                            strokeDasharray: "3,3",
                            opacity: "0.7"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/network-topology.tsx",
                            lineNumber: 581,
                            columnNumber: 13
                        }, this),
                        devicesWithPositions.map((device)=>{
                            const Icon = deviceIcons[device.type] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"]; // Fallback to Monitor icon
                            const color = deviceColors[device.type] || '#6B7280'; // Fallback to gray
                            const isConnecting = connectionState.sourceId === device.id;
                            // Определяем, выделено ли устройство (принадлежит выбранной папке)
                            const isHighlighted = !selectedFolderId || selectedFolderId === 'root' || device.folderId === selectedFolderId;
                            const opacity = isHighlighted ? 1 : 0.3;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                transform: `translate(${device.position.x}, ${device.position.y})`,
                                className: "cursor-pointer",
                                style: {
                                    opacity
                                },
                                onMouseDown: (e)=>handleMouseDown(e, device.id),
                                onClick: ()=>handleDeviceClick(device.id),
                                onContextMenu: (e)=>handleContextMenu(e, device),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        r: isConnecting ? '28' : '25',
                                        fill: device.status === 'online' ? color : '#6B7280',
                                        opacity: "0.2",
                                        stroke: isConnecting ? '#3B82F6' : 'transparent',
                                        strokeWidth: "2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 620,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        r: "20",
                                        fill: device.status === 'online' ? color : '#6B7280',
                                        opacity: "0.3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 627,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("foreignObject", {
                                        x: "-12",
                                        y: "-12",
                                        width: "24",
                                        height: "24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "h-6 w-6 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/network-topology.tsx",
                                            lineNumber: 635,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 634,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                        x: "0",
                                        y: "40",
                                        textAnchor: "middle",
                                        className: "fill-white text-xs font-medium",
                                        children: device.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 639,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "15",
                                        cy: "-15",
                                        r: "4",
                                        fill: device.status === 'online' ? '#10B981' : device.status === 'warning' ? '#F59E0B' : '#EF4444'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 649,
                                        columnNumber: 17
                                    }, this),
                                    isEditMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        r: "25",
                                        fill: "transparent",
                                        stroke: "#3B82F6",
                                        strokeWidth: "1",
                                        strokeDasharray: "2,2",
                                        opacity: "0.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 664,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, device.id, true, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 610,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/network-topology.tsx",
                    lineNumber: 509,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/network-topology.tsx",
                lineNumber: 505,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 w-3 rounded-full bg-green-500 opacity-60"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 683,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-400",
                                        children: "Онлайн"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 684,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 682,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 w-3 rounded-full bg-yellow-500 opacity-60"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 687,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-400",
                                        children: "Предупреждение"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 688,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 686,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 w-3 rounded-full bg-red-500 opacity-60"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 691,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-400",
                                        children: "Офлайн"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/network-topology.tsx",
                                        lineNumber: 692,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/network-topology.tsx",
                                lineNumber: 690,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/network-topology.tsx",
                        lineNumber: 681,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-slate-500",
                        children: [
                            devicesWithPositions.length,
                            " устройств • ",
                            connections.length,
                            ' ',
                            "соединений"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/network-topology.tsx",
                        lineNumber: 696,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/network-topology.tsx",
                lineNumber: 680,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeviceContextMenu"], {
                device: contextMenu.device,
                position: contextMenu.position,
                isVisible: contextMenu.isVisible,
                onClose: handleCloseContextMenu,
                onAction: handleContextAction
            }, void 0, false, {
                fileName: "[project]/src/components/ui/network-topology.tsx",
                lineNumber: 703,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastContainer"], {
                toasts: toasts,
                onClose: removeToast
            }, void 0, false, {
                fileName: "[project]/src/components/ui/network-topology.tsx",
                lineNumber: 712,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/network-topology.tsx",
        lineNumber: 398,
        columnNumber: 5
    }, this);
}

})()),
"[project]/app/topology-fullscreen/page.tsx [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>TopologyFullscreenPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$network$2d$topology$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/network-topology.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/lucide-react@0.294.0_react@18.3.1/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@14.2.30_@babel+core@7._a586cea58d140d795b3e7e933c4742d2/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
'use client';
;
;
;
;
function TopologyFullscreenPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-0 right-0 top-0 z-50 border-b border-slate-700/50 bg-slate-800/90 px-6 py-4 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.back(),
                                    className: "rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/topology-fullscreen/page.tsx",
                                        lineNumber: 20,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/topology-fullscreen/page.tsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-xl font-semibold text-white",
                                    children: "Сетевая топология - Полный экран"
                                }, void 0, false, {
                                    fileName: "[project]/app/topology-fullscreen/page.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/topology-fullscreen/page.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.close(),
                            className: "rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$294$2e$0_react$40$18$2e$3$2e$1$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/app/topology-fullscreen/page.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/topology-fullscreen/page.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/topology-fullscreen/page.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/topology-fullscreen/page.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-screen p-4 pt-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$14$2e$2$2e$30_$40$babel$2b$core$40$7$2e$_a586cea58d140d795b3e7e933c4742d2$2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$network$2d$topology$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NetworkTopology"], {
                        isFullscreen: true
                    }, void 0, false, {
                        fileName: "[project]/app/topology-fullscreen/page.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/topology-fullscreen/page.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/topology-fullscreen/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/topology-fullscreen/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}

})()),
"[project]/app/topology-fullscreen/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),

};

//# sourceMappingURL=_78767f._.js.map