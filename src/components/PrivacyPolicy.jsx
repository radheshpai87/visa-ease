import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: November 3, 2025</p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            At VisaEase ("we," "us," or "our"), we are committed to protecting your privacy and ensuring the security 
            of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
            your information when you use our visa consultation and application services through our website 
            <a href="https://visaeasehub.vercel.app/" className="text-blue-600 hover:underline"> https://visaeasehub.vercel.app/</a>.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Personal Information</h3>
          <p className="text-gray-700 mb-3">We collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Register for an account on our platform</li>
            <li>Submit a visa application through our services</li>
            <li>Contact us for consultation or support</li>
            <li>Subscribe to our newsletter</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          
          <p className="text-gray-700 mb-3">This information may include:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Full name and contact details (email, phone number, address)</li>
            <li>Date of birth and nationality</li>
            <li>Passport information</li>
            <li>Educational and employment history</li>
            <li>Financial information (for visa assessment purposes)</li>
            <li>Travel history and purpose of travel</li>
            <li>Supporting documents (photographs, certificates, bank statements)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.2 Automatically Collected Information</h3>
          <p className="text-gray-700 mb-3">When you visit our website, we automatically collect certain information about your device, including:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>IP address and browser type</li>
            <li>Operating system and device information</li>
            <li>Pages viewed and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-3">We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Processing Visa Applications:</strong> To evaluate, prepare, and submit your visa application to the relevant authorities</li>
            <li><strong>Communication:</strong> To send you updates about your application status, respond to inquiries, and provide customer support</li>
            <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our website and services</li>
            <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and government requests</li>
            <li><strong>Marketing:</strong> To send you promotional materials and newsletters (with your consent)</li>
            <li><strong>Security:</strong> To protect against fraud, unauthorized access, and other illegal activities</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
          <p className="text-gray-700 mb-3">We may share your information with:</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800">Government Authorities:</h4>
              <p className="text-gray-700">Immigration offices, embassies, and consulates for visa processing purposes</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800">Service Providers:</h4>
              <p className="text-gray-700">Third-party vendors who assist us with payment processing, document verification, translation services, and IT support</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800">Legal Obligations:</h4>
              <p className="text-gray-700">Law enforcement or regulatory authorities when required by law or to protect our rights</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800">Business Transfers:</h4>
              <p className="text-gray-700">In connection with any merger, sale, or transfer of our business assets</p>
            </div>
          </div>
          
          <p className="text-gray-700 mt-4">
            <strong>We will never sell your personal information to third parties for marketing purposes.</strong>
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
          <p className="text-gray-700 mb-3">
            We implement robust security measures to protect your personal information:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>SSL encryption for data transmission</li>
            <li>Secure servers with firewall protection</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication protocols</li>
            <li>Employee training on data protection</li>
          </ul>
          <p className="text-gray-700 mt-3">
            However, no method of transmission over the internet is 100% secure. While we strive to protect your 
            personal information, we cannot guarantee absolute security.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
          <p className="text-gray-700">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
            Privacy Policy, unless a longer retention period is required by law. Typically, we retain application 
            data for 7 years after case closure for legal and compliance purposes.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
          <p className="text-gray-700 mb-3">Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            <li><strong>Data Portability:</strong> Request transfer of your data to another service provider</li>
            <li><strong>Object:</strong> Object to certain processing of your personal information</li>
          </ul>
          <p className="text-gray-700 mt-4">
            To exercise these rights, please contact us at <a href="mailto:privacy@visaease.com" className="text-blue-600 hover:underline">privacy@visaease.com</a>
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 mb-3">
            We use cookies and similar tracking technologies to enhance your experience on our website. You can 
            control cookie settings through your browser preferences. Types of cookies we use:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences</li>
            <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements (with your consent)</li>
          </ul>
        </div>

        {/* Section 8 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
          <p className="text-gray-700">
            Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal 
            information from children. If you believe we have collected information from a child, please contact us 
            immediately so we can delete it.
          </p>
        </div>

        {/* Section 9 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
          <p className="text-gray-700">
            Your information may be transferred to and processed in countries other than your country of residence. 
            These countries may have different data protection laws. We ensure appropriate safeguards are in place 
            to protect your information in accordance with this Privacy Policy.
          </p>
        </div>

        {/* Section 10 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by 
            posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use 
            of our services after changes are posted constitutes your acceptance of the updated policy.
          </p>
        </div>

        {/* Section 11 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
          <p className="text-gray-700 mb-3">
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700"><strong>VisaEase</strong></p>
            <p className="text-gray-700">Email: <a href="mailto:privacy@visaease.com" className="text-blue-600 hover:underline">privacy@visaease.com</a></p>
            <p className="text-gray-700">Phone: <a href="tel:+18884567890" className="text-blue-600 hover:underline">+1 (888) 456-7890</a></p>
            <p className="text-gray-700">Address: New York, NY 10001</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-6 mt-8">
          <p className="text-gray-600 text-sm">
            By using our services, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
