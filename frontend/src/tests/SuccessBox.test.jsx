import { render, fireEvent } from '@testing-library/react';
import SuccessBox from '../components/SuccessBox';  // Adjust the path as needed

describe('SuccessBox', () => {
  test('renders title and message correctly', () => {
    const title = 'Success';
    const message = 'Your action was successful!';
    const { getByText } = render(<SuccessBox title={title} message={message} onClose={() => {}} />);

    // Check if title and message are rendered
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });

  test('calls onClose when OK button is clicked', () => {
    const onClose = vi.fn();  // Use vi.fn() for Vitest
    const { getByText } = render(<SuccessBox title="Success" message="Your action was successful!" onClose={onClose} />);

    // Find the "OK" button and simulate a click
    fireEvent.click(getByText('OK'));

    // Check if onClose was called
    expect(onClose).toHaveBeenCalled();
  });
});
