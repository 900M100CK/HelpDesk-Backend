class HelpDeskDTO {
    constructor ({key, value, category, priority}) {
        this.key = key;
        this.value = value;
        this.category = category;
        this.priority = priority;
    }
    static validate (data) {
        if (!data.key || !data.value) {
            throw new Error('Key and Value are required fields');
        }
        return true;
    }
    
}

module.exports = HelpDeskDTO;