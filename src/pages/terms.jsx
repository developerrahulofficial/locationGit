import "../App.css";

function terms() {
  return (
    <>
      <main className="bg-thegray home-no-scroll">
        <div className="min-h-screen flex items-center justify-center relative pb-32">
          {/* Background GIT! blobs */}
          <div className="absolute w-full max-w-lg -right-64">
            <div className="absolute -top-32 -right-0 w-[40rem] h-[40rem] bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
            <div className="absolute -top-0 -left-0 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>
          </div>

          <div className="relative">
            <div className="relative z-10 pt-5 pb-20">
              <div className="pt-10 max-w-[42rem] px-5 text-gray-200 font-Hublot">
                <h1 className="font-Mona text-4xl mb-8 text-white font-bold">Terms and Conditions</h1>

                <p className="text-lg mb-4">Last updated: November 2023</p>

                <p className="leading-relaxed mb-4">Please read these Terms and Conditions carefully before using the Geogit web application operated by Geogit.</p>

                <h2 className="text-2xl mt-6 mb-2">1. Acceptance of Terms</h2>
                <p className="leading-relaxed mb-4">
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>

                <h2 className="text-2xl mt-6 mb-2">2. Changes to Terms</h2>
                <p className="leading-relaxed mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide
                  at least 30 days' notice prior to any new terms taking effect.
                </p>

                <h2 className="text-2xl mt-6 mb-2">3. Usage and Restrictions</h2>
                <ul className="list-inside list-disc pl-5 mb-4">
                  <li className="leading-relaxed mb-2">You may not use the Service for any unlawful or unauthorized purpose.</li>
                  <li className="leading-relaxed mb-2">
                    You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without express written permission by us.
                  </li>
                </ul>

                <h2 className="text-2xl mt-6 mb-2">4. Content and Data</h2>
                <p className="leading-relaxed mb-4">
                  The Service allows you to search and view profiles of software developers based on location, sourced from GitHub, GitLab, and BitBucket. We make no guarantee
                  regarding the accuracy, completeness, or timeliness of the data presented, as it is based on user-provided information and third-party APIs. The Service is
                  provided for informational and educational purposes only.
                </p>

                <h2 className="text-2xl mt-6 mb-2">5. Intellectual Property</h2>
                <p className="leading-relaxed mb-4">
                  All content, features, and functionality of the Service are and will remain the exclusive property of Geogit and its licensors. The Service is protected by
                  copyright, trademark, and other laws of both the Ireland and foreign countries.
                </p>

                <h2 className="text-2xl mt-6 mb-2">6. Limitation of Liability</h2>
                <p className="leading-relaxed mb-4">
                  In no event shall Geogit, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of
                  or inability to access or use the Service; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein.
                </p>

                <h2 className="text-2xl mt-6 mb-2">7. Governing Law</h2>
                <p className="leading-relaxed mb-4">
                  These Terms shall be governed and construed in accordance with the laws of the Republic of Ireland, without regard to its conflict of law provisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default terms;
