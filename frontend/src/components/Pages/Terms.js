import React from "react";
import classes from "./Terms.module.css";
function TermsOfService() {
  return (
    <div className={classes["terms-container"]}>
      <h1 className={classes["terms-heading"]}>Terms of Service</h1>
      <div className={classes["terms-content"]}>
        <h2>1. Terms</h2>
        <p>
          By accessing the website at https://www.instastalks.com, you are
          agreeing to be bound by these Terms of Service, all applicable laws
          and regulations, and agree that you are responsible for compliance
          with any applicable local laws. If you do not agree with any of these
          terms, you are prohibited from using or accessing this site. The
          materials contained in this website are protected by applicable
          copyright and trademark law.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the
          materials (information or software) on Instastalks’ website for
          personal, non-commercial transitory viewing only. This is the grant of
          a license, not a transfer of title, and under this license you may
          not:
        </p>
        <ul>
          <li>modify or copy the materials;</li>
          <li>
            use the materials for any commercial purpose, or for any public
            display (commercial or non-commercial);
          </li>
          <li>
            attempt to decompile or reverse engineer any software contained on
            Instastalks website;
          </li>
          <li>
            remove any copyright or other proprietary notations from the
            materials; or
          </li>
          <li>
            transfer the materials to another person or "mirror" the materials
            on any other server.
          </li>
        </ul>
        <p>
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by Instastalks at any time. Upon
          terminating your viewing of these materials or upon the termination of
          this license, you must destroy any downloaded materials in your
          possession whether in electronic or printed format.
        </p>

        <h2>3. Disclaimer</h2>
        <p>
          The materials on Instastalks' website are provided on an 'as is'
          basis. Instastalks makes no warranties, expressed or implied, and
          hereby disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability,
          fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights.
        </p>

        <h2>4. Limitations</h2>
        <p>
          In no event shall Instastalks or its suppliers be liable for any
          damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use the materials on Instastalks’ website, even if
          Instastalks or an Instastalks authorized representative has been
          notified orally or in writing of the possibility of such damage.
          Because some jurisdictions do not allow limitations on implied
          warranties, or limitations of liability for consequential or
          incidental damages, these limitations may not apply to you.
        </p>

        <h2>5. Accuracy of materials</h2>
        <p>
          The materials appearing on Instastalks’ website could include
          technical, typographical, or photographic errors. Instastalks does not
          warrant that any of the materials on its website are accurate,
          complete, or current. Instastalks may make changes to the materials
          contained on its website at any time without notice. However,
          Instastalks does not make any commitment to update the materials.
        </p>

        <h2>6. Links</h2>
        <p>
          Instastalks has not reviewed all of the sites linked to its website
          and is not responsible for the contents of any such linked site. The
          inclusion of any link does not imply endorsement by Instastalks of the
          site. Use of any such linked website is at the user's own risk.
        </p>

        <h2>7. Modifications</h2>
        <p>
          Instastalks may revise these Terms of Service for its website at any
          time without notice. By using this website you are agreeing to be
          bound by the then current version of these Terms of Service.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of USA, and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </p>
      </div>
    </div>
  );
}

export default TermsOfService;
