import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying your email...');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = searchParams.get('token');
    const success = searchParams.get('success');
    const errorMessage = searchParams.get('message');
    
    // If coming from backend redirect (no token but has success param)
    if (success !== null) {
      if (success === 'true') {
        setIsSuccess(true);
        setMessage('Email verified successfully! Redirecting to sign in...');
        setTimeout(() => navigate('/sign-in'), 3000);
      } else {
        setMessage(errorMessage || 'Email verification failed');
      }
      return;
    }
    
    // If coming from email link (has token)
    if (!token) {
      setMessage('Invalid verification link - no token provided');
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/verify-email?token=${token}`);
        
        if (res.ok) {
          // The backend will redirect to this page with success=true
          // So we don't need to handle the redirect here
        } else {
          const data = await res.json();
          setMessage(data.message || 'Email verification failed');
        }
      } catch (error) {
        setMessage('An error occurred during verification');
      }
    };

    verifyEmail();
  }, [searchParams, navigate, API_BASE_URL]);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Email Verification</h1>
          <p className={`text-center ${isSuccess ? 'text-green-600' : 'text-gray-800'}`}>
            {message}
          </p>
          {!isSuccess && (
            <div className="mt-4 text-center">
              <p>Need a new verification link?</p>
              <button 
                onClick={() => navigate('/resend-verification')}
                className="text-blue-600 hover:underline"
              >
                Resend Verification Email
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}