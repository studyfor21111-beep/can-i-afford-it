"use client";
import { Component, ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            maxWidth: 600,
            margin: "80px auto",
            padding: "40px 24px",
            textAlign: "center",
          }}
          role="alert"
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontSize: 22, marginBottom: 12 }}>Something went wrong</h2>
          <p style={{ color: "var(--text2)", marginBottom: 24, lineHeight: 1.7 }}>
            An unexpected error occurred. Please refresh the page or try again.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: "12px 28px",
              borderRadius: 30,
              background: "linear-gradient(135deg,#6c63ff,#a78bfa)",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
