import toast, { Toaster } from 'react-hot-toast';

type IToastProps = {
  type: string;
  message: string;
}

export const ShowToast = ({ type, message }: IToastProps) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case 'default':
      toast(message, {
        position: 'top-center',
        duration: 4000,
      });
      break;
    case 'success':
      toast.success(message, {
        position: 'top-center',
        duration: 4000,
      });
      break;
    case 'error':
      toast.error(message, {
        position: 'top-center',
        duration: 4000,
      });
      break;
    case 'loading':
      toast.loading(message, {
        position: 'top-center',
        duration: 4000,
      });
      break;
  }
};

export default function ToastAnimated() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
  );
}
