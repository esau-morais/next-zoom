'use client';

import { useGetCalls } from '@/hooks/useGetCalls';

export const UpcomingMeetingTitle = () => {
  const { upcomingCalls } = useGetCalls();

  return (
    <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
      {upcomingCalls?.length ? (
        <span>
          Upcoming Meeting at:{' '}
          {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
            upcomingCalls[0].state.startsAt,
          )}
        </span>
      ) : (
        'No Upcoming Calls'
      )}
    </h2>
  );
};
