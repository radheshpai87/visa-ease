import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import users from './users.js';
import User from '../models/User.js';
import Applicant from '../models/Applicant.js';
import Officer from '../models/Officer.js';
import VisaType from '../models/VisaType.js';
import ApplicationStatus from '../models/ApplicationStatus.js';
import VisaApplication from '../models/VisaApplication.js';
import Document from '../models/Document.js';
import Review from '../models/Review.js';
import connectDB from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '..', '.env');

dotenv.config({ path: envPath });

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await VisaApplication.deleteMany();
    await Document.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    await Applicant.deleteMany();
    await Officer.deleteMany();
    await VisaType.deleteMany();
    await ApplicationStatus.deleteMany();

    console.log('Existing data cleared...');

    // Hash passwords for all users
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    // Create Users with hashed passwords
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log('Users created with hashed passwords...');

    const adminUser = createdUsers.find((user) => user.role === 'admin');
    const officerUsers = createdUsers.filter((user) => user.role === 'officer');
    const applicantUsers = createdUsers.filter((user) => user.role === 'applicant');

    // Create Applicants with Indian sample data
    const applicants = [
      {
        user_id: applicantUsers[0]._id,
        full_name: 'Raj Kumar Sharma',
        passport_number: 'L1234567',
        nationality: 'Indian',
        address: 'A-123, Lajpat Nagar, New Delhi, Delhi 110024, India'
      },
      {
        user_id: applicantUsers[1]._id,
        full_name: 'Priya Patel',
        passport_number: 'M9876543',
        nationality: 'Indian',
        address: '45/B, Koregaon Park, Pune, Maharashtra 411001, India'
      },
      {
        user_id: applicantUsers[2]._id,
        full_name: 'Arjun Reddy',
        passport_number: 'N5544332',
        nationality: 'Indian',
        address: '78, MG Road, Bangalore, Karnataka 560001, India'
      }
    ];

    const createdApplicants = await Applicant.insertMany(applicants);
    console.log('Applicants created...');

    // Create Officers
    const officers = [
      {
        user_id: officerUsers[0]._id,
        full_name: 'Sanjay Gupta',
        department: 'Tourist Visa Processing'
      },
      {
        user_id: officerUsers[1]._id,
        full_name: 'Meera Singh',
        department: 'Student Visa Processing'
      }
    ];

    const createdOfficers = await Officer.insertMany(officers);
    console.log('Officers created...');

    // Create Visa Types (Indian Rupees pricing)
    const visaTypes = [
      { 
        name: 'Tourist', 
        fee: 12000, // ₹12,000 (~$145 USD)
        duration_days: 90, 
        required_docs_list: ['Passport Copy', 'Passport Photo', 'Travel Itinerary', 'Hotel Booking', 'Bank Statement'] 
      },
      { 
        name: 'Student', 
        fee: 15000, // ₹15,000 (~$180 USD)
        duration_days: 365, 
        required_docs_list: ['Passport Copy', 'Passport Photo', 'I-20 Form', 'Acceptance Letter', 'Financial Proof', 'Academic Transcripts'] 
      },
      { 
        name: 'Work', 
        fee: 18000, // ₹18,000 (~$215 USD)
        duration_days: 730, 
        required_docs_list: ['Passport Copy', 'Passport Photo', 'Job Offer Letter', 'Company Letter', 'Resume', 'Educational Certificates'] 
      },
      { 
        name: 'Business', 
        fee: 16000, // ₹16,000 (~$190 USD)
        duration_days: 180, 
        required_docs_list: ['Passport Copy', 'Passport Photo', 'Business Invitation Letter', 'Company Registration', 'Bank Statement'] 
      },
      { 
        name: 'Transit', 
        fee: 8000, // ₹8,000 (~$95 USD)
        duration_days: 7, 
        required_docs_list: ['Passport Copy', 'Passport Photo', 'Flight Tickets', 'Final Destination Visa'] 
      }
    ];

    const createdVisaTypes = await VisaType.insertMany(visaTypes);
    console.log('Visa types created...');

    // Create Application Statuses (fixed - added "More Info Required")
    const statuses = [
      { name: 'Pending' },
      { name: 'In Review' },
      { name: 'Approved' },
      { name: 'Rejected' },
      { name: 'More Info Required' }
    ];

    const createdStatuses = await ApplicationStatus.insertMany(statuses);
    console.log('Application statuses created...');

    // Create Sample Visa Applications
    const applications = [
      {
        applicant_id: createdApplicants[0]._id,
        type_id: createdVisaTypes[0]._id, // Tourist
        status_id: createdStatuses[2]._id, // Approved
        application_date: new Date('2024-10-15'),
        appointment_date: new Date('2024-11-20'),
        notes: 'Application approved. Visa valid for 90 days.',
        assigned_officer_id: createdOfficers[0]._id
      },
      {
        applicant_id: createdApplicants[0]._id,
        type_id: createdVisaTypes[3]._id, // Business
        status_id: createdStatuses[1]._id, // In Review
        application_date: new Date('2024-10-25'),
        appointment_date: new Date('2024-11-25'),
        notes: 'Documents under review by officer.',
        assigned_officer_id: createdOfficers[0]._id
      },
      {
        applicant_id: createdApplicants[1]._id,
        type_id: createdVisaTypes[1]._id, // Student
        status_id: createdStatuses[4]._id, // More Info Required
        application_date: new Date('2024-10-20'),
        appointment_date: new Date('2024-11-22'),
        notes: 'Please provide updated financial proof and acceptance letter.',
        assigned_officer_id: createdOfficers[1]._id
      },
      {
        applicant_id: createdApplicants[2]._id,
        type_id: createdVisaTypes[2]._id, // Work
        status_id: createdStatuses[0]._id, // Pending
        application_date: new Date('2024-10-28'),
        appointment_date: new Date('2024-11-28'),
        notes: 'Awaiting initial review.',
        assigned_officer_id: createdOfficers[0]._id
      },
      {
        applicant_id: createdApplicants[2]._id,
        type_id: createdVisaTypes[0]._id, // Tourist
        status_id: createdStatuses[3]._id, // Rejected
        application_date: new Date('2024-09-15'),
        notes: 'Insufficient travel documentation provided.',
        assigned_officer_id: createdOfficers[0]._id
      }
    ];

    const createdApplications = await VisaApplication.insertMany(applications);
    console.log('Visa applications created...');

    // Create Sample Documents
    const documents = [
      {
        application_id: createdApplications[0]._id,
        document_type: 'Passport Copy',
        file_path: 'https://res.cloudinary.com/demo/image/upload/sample_passport.jpg',
        upload_date: new Date('2024-10-15'),
        verified: true,
        verified_by_officer_id: createdOfficers[0]._id
      },
      {
        application_id: createdApplications[0]._id,
        document_type: 'Passport Photo',
        file_path: 'https://res.cloudinary.com/demo/image/upload/sample_photo.jpg',
        upload_date: new Date('2024-10-15'),
        verified: true,
        verified_by_officer_id: createdOfficers[0]._id
      },
      {
        application_id: createdApplications[0]._id,
        document_type: 'Travel Itinerary',
        file_path: 'https://res.cloudinary.com/demo/image/upload/sample_itinerary.pdf',
        upload_date: new Date('2024-10-15'),
        verified: true,
        verified_by_officer_id: createdOfficers[0]._id
      },
      {
        application_id: createdApplications[1]._id,
        document_type: 'Passport Copy',
        file_path: 'https://res.cloudinary.com/demo/image/upload/sample_passport2.jpg',
        upload_date: new Date('2024-10-25'),
        verified: false
      },
      {
        application_id: createdApplications[1]._id,
        document_type: 'Business Invitation Letter',
        file_path: 'https://res.cloudinary.com/demo/image/upload/sample_invitation.pdf',
        upload_date: new Date('2024-10-25'),
        verified: false
      },
      {
        application_id: createdApplications[2]._id,
        document_type: 'I-20 Form',
        file_path: 'https://res.cloudinary.com/demo/image/upload/sample_i20.pdf',
        upload_date: new Date('2024-10-20'),
        verified: false
      },
      {
        application_id: createdApplications[2]._id,
        document_type: 'Passport Copy',
        file_path: 'https://res.cloudinary.com/demo/image/upload/sample_passport3.jpg',
        upload_date: new Date('2024-10-20'),
        verified: false
      },
      {
        application_id: createdApplications[3]._id,
        document_type: 'Passport Copy',
        file_path: 'https://res.cloudinary.com/demo/image/upload/sample_passport4.jpg',
        upload_date: new Date('2024-10-28'),
        verified: false
      },
      {
        application_id: createdApplications[3]._id,
        document_type: 'Job Offer Letter',
        file_path: 'https://res.cloudinary.com/demo/image/upload/sample_job_offer.pdf',
        upload_date: new Date('2024-10-28'),
        verified: false
      }
    ];

    await Document.insertMany(documents);
    console.log('Documents created...');

    // Create Sample Reviews
    const reviews = [
      {
        application_id: createdApplications[0]._id,
        officer_id: createdOfficers[0]._id,
        review_date: new Date('2024-10-18'),
        comments: 'All documents verified. Application meets all requirements. Approved.',
        decision: 'Approved'
      },
      {
        application_id: createdApplications[2]._id,
        officer_id: createdOfficers[1]._id,
        review_date: new Date('2024-10-23'),
        comments: 'Financial documents are outdated. Please provide recent bank statements.',
        decision: 'More Info Required'
      },
      {
        application_id: createdApplications[4]._id,
        officer_id: createdOfficers[0]._id,
        review_date: new Date('2024-09-18'),
        comments: 'Travel itinerary incomplete. Insufficient proof of return intent.',
        decision: 'Rejected'
      }
    ];

    await Review.insertMany(reviews);
    console.log('Reviews created...');

    console.log('\n✅ Data Import Successful!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: ${createdUsers.length} (${applicantUsers.length} applicants, ${officerUsers.length} officers, 1 admin)`);
    console.log(`   - Applicants: ${createdApplicants.length}`);
    console.log(`   - Officers: ${createdOfficers.length}`);
    console.log(`   - Visa Types: ${createdVisaTypes.length}`);
    console.log(`   - Statuses: ${createdStatuses.length}`);
    console.log(`   - Applications: ${createdApplications.length}`);
    console.log(`   - Documents: ${documents.length}`);
    console.log(`   - Reviews: ${reviews.length}`);
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin:     admin@example.com / 123456');
    console.log('   Officer:   officer@example.com / 123456');
    console.log('   Applicant: applicant@example.com / 123456');
    console.log('\n');
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await VisaApplication.deleteMany();
    await Document.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    await Applicant.deleteMany();
    await Officer.deleteMany();
    await VisaType.deleteMany();
    await ApplicationStatus.deleteMany();

    console.log('✅ Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
