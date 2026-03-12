// tools.js
const STORAGE_KEY = 'pseudo_oj_records';

function loadAllRecords() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

function saveAllRecords(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

window.OJTools = {
    // 记录一次提交的正确率
    addRecord: function(problemId, accuracy) {
        const records = loadAllRecords();
        if (!records[problemId]) {
            records[problemId] = [];
        }
        records[problemId].push(parseFloat(accuracy));
        saveAllRecords(records);
    },

    // 获取题目的统计信息 O(1) ~ O(N) 
    getStats: function(problemId) {
        const records = loadAllRecords();
        const history = records[problemId] || [];
        if (history.length === 0) {
            return { count: 0, last: null, avg: null };
        }
        const last = history[history.length - 1];
        const sum = history.reduce((a, b) => a + b, 0);
        const avg = (sum / history.length).toFixed(2);
        return { count: history.length, last: last.toFixed(2), avg: avg };
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
                saveAllRecords(json);
                if (callback) callback(null);
            } catch (err) {
                if (callback) callback(err);
            }
        };
        reader.readAsText(file);
    }
};
