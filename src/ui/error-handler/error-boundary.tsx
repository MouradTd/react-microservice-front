import { Error500 } from '@/pages';
import React, { Component, ErrorInfo } from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log('ErrorBoundary caught an error: ', error, errorInfo);
        // fetch('http://localhost:8080/api/v1/tracing-error');
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <Error500 />;
        }
        return this.props.children;
    }
}
