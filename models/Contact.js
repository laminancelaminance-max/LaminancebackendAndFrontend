// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { 
//   FaUser, 
//   FaEnvelope, 
//   FaPhone, 
//   FaMapMarkerAlt, 
//   FaCity, 
//   FaGlobe,
//   FaFileAlt 
// } from 'react-icons/fa';

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       country: '',
//       zipCode: ''
//     },
//     subject: '',
//     message: '',
//     sendCopy: true
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name.includes('.')) {
//       // Handle nested address fields
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact/submit`, formData);
      
//       if (response.data.success) {
//         toast.success('Message sent successfully!');
//         setIsSubmitted(true);
        
//         // Reset form after 3 seconds
//         setTimeout(() => {
//           setFormData({
//             name: '',
//             email: '',
//             phone: '',
//             address: {
//               street: '',
//               city: '',
//               state: '',
//               country: '',
//               zipCode: ''
//             },
//             subject: '',
//             message: '',
//             sendCopy: true
//           });
//           setIsSubmitted(false);
//         }, 3000);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to send message');
//       console.error('Error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//           Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Contact Form */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
//           {isSubmitted ? (
//             <div className="text-center py-8">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaEnvelope className="text-green-600 text-2xl" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
//               <p className="text-gray-600 mb-4">
//                 Thank you for contacting us. We've sent a confirmation to your email.
//               </p>
//               <p className="text-sm text-gray-500">
//                 Our team will get back to you within 24 hours.
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Name & Email */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <div className="relative">
//                     <FaUser className="absolute left-3 top-3.5 text-gray-400" />
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <div className="relative">
//                     <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="+1 (555) 123-4567"
//                   />
//                 </div>
//               </div>

//               {/* Address Fields */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-900">Address (Optional)</h3>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Street Address
//                   </label>
//                   <div className="relative">
//                     <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
//                     <input
//                       type="text"
//                       name="address.street"
//                       value={formData.address.street}
//                       onChange={handleChange}
//                       className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="123 Main Street"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       City
//                     </label>
//                     <div className="relative">
//                       <FaCity className="absolute left-3 top-3.5 text-gray-400" />
//                       <input
//                         type="text"
//                         name="address.city"
//                         value={formData.address.city}
//                         onChange={handleChange}
//                         className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="New York"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       State
//                     </label>
//                     <input
//                       type="text"
//                       name="address.state"
//                       value={formData.address.state}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="NY"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Country
//                     </label>
//                     <div className="relative">
//                       <FaGlobe className="absolute left-3 top-3.5 text-gray-400" />
//                       <input
//                         type="text"
//                         name="address.country"
//                         value={formData.address.country}
//                         onChange={handleChange}
//                         className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="USA"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       ZIP Code
//                     </label>
//                     <input
//                       type="text"
//                       name="address.zipCode"
//                       value={formData.address.zipCode}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="10001"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Subject */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subject *
//                 </label>
//                 <div className="relative">
//                   <FaFileAlt className="absolute left-3 top-3.5 text-gray-400" />
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="How can we help you?"
//                   />
//                 </div>
//               </div>

//               {/* Message */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Message *
//                 </label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows="6"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                   placeholder="Please provide details about your inquiry..."
//                 />
//               </div>

//               {/* Send Copy Checkbox */}
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="sendCopy"
//                   name="sendCopy"
//                   checked={formData.sendCopy}
//                   onChange={handleChange}
//                   className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                 />
//                 <label htmlFor="sendCopy" className="ml-2 text-gray-700">
//                   Send me a copy of this message
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full py-3 px-6 rounded-lg font-medium text-white transition ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//               >
//                 {isSubmitting ? 'Sending...' : 'Send Message'}
//               </button>
//             </form>
//           )}
//         </div>

//         {/* Contact Information */}
//         <div className="space-y-8">
//           {/* Contact Info Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
//             <div className="space-y-6">
//               <div className="flex items-start">
//                 <div className="bg-blue-100 p-3 rounded-lg mr-4">
//                   <FaEnvelope className="text-blue-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">Email Address</h3>
//                   <p className="text-gray-600">contact@example.com</p>
//                   <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="bg-green-100 p-3 rounded-lg mr-4">
//                   <FaPhone className="text-green-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">Phone Number</h3>
//                   <p className="text-gray-600">+1 (555) 123-4567</p>
//                   <p className="text-sm text-gray-500 mt-1">Mon-Fri from 9am to 6pm</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="bg-purple-100 p-3 rounded-lg mr-4">
//                   <FaMapMarkerAlt className="text-purple-600 text-xl" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">Office Location</h3>
//                   <p className="text-gray-600">123 Business Street, Suite 100</p>
//                   <p className="text-gray-600">New York, NY 10001</p>
//                   <p className="text-sm text-gray-500 mt-1">United States</p>
//                 </div>
//               </div>
//             </div>

//             {/* Map or Additional Info */}
//             <div className="mt-8 pt-8 border-t border-gray-200">
//               <h3 className="font-semibold text-gray-900 mb-4">Visit Our Office</h3>
//               <div className="bg-gray-100 rounded-lg p-4 text-center">
//                 <p className="text-gray-600">We welcome visitors by appointment</p>
//                 <p className="text-sm text-gray-500 mt-2">Free parking available on premises</p>
//               </div>
//             </div>
//           </div>

//           {/* Business Hours */}
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
            
//             <div className="space-y-4">
//               {[
//                 { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
//                 { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
//                 { day: 'Sunday', time: 'Closed' },
//                 { day: 'Holidays', time: 'Closed' }
//               ].map((schedule, index) => (
//                 <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
//                   <span className="font-medium text-gray-900">{schedule.day}</span>
//                   <span className="text-gray-600">{schedule.time}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;


import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  zipCode: {
    type: String,
    default: ''
  }
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  address: {
    type: addressSchema,
    default: () => ({})
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  sendCopy: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'in-progress', 'resolved'],
    default: 'new'
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;