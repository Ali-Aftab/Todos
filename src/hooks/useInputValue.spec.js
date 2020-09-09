import { renderHook, act } from '@testing-library/react-hooks';
import useInputValue from './useInputValue';

describe('useInputValue', () => {
  it('should initialize without errors', async () => {
    const { result } = renderHook(() => useInputValue(''));

    expect(result.current.inputValue).toBe('');
    expect(typeof result.current.changeInput).toBe('function');
    expect(typeof result.current.clearInput).toBe('function');
    expect(typeof result.current.keyInput).toBe('function');
  });

  it('should accept a non-empty default value', async () => {
    const { result } = renderHook(() => useInputValue('hello'));

    expect(result.current.inputValue).toBe('hello');
    expect(typeof result.current.changeInput).toBe('function');
    expect(typeof result.current.clearInput).toBe('function');
    expect(typeof result.current.keyInput).toBe('function');
  });

  it('should change the input correctly', async () => {
    const { result } = renderHook(() => useInputValue(''));

    expect(result.current.inputValue).toBe('');

    act(() => {
      result.current.changeInput({
        target: {
          value: 'hello',
        },
      });
    });

    expect(result.current.inputValue).toBe('hello');

    act(() => {
      result.current.changeInput({
        target: {
          value: 'hello world',
        },
      });
    });

    expect(result.current.inputValue).toBe('hello world');
  });

  it('should change the input correctly when the default value is non-empty', async () => {
    const { result } = renderHook(() => useInputValue('hello'));

    expect(result.current.inputValue).toBe('hello');

    act(() => {
      result.current.changeInput({
        target: {
          value: 'hello world',
        },
      });
    });

    expect(result.current.inputValue).toBe('hello world');
  });

  it('should be able to clear the input value', async () => {
    const { result } = renderHook(() => useInputValue('hello'));

    expect(result.current.inputValue).toBe('hello');

    act(() => {
      result.current.clearInput();
    });

    expect(result.current.inputValue).toBe('');
  });

  it('should handle "Enter" key press', async () => {
    const { result } = renderHook(() => useInputValue(''));

    expect(result.current.inputValue).toBe('');

    let called = 0;
    result.current.keyInput({ which: 13 }, () => {
      called++;
    });

    expect(called).toBe(1);
  });

  it('should handle non-"Enter" key press', async () => {
    const { result } = renderHook(() => useInputValue(''));

    expect(result.current.inputValue).toBe('');

    result.current.keyInput({}, () => {
      throw new Error('callback should not be called');
    });
  });
});
