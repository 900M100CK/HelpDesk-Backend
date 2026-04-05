const express = require('express');
const router = express.Router();
const helpdeskController = require('../controller/helpdesk.controller');
const validate = require('../middleware/helpdesk.validate.middleware');
const HelpDeskDTO = require('../dtos/helpdesk.dtos');

/**
 * Các route cho tài nguyên Helpdesk
 * Base URL: /api/helpdesk
 */

// Lấy danh sách tất cả các mục                 
router.get('/', helpdeskController.getAllHelpdesk);

// Lấy chi tiết một mục theo ID
router.get('/:id', helpdeskController.getHelpdeskById);

// Tạo mới mục (Có qua lớp kiểm tra DTO)
router.post(
    '/', 
    validate(HelpDeskDTO), 
    helpdeskController.createHelpdesk
);

// Cập nhật mục (Có qua lớp kiểm tra DTO)
router.put(
    '/:id', 
    validate(HelpDeskDTO), 
    helpdeskController.updateHelpdesk
);

// Xóa một mục
router.delete('/:id', helpdeskController.deleteHelpdesk);

module.exports = router;