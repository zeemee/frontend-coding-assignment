import spinnerSvg from '../assets/spinner.svg';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <img src={spinnerSvg} alt="Loading..." className="w-12 h-12 text-white" />
    </div>
  );
}
