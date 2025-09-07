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
    newOtp[index] = e.target.value;
    onChange(newOtp.join(''));

    // Focus next input
    if (e.target.value && index < numInputs - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: numInputs }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="h-12 w-12 text-center text-xl font-bold"
        />
      ))}
    </div>
  );
}
