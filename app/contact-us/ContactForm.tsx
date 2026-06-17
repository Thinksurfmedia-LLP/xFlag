'use client';

import React, { useState } from 'react';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json() as { success: boolean; error?: string };

      if (data.success) {
        setStatus('success');
        setForm(EMPTY_FORM);
      } else {
        setStatus('error');
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <div className="form-area">
      <div className="heading-area">
        <h2>Get in touch</h2>
        <p>Fill out the form below to let us know what interest you may have and we will reach out to set up an official meeting shortly.</p>
      </div>

      {status === 'success' && (
        <div className="alert alert-success" role="alert">
          Your message has been sent! We&apos;ll be in touch shortly.
        </div>
      )}

      {status === 'error' && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                name="company"
                className="form-control"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <textarea
                name="message"
                className="form-control"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
          </div>

          <div className="col-12">
            <input
              type="submit"
              className="btn btn-primary w-100"
              value={status === 'loading' ? 'SENDING...' : 'SEND'}
              disabled={status === 'loading'}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
