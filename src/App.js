import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingForPosition: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const skills = formData.additionalSkills;

    if (skills.includes(value)) {
      const filteredSkills = skills.filter((skill) => skill !== value);
      setFormData({ ...formData, additionalSkills: filteredSkills });
    } else {
      setFormData({ ...formData, additionalSkills: [...skills, value] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!isValidPhoneNumber(data.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }

    if (data.applyingForPosition === 'Developer' || data.applyingForPosition === 'Designer') {
      if (!data.relevantExperience.trim()) {
        errors.relevantExperience = 'Relevant Experience is required';
      } else if (isNaN(data.relevantExperience) || +data.relevantExperience <= 0) {
        errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
      }
    }

    if (data.applyingForPosition === 'Designer' && !data.portfolioURL.trim()) {
      errors.portfolioURL = 'Portfolio URL is required';
    }

    if (data.applyingForPosition === 'Manager' && !data.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }

    if (data.additionalSkills.length === 0) {
      errors.additionalSkills = 'Please select at least one skill';
    }

    if (!data.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    } else if (!isValidDateTime(data.preferredInterviewTime)) {
      errors.preferredInterviewTime = 'Invalid date and time format';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    return /^\d+(-\d+)*$/.test(phoneNumber);
  };

  const isValidDateTime = (dateTime) => {
    return !isNaN(Date.parse(dateTime));
  };

  return (
    <div>
      <h1 className='heading'>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </label>
        </div>
        <div>
          <label>
            Applying for Position:
            <select name="applyingForPosition" onChange={handleChange}>
              <option value="">Select...</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </label>
        </div>
        {formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer' ? (
          <div>
            <label>
              Relevant Experience (years):
              <input
                type="text"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
              />
              {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
            </label>
          </div>
        ) : null}
        {formData.applyingForPosition === 'Designer' ? (
          <div>
            <label>
              Portfolio URL:
              <input
                type="text"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleChange}
              />
              {errors.portfolioURL && <span className="error">{errors.portfolioURL}</span>}
            </label>
          </div>
        ) : null}
        {formData.applyingForPosition === 'Manager' ? (
          <div>
            <label>
              Management Experience:
              <input
                type="text"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
              />
              {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
            </label>
          </div>
        ) : null}
        <div>
          <label>
            Additional Skills:
            <br />
            <label>
              <input
                type="checkbox"
                name="JavaScript"
                value="JavaScript"
                checked={formData.additionalSkills.includes('JavaScript')}
                onChange={handleCheckboxChange}
              />
              JavaScript
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="CSS"
                value="CSS"
                checked={formData.additionalSkills.includes('CSS')}
                onChange={handleCheckboxChange}
              />
              CSS
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="Python"
                value="Python"
                checked={formData.additionalSkills.includes('Python')}
                onChange={handleCheckboxChange}
              />
              Python
            </label>
            {errors.additionalSkills && <span className="error">{errors.additionalSkills}</span>}
          </label>
        </div>
        <div>
          <label>
            Preferred Interview Time:
            <input
              type="datetime-local"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleChange}
            />
            {errors.preferredInterviewTime && <span className="error">{errors.preferredInterviewTime}</span>}
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div className="summary">
          <h2 className='heading'>Submission Summary</h2>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {formData.applyingForPosition}</p>
          {formData.relevantExperience && (
            <p><strong>Relevant Experience:</strong> {formData.relevantExperience} years</p>
          )}
          {formData.portfolioURL && (
            <p><strong>Portfolio URL:</strong> <a href={formData.portfolioURL} target="_blank" rel="noopener noreferrer">{formData.portfolioURL}</a></p>
          )}
          {formData.managementExperience && (
            <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {new Date(formData.preferredInterviewTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default App;
