const STORAGE_KEY = 'pseudo_oj_records';

window.OJTools = {
    // 获取所有记录
    getRecords: function() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    },

    // 获取单题记录
    getRecord: function(problemId) {
        return this.getRecords()[problemId] || {
            submissions: 0,
            accuracies: [],
            lastAccuracy: null,
            avgAccuracy: null
        };
    },

    // 保存单次提交结果
    saveSubmission: function(problemId, accuracy) {
        const records = this.getRecords();
        if (!records[problemId]) {
            records[problemId] = { submissions: 0, accuracies: [], lastAccuracy: null, avgAccuracy: null };
        }
        
        const rec = records[problemId];
        const accFloat = parseFloat(accuracy);
        
        rec.submissions += 1;
        rec.accuracies.push(accFloat);
        rec.lastAccuracy = accFloat;
        
        const sum = rec.accuracies.reduce((a, b) => a + b, 0);
        rec.avgAccuracy = (sum / rec.accuracies.length).toFixed(2);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    },

    // 导出数据为 JSON 文件
    exportData: function() {
        const data = localStorage.getItem(STORAGE_KEY) || '{}';
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pseudo_oj_backup_${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // 导入 JSON 数据
    importData: function(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const json = JSON.parse(e.target.result);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
                if(callback) callback(true);
            } catch (err) {
                console.error("Invalid JSON file", err);
                if(callback) callback(false);
            }
        };
        reader.readAsText(file);
    }
};
