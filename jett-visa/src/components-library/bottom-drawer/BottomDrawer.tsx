'use client';

import { useIsDesktop } from '@/utils/hooks/useDesktop';
import React, { useEffect } from 'react';

interface BottomDrawerProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  height?: string;
  children: React.ReactNode;
}

const MobileBottomDrawer = ({
  modalOpen,
  setModalOpen,
  height = '85%',
  children,
}: BottomDrawerProps) => {
  const isDesktop = useIsDesktop();

  /* 🔒 Lock body scroll */
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  /* 🔥 CLOSE drawer when switching to desktop */
  useEffect(() => {
    if (isDesktop && modalOpen) {
      setModalOpen(false);
    }
  }, [isDesktop, modalOpen, setModalOpen]);

  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end"
      onClick={() => setModalOpen(false)} // backdrop click
    >
      <div
        className="bg-white w-full rounded-t-3xl relative"
        style={{ height }}
        onClick={(e) => e.stopPropagation()} // ✅ prevent close
      >
        {/* Close button */}
        <button
          onClick={() => setModalOpen(false)}
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-xl"
        >
          ✕
        </button>

        <div className="h-full overflow-y-auto px-5 pt-6 scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomDrawer;
