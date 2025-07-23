'use client';

import { useEffect, useRef, useState } from 'react';

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000); // Show after 7 seconds

    return () => clearTimeout(timer);
  }, []);

  // Close popup when clicking outside the popup box
  const handleClickOutside = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-11/12 text-center"
      >
        <button
          className="absolute top-3 right-3 text-ikontext hover:text-ikontext text-2xl"
          onClick={() => setVisible(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-ikontext mb-2">🛑 Got Pests?</h2>
        <p className="text-ikontext mb-4">
          Book a <strong>Free Pest Inspection</strong> today and get upto <span className="text-ikongold font-semibold">10% off</span> your first treatment!
        </p>

        <button
          onClick={() => window.location.href = '/contact'}
          className="bg-ikongold text-ikontext px-5 py-2 rounded hover:bg-ikontext hover:text-ikongold transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
