import type * as React from 'react';

// Type-only shim to satisfy existing imports from hooks/use-toast.
// This project uses Sonner for toasts; these types mirror what the hook expects.
export type ToastActionElement = React.ReactNode;
export type ToastProps = import('sonner').ToasterProps;
