    const validate = (DTO) => (req, res, next) => {
    try {
        DTO.validate(req.body); 
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = validate;