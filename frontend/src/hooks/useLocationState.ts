import { useLocation } from 'react-router-dom';

const useLocationState = <T>(validate: (value: unknown) => value is T, defaultValue?: T) => {
  const location = useLocation();

  return validate(location.state) ? location.state : defaultValue;
};

export default useLocationState;
