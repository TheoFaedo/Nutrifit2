import React, { Component, ErrorInfo } from 'react';
import WhiteHatSVG from '../../svg/WhiteHatSVG';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div className='bg-black w-full h-full text-center text-red-700 flex justify-center items-center flex-col'>
            <WhiteHatSVG className="h-7 mx-2" fillPrimary="fill-red-700" fillSecondary="fill-none" isImg/>
            <h1 className='text-2xl'>Something went wrong.</h1>
            <h2 className='text-xl'>Please try again later.</h2>
        </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;