// ============ Calculator Object ============
const Calculator = {
    currentInput: '0',
    previousValue: null,
    operation: null,
    shouldResetDisplay: false,
    memory: 0,
    history: [],
    maxHistory: 20,

    init() {
        this.updateDisplay();
        this.loadHistory();
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    },

    updateDisplay() {
        const display = document.getElementById('display');
        
        // Show operation in progress
        if (this.operation && this.shouldResetDisplay) {
            display.value = this.previousValue + ' ' + this.operation + ' ';
        } else if (this.operation && !this.shouldResetDisplay) {
            display.value = this.previousValue + ' ' + this.operation + ' ' + this.currentInput;
        } else {
            display.value = this.currentInput.slice(0, 30);
        }
    },

    append(value) {
        // Prevent multiple decimals
        if (value === '.' && this.currentInput.includes('.')) return;

        // Limit input length
        if (this.currentInput.length > 25) return;

        // Handle first input
        if (this.currentInput === '0' && value !== '.') {
            this.currentInput = value;
        } else if (this.shouldResetDisplay) {
            this.currentInput = value;
            this.shouldResetDisplay = false;
        } else {
            this.currentInput += value;
        }
        this.updateDisplay();
    },

    clear() {
        this.currentInput = '0';
        this.previousValue = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    },

    delete() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    },

    toggleSign() {
        const num = parseFloat(this.currentInput);
        this.currentInput = String(num * -1);
        this.updateDisplay();
    },

    square() {
        const num = parseFloat(this.currentInput);
        this.currentInput = String(num * num);
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    sqrt() {
        const num = parseFloat(this.currentInput);
        if (num < 0) {
            this.currentInput = 'Error';
            this.updateDisplay();
            setTimeout(() => this.clear(), 1500);
            return;
        }
        this.currentInput = String(Math.sqrt(num));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    cube() {
        const num = parseFloat(this.currentInput);
        this.currentInput = String(num * num * num);
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    reciprocal() {
        const num = parseFloat(this.currentInput);
        if (num === 0) {
            this.currentInput = 'Error';
            this.updateDisplay();
            setTimeout(() => this.clear(), 1500);
            return;
        }
        this.currentInput = String(1 / num);
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    absoluteValue() {
        const num = parseFloat(this.currentInput);
        this.currentInput = String(Math.abs(num));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    factorial() {
        const num = parseInt(this.currentInput);
        if (num < 0 || isNaN(num)) {
            this.currentInput = 'Error';
            this.updateDisplay();
            setTimeout(() => this.clear(), 1500);
            return;
        }
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        this.currentInput = String(result);
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    sine() {
        const num = parseFloat(this.currentInput);
        this.currentInput = String(Math.sin(num * Math.PI / 180));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    cosine() {
        const num = parseFloat(this.currentInput);
        this.currentInput = String(Math.cos(num * Math.PI / 180));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    tangent() {
        const num = parseFloat(this.currentInput);
        this.currentInput = String(Math.tan(num * Math.PI / 180));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    logarithm() {
        const num = parseFloat(this.currentInput);
        if (num <= 0) {
            this.currentInput = 'Error';
            this.updateDisplay();
            setTimeout(() => this.clear(), 1500);
            return;
        }
        this.currentInput = String(Math.log10(num));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    naturalLog() {
        const num = parseFloat(this.currentInput);
        if (num <= 0) {
            this.currentInput = 'Error';
            this.updateDisplay();
            setTimeout(() => this.clear(), 1500);
            return;
        }
        this.currentInput = String(Math.log(num));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    exponential() {
        const num = parseFloat(this.currentInput);
        this.currentInput = String(Math.exp(num));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    power(exp) {
        const num = parseFloat(this.currentInput);
        this.currentInput = String(Math.pow(num, exp));
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    memoryAdd() {
        this.memory += parseFloat(this.currentInput) || 0;
        this.showMemoryNotification('M+ ' + this.memory.toFixed(2));
        this.shouldResetDisplay = true;
    },

    memorySubtract() {
        this.memory -= parseFloat(this.currentInput) || 0;
        this.showMemoryNotification('M- ' + this.memory.toFixed(2));
        this.shouldResetDisplay = true;
    },

    memoryRecall() {
        this.currentInput = String(this.memory);
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    memoryClear() {
        this.memory = 0;
        this.showMemoryNotification('Memory Cleared');
    },

    showMemoryNotification(text) {
        const display = document.getElementById('display');
        const oldValue = display.value;
        display.value = text;
        setTimeout(() => {
            display.value = oldValue;
        }, 1000);
    },

    setOperation(op) {
        // If no number entered yet, return
        if (this.currentInput === '0' && this.previousValue === null) {
            return;
        }

        // If we have a previous value and operation, calculate first
        if (this.previousValue !== null && this.operation !== null) {
            this.calculate();
        }

        // Store current value as previous and set operation
        this.previousValue = parseFloat(this.currentInput);
        this.operation = op;
        this.shouldResetDisplay = true;
    },

    calculate() {
        if (this.operation === null || this.previousValue === null) {
            return;
        }

        const current = parseFloat(this.currentInput);
        let result;

        switch (this.operation) {
            case '+':
                result = this.previousValue + current;
                break;
            case '-':
                result = this.previousValue - current;
                break;
            case '*':
                result = this.previousValue * current;
                break;
            case '/':
                result = current === 0 ? 'Error' : this.previousValue / current;
                break;
            case '%':
                result = this.previousValue % current;
                break;
            case '^':
                result = Math.pow(this.previousValue, current);
                break;
            default:
                return;
        }

        // Round to avoid floating point errors
        result = Math.round(result * 1e10) / 1e10;

        this.addToHistory(this.previousValue + ' ' + this.operation + ' ' + current + ' = ' + result);
        this.currentInput = String(result);
        this.operation = null;
        this.previousValue = null;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    },

    copyToClipboard() {
        const value = this.currentInput;
        navigator.clipboard.writeText(value).then(() => {
            const display = document.getElementById('display');
            const oldValue = display.value;
            display.value = 'Copied!';
            setTimeout(() => {
                display.value = oldValue;
            }, 1000);
        });
    },

    addToHistory(calculation) {
        this.history.unshift(calculation);
        if (this.history.length > this.maxHistory) {
            this.history.pop();
        }
        this.saveHistory();
    },

    saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    },

    loadHistory() {
        const saved = localStorage.getItem('calculatorHistory');
        if (saved) {
            this.history = JSON.parse(saved);
        }
    },

    clearHistory() {
        this.history = [];
        localStorage.removeItem('calculatorHistory');
    },

    getHistory() {
        return this.history;
    },

    handleKeyboard(e) {
        if (/^[0-9.]$/.test(e.key)) {
            this.append(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            this.calculate();
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            this.delete();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            this.clear();
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            e.preventDefault();
            this.setOperation(e.key);
        } else if (e.key === '^') {
            e.preventDefault();
            this.setOperation('^');
        } else if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            this.copyToClipboard();
        }
    }
};

// ============ Vault Object ============
const Vault = {
    files: [],
    selectedFile: null,
    searchQuery: '',

    init() {
        const fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Drag and drop support
        const gallery = document.getElementById('gallery');
        gallery.addEventListener('dragover', (e) => this.handleDragOver(e));
        gallery.addEventListener('drop', (e) => this.handleDrop(e));
        gallery.parentElement.addEventListener('dragover', (e) => this.handleDragOver(e));
        gallery.parentElement.addEventListener('drop', (e) => this.handleDrop(e));

        this.loadFilesFromStorage();
    },

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            this.addFile(file);
        });
        e.target.value = ''; // Reset input
    },

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
    },

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.style.backgroundColor = 'transparent';
        
        const files = Array.from(e.dataTransfer.files);
        files.forEach(file => {
            this.addFile(file);
        });
    },

    addFile(file) {
        const fileData = {
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            size: this.formatFileSize(file.size),
            url: URL.createObjectURL(file),
            file: file,
            uploadDate: new Date().toLocaleDateString(),
            category: this.getCategory(file.type)
        };

        this.files.push(fileData);
        this.saveFilesToStorage();
        this.renderGallery();
    },

    removeFile(id) {
        const file = this.files.find(f => f.id === id);
        if (file) {
            URL.revokeObjectURL(file.url);
        }
        this.files = this.files.filter(f => f.id !== id);
        this.saveFilesToStorage();
        this.renderGallery();
    },

    clearGallery() {
        if (this.files.length === 0) {
            alert('Gallery is already empty!');
            return;
        }

        if (confirm('Are you sure you want to delete all files?')) {
            this.files.forEach(f => URL.revokeObjectURL(f.url));
            this.files = [];
            this.saveFilesToStorage();
            this.renderGallery();
        }
    },

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    },

    getCategory(type) {
        if (type.startsWith('image/')) return 'Images';
        if (type.includes('pdf')) return 'Documents';
        if (type.includes('word') || type.includes('document')) return 'Documents';
        if (type.includes('text')) return 'Text';
        return 'Other';
    },

    getFileIcon(type) {
        if (type.startsWith('image/')) return '🖼️';
        if (type.includes('pdf')) return '📄';
        if (type.includes('word') || type.includes('document')) return '📋';
        if (type.includes('text')) return '📝';
        if (type.includes('video')) return '🎥';
        if (type.includes('audio')) return '🎵';
        return '📦';
    },

    downloadFile(id) {
        const file = this.files.find(f => f.id === id);
        if (!file) return;

        const a = document.createElement('a');
        a.href = file.url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    copyFileName(id) {
        const file = this.files.find(f => f.id === id);
        if (!file) return;

        navigator.clipboard.writeText(file.name).then(() => {
            alert('Filename copied: ' + file.name);
        });
    },

    saveFilesToStorage() {
        const data = this.files.map(f => ({
            id: f.id,
            name: f.name,
            type: f.type,
            size: f.size,
            uploadDate: f.uploadDate,
            category: f.category
        }));
        localStorage.setItem('vaultFiles', JSON.stringify(data));
    },

    loadFilesFromStorage() {
        const saved = localStorage.getItem('vaultFiles');
        if (saved) {
            const data = JSON.parse(saved);
            console.log('Loaded ' + data.length + ' files from storage');
            // Note: URLs won't work after refresh, but we keep metadata
        }
    },

    searchFiles(query) {
        this.searchQuery = query.toLowerCase();
        this.renderGallery();
    },

    filterByCategory(category) {
        const filtered = category === 'All' ? 
            this.files : 
            this.files.filter(f => f.category === category);
        return filtered;
    },

    renderGallery() {
        const gallery = document.getElementById('gallery');
        const emptyMsg = document.getElementById('emptyMessage');

        let filesToShow = this.files;

        // Apply search filter
        if (this.searchQuery) {
            filesToShow = filesToShow.filter(f => 
                f.name.toLowerCase().includes(this.searchQuery)
            );
        }

        if (filesToShow.length === 0) {
            gallery.innerHTML = '';
            emptyMsg.style.display = this.files.length === 0 ? 'block' : 'block';
            emptyMsg.textContent = this.searchQuery ? 'No files match your search.' : 'No files uploaded yet. Upload files to get started!';
            return;
        }

        emptyMsg.style.display = 'none';

        gallery.innerHTML = filesToShow.map(file => {
            const isImage = file.type.startsWith('image/');
            return `
                <div class="gallery-item" title="${file.name}">
                    ${isImage ? 
                        `<img src="${file.url}" alt="${file.name}">` :
                        `<div class="gallery-item-preview">${this.getFileIcon(file.type)}</div>`
                    }
                    <div class="gallery-item-info">
                        <div class="gallery-item-name">${file.name}</div>
                        <div class="gallery-item-meta">${file.size} | ${file.uploadDate}</div>
                    </div>
                    <div class="gallery-item-actions">
                        <button class="gallery-item-action-btn download" onclick="Vault.downloadFile(${file.id})" title="Download">⬇️</button>
                        <button class="gallery-item-action-btn copy" onclick="Vault.copyFileName(${file.id})" title="Copy name">📋</button>
                        <button class="gallery-item-action-btn delete" onclick="Vault.removeFile(${file.id})" title="Delete">✕</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    getStatistics() {
        return {
            totalFiles: this.files.length,
            totalSize: this.files.reduce((sum, f) => {
                const size = parseInt(f.size);
                return sum + (isNaN(size) ? 0 : size);
            }, 0),
            categories: [...new Set(this.files.map(f => f.category))]
        };
    }
};

// ============ Initialize App ============
document.addEventListener('DOMContentLoaded', () => {
    Calculator.init();
    Vault.init();
});
