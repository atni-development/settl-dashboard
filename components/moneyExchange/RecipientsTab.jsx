import Link from "next/link";
import Select from "../select/Select";

const countryCode = [
  { id: 1, name: "+1" },
  { id: 2, name: "+2" },
  { id: 3, name: "+3" },
];

const RecipientsTab = () => {
  return (
    <div
      className="tab-pane fade show active"
      id="recipients"
      role="tabpanel"
      aria-labelledby="recipients-tab"
    >
      <div className="section-head">
        <h5>Add a new recipient</h5>
        <p>
          This information must be accurate or your transfer will be delayed.
        </p>
      </div>
      <form action="#">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="recipientsfname">First Name</label>
              <input type="text" id="recipientsfname" placeholder="Dana" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="recipientslname">Last Name</label>
              <input type="text" id="recipientslname" placeholder="Patton" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="recipientslAddress">
                Address Line 1 (Option)
              </label>
              <input
                type="text"
                id="recipientslAddress"
                placeholder="Address Line 1"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="recipientslCity">City/Town</label>
              <input type="text" id="recipientslCity" placeholder="City/Town" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="recipientslCode">Postcode</label>
              <input type="text" id="recipientslCode" placeholder="Postcode" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="recipientsphone">Phone</label>
              <div className="select-area d-flex align-items-center">
                {/* Select */}
                <Select data={countryCode} btn="bg-transparent" />
                <input
                  type="text"
                  id="recipientsphone"
                  placeholder="(070) 4567-8800"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="recipientsemail">Email Address</label>
              <input
                type="text"
                id="recipientsemail"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="bankname">Bank Name</label>
              <input type="text" id="bankname" placeholder="Bank Name" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="branchname">Branch Name</label>
              <input type="text" id="branchname" placeholder="Branch Name" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="accountnumber">Account number</label>
              <input
                type="text"
                id="accountnumber"
                placeholder="Account number"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="sendingreason">Reason for Sending</label>
              <input
                type="text"
                id="sendingreason"
                placeholder="Reason for Sending"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="footer-area mt-40">
              <Link href="/money-exchange/step-1">Previous Step</Link>
              <Link href="/money-exchange/step-3" className="active">
                Next
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipientsTab;
