import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Email,
  Phone,
  Lock,
} from '@mui/icons-material';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const inputsRef = useRef([]);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" textAlign="center" mb={3}>
            Forgot Password
          </Typography>

          {step === 1 && (
            <>
              <ToggleButtonGroup
                fullWidth
                exclusive
                value={method}
                onChange={(e, v) => v && setMethod(v)}
                sx={{ mb: 2 }}
              >
                <ToggleButton value="email">Email</ToggleButton>
                <ToggleButton value="mobile">Mobile</ToggleButton>
              </ToggleButtonGroup>

              {method === 'email' && (
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {method === 'mobile' && (
                <TextField
                  fullWidth
                  label="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <Button fullWidth sx={{ mt: 3 }} onClick={() => setStep(2)}>
                Send OTP
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Typography textAlign="center" mb={2}>
                Enter OTP
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={3}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: 'center', fontSize: 20 },
                    }}
                    sx={{ width: 45 }}
                  />
                ))}
              </Box>

              <Button fullWidth onClick={() => setStep(3)}>
                Verify OTP
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => navigate('/login')}
              >
                Reset Password
              </Button>
            </>
          )}

          {/* Back to Login Button */}
          <Box textAlign="center" mt={3}>
            <Button variant="text" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
