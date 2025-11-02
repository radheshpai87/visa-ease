import React from 'react';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-gray-600">Last Updated: November 3, 2025</p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to VisaEase. These Terms and Conditions ("Terms") govern your use of our website and services. 
            By accessing or using our services at <a href="https://visaeasehub.vercel.app/" className="text-blue-600 hover:underline">https://visaeasehub.vercel.app/</a>, 
            you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Definitions</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>"VisaEase," "we," "us," or "our"</strong> refers to the company providing visa consultation and application services</li>
            <li><strong>"Client," "you," or "your"</strong> refers to the individual or entity using our services</li>
            <li><strong>"Services"</strong> refers to all visa consultation, application processing, and related services provided by VisaEase</li>
            <li><strong>"Website"</strong> refers to https://visaeasehub.vercel.app/ and all associated pages</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Provided</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Scope of Services</h3>
          <p className="text-gray-700 mb-3">VisaEase provides the following services:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Visa consultation and eligibility assessment</li>
            <li>Assistance with visa application preparation and documentation</li>
            <li>Application submission to relevant immigration authorities</li>
            <li>Status tracking and updates</li>
            <li>Interview preparation and guidance</li>
            <li>Post-approval support services</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 No Guarantee of Approval</h3>
          <p className="text-gray-700 mb-3">
            <strong>IMPORTANT:</strong> VisaEase is a consultation and application assistance service. We do not guarantee 
            visa approval as final decisions rest solely with the immigration authorities of the destination country. 
            We cannot control or influence the decision-making process of government agencies.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Client Responsibilities</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Accurate Information</h3>
          <p className="text-gray-700 mb-3">Clients must:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Provide complete, accurate, and truthful information</li>
            <li>Submit all required documents in a timely manner</li>
            <li>Inform us immediately of any changes to their circumstances</li>
            <li>Disclose any previous visa applications, refusals, or immigration violations</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Document Authenticity</h3>
          <p className="text-gray-700 mb-3">
            Clients are solely responsible for ensuring that all documents submitted are genuine, valid, and not forged. 
            VisaEase is not responsible for verifying the authenticity of client-provided documents, though we may 
            request additional verification if discrepancies are noticed.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.3 Compliance with Laws</h3>
          <p className="text-gray-700 mb-3">
            Clients must comply with all applicable immigration laws and regulations of their destination country. 
            Any misrepresentation or fraud may result in immediate termination of services and potential legal consequences.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Fees and Payment</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Fees</h3>
          <p className="text-gray-700 mb-3">
            Our service fees are clearly outlined during the consultation phase and must be paid before we begin 
            processing your application. Fees vary based on visa type, complexity, and urgency.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.2 Government Fees</h3>
          <p className="text-gray-700 mb-3">
            Government visa application fees, embassy fees, and other third-party charges are separate from our 
            service fees. These must be paid directly to the relevant authorities or through us as per the payment 
            instructions provided.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.3 Payment Terms</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Initial consultation fee (if applicable) is non-refundable</li>
            <li>Service fees must be paid according to the agreed payment schedule</li>
            <li>Late payments may result in delays or suspension of services</li>
            <li>All prices are in USD unless otherwise specified</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund and Cancellation</h2>
          <p className="text-gray-700 mb-3">
            Please refer to our <Link to="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</Link> for 
            detailed information about cancellations, refunds, and service modifications.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Ownership</h3>
          <p className="text-gray-700 mb-3">
            All content on our website, including text, graphics, logos, images, and software, is the property of 
            VisaEase or its licensors and is protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">6.2 Limited License</h3>
          <p className="text-gray-700 mb-3">
            You are granted a limited, non-exclusive, non-transferable license to access and use our website for 
            personal, non-commercial purposes. You may not reproduce, distribute, modify, or create derivative works 
            without our written permission.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Confidentiality</h2>
          <p className="text-gray-700 mb-3">
            We maintain strict confidentiality of all client information in accordance with our 
            <Link to="/privacy-policy" className="text-blue-600 hover:underline"> Privacy Policy</Link>. However, we may 
            disclose information:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>To immigration authorities as required for application processing</li>
            <li>When required by law or legal process</li>
            <li>To protect our rights, property, or safety</li>
            <li>With your explicit consent</li>
          </ul>
        </div>

        {/* Section 8 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Service Limitations</h3>
          <p className="text-gray-700 mb-3">
            VisaEase shall not be liable for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Visa application rejections or delays by immigration authorities</li>
            <li>Changes in immigration laws, policies, or processing times</li>
            <li>Loss or damage arising from client-provided incorrect information</li>
            <li>Third-party service failures (courier services, translation services, etc.)</li>
            <li>Acts of God, war, terrorism, pandemics, or other force majeure events</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">8.2 Maximum Liability</h3>
          <p className="text-gray-700 mb-3">
            Our total liability to you for any claims arising from our services shall not exceed the total fees 
            paid by you to VisaEase for the specific service in question.
          </p>
        </div>

        {/* Section 9 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. User Account and Security</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">9.1 Account Creation</h3>
          <p className="text-gray-700 mb-3">
            To use certain features of our services, you must create an account. You are responsible for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Maintaining the confidentiality of your login credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">9.2 Account Termination</h3>
          <p className="text-gray-700 mb-3">
            We reserve the right to suspend or terminate your account if you violate these Terms or engage in 
            fraudulent or illegal activities.
          </p>
        </div>

        {/* Section 10 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Communication</h2>
          <p className="text-gray-700 mb-3">
            By using our services, you consent to receive communications from us via email, SMS, or phone regarding:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Application status updates</li>
            <li>Important service announcements</li>
            <li>Marketing and promotional materials (you may opt-out anytime)</li>
            <li>Customer satisfaction surveys</li>
          </ul>
        </div>

        {/* Section 11 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Dispute Resolution</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">11.1 Governing Law</h3>
          <p className="text-gray-700 mb-3">
            These Terms shall be governed by and construed in accordance with the laws of New York, United States, 
            without regard to its conflict of law provisions.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">11.2 Arbitration</h3>
          <p className="text-gray-700 mb-3">
            Any dispute arising from these Terms shall be resolved through binding arbitration in accordance with 
            the rules of the American Arbitration Association. The arbitration shall take place in New York, NY.
          </p>
        </div>

        {/* Section 12 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Third-Party Links</h2>
          <p className="text-gray-700 mb-3">
            Our website may contain links to third-party websites. We are not responsible for the content, privacy 
            practices, or terms of use of these external sites. Access to third-party websites is at your own risk.
          </p>
        </div>

        {/* Section 13 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Modifications to Terms</h2>
          <p className="text-gray-700 mb-3">
            We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our 
            website with an updated "Last Updated" date. Your continued use of our services after changes are posted 
            constitutes acceptance of the modified Terms.
          </p>
        </div>

        {/* Section 14 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Severability</h2>
          <p className="text-gray-700 mb-3">
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall 
            continue in full force and effect.
          </p>
        </div>

        {/* Section 15 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
          <p className="text-gray-700 mb-3">
            For questions about these Terms and Conditions, please contact us:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700"><strong>VisaEase</strong></p>
            <p className="text-gray-700">Email: <a href="mailto:info@visaease.com" className="text-blue-600 hover:underline">info@visaease.com</a></p>
            <p className="text-gray-700">Phone: <a href="tel:+18884567890" className="text-blue-600 hover:underline">+1 (888) 456-7890</a></p>
            <p className="text-gray-700">Address: New York, NY 10001</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-6 mt-8">
          <p className="text-gray-600 text-sm">
            By using VisaEase services, you acknowledge that you have read, understood, and agree to be bound by these 
            Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
