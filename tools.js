// tools.js
const STORAGE_KEY = 'pseudo_oj_records';

const MIN_ACCURACY = 0;
const MAX_ACCURACY = 100;

function loadAllRecords() {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : {};
    return normalizeRecords(parsed);
}

function saveAllRecords(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeRecords(records)));
}

function normalizeAccuracy(value) {
    const numberValue = Number(value);
    if (!Number.isFinite(numberValue)) {
        return MIN_ACCURACY;
    }
    return Math.max(MIN_ACCURACY, Math.min(MAX_ACCURACY, Math.floor(numberValue)));
}

function normalizeRecords(records) {
    if (!records || typeof records !== 'object' || Array.isArray(records)) {
        return {};
    }

    const normalized = {};
    Object.keys(records).forEach((problemId) => {
        const history = records[problemId];
        normalized[problemId] = Array.isArray(history) ? history.map(normalizeAccuracy) : [];
    });
    return normalized;
}

function interpolateColor(from, to, factor) {
    const value = Math.max(0, Math.min(1, factor));
    const r = Math.round(from[0] + (to[0] - from[0]) * value);
    const g = Math.round(from[1] + (to[1] - from[1]) * value);
    const b = Math.round(from[2] + (to[2] - from[2]) * value);
    return `rgb(${r}, ${g}, ${b})`;
}

function getAccuracyColor(accuracy) {
    const score = normalizeAccuracy(accuracy);
    const red = [241, 76, 76];
    const orange = [210, 153, 34];
    const green = [45, 164, 78];

    if (score <= 60) {
        return interpolateColor(red, orange, score / 60);
    }

    return interpolateColor(orange, green, (score - 60) / 40);
}

window.OJTools = {
    normalizeAccuracy: normalizeAccuracy,
    getAccuracyColor: getAccuracyColor,

    // 记录一次提交的正确率
    addRecord: function(problemId, accuracy) {
        const records = loadAllRecords();
        if (!records[problemId]) {
            records[problemId] = [];
        }
        records[problemId].push(normalizeAccuracy(accuracy));
        saveAllRecords(records);
        return records[problemId].length - 1;
    },

    setLastRecord: function(problemId, accuracy) {
        const records = loadAllRecords();
        const history = records[problemId];
        if (!history || history.length === 0) {
            return false;
        }
        history[history.length - 1] = normalizeAccuracy(accuracy);
        saveAllRecords(records);
        return true;
    },

    updateRecord: function(problemId, index, accuracy) {
        const records = loadAllRecords();
        const history = records[problemId];
        if (!history || index < 0 || index >= history.length) {
            return false;
        }
        history[index] = normalizeAccuracy(accuracy);
        saveAllRecords(records);
        return true;
    },

    deleteRecord: function(problemId, index) {
        const records = loadAllRecords();
        const history = records[problemId];
        if (!history || index < 0 || index >= history.length) {
            return false;
        }

        history.splice(index, 1);
        if (history.length === 0) {
            delete records[problemId];
        }
        saveAllRecords(records);
        return true;
    },

    getAllRecords: function() {
        return loadAllRecords();
    },

    // 获取题目的统计信息 O(1) ~ O(N) 
    getStats: function(problemId) {
        const records = loadAllRecords();
        const history = records[problemId] || [];
        if (history.length === 0) {
            return { count: 0, last: null, avg: null };
        }
        const last = normalizeAccuracy(history[history.length - 1]);
        const sum = history.reduce((a, b) => a + b, 0);
        const avg = Math.floor(sum / history.length);
        return { count: history.length, last: last, avg: avg };
    },

    // 导出数据为 JSON 文件
    exportData: function() {
        const data = localStorage.getItem(STORAGE_KEY) || '{}';
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `oj_records_${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // 从 JSON 文件导入数据并覆盖 localStorage
    importData: function(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const json = JSON.parse(e.target.result);
                saveAllRecords(normalizeRecords(json));
                if (callback) callback(null);
            } catch (err) {
                if (callback) callback(err);
            }
        };
        reader.readAsText(file);
    },

    clearAllRecords: function() {
        localStorage.removeItem(STORAGE_KEY);
    }
};
