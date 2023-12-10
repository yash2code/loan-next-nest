import React, { useState, FormEvent } from 'react';

interface LoanFormData {
  businessName: string;
  yearEstablished: string;
  loanAmount: string;
}

const LoanApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    businessName: '',
    yearEstablished: '',
    loanAmount: ''
  });
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const validateForm = () => {
    if (!formData.businessName || !formData.yearEstablished || !formData.loanAmount) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('')
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loans/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      setMessage('Application submitted successfully!');
      setFormData({ businessName: '', yearEstablished: '', loanAmount: '' });
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue = name === 'yearEstablished' || name === 'loanAmount' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Loan Application</h1>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className={`text-green-500`}>{message}</p>}
      <form className="grid grid-cols-1 gap-y-6" onSubmit={handleSubmit}></form>
      <form className="grid grid-cols-1 gap-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="businessName"
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
        />
        <input
          type="number"
          name="yearEstablished"
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          placeholder="Year Established"
          value={formData.yearEstablished}
          onChange={handleChange}
        />
        <input
          type="number"
          name="loanAmount"
          className="w-full p-3 border border-gray-300 rounded-md text-black"
          placeholder="Loan Amount"
          value={formData.loanAmount}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
