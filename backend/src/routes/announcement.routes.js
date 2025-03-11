const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement.controller');

// Duyuru rotaları
router.get('/', announcementController.getAllAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);
router.post('/', announcementController.createAnnouncement);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router; 