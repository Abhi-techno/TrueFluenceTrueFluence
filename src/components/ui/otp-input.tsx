'use client';

import React, { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';

interface OtpInputProps {
  numInputs: number;
  onChange: (otp: string) => void;
  value: string;
}

export function OtpInput({ numInputs, onChange, value }: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = value.split('');
    let val = e.target.value;

    // Only allow numbers
    if (!/^[0-9]*$/.test(val)) {
        return;
    }

    newOtp[index] = val;
    onChange(newOtp.join('').slice(0, numInputs));

    // Focus next input
    if (val && index < numInputs - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text/plain')
      .trim()
      .slice(0, numInputs);
    
    if (/^[0-9]+$/.test(pastedData)) {
      onChange(pastedData);
      inputsRef.current[pastedData.length -1]?.focus();
    }
  };


  return (
    <div className="flex items-center justify-center gap-2" onPaste={handlePaste}>
      {Array.from({ length: numInputs }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="h-14 w-12 text-center text-xl font-bold"
        />
      ))}
    </div>
  );
}
