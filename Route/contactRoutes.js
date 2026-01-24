  import express from 'express';
  import {
    submitContact,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact,
    getContactStats
  } from '../controller/contactController.js';

  const router = express.Router();

  // Public routes
  router.post('/submit', submitContact);

  // Admin routes (protected - add authentication middleware as needed)
  router.get('/admin/all', getAllContacts);
  router.get('/admin/stats', getContactStats);
  router.get('/admin/:id', getContactById);
  router.put('/admin/:id/status', updateContactStatus);
  router.delete('/admin/:id', deleteContact);

  export default router;