import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('calls onPrev and onNext when clicked', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    render(
      <Pagination hasPrev={true} hasNext={true} onPrev={onPrev} onNext={onNext} currentPage={2} totalPages={3} />
    );

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onPrev).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('disables prev button when hasPrev is false', () => {
    render(
      <Pagination hasPrev={false} hasNext={true} onPrev={() => {}} onNext={() => {}} currentPage={1} totalPages={5} />
    );

    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
  });
});
