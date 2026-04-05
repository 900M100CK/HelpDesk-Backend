const HelpDeskDTO = require('../dtos/helpdesk.dtos');
const helpdeskService = require('../service/helpdesk.service');
const asyncHandler = require('../util/asyncHandler');


const createHelpdesk = asyncHandler(async (req, res) => {
    const dto = new HelpDeskDTO(req.body);
    const result = await helpdeskService.create(dto);
    
    res.status(201).json({ success: true, data: result });
});


const getAllHelpdesk = asyncHandler(async (req, res) => {
    const data = await helpdeskService.getAll();
    res.status(200).json({ success: true, data });
});


const getHelpdeskById = asyncHandler(async (req, res) => {
    const item = await helpdeskService.getById(req.params.id);
    
    if (!item) {
        return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.status(200).json({ success: true, data: item });
});


const updateHelpdesk = asyncHandler(async (req, res) => {
    const dto = new HelpDeskDTO(req.body);
    const updated = await helpdeskService.update(req.params.id, dto);
    
    if (!updated) {
        return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.status(200).json({ success: true, data: updated });
});


const deleteHelpdesk = asyncHandler(async (req, res) => {
    const deleted = await helpdeskService.remove(req.params.id);
    
    if (!deleted) {
        return res.status(404).json({ success: false, message: 'Not found' });
    }
    res.status(200).json({ success: true, message: 'Deleted successfully' });
});

const deleteAllHelpdesk = asyncHandler(async (req, res) => {
    await helpdeskService.removeAll();
    res.status(200).json({ success: true, message: 'All records deleted' });
});
const createManyHelpdesk = asyncHandler(async (req, res) => {
    const data = req.body; // Mong đợi một Array các object

    if (!Array.isArray(data)) {
        return res.status(400).json({ 
            success: false, 
            message: "Dữ liệu gửi lên phải là một mảng (Array)" 
        });
    }

    // 1. Map toàn bộ mảng qua DTO để chuẩn hóa dữ liệu
    // 2. Validate từng phần tử (Tùy chọn: có thể dùng try-catch ở đây nếu muốn báo lỗi chi tiết)
    const dtoList = data.map(item => {
        HelpDeskDTO.validate(item); // Sẽ throw error nếu có 1 phần tử lỗi
        return new HelpDeskDTO(item);
    });

    // 3. Gọi service để lưu hàng loạt
    const result = await helpdeskService.createMany(dtoList);

    res.status(201).json({
        success: true,
        count: result.length,
        data: result
    });
});
module.exports = {
    createHelpdesk,
    getAllHelpdesk,
    getHelpdeskById,
    updateHelpdesk,
    deleteHelpdesk,
    deleteAllHelpdesk,
    createManyHelpdesk
};