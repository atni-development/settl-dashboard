import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import add_recipients from "/public/images/icon/add-recipients.png";
import company_icon from "/public/images/icon/company-icon.png";
import individual_icon from "/public/images/icon/individual-icon.png";

const AddRecipientsModal = () => {
  return (
    <div className="add-recipients">
      <div className="container-fruid">
        <div className="row">
          <div className="col-lg-6">
            <div className="modal fade" id="recipientsMod" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header justify-content-between">
                    <h6>Add Recipients</h6>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i>
                        <FaTimes />
                      </i>
                    </button>
                  </div>
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="company-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#company1"
                        type="button"
                        role="tab"
                        aria-controls="company1"
                        aria-selected="true"
                      >
                        <span className="icon-area">
                          <Image src={company_icon} alt="icon" />
                        </span>
                        Company
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="individual-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#individual"
                        type="button"
                        role="tab"
                        aria-controls="individual"
                        aria-selected="false"
                      >
                        <span className="icon-area">
                          <Image src={individual_icon} alt="icon" />
                        </span>
                        Individual
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="company1"
                      role="tabpanel"
                      aria-labelledby="company-tab"
                    >
                      <div className="image-area mt-30 text-center">
                        <Image src={add_recipients} alt="icon" />
                      </div>
                      <form action="#">
                        <div className="row justify-content-center">
                          <div className="col-md-12">
                            <div className="single-input">
                              <label htmlFor="companyName">Company Name</label>
                              <input
                                type="text"
                                id="companyName"
                                placeholder="xtechlab"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single-input">
                              <label htmlFor="companyfname">First Name</label>
                              <input
                                type="text"
                                id="companyfname"
                                placeholder="Dana"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single-input">
                              <label htmlFor="companylname">Last Name</label>
                              <input
                                type="text"
                                id="companylname"
                                placeholder="Patton"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="single-input">
                              <label htmlFor="companyemail">Email</label>
                              <input
                                type="text"
                                id="companyemail"
                                placeholder="danap24@gmail.com"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="single-input">
                              <label htmlFor="companyphone">Phone</label>
                              <div className="select-area d-flex align-items-center overflow-hidden">
                                <select className="rounded-0">
                                  <option value="1">+1</option>
                                  <option value="2">+2</option>
                                  <option value="3">+3</option>
                                </select>
                                <input
                                  type="text"
                                  id="companyphone"
                                  placeholder="(070) 4567-8800"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="single-input">
                              <label>Select Country</label>
                              <select className="d-flex border rounded-3 w-100">
                                <option value="1">Canada</option>
                                <option value="2">Japan</option>
                                <option value="3">Germany</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="btn-border w-100">
                              <button className="cmn-btn w-100">
                                Add Recipients
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="individual"
                      role="tabpanel"
                      aria-labelledby="individual-tab"
                    >
                      <div className="image-area mt-30 text-center">
                        <Image src={add_recipients} alt="icon" />
                      </div>
                      <form action="#">
                        <div className="row justify-content-center">
                          <div className="col-md-12">
                            <div className="single-input">
                              <label htmlFor="individualName">
                                Individual Name
                              </label>
                              <input
                                type="text"
                                id="individualName"
                                placeholder="xtechlab"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single-input">
                              <label htmlFor="fname">First Name</label>
                              <input
                                type="text"
                                id="fname"
                                placeholder="Dana"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="single-input">
                              <label htmlFor="lname">Last Name</label>
                              <input
                                type="text"
                                id="lname"
                                placeholder="Patton"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="single-input">
                              <label htmlFor="email">Email</label>
                              <input
                                type="text"
                                id="email"
                                placeholder="danap24@gmail.com"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="single-input">
                              <label htmlFor="phone">Phone</label>
                              <div className="select-area d-flex align-items-center overflow-hidden">
                                <select className="rounded-0">
                                  <option value="1">+1</option>
                                  <option value="2">+2</option>
                                  <option value="3">+3</option>
                                </select>
                                <input
                                  type="text"
                                  id="phone"
                                  placeholder="(070) 4567-8800"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="single-input">
                              <label>Select Country</label>
                              <select className="d-flex border rounded-3 w-100">
                                <option value="1">Canada</option>
                                <option value="2">Japan</option>
                                <option value="3">Germany</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="btn-border w-100">
                              <button className="cmn-btn w-100">
                                Add Recipients
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipientsModal;
