// Giả sử bạn dùng Mongoose, nếu dùng Sequelize thì thay đổi tương ứng
const HelpDeskModel = require('../model/helpdesk.model');

/**
 * @desc Logic xử lý tạo mới Helpdesk
 */
async function create(dto) {
    // 1. Logic nghiệp vụ (Ví dụ: Kiểm tra hạn mức, gán thêm thông tin hệ thống)
    const newRecord = new HelpDeskModel({
        ...dto,
        status: 'open',
        createdAt: new Date()
    });

    // 2. Lưu vào DB
    return await newRecord.save();
}

/**
 * @desc Lấy danh sách (có thể thêm phân trang/filter ở đây)
 */
async function getAll() {
    return await HelpDeskModel.find().sort({ createdAt: -1 });
}

/**
 * @desc Lấy chi tiết theo ID
 */
async function getById(id) {
    return await HelpDeskModel.findById(id);
}

/**
 * @desc Cập nhật thông tin
 */
async function update(id, dto) {
    // Logic: Chỉ cho phép cập nhật nếu chưa hoàn thành (Ví dụ)
    const item = await HelpDeskModel.findById(id);
    if (!item) return null;

    if (item.status === 'completed') {
        throw new Error('Cannot update a completed helpdesk item');
    }

    return await HelpDeskModel.findByIdAndUpdate(
        id, 
        { $set: dto }, 
        { new: true, runValidators: true }
    );
}

/**
 * @desc Xóa bản ghi
 */
async function remove(id) {
    const result = await HelpDeskModel.findByIdAndDelete(id);
    return !!result; // Trả về true nếu xóa thành công, false nếu không tìm thấy
}
// Xóa sạch toàn bộ dữ liệu
async function removeAll() {
    return await HelpDeskModel.deleteMany({});
}

// Tạo nhiều bản ghi cùng lúc
async function createMany(dataArray) {
    return await HelpDeskModel.insertMany(dataArray);
}
module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    removeAll,
    createMany
};