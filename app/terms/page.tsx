import React from 'react';

export const metadata = {
  title: 'Terms and Conditions - IKON',
  description: 'Terms and conditions for IKON Pest Control Services. Read our terms and conditions for your peace of mind.',
};

const TermsAndConditions = () => {
  return (
    <main className="bg-white min-h-screen px-6 py-12 sm:px-8 md:px-12 lg:px-24 text-ikontext">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-ikontext mb-2">Terms and Conditions</h1>
          <p className="text-sm text-ikontext">Last updated: July 07, 2025</p>
        </header>

        <section className="space-y-4">
          <p>Please read these Terms and Conditions carefully before using our Service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Interpretation and Definitions</h2>

          <h3 className="text-xl font-medium mb-2">Interpretation</h3>
          <p>
            Words with capitalized initial letters have defined meanings. These definitions apply regardless of singular or plural usage.
          </p>

          <h3 className="text-xl font-medium mb-2 mt-4">Definitions</h3>
          <p>For the purposes of these Terms and Conditions:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
            <li><strong>Affiliate:</strong> Entity under common control with a party.</li>
            <li><strong>Country:</strong> Refers to Maharashtra, India.</li>
            <li><strong>Company:</strong> IKON Pest Control Services (referred to as "the Company", "We", "Us", or "Our").</li>
            <li><strong>Device:</strong> Any device like a computer, cellphone, or tablet that accesses the Service.</li>
            <li><strong>Service:</strong> Refers to the Website.</li>
            <li><strong>Terms and Conditions:</strong> These Terms that govern your use of the Service.</li>
            <li><strong>Third-party Social Media Service:</strong> Services or content provided by third parties.</li>
            <li><strong>Website:</strong> IKON Pest Control, available at <a href="https://ikonpestcontrol.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ikonpestcontrol.com</a></li>
            <li><strong>You:</strong> The individual or legal entity using the Service.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Acknowledgment</h2>
          <p>
            These Terms govern the use of the Service and form the agreement between You and the Company. Your access and use of the Service are conditional on your acceptance of and compliance with these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party websites or services not owned or controlled by the Company. We are not responsible for the content, policies, or practices of any third-party sites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Termination</h2>
          <p>
            We may suspend or terminate your access to the Service immediately, without notice, for any reason, including breach of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Limitation of Liability</h2>
          <p>
            The Company’s entire liability, regardless of damages you may incur, will be limited to the amount paid by you through the Service or 1000 INR if you haven’t purchased anything.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
          <p>
            The Service is provided to you “AS IS” and “AS AVAILABLE” with all faults and defects without warranty of any kind, express or implied.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Governing Law</h2>
          <p>
            These Terms shall be governed and interpreted in accordance with the laws of Maharashtra, India, excluding its conflict of law rules.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Disputes Resolution</h2>
          <p>
            If you have a dispute or concern, you agree to try to resolve it informally by contacting the Company before taking formal legal action.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">For European Union (EU) Users</h2>
          <p>
            If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you reside.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">United States Legal Compliance</h2>
          <p>
            You represent and warrant that (i) You are not located in a country subject to a U.S. Government embargo, and (ii) You are not listed on any U.S. Government list of prohibited parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Severability and Waiver</h2>

          <h3 className="text-xl font-medium mb-2">Severability</h3>
          <p>
            If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in effect.
          </p>

          <h3 className="text-xl font-medium mb-2 mt-4">Waiver</h3>
          <p>
            The failure to exercise a right or enforce a provision under these Terms does not constitute a waiver of those rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Translation Interpretation</h2>
          <p>
            These Terms may have been translated for your convenience. In case of a dispute, the original English version shall prevail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Changes to These Terms and Conditions</h2>
          <p>
            We reserve the right to change or replace these Terms at any time. Any changes will be posted on this page with an updated “Last updated” date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">Contact Us</h2>
          <p>If you have any questions about these Terms and Conditions, you can reach us:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
            <li>Email: <a href="mailto:ikonpestcontrolservice@gmail.com" className="text-blue-600 hover:underline">ikonpestcontrolservice@gmail.com</a></li>
            <li>Visit: <a href="/contact" className="text-blue-600 hover:underline" rel="noopener noreferrer">Contact Page</a></li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default TermsAndConditions;
