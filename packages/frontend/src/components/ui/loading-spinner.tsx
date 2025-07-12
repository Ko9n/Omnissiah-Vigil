'use client';

import { motion } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'refresh';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

// Анимация точек
const DotSpinner = ({ size = 'md' }: { size: LoadingSpinnerProps['size'] }) => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            'rounded-full bg-blue-400',
            size === 'sm'
              ? 'h-1 w-1'
              : size === 'md'
                ? 'h-2 w-2'
                : size === 'lg'
                  ? 'h-3 w-3'
                  : 'h-4 w-4'
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
};

// Анимация пульса
const PulseSpinner = ({
  size = 'md',
}: {
  size: LoadingSpinnerProps['size'];
}) => {
  return (
    <motion.div
      className={cn(
        'rounded-full border-2 border-blue-400/30',
        sizeClasses[size as keyof typeof sizeClasses]
      )}
      animate={{
        scale: [1, 1.2, 1],
        borderColor: [
          'rgb(96 165 250 / 0.3)',
          'rgb(96 165 250)',
          'rgb(96 165 250 / 0.3)',
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className="h-full w-full rounded-full bg-blue-400/50"
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export function LoadingSpinner({
  size = 'md',
  variant = 'spinner',
  text,
  className,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const content = (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-3',
        className
      )}
    >
      {/* Spinner */}
      <div className="flex items-center justify-center">
        {variant === 'spinner' && (
          <Loader2
            className={cn(
              'animate-spin text-blue-400',
              sizeClasses[size as keyof typeof sizeClasses]
            )}
          />
        )}

        {variant === 'refresh' && (
          <RefreshCw
            className={cn(
              'animate-spin text-blue-400',
              sizeClasses[size as keyof typeof sizeClasses]
            )}
          />
        )}

        {variant === 'dots' && <DotSpinner size={size} />}

        {variant === 'pulse' && <PulseSpinner size={size} />}
      </div>

      {/* Text */}
      {text && (
        <motion.p
          className={cn(
            'font-medium text-slate-400',
            textSizeClasses[size as keyof typeof textSizeClasses]
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="rounded-lg border border-slate-700 bg-slate-800/90 p-8"
        >
          {content}
        </motion.div>
      </div>
    );
  }

  return content;
}

// Hook для управления loading состоянием
export function useLoading() {
  return {
    LoadingOverlay: ({ show, text }: { show: boolean; text?: string }) =>
      show ? <LoadingSpinner fullScreen text={text} /> : null,
  };
}
