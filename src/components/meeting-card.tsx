'use client';

import Image from 'next/image';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { Call, CallRecording } from '@stream-io/video-react-sdk';

type MeetingCardProps = {
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  meeting: Call | CallRecording;
  link: string;
};

const MeetingCard = ({
  icon,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  buttonText,
  meeting,
  link,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="flex flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">
              {(meeting as Call).state?.custom?.description ||
                (meeting as CallRecording).filename?.substring(0, 20) ||
                'No Description'}
            </h1>
            <p className="text-base font-normal">
              {(meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time?.toLocaleString()}
            </p>
          </div>
        </div>
      </article>
      <article className="relative mt-6 flex justify-end">
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: 'Link Copied',
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
