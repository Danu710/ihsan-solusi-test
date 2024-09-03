import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface ConversionState {
  fromType: number;
  toType: number;
  fromValue: string;
  result: string;
}

interface PageContextType {
  state: ConversionState;
  action: {
    setFromType: (type: number) => void;
    setToType: (type: number) => void;
    setFromValue: (value: string) => void;
    convert: () => void;
  };
}

const initialState: ConversionState = {
  fromType: 10, // Decimal default
  toType: 2, // Binary default
  fromValue: '',
  result: '',
};

const context = createContext<PageContextType>({
  state: initialState,
  action: {
    setFromType: () => {},
    setToType: () => {},
    setFromValue: () => {},
    convert: () => {},
  },
});

export function PageProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<ConversionState>(initialState);

  const setFromType = (type: number) =>
    setState((prev) => ({ ...prev, fromType: type }));
  const setToType = (type: number) =>
    setState((prev) => ({ ...prev, toType: type }));
  const setFromValue = (value: string) =>
    setState((prev) => ({ ...prev, fromValue: value }));

  const convert = () => {
    const { fromType, toType, fromValue } = state;

    if (fromType === toType) {
      setState((prev) => ({ ...prev, result: fromValue }));
      return;
    }

    let decimalValue: number;
    switch (fromType) {
      case 2:
        decimalValue = parseInt(fromValue, 2);
        break;
      case 8:
        decimalValue = parseInt(fromValue, 8);
        break;
      case 16:
        decimalValue = parseInt(fromValue, 16);
        break;
      default:
        decimalValue = parseInt(fromValue, 10);
    }

    let resultValue: string;
    switch (toType) {
      case 2:
        resultValue = decimalValue.toString(2);
        break;
      case 8:
        resultValue = decimalValue.toString(8);
        break;
      case 16:
        resultValue = decimalValue.toString(16).toUpperCase();
        break;
      default:
        resultValue = decimalValue.toString(10);
    }

    setState((prev) => ({ ...prev, result: resultValue }));
  };

  return (
    <context.Provider
      value={{
        state,
        action: {
          setFromType,
          setToType,
          setFromValue,
          convert,
        },
      }}>
      {children}
    </context.Provider>
  );
}

export function usePageContext() {
  return useContext(context);
}
