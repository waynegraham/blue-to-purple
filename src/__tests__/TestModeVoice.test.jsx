import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import TestModeScreen from '../pages/TestModeScreen';

jest.mock('react-screen-wake-lock', () => ({
  useWakeLock: () => ({
    isSupported: false,
    request: jest.fn(() => Promise.resolve()),
    release: jest.fn(() => Promise.resolve()),
  }),
}));

let lastRecognitionInstance = null;

class MockSpeechRecognition {
  constructor() {
    lastRecognitionInstance = this;
    this.start = jest.fn();
    this.stop = jest.fn();
    this.continuous = false;
    this.interimResults = false;
    this.maxAlternatives = 1;
    this.lang = 'en-US';
    this.onresult = null;
    this.onerror = null;
    this.onend = null;
  }
}

const renderTestMode = () =>
  render(
    <MemoryRouter
      initialEntries={['/test-mode']}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <TestModeScreen />
    </MemoryRouter>
  );

beforeEach(() => {
  lastRecognitionInstance = null;
  window.SpeechRecognition = MockSpeechRecognition;
  window.webkitSpeechRecognition = undefined;
});

afterEach(() => {
  delete window.SpeechRecognition;
  delete window.webkitSpeechRecognition;
});

test('shows unsupported banner when SpeechRecognition is unavailable', () => {
  delete window.SpeechRecognition;
  delete window.webkitSpeechRecognition;
  renderTestMode();

  const startButton = screen.getByRole('button', { name: /start voice/i });
  fireEvent.click(startButton);

  expect(
    screen.getAllByText(/voice control not supported on this browser/i).length
  ).toBeGreaterThan(0);
});

test('starts listening on user gesture and updates the button label', () => {
  renderTestMode();

  const startButton = screen.getByRole('button', { name: /start voice/i });
  fireEvent.click(startButton);

  expect(lastRecognitionInstance).not.toBeNull();
  expect(lastRecognitionInstance.start).toHaveBeenCalledTimes(1);
  expect(
    screen.getByRole('button', { name: /stop voice/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/voice listening started/i)).toBeInTheDocument();
});

test('advances to the next move when voice command is recognized', async () => {
  renderTestMode();

  const startButton = screen.getByRole('button', { name: /start voice/i });
  fireEvent.click(startButton);

  expect(screen.getByRole('heading', { name: /close the gap/i })).toBeInTheDocument();

  act(() => {
    lastRecognitionInstance.onresult({
      results: [[{ transcript: 'Next move please' }]],
    });
  });

  expect(
    await screen.findByRole('heading', { name: /sucker punch defense/i })
  ).toBeInTheDocument();
});
