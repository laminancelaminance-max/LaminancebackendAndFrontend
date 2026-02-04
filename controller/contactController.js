// import Contact from '../models/Contact.js';
// import sendEmail from '../utils/emailService.js';

// // Submit contact form
// export const submitContact = async (req, res) => {
//   try {
//     const { name, email, phone, address, subject, message, sendCopy = true } = req.body;

//     // Create new contact
//     const newContact = new Contact({
//       name,
//       email,
//       phone,
//       address,
//       subject,
//       message,
//       sendCopy,
//       status: 'new'
//     });

//     // Save to database
//     const savedContact = await newContact.save();
    
//     // Send emails
//     const adminEmailContent = `
//       <h2>New Contact Form Submission</h2>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
//       ${address ? `<p><strong>Address:</strong> ${JSON.stringify(address)}</p>` : ''}
//       <p><strong>Subject:</strong> ${subject}</p>
//       <p><strong>Message:</strong> ${message}</p>
//       <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
//     `;

//     const userEmailContent = `
//       <h2>Thank you for contacting us!</h2>
//       <p>Dear ${name},</p>
//       <p>We have received your message and will get back to you soon.</p>
//       <h3>Your Message Details:</h3>
//       <p><strong>Subject:</strong> ${subject}</p>
//       <p><strong>Message:</strong> ${message}</p>
//       <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
//       <br>
//       <p>Best regards,<br>Your Company Team</p>
//     `;

//     // Send to admin
//     await sendEmail({
//       sendTo: process.env.ADMIN_EMAIL,
//       subject: `New Contact: ${subject}`,
//       html: adminEmailContent
//     });

//     // Send to user if requested
//     if (sendCopy) {
//       await sendEmail({
//         sendTo: email,
//         subject: `Confirmation: ${subject}`,
//         html: userEmailContent
//       });
//     }

//     res.status(201).json({
//       success: true,
//       message: 'Contact form submitted successfully',
//       data: savedContact
//     });
    
//   } catch (error) {
//     console.error('Error submitting contact:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error submitting contact form',
//       error: error.message
//     });
//   }
// };

// // Get all contacts (for admin panel)
// export const getAllContacts = async (req, res) => {
//   try {
//     const { 
//       page = 1, 
//       limit = 10, 
//       status, 
//       priority, 
//       category, 
//       search,
//       sortBy = 'createdAt',
//       sortOrder = 'desc'
//     } = req.query;

//     // Build filter
//     const filter = {};
//     if (status) filter.status = status;
//     if (priority) filter.priority = priority;
//     if (category) filter.category = category;
    
//     // Search filter
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { email: { $regex: search, $options: 'i' } },
//         { subject: { $regex: search, $options: 'i' } },
//         { message: { $regex: search, $options: 'i' } }
//       ];
//     }

//     // Sort
//     const sort = {};
//     sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

//     // Pagination
//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const [contacts, total] = await Promise.all([
//       Contact.find(filter)
//         .sort(sort)
//         .skip(skip)
//         .limit(parseInt(limit))
//         .select('-__v'),
//       Contact.countDocuments(filter)
//     ]);

//     res.json({
//       success: true,
//       data: contacts,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         totalPages: Math.ceil(total / parseInt(limit)),
//         hasNext: parseInt(page) < Math.ceil(total / parseInt(limit)),
//         hasPrev: parseInt(page) > 1
//       }
//     });
    
//   } catch (error) {
//     console.error('Error fetching contacts:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching contacts',
//       error: error.message
//     });
//   }
// };

// // Get single contact
// export const getContactById = async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
    
//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found'
//       });
//     }

//     res.json({
//       success: true,
//       data: contact
//     });
    
//   } catch (error) {
//     console.error('Error fetching contact:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching contact',
//       error: error.message
//     });
//   }
// };

// // Update contact status
// export const updateContactStatus = async (req, res) => {
//   try {
//     const { status, priority, category } = req.body;
    
//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       { 
//         status, 
//         priority, 
//         category,
//         updatedAt: Date.now()
//       },
//       { new: true }
//     );

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Contact updated successfully',
//       data: contact
//     });
    
//   } catch (error) {
//     console.error('Error updating contact:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating contact',
//       error: error.message
//     });
//   }
// };

// // Delete contact
// export const deleteContact = async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(req.params.id);
    
//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: 'Contact not found'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Contact deleted successfully'
//     });
    
//   } catch (error) {
//     console.error('Error deleting contact:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting contact',
//       error: error.message
//     });
//   }
// };

// // Get contact statistics
// export const getContactStats = async (req, res) => {
//   try {
//     const stats = await Contact.aggregate([
//       {
//         $facet: {
//           statusCounts: [
//             { $group: { _id: '$status', count: { $sum: 1 } } }
//           ],
//           priorityCounts: [
//             { $group: { _id: '$priority', count: { $sum: 1 } } }
//           ],
//           categoryCounts: [
//             { $group: { _id: '$category', count: { $sum: 1 } } }
//           ],
//           dailySubmissions: [
//             {
//               $group: {
//                 _id: {
//                   $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
//                 },
//                 count: { $sum: 1 }
//               }
//             },
//             { $sort: { _id: -1 } },
//             { $limit: 7 }
//           ],
//           totalContacts: [
//             { $count: 'count' }
//           ]
//         }
//       }
//     ]);

//     const formattedStats = {
//       total: stats[0].totalContacts[0]?.count || 0,
//       byStatus: stats[0].statusCounts.reduce((acc, curr) => {
//         acc[curr._id] = curr.count;
//         return acc;
//       }, {}),
//       byPriority: stats[0].priorityCounts.reduce((acc, curr) => {
//         acc[curr._id] = curr.count;
//         return acc;
//       }, {}),
//       byCategory: stats[0].categoryCounts.reduce((acc, curr) => {
//         acc[curr._id] = curr.count;
//         return acc;
//       }, {}),
//       recentSubmissions: stats[0].dailySubmissions
//     };

//     res.json({
//       success: true,
//       data: formattedStats
//     });
    
//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching contact statistics',
//       error: error.message
//     });
//   }
// };



import Contact from '../models/Contact.js';
import { sendEmail } from '../Utils/emailService.js'; // Import sendEmail from '../Utils/emailService.js';
import { sendAppointmentEmail, testAppointmentEmail } from '../Utils/emailService.js';
import { 
  getAdminContactEmailTemplate, 
  getUserContactEmailTemplate 
} from '../Utils/contactEmailTemplates.js';

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, address, subject, message, sendCopy = true } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      phone,
      address,
      subject,
      message,
      sendCopy,
      status: 'new'
    });

    // Save to database
    const savedContact = await newContact.save();
    
    // Prepare contact data for emails
    const contactData = {
      name,
      email,
      phone,
      address,
      subject,
      message,
      timestamp: new Date().toISOString()
    };

    // Get email templates
    const adminEmailContent = getAdminContactEmailTemplate(contactData);
    const userEmailContent = getUserContactEmailTemplate(contactData);

    // Send emails
    const emailPromises = [];

    // Send to admin if configured
    if (process.env.ADMIN_EMAIL) {
      emailPromises.push(
        sendEmail({
          sendTo: process.env.ADMIN_EMAIL,
          subject: `📋 New Contact: ${subject} - Laminance Cabinetry`,
          html: adminEmailContent
        }).catch(error => {
          console.error('Failed to send admin email:', error);
          // Don't fail the whole request if email fails
          return null;
        })
      );
    }

    // Send to user if requested
    if (sendCopy) {
      emailPromises.push(
        sendEmail({
          sendTo: email,
          subject: `✅ Thank You for Contacting Laminance Cabinetry!`,
          html: userEmailContent
        }).catch(error => {
          console.error('Failed to send user email:', error);
          // Don't fail the whole request if email fails
          return null;
        })
      );
    }

    // Wait for all email sends to complete
    await Promise.all(emailPromises);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: savedContact,
      emailSent: true
    });
    
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
};

// Get all contacts (for admin panel)
export const getAllContacts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      priority, 
      category, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    
    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v'),
      Contact.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
        hasNext: parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrev: parseInt(page) > 1
      }
    });
    
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// Get single contact
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
    
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
};

// Update contact status
export const updateContactStatus = async (req, res) => {
  try {
    const { status, priority, category, notes } = req.body;
    
    const updateData = { 
      updatedAt: Date.now()
    };
    
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (category) updateData.category = category;
    if (notes !== undefined) updateData.notes = notes;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
    
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
};

// Get contact statistics
export const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $facet: {
          statusCounts: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          priorityCounts: [
            { $group: { _id: '$priority', count: { $sum: 1 } } }
          ],
          categoryCounts: [
            { $group: { _id: '$category', count: { $sum: 1 } } }
          ],
          dailySubmissions: [
            {
              $group: {
                _id: {
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: -1 } },
            { $limit: 7 }
          ],
          monthlySubmissions: [
            {
              $group: {
                _id: {
                  $dateToString: { format: '%Y-%m', date: '$createdAt' }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: -1 } },
            { $limit: 6 }
          ],
          totalContacts: [
            { $count: 'count' }
          ]
        }
      }
    ]);

    const formattedStats = {
      total: stats[0].totalContacts[0]?.count || 0,
      byStatus: stats[0].statusCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      byPriority: stats[0].priorityCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      byCategory: stats[0].categoryCounts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      recentSubmissions: stats[0].dailySubmissions,
      monthlyTrends: stats[0].monthlySubmissions
    };

    res.json({
      success: true,
      data: formattedStats
    });
    
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics',
      error: error.message
    });
  }
};

// Send appointment email
export const sendAppointment = async (req, res) => {
  try {
    const appointment = req.body;
    
    // Validate required fields
    if (!appointment.userName || !appointment.email || !appointment.title || 
        !appointment.date || !appointment.time) {
      return res.status(400).json({
        success: false,
        message: 'Missing required appointment fields'
      });
    }

    const result = await sendAppointmentEmail(appointment);
    
    res.json({
      success: true,
      message: 'Appointment email sent successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Error sending appointment email:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending appointment email',
      error: error.message
    });
  }
};

// Test email endpoint
export const testEmail = async (req, res) => {
  try {
    const result = await testAppointmentEmail();
    
    res.json({
      success: true,
      message: 'Test email sent',
      data: result
    });
    
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending test email',
      error: error.message
    });
  }
};

// Resend confirmation email to user
export const resendConfirmationEmail = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    const contactData = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      subject: contact.subject,
      message: contact.message,
      timestamp: contact.createdAt.toISOString()
    };

    const userEmailContent = getUserContactEmailTemplate(contactData);

    await sendEmail({
      sendTo: contact.email,
      subject: `✅ Confirmation: ${contact.subject} - Laminance Cabinetry`,
      html: userEmailContent
    });

    res.json({
      success: true,
      message: 'Confirmation email resent successfully'
    });
    
  } catch (error) {
    console.error('Error resending confirmation email:', error);
    res.status(500).json({
      success: false,
      message: 'Error resending confirmation email',
      error: error.message
    });
  }
};