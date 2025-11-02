import React from 'react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shipping & Delivery Policy</h1>
          <p className="text-gray-600">Last Updated: November 3, 2025</p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            At VisaEase, we understand the importance of timely and secure delivery of your visa documents and 
            application materials. This Shipping and Delivery Policy outlines how we handle the receipt, processing, 
            and delivery of documents related to your visa application services.
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-8 bg-blue-50 border-l-4 border-blue-400 p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">📦 Important Note</h3>
          <p className="text-gray-700">
            VisaEase primarily provides <strong>digital consultation and application services</strong>. Most documents 
            are submitted electronically. Physical document shipping applies only when required by immigration 
            authorities or specifically requested by clients.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Document Submission Methods</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Digital Submission (Primary Method)</h3>
          <p className="text-gray-700 mb-3">
            For most visa applications, documents are submitted digitally through our secure online portal:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>Upload Portal:</strong> Secure encrypted document upload system</li>
            <li><strong>Accepted Formats:</strong> PDF, JPG, PNG (max 10MB per file)</li>
            <li><strong>Processing Time:</strong> Documents reviewed within 24-48 hours of upload</li>
            <li><strong>Confirmation:</strong> Email notification upon successful submission and review</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.2 Physical Document Submission</h3>
          <p className="text-gray-700 mb-3">
            When original physical documents are required:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>Courier Services:</strong> We accept documents via FedEx, UPS, DHL, or USPS</li>
            <li><strong>Office Address:</strong> VisaEase Document Processing Center, New York, NY 10001</li>
            <li><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</li>
            <li><strong>Tracking:</strong> Please provide tracking number when shipping documents</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Document Receipt and Processing</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Receipt Acknowledgment</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <ul className="text-gray-700 space-y-2">
              <li><strong>Digital Documents:</strong> Instant acknowledgment via automated email</li>
              <li><strong>Physical Documents:</strong> Acknowledgment within 24 hours of receipt</li>
              <li><strong>Document Verification:</strong> Completeness check within 48 hours</li>
              <li><strong>Client Notification:</strong> Email/SMS alert when documents are received and verified</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">2.2 Document Security</h3>
          <p className="text-gray-700 mb-3">We ensure the security of your documents through:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Secure storage facilities with restricted access</li>
            <li>Document tracking system for accountability</li>
            <li>Insurance coverage for physical documents in transit and storage</li>
            <li>Encrypted digital storage with backup systems</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Delivery Services</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Document Delivery to Immigration Authorities</h3>
          <p className="text-gray-700 mb-3">
            When we submit your application to embassies, consulates, or immigration offices:
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Standard Submission</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Method: Regular mail or embassy-approved courier</li>
                <li>• Timeline: 3-5 business days for domestic; 7-10 days international</li>
                <li>• Cost: Included in service fees</li>
                <li>• Tracking: Standard tracking provided</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Express Submission</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Method: Priority courier service (FedEx, DHL)</li>
                <li>• Timeline: 1-2 business days for domestic; 3-5 days international</li>
                <li>• Cost: Additional fee ($50-$150 depending on destination)</li>
                <li>• Tracking: Real-time tracking provided</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Hand Delivery Service</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Method: In-person submission by our representatives</li>
                <li>• Timeline: Same-day or next-day (for select locations)</li>
                <li>• Cost: Premium service fee ($200-$500)</li>
                <li>• Availability: Major cities only</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Approved Visa Document Return</h3>
          <p className="text-gray-700 mb-3">
            Once your visa is approved and passport stamped:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>Standard Return:</strong> Via secure courier within 5-7 business days (free)</li>
            <li><strong>Express Return:</strong> Priority shipping within 2-3 business days (additional $75)</li>
            <li><strong>Self-Collection:</strong> Pick up from our office or designated embassy location (free)</li>
            <li><strong>Insurance:</strong> All returned documents are insured up to $10,000</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Shipping Charges</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Standard Shipping Fees</h3>
            <table className="w-full text-gray-700 mb-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Service Type</th>
                  <th className="p-2 text-left">Domestic (US)</th>
                  <th className="p-2 text-left">International</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Standard Delivery</td>
                  <td className="p-2">Included</td>
                  <td className="p-2">Included</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Express Delivery</td>
                  <td className="p-2">$50-$75</td>
                  <td className="p-2">$100-$150</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Same-Day/Hand Delivery</td>
                  <td className="p-2">$200-$300</td>
                  <td className="p-2">$400-$500</td>
                </tr>
                <tr>
                  <td className="p-2">Document Insurance</td>
                  <td className="p-2" colSpan="2">Included (up to $10,000)</td>
                </tr>
              </tbody>
            </table>
            
            <p className="text-gray-700 text-sm mt-3">
              <strong>Note:</strong> Shipping fees are subject to change based on courier rates and destination. 
              You will be notified of any additional charges before dispatch.
            </p>
          </div>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Delivery Timelines</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Standard Processing & Delivery</h3>
          <div className="space-y-3 text-gray-700">
            <p><strong>Digital Document Submission:</strong></p>
            <ul className="list-disc pl-6 mb-3">
              <li>Upload to Portal: Instant</li>
              <li>Document Review: 24-48 hours</li>
              <li>Electronic Submission to Authorities: 1-2 business days</li>
            </ul>

            <p><strong>Physical Document Handling:</strong></p>
            <ul className="list-disc pl-6">
              <li>Client to VisaEase: 3-5 business days (client's responsibility)</li>
              <li>Processing & Verification: 2-3 business days</li>
              <li>VisaEase to Embassy/Consulate: 3-5 business days (standard)</li>
              <li>Visa Processing by Authorities: Varies (5-60 days depending on visa type)</li>
              <li>Return to Client: 5-7 business days (standard)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.2 Expedited Timelines</h3>
          <p className="text-gray-700 mb-3">
            With express services, timelines can be reduced by 40-60%. However, visa authority processing times 
            remain outside our control.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Tracking and Notifications</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Real-Time Tracking</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>Client Portal:</strong> Access your dashboard for real-time application status</li>
            <li><strong>Email Notifications:</strong> Automatic alerts at each stage of the process</li>
            <li><strong>SMS Updates:</strong> Text message alerts for critical milestones</li>
            <li><strong>Courier Tracking:</strong> Direct tracking links for physical shipments</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">6.2 Key Notification Points</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Documents received by VisaEase</li>
            <li>Documents verified and approved for submission</li>
            <li>Application submitted to embassy/consulate</li>
            <li>Visa decision received</li>
            <li>Passport dispatched for return</li>
            <li>Passport out for delivery</li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Lost or Damaged Shipments</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Insurance Coverage</h3>
          <p className="text-gray-700 mb-3">
            All physical documents shipped through VisaEase are automatically insured:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>Coverage Amount:</strong> Up to $10,000 per shipment</li>
            <li><strong>Covered Items:</strong> Passports, original certificates, notarized documents</li>
            <li><strong>Exclusions:</strong> Items damaged due to improper packaging by client</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">7.2 Claims Process</h3>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            <li>Report lost/damaged shipment within 48 hours</li>
            <li>Provide tracking number and shipment details</li>
            <li>Submit claim form with supporting evidence</li>
            <li>Claims processed within 10-15 business days</li>
            <li>Compensation provided based on document value assessment</li>
          </ol>
        </div>

        {/* Section 8 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Shipping Considerations</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Customs and Duties</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Visa documents typically exempt from customs duties</li>
            <li>Clients responsible for any customs clearance delays</li>
            <li>We provide necessary documentation for customs clearance</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">8.2 Restricted Destinations</h3>
          <p className="text-gray-700 mb-3">
            Shipping may be limited or unavailable to certain countries due to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>International sanctions or trade restrictions</li>
            <li>Courier service limitations</li>
            <li>Security concerns</li>
            <li>Remote or inaccessible locations</li>
          </ul>
        </div>

        {/* Section 9 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Client Responsibilities</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">9.1 When Sending Documents to VisaEase</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Use secure, trackable courier services</li>
            <li>Package documents properly to prevent damage</li>
            <li>Provide accurate shipping address and contact information</li>
            <li>Inform us of tracking number and expected delivery date</li>
            <li>Consider purchasing insurance for valuable original documents</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">9.2 When Receiving Documents from VisaEase</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Ensure someone is available to receive the shipment</li>
            <li>Provide accurate delivery address (residential or office)</li>
            <li>Inspect documents immediately upon receipt</li>
            <li>Report any discrepancies or damage within 48 hours</li>
            <li>Sign delivery confirmation when required</li>
          </ul>
        </div>

        {/* Section 10 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Delays and Force Majeure</h2>
          <p className="text-gray-700 mb-3">
            VisaEase is not liable for shipping delays caused by:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Courier service delays or failures</li>
            <li>Customs clearance procedures</li>
            <li>Natural disasters, pandemics, or weather conditions</li>
            <li>Government restrictions or embassy closures</li>
            <li>Strikes, labor disputes, or political unrest</li>
            <li>Incorrect address provided by client</li>
          </ul>
          <p className="text-gray-700 mt-3">
            In such cases, we will work diligently to find alternative solutions and keep you informed.
          </p>
        </div>

        {/* Section 11 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
          <p className="text-gray-700 mb-3">
            For shipping and delivery inquiries:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700"><strong>VisaEase Shipping & Logistics</strong></p>
            <p className="text-gray-700">Email: <a href="mailto:shipping@visaease.com" className="text-blue-600 hover:underline">shipping@visaease.com</a></p>
            <p className="text-gray-700">Phone: <a href="tel:+18884567890" className="text-blue-600 hover:underline">+1 (888) 456-7890</a></p>
            <p className="text-gray-700">Address: VisaEase Document Processing Center, New York, NY 10001</p>
            <p className="text-gray-700 mt-2"><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-6 mt-8">
          <p className="text-gray-600 text-sm mb-4">
            This Shipping and Delivery Policy is subject to change. We recommend reviewing it periodically.
          </p>
          <p className="text-gray-600 text-sm">
            By using our services, you acknowledge that you have read and understood this Shipping and Delivery Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
