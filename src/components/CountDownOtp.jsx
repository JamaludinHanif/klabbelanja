/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import { SweetAlert2 } from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const CountDownOtp = () => {
  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    // Membersihkan timer ketika komponen di-unmount atau waktu habis
    if (seconds === 0) {
      clearInterval(timer);
      Swal.fire('kode OTP sudah kadaluwarsa, silahkan klik Resend OTP')
    }

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p className='text-sm'>{formatTime(seconds)}</p>
    </div>
  );
};

export default CountDownOtp;
