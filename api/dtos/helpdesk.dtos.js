class HelpDeskDTO {
    constructor ({key, value, category, priority}) {
        this.key = key;
        this.value = value;
        this.category = category || 'general';
        this.priority = priority || 'medium';
    }
    static validate (data) {
        
        const error = [];
        if (!data.key || typeof data.key !== 'string') {
            errors.push('Key is required and must be a string');
        }
        
        if (!data.value || typeof data.value !== 'string') {
            errors.push('Value is required and must be a string');
        }

        if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
            errors.push('Invalid priority level');
        }

        if (errors.length > 0) {
            // Throwing an array or a joined string helps the frontend know exactly what's wrong
            throw new Error(errors.join(' | '));
        }
        return true;
    }
    toJSON() {
        return {
            key: this.key,
            value: this.value,
            category: this.category,
            priority: this.priority
        };
    }
    
}

module.exports = HelpDeskDTO;