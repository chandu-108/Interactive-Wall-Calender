import styles from '../styles/flip.module.css';

type Props = {
  children: React.ReactNode;
};

export function CalendarCard({ children }: Props) {
  return (
    <div
      id="calendar-card"
      className="relative w-full max-w-full md:max-w-[700px] lg:max-w-[800px] mx-auto bg-[#FAFAF5] dark:bg-[#16213E] rounded-[8px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] print:shadow-none print:w-full print:max-w-none print:rounded-none overflow-hidden pb-4"
    >
      {children}
    </div>
  );
}
