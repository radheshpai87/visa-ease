import React from 'react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cancellation & Refund Policy</h1>
          <p className="text-gray-600">Last Updated: November 3, 2025</p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            At VisaEase, we strive to provide exceptional visa consultation and application services. This Cancellation 
            and Refund Policy outlines the terms and conditions under which you may cancel services or request a refund. 
            Please read this policy carefully before engaging our services.
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Important Notice</h3>
          <p className="text-gray-700">
            Due to the nature of our services involving personalized consultation, document preparation, and submission 
            to government authorities, our refund policy is structured based on the stage of service delivery. Please 
            review the specific conditions applicable to your situation.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Service Fees Structure</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Types of Fees</h3>
          <p className="text-gray-700 mb-3">Our fees are divided into the following categories:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>Consultation Fee:</strong> Initial assessment and eligibility evaluation</li>
            <li><strong>Service Fee:</strong> Application preparation, documentation, and submission assistance</li>
            <li><strong>Government Fee:</strong> Visa application fees paid directly to immigration authorities (non-refundable)</li>
            <li><strong>Third-Party Fees:</strong> Translation, notarization, courier services, etc.</li>
            <li><strong>Premium/Expedited Service Fee:</strong> Fast-track processing (when available)</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Cancellation Policy</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Client-Initiated Cancellation</h3>
          <p className="text-gray-700 mb-3">You may cancel our services at any stage, subject to the following conditions:</p>
          
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Stage 1: Before Service Commencement</h4>
              <p className="text-gray-700 mb-2"><strong>Timeframe:</strong> Before we begin work on your application</p>
              <p className="text-gray-700 mb-2"><strong>Refund:</strong> 100% refund of service fees (minus consultation fee if applicable)</p>
              <p className="text-gray-700"><strong>Process:</strong> Submit cancellation request via email or client portal</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Stage 2: During Document Preparation (0-30% Complete)</h4>
              <p className="text-gray-700 mb-2"><strong>Timeframe:</strong> After work has commenced but before substantial completion</p>
              <p className="text-gray-700 mb-2"><strong>Refund:</strong> 75% refund of service fees</p>
              <p className="text-gray-700"><strong>Conditions:</strong> Must request cancellation within 7 days of service initiation</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Stage 3: Advanced Preparation (30-70% Complete)</h4>
              <p className="text-gray-700 mb-2"><strong>Timeframe:</strong> Substantial work completed, documents reviewed</p>
              <p className="text-gray-700 mb-2"><strong>Refund:</strong> 50% refund of service fees</p>
              <p className="text-gray-700"><strong>Note:</strong> Partial deliverables will be provided</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Stage 4: After Application Submission</h4>
              <p className="text-gray-700 mb-2"><strong>Timeframe:</strong> Application submitted to immigration authorities</p>
              <p className="text-gray-700 mb-2"><strong>Refund:</strong> No refund available</p>
              <p className="text-gray-700"><strong>Reason:</strong> Services have been fully rendered; government fees are non-refundable</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Company-Initiated Cancellation</h3>
          <p className="text-gray-700 mb-3">
            VisaEase reserves the right to cancel services in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Client provides false, misleading, or fraudulent information</li>
            <li>Client fails to provide required documents after repeated requests</li>
            <li>Client's case is deemed ineligible or unlikely to succeed</li>
            <li>Non-payment or breach of payment terms</li>
            <li>Violation of our Terms and Conditions</li>
          </ul>
          <p className="text-gray-700">
            <strong>Refund in Company-Initiated Cancellation:</strong> Refund amount will be determined on a case-by-case 
            basis, considering the work completed. If cancellation is due to client misconduct, no refund may be provided.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Refund Eligibility</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Refundable Fees</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>VisaEase service fees (subject to stage-based deductions as outlined above)</li>
            <li>Unused premium/expedited service fees (if service not yet rendered)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Non-Refundable Fees</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>Government visa application fees:</strong> Paid to immigration authorities; non-recoverable</li>
            <li><strong>Third-party service fees:</strong> Translation, courier, notarization services already rendered</li>
            <li><strong>Initial consultation fees:</strong> Time and expertise already provided</li>
            <li><strong>Bank/transaction processing fees:</strong> Payment gateway charges</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Visa Application Outcomes</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Application Rejection or Denial</h3>
          <p className="text-gray-700 mb-3">
            <strong>Important:</strong> VisaEase provides consultation and application assistance services. We do not 
            guarantee visa approval, as decisions are made solely by immigration authorities.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>No refund is provided if your visa application is rejected or denied</strong></li>
            <li>Our services involve professional consultation, document preparation, and submission assistance</li>
            <li>Payment is for our professional services, not for the visa approval itself</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.2 Reapplication Support</h3>
          <p className="text-gray-700 mb-3">
            In case of visa rejection, we offer:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>One free consultation to review rejection reasons</li>
            <li>Guidance on strengthening your reapplication</li>
            <li>Discounted reapplication services (20% discount on service fees)</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund Request Process</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 How to Request a Refund</h3>
          <ol className="list-decimal pl-6 text-gray-700 space-y-3 mb-4">
            <li><strong>Submit a Written Request:</strong> Email us at <a href="mailto:refunds@visaease.com" className="text-blue-600 hover:underline">refunds@visaease.com</a> with:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Your full name and client ID</li>
                <li>Service details and invoice number</li>
                <li>Reason for refund request</li>
                <li>Supporting documentation (if applicable)</li>
              </ul>
            </li>
            <li><strong>Review Period:</strong> We will review your request within 5-7 business days</li>
            <li><strong>Decision Notification:</strong> You will receive an email with our decision and refund amount (if approved)</li>
            <li><strong>Refund Processing:</strong> Approved refunds are processed within 10-15 business days to the original payment method</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.2 Required Information</h3>
          <p className="text-gray-700 mb-3">To process your refund request efficiently, please provide:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Original payment receipt or invoice</li>
            <li>Client account details</li>
            <li>Bank account information for refund transfer (if applicable)</li>
            <li>Any relevant correspondence or documentation</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Special Circumstances</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Force Majeure</h3>
          <p className="text-gray-700 mb-3">
            In cases of force majeure events (natural disasters, pandemics, war, government policy changes, embassy 
            closures), we will work with you to find a reasonable solution, which may include:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Service postponement without additional fees</li>
            <li>Transfer to alternative visa type or destination</li>
            <li>Partial refund based on work completed</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">6.2 Changes in Immigration Law</h3>
          <p className="text-gray-700 mb-3">
            If immigration laws change significantly after you engage our services, making your application impossible 
            or invalid:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>We will notify you immediately</li>
            <li>Provide options for alternative visa pathways</li>
            <li>Offer partial refund for work not completed</li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Dispute Resolution</h2>
          <p className="text-gray-700 mb-3">
            If you are not satisfied with our refund decision:
          </p>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            <li>Contact our Customer Service Manager at <a href="mailto:support@visaease.com" className="text-blue-600 hover:underline">support@visaease.com</a></li>
            <li>Request an escalation for senior management review</li>
            <li>We aim to resolve all disputes within 14 business days</li>
            <li>If unresolved, disputes may be subject to arbitration as per our Terms and Conditions</li>
          </ol>
        </div>

        {/* Section 8 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Refund Timelines</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ul className="text-gray-700 space-y-2">
              <li><strong>Request Review:</strong> 5-7 business days</li>
              <li><strong>Refund Processing:</strong> 10-15 business days after approval</li>
              <li><strong>Bank Transfer Time:</strong> Additional 3-5 business days (depending on your bank)</li>
              <li><strong>Total Expected Time:</strong> 18-27 business days from request submission</li>
            </ul>
          </div>
        </div>

        {/* Section 9 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Payment Method Specific Refunds</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Credit/Debit Card:</strong> Refunded to the original card used</li>
            <li><strong>Bank Transfer:</strong> Refunded to your provided bank account</li>
            <li><strong>PayPal/Digital Wallets:</strong> Refunded to the original payment account</li>
            <li><strong>Cash Payments:</strong> Refunded via check or bank transfer</li>
          </ul>
        </div>

        {/* Section 10 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
          <p className="text-gray-700 mb-3">
            For refund inquiries or cancellation requests, please contact us:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700"><strong>VisaEase Refunds Department</strong></p>
            <p className="text-gray-700">Email: <a href="mailto:refunds@visaease.com" className="text-blue-600 hover:underline">refunds@visaease.com</a></p>
            <p className="text-gray-700">Phone: <a href="tel:+18884567890" className="text-blue-600 hover:underline">+1 (888) 456-7890</a></p>
            <p className="text-gray-700">Address: New York, NY 10001</p>
            <p className="text-gray-700 mt-2"><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-6 mt-8">
          <p className="text-gray-600 text-sm mb-4">
            This Refund Policy is subject to change. We recommend reviewing it periodically. Changes will be effective 
            upon posting with an updated date.
          </p>
          <p className="text-gray-600 text-sm">
            By engaging our services, you acknowledge that you have read and understood this Cancellation and Refund Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
